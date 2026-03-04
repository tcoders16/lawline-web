import { NextResponse } from 'next/server'

export async function GET() {
  const isLive = process.env.STRIPE_SECRET_KEY?.startsWith('sk_live') ?? false
  return NextResponse.json({
    ok: true,
    mode: isLive ? 'live' : 'sandbox',
    timestamp: new Date().toISOString(),
  })
}
