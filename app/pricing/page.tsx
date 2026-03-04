'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Mail, Download, ChevronDown } from 'lucide-react'
import { PricingCard } from '@/components/pricing/pricing-card'
import { CheckoutModal } from '@/components/payment/checkout-modal'
import { usePrices } from '@/hooks/use-prices'
import type { PricingPlan } from '@/types/billing'

const PLANS: PricingPlan[] = [
  {
    id:          'solo',
    name:        'Solo',
    tagline:     'Perfect for solo practitioners who need AI-powered case prep without complexity.',
    price:       49,
    priceKey:    'solo',
    billingMode: 'subscription',
    trialDays:   30,
    featured:    false,
    features: [
      '40 case files / month',
      'AI timeline generation',
      'PDF & DOCX export',
      'Source-linked citations',
      'Email support',
      '30-day free trial',
    ],
    cta: 'Start Free Trial',
  },
  {
    id:          'team',
    name:        'Team',
    tagline:     'For small firms managing multiple matters simultaneously with shared workspaces.',
    price:       149,
    priceKey:    'team',
    billingMode: 'subscription',
    trialDays:   14,
    featured:    true,
    badge:       'Most Popular',
    features: [
      '200 case files / month',
      'Everything in Solo',
      'Shared team workspace',
      'Role-based access control',
      'Audit log',
      'Priority support',
    ],
    cta: 'Start Free Trial',
  },
  {
    id:          'firm',
    name:        'Firm',
    tagline:     'For established litigation practices that demand enterprise security and analytics.',
    price:       399,
    priceKey:    'firm',
    billingMode: 'subscription',
    trialDays:   14,
    featured:    false,
    features: [
      'Unlimited case files',
      'Everything in Team',
      'Advanced analytics dashboard',
      'SSO / SAML',
      'Custom model fine-tuning',
      'Dedicated account manager',
    ],
    cta: 'Start Free Trial',
  },
  {
    id:          'enterprise',
    name:        'On-Prem Pro',
    tagline:     'Air-gapped deployment. Your data never leaves your infrastructure.',
    price:       null,
    priceKey:    null,
    billingMode: 'payment',
    trialDays:   null,
    featured:    false,
    features: [
      'Air-gapped macOS / Linux',
      'Everything in Firm',
      'White-label option',
      'Custom SLA',
      'On-site training',
      'Source code license',
    ],
    cta: 'Contact Sales',
  },
]

const FAQS = [
  {
    q: 'What document types does Lawline support?',
    a: 'Lawline reads PDFs, Word (.docx), plain text, and email exports (.eml, .msg). We also support scanned PDFs via OCR. Discovery packages and Bates-stamped documents are handled natively.',
  },
  {
    q: 'Is my client data secure?',
    a: 'All cloud plans encrypt data in transit (TLS 1.3) and at rest (AES-256). For maximum security, choose the On-Prem Pro plan — your data never touches our servers.',
  },
  {
    q: 'Can I cancel my subscription at any time?',
    a: 'Yes. Cancel anytime from your billing dashboard. Your access continues until the end of the billing period. No cancellation fees.',
  },
  {
    q: 'What is the macOS Desktop app?',
    a: 'The macOS Desktop app runs Lawline entirely on your machine — no internet connection required after setup. It is a one-time $99 lifetime license, separate from the cloud subscription tiers.',
  },
  {
    q: 'Do you offer discounts for public defenders or legal aid organizations?',
    a: 'Yes. Contact us at hello@lawline.ai with proof of your organization and we will arrange a significantly discounted rate.',
  },
]

