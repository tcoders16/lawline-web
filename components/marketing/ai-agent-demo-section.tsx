'use client'

import { motion, useInView, useMotionValue, useSpring, animate } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import {
  FileText, Search, Brain, Zap, CheckCircle2,
  Clock, TrendingUp, ArrowRight, Sparkles, Shield,
} from 'lucide-react'

/* ─── Agent pipeline steps ─── */
const AGENT_STEPS = [
  {
    id: 'ingest',
    icon: FileText,
    label: '01 · Ingest',
    title: 'Document Ingestion',
    detail: 'Parsing 847 pages: 6 deposition transcripts, 14 medical records from 9 providers, 1 police report, 23 insurance exhibits, and 180 pages of correspondence.',
    color: '#1A3A6B',
    bg: 'rgba(26,58,107,0.07)',
    duration: 1800,
  },
  {
    id: 'extract',
    icon: Search,
    label: '02 · Extract',
    title: 'Entity & Expense Extraction',
    detail: 'Found 9 named parties, 127 treatment dates, $284,000 in documented medical expenses across 43 providers. 6-month treatment gap flagged — critical for damages.',
    color: '#B8963E',
    bg: 'rgba(184,150,62,0.08)',
    duration: 2200,
  },
  {
    id: 'reason',
    icon: Brain,
    label: '03 · Reason',
    title: 'Causal Chain & Contradiction Scan',
    detail: 'Built causal chain: accident Jan 14 → same-day ER → 6-month treatment gap → IME dispute → surgery denied → 18-month delay. Flagged 3 deposition inconsistencies with prior discovery responses.',
    color: '#1A3A6B',
    bg: 'rgba(26,58,107,0.07)',
    duration: 2600,
  },
  {
    id: 'generate',
    icon: Zap,
    label: '04 · Generate',
    title: 'Timeline + Demand Letter',
    detail: 'Drafted 42-event chronology with page-number citations + $284K demand letter. Cross-referenced 4 expert reports for consistency. Deposition outline for cross-exam included.',
    color: '#B8963E',
    bg: 'rgba(184,150,62,0.08)',
    duration: 1400,
  },
  {
    id: 'verify',
    icon: CheckCircle2,
    label: '05 · Verify',
    title: 'Hallucination Guard',
    detail: 'Every fact traced to source page. 0 unsupported claims. 3 discrepancies between deposition testimony and medical records highlighted for attorney review before filing.',
    color: '#2D6B31',
    bg: 'rgba(45,107,49,0.07)',
    duration: 900,
  },
] as const

/* ─── Savings metrics ─── */
const SAVINGS = [
  { label: 'Chronology build time',          before: '4–6 hrs',  after: '42 sec',  icon: Clock,     color: '#B8963E' },
  { label: 'Depo inconsistencies caught',     before: 'Missed',   after: '3 flagged', icon: Shield,  color: '#1A3A6B' },
  { label: 'Case ready for first review',     before: 'Week 2',   after: 'Hour 1',  icon: TrendingUp, color: '#2D6B31' },
] as const

/* ─── Animated counter ─── */
function Counter({ from, to, suffix = '', duration = 1.2 }: { from: number; to: number; suffix?: string; duration?: number }) {
  const ref  = useRef<HTMLSpanElement>(null)
  const mv   = useMotionValue(from)
  const sp   = useSpring(mv, { stiffness: 60, damping: 20 })

  useEffect(() => {
    const ctrl = animate(mv, to, { duration })
    return ctrl.stop
  }, [mv, to, duration])

  useEffect(() => {
    return sp.on('change', v => {
      if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`
    })
  }, [sp, suffix])

  return <span ref={ref}>{from}{suffix}</span>
}

/* ─── Live agent step ─── */
function AgentStep({
  step,
  active,
  done,
  index,
}: {
  step: typeof AGENT_STEPS[number]
  active: boolean
  done: boolean
  index: number
}) {
  const Icon = step.icon
  const alpha = done ? 1 : active ? 1 : 0.35

  return (
    <motion.div
      animate={{ opacity: alpha }}
      transition={{ duration: 0.3 }}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.875rem',
        padding: '0.875rem 1rem',
        borderRadius: 'var(--radius-lg)',
        background: active ? step.bg : done ? 'rgba(45,107,49,0.04)' : 'transparent',
        border: active
          ? `1px solid ${step.color}30`
          : done
            ? '1px solid rgba(45,107,49,0.15)'
            : '1px solid transparent',
        transition: 'all 0.4s ease',
      }}
    >
      {/* Icon box */}
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 'var(--radius-md)',
          background: done ? 'rgba(45,107,49,0.10)' : active ? step.bg : 'rgba(10,16,32,0.04)',
          border: `1px solid ${done ? 'rgba(45,107,49,0.25)' : active ? step.color + '40' : '#E2E5EF'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: '0.1rem',
        }}
      >
        {done
          ? <CheckCircle2 size={15} color="#2D6B31" />
          : <Icon size={15} color={active ? step.color : '#8890A8'} />
        }
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.5rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: active ? step.color : done ? '#2D6B31' : 'var(--color-faint)',
          marginBottom: '0.2rem',
        }}>
          {step.label}
        </div>
        <div style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.8125rem',
          fontWeight: 500,
          color: 'var(--color-ink)',
          marginBottom: '0.2rem',
        }}>
          {step.title}
        </div>
        {(active || done) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              color: 'var(--color-muted)',
              lineHeight: 1.5,
            }}
          >
            {step.detail}
          </motion.div>
        )}
      </div>

      {/* Active spinner / done tick */}
      {active && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
          style={{
            width: 14,
            height: 14,
            borderRadius: '50%',
            border: `2px solid ${step.color}30`,
            borderTopColor: step.color,
            flexShrink: 0,
            marginTop: '0.625rem',
          }}
        />
      )}
    </motion.div>
  )
}

