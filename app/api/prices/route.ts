import { NextResponse } from 'next/server'
import { getStripeServer, STRIPE_PRICE_IDS, TRIAL_DAYS } from '@/lib/stripe-server'

export async function GET() {
  // No Stripe key — return defaults so the UI still renders
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({
      ok: true,
      data: {
        macos: STRIPE_PRICE_IDS.macos,
        trialDays: { macos: TRIAL_DAYS.macos },
        amounts: {},
      },
    })
  }

  try {
    const stripe = getStripeServer()
    const amounts: Record<string, number> = {}

    if (STRIPE_PRICE_IDS.macos) {
      try {
        const price = await stripe.prices.retrieve(STRIPE_PRICE_IDS.macos)
        amounts[STRIPE_PRICE_IDS.macos] = price.unit_amount ?? 0
      } catch {
        // Price not found in Stripe — skip
      }
    }

    return NextResponse.json({
      ok: true,
      data: {
        macos:     STRIPE_PRICE_IDS.macos,
        trialDays: { macos: TRIAL_DAYS.macos },
        amounts,
      },
    })
  } catch (err) {
    console.error('[/api/prices]', err)
    return NextResponse.json({ ok: false, error: 'Failed to load prices' }, { status: 500 })
  }
}
