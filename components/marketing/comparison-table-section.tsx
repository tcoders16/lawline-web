'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check, X, Minus } from 'lucide-react'
import { useApp } from '@/components/providers/app-providers'

const FEATURES = [
  {
    category: 'Security',
    items: [
      { feature: 'On-premises processing (no cloud)',       lawline: true,  chatgpt: false, harvey: false, manual: true  },
      { feature: 'Data never leaves your walls',           lawline: true,  chatgpt: false, harvey: false, manual: true  },
      { feature: 'No subpoena risk to vendor',            lawline: true,  chatgpt: false, harvey: false, manual: true  },
      { feature: 'SOC 2 Type II certified',               lawline: true,  chatgpt: 'partial', harvey: true, manual: false },
      { feature: 'Works under protective orders',         lawline: true,  chatgpt: false, harvey: false, manual: true  },
    ],
  },
  {
    category: 'Document Intelligence',
    items: [
      { feature: 'Reads 800+ page case files natively',   lawline: true,  chatgpt: 'partial', harvey: true,  manual: true  },
      { feature: 'Source-linked timeline (page citations)', lawline: true,  chatgpt: false, harvey: 'partial', manual: false },
      { feature: 'Treatment gap / inconsistency detection', lawline: true, chatgpt: false, harvey: 'partial', manual: 'partial' },
      { feature: 'Medical expense auto-tallied',           lawline: true,  chatgpt: false, harvey: false, manual: true  },
      { feature: 'Multi-file cross-reference',             lawline: true,  chatgpt: false, harvey: 'partial', manual: 'partial' },
    ],
  },
  {
    category: 'Workflow',
    items: [
      { feature: 'Demand letter generation',               lawline: true,  chatgpt: 'partial', harvey: true,  manual: false },
      { feature: 'Deposition prep kit',                   lawline: true,  chatgpt: 'partial', harvey: 'partial', manual: true  },
      { feature: '42-second processing time',              lawline: true,  chatgpt: false, harvey: false, manual: false },
      { feature: 'Privilege log auto-generation',         lawline: true,  chatgpt: false, harvey: 'partial', manual: true  },
      { feature: 'Inline redaction + audit trail',         lawline: true,  chatgpt: false, harvey: 'partial', manual: false },
    ],
  },
  {
    category: 'Practice Fit',
    items: [
      { feature: 'Solo / small firm pricing (<$100/mo)',   lawline: true,  chatgpt: true,  harvey: false, manual: true  },
      { feature: 'PI + med-mal record intelligence',       lawline: true,  chatgpt: false, harvey: false, manual: true  },
      { feature: 'Flat monthly rate (no per-file cost)',   lawline: true,  chatgpt: false, harvey: false, manual: true  },
      { feature: 'No per-query AI API cost',               lawline: true,  chatgpt: false, harvey: false, manual: true  },
      { feature: 'Full offline / air-gapped operation',    lawline: true,  chatgpt: false, harvey: false, manual: true  },
    ],
  },
] as const

type Val = boolean | 'partial'

function Cell({ val }: { val: Val }) {
  if (val === true)      return <Check  size={16} style={{ color: '#2D6B31' }} />
  if (val === 'partial') return <Minus  size={16} style={{ color: '#B8963E' }} />
  return                        <X      size={14} style={{ color: '#C5CADE' }} />
}

