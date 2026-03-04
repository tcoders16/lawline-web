'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Upload, Cpu, Download, ArrowRight } from 'lucide-react'

const STEPS = [
  {
    step: '01',
    icon: Upload,
    title: 'Drop In the Full Case File',
    description:
      'Drag in the entire pile — 800-page medical record, EMT run sheet, 6 deposition transcripts, 5 treating physicians, expert reports, all your discovery. Lawline takes the mess exactly as-is. No pre-formatting, no renaming, no manual splitting.',
    accentRaw: '#B8963E',
    detail: ['PI · Med-mal · Employment · Contracts · Real estate', 'Mixed PDF, DOCX, MSG, EML, TXT', 'Up to 2GB — full case packages'],
  },
  {
    step: '02',
    icon: Cpu,
    title: 'AI Reads, Reasons & Flags',
    description:
      'The engine reads every exhibit, tallies every medical expense, flags treatment gaps, and catches inconsistencies between witness statements and prior discovery responses. Every fact is pinned to the exact page number it came from.',
    accentRaw: '#1A3A6B',
    detail: ['Dates · Parties · Dollar amounts · Medical codes', 'Page-exact source citation — zero hallucinations', 'Contradiction flags across depositions & records'],
  },
  {
    step: '03',
    icon: Download,
    title: 'Review in 15 Min, Ship Today',
    description:
      'One attorney, 15 minutes: review the AI timeline, inline-edit any entry, redact the SSN in one click, and export. Your demand letter, mediation chronology, or deposition outline is ready — today, not next week.',
    accentRaw: '#B8963E',
    detail: ['PDF · DOCX · CSV — formatted for court', 'Inline redaction with audit log', 'Client-safe narrative draft included'],
  },
] as const

export function HowItWorksSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

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
      {/* Subtle background elements */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '700px',
        height: '500px',
        background: 'radial-gradient(ellipse at center, rgba(184,150,62,0.05) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '76rem', margin: '0 auto', position: 'relative' }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-gold)',
              display: 'block',
              marginBottom: '1.25rem',
            }}
          >
            How It Works
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: 'var(--color-ink)',
              lineHeight: 1.08,
              marginBottom: '1rem',
            }}
          >
            Three steps.
            <br />
            <em
              style={{
                fontStyle: 'italic',
                background: 'linear-gradient(135deg, #D4AE58 0%, #B8963E 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Minutes, not hours.
            </em>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid-steps">
          {STEPS.map(({ step, icon: Icon, title, description, accentRaw, detail }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
              style={{
                background: '#FFFFFF',
                border: '1px solid #E2E5EF',
                borderRadius: 'var(--radius-xl)',
                padding: '2.5rem',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 1px 4px rgba(10,16,32,0.05)',
              }}
            >
              {/* Accent top border */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: `linear-gradient(to right, transparent, ${accentRaw}60, transparent)`,
                borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
              }} />

              {/* Background orb */}
              <div style={{
                position: 'absolute',
                top: '-30%',
                right: '-20%',
                width: '200px',
                height: '200px',
                background: `radial-gradient(circle, ${accentRaw}06 0%, transparent 70%)`,
                pointerEvents: 'none',
              }} />

              {/* Step number — ghosted */}
              <div
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  fontFamily: 'var(--font-display)',
                  fontSize: '4rem',
                  fontWeight: 400,
                  color: 'rgba(10,16,32,0.04)',
                  lineHeight: 1,
                  letterSpacing: '-0.05em',
                  userSelect: 'none',
                }}
              >
                {step}
              </div>

              {/* Icon */}
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 'var(--radius-md)',
                  background: `${accentRaw}10`,
                  border: `1px solid ${accentRaw}25`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.75rem',
                }}
              >
                <Icon size={24} style={{ color: accentRaw }} />
              </div>

              {/* Step label */}
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5625rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: accentRaw,
                  display: 'block',
                  marginBottom: '0.625rem',
                }}
              >
                Step {step}
              </span>

              <h3
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  letterSpacing: '-0.015em',
                  color: 'var(--color-ink)',
                  marginBottom: '0.875rem',
                  lineHeight: 1.2,
                }}
              >
                {title}
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  lineHeight: 1.75,
                  color: 'var(--color-muted)',
                  marginBottom: '1.5rem',
                }}
              >
                {description}
              </p>

              {/* Detail items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                {detail.map(d => (
                  <div key={d} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      background: accentRaw,
                      flexShrink: 0,
                    }} />
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.5625rem',
                      letterSpacing: '0.06em',
                      color: 'var(--color-faint)',
                    }}>
                      {d}
                    </span>
                  </div>
                ))}
              </div>

              {/* Arrow connector (not on last) */}
              {i < STEPS.length - 1 && (
                <div style={{
                  position: 'absolute',
                  right: '-14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  color: '#C5CADE',
                }}>
                  <ArrowRight size={20} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
