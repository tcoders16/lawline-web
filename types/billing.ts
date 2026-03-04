export type BillingTier = 'solo' | 'team' | 'firm' | 'enterprise'
export type BillingMode  = 'subscription' | 'payment'

export type PricingPlan = {
  id:          BillingTier
  name:        string
  tagline:     string
  price:       number | null    // null = custom
  priceKey:    'solo' | 'team' | 'firm' | null
  billingMode: BillingMode
  trialDays:   number | null
  featured:    boolean
  badge?:      string
  features:    string[]
  cta:         string
}

export type CheckoutPayload = {
  priceId:       string
  mode:          BillingMode
  trialDays?:    number
  successUrl?:   string
  cancelUrl?:    string
  customerEmail?: string
}
