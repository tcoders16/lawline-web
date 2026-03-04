'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  Activity, Users, Heart, Home, Scale, FileText,
  Clock, AlertTriangle, CheckCircle2, ArrowRight,
} from 'lucide-react'

/* ─── Practice areas ─── */
const AREAS = [
  {
    id: 'pi',
    label: 'Personal Injury',
    icon: Activity,
    color: '#B8963E',
    bg: 'rgba(184,150,62,0.08)',
    border: 'rgba(184,150,62,0.25)',
    painPoint: 'Your paralegal spends Monday morning reading 900 pages of medical records, manually pulling treatment dates into a spreadsheet — before they can even start building the demand letter.',
    manualTasks: [
      '900-page medical record → highlight & transcribe dates',
      '6 deposition transcripts → read for inconsistencies',
      '23 provider invoices → manually total $284K damages',
      'IME report vs treating physician → compare by hand',
      'Build chronology in Word → format for mediation',
    ],
    lawlineOutputs: [
      { text: 'Source-linked 42-event chronology', time: '42s' },
      { text: '$284,000 damages tally with invoice citations', time: '29s' },
      { text: '6-month treatment gap flagged — critical for IME dispute', time: 'auto' },
      { text: 'Deposition inconsistency map (3 conflicts surfaced)', time: '55s' },
      { text: 'Demand letter in your firm\'s voice', time: '38s' },
    ],
    docTypes: 'ER records · Treating physician notes · IME reports · Deposition transcripts · Insurance exhibits',
  },
  {
    id: 'employment',
    label: 'Employment',
    icon: Users,
    color: '#1A3A6B',
    bg: 'rgba(26,58,107,0.07)',
    border: 'rgba(26,58,107,0.22)',
    painPoint: 'Reviewing 200+ emails, HR files, and performance reviews to find the protected-activity-to-adverse-action chain takes days — and missing one email can sink the case.',
    manualTasks: [
      '200+ emails → read for discrimination patterns',
      'HR file + PIPs → trace timeline of adverse actions',
      'Comparator employee records → find disparate treatment',
      'EEOC charge vs complaint → verify consistency',
      'Write incident chronology for EEOC mediation brief',
    ],
    lawlineOutputs: [
      { text: 'Protected activity → adverse action causal chain', time: '1m 08s' },
      { text: '14 comparator incidents identified across 200 emails', time: '2m 04s' },
      { text: 'Disparate treatment pattern map (race/gender/age)', time: 'auto' },
      { text: 'EEOC mediation chronology ready for submission', time: '51s' },
      { text: 'Retaliation timeline: complaint date → termination date', time: 'auto' },
    ],
    docTypes: 'Emails · HR files · PIPs · EEOC charges · Performance reviews · Comparator records',
  },
  {
    id: 'medmal',
    label: 'Med-Mal',
    icon: Heart,
    color: '#B8963E',
    bg: 'rgba(184,150,62,0.08)',
    border: 'rgba(184,150,62,0.25)',
    painPoint: 'Synthesizing records from 15 providers, 3 hospitalizations, and 4 competing expert reports to find the exact moment standard-of-care was breached takes weeks — not days.',
    manualTasks: [
      '15 providers × 400 pages each → read for SOC deviations',
      '3 hospital admission records → trace care handoffs',
      '4 expert reports → identify consistency and gaps',
      'Nurse notes vs physician orders → compare by hand',
      'Map 8-hour intervention delay across shift changes',
    ],
    lawlineOutputs: [
      { text: 'Standard-of-care deviation timeline with page citations', time: '1m 22s' },
      { text: '8-hour delay between symptom onset & intervention flagged', time: 'auto' },
      { text: 'Care handoff gaps across 3 hospitalizations mapped', time: '48s' },
      { text: 'Expert report cross-reference: 3 inconsistencies surfaced', time: '55s' },
      { text: 'Causation chain: breach → harm → damages quantified', time: '1m 05s' },
    ],
    docTypes: 'Hospital records · Nursing notes · Physician orders · Expert reports · Billing records',
  },
  {
    id: 'realestate',
    label: 'Real Estate',
    icon: Home,
    color: '#1A3A6B',
    bg: 'rgba(26,58,107,0.07)',
    border: 'rgba(26,58,107,0.22)',
    painPoint: 'Tracing lease obligations through 47 amendments and 12 side letters — then spotting the notice defect that triggered the dispute — requires reading every version against the other.',
    manualTasks: [
      '47 lease amendments + 12 side letters → compare obligations',
      'Notice provisions → check each amendment for changes',
      'Estoppel certificates vs lease terms → find conflicts',
      'Correspondence → trace when breach was first raised',
      'Build breach chronology for unlawful detainer filing',
    ],
    lawlineOutputs: [
      { text: 'Obligation timeline across all 47 amendments', time: '58s' },
      { text: 'Notice defect identified: 3-day vs 30-day provision conflict', time: 'auto' },
      { text: 'First breach date pinned to exhibit with page citation', time: '44s' },
      { text: 'Estoppel vs lease conflict map (6 discrepancies)', time: '1m 01s' },
      { text: 'UD filing chronology ready for court', time: '37s' },
    ],
    docTypes: 'Lease agreements · Amendments · Side letters · Estoppels · Correspondence · Rent rolls',
  },
  {
    id: 'family',
    label: 'Family Law',
    icon: Scale,
    color: '#B8963E',
    bg: 'rgba(184,150,62,0.08)',
    border: 'rgba(184,150,62,0.25)',
    painPoint: 'Reconciling 8 years of bank statements with financial disclosures — to catch the hidden transfers your client suspects — means reading thousands of transactions by hand.',
    manualTasks: [
      '8 years × 12 statements × 2 accounts → read every line',
      'Financial disclosures → cross-check reported vs actual income',
      'Business records → find commingling evidence',
      'Retirement account transfers → trace dissipation',
      'Build asset timeline for equitable distribution hearing',
    ],
    lawlineOutputs: [
      { text: 'Asset dissipation timeline: $137K in hidden transfers flagged', time: '2m 14s' },
      { text: 'Income discrepancy: reported $180K vs actual $310K', time: 'auto' },
      { text: 'Commingling evidence map across 6 accounts', time: '1m 33s' },
      { text: 'Retirement account transfer pattern (4 pre-filing moves)', time: 'auto' },
      { text: 'Equitable distribution memo ready for hearing', time: '49s' },
    ],
    docTypes: 'Bank statements · Tax returns · Financial disclosures · Business records · Retirement accounts',
  },
  {
    id: 'contracts',
    label: 'Contracts',
    icon: FileText,
    color: '#1A3A6B',
    bg: 'rgba(26,58,107,0.07)',
    border: 'rgba(26,58,107,0.22)',
    painPoint: 'Reading a 140-page agreement against 23 amendments and 6 years of performance correspondence — to find who breached first and when — takes more time than the hearing itself.',
    manualTasks: [
      '140-page agreement + 23 amendments → map every obligation',
      '6 years of correspondence → find first notice of dispute',
      'Invoices vs payment records → trace payment defaults',
      'Force majeure claims → evaluate against contract terms',
      'Build performance chronology for arbitration brief',
    ],
    lawlineOutputs: [
      { text: 'Performance obligation map across all 23 amendments', time: '1m 12s' },
      { text: 'First breach date: Sept 14, 2021 (Exhibit 7, p. 23)', time: 'auto' },
      { text: 'Payment default pattern: 9 of 14 milestones missed', time: '57s' },
      { text: 'Force majeure analysis against contract terms', time: '1m 04s' },
      { text: 'Arbitration chronology with exhibit index', time: '41s' },
    ],
    docTypes: 'Agreement + amendments · Invoices · Payment records · Correspondence · Expert declarations',
  },
] as const

