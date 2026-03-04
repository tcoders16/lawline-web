'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { useApp } from '@/components/providers/app-providers'

export function FounderCtaSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { openComingSoon } = useApp()

  return (
    <section
      ref={ref}
      style={{
        padding: '8rem 2rem',
        background: 'var(--color-ink)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorations */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '600px',
        background: 'radial-gradient(ellipse at center, rgba(184,150,62,0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Fine grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
        `,
        backgroundSize: '56px 56px',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '54rem', margin: '0 auto', textAlign: 'center', position: 'relative' }}>

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
        >
          {/* Label */}
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-terracotta)',
              display: 'block',
              marginBottom: '2.5rem',
            }}
          >
            A Note From the Founder
          </span>

          {/* Decorative quote mark */}
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '8rem',
              lineHeight: 0.6,
              background: 'linear-gradient(135deg, rgba(184,150,62,0.3), rgba(184,146,58,0.2))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '2rem',
              userSelect: 'none',
            }}
          >
            "
          </div>

          {/* Quote */}
          <blockquote
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              lineHeight: 1.4,
              letterSpacing: '-0.025em',
              color: 'var(--color-parchment)',
              margin: '0 0 2.5rem',
            }}
          >
            We built Lawline because we believe attorneys should spend their time on{' '}
            <em
              style={{
                fontStyle: 'normal',
                background: 'linear-gradient(135deg, #D9845A, #B8923A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              judgment
            </em>
            , not on organizing documents. The review should start on day one,
            not after a week of manual work.
          </blockquote>

          {/* Author */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.875rem 1.5rem',
              background: 'rgba(253,252,250,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 'var(--radius-xl)',
              marginBottom: '4rem',
            }}
          >
            {/* Avatar initials */}
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(184,150,62,0.3), rgba(184,146,58,0.2))',
                border: '1px solid rgba(184,150,62,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.9375rem',
                fontWeight: 400,
                color: 'var(--color-terracotta)',
              }}>
                OS
              </span>
            </div>
            <div style={{ textAlign: 'left' }}>
              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  color: 'var(--color-parchment)',
                  letterSpacing: '-0.01em',
                }}
              >
                Omkumar Solanki
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5625rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(253,252,250,0.35)',
                  marginTop: '0.2rem',
                }}
              >
                Founder & CEO · Lawline
              </div>
            </div>
            {/* Social links */}
            <div style={{ display: 'flex', gap: '0.5rem', marginLeft: 'auto' }}>
              <a
                href="https://omkumarsolanki.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Website"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(253,252,250,0.4)',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--color-parchment)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'rgba(253,252,250,0.4)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/omkumar-solanki-atluxuarywxtchbusinessmandeveloper2/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(253,252,250,0.4)',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--color-parchment)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'rgba(253,252,250,0.4)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              height: '1px',
              background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1) 50%, transparent)',
              marginBottom: '3rem',
            }}
          />

          {/* CTA */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => openComingSoon()}
              className="btn-dark shimmer-button"
              style={{
                fontSize: '0.9375rem',
                padding: '0.875rem 2rem',
                cursor: 'pointer',
                border: 'none',
                gap: '0.625rem',
              }}
            >
              Start Your Free Trial
              <ArrowRight size={16} />
            </button>
            <a
              href="/insights"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.9375rem',
                padding: '0.875rem 2rem',
                fontFamily: 'var(--font-ui)',
                fontWeight: 500,
                color: 'rgba(253,252,250,0.6)',
                textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 'var(--radius-pill)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--color-parchment)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'rgba(253,252,250,0.6)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
              }}
            >
              Read Case Studies
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
