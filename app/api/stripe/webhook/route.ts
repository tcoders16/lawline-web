/**
 * POST /api/stripe/webhook
 *
 * Handles all Stripe subscription lifecycle events.
 * Verified with HMAC signature before processing.
 *
 * Subscription lifecycle:
 *   checkout.session.completed       → trial started, welcome email
 *   customer.subscription.trial_will_end → 3-day warning email
 *   invoice.payment_succeeded        → trial converted / renewal paid
 *   invoice.payment_failed           → payment failed, dunning email
 *   customer.subscription.updated    → plan/status changed
 *   customer.subscription.deleted    → cancelled, revoke access
 */

import { NextRequest, NextResponse } from 'next/server'
import { getStripeServer } from '@/lib/stripe-server'
import type Stripe from 'stripe'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig  = req.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    const stripe = getStripeServer()
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err) {
    console.error('[webhook] Signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    const stripe = getStripeServer()

    switch (event.type) {

      // ── Trial started ────────────────────────────────────────────────────────
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const email = session.customer_details?.email ?? session.customer_email
        const customerId = session.customer as string | null

        console.log(`[webhook] ✅ Checkout completed | customer: ${email} | id: ${customerId}`)

        // If it's a subscription, log the trial start
        if (session.mode === 'subscription' && session.subscription) {
          const sub = await stripe.subscriptions.retrieve(session.subscription as string)
          const trialEnd = sub.trial_end ? new Date(sub.trial_end * 1000).toISOString() : null
          console.log(`[webhook] Trial started | sub: ${sub.id} | trial_end: ${trialEnd}`)
        }

        // TODO: Send welcome + download email via your email provider (Resend, SendGrid, etc.)
        // await sendWelcomeEmail({ email, downloadUrl: process.env.DMG_URL })
        break
      }

      // ── Trial ending in 3 days ───────────────────────────────────────────────
      case 'customer.subscription.trial_will_end': {
        const sub = event.data.object as Stripe.Subscription
        const customer = await stripe.customers.retrieve(sub.customer as string) as Stripe.Customer
        const trialEnd = sub.trial_end ? new Date(sub.trial_end * 1000).toISOString() : null

        console.log(`[webhook] ⚠️  Trial ending soon | customer: ${customer.email} | trial_end: ${trialEnd}`)

        // TODO: Send "Your trial ends in 3 days" email
        // await sendTrialEndingEmail({ email: customer.email, trialEnd })
        break
      }

      // ── Trial converted to paid / monthly renewal paid ───────────────────────
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        const customer = await stripe.customers.retrieve(invoice.customer as string) as Stripe.Customer
        const isFirstPayment = invoice.billing_reason === 'subscription_cycle' || invoice.billing_reason === 'subscription_create'

        console.log(`[webhook] 💳 Payment succeeded | ${customer.email} | invoice: ${invoice.id} | reason: ${invoice.billing_reason}`)

        if (invoice.billing_reason === 'subscription_create' && (invoice.amount_paid ?? 0) === 0) {
          console.log(`[webhook] Trial started (no charge yet) | ${customer.email}`)
        } else if (invoice.billing_reason === 'subscription_cycle') {
          console.log(`[webhook] Monthly renewal charged | ${customer.email} | amount: $${(invoice.amount_paid / 100).toFixed(2)}`)
        }

        // TODO: Send receipt email
        // await sendReceiptEmail({ email: customer.email, invoice })
        break
      }

      // ── Payment failed ───────────────────────────────────────────────────────
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const customer = await stripe.customers.retrieve(invoice.customer as string) as Stripe.Customer
        const attemptCount = invoice.attempt_count ?? 1

        console.log(`[webhook] ❌ Payment failed | ${customer.email} | attempt: ${attemptCount} | invoice: ${invoice.id}`)

        // Stripe auto-retries (Smart Retries). After max attempts, it cancels the subscription.
        // The app checks 'past_due' status and shows a banner prompting card update.
        // TODO: Send dunning email
        // await sendPaymentFailedEmail({ email: customer.email, attemptCount, invoiceUrl: invoice.hosted_invoice_url })
        break
      }

      // ── Subscription status changed ──────────────────────────────────────────
      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription
        const prevSub = event.data.previous_attributes as Partial<Stripe.Subscription>
        const customer = await stripe.customers.retrieve(sub.customer as string) as Stripe.Customer

        console.log(`[webhook] 🔄 Subscription updated | ${customer.email} | status: ${prevSub.status ?? '?'} → ${sub.status}`)

        // Trial → active transition (first real charge succeeded)
        if (prevSub.status === 'trialing' && sub.status === 'active') {
          console.log(`[webhook] 🎉 Trial converted to paid | ${customer.email}`)
          // TODO: Send "You're now a paid subscriber" email
        }

        // past_due → active (payment recovered)
        if (prevSub.status === 'past_due' && sub.status === 'active') {
          console.log(`[webhook] ✅ Payment recovered | ${customer.email}`)
          // TODO: Send "Payment recovered" email
        }
        break
      }

      // ── Subscription cancelled / expired ────────────────────────────────────
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        const customer = await stripe.customers.retrieve(sub.customer as string) as Stripe.Customer

        console.log(`[webhook] 🚫 Subscription cancelled | ${customer.email} | sub: ${sub.id}`)

        // The app's cached JWT will still work until it expires (up to 7 days).
        // On next launch, /api/auth/verify returns 403 → app locks and shows upgrade screen.
        // TODO: Send "Sorry to see you go" offboarding email
        // await sendCancellationEmail({ email: customer.email })
        break
      }

      // ── Catch-all ────────────────────────────────────────────────────────────
      default:
        // Log but don't error on unknown events
        if (process.env.NODE_ENV === 'development') {
          console.log(`[webhook] Unhandled event: ${event.type}`)
        }
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('[webhook] Handler error:', err)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
