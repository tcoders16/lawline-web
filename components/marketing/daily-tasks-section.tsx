'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { CheckCircle2, Clock, ArrowRight } from 'lucide-react'
import { useApp } from '@/components/providers/app-providers'

/* ─── Task comparison data ─── */
const TASKS = [
  {
    manual: 'Build chronology from 900-page medical record',
    manualTime: '4.5 hrs',
    lawline: 'Source-linked 42-event chronology',
    lawlineTime: '42s',
  },
  {
    manual: 'Summarize 3 deposition transcripts for cross-exam',
    manualTime: '3 hrs',
    lawline: 'Depo summaries + cross-exam outline, inconsistencies flagged',
    lawlineTime: '1m 12s',
  },
  {
    manual: 'Draft demand letter from treatment history',
    manualTime: '2 hrs',
    lawline: 'Demand letter in your firm\'s voice, with damages breakdown',
    lawlineTime: '38s',
  },
  {
    manual: 'Review 230 emails for responsive documents',
    manualTime: '5 hrs',
    lawline: 'Email review complete, relevance tags applied, privilege flagged',
    lawlineTime: '2m 04s',
  },
  {
    manual: 'Calculate damages from 23 provider invoices',
    manualTime: '1.5 hrs',
    lawline: '$284,000 damages tally with invoice citations',
    lawlineTime: '29s',
  },
  {
    manual: 'Cross-check expert reports for inconsistencies',
    manualTime: '2 hrs',
    lawline: '3 cross-report gaps surfaced and highlighted for review',
    lawlineTime: '55s',
  },
  {
    manual: 'Bates-number and index 400 exhibit pages',
    manualTime: '1 hr',
    lawline: 'Exhibits auto-indexed with Bates numbers + exhibit list',
    lawlineTime: '47s',
  },
  {
    manual: 'Write client status update letter',
    manualTime: '45 min',
    lawline: 'Client update in plain language, in your firm\'s voice',
    lawlineTime: '31s',
  },
] as const

const MANUAL_TOTAL = '~19.75 hrs'
const LAWLINE_TOTAL = '~6 min 18s'

export function DailyTasksSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { openComingSoon } = useApp()

  return (
    <section
      ref={ref}
      style={{
        padding: '8rem 2rem',
        background: '#F6F7FA',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decoration */}
      <div style={{
        position: 'absolute', top: '-5%', left: '50%',
        transform: 'translateX(-50%)',
        width: 700, height: 400,
        background: 'radial-gradient(ellipse at center, rgba(184,150,62,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '82rem', margin: '0 auto', position: 'relative' }}>

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
            color: '#B8963E',
            display: 'block',
            marginBottom: '1.25rem',
          }}>
            Your Monday Morning
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3.25rem)',
            fontWeight: 300,
            letterSpacing: '-0.03em',
            color: 'var(--color-ink)',
            lineHeight: 1.08,
            marginBottom: '1rem',
          }}>
            19 hours of manual work.
            <br />
            <em style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #D4AE58 0%, #B8963E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Done in 6 minutes.
            </em>
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--color-muted)',
            maxWidth: '36rem',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            This is a real Monday morning at a PI firm. Eight tasks that consume the whole day — and what happens when Lawline runs them instead.
          </p>
        </motion.div>

        {/* Column headers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem',
            marginBottom: '0.875rem',
            padding: '0 0.25rem',
          }}
        >
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5625rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-faint)',
            paddingLeft: '1.5rem',
          }}>
            Without Lawline — manual task
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5625rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#2D6B31',
            paddingLeft: '1.5rem',
          }}>
            With Lawline — automated output
          </div>
        </motion.div>

        {/* Task rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {TASKS.map((task, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.2 + i * 0.07, ease: [0.19, 1, 0.22, 1] }}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.5rem',
              }}
            >
              {/* Manual side */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '0.75rem',
                padding: '0.875rem 1rem',
                background: '#FFFFFF',
                border: '1px solid #E2E5EF',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 1px 3px rgba(10,16,32,0.04)',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', flex: 1 }}>
                  {/* Empty checkbox */}
                  <div style={{
                    width: 16, height: 16,
                    border: '1.5px solid #C5CADE',
                    borderRadius: 4,
                    flexShrink: 0,
                    marginTop: '0.1rem',
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8125rem',
                    color: 'var(--color-muted)',
                    lineHeight: 1.45,
                    textDecoration: 'line-through',
                    textDecorationColor: 'rgba(136,144,168,0.35)',
                  }}>
                    {task.manual}
                  </span>
                </div>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5625rem',
                  letterSpacing: '0.07em',
                  color: '#8890A8',
                  background: '#F6F7FA',
                  border: '1px solid #E2E5EF',
                  padding: '0.15rem 0.5rem',
                  borderRadius: 'var(--radius-sm)',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}>
                  <Clock size={9} style={{ display: 'inline', marginRight: '0.25rem', verticalAlign: 'middle' }} />
                  {task.manualTime}
                </span>
              </div>

              {/* Lawline side */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '0.75rem',
                padding: '0.875rem 1rem',
                background: '#FFFFFF',
                border: '1px solid rgba(45,107,49,0.2)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 1px 6px rgba(45,107,49,0.06)',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', flex: 1 }}>
                  <CheckCircle2 size={16} color="#2D6B31" style={{ flexShrink: 0, marginTop: '0.05rem' }} />
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8125rem',
                    color: 'var(--color-ink)',
                    lineHeight: 1.45,
                  }}>
                    {task.lawline}
                  </span>
                </div>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5625rem',
                  letterSpacing: '0.07em',
                  color: '#B8963E',
                  background: 'rgba(184,150,62,0.08)',
                  border: '1px solid rgba(184,150,62,0.22)',
                  padding: '0.15rem 0.5rem',
                  borderRadius: 'var(--radius-sm)',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}>
                  {task.lawlineTime}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Totals row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 + TASKS.length * 0.07 + 0.1 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem',
            marginTop: '0.75rem',
          }}
        >
          {/* Manual total */}
          <div style={{
            padding: '1rem 1.25rem',
            background: 'rgba(10,16,32,0.04)',
            border: '1px solid #E2E5EF',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5625rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-faint)',
            }}>
              Total time without Lawline
            </span>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              color: '#8890A8',
            }}>
              {MANUAL_TOTAL}
            </span>
          </div>

          {/* Lawline total */}
          <div style={{
            padding: '1rem 1.25rem',
            background: '#0A1020',
            border: '1px solid rgba(184,150,62,0.3)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5625rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(232,236,248,0.4)',
            }}>
              Total time with Lawline
            </span>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              color: '#D4AE58',
            }}>
              {LAWLINE_TOTAL}
            </span>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 + TASKS.length * 0.07 + 0.25 }}
          style={{
            marginTop: '2.5rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.875rem',
          }}
        >
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9375rem',
            color: 'var(--color-muted)',
            maxWidth: '32rem',
          }}>
            That's a full workday handed back to your attorneys — every single Monday.
          </p>
          <button
            onClick={() => openComingSoon()}
            className="btn-primary shimmer-button"
            style={{
              fontSize: '0.9375rem',
              padding: '0.875rem 2rem',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            Start Free Trial
            <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
