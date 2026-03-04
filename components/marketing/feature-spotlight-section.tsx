'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { Clock, FileText, AlignLeft, Search, DollarSign, Link2 } from 'lucide-react'

const FEATURES = [
  {
    id: 'timeline',
    icon: Clock,
    label: 'Case Timeline Builder',
    headline: 'Every event. Every source. 42 seconds.',
    description: 'Lawline reads your entire case record and builds a court-ready chronology with source citations on every entry. Dates, parties, events, and amounts — extracted from every document you upload.',
    specifics: [
      'Processes 20+ pages per second',
      'Each event links to its exact page number',
      'Automatic treatment gap detection',
      'IME vs. treating physician contradiction flag',
      'Filter by: medical · incident · financial · legal',
    ],
    output: 'Export as: PDF (source-hyperlinked) · DOCX (editable) · JSON (integration)',
    terminalLines: [
      '> Reading ER_Records_03122021.pdf…  847 pages',
      '> Extracting chronological events…',
      '> Found: 94 events across 9 source documents',
      '> Detected: 1 treatment gap (03/22 – 05/03) — 42 days',
      '> Detected: 2 IME contradictions vs. treating physician',
      '> Timeline built. Time: 42 seconds.',
    ],
    accent: '#1A3A6B',
  },
  {
    id: 'demand',
    icon: FileText,
    label: 'Demand Letter Generator',
    headline: 'From medical record to demand in under 60 seconds.',
    description: 'Lawline reads your case timeline and generates a structured demand letter with medical summary, liability narrative, damages tally, and total demand figure — in your firm\'s voice.',
    specifics: [
      'Medical summary from treatment records (not generic)',
      'Liability narrative drawn from incident timeline',
      'Damages table: medical, lost wages, future care, pain',
      'Total demand with itemized breakdown',
      'Editable DOCX output — make it yours',
    ],
    output: 'Avg demand letter length: 2,800–4,200 words · Drafts in 38 seconds',
    terminalLines: [
      '> Reading case timeline (94 events)…',
      '> Drafting: medical summary (treatment narrative)…',
      '> Drafting: liability section (incident + causation)…',
      '> Drafting: damages tally ($196,640 total economic)…',
      '> Drafting: closing demand with authority…',
      '> Demand letter ready. Length: 3,200 words. Time: 38s.',
    ],
    accent: '#B8963E',
  },
  {
    id: 'depo',
    icon: AlignLeft,
    label: 'Deposition Summarizer',
    headline: 'Three depositions. One cross-exam outline. 8 minutes.',
    description: 'Upload any deposition transcript and Lawline extracts: key testimony, admissions, inconsistencies, prior accident disclosures, and employment history — then builds a cross-exam outline automatically.',
    specifics: [
      'Key testimony organized by topic',
      'Inconsistency detection across multiple depositions',
      'Prior accident / medical history surfaced',
      'Cross-examination outline with page/line citations',
      'Import to Word for attorney annotation',
    ],
    output: '3 depositions · summary + cross outline · 8 minutes total',
    terminalLines: [
      '> Reading Depo_Johnson_04182021.docx…  214 pages',
      '> Extracting: key testimony by topic…',
      '> Extracting: prior accident disclosures…  2 found',
      '> Cross-referencing with depo_chen.docx, depo_freeman.docx…',
      '> Inconsistencies found: 3 (employment gap, prior accident, symptoms)',
      '> Cross-exam outline built. 47 questions, page/line cited.',
    ],
    accent: '#2D6B31',
  },
  {
    id: 'email',
    icon: Search,
    label: 'Email Review & Relevance',
    headline: 'Review 200 emails in 2 minutes. Flag what matters.',
    description: 'Upload email exports (EML, MSG, HTML) and Lawline reads every thread — scoring each email for relevance, flagging responsive documents, identifying privilege indicators, and building a privilege log.',
    specifics: [
      'Relevance score per email (0–100)',
      'Responsive document tagging for production',
      'Privilege indicators flagged for attorney review',
      'Sender/recipient relationship mapping',
      'Output: relevance report + draft privilege log',
    ],
    output: '847 emails reviewed, relevance-scored, and tagged in 2 min 04 sec',
    terminalLines: [
      '> Loading email export (847 messages)…',
      '> Scoring relevance to matter keywords…',
      '> Highly relevant (80+): 142 emails identified',
      '> Privilege indicators: 18 emails flagged for review',
      '> Draft privilege log: 18 entries with basis',
      '> Review complete. Time: 2m 04s.',
    ],
    accent: '#C45C30',
  },
  {
    id: 'damages',
    icon: DollarSign,
    label: 'Damages Calculator',
    headline: 'Every invoice. Every gap. Every number cited.',
    description: 'Upload medical invoices, pay stubs, and expert reports. Lawline reads every line and builds a damages table with invoice-level citations, lost wage calculations, and future care projections.',
    specifics: [
      'Medical specials: line-item from each provider invoice',
      'Lost wages: pay stub × disability period',
      'Future care: from treating physician or expert report',
      'Pain & suffering: documented with incident reference',
      'Total damages summary with citation index',
    ],
    output: '23 invoices → damages tally with citations in 29 seconds',
    terminalLines: [
      '> Loading 23 medical invoices…',
      '> St. Joseph ER: $14,200 (billed) / $9,840 (allowed)',
      '> Spine Associates: $28,400 (surgery + follow-up)',
      '> Marsh Rehabilitation: $4,800 (PT, 12 sessions)',
      '> Lost wages: $41,200 (9 months × $4,578/mo W-2)',
      '> Total economic damages: $196,640. Time: 29s.',
    ],
    accent: '#1A3A6B',
  },
  {
    id: 'source',
    icon: Link2,
    label: 'Source Citation Engine',
    headline: 'Every claim. Every page. Zero hallucinations.',
    description: 'Every Lawline output is architecturally grounded in your documents. Click any entry in any output to see the exact page number and document it came from. No AI guesses. No fabricated cites.',
    specifics: [
      '100% of outputs source-cited',
      'One-click source verification (opens original page)',
      'Confidence scoring on each entry',
      'Review flags on uncertain extractions',
      'Audit trail of all document access',
    ],
    output: 'Source verification: < 1 second per entry · Full audit log included',
    terminalLines: [
      '> Entry: "L4-L5 herniation diagnosed, 03/15/2021"',
      '> Source: Imaging Center Associates, Radiology_Report.pdf, p.2',
      '> Confidence: HIGH (explicit diagnosis, date, provider)',
      '> Cross-referenced: confirmed in Depo_Johnson p.47 line 12',
      '> Attorney note: "Contradicted by IME p.9 — flag for hearing"',
      '> Audit: entry viewed by J.Martinez on 2024-03-14 14:32',
    ],
    accent: '#2D6B31',
  },
] as const

