'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { TrendingUp, Clock, DollarSign, Scale, CheckCircle } from 'lucide-react'

const RESULTS = [
  {
    firm: 'Personal injury boutique · Chicago',
    size: '4 attorneys · 3 paralegals',
    scenario: 'Pre-mediation chronology for 900-page motor vehicle accident file',
    before: {
      time: '6.5 hours',
      who: 'Senior paralegal, full day',
      problems: ['Pages 340-410 medical gap missed', 'IME contradiction not caught before mediation', 'Settlement: $127K'],
    },
    after: {
      time: '42 seconds',
      who: 'Lawline — paralegal verified in 15 min',
      wins: ['Gap identified, addressed in demand letter', 'IME contradiction flagged, expert retained', 'Settlement: $284K'],
    },
    improvement: '+$157K settlement · 6.4 hrs saved',
    accent: '#1A3A6B',
  },
  {
    firm: 'Employment litigation practice · San Francisco',
    size: '8 attorneys · Boutique plaintiffs\' side',
    scenario: 'EEOC charge and pre-litigation discovery review across 847 emails',
    before: {
      time: '18 hours over 3 days',
      who: '2 associates + 1 paralegal',
      problems: ['Protected activity → adverse action chain took 2 weeks to map', 'Missed 4 comparator emails in production', 'Filed EEOC charge 3 weeks after intake'],
    },
    after: {
      time: '14 minutes',
      who: 'Lawline — 1 paralegal review',
      wins: ['Protected activity chain built automatically from email metadata', 'All 847 emails relevance-scored, 4 comparators flagged', 'EEOC charge filed same week as intake'],
    },
    improvement: '3-week cycle → 4-day cycle · 2 associate hours freed per matter',
    accent: '#B8963E',
  },
  {
    firm: 'Am Law 200 litigation dept · New York',
    size: '200+ attorneys · Financial institution clients',
    scenario: '12,000-page discovery review across merger dispute — cloud AI prohibited by client',
    before: {
      time: '480 attorney-hours · 6 weeks',
      who: 'Contract review team + 4 associates',
      problems: ['$240K document review spend per matter', 'Cloud AI prohibited under client contract', 'Report turnaround: 6 weeks from production'],
    },
    after: {
      time: '9 attorney-hours · 4 days',
      who: 'Lawline on-prem (client-approved) + 2 associates',
      wins: ['$18K total document work cost (vs $240K)', 'On-prem deployment satisfied client\'s data sovereignty req', 'Report turnaround: 4 business days'],
    },
    improvement: '93% cost reduction · 6 weeks → 4 days',
    accent: '#2D6B31',
  },
] as const

export function ClientResultsSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

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
            Before & After — Real Matters
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
            What Lawline actually
            <br />
            <em style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #D4AE58 0%, #B8963E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              changed for these firms
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
            Specific cases, specific results. Not averages — actual before-and-after on real matters.
          </p>
        </motion.div>

        {/* Result cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {RESULTS.map(({ firm, size, scenario, before, after, improvement, accent }, i) => (
            <motion.div
              key={firm}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              style={{
                background: '#FFFFFF',
                border: '1px solid var(--color-warm-100)',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
              }}
            >
              {/* Card header */}
              <div style={{
                padding: '1.5rem 2rem',
                background: `${accent}04`,
                borderBottom: `1px solid ${accent}15`,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '1.5rem',
                flexWrap: 'wrap',
              }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-ink)', letterSpacing: '-0.015em', marginBottom: '0.2rem' }}>
                    {firm}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4375rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: accent, marginBottom: '0.5rem' }}>
                    {size}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--color-muted)', lineHeight: 1.4 }}>
                    <em>Matter: {scenario}</em>
                  </div>
                </div>
                <div style={{
                  background: accent,
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-pill)',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                }}>
                  <TrendingUp size={12} /> {improvement}
                </div>
              </div>

              {/* Before / After columns */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                {/* Before */}
                <div style={{ padding: '2rem', borderRight: '1px solid var(--color-warm-100)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.875rem', fontWeight: 600, color: '#C45C30' }}>Before Lawline</div>
                    <div style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.4375rem', letterSpacing: '0.08em',
                      textTransform: 'uppercase', color: '#C45C30',
                      background: 'rgba(196,92,48,0.08)', border: '1px solid rgba(196,92,48,0.2)',
                      borderRadius: 'var(--radius-pill)', padding: '0.2rem 0.6rem',
                    }}>
                      <Clock size={8} style={{ display: 'inline', marginRight: '0.25rem' }} />
                      {before.time}
                    </div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4375rem', letterSpacing: '0.07em', color: 'var(--color-faint)', textTransform: 'uppercase', marginBottom: '1rem' }}>
                    {before.who}
                  </div>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                    {before.problems.map(p => (
                      <li key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                        <div style={{ width: 14, height: 14, border: '1px solid rgba(196,92,48,0.4)', borderRadius: '3px', flexShrink: 0, marginTop: '0.05rem' }} />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--color-muted)', lineHeight: 1.5 }}>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* After */}
                <div style={{ padding: '2rem', background: `${accent}02` }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.875rem', fontWeight: 600, color: accent }}>With Lawline</div>
                    <div style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.4375rem', letterSpacing: '0.08em',
                      textTransform: 'uppercase', color: '#2D6B31',
                      background: 'rgba(45,107,49,0.08)', border: '1px solid rgba(45,107,49,0.2)',
                      borderRadius: 'var(--radius-pill)', padding: '0.2rem 0.6rem',
                    }}>
                      <Clock size={8} style={{ display: 'inline', marginRight: '0.25rem' }} />
                      {after.time}
                    </div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4375rem', letterSpacing: '0.07em', color: 'var(--color-faint)', textTransform: 'uppercase', marginBottom: '1rem' }}>
                    {after.who}
                  </div>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                    {after.wins.map(w => (
                      <li key={w} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                        <CheckCircle size={14} style={{ color: accent, flexShrink: 0, marginTop: '0.05rem' }} />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--color-muted)', lineHeight: 1.5 }}>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.7 }}
          style={{
            textAlign: 'center',
            marginTop: '2.5rem',
            fontFamily: 'var(--font-body)',
            fontSize: '0.8125rem',
            color: 'var(--color-faint)',
          }}
        >
          Results based on firm-reported data. Firm names withheld by request. Dollar figures are client-reported settlement outcomes.
        </motion.div>
      </div>
    </section>
  )
}