export default function PricingPage() {
  const { data: prices, loading } = usePrices()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // DMG purchase state
  const [email,          setEmail]          = useState('')
  const [clientSecret,   setClientSecret]   = useState<string | undefined>()
  const [modalOpen,      setModalOpen]      = useState(false)
  const [dmgLoading,     setDmgLoading]     = useState(false)
  const [dmgSuccess,     setDmgSuccess]     = useState(false)

  const handleDmgPurchase = async () => {
    if (!email.includes('@')) return
    setDmgLoading(true)
    try {
      const res  = await fetch('/api/stripe/payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 9900, email }),
      })
      const json = await res.json()
      if (json.ok) {
        setClientSecret(json.clientSecret)
        setModalOpen(true)
      }
    } finally {
      setDmgLoading(false)
    }
  }

  const getPriceId = (plan: PricingPlan) => {
    if (!plan.priceKey || !prices) return undefined
    return prices[plan.priceKey]
  }

  const getTrialDays = (plan: PricingPlan) => {
    if (!plan.priceKey || !prices) return plan.trialDays ?? undefined
    return (prices.trialDays as Record<string, number>)[plan.priceKey] ?? plan.trialDays ?? undefined
  }

  return (
    <>
      {/* ── Hero ──────────────────────────────── */}
      <section
        style={{
          padding: '8rem 2rem 5rem',
          textAlign: 'center',
          background: `radial-gradient(ellipse 70% 50% at 50% -5%, rgba(196,103,58,0.05) 0%, transparent 60%), var(--color-parchment)`,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-label" style={{ color: 'var(--color-terracotta)', display: 'block', marginBottom: '1.25rem' }}>
            Pricing
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 300,
              letterSpacing: '-0.03em',
              color: 'var(--color-ink)',
              lineHeight: 1.05,
              marginBottom: '1.25rem',
            }}
          >
            Simple, transparent
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--color-terracotta)' }}>pricing</em>
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.0625rem',
              color: 'var(--color-muted)',
              maxWidth: '34rem',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Start free. No credit card required. Cancel anytime.
            Scale as your practice grows.
          </p>
        </motion.div>
      </section>

      {/* ── Pricing grid ──────────────────────── */}
      <section style={{ padding: '0 2rem 6rem', background: 'var(--color-parchment)' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-faint)', fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.08em' }}>
              LOADING PRICES…
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
                gap: '1rem',
                alignItems: 'start',
              }}
            >
              {PLANS.map((plan, i) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  style={{ paddingTop: plan.featured ? '0' : '1.5rem' }}
                >
                  <PricingCard
                    plan={plan}
                    priceId={getPriceId(plan)}
                    trialDays={getTrialDays(plan)}
                    onCheckout={(priceId, mode, trialDays) => {
                      // Handled inside PricingCard
                    }}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Stats strip ───────────────────────── */}
      <section
        style={{
          padding: '3rem 2rem',
          background: 'var(--color-cream)',
          borderTop: '1px solid var(--color-warm-100)',
          borderBottom: '1px solid var(--color-warm-100)',
        }}
      >
        <div
          style={{
            maxWidth: '72rem',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '2rem',
            textAlign: 'center',
          }}
        >
          {[
            { value: '2,400+', label: 'Case files analyzed' },
            { value: '94%',    label: 'Time saved on prep' },
            { value: '<8s',    label: 'Timeline generation' },
            { value: 'SOC 2',  label: 'Compliant' },
          ].map(({ value, label }) => (
            <div key={label}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 300, letterSpacing: '-0.03em', color: 'var(--color-ink)' }}>
                {value}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-faint)', marginTop: '0.25rem' }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── DMG / Desktop section ─────────────── */}
      <section style={{ padding: '6rem 2rem', background: 'var(--color-parchment)' }}>
        <div
          style={{
            maxWidth: '52rem',
            margin: '0 auto',
            background: 'var(--color-cream)',
            border: '1px solid var(--color-warm-100)',
            borderRadius: 'var(--radius-xl)',
            padding: '3rem',
            textAlign: 'center',
          }}
        >
          {!dmgSuccess ? (
            <>
              <span className="text-label" style={{ color: 'var(--color-muted)', display: 'block', marginBottom: '1rem' }}>
                Desktop App
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                  fontWeight: 300,
                  letterSpacing: '-0.03em',
                  color: 'var(--color-ink)',
                  marginBottom: '0.875rem',
                }}
              >
                Lawline for macOS
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)', lineHeight: 1.7, marginBottom: '0.5rem' }}>
                Run Lawline entirely on your machine. Air-gapped, offline-first, lifetime license.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.5rem',
                  fontWeight: 300,
                  letterSpacing: '-0.04em',
                  color: 'var(--color-ink)',
                  margin: '1.5rem 0',
                }}
              >
                $99 <span style={{ fontSize: '1rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em', color: 'var(--color-faint)' }}>one-time</span>
              </p>

              <div style={{ display: 'flex', gap: '0.75rem', maxWidth: '28rem', margin: '0 auto' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <Mail size={14} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-faint)' }} />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.875rem 0.75rem 2.25rem',
                      border: '1px solid var(--color-warm-100)',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--color-parchment)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      color: 'var(--color-ink)',
                      outline: 'none',
                    }}
                    onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-terracotta)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(196,103,58,0.12)' }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'var(--color-warm-100)'; e.currentTarget.style.boxShadow = 'none' }}
                  />
                </div>
                <button
                  onClick={handleDmgPurchase}
                  disabled={dmgLoading || !email.includes('@')}
                  className="btn-primary"
                  style={{ whiteSpace: 'nowrap', padding: '0.75rem 1.25rem', opacity: !email.includes('@') ? 0.5 : 1 }}
                >
                  {dmgLoading ? '…' : 'Buy & Download'}
                  {!dmgLoading && <Download size={14} />}
                </button>
              </div>

              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--color-faint)', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: '1.25rem' }}>
                License key delivered to your email · macOS 13+ · Apple Silicon & Intel
              </p>

              <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                {['256-bit TLS', 'Stripe Secure', 'No recurring charge'].map(t => (
                  <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Check size={11} style={{ color: 'var(--color-sage)' }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--color-faint)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      {t}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 300, color: 'var(--color-ink)', marginBottom: '0.75rem' }}>
                Purchase complete!
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)' }}>
                Your license key and download link have been sent to {email}.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────── */}
      <section
        style={{
          padding: '6rem 2rem',
          background: 'var(--color-cream)',
          borderTop: '1px solid var(--color-warm-100)',
        }}
      >
        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="text-label" style={{ color: 'var(--color-terracotta)', display: 'block', marginBottom: '0.75rem' }}>
              FAQ
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 300,
                letterSpacing: '-0.03em',
                color: 'var(--color-ink)',
              }}
            >
              Common questions
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {FAQS.map(({ q, a }, i) => (
              <div
                key={i}
                style={{
                  borderBottom: '1px solid var(--color-warm-100)',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    padding: '1.375rem 0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.9375rem',
                      fontWeight: 500,
                      color: 'var(--color-ink)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {q}
                  </span>
                  <ChevronDown
                    size={16}
                    style={{
                      color: 'var(--color-faint)',
                      flexShrink: 0,
                      transform: openFaq === i ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s ease',
                    }}
                  />
                </button>
                {openFaq === i && (
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      lineHeight: 1.75,
                      color: 'var(--color-muted)',
                      padding: '0 0 1.5rem',
                      margin: 0,
                    }}
                  >
                    {a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checkout modal */}
      <CheckoutModal
        open={modalOpen}
        amount={9900}
        clientSecret={clientSecret}
        onClose={() => setModalOpen(false)}
        onSuccess={() => { setModalOpen(false); setDmgSuccess(true) }}
      />
    </>
  )
}
