import Stripe from 'stripe'

// Lazy singleton — initialized on first use, not at module load time
let _stripe: Stripe | null = null

export function getStripeServer(): Stripe {
  if (_stripe) return _stripe

  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set')

  _stripe = new Stripe(key, { apiVersion: '2026-02-25.clover' })
  return _stripe
}

// Convenience alias for use in route handlers
export { getStripeServer as stripe }

export const STRIPE_PRICE_IDS = {
  get solo() { return process.env.STRIPE_PRICE_SOLO ?? '' },
  get team() { return process.env.STRIPE_PRICE_TEAM ?? '' },
  get firm() { return process.env.STRIPE_PRICE_FIRM ?? '' },
  get dmg()  { return process.env.STRIPE_PRICE_DMG  ?? '' },
}

export const TRIAL_DAYS = {
  get solo() { return Number(process.env.STRIPE_TRIAL_DAYS_SOLO ?? 30) },
  get team() { return Number(process.env.STRIPE_TRIAL_DAYS_TEAM ?? 14) },
  get firm() { return Number(process.env.STRIPE_TRIAL_DAYS_FIRM ?? 14) },
}
