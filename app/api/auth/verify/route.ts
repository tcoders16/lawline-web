/**
 * POST /api/auth/verify
 *
 * Called by the macOS app on launch (when online) to:
 *   1. Verify the user's email has an active Stripe subscription
 *   2. Return a signed RS256 JWT the app can cache and verify offline
 *
 * Request body:
 *   { email: string }
 *
 * Response:
 *   { ok: true, token: string, status: LicenseStatus, validUntil: string, trialDaysLeft: number | null }
 *   { ok: false, error: string, status?: LicenseStatus }
 *
 * The JWT is signed with the server's RSA private key. The macOS app
 * verifies it offline using the embedded public key — no internet required
 * after the initial auth. Token lifetime: 7 days.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getStripeServer } from '@/lib/stripe-server'
import { signLicenseToken, type LicenseStatus } from '@/lib/license-jwt'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const { email } = (await req.json()) as { email?: string }

    if (!email || !email.includes('@')) {
      return NextResponse.json({ ok: false, error: 'Valid email is required' }, { status: 400 })
    }

    const stripe = getStripeServer()

    // 1. Look up the Stripe customer by email
    const customers = await stripe.customers.list({ email: email.toLowerCase().trim(), limit: 1 })

    if (!customers.data.length) {
      return NextResponse.json(
        { ok: false, error: 'No subscription found for this email', status: 'not_found' },
        { status: 404 },
      )
    }

    const customer = customers.data[0]

    // 2. Get their subscriptions (most recent first)
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: 'all',
      limit: 10,
    })

    if (!subscriptions.data.length) {
      return NextResponse.json(
        { ok: false, error: 'No subscription found for this account', status: 'no_subscription' },
        { status: 404 },
      )
    }

    // Prefer active/trialing over canceled
    const sub =
      subscriptions.data.find(s => s.status === 'active') ??
      subscriptions.data.find(s => s.status === 'trialing') ??
      subscriptions.data.find(s => s.status === 'past_due') ??
      subscriptions.data[0]

    const status = sub.status as LicenseStatus
    const trialEnd = sub.trial_end ? new Date(sub.trial_end * 1000) : null
    // current_period_end moved in newer Stripe API versions — cast to access it safely
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawPeriodEnd = (sub as any).current_period_end as number | undefined
    const periodEnd = rawPeriodEnd
      ? new Date(rawPeriodEnd * 1000)
      : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // fallback: 30 days

    // validUntil = trial end (if trialing) or next billing date
    const validUntil = (trialEnd && status === 'trialing' ? trialEnd : periodEnd).toISOString()

    const trialDaysLeft =
      trialEnd && status === 'trialing'
        ? Math.max(0, Math.ceil((trialEnd.getTime() - Date.now()) / 86_400_000))
        : null

    const isValid = status === 'active' || status === 'trialing' || status === 'past_due'

    if (!isValid) {
      return NextResponse.json(
        { ok: false, error: 'Subscription is not active', status },
        { status: 403 },
      )
    }

    // 3. Sign a license JWT the app can cache for offline use
    const token = await signLicenseToken({
      email: email.toLowerCase().trim(),
      customerId:      customer.id,
      subscriptionId:  sub.id,
      status,
      validUntil,
      trialEnd:        trialEnd?.toISOString() ?? null,
      trialDaysLeft,
    })

    return NextResponse.json({
      ok: true,
      token,
      status,
      validUntil,
      trialDaysLeft,
    })
  } catch (err) {
    console.error('[/api/auth/verify]', err)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}

// The macOS app also needs to validate a cached token offline.
// GET /api/auth/verify?token=<jwt>  — server-side token inspection (optional debugging endpoint)
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  if (!token) return NextResponse.json({ ok: false, error: 'Missing token' }, { status: 400 })

  try {
    const { verifyLicenseToken } = await import('@/lib/license-jwt')
    const claims = await verifyLicenseToken(token)
    return NextResponse.json({ ok: true, claims })
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid or expired token' }, { status: 401 })
  }
}
