'use client'

import { useState, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useApp } from '@/components/providers/app-providers'

const BILLING_RATES = [
  { label: '$150/hr',  value: 150 },
  { label: '$200/hr',  value: 200 },
  { label: '$250/hr',  value: 250 },
  { label: '$350/hr',  value: 350 },
  { label: '$500/hr',  value: 500 },
] as const

export function RoiCalculatorSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { openComingSoon } = useApp()

  const [casesPerWeek,  setCasesPerWeek]  = useState(10)
  const [hoursPerCase,  setHoursPerCase]  = useState(4)
  const [billingRate,   setBillingRate]   = useState(250)
  const [teamSize,      setTeamSize]      = useState(3)

  const roi = useMemo(() => {
    const weeksPerYear       = 48
    const hoursManual        = casesPerWeek * hoursPerCase * weeksPerYear * teamSize
    const hoursLawline       = casesPerWeek * (42 / 3600) * weeksPerYear * teamSize   // 42 seconds per case
    const hoursSaved         = hoursManual - hoursLawline
    const valueRecovered     = hoursSaved * billingRate
    const annualPlanCost     = 149 * 12  // Team plan
    const roi                = valueRecovered / annualPlanCost
    const hoursPerWeekSaved  = casesPerWeek * (hoursPerCase - (42 / 3600)) * teamSize

    return {
      hoursSaved:        Math.round(hoursSaved),
      valueRecovered:    Math.round(valueRecovered),
      roiMultiple:       Math.round(roi),
      hoursPerWeekSaved: Math.round(hoursPerWeekSaved * 10) / 10,
    }
  }, [casesPerWeek, hoursPerCase, billingRate, teamSize])

  const formatCurrency = (n: number) =>
    n >= 1_000_000
      ? `$${(n / 1_000_000).toFixed(1)}M`
      : `$${(n / 1_000).toFixed(0)}K`

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
      {/* Background */}
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        left: '-5%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(184,150,62,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '72rem', margin: '0 auto', position: 'relative' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
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
            Return on Investment
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
            Calculate what Lawline
            <br />
            <em style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #D4AE58 0%, #B8963E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              saves your firm
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
            Tell us your firm's numbers. We'll show you exactly how many hours — and dollars — Lawline gives back.
          </p>
        </motion.div>

        {/* Calculator grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          alignItems: 'start',
        }}>

          {/* Inputs panel */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              background: 'var(--color-cream)',
              border: '1px solid var(--color-warm-100)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
            }}
          >
            <h3 style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--color-ink)',
              letterSpacing: '-0.015em',
              marginBottom: '1.75rem',
            }}>
              Your firm's numbers
            </h3>

            {/* Cases per week */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.625rem' }}>
                <label style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--color-ink)',
                }}>
                  Case files processed / week
                </label>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 300,
                  color: '#B8963E',
                  letterSpacing: '-0.02em',
                }}>
                  {casesPerWeek}
                </span>
              </div>
              <input
                type="range"
                min={1} max={50} step={1}
                value={casesPerWeek}
                onChange={e => setCasesPerWeek(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#B8963E', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--color-faint)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>1 file</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--color-faint)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>50 files</span>
              </div>
            </div>

            {/* Hours per case */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.625rem' }}>
                <label style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--color-ink)',
                }}>
                  Manual hours per file (paralegal)
                </label>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 300,
                  color: '#B8963E',
                  letterSpacing: '-0.02em',
                }}>
                  {hoursPerCase}h
                </span>
              </div>
              <input
                type="range"
                min={1} max={12} step={0.5}
                value={hoursPerCase}
                onChange={e => setHoursPerCase(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#B8963E', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--color-faint)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>1 hr</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--color-faint)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>12 hrs</span>
              </div>
            </div>

            {/* Team size */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.625rem' }}>
                <label style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--color-ink)',
                }}>
                  Attorneys + paralegals using Lawline
                </label>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 300,
                  color: '#B8963E',
                  letterSpacing: '-0.02em',
                }}>
                  {teamSize}
                </span>
              </div>
              <input
                type="range"
                min={1} max={20} step={1}
                value={teamSize}
                onChange={e => setTeamSize(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#B8963E', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--color-faint)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Solo</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--color-faint)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>20 people</span>
              </div>
            </div>

            {/* Billing rate */}
            <div>
              <label style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'var(--color-ink)',
                display: 'block',
                marginBottom: '0.625rem',
              }}>
                Paralegal billing / effective rate
              </label>
              <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                {BILLING_RATES.map(({ label, value }) => (
                  <button
                    key={value}
                    onClick={() => setBillingRate(value)}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.5625rem',
                      letterSpacing: '0.07em',
                      color: billingRate === value ? '#FFFFFF' : 'var(--color-muted)',
                      background: billingRate === value ? 'var(--color-ink)' : 'var(--color-parchment)',
                      border: billingRate === value ? '1px solid var(--color-ink)' : '1px solid var(--color-warm-100)',
                      borderRadius: 'var(--radius-pill)',
                      padding: '0.35rem 0.75rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Results panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {/* Big ROI stat */}
            <div style={{
              background: 'var(--color-ink)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              marginBottom: '1rem',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <motion.div
                animate={{ scale: [1, 1.05, 1], opacity: [0.12, 0.2, 0.12] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: '-3rem',
                  right: '-3rem',
                  width: '12rem',
                  height: '12rem',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #B8963E 0%, transparent 70%)',
                }}
              />

              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5625rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(184,150,62,0.7)',
                marginBottom: '0.5rem',
              }}>
                Annual value recovered
              </div>
              <motion.div
                key={roi.valueRecovered}
                initial={{ scale: 0.9, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3rem, 6vw, 4.5rem)',
                  fontWeight: 300,
                  letterSpacing: '-0.04em',
                  color: '#D4AE58',
                  lineHeight: 1,
                  marginBottom: '0.5rem',
                }}
              >
                {formatCurrency(roi.valueRecovered)}
              </motion.div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'rgba(253,252,250,0.5)',
                lineHeight: 1.5,
              }}>
                in billable-equivalent time your team recaptures
              </div>
            </div>

            {/* Stats grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.75rem',
            }}>
              {[
                { label: 'Hours saved / year',    value: `${roi.hoursSaved.toLocaleString()}h`, accent: '#B8963E' },
                { label: 'Hours freed / week',    value: `${roi.hoursPerWeekSaved}h`,            accent: '#1A3A6B' },
                { label: 'ROI multiple',           value: `${roi.roiMultiple}×`,                  accent: '#2D6B31' },
                { label: 'Plan cost / year',       value: '$1,788',                               accent: '#B8963E' },
              ].map(({ label, value, accent }) => (
                <motion.div
                  key={label}
                  whileHover={{ y: -2 }}
                  style={{
                    background: 'var(--color-cream)',
                    border: '1px solid var(--color-warm-100)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.25rem',
                  }}
                >
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.75rem',
                    fontWeight: 300,
                    letterSpacing: '-0.03em',
                    color: accent,
                    lineHeight: 1,
                    marginBottom: '0.375rem',
                  }}>
                    {value}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.5rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--color-faint)',
                  }}>
                    {label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div style={{ marginTop: '1rem' }}>
              <button
                onClick={() => openComingSoon()}
                className="btn-primary shimmer-button"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: 'none',
                  fontSize: '0.9375rem',
                  padding: '0.875rem',
                }}
              >
                Lock in your ROI — Join waitlist
              </button>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5rem',
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                color: 'var(--color-faint)',
                textAlign: 'center',
                marginTop: '0.625rem',
              }}>
                30-day free trial · no credit card required
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
