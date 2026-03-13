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

/**
 * Price IDs — set STRIPE_PRICE_MACOS to the recurring price you
 * created in the Stripe Dashboard ($99 / month, USD).
 */
export const STRIPE_PRICE_IDS = {
  get macos() { return process.env.STRIPE_PRICE_MACOS ?? '' },
}

/** Trial period in days (default 14). Override via STRIPE_TRIAL_DAYS_MACOS. */
export const TRIAL_DAYS = {
  get macos() { return Number(process.env.STRIPE_TRIAL_DAYS_MACOS ?? 14) },
}
