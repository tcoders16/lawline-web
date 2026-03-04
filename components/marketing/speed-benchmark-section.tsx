'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Zap, User, Users, Building2, DollarSign } from 'lucide-react'

const BENCHMARKS = [
  {
    label: 'Lawline AI',
    icon: Zap,
    hours: 0.012,       // 42 seconds
    displayTime: '42 seconds',
    cost: '$0.00',
    costNote: 'per timeline (included in plan)',
    color: '#1A3A6B',
    barColor: '#1A3A6B',
    highlight: true,
  },
  {
    label: 'Junior Associate',
    icon: User,
    hours: 4.5,
    displayTime: '4–6 hours',
    cost: '$337–$450',
    costNote: 'at $75–100/hr billing rate',
    color: '#B8963E',
    barColor: '#B8963E',
    highlight: false,
  },
  {
    label: 'Senior Paralegal',
    icon: Users,
    hours: 3.5,
    displayTime: '3–4 hours',
    cost: '$105–$140',
    costNote: 'at $35–40/hr salary cost',
    color: '#C45C30',
    barColor: '#C45C30',
    highlight: false,
  },
  {
    label: 'Doc Review Vendor',
    icon: Building2,
    hours: 24,
    displayTime: '24–48 hours',
    cost: '$1,200–$2,400',
    costNote: 'standard vendor rates',
    color: '#8890A8',
    barColor: '#8890A8',
    highlight: false,
  },
] as const

const TASKS = [
  { task: '900-page med record chronology', manual: '4.5 hrs', lawline: '42 sec' },
  { task: '3 deposition summaries', manual: '3 hrs', lawline: '1 min 12 sec' },
  { task: 'Demand letter from treatment history', manual: '2 hrs', lawline: '38 sec' },
  { task: '230 email review + relevance tag', manual: '5 hrs', lawline: '2 min 04 sec' },
  { task: 'Damages tally from 23 invoices', manual: '1.5 hrs', lawline: '29 sec' },
  { task: 'Expert report cross-reference', manual: '2 hrs', lawline: '55 sec' },
] as const

const MAX_HOURS = 24

export function SpeedBenchmarkSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

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
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>

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
            Speed Comparison
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
            Time to timeline —
            <br />
            <em style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #D4AE58 0%, #B8963E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              by resource
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
            Building a 900-page case chronology. One task. Four ways to get it done.
          </p>
        </motion.div>

        {/* Bar chart comparison */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            background: 'var(--color-cream)',
            border: '1px solid var(--color-warm-100)',
            borderRadius: 'var(--radius-xl)',
            padding: '2.5rem',
            marginBottom: '3rem',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {BENCHMARKS.map(({ label, icon: Icon, hours, displayTime, cost, costNote, color, highlight }, i) => {
              const pct = Math.max((hours / MAX_HOURS) * 100, 0.3)
              return (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  style={{ display: 'grid', gridTemplateColumns: '160px 1fr 200px', gap: '1.25rem', alignItems: 'center' }}
                >
                  {/* Label */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                      width: 30, height: 30,
                      borderRadius: 'var(--radius-sm)',
                      background: `${color}12`,
                      border: `1px solid ${color}25`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Icon size={14} style={{ color }} />
                    </div>
                    <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: highlight ? 700 : 500, color: highlight ? '#1A3A6B' : 'var(--color-ink)', letterSpacing: '-0.01em' }}>
                      {label}
                    </div>
                  </div>

                  {/* Bar */}
                  <div style={{ position: 'relative', height: 32, background: 'rgba(0,0,0,0.04)', borderRadius: 'var(--radius-pill)', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${pct}%` } : {}}
                      transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
                      style={{
                        height: '100%',
                        background: highlight
                          ? 'linear-gradient(to right, #1A3A6B, #2456A4)'
                          : `${color}60`,
                        borderRadius: 'var(--radius-pill)',
                        display: 'flex',
                        alignItems: 'center',
                        paddingLeft: '0.75rem',
                        minWidth: 60,
                        boxShadow: highlight ? '0 2px 8px rgba(26,58,107,0.25)' : 'none',
                      }}
                    >
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.5rem',
                        letterSpacing: '0.06em',
                        color: highlight ? '#FFFFFF' : 'rgba(255,255,255,0.9)',
                        whiteSpace: 'nowrap',
                        fontWeight: highlight ? 600 : 400,
                      }}>
                        {displayTime}
                      </span>
                    </motion.div>
                  </div>

                  {/* Cost */}
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.9375rem', fontWeight: 700, color, letterSpacing: '-0.02em' }}>
                      {cost}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.375rem', letterSpacing: '0.06em', color: 'var(--color-faint)', lineHeight: 1.4 }}>
                      {costNote}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* X-axis label */}
          <div style={{
            marginTop: '1.5rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--color-warm-100)',
            display: 'flex',
            justifyContent: 'space-between',
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-faint)' }}>
              0 hours
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-faint)' }}>
              Time to complete (900-page medical record chronology)
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-faint)' }}>
              24 hours
            </span>
          </div>
        </motion.div>

        {/* Task breakdown table */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-faint)', marginBottom: '1rem' }}>
            Task-by-task comparison
          </div>
          <div style={{
            border: '1px solid var(--color-warm-100)',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 160px 160px',
              padding: '0.75rem 1.5rem',
              background: 'var(--color-cream)',
              borderBottom: '1px solid var(--color-warm-100)',
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4375rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-faint)' }}>Task</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4375rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#C45C30', textAlign: 'center' }}>Manual</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4375rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#1A3A6B', textAlign: 'center' }}>Lawline</span>
            </div>
            {TASKS.map((row, i) => (
              <motion.div
                key={row.task}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.6 + i * 0.05 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 160px 160px',
                  padding: '0.875rem 1.5rem',
                  borderBottom: i < TASKS.length - 1 ? '1px solid var(--color-warm-100)' : 'none',
                  background: i % 2 === 0 ? '#FFFFFF' : 'rgba(26,58,107,0.01)',
                }}
              >
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--color-muted)' }}>{row.task}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: '#C45C30', textAlign: 'center', letterSpacing: '0.04em' }}>{row.manual}</span>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem' }}>
                  <Zap size={9} style={{ color: '#B8963E' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: '#1A3A6B', letterSpacing: '0.04em', fontWeight: 600 }}>{row.lawline}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
