'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Star, Quote } from 'lucide-react'

const FIRM_TYPES = [
  { label: 'Solo practitioners', detail: 'Sunday nights → Monday mornings' },
  { label: 'Boutique PI & med-mal firms', detail: '50+ case files per attorney' },
  { label: 'Am Law 200 litigation depts', detail: '12,000-page discovery reviews' },
] as const

const TESTIMONIALS = [
  {
    quote:
      'We had a 900-page med-mal file due at mediation in three days. My paralegal would have spent two full days just building the chronology. Lawline had a verified draft in 47 seconds. We spent the two days actually preparing arguments — and settled for 40% above our floor.',
    author: 'Sarah K.',
    title: 'Partner, Medical Malpractice',
    firm: 'Chicago, IL',
    rating: 5,
    initials: 'SK',
    accentRaw: '#B8963E',
  },
  {
    quote:
      "Our clients are financial institutions under active regulatory scrutiny. On-prem wasn't a nice-to-have — it was a hard requirement. Every other AI tool we evaluated sent data to a cloud. Lawline was the only one that didn't, and it still outperformed all of them on a 12,000-page discovery review.",
    author: 'Marcus T.',
    title: 'Managing Partner, Securities Litigation',
    firm: 'San Francisco, CA',
    rating: 5,
    initials: 'MT',
    accentRaw: '#4A52A0',
  },
  {
    quote:
      "I run a solo family law practice. Sunday nights used to mean building timelines from 8 years of bank statements for Monday hearings. Lawline reads all of it and catches financial discrepancies I would have missed. That's not just time saved — that's better lawyering.",
    author: 'Priya N.',
    title: 'Solo Practitioner, Family Law',
    firm: 'Austin, TX',
    rating: 5,
    initials: 'PN',
    accentRaw: '#3D6B41',
  },
  {
    quote:
      "I used to spend the first two hours of every Monday building chronologies. Now I spend those two hours actually prepping the depositions those chronologies were for. That's the whole job shifted.",
    author: 'James W.',
    title: 'Senior Paralegal, 7 yrs',
    firm: 'Dallas, TX',
    rating: 5,
    initials: 'JW',
    accentRaw: '#1A3A6B',
  },
] as const

export function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

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
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '-5%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(184,146,58,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '76rem', margin: '0 auto', position: 'relative' }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          style={{ textAlign: 'center', marginBottom: '4.5rem' }}
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
            From Practitioners
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)',
              fontWeight: 300,
              letterSpacing: '-0.03em',
              color: 'var(--color-ink)',
              lineHeight: 1.08,
            }}
          >
            Trusted by attorneys
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
              across every practice area
            </em>
          </h2>
        </motion.div>

        {/* Firm type strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0',
            marginBottom: '3rem',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            border: '1px solid #E2E5EF',
          }}
        >
          {FIRM_TYPES.map(({ label, detail }, i) => (
            <div key={label} style={{
              flex: 1,
              padding: '1rem 1.5rem',
              background: '#FFFFFF',
              borderRight: i < FIRM_TYPES.length - 1 ? '1px solid #E2E5EF' : 'none',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--color-ink)',
                marginBottom: '0.25rem',
              }}>
                {label}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-faint)',
              }}>
                {detail}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {TESTIMONIALS.map(({ quote, author, title, firm, rating, initials, accentRaw }, i) => (
            <motion.div
              key={author}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
              whileHover={{ y: -3, boxShadow: `0 20px 40px rgba(28,27,24,0.10)` }}
              style={{
                background: 'var(--color-parchment)',
                border: '1px solid var(--color-warm-100)',
                borderRadius: 'var(--radius-xl)',
                padding: '2.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                position: 'relative',
                overflow: 'hidden',
                transition: 'box-shadow 0.3s ease',
              }}
            >
              {/* Accent top line */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '10%',
                width: '80%',
                height: '2px',
                background: `linear-gradient(to right, transparent, ${accentRaw}60, transparent)`,
              }} />

              {/* Quote icon */}
              <Quote
                size={28}
                style={{
                  color: accentRaw,
                  opacity: 0.2,
                  position: 'absolute',
                  top: '1.75rem',
                  right: '1.75rem',
                }}
              />

              {/* Stars */}
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                {Array.from({ length: rating }).map((_, j) => (
                  <Star key={j} size={13} fill={accentRaw} color={accentRaw} />
                ))}
              </div>

              {/* Quote */}
              <blockquote
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.0625rem',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  lineHeight: 1.65,
                  color: 'var(--color-ink)',
                  margin: 0,
                  flex: 1,
                }}
              >
                "{quote}"
              </blockquote>

              {/* Author */}
              <div
                style={{
                  borderTop: '1px solid var(--color-warm-100)',
                  paddingTop: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.875rem',
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: `${accentRaw}14`,
                    border: `1px solid ${accentRaw}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: accentRaw,
                    }}
                  >
                    {initials}
                  </span>
                </div>

                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.9375rem',
                      fontWeight: 600,
                      color: 'var(--color-ink)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {author}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.5625rem',
                      letterSpacing: '0.08em',
                      color: 'var(--color-faint)',
                      textTransform: 'uppercase',
                      marginTop: '0.2rem',
                    }}
                  >
                    {title} · {firm}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
