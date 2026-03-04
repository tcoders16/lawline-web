import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Payment Successful',
  robots: { index: false },
}

export default function CheckoutSuccessPage() {
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
        {/* Icon */}
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'rgba(78,123,82,0.12)',
            border: '1px solid rgba(78,123,82,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
          }}
        >
          <CheckCircle size={28} style={{ color: 'var(--color-sage)' }} />
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
          You're all set.
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--color-muted)',
            lineHeight: 1.7,
            marginBottom: '2rem',
          }}
        >
          Your Lawline subscription is active. Check your email for your receipt and
          getting-started guide. We're glad you're here.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Link href="/" className="btn-primary" style={{ justifyContent: 'center' }}>
            Go to Dashboard
          </Link>
          <Link href="/insights" className="btn-ghost" style={{ justifyContent: 'center' }}>
            Read the Insights
          </Link>
        </div>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--color-faint)', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: '2rem' }}>
          Questions? hello@lawline.ai
        </p>
      </div>
    </div>
  )
}
