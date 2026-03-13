/**
 * POST /api/auth/login
 *
 * Called by the Electron app on every launch (when online).
 * 1. Looks up the Stripe customer by email
 * 2. Verifies the password against the stored hash
 * 3. Checks subscription is active / trialing
 * 4. Returns a signed RS256 JWT for offline use
 *
 * The JWT carries `validUntil` = next billing date (subscription period end).
 * The Electron app caches this and re-calls login after it expires.
 * This enforces the monthly cycle: if they cancel, the next login after
 * their period ends will return 403 and the app locks.
 *
 * Request:  { email: string, password: string }
 * Response: { ok: true, token, status, validUntil, trialDaysLeft, name? }
 *            { ok: false, error, status? }
 */

import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'
import { getStripeServer } from '@/lib/stripe-server'
import { signLicenseToken, type LicenseStatus } from '@/lib/license-jwt'

export const runtime = 'nodejs'

function hashPassword(plaintext: string, customerId: string): string {
  return createHash('sha256')
    .update(plaintext + ':' + customerId)
    .digest('hex')
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = (await req.json()) as { email?: string; password?: string }

    if (!email || !password) {
      return NextResponse.json({ ok: false, error: 'Email and password are required' }, { status: 400 })
    }

    const stripe = getStripeServer()

    // 1. Find customer by email
    const customers = await stripe.customers.list({ email: email.toLowerCase().trim(), limit: 1 })
    if (!customers.data.length) {
      return NextResponse.json({ ok: false, error: 'No account found for this email' }, { status: 404 })
    }

    const customer = customers.data[0]
    const storedHash = (customer as any).metadata?.passwordHash

    if (!storedHash) {
      return NextResponse.json(
        { ok: false, error: 'Account not activated yet. Complete checkout first.' },
        { status: 403 },
      )
    }

    // 2. Verify password
    const incomingHash = hashPassword(password, customer.id)
    if (incomingHash !== storedHash) {
      return NextResponse.json({ ok: false, error: 'Incorrect password' }, { status: 401 })
    }

    // 3. Check subscription
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: 'all',
      limit: 10,
    })

    if (!subscriptions.data.length) {
      return NextResponse.json({ ok: false, error: 'No subscription found' }, { status: 403 })
    }

    const sub =
      subscriptions.data.find(s => s.status === 'active') ??
      subscriptions.data.find(s => s.status === 'trialing') ??
      subscriptions.data.find(s => s.status === 'past_due') ??
      subscriptions.data[0]

    const status = sub.status as LicenseStatus
    const allowed = status === 'active' || status === 'trialing' || status === 'past_due'

    if (!allowed) {
      return NextResponse.json(
        { ok: false, error: 'Subscription is not active', status },
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

    // 4. Sign license JWT (7-day cache, but validUntil = billing cycle end)
    const token = await signLicenseToken({
      email: email.toLowerCase().trim(),
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
    console.error('[/api/auth/login]', err)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}
