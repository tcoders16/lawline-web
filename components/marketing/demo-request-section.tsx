'use client'

import { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Calendar, Clock, Video, Check, ArrowRight } from 'lucide-react'
import { useApp } from '@/components/providers/app-providers'

const DEMO_FEATURES = [
  { icon: Video,    text: 'Live walkthrough of your own case file type' },
  { icon: Clock,   text: '30 minutes — no sales pitch, just the product' },
  { icon: Calendar, text: 'Same-day slots available for attorneys' },
  { icon: Check,   text: 'Ask anything — security, accuracy, workflow' },
] as const

const TIME_SLOTS = ['9:00 AM', '10:30 AM', '1:00 PM', '2:30 PM', '4:00 PM'] as const

export function DemoRequestSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { openComingSoon } = useApp()
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [submitted,    setSubmitted]    = useState(false)
  const [name,         setName]         = useState('')
  const [email,        setEmail]        = useState('')
  const [firm,         setFirm]         = useState('')

  const handleBook = () => {
    if (name && email && selectedTime) {
      setSubmitted(true)
    }
  }

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
      {/* Background */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px',
        height: '400px',
        background: 'radial-gradient(ellipse at center, rgba(26,58,107,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '72rem', margin: '0 auto', position: 'relative' }}>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          alignItems: 'start',
        }}>

          {/* Left — value prop */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
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
              Book a Demo
            </span>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 300,
              letterSpacing: '-0.03em',
              color: 'var(--color-ink)',
              lineHeight: 1.08,
              marginBottom: '1.25rem',
            }}>
              See Lawline on
              <br />
              <em style={{
                fontStyle: 'italic',
                background: 'linear-gradient(135deg, #D4AE58 0%, #B8963E 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                your actual case files
              </em>
            </h2>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9375rem',
              color: 'var(--color-muted)',
              lineHeight: 1.7,
              marginBottom: '2rem',
            }}>
              Send us a sample file from your practice area — a medical record, a contract, a deposition transcript.
              We'll run it through Lawline live on the call so you see exactly what the output looks like for your work.
            </p>

            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {DEMO_FEATURES.map(({ icon: Icon, text }) => (
                <li key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                  <div style={{
                    width: 36, height: 36, flexShrink: 0,
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(184,150,62,0.1)',
                    border: '1px solid rgba(184,150,62,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={16} style={{ color: '#B8963E' }} />
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9375rem',
                    color: 'var(--color-ink)',
                    lineHeight: 1.4,
                  }}>
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right — booking form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div style={{
              background: '#FFFFFF',
              border: '1px solid var(--color-warm-100)',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(10,16,32,0.07)',
            }}>
              {/* Dark header */}
              <div style={{
                background: 'var(--color-ink)',
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.875rem',
              }}>
                <div style={{
                  width: 40, height: 40,
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(184,150,62,0.15)',
                  border: '1px solid rgba(184,150,62,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Calendar size={18} style={{ color: '#B8963E' }} />
                </div>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'var(--color-parchment)',
                    letterSpacing: '-0.015em',
                  }}>
                    Schedule a 30-min demo
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.475rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(253,252,250,0.4)',
                    marginTop: '0.1rem',
                  }}>
                    No sales pressure · Attorneys only
                  </div>
                </div>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    padding: '2.5rem',
                    textAlign: 'center',
                  }}
                >
                  <div style={{
                    width: 52, height: 52,
                    borderRadius: '50%',
                    background: 'rgba(45,107,49,0.1)',
                    border: '1px solid rgba(45,107,49,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem',
                  }}>
                    <Check size={22} style={{ color: '#2D6B31' }} />
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.375rem',
                    fontWeight: 300,
                    letterSpacing: '-0.02em',
                    color: 'var(--color-ink)',
                    marginBottom: '0.625rem',
                  }}>
                    Demo booked for {selectedTime}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: 'var(--color-muted)',
                    lineHeight: 1.6,
                  }}>
                    You'll receive a calendar invite at <strong>{email}</strong> shortly.
                    Bring a sample file from your practice area — we'll run it live.
                  </p>
                </motion.div>
              ) : (
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                  {/* Name field */}
                  {[
                    { label: 'Your name',         val: name,  setter: setName,  type: 'text',  placeholder: 'Jane Smith' },
                    { label: 'Work email',         val: email, setter: setEmail, type: 'email', placeholder: 'jane@firm.com' },
                    { label: 'Firm name (optional)', val: firm,  setter: setFirm,  type: 'text',  placeholder: 'Smith & Associates' },
                  ].map(({ label, val, setter, type, placeholder }) => (
                    <div key={label}>
                      <label style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.8125rem',
                        fontWeight: 500,
                        color: 'var(--color-ink)',
                        display: 'block',
                        marginBottom: '0.375rem',
                      }}>
                        {label}
                      </label>
                      <input
                        type={type}
                        value={val}
                        onChange={e => setter(e.target.value)}
                        placeholder={placeholder}
                        style={{
                          width: '100%',
                          padding: '0.625rem 0.875rem',
                          border: '1px solid var(--color-warm-100)',
                          borderRadius: 'var(--radius-md)',
                          background: 'var(--color-cream)',
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.875rem',
                          color: 'var(--color-ink)',
                          outline: 'none',
                          boxSizing: 'border-box',
                          transition: 'border-color 0.2s ease',
                        }}
                        onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-terracotta)' }}
                        onBlur={e => { e.currentTarget.style.borderColor = 'var(--color-warm-100)' }}
                      />
                    </div>
                  ))}

                  {/* Time slots */}
                  <div>
                    <label style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.8125rem',
                      fontWeight: 500,
                      color: 'var(--color-ink)',
                      display: 'block',
                      marginBottom: '0.5rem',
                    }}>
                      Preferred time (today, ET)
                    </label>
                    <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                      {TIME_SLOTS.map(t => (
                        <button
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.5625rem',
                            letterSpacing: '0.07em',
                            color: selectedTime === t ? '#FFFFFF' : 'var(--color-muted)',
                            background: selectedTime === t ? 'var(--color-ink)' : 'var(--color-cream)',
                            border: selectedTime === t ? '1px solid var(--color-ink)' : '1px solid var(--color-warm-100)',
                            borderRadius: 'var(--radius-pill)',
                            padding: '0.375rem 0.75rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleBook}
                    className="btn-primary shimmer-button"
                    style={{
                      justifyContent: 'center',
                      gap: '0.4rem',
                      cursor: 'pointer',
                      border: 'none',
                      fontSize: '0.9375rem',
                      padding: '0.875rem',
                    }}
                  >
                    Book my demo <ArrowRight size={15} />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