export function UseCasesSection() {
  const [activeId, setActiveId] = useState<string>('pi')
  const active = AREAS.find(a => a.id === activeId) ?? AREAS[0]

  return (
    <section
      style={{
        padding: '8rem 2rem',
        background: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative blobs */}
      <div style={{
        position: 'absolute', top: '-8%', right: '-4%',
        width: 480, height: 480,
        background: 'radial-gradient(circle, rgba(184,150,62,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-8%', left: '-4%',
        width: 360, height: 360,
        background: 'radial-gradient(circle, rgba(26,58,107,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '82rem', margin: '0 auto', position: 'relative' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#B8963E',
            display: 'block',
            marginBottom: '1.25rem',
          }}>
            Lawline by Practice Area
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
            Every case type. Every manual task.
            <br />
            <em style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #D4AE58 0%, #B8963E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Handled automatically.
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
            Select a practice area to see exactly which everyday tasks Lawline replaces — with the specific outputs your attorneys and paralegals get back.
          </p>
        </div>

        {/* Practice area tab bar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          justifyContent: 'center',
          marginBottom: '3rem',
        }}>
          {AREAS.map(area => {
            const Icon = area.icon
            const isActive = area.id === activeId
            return (
              <button
                key={area.id}
                onClick={() => setActiveId(area.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.55rem 1.125rem',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.8125rem',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#FFFFFF' : 'var(--color-muted)',
                  background: isActive
                    ? 'linear-gradient(135deg, #1A3A6B 0%, #0E2347 100%)'
                    : '#F6F7FA',
                  border: isActive ? '1px solid #1A3A6B' : '1px solid #E2E5EF',
                  borderRadius: 'var(--radius-pill)',
                  cursor: 'pointer',
                  transition: 'all 0.22s ease',
                  boxShadow: isActive ? '0 4px 12px rgba(26,58,107,0.20)' : 'none',
                }}
              >
                <Icon size={13} />
                {area.label}
              </button>
            )
          })}
        </div>

        {/* Animated content panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.5rem',
              alignItems: 'start',
            }}
          >
            {/* Left: Pain point + manual task list */}
            <div style={{
              background: '#0A1020',
              borderRadius: 'var(--radius-xl)',
              padding: '2.25rem',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Glow */}
              <div style={{
                position: 'absolute', top: '-20%', right: '-10%',
                width: 240, height: 240,
                background: `radial-gradient(circle, ${active.color}14 0%, transparent 70%)`,
                pointerEvents: 'none',
              }} />

              {/* Practice area badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.3rem 0.75rem',
                background: active.bg,
                border: `1px solid ${active.border}`,
                borderRadius: 'var(--radius-pill)',
                marginBottom: '1.5rem',
              }}>
                {(() => { const Icon = active.icon; return <Icon size={12} color={active.color} /> })()}
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: active.color,
                }}>
                  {active.label}
                </span>
              </div>

              {/* Pain point */}
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                color: 'rgba(232,236,248,0.75)',
                lineHeight: 1.65,
                marginBottom: '1.75rem',
                position: 'relative',
              }}>
                {active.painPoint}
              </p>

              {/* Manual task list */}
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(232,236,248,0.3)',
                marginBottom: '0.875rem',
              }}>
                Manual workflow today
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', position: 'relative' }}>
                {active.manualTasks.map((task, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.625rem',
                  }}>
                    <div style={{
                      width: 14,
                      height: 14,
                      borderRadius: 3,
                      border: '1.5px solid rgba(255,255,255,0.18)',
                      flexShrink: 0,
                      marginTop: '0.05rem',
                    }} />
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8125rem',
                      color: 'rgba(232,236,248,0.5)',
                      lineHeight: 1.5,
                    }}>
                      {task}
                    </span>
                  </div>
                ))}
              </div>

              {/* Doc types */}
              <div style={{
                marginTop: '1.75rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid rgba(255,255,255,0.07)',
              }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'rgba(232,236,248,0.25)',
                  marginBottom: '0.5rem',
                }}>
                  Document types handled
                </div>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5625rem',
                  letterSpacing: '0.04em',
                  color: `${active.color}99`,
                }}>
                  {active.docTypes}
                </span>
              </div>
            </div>

            {/* Right: Lawline output panel */}
            <div style={{
              background: '#FAFBFD',
              border: '1px solid #E2E5EF',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(10,16,32,0.05)',
            }}>
              {/* Panel header */}
              <div style={{
                padding: '1rem 1.375rem',
                background: '#FFFFFF',
                borderBottom: '1px solid #E2E5EF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: '#B8963E',
                    boxShadow: '0 0 0 3px rgba(184,150,62,0.2)',
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.5625rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-muted)',
                  }}>
                    Lawline Output · {active.label}
                  </span>
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.375rem',
                  padding: '0.2rem 0.625rem',
                  background: 'rgba(45,107,49,0.07)',
                  border: '1px solid rgba(45,107,49,0.2)',
                  borderRadius: 'var(--radius-pill)',
                }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#2D6B31' }} />
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.45rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#2D6B31',
                  }}>Complete</span>
                </div>
              </div>

              {/* Output list */}
              <div style={{ padding: '1.125rem 1.375rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {active.lawlineOutputs.map((output, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    background: '#FFFFFF',
                    border: '1px solid #E2E5EF',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: '0 1px 3px rgba(10,16,32,0.04)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', flex: 1 }}>
                      <CheckCircle2 size={14} color="#2D6B31" style={{ flexShrink: 0, marginTop: '0.1rem' }} />
                      <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.8125rem',
                        color: 'var(--color-ink)',
                        lineHeight: 1.45,
                      }}>
                        {output.text}
                      </span>
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.5rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: active.color,
                      background: active.bg,
                      border: `1px solid ${active.border}`,
                      padding: '0.15rem 0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}>
                      {output.time}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA footer */}
              <div style={{
                padding: '1.125rem 1.375rem',
                borderTop: '1px solid #E2E5EF',
                background: '#F6F7FA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5625rem',
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  color: 'var(--color-faint)',
                }}>
                  All outputs source-linked · Zero hallucinations
                </span>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#1A3A6B',
                  cursor: 'pointer',
                }}>
                  See full demo <ArrowRight size={12} />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom promo strip */}
        <div style={{
          marginTop: '2.5rem',
          padding: '1.25rem 2rem',
          background: '#F6F7FA',
          border: '1px solid #E2E5EF',
          borderRadius: 'var(--radius-xl)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { icon: Clock, text: 'Works with your existing file formats' },
              { icon: AlertTriangle, text: 'No learning curve — drop in any document' },
              { icon: CheckCircle2, text: 'Every output is page-cited and editable' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Icon size={13} color="#B8963E" />
                <span style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.8125rem',
                  color: 'var(--color-muted)',
                }}>
                  {text}
                </span>
              </div>
            ))}
          </div>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5625rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#1A3A6B',
            fontWeight: 500,
          }}>
            6 Practice Areas · 1 Platform
          </span>
        </div>
      </div>
    </section>
  )
}
