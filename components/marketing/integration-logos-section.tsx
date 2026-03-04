'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Plug } from 'lucide-react'
import { useApp } from '@/components/providers/app-providers'

const INTEGRATIONS = [
  { name: 'Clio',               category: 'Practice Management', status: 'coming', desc: 'Auto-import case files + sync output' },
  { name: 'MyCase',             category: 'Practice Management', status: 'coming', desc: 'Two-way matter and document sync' },
  { name: 'Filevine',           category: 'Practice Management', status: 'coming', desc: 'Pipeline + document bi-directional sync' },
  { name: 'Litify',             category: 'Practice Management', status: 'coming', desc: 'Full Salesforce-native workflow' },
  { name: 'PACER / RECAP',      category: 'Court Access',        status: 'coming', desc: 'Federal docket import to timeline' },
  { name: 'Westlaw',            category: 'Legal Research',      status: 'coming', desc: 'Research doc import + cite linking' },
  { name: 'LexisNexis',         category: 'Legal Research',      status: 'coming', desc: 'Shepards + document import' },
  { name: 'Microsoft Outlook',  category: 'Email',               status: 'coming', desc: 'Flag relevant emails from inbox' },
  { name: 'Google Workspace',   category: 'Productivity',        status: 'coming', desc: 'Drive + Gmail two-way sync' },
  { name: 'DocuSign',           category: 'E-Signature',         status: 'coming', desc: 'Executed agreement ingestion' },
  { name: 'Dropbox',            category: 'Storage',             status: 'coming', desc: 'Auto-ingest from shared case folders' },
  { name: 'NetDocuments',       category: 'DMS',                 status: 'coming', desc: 'Document management integration' },
] as const

const CATEGORIES = ['All', 'Practice Management', 'Court Access', 'Legal Research', 'Email', 'Productivity', 'E-Signature', 'Storage', 'DMS'] as const

const CATEGORY_COLORS: Record<string, string> = {
  'Practice Management': '#B8963E',
  'Court Access':        '#1A3A6B',
  'Legal Research':      '#2D6B31',
  'Email':               '#4A52A0',
  'Productivity':        '#B8963E',
  'E-Signature':         '#1A3A6B',
  'Storage':             '#2D6B31',
  'DMS':                 '#4A52A0',
}

export function IntegrationLogosSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { openComingSoon } = useApp()

  return (
    <section
      ref={ref}
      style={{
        padding: '7rem 2rem',
        background: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '72rem', margin: '0 auto', position: 'relative' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
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
            Integrations
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.25rem, 4vw, 3rem)',
            fontWeight: 300,
            letterSpacing: '-0.03em',
            color: 'var(--color-ink)',
            lineHeight: 1.08,
            marginBottom: '1rem',
          }}>
            Works with the tools
            <br />
            <em style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #D4AE58 0%, #B8963E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              you already use
            </em>
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9375rem',
            color: 'var(--color-muted)',
            maxWidth: '36rem',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            Lawline plugs into your existing practice management stack — no rip-and-replace, no workflow disruption.
            All integrations are coming in Q2–Q3 2025.
          </p>
        </motion.div>

        {/* Integration grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '0.875rem',
          marginBottom: '2.5rem',
        }}>
          {INTEGRATIONS.map(({ name, category, desc }, i) => {
            const accent = CATEGORY_COLORS[category] ?? '#B8963E'
            return (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                whileHover={{ y: -3, boxShadow: `0 12px 28px rgba(10,16,32,0.08), 0 2px 8px ${accent}12` }}
                style={{
                  background: 'var(--color-cream)',
                  border: '1px solid var(--color-warm-100)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.125rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  transition: 'box-shadow 0.25s ease, transform 0.25s ease',
                  cursor: 'default',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Accent line top */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  background: `linear-gradient(to right, ${accent}50, transparent)`,
                }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  <div style={{
                    width: 32, height: 32,
                    borderRadius: '8px',
                    background: `${accent}10`,
                    border: `1px solid ${accent}22`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Plug size={14} style={{ color: accent }} />
                  </div>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--color-ink)',
                      letterSpacing: '-0.01em',
                    }}>
                      {name}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.4rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: accent,
                    }}>
                      {category}
                    </div>
                  </div>
                </div>

                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  color: 'var(--color-muted)',
                  lineHeight: 1.5,
                  margin: 0,
                }}>
                  {desc}
                </p>

                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.4rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#B8963E',
                  background: 'rgba(184,150,62,0.08)',
                  border: '1px solid rgba(184,150,62,0.2)',
                  borderRadius: 'var(--radius-pill)',
                  padding: '0.15rem 0.5rem',
                  width: 'fit-content',
                }}>
                  Coming Soon
                </span>
              </motion.div>
            )
          })}
        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            padding: '1.375rem 1.75rem',
            background: 'var(--color-cream)',
            border: '1px solid var(--color-warm-100)',
            borderRadius: 'var(--radius-xl)',
          }}
        >
          <div>
            <div style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.9375rem',
              fontWeight: 600,
              color: 'var(--color-ink)',
              letterSpacing: '-0.015em',
              marginBottom: '0.2rem',
            }}>
              Using a tool not listed here?
            </div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8125rem',
              color: 'var(--color-muted)',
            }}>
              We add integrations from user requests. Let us know what your firm uses.
            </div>
          </div>
          <button
            onClick={() => openComingSoon()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              fontFamily: 'var(--font-ui)',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'var(--color-terracotta)',
              background: 'rgba(184,150,62,0.08)',
              border: '1px solid rgba(184,150,62,0.25)',
              borderRadius: 'var(--radius-pill)',
              padding: '0.625rem 1.125rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
          >
            Request an integration <ArrowRight size={14} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
