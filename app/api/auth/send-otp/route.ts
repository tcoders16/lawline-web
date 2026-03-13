/**
 * POST /api/auth/send-otp
 *
 * Step 1 of the email-verification auth flow:
 *
 *   1. Receive { email }
 *   2. Check Stripe — does this email have an active subscription?
 *      → No subscription / unpaid → { ok: false, reason: 'no_subscription' }
 *      → Subscription inactive   → { ok: false, reason: 'inactive', status }
 *   3. Generate a stateless 6-digit OTP (HMAC-based, no DB needed)
 *   4. Send OTP email via Gmail SMTP (from emailtosolankiom@gmail.com)
 *   5. Return { ok: true }
 *
 * OTP is valid for 10 minutes (2 × 5-minute TOTP windows).
 *
 * Request:  { email: string }
 * Response: { ok: true }
 *           { ok: false, reason: 'no_subscription' | 'inactive' | 'error', status?: string }
 */

import { NextRequest, NextResponse } from 'next/server'
import { getStripeServer } from '@/lib/stripe-server'
import { generateOtp } from '@/lib/otp'
import { sendMail } from '@/lib/mailer'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const { email } = (await req.json()) as { email?: string }

    if (!email || !email.includes('@')) {
      return NextResponse.json({ ok: false, reason: 'error', error: 'Valid email is required' }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()
    const stripe = getStripeServer()

    // 1. Find Stripe customer by email
    const customers = await stripe.customers.list({ email: normalizedEmail, limit: 1 })

    if (!customers.data.length) {
      return NextResponse.json({ ok: false, reason: 'no_subscription' }, { status: 404 })
    }

    const customer = customers.data[0]

    // 2. Check subscription status
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: 'all',
      limit: 10,
    })

    const sub =
      subscriptions.data.find(s => s.status === 'active') ??
      subscriptions.data.find(s => s.status === 'trialing') ??
      subscriptions.data.find(s => s.status === 'past_due')

    if (!sub) {
      return NextResponse.json({ ok: false, reason: 'no_subscription' }, { status: 404 })
    }

    const allowed = sub.status === 'active' || sub.status === 'trialing' || sub.status === 'past_due'
    if (!allowed) {
      return NextResponse.json({ ok: false, reason: 'inactive', status: sub.status }, { status: 403 })
    }

    // 3. Generate stateless OTP (HMAC, no DB)
    const otp = generateOtp(normalizedEmail)

    // 4. Send via Gmail SMTP
    await sendMail({
      to: normalizedEmail,
      subject: `${otp} — Your Lawline activation code`,
      text: [
        `Your Lawline activation code is:`,
        ``,
        `  ${otp}`,
        ``,
        `Enter this code in the Lawline desktop app to sign in.`,
        `This code expires in 10 minutes.`,
        ``,
        `If you didn't request this, you can safely ignore this email.`,
        ``,
        `— Lawline`,
      ].join('\n'),
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#F5F7FC;font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F7FC;padding:48px 16px;">
    <tr><td align="center">
      <table width="480" cellpadding="0" cellspacing="0"
             style="background:#ffffff;border-radius:12px;border:1px solid #E2E5EF;overflow:hidden;max-width:480px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#0D1729;padding:24px 32px;">
            <p style="margin:0;font-size:18px;font-weight:600;color:#FDFCFA;letter-spacing:0.02em;font-family:Georgia,serif;">
              ⚖ Lawline
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 32px 28px;">
            <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#0D1729;letter-spacing:-0.02em;">
              Your activation code
            </h1>
            <p style="margin:0 0 28px;font-size:14px;color:#4A5578;line-height:1.6;">
              Enter this code in the <strong>Lawline</strong> desktop app to sign in.
            </p>

            <!-- OTP block -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr>
                <td align="center" style="background:#F5F7FC;border:1px solid #E2E5EF;border-radius:10px;padding:24px;">
                  <p style="margin:0 0 6px;font-size:11px;font-weight:600;color:#8890A8;letter-spacing:0.12em;text-transform:uppercase;">
                    Activation Code
                  </p>
                  <p style="margin:0;font-size:42px;font-weight:700;color:#0D1729;letter-spacing:0.25em;font-family:'Courier New',Courier,monospace;">
                    ${otp}
                  </p>
                </td>
              </tr>
            </table>

            <p style="margin:0;font-size:13px;color:#8890A8;line-height:1.65;">
              This code expires in <strong>10 minutes</strong>.
              If you didn't request this, you can safely ignore this email.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:16px 32px;border-top:1px solid #E2E5EF;background:#F9FAFB;">
            <p style="margin:0;font-size:11px;color:#8890A8;">
              Lawline &middot; AI Legal Intelligence &middot; lawline.tech
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
      `.trim(),
    })

    return NextResponse.json({ ok: true })

  } catch (err) {
    console.error('[/api/auth/send-otp]', err)
    return NextResponse.json({ ok: false, reason: 'error', error: 'Failed to send code' }, { status: 500 })
  }
}