/* ─── Main section ─── */
export function AiAgentDemoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  const [activeStep, setActiveStep]   = useState(-1)
  const [doneSteps,  setDoneSteps]    = useState<Set<number>>(new Set())
  const [complete,   setComplete]     = useState(false)
  const [started,    setStarted]      = useState(false)

  // Auto-start when section enters view
  useEffect(() => {
    if (!inView || started) return
    setStarted(true)

    let totalDelay = 800
    AGENT_STEPS.forEach((step, i) => {
      const startAt = totalDelay
      const endAt   = totalDelay + step.duration

      setTimeout(() => {
        setActiveStep(i)
      }, startAt)

      setTimeout(() => {
        setDoneSteps(prev => new Set([...prev, i]))
        if (i === AGENT_STEPS.length - 1) {
          setTimeout(() => setComplete(true), 400)
        }
      }, endAt)

      totalDelay = endAt + 200
    })
  }, [inView, started])

  // Replay on click
  const handleReplay = () => {
    setActiveStep(-1)
    setDoneSteps(new Set())
    setComplete(false)
    setStarted(false)
  }

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '8rem 2rem',
        background: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle bg decoration */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(184,150,62,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        left: '-5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(26,58,107,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '76rem', margin: '0 auto', position: 'relative' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          style={{ textAlign: 'center', marginBottom: '4.5rem' }}
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
            See It Live
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
            Your AI agent, working
            <br />
            <em style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #D4AE58 0%, #B8963E 60%, #8B6E28 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              while you think strategy.
            </em>
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.0625rem',
            color: 'var(--color-muted)',
            lineHeight: 1.65,
            maxWidth: '36rem',
            margin: '0 auto',
          }}>
            Drop in the full 847-page case file. Lawline's five-stage agent reads every deposition,
            tallies every medical expense, flags every contradiction — and hands you a verified,
            source-linked timeline in under a minute.
          </p>
        </motion.div>

        {/* Main two-column layout */}
        <div
          className="grid-agent-demo"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
            gap: '2rem',
            alignItems: 'start',
          }}
        >
          {/* Left: live agent pipeline */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
          >
            {/* Agent panel card */}
            <div style={{
              background: '#FAFBFD',
              border: '1px solid #E2E5EF',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(10,16,32,0.05)',
            }}>
              {/* Panel header */}
              <div style={{
                background: '#0A1020',
                padding: '0.875rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  {/* Traffic lights */}
                  {['#FF5F57', '#FFBD2E', '#28C840'].map(c => (
                    <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.8 }} />
                  ))}
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.5625rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.35)',
                    marginLeft: '0.25rem',
                  }}>
                    lawline · agent · v2
                  </span>
                </div>

                {/* Status badge */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  padding: '0.25rem 0.625rem',
                  background: complete
                    ? 'rgba(45,107,49,0.15)'
                    : activeStep >= 0
                      ? 'rgba(184,150,62,0.15)'
                      : 'rgba(255,255,255,0.06)',
                  border: `1px solid ${complete ? 'rgba(45,107,49,0.3)' : activeStep >= 0 ? 'rgba(184,150,62,0.3)' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 'var(--radius-pill)',
                }}>
                  <motion.div
                    animate={!complete && activeStep >= 0 ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: complete ? '#2D6B31' : activeStep >= 0 ? '#B8963E' : 'rgba(255,255,255,0.3)',
                    }}
                  />
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.5rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: complete ? '#4CAF70' : activeStep >= 0 ? '#D4AE58' : 'rgba(255,255,255,0.35)',
                  }}>
                    {complete ? 'Complete' : activeStep >= 0 ? 'Running' : 'Standby'}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ height: 2, background: '#E2E5EF' }}>
                <motion.div
                  animate={{ width: complete ? '100%' : `${((doneSteps.size) / AGENT_STEPS.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  style={{
                    height: '100%',
                    background: 'linear-gradient(to right, #1A3A6B, #B8963E)',
                    transformOrigin: 'left',
                  }}
                />
              </div>

              {/* Steps */}
              <div style={{ padding: '0.875rem' }}>
                {AGENT_STEPS.map((step, i) => (
                  <AgentStep
                    key={step.id}
                    step={step}
                    active={activeStep === i && !doneSteps.has(i)}
                    done={doneSteps.has(i)}
                    index={i}
                  />
                ))}
              </div>

              {/* Footer */}
              <div style={{
                borderTop: '1px solid #E2E5EF',
                padding: '0.875rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#F6F7FA',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Sparkles size={12} color={complete ? '#B8963E' : '#8890A8'} />
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.5625rem',
                    letterSpacing: '0.07em',
                    color: complete ? '#B8963E' : 'var(--color-faint)',
                    textTransform: 'uppercase',
                  }}>
                    {complete ? 'Timeline ready for export' : 'Lawline Agent Pipeline'}
                  </span>
                </div>

                {complete && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={handleReplay}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.5rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#1A3A6B',
                      background: 'rgba(26,58,107,0.07)',
                      border: '1px solid rgba(26,58,107,0.2)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.3rem 0.625rem',
                      cursor: 'pointer',
                    }}
                  >
                    Replay ↺
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right: metrics + explanation */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.19, 1, 0.22, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            {/* Time savings card */}
            <div style={{
              background: '#0A1020',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Glow orb */}
              <div style={{
                position: 'absolute',
                top: '-30%',
                right: '-10%',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(184,150,62,0.12) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />

              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5625rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#B8963E',
                marginBottom: '1.5rem',
                position: 'relative',
              }}>
                Time saved per case
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.5rem', position: 'relative' }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '4.5rem',
                  fontWeight: 300,
                  letterSpacing: '-0.04em',
                  color: '#E8ECF8',
                  lineHeight: 1,
                }}>
                  {inView ? <Counter from={0} to={97} suffix="%" duration={1.8} /> : '0%'}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.06em',
                  color: 'rgba(232,236,248,0.4)',
                  textTransform: 'uppercase',
                }}>
                  less time
                </span>
              </div>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'rgba(232,236,248,0.5)',
                lineHeight: 1.6,
                position: 'relative',
              }}>
                What used to take a paralegal a full afternoon now runs in 42 seconds —
                start to export-ready timeline.
              </p>
            </div>

            {/* Before / after comparison */}
            <div style={{
              background: '#FAFBFD',
              border: '1px solid #E2E5EF',
              borderRadius: 'var(--radius-xl)',
              padding: '1.5rem',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5625rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-faint)',
                marginBottom: '1.25rem',
              }}>
                Before vs after Lawline
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {SAVINGS.map(({ label, before, after, icon: Icon, color }) => (
                  <div key={label} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '0.75rem', alignItems: 'center' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.2rem' }}>
                        <Icon size={12} color={color} />
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.5rem',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: 'var(--color-faint)',
                        }}>
                          {label}
                        </span>
                      </div>
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.8125rem',
                      fontWeight: 500,
                      color: '#8890A8',
                      textDecoration: 'line-through',
                      textDecorationColor: 'rgba(196,103,58,0.5)',
                    }}>
                      {before}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      color,
                      padding: '0.15rem 0.5rem',
                      background: `${color}10`,
                      borderRadius: 'var(--radius-sm)',
                      border: `1px solid ${color}25`,
                    }}>
                      {after}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA row */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => {}}
                className="btn-primary shimmer-button"
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  fontSize: '0.875rem',
                  padding: '0.875rem 1.25rem',
                  border: 'none',
                  cursor: 'pointer',
                  gap: '0.5rem',
                }}
              >
                Start Free Trial
                <ArrowRight size={15} />
              </button>
              <a
                href="/insights"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.875rem 1.25rem',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#1A3A6B',
                  textDecoration: 'none',
                  border: '1px solid rgba(26,58,107,0.2)',
                  borderRadius: 'var(--radius-pill)',
                  background: 'rgba(26,58,107,0.04)',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(26,58,107,0.08)'
                  e.currentTarget.style.borderColor = 'rgba(26,58,107,0.35)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(26,58,107,0.04)'
                  e.currentTarget.style.borderColor = 'rgba(26,58,107,0.2)'
                }}
              >
                Case studies
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
