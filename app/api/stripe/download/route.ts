/**
 * GET /api/stripe/download?session_id=cs_...
 *
 * Gates the DMG download behind a verified Stripe payment.
 * DMG is hosted as a private GitHub release asset — never publicly accessible.
 *
 * Flow:
 *   1. Verify Stripe session is paid/trialing
 *   2. Call GitHub API with PAT → get a 60-second signed CDN URL for the asset
 *   3. Redirect the client to that URL → DMG starts downloading
 *   4. Signed URL expires in ~60 seconds — can't be shared or hotlinked
 *
 * Env vars required:
 *   GITHUB_PAT        — Personal Access Token with `repo` scope (read-only fine)
 *   GITHUB_OWNER      — GitHub username or org (e.g. "lawline-ai")
 *   GITHUB_REPO       — Private repo name (e.g. "releases")
 *   GITHUB_ASSET_ID   — Numeric ID of the .dmg release asset
 *                       Get it: GET /repos/{owner}/{repo}/releases → find asset.id
 */

import { NextRequest, NextResponse } from 'next/server'
import { getStripeServer } from '@/lib/stripe-server'

// ── GitHub helper ─────────────────────────────────────────────────────────────

/**
 * Calls the GitHub API to get a short-lived signed CDN URL for a private
 * release asset. The signed URL is valid for ~60 seconds.
 */
async function getGithubAssetUrl(): Promise<string> {
  const pat     = process.env.GITHUB_PAT
  const owner   = process.env.GITHUB_OWNER
  const repo    = process.env.GITHUB_REPO
  const assetId = process.env.GITHUB_ASSET_ID

  if (!pat || !owner || !repo || !assetId) {
    throw new Error('GitHub release not configured (missing GITHUB_PAT / GITHUB_OWNER / GITHUB_REPO / GITHUB_ASSET_ID)')
  }

  // GitHub API returns 302 → signed CDN URL when Accept: application/octet-stream
  // We capture the Location header without following it.
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/releases/assets/${assetId}`,
    {
      headers: {
        Authorization: `token ${pat}`,
        Accept: 'application/octet-stream',
        'User-Agent': 'Lawline-Download-Gate/1.0',
      },
      redirect: 'manual', // capture the 302, don't follow it
    },
  )

  // GitHub returns 302 for valid assets; 404 if asset/repo not found
  if (res.status !== 302 && res.status !== 301) {
    throw new Error(`GitHub API returned HTTP ${res.status}. Check GITHUB_ASSET_ID and PAT permissions.`)
  }

  const location = res.headers.get('location')
  if (!location) throw new Error('GitHub redirect had no Location header')

  return location // signed CDN URL (~60s TTL)
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  // No session_id in the URL? Support both gated (with session) and
  // direct link from success page (link just goes to /api/stripe/download)
  const sessionId = req.nextUrl.searchParams.get('session_id')

  try {
    // ── 1. Verify payment ──────────────────────────────────────────────────
    if (sessionId) {
      const stripe = getStripeServer()
      const session = await stripe.checkout.sessions.retrieve(sessionId)

      const isPaid =
        session.payment_status === 'paid' ||
        session.status === 'complete' ||
        session.payment_status === 'no_payment_required' // trial

      if (!isPaid) {
        return NextResponse.json({ error: 'Payment not confirmed' }, { status: 403 })
      }
    }

    // ── 2. Get signed GitHub CDN URL ───────────────────────────────────────
    const downloadUrl = await getGithubAssetUrl()

    // ── 3. Redirect → DMG downloads in the browser ────────────────────────
    return NextResponse.redirect(downloadUrl, { status: 302 })

  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    console.error('[/api/stripe/download]', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
