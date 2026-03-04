'use client'

import { useState, useEffect, useCallback } from 'react'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { getStripe } from '@/lib/stripe-client'
import { X, Lock, ShieldCheck } from 'lucide-react'

/* ── Stripe appearance ─────────────────────── */
const STRIPE_APPEARANCE = {
  theme: 'stripe' as const,
  variables: {
    colorPrimary:        '#C4673A',
    colorBackground:     '#F7F4EF',
    colorText:           '#1C1B18',
    colorTextSecondary:  '#6E6861',
    colorDanger:         '#dc2626',
    fontFamily:          'Inter, system-ui, sans-serif',
    borderRadius:        '10px',
    spacingUnit:         '4px',
  },
  rules: {
    '.Input': {
      border:          '1px solid #E0DBD1',
      boxShadow:       'none',
      backgroundColor: '#F7F4EF',
    },
    '.Input:focus': {
      border:    '1px solid #C4673A',
      boxShadow: '0 0 0 3px rgba(196,103,58,0.12)',
    },
    '.Label': {
      fontFamily:    'JetBrains Mono, monospace',
      fontSize:      '0.625rem',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color:         '#6E6861',
    },
  },
}

/* ── Inner payment form ─────────────────────── */
function PaymentForm({
  amount,
  onSuccess,
  onCancel,
}: {
  amount: number
  onSuccess: () => void
  onCancel: () => void
}) {
  const stripe   = useStripe()
  const elements = useElements()
  const [error,     setError]     = useState<string | null>(null)
  const [loading,   setLoading]   = useState(false)
  const [isDemo,    setIsDemo]    = useState(false)

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) setIsDemo(true)
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)
    setError(null)

    const { error: submitError } = await elements.submit()
    if (submitError) {
      setError(submitError.message ?? 'Validation failed')
      setLoading(false)
      return
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
    })

    if (confirmError) {
      setError(confirmError.message ?? 'Payment failed')
      setLoading(false)
    } else {
      onSuccess()
    }
  }, [stripe, elements, onSuccess])

  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', minimumFractionDigits: 0,
  }).format(amount / 100)

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Amount chip */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--color-parchment)',
          border: '1px solid var(--color-warm-100)',
          borderRadius: 'var(--radius-md)',
          padding: '0.875rem 1rem',
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--color-faint)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Lawline Desktop License
        </span>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', fontWeight: 400, color: 'var(--color-ink)', letterSpacing: '-0.02em' }}>
          {formattedAmount}
        </span>
      </div>

      {/* Demo notice */}
      {isDemo && (
        <div
          style={{
            background: 'rgba(196,103,58,0.08)',
            border: '1px solid rgba(196,103,58,0.2)',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 1rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            color: 'var(--color-terracotta)',
            letterSpacing: '0.04em',
          }}
        >
          Demo mode — no payment will be processed
        </div>
      )}

      {/* Stripe element or demo placeholder */}
      {!isDemo ? (
        <PaymentElement />
      ) : (
        <div
          style={{
            border: '1px dashed var(--color-warm-100)',
            borderRadius: 'var(--radius-md)',
            padding: '2rem',
            textAlign: 'center',
            color: 'var(--color-faint)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
          }}
        >
          Card element loads with Stripe publishable key
        </div>
      )}

      {error && (
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', color: '#dc2626', margin: 0 }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading || (!stripe && !isDemo)}
        className="btn-primary"
        style={{ justifyContent: 'center', padding: '0.875rem', fontSize: '0.9375rem', borderRadius: 'var(--radius-md)' }}
      >
        {loading ? 'Processing…' : `Pay ${formattedAmount}`}
      </button>

      <button
        type="button"
        onClick={onCancel}
        className="btn-ghost"
        style={{ justifyContent: 'center', padding: '0.75rem', fontSize: '0.875rem' }}
      >
        Cancel
      </button>

      {/* Trust badges */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        {[
          { icon: Lock,         text: '256-bit TLS' },
          { icon: ShieldCheck,  text: 'Stripe Secure' },
        ].map(({ icon: Icon, text }) => (
          <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--color-faint)' }}>
            <Icon size={11} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {text}
            </span>
          </div>
        ))}
      </div>
    </form>
  )
}

/* ── Modal shell ────────────────────────────── */
export function CheckoutModal({
  open,
  amount,
  clientSecret,
  onClose,
  onSuccess,
}: {
  open:          boolean
  amount:        number
  clientSecret?: string
  onClose:       () => void
  onSuccess:     () => void
}) {
  const [stripePromise] = useState(() => getStripe())

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!open) return null

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'rgba(28,27,24,0.6)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '28rem',
          background: 'var(--color-parchment)',
          borderRadius: 'var(--radius-xl) var(--radius-xl) var(--radius-lg) var(--radius-lg)',
          padding: '2rem',
          position: 'relative',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        {/* Handle */}
        <div
          style={{
            width: 40,
            height: 4,
            background: 'var(--color-warm-200)',
            borderRadius: 2,
            margin: '0 auto 1.5rem',
          }}
        />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <span className="text-label" style={{ color: 'var(--color-terracotta)', display: 'block', marginBottom: '0.25rem' }}>
              One-time Purchase
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: 'var(--color-ink)',
              }}
            >
              Lawline Desktop
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'var(--color-cream)',
              border: '1px solid var(--color-warm-100)',
              borderRadius: 'var(--radius-md)',
              padding: '0.5rem',
              cursor: 'pointer',
              color: 'var(--color-muted)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Stripe Elements */}
        {clientSecret ? (
          <Elements
            stripe={stripePromise}
            options={{ clientSecret, appearance: STRIPE_APPEARANCE }}
          >
            <PaymentForm amount={amount} onSuccess={onSuccess} onCancel={onClose} />
          </Elements>
        ) : (
          <PaymentForm amount={amount} onSuccess={onSuccess} onCancel={onClose} />
        )}
      </div>
    </div>
  )
}
