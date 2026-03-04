import { NextRequest, NextResponse } from 'next/server'
import { getStripeServer } from '@/lib/stripe-server'

export async function POST(req: NextRequest) {
  try {
    const stripe = getStripeServer()
    const { amount, currency = 'usd', email } = await req.json() as {
      amount: number
      currency?: string
      email?: string
    }

    if (!amount || amount < 50) {
      return NextResponse.json({ ok: false, error: 'Invalid amount' }, { status: 400 })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
      ...(email ? { receipt_email: email } : {}),
      metadata: { source: 'lawline_dmg_purchase' },
    })

    return NextResponse.json({ ok: true, clientSecret: paymentIntent.client_secret })
  } catch (err) {
    console.error('[/api/stripe/payment-intent]', err)
    return NextResponse.json({ ok: false, error: 'Failed to create payment intent' }, { status: 500 })
  }
}
