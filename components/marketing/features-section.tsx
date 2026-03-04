'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { GitBranch, FileCheck, Server, Cpu, Zap, Lock } from 'lucide-react'

const FEATURES = [
  {
    icon: GitBranch,
    label: 'Timeline Intelligence',
    title: 'Living Timelines',
    description:
      'Upload the entire case dump — depositions, ER records, police reports, 5 treating physicians, all at once. Lawline reads every page, pulls every date, and builds a source-linked chronology. No more 11 PM page-turning before mediation.',
    accent: 'var(--color-terracotta)',
    accentRaw: '#B8963E',
    demo: ['ER visit Jan 14', '6-month treatment gap flagged', 'IME dispute → surgery denial'],
  },
  {
    icon: FileCheck,
    label: 'Client-Ready Output',
    title: 'Demand Letters in Minutes',
    description:
      "From 280 pages of medical records to a signed demand letter — one click. Lawline tallies documented expenses, synthesizes treatment history, and drafts in your firm's voice. No more paralegal marathon sessions the night before a deadline.",
    accent: 'var(--color-gold)',
    accentRaw: '#B8923A',
    demo: ['$284K damages auto-calc', 'Demand letter drafted', '15-min attorney review'],
  },
  {
    icon: Server,
    label: 'Security First',
    title: 'On-Prem. No Exceptions.',
    description:
      'Sealed matters, protective orders, partner-level clients — your most sensitive files never leave your walls. Fully air-gapped on your Mac or Linux server. No cloud vendor can subpoena what you never uploaded.',
    accent: 'var(--color-sage)',
    accentRaw: '#3D6B41',
    demo: ['Zero data egress', 'SOC 2 Type II', 'Protective order–safe'],
  },
  {
    icon: Cpu,
    label: 'Local AI Engine',
    title: 'On-Device Intelligence',
    description:
      'The AI that reads 800 pages runs on your own hardware — no OpenAI, no Azure, no Google Cloud. No subpoena risk, no data licensing exposure, no terms-of-service surprises. Your model, your documents, your walls.',
    accent: 'var(--color-indigo)',
    accentRaw: '#4A52A0',
    demo: ['No third-party API calls', '< 4GB VRAM · M1–M3', 'Runs fully offline'],
  },
  {
    icon: Zap,
    label: 'Speed',
    title: '4 Hours → 42 Seconds',
    description:
      'Your paralegal just got half their day back. The manual "read every page, highlight dates, paste into spreadsheet" workflow is gone. Use those hours for deposition prep, client contact, or billing 12 more cases a week.',
    accent: 'var(--color-gold)',
    accentRaw: '#B8923A',
    demo: ['Was: 4–6 hrs/case file', 'Now: 42s avg.', '~30 cases/week capacity'],
  },
  {
    icon: Lock,
    label: 'Privileged',
    title: 'Work Product Stays Protected',
    description:
      'Privilege only holds if the data stays controlled. Every AI inference runs local — no shared models, no fine-tuning on your client files, no vendor access logs. Privilege logs, redaction trails, and per-user audit timestamps built in.',
    accent: 'var(--color-terracotta)',
    accentRaw: '#B8963E',
    demo: ['Privilege log auto-generated', 'Per-user audit trail', 'Redaction tracked'],
  },
] as const

export function FeaturesSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      style={{
        padding: '8rem 2rem',
        background: 'var(--color-parchment)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '400px',
          background: 'radial-gradient(ellipse at center, rgba(196,103,58,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

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
              color: 'var(--color-terracotta)',
              display: 'block',
              marginBottom: '1.25rem',
            }}
          >
            Core Capabilities
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)',
              fontWeight: 300,
              letterSpacing: '-0.03em',
              color: 'var(--color-ink)',
              lineHeight: 1.08,
              marginBottom: '1.25rem',
            }}
          >
            Everything a litigator needs,
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
              nothing they don't
            </em>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'var(--color-muted)',
              maxWidth: '38rem',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Lawline is purpose-built for legal work — not a general AI wrapper.
            Every feature exists because a practitioner asked for it.
          </p>
        </motion.div>

        {/* Feature grid — 3 col on desktop */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {FEATURES.map(({ icon: Icon, label, title, description, accent, accentRaw, demo }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.19, 1, 0.22, 1] }}
              style={{
                background: '#FFFFFF',
                border: '1px solid #E2E5EF',
                borderRadius: 'var(--radius-xl)',
                padding: '1.875rem',
                position: 'relative',
                overflow: 'hidden',
                transition: 'box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease',
                cursor: 'default',
                boxShadow: '0 1px 4px rgba(10,16,32,0.05)',
              }}
              whileHover={{
                y: -4,
                boxShadow: `0 20px 40px rgba(10,16,32,0.09), 0 4px 12px ${accentRaw}18`,
                borderColor: `${accentRaw}35`,
              }}
            >
              {/* Accent corner gradient */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '120px',
                  height: '120px',
                  background: `radial-gradient(ellipse at top right, ${accentRaw}0E 0%, transparent 70%)`,
                  pointerEvents: 'none',
                }}
              />

              {/* Icon */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 'var(--radius-md)',
                  background: `${accentRaw}12`,
                  border: `1px solid ${accentRaw}28`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  position: 'relative',
                }}
              >
                <Icon size={22} style={{ color: accent }} />
              </div>

              {/* Label */}
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5625rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: accent,
                  display: 'block',
                  marginBottom: '0.5rem',
                }}
              >
                {label}
              </span>

              {/* Title */}
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

              {/* Description */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  lineHeight: 1.75,
                  color: 'var(--color-muted)',
                  marginBottom: '1.375rem',
                }}
              >
                {description}
              </p>

              {/* Demo pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                {demo.map(d => (
                  <span
                    key={d}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.5625rem',
                      letterSpacing: '0.06em',
                      color: accent,
                      background: `${accentRaw}0C`,
                      border: `1px solid ${accentRaw}20`,
                      padding: '0.2rem 0.625rem',
                      borderRadius: 'var(--radius-pill)',
                    }}
                  >
                    {d}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* "What It Replaces" strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="replaces-strip"
          style={{
            marginTop: '2.5rem',
            paddingTop: '2rem',
            borderTop: '1px solid #E2E5EF',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            border: '1px solid #E2E5EF',
          }}
        >
          {[
            { before: 'Paralegal manual review',    after: '42-second AI pass' },
            { before: 'Spreadsheet chronology',      after: 'Source-linked timeline' },
            { before: 'Billable document prep',      after: 'Export-ready in seconds' },
            { before: 'Re-reading for mediation',    after: 'AI contradiction flags' },
          ].map(({ before, after }, i) => (
            <div
              key={before}
              className="replaces-strip-item"
              style={{
                flex: '1 1 220px',
                padding: '1rem 1.375rem',
                background: i % 2 === 0 ? '#FAFBFD' : '#FFFFFF',
                borderRight: i < 3 ? '1px solid #E2E5EF' : 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.375rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5rem',
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  color: '#C5CADE',
                  textDecoration: 'line-through',
                  textDecorationColor: 'rgba(196,103,58,0.4)',
                }}>
                  ✕ {before}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5rem',
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  color: '#1A3A6B',
                  fontWeight: 600,
                }}>
                  ✓ {after}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
