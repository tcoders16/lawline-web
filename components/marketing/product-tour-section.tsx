'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Upload, Cpu, FileText, Download, RotateCcw,
  Check, ArrowRight,
} from 'lucide-react'
import { useApp } from '@/components/providers/app-providers'

const TOUR_STEPS = [
  {
    id: 'upload',
    step: '01',
    icon: Upload,
    title: 'Drop the full case pile',
    subtitle: 'No prep, no renaming, no sorting',
    body: 'Drag in the whole folder. Medical records from 9 providers, 6 deposition transcripts, police report, 23 insurance exhibits, expert reports — all at once. Lawline accepts PDF, DOCX, EML, MSG, TXT. Mixed formats fine.',
    visual: {
      label: 'Ingesting case files',
      items: [
        { name: 'MedRecord_900pg.pdf',        size: '12.4 MB', type: 'PDF' },
        { name: 'Depo_Transcript_J_Smith.pdf', size: '4.1 MB',  type: 'PDF' },
        { name: 'InsuranceExhibits.zip',       size: '8.7 MB',  type: 'ZIP' },
        { name: 'ExpertReport_2024.docx',      size: '1.2 MB',  type: 'DOC' },
        { name: 'PoliceReport.pdf',            size: '0.8 MB',  type: 'PDF' },
      ],
      totalPages: '847 pages',
    },
    accent: '#B8963E',
  },
  {
    id: 'process',
    step: '02',
    icon: Cpu,
    title: 'AI reads & reasons',
    subtitle: 'On your hardware — nothing leaves your walls',
    body: 'The local AI model reads every page, extracts every date, tallies every medical expense, and builds the causal chain. It flags treatment gaps, catches deposition inconsistencies, and cross-references expert reports — all in seconds.',
    visual: {
      label: 'Processing on-device',
      items: [
        { name: '127 treatment dates extracted',          size: '√', type: 'DATE'  },
        { name: '$284,000 in expenses tallied',           size: '√', type: 'AMT'   },
        { name: '6-month gap flagged (Jan → Jul)',        size: '!', type: 'FLAG'  },
        { name: '3 depo inconsistencies surfaced',       size: '!', type: 'FLAG'  },
        { name: '9 named parties identified',            size: '√', type: 'PARTY' },
      ],
      totalPages: '42 seconds',
    },
    accent: '#1A3A6B',
  },
  {
    id: 'output',
    step: '03',
    icon: FileText,
    title: 'Review in 15 minutes',
    subtitle: 'Source-linked. Editable. Export-ready.',
    body: 'Every fact cites the source page. The attorney edits inline, redacts in one click (with audit log), and approves. The demand letter is drafted in your firm\'s voice. The chronology is formatted for mediation.',
    visual: {
      label: 'Outputs ready',
      items: [
        { name: '42-event source-linked chronology',  size: 'PDF', type: 'OUT'  },
        { name: '$284K demand letter, firm template', size: 'DOC', type: 'OUT'  },
        { name: 'Depo inconsistency report',          size: 'PDF', type: 'OUT'  },
        { name: 'Privilege log (auto-generated)',     size: 'CSV', type: 'OUT'  },
        { name: 'Expert cross-reference summary',     size: 'PDF', type: 'OUT'  },
      ],
      totalPages: '15-min review',
    },
    accent: '#2D6B31',
  },
  {
    id: 'export',
    step: '04',
    icon: Download,
    title: 'Ship today',
    subtitle: 'Not next week. Today.',
    body: 'Export to PDF, DOCX, or CSV. Every output is formatted for court, counsel, or client delivery. Nothing was uploaded to a cloud. The matter stays sealed. Your paralegal has the rest of the day back.',
    visual: {
      label: 'Case delivered',
      items: [
        { name: 'Mediation chronology sent',          size: '✓', type: 'DONE' },
        { name: 'Demand letter served',               size: '✓', type: 'DONE' },
        { name: 'Client update delivered',            size: '✓', type: 'DONE' },
        { name: 'Privilege log filed',               size: '✓', type: 'DONE' },
        { name: 'Total time: 57 minutes',             size: '↓', type: 'STAT' },
      ],
      totalPages: 'Case closed',
    },
    accent: '#B8963E',
  },
] as const

const TYPE_COLORS: Record<string, string> = {
  PDF: '#1A3A6B', ZIP: '#4A52A0', DOC: '#2D6B31',
  DATE: '#2D6B31', AMT: '#B8963E', FLAG: '#C45C30',
  PARTY: '#1A3A6B', OUT: '#B8963E', DONE: '#2D6B31', STAT: '#B8963E',
}

