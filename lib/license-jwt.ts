/**
 * License JWT — RS256 asymmetric signing
 *
 * Server signs tokens with the RSA private key (JWT_PRIVATE_KEY_BASE64).
 * The macOS app verifies tokens offline using the embedded public key.
 *
 * Token lifetime: 7 days (app silently refreshes on next online launch).
 * Offline grace: app may allow 7 extra days if it can't reach the server.
 */

import { SignJWT, jwtVerify, importPKCS8, importSPKI } from 'jose'

export type LicenseStatus =
  | 'trialing'
  | 'active'
  | 'past_due'
  | 'canceled'
  | 'incomplete'
  | 'incomplete_expired'
  | 'paused'
  | 'unpaid'

export interface LicenseClaims {
  /** Stripe customer email */
  email: string
  /** Stripe customer ID */
  customerId: string
  /** Stripe subscription ID */
  subscriptionId: string
  /** Subscription status from Stripe */
  status: LicenseStatus
  /** ISO string — when the current period (or trial) ends */
  validUntil: string
  /** ISO string — trial end date, null if not in trial */
  trialEnd: string | null
  /** Days left in trial, null if not trialing */
  trialDaysLeft: number | null
}

const ALGORITHM = 'RS256'
/** Token is valid for 7 days — app refreshes silently on next online launch */
const TOKEN_TTL = '7d'

function getPrivateKeyPem(): string {
  const b64 = process.env.JWT_PRIVATE_KEY_BASE64
  if (!b64) throw new Error('JWT_PRIVATE_KEY_BASE64 env var is not set')
  return Buffer.from(b64, 'base64').toString('utf8')
}

function getPublicKeyPem(): string {
  const b64 = process.env.JWT_PUBLIC_KEY_BASE64
  if (!b64) throw new Error('JWT_PUBLIC_KEY_BASE64 env var is not set')
  return Buffer.from(b64, 'base64').toString('utf8')
}

/** Sign a license token. Called server-side only. */
export async function signLicenseToken(claims: LicenseClaims): Promise<string> {
  const privateKey = await importPKCS8(getPrivateKeyPem(), ALGORITHM)

  return new SignJWT({ ...claims })
    .setProtectedHeader({ alg: ALGORITHM })
    .setIssuedAt()
    .setIssuer('lawline.ai')
    .setAudience('lawline-macos')
    .setExpirationTime(TOKEN_TTL)
    .sign(privateKey)
}

/** Verify a license token. Can run offline in the macOS app using the embedded public key. */
export async function verifyLicenseToken(
  token: string,
  publicKeyPem?: string,
): Promise<LicenseClaims> {
  const pem = publicKeyPem ?? getPublicKeyPem()
  const publicKey = await importSPKI(pem, ALGORITHM)

  const { payload } = await jwtVerify(token, publicKey, {
    issuer:   'lawline.ai',
    audience: 'lawline-macos',
  })

  return payload as unknown as LicenseClaims
}

/** Returns true if the status allows app access */
export function isAccessGranted(status: LicenseStatus): boolean {
  return status === 'active' || status === 'trialing' || status === 'past_due'
}
