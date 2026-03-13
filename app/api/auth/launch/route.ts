/**
 * GET /api/auth/launch?session_id=cs_...
 *
 * Called from the success page "Launch Lawline" button.
 * 1. Verifies the Stripe checkout session is paid/active
 * 2. Retrieves the customer email from the session
 * 3. Looks up their Stripe subscription
 * 4. Signs a license JWT
 * 5. Returns { ok: true, deepLink: "lawline://auth?token=..." }
 *
 * The browser then navigates to the deep link, which the macOS app
 * intercepts to authenticate without the user typing their email.
 *
 * Deep link scheme: lawline://auth?token=<signed-jwt>
 * The app registers this URL scheme in its Info.plist:
 *   CFBundleURLSchemes: ["lawline"]
 */

import { NextRequest, NextResponse } from 'next/server'
import { getStripeServer } from '@/lib/stripe-server'
import { signLicenseToken, type LicenseStatus } from '@/lib/license-jwt'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session_id')

  if (!sessionId) {
    return NextResponse.json({ ok: false, error: 'Missing session_id' }, { status: 400 })
  }

  try {
    const stripe = getStripeServer()

    // 1. Retrieve and verify the checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer'],
    })

    const isPaid =
      session.payment_status === 'paid' ||
      session.status === 'complete' ||
      session.payment_status === 'no_payment_required' // trial

    if (!isPaid) {
      return NextResponse.json({ ok: false, error: 'Payment not confirmed' }, { status: 403 })
    }

    // 2. Get customer email
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const expandedCustomer = session.customer as any
    const email =
      session.customer_details?.email ??
      session.customer_email ??
      (expandedCustomer && typeof expandedCustomer !== 'string' && !expandedCustomer.deleted
        ? (expandedCustomer.email as string | null)
        : null)

    if (!email) {
      return NextResponse.json({ ok: false, error: 'No email on session' }, { status: 422 })
    }

    const customerId =
      typeof session.customer === 'string'
        ? session.customer
        : (expandedCustomer?.id as string | undefined) ?? ''

    // 3. Get their subscription
    let subscriptionId = ''
    let status: LicenseStatus = 'trialing'
    let trialEnd: Date | null = null
    let periodEnd: Date = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    let trialDaysLeft: number | null = null

    if (session.subscription) {
      const sub = await stripe.subscriptions.retrieve(
        typeof session.subscription === 'string' ? session.subscription : session.subscription.id,
      )

      subscriptionId = sub.id
      status = sub.status as LicenseStatus
      trialEnd = sub.trial_end ? new Date(sub.trial_end * 1000) : null
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rawPeriodEnd = (sub as any).current_period_end as number | undefined
      if (rawPeriodEnd) periodEnd = new Date(rawPeriodEnd * 1000)

      if (trialEnd && status === 'trialing') {
        trialDaysLeft = Math.max(0, Math.ceil((trialEnd.getTime() - Date.now()) / 86_400_000))
      }
    }

    const validUntil = (trialEnd && status === 'trialing' ? trialEnd : periodEnd).toISOString()

    // 4. Sign the license JWT
    const token = await signLicenseToken({
      email,
      customerId,
      subscriptionId,
      status,
      validUntil,
      trialEnd: trialEnd?.toISOString() ?? null,
      trialDaysLeft,
    })

    // 5. Return the deep link the browser will navigate to
    const deepLink = `lawline://auth?token=${encodeURIComponent(token)}`

    return NextResponse.json({ ok: true, deepLink, email, status, trialDaysLeft })
  } catch (err) {
    console.error('[/api/auth/launch]', err)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}
