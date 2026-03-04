'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Check, BookOpen } from 'lucide-react'

const RECENT_ISSUES = [
  { issue: '#47', date: 'Mar 10', title: 'The 42-day treatment gap: how to address it before mediation' },
  { issue: '#46', date: 'Mar 3',  title: 'IME contradictions: 6 counter-arguments built from the record' },
  { issue: '#45', date: 'Feb 24', title: 'AI on protective order matters: what SDNY Model Order says' },
  { issue: '#44', date: 'Feb 17', title: 'EEOC charge workflow: building the protected-activity chain in 11 minutes' },
]

export function NewsletterSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const emailRef = useRef<HTMLInputElement>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    const email = emailRef.current?.value
    if (email?.includes('@')) {
      setSubmitted(true)
    }
  }

  return (
    <section
      ref={ref}
      style={{
        padding: '6rem 2rem',
        background: 'var(--color-cream)',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid var(--color-warm-100)',
      }}
    >
      {/* Decoration */}
      <div style={{
        position: 'absolute',
        top: '50%',
        right: '-5%',
        transform: 'translateY(-50%)',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(184,150,62,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '68rem', margin: '0 auto', position: 'relative' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '3rem',
          alignItems: 'center',
        }}>

          {/* Left — content */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: 32, height: 32,
                borderRadius: 'var(--radius-md)',
                background: 'rgba(184,150,62,0.1)',
                border: '1px solid rgba(184,150,62,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <BookOpen size={14} style={{ color: '#B8963E' }} />
              </div>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5625rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-terracotta)',
              }}>
                The Lawline Brief
              </span>
            </div>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              fontWeight: 300,
              letterSpacing: '-0.03em',
              color: 'var(--color-ink)',
              lineHeight: 1.1,
              marginBottom: '1rem',
            }}>
              One case scenario.
              <br />
              <em style={{
                fontStyle: 'italic',
                background: 'linear-gradient(135deg, #D4AE58 0%, #B8963E 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Every Monday morning.
              </em>
            </h2>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9375rem',
              color: 'var(--color-muted)',
              lineHeight: 1.7,
              marginBottom: '1.5rem',
            }}>
              47 issues in. Every one is a specific case document scenario — real record types, real legal issues, Lawline's exact output. No product announcements. No marketing.
            </p>

            {/* Recent issues */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {RECENT_ISSUES.map(({ issue, date, title }) => (
                <div key={issue} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.625rem 0.75rem', background: 'rgba(26,58,107,0.03)', border: '1px solid rgba(26,58,107,0.08)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '0.05rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#B8963E' }}>{issue}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.375rem', letterSpacing: '0.06em', color: 'var(--color-faint)' }}>{date}</span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--color-muted)', lineHeight: 1.45 }}>{title}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div style={{
              background: '#FFFFFF',
              border: '1px solid var(--color-warm-100)',
              borderRadius: 'var(--radius-xl)',
              padding: '2.25rem',
              boxShadow: '0 2px 16px rgba(10,16,32,0.05)',
            }}>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '1.5rem 0' }}
                >
                  <div style={{
                    width: 48, height: 48,
                    borderRadius: '50%',
                    background: 'rgba(45,107,49,0.1)',
                    border: '1px solid rgba(45,107,49,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem',
                  }}>
                    <Check size={20} style={{ color: '#2D6B31' }} />
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '1.0625rem',
                    fontWeight: 600,
                    color: 'var(--color-ink)',
                    marginBottom: '0.5rem',
                  }}>
                    You're in.
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: 'var(--color-muted)',
                    lineHeight: 1.6,
                  }}>
                    Issue #48 lands Monday, 7am EST. One case scenario, real Lawline output, no noise.
                  </p>
                </motion.div>
              ) : (
                <>
                  <div style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '1.0625rem',
                    fontWeight: 600,
                    color: 'var(--color-ink)',
                    letterSpacing: '-0.015em',
                    marginBottom: '0.375rem',
                  }}>
                    Get the Lawline Brief
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8125rem',
                    color: 'var(--color-muted)',
                    marginBottom: '1.5rem',
                    lineHeight: 1.5,
                  }}>
                    One email, every Monday. Case scenario + Lawline output. Attorneys only.
                  </div>

                  <div style={{ display: 'flex', gap: '0.625rem', marginBottom: '1rem' }}>
                    <input
                      ref={emailRef}
                      type="email"
                      placeholder="your@firm.com"
                      style={{
                        flex: 1,
                        padding: '0.75rem 1rem',
                        border: '1px solid var(--color-warm-100)',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--color-cream)',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.875rem',
                        color: 'var(--color-ink)',
                        outline: 'none',
                        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                      }}
                      onFocus={e => {
                        e.currentTarget.style.borderColor = 'var(--color-terracotta)'
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(184,150,62,0.12)'
                      }}
                      onBlur={e => {
                        e.currentTarget.style.borderColor = 'var(--color-warm-100)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                      onKeyDown={e => { if (e.key === 'Enter') handleSubmit() }}
                    />
                    <button
                      onClick={handleSubmit}
                      className="btn-primary"
                      style={{
                        gap: '0.375rem',
                        cursor: 'pointer',
                        border: 'none',
                        padding: '0.75rem 1rem',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Subscribe <ArrowRight size={13} />
                    </button>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {['No spam', 'Unsubscribe anytime', '2,400+ subscribers'].map(t => (
                      <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Check size={10} style={{ color: '#2D6B31' }} />
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.475rem',
                          letterSpacing: '0.07em',
                          textTransform: 'uppercase',
                          color: 'var(--color-faint)',
                        }}>
                          {t}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