export function ComparisonTableSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { openComingSoon } = useApp()

  return (
    <section
      ref={ref}
      style={{
        padding: '8rem 2rem',
        background: 'var(--color-cream)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '72rem', margin: '0 auto', position: 'relative' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
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
            Why Lawline
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
            Not all legal AI
            <br />
            <em style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #D4AE58 0%, #B8963E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              is built the same
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
            ChatGPT sends your files to OpenAI. Harvey is enterprise-only. Manual review takes days.
            Lawline is the only AI that's on-prem, purpose-built for litigation, and priced for solo firms.
          </p>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            background: '#FFFFFF',
            border: '1px solid var(--color-warm-100)',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            boxShadow: '0 2px 12px rgba(10,16,32,0.06)',
          }}
        >
          {/* Table header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
            borderBottom: '2px solid var(--color-warm-100)',
            background: 'var(--color-cream)',
          }}>
            <div style={{ padding: '1.25rem 1.5rem' }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-faint)',
              }}>
                Feature
              </span>
            </div>
            {[
              { label: 'Lawline',        highlight: true,  sub: 'On-prem AI' },
              { label: 'ChatGPT',        highlight: false, sub: 'Cloud AI' },
              { label: 'Harvey AI',      highlight: false, sub: 'Enterprise' },
              { label: 'Manual Review',  highlight: false, sub: 'Paralegal' },
            ].map(({ label, highlight, sub }) => (
              <div
                key={label}
                style={{
                  padding: '1.25rem 1rem',
                  textAlign: 'center',
                  background: highlight ? 'rgba(184,150,62,0.05)' : 'transparent',
                  borderLeft: highlight ? '2px solid rgba(184,150,62,0.3)' : '1px solid var(--color-warm-100)',
                  borderRight: highlight ? '2px solid rgba(184,150,62,0.3)' : 'none',
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: highlight ? 'var(--color-ink)' : 'var(--color-muted)',
                  letterSpacing: '-0.01em',
                  marginBottom: '0.2rem',
                }}>
                  {label}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.4375rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: highlight ? '#B8963E' : 'var(--color-faint)',
                }}>
                  {sub}
                </div>
              </div>
            ))}
          </div>

          {/* Feature rows by category */}
          {FEATURES.map(({ category, items }, ci) => (
            <div key={category}>
              {/* Category row */}
              <div style={{
                padding: '0.75rem 1.5rem',
                background: 'var(--color-cream)',
                borderTop: ci > 0 ? '1px solid var(--color-warm-100)' : 'none',
                borderBottom: '1px solid var(--color-warm-100)',
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-terracotta)',
                }}>
                  {category}
                </span>
              </div>

              {/* Feature rows */}
              {items.map(({ feature, lawline, chatgpt, harvey, manual }, fi) => (
                <div
                  key={feature}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                    borderBottom: fi < items.length - 1 ? '1px solid rgba(226,229,239,0.5)' : 'none',
                  }}
                >
                  <div style={{ padding: '0.875rem 1.5rem' }}>
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      color: 'var(--color-ink)',
                      lineHeight: 1.4,
                    }}>
                      {feature}
                    </span>
                  </div>
                  {[
                    { val: lawline, highlight: true  },
                    { val: chatgpt, highlight: false },
                    { val: harvey,  highlight: false },
                    { val: manual,  highlight: false },
                  ].map(({ val, highlight }, vi) => (
                    <div
                      key={vi}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0.875rem 1rem',
                        background: highlight ? 'rgba(184,150,62,0.03)' : 'transparent',
                        borderLeft: highlight ? '2px solid rgba(184,150,62,0.15)' : '1px solid rgba(226,229,239,0.5)',
                        borderRight: highlight ? '2px solid rgba(184,150,62,0.15)' : 'none',
                      }}
                    >
                      <Cell val={val as Val} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}

          {/* Footer CTA */}
          <div style={{
            padding: '1.5rem',
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
            borderTop: '2px solid var(--color-warm-100)',
            background: 'var(--color-cream)',
          }}>
            <div style={{ padding: '0 0.5rem' }}>
              <div style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--color-ink)',
                marginBottom: '0.25rem',
              }}>
                The only on-prem legal AI for litigators.
              </div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                color: 'var(--color-muted)',
              }}>
                Starting at $49/mo · 30-day free trial
              </div>
            </div>
            <div style={{
              gridColumn: '2 / 3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 1rem',
              background: 'rgba(184,150,62,0.04)',
              borderLeft: '2px solid rgba(184,150,62,0.25)',
              borderRight: '2px solid rgba(184,150,62,0.25)',
            }}>
              <button
                onClick={() => openComingSoon()}
                className="btn-primary"
                style={{
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  border: 'none',
                  fontSize: '0.75rem',
                  padding: '0.5rem 0.875rem',
                }}
              >
                Start free trial
              </button>
            </div>
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          style={{ marginTop: '1.25rem', display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          {[
            { icon: <Check size={12} style={{ color: '#2D6B31' }} />, label: 'Fully supported' },
            { icon: <Minus size={12} style={{ color: '#B8963E' }} />, label: 'Partial / limited' },
            { icon: <X size={11} style={{ color: '#C5CADE' }} />,     label: 'Not available' },
          ].map(({ icon, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              {icon}
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5rem',
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                color: 'var(--color-faint)',
              }}>
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
