import { NextRequest, NextResponse } from 'next/server'
import { getStripeServer } from '@/lib/stripe-server'

export async function POST(req: NextRequest) {
  try {
    const stripe = getStripeServer()
    const body = await req.json()
    const {
      priceId,
      quantity = 1,
      mode = 'subscription',
      trialDays,
      successUrl,
      cancelUrl,
      customerEmail,
    } = body as {
      priceId: string
      quantity?: number
      mode?: 'payment' | 'subscription'
      trialDays?: number
      successUrl?: string
      cancelUrl?: string
      customerEmail?: string
    }

    if (!priceId) {
      return NextResponse.json({ ok: false, error: 'priceId is required' }, { status: 400 })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      mode,
      line_items: [{ price: priceId, quantity }],
      success_url: successUrl ?? `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  cancelUrl  ?? `${appUrl}/pricing`,
      ...(customerEmail ? { customer_email: customerEmail } : {}),
      ...(mode === 'subscription' && trialDays
        ? { subscription_data: { trial_period_days: trialDays, metadata: { plan: 'macos' } } }
        : {}),
      metadata: { plan: 'macos', source: 'lawline_web' },
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
    })

    return NextResponse.json({ ok: true, url: session.url, sessionId: session.id })
  } catch (err) {
    console.error('[/api/stripe/checkout]', err)
    return NextResponse.json({ ok: false, error: 'Failed to create checkout session' }, { status: 500 })
  }
}
