import type { Metadata } from 'next'
import Link from 'next/link'
import { XCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Checkout Cancelled',
  robots: { index: false },
}

export default function CheckoutCancelPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        background: 'var(--color-parchment)',
      }}
    >
      <div
        style={{
          maxWidth: '28rem',
          textAlign: 'center',
          background: 'var(--color-cream)',
          border: '1px solid var(--color-warm-100)',
          borderRadius: 'var(--radius-xl)',
          padding: '3rem 2rem',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'rgba(196,103,58,0.08)',
            border: '1px solid rgba(196,103,58,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
          }}
        >
          <XCircle size={28} style={{ color: 'var(--color-terracotta)' }} />
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            fontWeight: 300,
            letterSpacing: '-0.03em',
            color: 'var(--color-ink)',
            marginBottom: '0.75rem',
          }}
        >
          No charge made.
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--color-muted)',
            lineHeight: 1.7,
            marginBottom: '2rem',
          }}
        >
          You cancelled the checkout process. No payment was taken.
          You can return to pricing whenever you're ready.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Link href="/pricing" className="btn-primary" style={{ justifyContent: 'center' }}>
            Back to Pricing
          </Link>
          <Link href="/" className="btn-ghost" style={{ justifyContent: 'center' }}>
            Return Home
          </Link>
        </div>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--color-faint)', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: '2rem' }}>
          Questions? hello@lawline.ai
        </p>
      </div>
    </div>
  )
}
