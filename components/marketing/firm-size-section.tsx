'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { User, Users, Building2, ArrowRight, Check } from 'lucide-react'
import { useApp } from '@/components/providers/app-providers'

const TIERS = [
  {
    icon: User,
    title: 'Solo Practitioner',
    subtitle: '1 attorney · 40 case files/month',
    description: 'Sunday nights to Monday mornings. Your paralegal is you. Lawline handles the document marathon so you can show up to mediation prepared — not exhausted.',
    plan: 'Solo Plan · $49/mo',
    trial: '30-day free trial',
    use_cases: ['PI / med-mal practice', 'Family law financial disclosure', 'Contract dispute review'],
    highlight: false,
    accent: '#1A3A6B',
  },
  {
    icon: Users,
    title: 'Boutique Firm',
    subtitle: '2–15 attorneys · 200 case files/month',
    description: 'Your paralegals are drowning in pre-mediation prep while your attorneys wait for outputs. Lawline becomes your firm\'s most productive team member — instantly.',
    plan: 'Team Plan · $149/mo',
    trial: '14-day free trial',
    use_cases: ['Shared matter workspaces', 'Multi-paralegal workflows', 'Cross-attorney timeline review'],
    highlight: true,
    accent: '#B8963E',
  },
  {
    icon: Building2,
    title: 'Large Firm / Enterprise',
    subtitle: '15+ attorneys · Unlimited files',
    description: 'Am Law 200 litigation departments with financial institution clients can\'t use cloud AI. Lawline deploys on-prem on your Linux servers with SSO/SAML and full audit trails.',
    plan: 'Firm Plan · $399/mo',
    trial: '14-day free trial',
    use_cases: ['12,000-page discovery reviews', 'SSO/SAML + role-based access', 'Dedicated account manager'],
    highlight: false,
    accent: '#2D6B31',
  },
] as const

export function FirmSizeSection() {
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
            Right Size for Your Firm
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
            Solo, boutique, or Am Law —
            <br />
            <em style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #D4AE58 0%, #B8963E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Lawline scales with you
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
            The same AI engine. Different capacity, access controls, and support depending on your firm size.
          </p>
        </motion.div>

        {/* Tier cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
          alignItems: 'start',
        }}>
          {TIERS.map(({ icon: Icon, title, subtitle, description, plan, trial, use_cases, highlight, accent }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6, boxShadow: `0 24px 48px rgba(10,16,32,0.10), 0 4px 12px ${accent}18` }}
              style={{
                background: highlight ? `${accent}04` : '#FFFFFF',
                border: highlight ? `1.5px solid ${accent}35` : '1px solid var(--color-warm-100)',
                borderRadius: 'var(--radius-xl)',
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden',
                transition: 'box-shadow 0.3s ease, transform 0.3s ease',
              }}
            >
              {highlight && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: accent,
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.4375rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '0.25rem 0.875rem',
                  borderRadius: '0 0 8px 8px',
                  whiteSpace: 'nowrap',
                }}>
                  Most popular
                </div>
              )}

              {/* Accent corner */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '120px',
                height: '120px',
                background: `radial-gradient(ellipse at top right, ${accent}0E 0%, transparent 70%)`,
                pointerEvents: 'none',
              }} />

              {/* Icon */}
              <div style={{
                width: 48, height: 48,
                borderRadius: 'var(--radius-md)',
                background: `${accent}10`,
                border: `1px solid ${accent}22`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1.375rem',
                marginTop: highlight ? '0.5rem' : 0,
              }}>
                <Icon size={22} style={{ color: accent }} />
              </div>

              <h3 style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '1.125rem',
                fontWeight: 700,
                letterSpacing: '-0.015em',
                color: 'var(--color-ink)',
                marginBottom: '0.25rem',
                lineHeight: 1.2,
              }}>
                {title}
              </h3>

              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: accent,
                marginBottom: '1rem',
              }}>
                {subtitle}
              </div>

              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                lineHeight: 1.7,
                color: 'var(--color-muted)',
                marginBottom: '1.25rem',
              }}>
                {description}
              </p>

              <ul style={{ listStyle: 'none', margin: 0, padding: 0, marginBottom: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {use_cases.map(uc => (
                  <li key={uc} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <Check size={13} style={{ color: accent, flexShrink: 0, marginTop: '0.15rem' }} />
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8125rem',
                      color: 'var(--color-muted)',
                      lineHeight: 1.5,
                    }}>
                      {uc}
                    </span>
                  </li>
                ))}
              </ul>

              <div style={{
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--color-warm-100)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}>
                <div style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  color: 'var(--color-ink)',
                  letterSpacing: '-0.01em',
                }}>
                  {plan}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: accent,
                  marginBottom: '0.75rem',
                }}>
                  {trial}
                </div>
                <button
                  onClick={() => openComingSoon()}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: highlight ? '#FFFFFF' : accent,
                    background: highlight ? accent : `${accent}08`,
                    border: highlight ? 'none' : `1px solid ${accent}25`,
                    borderRadius: 'var(--radius-pill)',
                    padding: '0.75rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  Get started <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
