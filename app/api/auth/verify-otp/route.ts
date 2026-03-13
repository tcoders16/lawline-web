/**
 * POST /api/auth/verify-otp
 *
 * Step 2 of the email-verification auth flow:
 *
 *   1. Receive { email, otp }
 *   2. Verify the 6-digit OTP (stateless HMAC check, 10-minute window)
 *   3. Re-check Stripe subscription (authoritative source of truth)
 *   4. Issue a signed RS256 license JWT
 *   5. Return { ok: true, token }
 *
 * Request:  { email: string, otp: string }
 * Response: { ok: true, token: string, status: string, validUntil: string, trialDaysLeft: number | null }
 *           { ok: false, error: string }
 */

import { NextRequest, NextResponse } from 'next/server'
import { getStripeServer } from '@/lib/stripe-server'
import { signLicenseToken, type LicenseStatus } from '@/lib/license-jwt'
import { verifyOtp } from '@/lib/otp'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = (await req.json()) as { email?: string; otp?: string }

    if (!email || !email.includes('@')) {
      return NextResponse.json({ ok: false, error: 'Valid email is required' }, { status: 400 })
    }
    if (!otp || otp.length !== 6) {
      return NextResponse.json({ ok: false, error: 'Enter the 6-digit code from your email' }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()

    // 1. Verify OTP (stateless — no DB lookup needed)
    if (!verifyOtp(normalizedEmail, otp.trim())) {
      return NextResponse.json({ ok: false, error: 'Incorrect or expired code. Request a new one.' }, { status: 401 })
    }

    const stripe = getStripeServer()

    // 2. Re-check Stripe subscription (authoritative)
    const customers = await stripe.customers.list({ email: normalizedEmail, limit: 1 })
    if (!customers.data.length) {
      return NextResponse.json({ ok: false, error: 'No subscription found for this email' }, { status: 404 })
    }

    const customer = customers.data[0]
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: 'all',
      limit: 10,
    })

    const sub =
      subscriptions.data.find(s => s.status === 'active') ??
      subscriptions.data.find(s => s.status === 'trialing') ??
      subscriptions.data.find(s => s.status === 'past_due') ??
      subscriptions.data[0]

    if (!sub) {
      return NextResponse.json({ ok: false, error: 'No subscription found' }, { status: 403 })
    }

    const status = sub.status as LicenseStatus
    const allowed = status === 'active' || status === 'trialing' || status === 'past_due'

    if (!allowed) {
      return NextResponse.json(
        { ok: false, error: 'Subscription is not active. Please renew your subscription.', status },
        { status: 403 },
      )
    }

    const trialEnd = sub.trial_end ? new Date(sub.trial_end * 1000) : null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawPeriodEnd = (sub as any).current_period_end as number | undefined
    const periodEnd = rawPeriodEnd
      ? new Date(rawPeriodEnd * 1000)
      : new Date(Date.now() + 28 * 24 * 60 * 60 * 1000)

    const validUntil = (trialEnd && status === 'trialing' ? trialEnd : periodEnd).toISOString()
    const trialDaysLeft =
      trialEnd && status === 'trialing'
        ? Math.max(0, Math.ceil((trialEnd.getTime() - Date.now()) / 86_400_000))
        : null

    // 3. Issue license JWT
    const token = await signLicenseToken({
      email: normalizedEmail,
      customerId: customer.id,
      subscriptionId: sub.id,
      status,
      validUntil,
      trialEnd: trialEnd?.toISOString() ?? null,
      trialDaysLeft,
    })

    return NextResponse.json({
      ok: true,
      token,
      status,
      validUntil,
      trialDaysLeft,
      name: customer.name ?? null,
    })
  } catch (err) {
    console.error('[/api/auth/verify-otp]', err)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}
