'use client'

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useEffect } from 'react'

const STATS = [
  {
    value:   12000,
    suffix:  '+',
    label:   'Case files processed',
    sublabel: 'PI · med-mal · employment · contracts · real estate',
    accent:  '#B8963E',
  },
  {
    value:   42,
    suffix:  's',
    label:   'Avg. timeline draft time',
    sublabel: 'was 4–6 hrs of paralegal time per file',
    accent:  '#1A3A6B',
  },
  {
    value:   97,
    suffix:  '%',
    label:   'Accuracy on dates & amounts',
    sublabel: 'validated by practicing litigators',
    accent:  '#B8963E',
  },
  {
    value:   100,
    suffix:  '%',
    label:   'On-prem data isolation',
    sublabel: 'client files never leave your walls',
    accent:  '#1A3A6B',
  },
] as const

function AnimatedCount({ target, suffix }: { target: number; suffix: string }) {
  const count = useMotionValue(0)
  const spring = useSpring(count, { stiffness: 60, damping: 18 })
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) count.set(target)
  }, [inView, count, target])

  useEffect(() => {
    return spring.on('change', v => {
      if (ref.current) {
        ref.current.textContent = Math.round(v).toLocaleString() + suffix
      }
    })
  }, [spring, suffix])

  return <span ref={ref}>0{suffix}</span>
}

export function StatsBar() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      style={{
        padding: '0',
        background: '#F6F7FA',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top gold gradient border */}
      <div
        style={{
          height: '2px',
          background: 'linear-gradient(to right, transparent, #B8963E 25%, #D4AE58 50%, #B8963E 75%, transparent)',
          opacity: 0.6,
        }}
      />

      {/* Subtle bg blobs */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '20%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        height: 300,
        background: 'radial-gradient(circle, rgba(184,150,62,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        top: '50%',
        right: '5%',
        transform: 'translateY(-50%)',
        width: 250,
        height: 250,
        background: 'radial-gradient(circle, rgba(26,58,107,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div
        className="grid-stats"
        style={{
          maxWidth: '80rem',
          margin: '0 auto',
        }}
      >
        {STATS.map(({ value, suffix, label, sublabel, accent }, i) => (
          <motion.div
            key={label}
            className="stat-col"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
          >
            {/* Accent underline on hover */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: '20%',
                width: '60%',
                height: '1px',
                background: `linear-gradient(to right, transparent, ${accent}50, transparent)`,
                opacity: 0,
                transition: 'opacity 0.3s ease',
              }}
            />

            {/* Number */}
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                fontWeight: 400,
                letterSpacing: '-0.03em',
                color: accent,
                marginBottom: '0.5rem',
                lineHeight: 1,
              }}
            >
              <AnimatedCount target={value} suffix={suffix} />
            </div>

            {/* Label */}
            <div
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--color-ink)',
                marginBottom: '0.375rem',
                letterSpacing: '-0.01em',
              }}
            >
              {label}
            </div>

            {/* Sublabel */}
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5625rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-faint)',
              }}
            >
              {sublabel}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom border */}
      <div
        style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, #E2E5EF 50%, transparent)',
        }}
      />
    </section>
  )
}