export function ProductTourSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { openComingSoon } = useApp()
  const [activeStep, setActiveStep] = useState(0)
  const current = TOUR_STEPS[activeStep]

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
      {/* Subtle bg */}
      <div style={{
        position: 'absolute',
        top: '30%',
        right: '-5%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(26,58,107,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '76rem', margin: '0 auto', position: 'relative' }}>

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
            Product Tour
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
            Drop, process, review,
            <br />
            <em style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #D4AE58 0%, #B8963E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              ship in under an hour
            </em>
          </h2>
        </motion.div>

        {/* Tour container */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          alignItems: 'start',
        }}>

          {/* Step nav */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {TOUR_STEPS.map(({ id, step, icon: Icon, title, subtitle, accent }, i) => {
              const isActive = activeStep === i
              const isPast   = i < activeStep
              return (
                <motion.button
                  key={id}
                  onClick={() => setActiveStep(i)}
                  whileHover={{ x: 4 }}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.875rem',
                    padding: '1rem 1.125rem',
                    background: isActive ? `${accent}08` : 'transparent',
                    border: isActive ? `1px solid ${accent}30` : '1px solid transparent',
                    borderRadius: 'var(--radius-lg)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {/* Step circle */}
                  <div style={{
                    width: 36, height: 36, flexShrink: 0,
                    borderRadius: '50%',
                    background: isActive ? accent : isPast ? 'rgba(45,107,49,0.12)' : 'var(--color-cream)',
                    border: isActive ? 'none' : isPast ? '1px solid rgba(45,107,49,0.3)' : '1px solid var(--color-warm-100)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {isPast
                      ? <Check size={15} style={{ color: '#2D6B31' }} />
                      : <Icon size={15} style={{ color: isActive ? '#FFFFFF' : 'var(--color-faint)' }} />
                    }
                  </div>

                  <div>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.4375rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: isActive ? accent : 'var(--color-faint)',
                      marginBottom: '0.2rem',
                    }}>
                      Step {step}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.875rem',
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? 'var(--color-ink)' : 'var(--color-muted)',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.2,
                    }}>
                      {title}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.475rem',
                      letterSpacing: '0.07em',
                      textTransform: 'uppercase',
                      color: 'var(--color-faint)',
                      marginTop: '0.2rem',
                    }}>
                      {subtitle}
                    </div>
                  </div>
                </motion.button>
              )
            })}

            <button
              onClick={() => openComingSoon()}
              className="btn-primary shimmer-button"
              style={{
                marginTop: '0.5rem',
                justifyContent: 'center',
                gap: '0.4rem',
                cursor: 'pointer',
                border: 'none',
                fontSize: '0.875rem',
                padding: '0.75rem',
              }}
            >
              Try it now <ArrowRight size={14} />
            </button>
          </div>

          {/* Step detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {/* Description card */}
              <div style={{
                background: 'var(--color-cream)',
                border: '1px solid var(--color-warm-100)',
                borderRadius: 'var(--radius-xl)',
                padding: '1.75rem',
                marginBottom: '1rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{
                    width: 40, height: 40,
                    borderRadius: 'var(--radius-md)',
                    background: `${current.accent}12`,
                    border: `1px solid ${current.accent}25`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <current.icon size={18} style={{ color: current.accent }} />
                  </div>
                  <div>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.5rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: current.accent,
                      display: 'block',
                      marginBottom: '0.1rem',
                    }}>
                      Step {current.step}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '1.0625rem',
                      fontWeight: 600,
                      color: 'var(--color-ink)',
                      letterSpacing: '-0.015em',
                    }}>
                      {current.title}
                    </span>
                  </div>
                </div>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'var(--color-muted)',
                  lineHeight: 1.75,
                  margin: 0,
                }}>
                  {current.body}
                </p>
              </div>

              {/* Visual file list */}
              <div style={{
                background: '#0A1020',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(10,16,32,0.2)',
              }}>
                {/* Terminal bar */}
                <div style={{
                  padding: '0.75rem 1.25rem',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(255,255,255,0.03)',
                }}>
                  {[0,1,2].map(d => (
                    <div key={d} style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: d === 0 ? '#FF5F56' : d === 1 ? '#FFBD2E' : '#27C93F',
                      opacity: 0.6,
                    }} />
                  ))}
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.5rem',
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    color: 'rgba(253,252,250,0.35)',
                    marginLeft: '0.375rem',
                  }}>
                    {current.visual.label}
                  </span>
                </div>

                {/* File rows */}
                <div style={{ padding: '0.75rem' }}>
                  {current.visual.items.map(({ name, size, type }, fi) => (
                    <motion.div
                      key={name}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: fi * 0.08 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '6px',
                        marginBottom: fi < current.visual.items.length - 1 ? '0.25rem' : 0,
                        background: 'rgba(255,255,255,0.03)',
                      }}
                    >
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6875rem',
                        color: 'rgba(253,252,250,0.7)',
                        letterSpacing: '0.01em',
                      }}>
                        {name}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.5rem',
                          color: 'rgba(253,252,250,0.3)',
                        }}>
                          {size}
                        </span>
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.4rem',
                          letterSpacing: '0.08em',
                          color: TYPE_COLORS[type] ?? '#B8963E',
                          background: `${TYPE_COLORS[type] ?? '#B8963E'}15`,
                          border: `1px solid ${TYPE_COLORS[type] ?? '#B8963E'}25`,
                          borderRadius: 'var(--radius-pill)',
                          padding: '0.1rem 0.375rem',
                        }}>
                          {type}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Total row */}
                <div style={{
                  padding: '0.875rem 1.5rem',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  background: 'rgba(255,255,255,0.02)',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.5rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(253,252,250,0.3)',
                  }}>
                    Total
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: current.accent,
                    letterSpacing: '-0.01em',
                  }}>
                    {current.visual.totalPages}
                  </span>
                </div>
              </div>

              {/* Next step button */}
              {activeStep < TOUR_STEPS.length - 1 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setActiveStep(v => v + 1)}
                  style={{
                    marginTop: '0.75rem',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    color: 'var(--color-muted)',
                    background: 'var(--color-cream)',
                    border: '1px solid var(--color-warm-100)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '0.75rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  Next step <ArrowRight size={13} />
                </motion.button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
