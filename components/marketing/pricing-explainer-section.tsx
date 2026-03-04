'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check, ArrowRight, Zap, Shield, Users } from 'lucide-react'
import { useApp } from '@/components/providers/app-providers'

const PLANS = [
  {
    name: 'Solo',
    price: 49,
    period: '/mo',
    trial: '30-day free trial',
    tagline: 'For the attorney who is also the paralegal',
    capacity: '40 case files/month',
    features: [
      'Unlimited document uploads (up to 1 GB/file)',
      'Case timeline builder — source-linked',
      'Demand letter generator',
      'Deposition summarizer',
      'Email: support@lawline.ai',
      'PDF, DOCX, XLSX export',
    ],
    notIncluded: ['Team workspaces', 'SSO/SAML', 'On-premises deployment'],
    accent: '#1A3A6B',
    icon: Zap,
    highlight: false,
  },
  {
    name: 'Team',
    price: 149,
    period: '/mo',
    trial: '14-day free trial',
    tagline: 'For boutique firms drowning in pre-mediation prep',
    capacity: '200 case files/month',
    features: [
      'Everything in Solo',
      'Up to 15 user seats',
      'Shared matter workspaces',
      'Cross-attorney timeline review',
      'Role-based access (partner vs. paralegal)',
      'Priority support (4-hour response)',
      'Billing rate: $149/mo — or $99/seat if >3 users',
    ],
    notIncluded: ['On-premises deployment', 'Dedicated account manager'],
    accent: '#B8963E',
    icon: Users,
    highlight: true,
  },
  {
    name: 'Firm',
    price: 399,
    period: '/mo',
    trial: '14-day free trial',
    tagline: 'For Am Law 200 and firms with data sovereignty requirements',
    capacity: 'Unlimited files',
    features: [
      'Everything in Team',
      'On-premises deployment (your Linux servers)',
      'SSO/SAML integration',
      'Full audit trail + session logs',
      'Dedicated account manager',
      'Custom model fine-tuning available',
      'Unlimited seats',
      'SLA: 99.9% uptime guarantee',
    ],
    notIncluded: [],
    accent: '#2D6B31',
    icon: Shield,
    highlight: false,
  },
] as const

export function PricingExplainerSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { openComingSoon } = useApp()

  return (
    <section
      ref={ref}
      style={{
        padding: '8rem 2rem',
        background: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '76rem', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--color-terracotta)',
            display: 'block',
            marginBottom: '1.25rem',
          }}>
            Simple Pricing
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)',
            fontWeight: 300,
            letterSpacing: '-0.03em',
            color: 'var(--color-ink)',
            lineHeight: 1.08,
            marginBottom: '1.25rem',
          }}>
            Pay for what your firm
            <br />
            <em style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #D4AE58 0%, #B8963E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              actually needs
            </em>
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--color-muted)',
            maxWidth: '38rem',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            No per-document fees. No per-seat minimums on Solo. One flat rate — your documents, your hardware if you need it.
          </p>
        </motion.div>

        {/* Plans */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
          alignItems: 'start',
        }}>
          {PLANS.map(({ name, price, period, trial, tagline, capacity, features, notIncluded, accent, icon: Icon, highlight }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                background: highlight ? `${accent}04` : '#FFFFFF',
                border: highlight ? `1.5px solid ${accent}35` : '1px solid var(--color-warm-100)',
                borderRadius: 'var(--radius-xl)',
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {highlight && (
                <div style={{
                  position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                  background: accent, color: '#FFFFFF',
                  fontFamily: 'var(--font-mono)', fontSize: '0.4375rem', letterSpacing: '0.1em',
                  textTransform: 'uppercase', padding: '0.25rem 0.875rem',
                  borderRadius: '0 0 8px 8px',
                }}>
                  Most popular
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem', marginTop: highlight ? '0.75rem' : 0 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 'var(--radius-md)',
                  background: `${accent}10`, border: `1px solid ${accent}22`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={16} style={{ color: accent }} />
                </div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-ink)', letterSpacing: '-0.015em' }}>{name}</div>
              </div>

              {/* Price */}
              <div style={{ marginBottom: '0.5rem' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 400, color: accent, letterSpacing: '-0.03em', lineHeight: 1 }}>
                  ${price}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.07em', color: 'var(--color-faint)', textTransform: 'uppercase', marginLeft: '0.25rem' }}>
                  {period}
                </span>
              </div>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4375rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: accent, marginBottom: '0.25rem' }}>
                {capacity}
              </div>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#2D6B31', marginBottom: '1rem' }}>
                {trial}
              </div>

              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--color-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                {tagline}
              </p>

              {/* Features */}
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: notIncluded.length ? '1rem' : '1.75rem' }}>
                {features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <Check size={12} style={{ color: accent, flexShrink: 0, marginTop: '0.15rem' }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--color-muted)', lineHeight: 1.5 }}>{f}</span>
                  </li>
                ))}
              </ul>

              {/* Not included */}
              {notIncluded.length > 0 && (
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.75rem', paddingTop: '1rem', borderTop: '1px dashed var(--color-warm-100)' }}>
                  {notIncluded.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', opacity: 0.45 }}>
                      <div style={{ width: 12, height: 12, flexShrink: 0, marginTop: '0.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: 8, height: 1, background: 'var(--color-faint)' }} />
                      </div>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-faint)', lineHeight: 1.5 }}>{f}</span>
                    </li>
                  ))}
                </ul>
              )}

              <button
                onClick={() => openComingSoon()}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                  fontFamily: 'var(--font-ui)', fontSize: '0.875rem', fontWeight: 500,
                  color: highlight ? '#FFFFFF' : accent,
                  background: highlight ? accent : `${accent}08`,
                  border: highlight ? 'none' : `1px solid ${accent}25`,
                  borderRadius: 'var(--radius-pill)', padding: '0.75rem',
                  cursor: 'pointer',
                }}
              >
                Start free trial <ArrowRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.6 }}
          style={{
            textAlign: 'center',
            marginTop: '2rem',
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            color: 'var(--color-faint)',
          }}
        >
          All plans include export to PDF, DOCX, and XLSX. No per-file fees. Cancel anytime.{' '}
          <span style={{ color: 'var(--color-navy)', textDecoration: 'underline', cursor: 'pointer' }}>
            Compare all features →
          </span>
        </motion.div>
      </div>
    </section>
  )
}
