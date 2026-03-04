'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Inbox, Search, BookOpen, Scale, ArrowRight, Check, Zap } from 'lucide-react'

const PHASES = [
  {
    phase: '01',
    label: 'Case Intake',
    icon: Inbox,
    color: '#1A3A6B',
    timeManual: '4–8 hrs',
    timeLawline: '< 3 min',
    manualTasks: [
      'Organize 400+ pages of incoming documents',
      'Manually log each document type and date',
      'Create initial case summary from raw files',
      'Identify missing records to request',
    ],
    lawlineTasks: [
      'Bulk upload any document format (PDF, DOCX, TIFF)',
      'Auto-classify: medical, legal, financial, correspondence',
      'Instant case summary with key facts extracted',
      'Gap detection — missing records flagged automatically',
    ],
    output: 'Structured case file in 2 minutes 47 seconds',
  },
  {
    phase: '02',
    label: 'Discovery Review',
    icon: Search,
    color: '#B8963E',
    timeManual: '20–40 hrs',
    timeLawline: '< 15 min',
    manualTasks: [
      'Read every deposition transcript for key testimony',
      'Cross-reference 200+ emails for responsive documents',
      'Build privilege log manually',
      'Identify deponent contradictions across 3 depositions',
    ],
    lawlineTasks: [
      'Deposition summaries with cross-exam hooks auto-built',
      'Email relevance scoring and responsive tagging',
      'Privilege indicators flagged for attorney review',
      'Contradiction detection across all depositions',
    ],
    output: '3-deposition summary set with cross-exam outline in 8 minutes',
  },
  {
    phase: '03',
    label: 'Trial Preparation',
    icon: BookOpen,
    color: '#2D6B31',
    timeManual: '15–25 hrs',
    timeLawline: '< 20 min',
    manualTasks: [
      'Build master exhibit list from scattered documents',
      'Draft witness outlines from deposition transcripts',
      'Prepare client narrative for opening statement',
      'Cross-check expert reports for inconsistencies',
    ],
    lawlineTasks: [
      'Auto-generated exhibit list with Bates references',
      'Witness outline from deposition key testimony',
      'Client narrative drafted from medical + financial records',
      'Expert report cross-reference with flagged gaps',
    ],
    output: 'Trial package (exhibits + witness outlines) in 19 minutes',
  },
  {
    phase: '04',
    label: 'Settlement / Verdict',
    icon: Scale,
    color: '#C45C30',
    timeManual: '6–12 hrs',
    timeLawline: '< 5 min',
    manualTasks: [
      'Calculate total damages from 23 provider invoices',
      'Draft demand letter narrative from scratch',
      'Prepare mediation brief with case history',
      'Compile final settlement authority worksheet',
    ],
    lawlineTasks: [
      'Damages tally with invoice-level citations',
      'Demand letter drafted in your firm\'s voice',
      'Mediation brief generated from case timeline',
      'Authority worksheet auto-populated from record',
    ],
    output: 'Demand letter + mediation brief in 4 minutes 12 seconds',
  },
] as const

export function AttorneyWorkflowSection() {
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
            Lawline Across the Case Lifecycle
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
            From first call to verdict —
            <br />
            <em style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #D4AE58 0%, #B8963E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Lawline works every phase
            </em>
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--color-muted)',
            maxWidth: '40rem',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            Every stage of litigation generates documents. Every document is a Lawline opportunity to save hours.
          </p>
        </motion.div>

        {/* Phase cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {PHASES.map(({ phase, label, icon: Icon, color, timeManual, timeLawline, manualTasks, lawlineTasks, output }, i) => (
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '200px 1fr 1fr',
                gap: '1.5rem',
                border: '1px solid var(--color-warm-100)',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
              }}
            >
              {/* Phase identifier */}
              <div style={{
                padding: '2rem',
                background: `${color}06`,
                borderRight: `1px solid ${color}18`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '2rem',
                    letterSpacing: '-0.04em',
                    color: `${color}30`,
                    fontWeight: 700,
                    lineHeight: 1,
                    marginBottom: '0.75rem',
                  }}>
                    {phase}
                  </div>
                  <div style={{
                    width: 40, height: 40,
                    borderRadius: 'var(--radius-md)',
                    background: `${color}12`,
                    border: `1px solid ${color}25`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '0.875rem',
                  }}>
                    <Icon size={20} style={{ color }} />
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'var(--color-ink)',
                    letterSpacing: '-0.015em',
                    lineHeight: 1.3,
                  }}>
                    {label}
                  </div>
                </div>

                {/* Output callout */}
                <div style={{
                  marginTop: '1.5rem',
                  padding: '0.75rem',
                  background: `${color}08`,
                  border: `1px solid ${color}20`,
                  borderRadius: 'var(--radius-md)',
                }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.375rem', letterSpacing: '0.1em', textTransform: 'uppercase', color, marginBottom: '0.3rem' }}>
                    Lawline Output
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.6875rem', color, lineHeight: 1.4, fontWeight: 500 }}>
                    {output}
                  </div>
                </div>
              </div>

              {/* Manual side */}
              <div style={{ padding: '2rem', borderRight: '1px solid var(--color-warm-100)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 600, color: '#C45C30' }}>
                    Without Lawline
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.4375rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#C45C30',
                    background: 'rgba(196,92,48,0.08)',
                    border: '1px solid rgba(196,92,48,0.2)',
                    borderRadius: 'var(--radius-pill)',
                    padding: '0.2rem 0.6rem',
                  }}>
                    {timeManual}
                  </div>
                </div>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {manualTasks.map(task => (
                    <li key={task} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <div style={{ width: 14, height: 14, border: '1px solid #C45C3050', borderRadius: '3px', flexShrink: 0, marginTop: '0.1rem' }} />
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--color-muted)', lineHeight: 1.5 }}>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lawline side */}
              <div style={{ padding: '2rem', background: 'rgba(26,58,107,0.015)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 600, color: '#1A3A6B', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <Zap size={12} style={{ color: '#B8963E' }} /> With Lawline
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.4375rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#2D6B31',
                    background: 'rgba(45,107,49,0.08)',
                    border: '1px solid rgba(45,107,49,0.2)',
                    borderRadius: 'var(--radius-pill)',
                    padding: '0.2rem 0.6rem',
                  }}>
                    {timeLawline}
                  </div>
                </div>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {lawlineTasks.map(task => (
                    <li key={task} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <Check size={13} style={{ color: '#1A3A6B', flexShrink: 0, marginTop: '0.1rem' }} />
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--color-muted)', lineHeight: 1.5 }}>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Total time comparison */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{
            marginTop: '2.5rem',
            padding: '2rem',
            background: 'var(--color-cream)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-warm-100)',
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            gap: '1.5rem',
            alignItems: 'center',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C45C30', marginBottom: '0.5rem' }}>Manual total</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 400, color: '#C45C30', letterSpacing: '-0.03em' }}>45–85 hrs</div>
          </div>
          <ArrowRight size={24} style={{ color: 'var(--color-faint)' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2D6B31', marginBottom: '0.5rem' }}>With Lawline</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 400, color: '#1A3A6B', letterSpacing: '-0.03em' }}>47 minutes</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
