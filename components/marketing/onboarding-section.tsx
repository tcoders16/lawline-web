'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { Upload, Cpu, CheckSquare, Download, ArrowRight, Play } from 'lucide-react'
import { useApp } from '@/components/providers/app-providers'

const STEPS = [
  {
    step: '01',
    icon: Upload,
    title: 'Upload your documents',
    time: '0:00 – 0:20',
    desc: 'Drag and drop any combination of medical records, deposition transcripts, police reports, financial records, or correspondence. PDF, DOCX, TIFF — any format.',
    detail: [
      'Supports files up to 2 GB each',
      'Batch upload up to 50 documents at once',
      'Auto-detects document type on upload',
      'No conversion needed — raw files accepted',
    ],
    terminal: [
      '> Uploading "ER_Records_03122021.pdf" (847 pages)…',
      '> Uploading "Deposition_Johnson_04182021.docx" (214 pages)…',
      '> Uploading "Police_Report_2021-4471.pdf" (12 pages)…',
      '> Document classification complete.',
      '> Medical records: 1  ·  Depositions: 1  ·  Legal: 1',
      '> Ready to process. Estimated output: 42 seconds.',
    ],
    color: '#1A3A6B',
  },
  {
    step: '02',
    icon: Cpu,
    title: 'Lawline processes in seconds',
    time: '0:20 – 1:02',
    desc: 'Lawline reads every page — cross-referencing dates, identifying parties, extracting facts, flagging inconsistencies. All on your hardware if on-premises, or your secure cloud instance.',
    detail: [
      'Processes at 20+ pages per second',
      'Extracts: dates, parties, events, amounts',
      'Flags treatment gaps and record inconsistencies',
      'Detects IME vs. treating physician contradictions',
    ],
    terminal: [
      '> Processing 1,073 pages…',
      '> Extracting chronological events…  ✓ 94 events found',
      '> Running gap analysis…  ⚠ 1 gap detected (42 days)',
      '> Cross-referencing deposition testimony…  ✓',
      '> IME contradiction analysis…  ⚠ 2 conflicts flagged',
      '> Generating source citations…  ✓ 94/94 cited',
      '> Timeline complete. Processing time: 42s.',
    ],
    color: '#B8963E',
  },
  {
    step: '03',
    icon: CheckSquare,
    title: 'Review and annotate',
    time: '1:02 – 3:30',
    desc: 'View your source-linked timeline. Click any entry to see the exact page it came from. Add attorney annotations, mark disputed facts, and flag entries for additional review.',
    detail: [
      'One-click source verification (opens original page)',
      'Inline attorney annotation and notes',
      'Confidence scoring: High / Medium / Review Required',
      'AI flags surface automatically for your attention',
    ],
    terminal: [
      '> Timeline ready — 94 events · 9 source documents',
      '> ⚠ 3 items flagged for attorney review:',
      '>   [1] 42-day treatment gap — May affect mitigation',
      '>   [2] IME vs Dr. Singh: conflicting MMI opinion',
      '>   [3] Deposition inconsistency: prior accident history',
      '> Add annotations and approve before export.',
    ],
    color: '#2D6B31',
  },
  {
    step: '04',
    icon: Download,
    title: 'Export court-ready output',
    time: '3:30 – 4:00',
    desc: 'Export your timeline, demand letter, or exhibit set in the format you need. PDF for mediation. Word for editing. Excel for damages. Integrated with your DMS.',
    detail: [
      'Export: PDF, DOCX, XLSX, or JSON',
      'Demand letter with damages tally included',
      'Exhibit list with Bates reference auto-generated',
      'Push directly to Clio, MyCase, or Filevine',
    ],
    terminal: [
      '> Exporting case package…',
      '> ✓ Case_Timeline_v1.pdf (94 events, source-linked)',
      '> ✓ Demand_Letter_Draft.docx (3,200 words)',
      '> ✓ Damages_Summary.xlsx ($196,640 total economic)',
      '> ✓ Exhibit_List.pdf (27 exhibits, Bates indexed)',
      '> Package exported. Ready for mediation.',
      '> Total session time: 4 minutes 12 seconds.',
    ],
    color: '#C45C30',
  },
] as const

