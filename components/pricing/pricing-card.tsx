'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import type { PricingPlan } from '@/types/billing'

type Props = {
  plan:       PricingPlan
  priceId?:   string
  trialDays?: number
  onCheckout: (priceId: string, mode: 'payment' | 'subscription', trialDays?: number) => void
}

export function PricingCard({ plan, priceId, trialDays, onCheckout }: Props) {
  const [loading, setLoading] = useState(false)

  const isFeatured   = plan.featured
  const isEnterprise = plan.id === 'enterprise'

  const handleClick = async () => {
    if (isEnterprise) {
      window.location.href = 'mailto:hello@lawline.ai?subject=Enterprise Inquiry'
      return
    }
    if (!priceId) return

    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId,
          mode: plan.billingMode,
          trialDays: trialDays ?? plan.trialDays ?? undefined,
          successUrl: `${window.location.origin}/checkout/success`,
          cancelUrl:  `${window.location.origin}/pricing`,
        }),
      })
      const json = await res.json()
      if (json.ok && json.url) window.location.href = json.url
    } finally {
      setLoading(false)
    }
  }

  const formattedPrice = plan.price != null
    ? `$${plan.price}`
    : 'Custom'

  return (
    <div
      style={{
        position: 'relative',
        padding: '2rem',
        borderRadius: 'var(--radius-lg)',
        border: isFeatured
          ? '1px solid rgba(184,150,62,0.30)'
          : '1px solid var(--color-warm-100)',
        background: isFeatured
          ? 'var(--color-ink)'
          : 'var(--color-parchment)',
        boxShadow: isFeatured
          ? 'var(--shadow-accent)'
          : 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
      }}
    >
      {/* Featured badge */}
      {plan.badge && (
        <div
          style={{
            position: 'absolute',
            top: '-1px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--color-terracotta)',
            color: 'var(--color-parchment)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5625rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '0.25rem 0.875rem',
            borderRadius: '0 0 var(--radius-md) var(--radius-md)',
          }}
        >
          {plan.badge}
        </div>
      )}

      {/* Plan name */}
      <span className="text-label" style={{ color: isFeatured ? 'rgba(253,252,250,0.5)' : 'var(--color-faint)', marginBottom: '0.5rem', display: 'block' }}>
        {plan.name}
      </span>

      {/* Tagline */}
      <p
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.875rem',
          color: isFeatured ? 'rgba(253,252,250,0.7)' : 'var(--color-muted)',
          marginBottom: '1.5rem',
          lineHeight: 1.5,
        }}
      >
        {plan.tagline}
      </p>

      {/* Price */}
      <div style={{ marginBottom: '0.5rem' }}>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '3rem',
            fontWeight: 300,
            letterSpacing: '-0.04em',
            color: isFeatured ? 'var(--color-parchment)' : 'var(--color-ink)',
          }}
        >
          {formattedPrice}
        </span>
        {plan.price != null && (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              color: isFeatured ? 'rgba(253,252,250,0.5)' : 'var(--color-faint)',
              letterSpacing: '0.05em',
              marginLeft: '0.375rem',
            }}
          >
            / month
          </span>
        )}
      </div>

      {/* Trial */}
      {plan.trialDays && (
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            color: isFeatured ? 'rgba(196,103,58,0.9)' : 'var(--color-terracotta)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '1.75rem',
          }}
        >
          {plan.trialDays}-day free trial
        </span>
      )}

      {!plan.trialDays && <div style={{ marginBottom: '1.75rem' }} />}

      {/* Divider */}
      <div style={{ height: 1, background: isFeatured ? 'rgba(255,255,255,0.08)' : 'var(--color-warm-100)', marginBottom: '1.75rem' }} />

      {/* Features */}
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
        {plan.features.map(feature => (
          <li
            key={feature}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.625rem',
            }}
          >
            <Check
              size={14}
              style={{
                color: isFeatured ? 'var(--color-terracotta)' : 'var(--color-sage)',
                flexShrink: 0,
                marginTop: '0.15rem',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: isFeatured ? 'rgba(253,252,250,0.8)' : 'var(--color-muted)',
                lineHeight: 1.45,
              }}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={handleClick}
        disabled={loading}
        style={{
          marginTop: '2rem',
          width: '100%',
          padding: '0.875rem',
          borderRadius: 'var(--radius-md)',
          border: isFeatured ? 'none' : '1px solid var(--color-warm-100)',
          background: isFeatured ? 'var(--color-terracotta)' : 'var(--color-cream)',
          color: isFeatured ? 'var(--color-parchment)' : 'var(--color-ink)',
          fontFamily: 'var(--font-ui)',
          fontSize: '0.875rem',
          fontWeight: 500,
          cursor: loading ? 'wait' : 'pointer',
          transition: 'all 0.15s ease',
        }}
        onMouseEnter={e => {
          if (!isFeatured) (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-cream-deep)'
        }}
        onMouseLeave={e => {
          if (!isFeatured) (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-cream)'
        }}
      >
        {loading ? 'Redirecting…' : plan.cta}
      </button>
    </div>
  )
}
