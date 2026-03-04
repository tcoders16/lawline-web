'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, TrendingUp, Clock, FileText } from 'lucide-react'
import { useApp } from '@/components/providers/app-providers'

const CASE_STUDIES = [
  {
    firm:       'Regional PI firm, 12 attorneys',
    location:   'Chicago, IL',
    practice:   'Personal Injury / Med-Mal',
    challenge:  'A 900-page medical malpractice file due at mediation in three days. The chronology alone was a 2-day paralegal project. The team had been burned before by rushing a timeline and missing a critical gap.',
    solution:   'Dropped all 900 pages into Lawline — 14 medical record sets, 2 expert reports, and 3 deposition transcripts. Lawline built a 54-event source-linked chronology in 47 seconds, flagged an 8-hour delay between documented symptom onset and physician intervention, and surfaced a contradictory statement in the treating physician\'s deposition.',
    outcome:    'Settled for 40% above the firm\'s floor. The paralegal used the two freed days for deposition prep on two other active matters.',
    metrics: [
      { icon: Clock,       label: 'Timeline time',       before: '2 days',   after: '47 seconds' },
      { icon: TrendingUp,  label: 'Settlement vs floor', before: '—',        after: '+40%'       },
      { icon: FileText,    label: 'Events flagged',      before: '0 caught', after: '8-hr gap'   },
    ],
    accent: '#B8963E',
  },
  {
    firm:       'Am Law 200 Securities Litigation Dept.',
    location:   'San Francisco, CA',
    practice:   'Securities / Regulatory',
    challenge:  'A 12,000-page discovery production from a regulatory matter with financial institution clients under active scrutiny. Every other AI vendor the team evaluated sent data to a cloud — a hard nonstarter under client security requirements.',
    solution:   'Lawline deployed on-prem on the firm\'s Linux servers. Processed all 12,000 pages over a weekend with zero data egress. Produced a privilege log, responsiveness tags, and a chronological summary by custodian.',
    outcome:    'The associate team that would have spent 3 weeks on first-pass review finished attorney sign-off in 4 days. Privilege log was court-ready without a paralegal marathon session.',
    metrics: [
      { icon: Clock,       label: 'First-pass review',  before: '3 weeks',  after: '4 days'     },
      { icon: FileText,    label: 'Pages processed',    before: 'Manual',   after: '12,000'     },
      { icon: TrendingUp,  label: 'Data egress',        before: 'Risk',     after: 'Zero'       },
    ],
    accent: '#1A3A6B',
  },
  {
    firm:       'Solo Family Law Practice',
    location:   'Austin, TX',
    practice:   'Family Law / Financial Disclosure',
    challenge:  'Eight years of joint bank statements, retirement account records, and financial affidavits to reconcile for a contested divorce with suspected asset dissipation. The attorney was spending Sunday nights building timelines for Monday hearings.',
    solution:   'Lawline processed all 8 years of financial records in a single session. Built an asset timeline with $137,000 in flagged irregular transfers — including a pattern of cash withdrawals preceding every major disclosed asset.',
    outcome:    'The flagged transfers became the cornerstone of the discovery requests that uncovered a hidden account. The attorney describes it as the most impactful financial discovery she\'s done in 9 years of practice.',
    metrics: [
      { icon: Clock,       label: 'Sunday prep time',   before: '5–6 hrs',  after: '35 min'     },
      { icon: TrendingUp,  label: 'Transfers flagged',  before: 'None',     after: '$137K'      },
      { icon: FileText,    label: 'Years of records',   before: '—',        after: '8 yrs auto' },
    ],
    accent: '#2D6B31',
  },
] as const

export function CaseStudyCardsSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { openComingSoon } = useApp()

  return (
    <section
      ref={ref}
      style={{
        padding: '8rem 2rem',
        background: 'var(--color-parchment)',
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
          style={{ textAlign: 'center', marginBottom: '4.5rem' }}
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
            Case Studies
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)',
            fontWeight: 300,
            letterSpacing: '-0.03em',
            color: 'var(--color-ink)',
            lineHeight: 1.08,
          }}>
            Real matters.
            <br />
            <em style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #D4AE58 0%, #B8963E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Measurable outcomes.
            </em>
          </h2>
        </motion.div>

        {/* Case study cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {CASE_STUDIES.map(({ firm, location, practice, challenge, solution, outcome, metrics, accent }, i) => (
            <motion.div
              key={firm}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              style={{
                background: '#FFFFFF',
                border: '1px solid var(--color-warm-100)',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(10,16,32,0.05)',
              }}
            >
              {/* Accent bar top */}
              <div style={{
                height: '3px',
                background: `linear-gradient(to right, ${accent}, ${accent}40, transparent)`,
              }} />

              <div style={{ padding: '2rem 2.25rem' }}>
                {/* Firm header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  marginBottom: '2rem',
                }}>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '1.0625rem',
                      fontWeight: 600,
                      color: 'var(--color-ink)',
                      letterSpacing: '-0.015em',
                      marginBottom: '0.25rem',
                    }}>
                      {firm}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.5rem',
                      letterSpacing: '0.09em',
                      textTransform: 'uppercase',
                      color: 'var(--color-faint)',
                    }}>
                      {location} · {practice}
                    </div>
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.4375rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: accent,
                    background: `${accent}10`,
                    border: `1px solid ${accent}25`,
                    borderRadius: 'var(--radius-pill)',
                    padding: '0.2rem 0.625rem',
                    flexShrink: 0,
                  }}>
                    Case Study
                  </span>
                </div>

                {/* 3-column narrative */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '1.5rem',
                  marginBottom: '2rem',
                }}>
                  {[
                    { label: 'The Challenge', text: challenge },
                    { label: 'The Solution',  text: solution  },
                    { label: 'The Outcome',   text: outcome   },
                  ].map(({ label, text }) => (
                    <div key={label}>
                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.5rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: accent,
                        marginBottom: '0.5rem',
                      }}>
                        {label}
                      </div>
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.875rem',
                        lineHeight: 1.7,
                        color: 'var(--color-muted)',
                        margin: 0,
                      }}>
                        {text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Metrics row */}
                <div style={{
                  display: 'flex',
                  gap: '0',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  border: '1px solid var(--color-warm-100)',
                }}>
                  {metrics.map(({ icon: Icon, label, before, after }, mi) => (
                    <div
                      key={label}
                      style={{
                        flex: 1,
                        padding: '1rem 1.125rem',
                        background: mi % 2 === 0 ? 'var(--color-cream)' : '#FAFBFD',
                        borderRight: mi < metrics.length - 1 ? '1px solid var(--color-warm-100)' : 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.375rem',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <Icon size={12} style={{ color: accent, flexShrink: 0 }} />
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.4375rem',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: 'var(--color-faint)',
                        }}>
                          {label}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.5rem',
                          letterSpacing: '0.07em',
                          color: '#C5CADE',
                          textDecoration: 'line-through',
                          textDecorationColor: 'rgba(196,103,58,0.5)',
                        }}>
                          {before}
                        </span>
                        <span style={{
                          fontFamily: 'var(--font-ui)',
                          fontSize: '0.9375rem',
                          fontWeight: 600,
                          color: accent,
                          letterSpacing: '-0.01em',
                        }}>
                          {after}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{ textAlign: 'center', marginTop: '3rem' }}
        >
          <button
            onClick={() => openComingSoon()}
            className="btn-primary shimmer-button"
            style={{
              gap: '0.5rem',
              cursor: 'pointer',
              border: 'none',
              fontSize: '0.9375rem',
              padding: '0.875rem 2rem',
            }}
          >
            Get results like these
            <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
