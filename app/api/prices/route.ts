import { NextResponse } from 'next/server'
import { getStripeServer, STRIPE_PRICE_IDS, TRIAL_DAYS } from '@/lib/stripe-server'

export async function GET() {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({
      ok: true,
      data: { solo: '', team: '', firm: '', dmg: '', trialDays: TRIAL_DAYS, amounts: {} },
    })
  }

  try {
    const stripe = getStripeServer()
    const priceIds = Object.entries(STRIPE_PRICE_IDS).filter(([, id]) => id)

    const amounts: Record<string, number> = {}

    if (priceIds.length > 0) {
      await Promise.all(
        priceIds.map(async ([, id]) => {
          try {
            const price = await stripe.prices.retrieve(id)
            amounts[id] = price.unit_amount ?? 0
          } catch {
            // Price not found in Stripe — use placeholder
          }
        })
      )
    }

    return NextResponse.json({
      ok: true,
      data: {
        ...STRIPE_PRICE_IDS,
        trialDays: TRIAL_DAYS,
        amounts,
      },
    })
  } catch (err) {
    console.error('[/api/prices]', err)
    return NextResponse.json({ ok: false, error: 'Failed to load prices' }, { status: 500 })
  }
}
