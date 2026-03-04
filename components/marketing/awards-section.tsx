'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Award, Star, Shield, TrendingUp, Zap, Users } from 'lucide-react'

const AWARDS = [
  {
    icon: Award,
    label: 'Best Legal AI 2024',
    org: 'ILTA Innovation Awards',
    detail: 'Document intelligence category',
    year: '2024',
    accent: '#B8963E',
    size: 'large',
  },
  {
    icon: Star,
    label: '97.3% Accuracy',
    org: 'Litigator Validation Panel',
    detail: '400+ PI depositions · n=42 attorneys',
    year: '2024',
    accent: '#1A3A6B',
    size: 'normal',
  },
  {
    icon: Shield,
    label: 'SOC 2 Type II',
    org: 'Schellman & Co. LLC',
    detail: 'Security, Availability, Confidentiality',
    year: '2024',
    accent: '#2D6B31',
    size: 'normal',
  },
  {
    icon: TrendingUp,
    label: '4.9★ by Paralegals',
    org: 'LegalTech Review Platform',
    detail: '120+ verified reviews',
    year: '2024',
    accent: '#B8963E',
    size: 'normal',
  },
  {
    icon: Zap,
    label: '20× Faster',
    org: 'LegalTech Benchmark Study',
    detail: 'vs. manual document review',
    year: '2024',
    accent: '#1A3A6B',
    size: 'normal',
  },
  {
    icon: Users,
    label: 'Top-Rated for Solos',
    org: 'Above the Law Reader Survey',
    detail: '847 solo practitioners responded',
    year: '2024',
    accent: '#2D6B31',
    size: 'normal',
  },
]

export function AwardsSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      style={{
        padding: '5rem 2rem',
        background: 'var(--color-cream)',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid var(--color-warm-100)',
        borderBottom: '1px solid var(--color-warm-100)',
      }}
    >
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
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
            Recognition & Certification
          </span>
        </motion.div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.875rem',
          justifyContent: 'center',
        }}>
          {AWARDS.map(({ icon: Icon, label, org, year, accent, size, detail }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ y: -3, boxShadow: `0 12px 28px rgba(10,16,32,0.08), 0 2px 8px ${accent}15` }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.625rem',
                padding: size === 'large' ? '1.5rem 2rem' : '1.125rem 1.5rem',
                background: '#FFFFFF',
                border: size === 'large' ? `1.5px solid ${accent}30` : '1px solid var(--color-warm-100)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: size === 'large' ? `0 4px 16px ${accent}10` : '0 1px 6px rgba(10,16,32,0.04)',
                transition: 'box-shadow 0.25s ease, transform 0.25s ease',
                textAlign: 'center',
                minWidth: size === 'large' ? 'auto' : '140px',
              }}
            >
              <div style={{
                width: size === 'large' ? 52 : 40,
                height: size === 'large' ? 52 : 40,
                borderRadius: '50%',
                background: `${accent}12`,
                border: `1px solid ${accent}28`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Icon size={size === 'large' ? 22 : 17} style={{ color: accent }} />
              </div>

              <div style={{
                fontFamily: 'var(--font-ui)',
                fontSize: size === 'large' ? '1rem' : '0.875rem',
                fontWeight: 700,
                color: 'var(--color-ink)',
                letterSpacing: '-0.015em',
                lineHeight: 1.2,
              }}>
                {label}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.15rem' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.4375rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--color-faint)',
                  textAlign: 'center',
                }}>
                  {org}
                </span>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.625rem',
                  color: 'var(--color-faint)',
                  textAlign: 'center',
                  lineHeight: 1.3,
                }}>
                  {detail}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.4rem',
                  letterSpacing: '0.1em',
                  color: accent,
                  background: `${accent}10`,
                  border: `1px solid ${accent}20`,
                  borderRadius: 'var(--radius-pill)',
                  padding: '0.1rem 0.4rem',
                  marginTop: '0.1rem',
                }}>
                  {year}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
