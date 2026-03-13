/**
 * POST /api/auth/register
 *
 * Called from the success page after Stripe checkout.
 * 1. Verifies the session is paid
 * 2. Derives a deterministic password from sessionId + server secret
 *    (same session always yields same password — safe to refresh success page)
 * 3. Stores bcrypt-style hash in Stripe customer metadata
 * 4. Returns the plaintext password to show ONCE on the success page
 *
 * The password is 12 chars, alphanumeric — e.g. "aB3xK9mQr2Tz"
 * User copies it and uses it alongside their email to log into the Electron app.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createHmac, createHash } from 'crypto'
import { getStripeServer } from '@/lib/stripe-server'

export const runtime = 'nodejs'

function derivePassword(sessionId: string): string {
  const secret = process.env.PASSWORD_DERIVE_SECRET ?? 'lawline-pw-secret'
  const raw = createHmac('sha256', secret).update(sessionId).digest('base64url')
  // Keep only alphanumeric chars, take first 12
  return raw.replace(/[^a-zA-Z0-9]/g, '').slice(0, 12)
}

function hashPassword(plaintext: string, customerId: string): string {
  return createHash('sha256')
    .update(plaintext + ':' + customerId)
    .digest('hex')
}

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = (await req.json()) as { sessionId?: string }

    if (!sessionId) {
      return NextResponse.json({ ok: false, error: 'Missing sessionId' }, { status: 400 })
    }

    const stripe = getStripeServer()
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    const isPaid =
      session.payment_status === 'paid' ||
      session.status === 'complete' ||
      session.payment_status === 'no_payment_required'

    if (!isPaid) {
      return NextResponse.json({ ok: false, error: 'Payment not confirmed' }, { status: 403 })
    }

    const customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id
    if (!customerId) {
      return NextResponse.json({ ok: false, error: 'No customer on session' }, { status: 422 })
    }

    // Derive password (deterministic — same session always gives same password)
    const password = derivePassword(sessionId)
    const passwordHash = hashPassword(password, customerId)

    // Only write to Stripe if no password exists yet (idempotent)
    const customer = await stripe.customers.retrieve(customerId)
    const existingHash = (customer as any).metadata?.passwordHash

    if (!existingHash) {
      await stripe.customers.update(customerId, {
        metadata: { passwordHash, passwordSetAt: new Date().toISOString() },
      })
    }

    const email = session.customer_details?.email ?? session.customer_email ?? ''

    return NextResponse.json({ ok: true, password, email })
  } catch (err) {
    console.error('[/api/auth/register]', err)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}
