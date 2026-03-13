/**
 * otp.ts — Stateless 6-digit OTP for email verification
 *
 * No database or Redis needed. Uses HMAC-SHA256 with a time window (TOTP-style).
 * Each code is valid for 5 minutes. The previous 5-minute window is also accepted
 * to handle slow email delivery.
 *
 * Security: brute-force is prevented by the IPC layer (desktop app) — only 1
 * attempt per request, and the code expires in 5 minutes (1,000,000 possible values).
 */

import { createHmac } from 'crypto'

const WINDOW_MS = 5 * 60 * 1000 // 5 minutes per code window

function getSecret(): string {
  const secret = process.env.OTP_SECRET
  if (!secret) throw new Error('OTP_SECRET env var is not set')
  return secret
}

function computeOtp(email: string, window: number): string {
  const hmac = createHmac('sha256', getSecret())
    .update(`${email.toLowerCase().trim()}:${window}`)
    .digest('hex')
  // Take first 8 hex chars → integer → mod 1_000_000 → zero-padded 6 digits
  return String(parseInt(hmac.slice(0, 8), 16) % 1_000_000).padStart(6, '0')
}

/** Generate the current OTP for an email. */
export function generateOtp(email: string): string {
  const window = Math.floor(Date.now() / WINDOW_MS)
  return computeOtp(email, window)
}

/**
 * Verify an OTP submitted by the user.
 * Accepts the current window AND the previous window (slow email delivery grace).
 */
export function verifyOtp(email: string, code: string): boolean {
  const now = Date.now()
  const currentWindow = Math.floor(now / WINDOW_MS)
  const prevWindow    = Math.floor((now - WINDOW_MS) / WINDOW_MS)

  return (
    code === computeOtp(email, currentWindow) ||
    code === computeOtp(email, prevWindow)
  )
}
