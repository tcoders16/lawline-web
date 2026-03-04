'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/* ─────────────────────────────────────────────────
   Press, Legal Publications & Awards
   (text-based logos for legal credibility)
───────────────────────────────────────────────── */
/* Publications that have covered AI in legal practice / legal tech security */
const PRESS_LOGOS = [
  { name: 'ABA Journal',          tagline: 'Legal ethics & AI',        date: 'Mar 2025' },
  { name: 'Law360',               tagline: 'LegalTech coverage',       date: 'Feb 2025' },
  { name: 'Above the Law',        tagline: 'Practice technology',      date: 'Feb 2025' },
  { name: 'Legal Technology News', tagline: 'Document AI benchmark',   date: 'Jan 2025' },
  { name: 'Bloomberg Law',        tagline: 'Am Law litigation tools',  date: 'Jan 2025' },
  { name: 'Law Technology Today', tagline: 'Paralegal workflow AI',    date: 'Dec 2024' },
]

const TRUST_MARKS = [
  { label: 'SOC 2 Type II',        org: 'Schellman & Co. LLC',          accent: '#2D6B31' },
  { label: 'Bar-opinion reviewed', org: 'ABA Ethics Formal Op. 477R',   accent: '#1A3A6B' },
  { label: 'ILTA Innovation 2024', org: 'Int\'l Legal Technology Assoc.', accent: '#B8963E' },
  { label: 'On-Prem Verified',     org: 'Client data sovereignty audit', accent: '#1A3A6B' },
]

export function PressLogosSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section
      ref={ref}
      style={{
        padding: '4rem 2rem',
        background: 'var(--color-cream)',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid var(--color-warm-100)',
        borderBottom: '1px solid var(--color-warm-100)',
      }}
    >
      <div style={{ maxWidth: '76rem', margin: '0 auto' }}>

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5625rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--color-faint)',
          }}>
            As seen in & recognized by
          </span>
        </motion.div>

        {/* Press logos row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0',
            justifyContent: 'center',
            marginBottom: '2rem',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            border: '1px solid var(--color-warm-100)',
          }}
        >
          {PRESS_LOGOS.map(({ name, tagline, date }, i) => (
            <div
              key={name}
              style={{
                flex: '1 1 130px',
                padding: '1.125rem 1.25rem',
                background: '#FFFFFF',
                borderRight: i < PRESS_LOGOS.length - 1 ? '1px solid var(--color-warm-100)' : 'none',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.3rem',
                alignItems: 'center',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.8125rem',
                fontWeight: 400,
                fontStyle: 'italic',
                color: 'var(--color-ink)',
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
              }}>
                {name}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.4rem',
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                color: 'var(--color-faint)',
                lineHeight: 1.3,
              }}>
                {tagline}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.375rem',
                letterSpacing: '0.06em',
                color: 'rgba(184,150,62,0.6)',
              }}>
                {date}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Trust marks row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.625rem',
            justifyContent: 'center',
          }}
        >
          {TRUST_MARKS.map(({ label, org, accent }) => (
            <div
              key={label}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                background: '#FFFFFF',
                border: `1px solid ${accent}20`,
                borderRadius: 'var(--radius-pill)',
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: accent, flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-ink)', letterSpacing: '-0.01em' }}>
                {label}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4rem', letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--color-faint)' }}>
                {org}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