export function OnboardingSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [activeStep, setActiveStep] = useState(0)
  const { openComingSoon } = useApp()

  const current = STEPS[activeStep]

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
            From upload to output
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
            Your first Lawline timeline
            <br />
            <em style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #D4AE58 0%, #B8963E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              in under 4 minutes
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
            No training. No onboarding call. Upload documents, get output. Here's the entire workflow.
          </p>
        </motion.div>

        {/* Step navigation */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}
        >
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <button
                key={step.step}
                onClick={() => setActiveStep(i)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.625rem 1rem',
                  border: activeStep === i ? `1.5px solid ${step.color}50` : '1px solid var(--color-warm-100)',
                  borderRadius: 'var(--radius-pill)',
                  background: activeStep === i ? `${step.color}06` : '#FFFFFF',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <Icon size={13} style={{ color: activeStep === i ? step.color : 'var(--color-faint)' }} />
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: activeStep === i ? step.color : 'var(--color-faint)',
                  whiteSpace: 'nowrap',
                }}>
                  {step.step} · {step.title.split(' ').slice(0, 2).join(' ')}
                </span>
              </button>
            )
          })}
        </motion.div>

        {/* Content panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.5rem',
              alignItems: 'stretch',
            }}
          >
            {/* Left: description */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid var(--color-warm-100)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{
                  width: 48, height: 48,
                  borderRadius: 'var(--radius-md)',
                  background: `${current.color}10`,
                  border: `1px solid ${current.color}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <current.icon size={22} style={{ color: current.color }} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4375rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: current.color, marginBottom: '0.2rem' }}>
                    Step {current.step} · {current.time}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-ink)', letterSpacing: '-0.015em', margin: 0 }}>
                    {current.title}
                  </h3>
                </div>
              </div>

              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'var(--color-muted)',
                lineHeight: 1.7,
                marginBottom: '1.5rem',
              }}>
                {current.desc}
              </p>

              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {current.detail.map(d => (
                  <li key={d} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: current.color, flexShrink: 0, marginTop: '0.45rem' }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--color-muted)', lineHeight: 1.5 }}>{d}</span>
                  </li>
                ))}
              </ul>

              {/* Nav */}
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem' }}>
                {activeStep > 0 && (
                  <button
                    onClick={() => setActiveStep(s => s - 1)}
                    style={{
                      fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500,
                      color: 'var(--color-muted)', background: 'var(--color-cream)',
                      border: '1px solid var(--color-warm-100)', borderRadius: 'var(--radius-pill)',
                      padding: '0.625rem 1.25rem', cursor: 'pointer',
                    }}
                  >
                    ← Back
                  </button>
                )}
                {activeStep < STEPS.length - 1 ? (
                  <button
                    onClick={() => setActiveStep(s => s + 1)}
                    style={{
                      fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500,
                      color: '#FFFFFF', background: current.color,
                      border: 'none', borderRadius: 'var(--radius-pill)',
                      padding: '0.625rem 1.5rem', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '0.375rem',
                    }}
                  >
                    Next step <ArrowRight size={13} />
                  </button>
                ) : (
                  <button
                    onClick={() => openComingSoon()}
                    style={{
                      fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500,
                      color: '#FFFFFF', background: '#B8963E',
                      border: 'none', borderRadius: 'var(--radius-pill)',
                      padding: '0.625rem 1.5rem', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '0.375rem',
                    }}
                  >
                    <Play size={12} /> Try it free
                  </button>
                )}
              </div>
            </div>

            {/* Right: terminal */}
            <div style={{
              background: 'var(--color-ink)',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              {/* Terminal top bar */}
              <div style={{
                padding: '0.75rem 1.25rem',
                background: 'rgba(0,0,0,0.2)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                {['#C45C30', '#B8963E', '#2D6B31'].map(c => (
                  <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.7 }} />
                ))}
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4375rem', letterSpacing: '0.08em', color: 'rgba(253,252,250,0.3)', marginLeft: '0.5rem' }}>
                  lawline · session output
                </span>
              </div>

              {/* Terminal content */}
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {current.terminal.map((line, i) => (
                  <motion.div
                    key={`${activeStep}-${i}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.08 }}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.5625rem',
                      letterSpacing: '0.04em',
                      lineHeight: 1.7,
                      color: line.includes('⚠') ? '#D4AE58'
                        : line.includes('✓') ? '#6BBF74'
                          : line.includes('>') ? 'rgba(253,252,250,0.6)'
                            : 'rgba(253,252,250,0.4)',
                    }}
                  >
                    {line}
                  </motion.div>
                ))}
                {/* Cursor blink */}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: `${current.color}90` }}
                >
                  █
                </motion.span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              style={{
                width: i === activeStep ? 24 : 8,
                height: 8,
                borderRadius: 'var(--radius-pill)',
                background: i === activeStep ? current.color : 'var(--color-warm-200)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