export function FeatureSpotlightSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [active, setActive] = useState(0)

  const current = FEATURES[active]

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
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>

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
            Core Capabilities — Deep Dive
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)',
            fontWeight: 300,
            letterSpacing: '-0.03em',
            color: 'var(--color-ink)',
            lineHeight: 1.08,
          }}>
            Six tools.
            <em style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #D4AE58 0%, #B8963E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginLeft: '0.4rem',
            }}>
              One platform.
            </em>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '2rem', alignItems: 'start' }}>

          {/* Feature nav */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}
          >
            {FEATURES.map(({ id, icon: Icon, label, accent }, i) => (
              <button
                key={id}
                onClick={() => setActive(i)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  padding: '0.75rem 1rem',
                  border: active === i ? `1px solid ${accent}30` : '1px solid transparent',
                  borderRadius: 'var(--radius-md)',
                  background: active === i ? `${accent}08` : 'transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                }}
              >
                <Icon size={15} style={{ color: active === i ? accent : 'var(--color-faint)', flexShrink: 0 }} />
                <span style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.8125rem',
                  fontWeight: active === i ? 600 : 400,
                  color: active === i ? 'var(--color-ink)' : 'var(--color-muted)',
                  letterSpacing: '-0.01em',
                }}>
                  {label}
                </span>
              </button>
            ))}
          </motion.div>

          {/* Feature content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.5rem',
              }}
            >
              {/* Description panel */}
              <div style={{
                background: '#FFFFFF',
                border: '1px solid var(--color-warm-100)',
                borderRadius: 'var(--radius-xl)',
                padding: '2rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{
                    width: 44, height: 44,
                    borderRadius: 'var(--radius-md)',
                    background: `${current.accent}10`,
                    border: `1px solid ${current.accent}25`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <current.icon size={20} style={{ color: current.accent }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4375rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: current.accent, marginBottom: '0.1rem' }}>
                      {current.label}
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: '1rem', fontWeight: 700, color: 'var(--color-ink)', letterSpacing: '-0.015em', margin: 0, lineHeight: 1.3 }}>
                      {current.headline}
                    </h3>
                  </div>
                </div>

                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-muted)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                  {current.description}
                </p>

                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  {current.specifics.map(s => (
                    <li key={s} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: current.accent, flexShrink: 0, marginTop: '0.45rem' }} />
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--color-muted)', lineHeight: 1.5 }}>{s}</span>
                    </li>
                  ))}
                </ul>

                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.4375rem',
                  letterSpacing: '0.07em',
                  color: current.accent,
                  background: `${current.accent}06`,
                  border: `1px solid ${current.accent}18`,
                  borderRadius: 'var(--radius-md)',
                  padding: '0.625rem 0.875rem',
                  lineHeight: 1.6,
                }}>
                  {current.output}
                </div>
              </div>

              {/* Terminal panel */}
              <div style={{
                background: 'var(--color-ink)',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <div style={{
                  padding: '0.75rem 1.25rem',
                  background: 'rgba(0,0,0,0.2)',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                }}>
                  {['#C45C30', '#B8963E', '#2D6B31'].map(c => (
                    <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.7 }} />
                  ))}
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4375rem', letterSpacing: '0.08em', color: 'rgba(253,252,250,0.3)', marginLeft: '0.5rem' }}>
                    lawline · {current.label.toLowerCase()}
                  </span>
                </div>
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {current.terminalLines.map((line, j) => (
                    <motion.div
                      key={`${active}-${j}`}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: j * 0.1 }}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.5625rem',
                        letterSpacing: '0.04em',
                        lineHeight: 1.7,
                        color: line.includes('✓') || line.includes('found') || line.includes('built') || line.includes('ready') || line.includes('complete')
                          ? '#6BBF74'
                          : line.includes('>')
                            ? 'rgba(253,252,250,0.65)'
                            : 'rgba(253,252,250,0.4)',
                      }}
                    >
                      {line}
                    </motion.div>
                  ))}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: `${current.accent}90` }}
                  >
                    █
                  </motion.span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
