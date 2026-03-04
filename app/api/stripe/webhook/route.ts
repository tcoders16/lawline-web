import { NextRequest, NextResponse } from 'next/server'
import { getStripeServer } from '@/lib/stripe-server'
import type Stripe from 'stripe'

// Required: disable body parsing so we get the raw buffer for signature verification
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
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        console.log(`[webhook] Checkout completed: ${session.id} | customer: ${session.customer_email}`)
        // TODO: Provision account, send welcome email
        break
      }
      case 'customer.subscription.created': {
        const sub = event.data.object as Stripe.Subscription
        console.log(`[webhook] Subscription created: ${sub.id} | status: ${sub.status}`)
        // TODO: Activate plan features
        break
      }
      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription
        console.log(`[webhook] Subscription updated: ${sub.id} | status: ${sub.status}`)
        // TODO: Sync plan changes
        break
      }
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        console.log(`[webhook] Subscription cancelled: ${sub.id}`)
        // TODO: Revoke access, send offboarding email
        break
      }
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        console.log(`[webhook] Payment succeeded: invoice ${invoice.id}`)
        // TODO: Send receipt, update billing records
        break
      }
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        console.log(`[webhook] Payment failed: invoice ${invoice.id}`)
        // TODO: Send dunning email, flag account
        break
      }
      default:
        console.log(`[webhook] Unhandled event: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('[webhook] Handler error:', err)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
