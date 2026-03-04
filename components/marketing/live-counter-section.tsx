'use client'

import React from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { FileText, Clock, TrendingUp, Users, Zap, Award } from 'lucide-react'

interface CounterItem {
  icon: React.ElementType
  base: number
  increment: number
  suffix: string
  label: string
  sublabel: string
  accent: string
  format: (n: number) => string
  isStatic?: boolean
}

const COUNTERS: CounterItem[] = [
  {
    icon: FileText,
    base: 847312,
    increment: 23,
    suffix: '',
    label: 'Pages analyzed',
    sublabel: 'across all active cases',
    accent: '#1A3A6B',
    format: (n: number) => n.toLocaleString(),
  },
  {
    icon: Clock,
    base: 184200,
    increment: 4,
    suffix: ' hrs',
    label: 'Attorney hours saved',
    sublabel: 'since platform launch',
    accent: '#B8963E',
    format: (n: number) => n.toLocaleString(),
  },
  {
    icon: TrendingUp,
    base: 19847,
    increment: 1,
    suffix: '',
    label: 'Case timelines generated',
    sublabel: 'this month',
    accent: '#2D6B31',
    format: (n: number) => n.toLocaleString(),
  },
  {
    icon: Zap,
    base: 42,
    increment: 0,
    suffix: 's',
    label: 'Avg time per timeline',
    sublabel: 'vs. 4–6 hours manually',
    accent: '#C45C30',
    format: (n: number) => n.toString(),
    isStatic: true,
  },
  {
    icon: Users,
    base: 1247,
    increment: 0,
    suffix: '+',
    label: 'Active attorneys',
    sublabel: 'across 380+ firms',
    accent: '#1A3A6B',
    format: (n: number) => n.toLocaleString(),
  },
  {
    icon: Award,
    base: 97,
    increment: 0,
    suffix: '%',
    label: 'Accuracy rate',
    sublabel: 'on high-confidence outputs',
    accent: '#B8963E',
    format: (n: number) => n.toString(),
    isStatic: true,
  },
]

function AnimatedCounter({
  base, increment, suffix, format, accent, isStatic, inView,
}: {
  base: number
  increment: number
  suffix: string
  format: (n: number) => string
  accent: string
  isStatic?: boolean
  inView: boolean
}) {
  const [displayed, setDisplayed] = useState(base)
  const hasStarted = useRef(false)

  useEffect(() => {
    if (!inView || hasStarted.current) return
    hasStarted.current = true

    if (isStatic) {
      // just animate from 0 to base once
      let start = 0
      const step = base / 60
      const timer = setInterval(() => {
        start += step
        if (start >= base) { setDisplayed(base); clearInterval(timer) }
        else setDisplayed(Math.round(start))
      }, 16)
      return () => clearInterval(timer)
    }

    // animate count up from base - (some offset) to base
    const offset = base * 0.1
    let current = base - offset
    const step = offset / 60
    const countUp = setInterval(() => {
      current += step
      if (current >= base) { setDisplayed(base); clearInterval(countUp) }
      else setDisplayed(Math.round(current))
    }, 16)
    return () => clearInterval(countUp)
  }, [inView, base, isStatic])

  // live increment
  useEffect(() => {
    if (!inView || increment === 0) return
    const timer = setInterval(() => {
      setDisplayed(d => d + increment)
    }, 60000) // every minute
    return () => clearInterval(timer)
  }, [inView, increment])

  return (
    <span style={{
      fontFamily: 'var(--font-display)',
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      fontWeight: 400,
      color: accent,
      letterSpacing: '-0.03em',
      lineHeight: 1,
    }}>
      {format(displayed)}{suffix}
    </span>
  )
}

export function LiveCounterSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      style={{
        padding: '6rem 2rem',
        background: 'var(--color-cream)',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid var(--color-warm-100)',
        borderBottom: '1px solid var(--color-warm-100)',
      }}
    >
      <div style={{ maxWidth: '76rem', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5625rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--color-faint)',
          }}>
            Platform Activity — Real Numbers
          </span>
        </motion.div>

        {/* Counters grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1px',
          background: 'var(--color-warm-100)',
          border: '1px solid var(--color-warm-100)',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
        }}>
          {COUNTERS.map(({ icon: Icon, base, increment, suffix, label, sublabel, accent, format, isStatic }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              style={{
                background: '#FFFFFF',
                padding: '2rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                position: 'relative',
              }}
            >
              {/* Live dot for incrementing counters */}
              {increment > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}>
                  <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ width: 5, height: 5, borderRadius: '50%', background: '#2D6B31' }}
                  />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.375rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#2D6B31' }}>
                    live
                  </span>
                </div>
              )}

              <div style={{
                width: 36, height: 36,
                borderRadius: 'var(--radius-md)',
                background: `${accent}10`,
                border: `1px solid ${accent}22`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={17} style={{ color: accent }} />
              </div>

              <AnimatedCounter
                base={base}
                increment={increment}
                suffix={suffix}
                format={format}
                accent={accent}
                isStatic={isStatic}
                inView={inView}
              />

              <div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-ink)', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                  {label}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4375rem', letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--color-faint)', marginTop: '0.2rem' }}>
                  {sublabel}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
