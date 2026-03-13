/**
 * POST /api/stripe/customer-portal
 *
 * Creates a Stripe Billing Portal session so customers can manage their
 * macOS subscription (cancel, update card, download invoices) without
 * contacting support.
 *
 * Usage:
 *   const res = await fetch('/api/stripe/customer-portal', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({ customerId }),
 *   })
 *   const { url } = await res.json()
 *   window.location.href = url   // redirect to Stripe's portal
 *
 * Requires:
 *   - STRIPE_SECRET_KEY env var
 *   - Billing Portal enabled in Stripe Dashboard → Settings → Billing → Portal
 */
import { NextRequest, NextResponse } from 'next/server'
import { getStripeServer } from '@/lib/stripe-server'

export async function POST(req: NextRequest) {
  try {
    const stripe = getStripeServer()
    const { customerId } = await req.json() as { customerId?: string }

    if (!customerId) {
      return NextResponse.json(
        { ok: false, error: 'customerId is required' },
        { status: 400 }
      )
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

    const session = await stripe.billingPortal.sessions.create({
      customer:   customerId,
      return_url: `${appUrl}/pricing`,
    })

    return NextResponse.json({ ok: true, url: session.url })
  } catch (err) {
    console.error('[/api/stripe/customer-portal]', err)
    return NextResponse.json(
      { ok: false, error: 'Failed to create portal session' },
      { status: 500 }
    )
  }
}
