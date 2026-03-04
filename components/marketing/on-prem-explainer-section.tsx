'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Server, Globe, ArrowRight, X, Check, Wifi, WifiOff } from 'lucide-react'

const CLOUD_FLOW = [
  { label: 'Your file',       icon: '📄', color: '#B8963E', direction: '→' },
  { label: 'Internet',        icon: '🌐', color: '#C45C30', direction: '→' },
  { label: 'Cloud AI',        icon: '☁️', color: '#C45C30', direction: '→' },
  { label: 'Response',        icon: '📤', color: '#B8963E', direction: '' },
] as const

const ONPREM_FLOW = [
  { label: 'Your file',       icon: '📄', color: '#B8963E', direction: '→' },
  { label: 'Local AI',        icon: '🖥️', color: '#2D6B31', direction: '→' },
  { label: 'Output',          icon: '✅', color: '#2D6B31', direction: '' },
] as const

const RISK_ITEMS = [
  'Vendor can receive subpoena for your data',
  'Client files stored on third-party servers',
  'Model may train on your documents',
  'Data crossing jurisdictional lines',
  'Vendor data breach exposes client matters',
  'Terms of service changes without notice',
] as const

const SAFE_ITEMS = [
  'No data egress — ever',
  'Client files never leave your hardware',
  'Model runs locally, cannot train on your data',
  'No jurisdictional data transfer issues',
  'No vendor breach can expose your matters',
  'No third-party terms govern your documents',
] as const

export function OnPremExplainerSection() {
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
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>

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
            On-Prem vs Cloud
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
            Where does the AI
            <br />
            <em style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #D4AE58 0%, #B8963E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              actually process your files?
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
            Every cloud AI tool — including ChatGPT, Harvey, and Copilot — sends your documents to external servers. Lawline never does.
          </p>
        </motion.div>

        {/* Two-column flow comparison */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}>

          {/* Cloud AI flow */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              background: '#FFFFFF',
              border: '1.5px solid rgba(196,92,48,0.2)',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '1.25rem 1.5rem',
              background: 'rgba(196,92,48,0.05)',
              borderBottom: '1px solid rgba(196,92,48,0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.625rem',
            }}>
              <Wifi size={16} style={{ color: '#C45C30' }} />
              <div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.9375rem', fontWeight: 600, color: '#C45C30', letterSpacing: '-0.01em' }}>Cloud AI Tools</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4375rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(196,92,48,0.6)' }}>ChatGPT · Harvey · Copilot · generic AI</div>
              </div>
            </div>

            <div style={{ padding: '1.5rem' }}>
              {/* Flow diagram */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
              }}>
                {CLOUD_FLOW.map(({ label, icon, direction }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.2rem',
                    }}>
                      <span style={{ fontSize: '1.25rem' }}>{icon}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4rem', letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--color-faint)' }}>{label}</span>
                    </div>
                    {direction && <span style={{ color: '#C45C30', fontWeight: 700, fontSize: '1rem' }}>{direction}</span>}
                  </div>
                ))}
              </div>

              {/* Risk list */}
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {RISK_ITEMS.map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <X size={13} style={{ color: '#C45C30', flexShrink: 0, marginTop: '0.15rem' }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--color-muted)', lineHeight: 1.5 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Lawline on-prem flow */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              background: '#FFFFFF',
              border: '1.5px solid rgba(45,107,49,0.25)',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: '0 4px 16px rgba(45,107,49,0.06)',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '1.25rem 1.5rem',
              background: 'rgba(45,107,49,0.05)',
              borderBottom: '1px solid rgba(45,107,49,0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.625rem',
            }}>
              <WifiOff size={16} style={{ color: '#2D6B31' }} />
              <div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.9375rem', fontWeight: 600, color: '#2D6B31', letterSpacing: '-0.01em' }}>Lawline — On-Premises</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4375rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(45,107,49,0.6)' }}>Your hardware · Your walls · No internet required</div>
              </div>
            </div>

            <div style={{ padding: '1.5rem' }}>
              {/* Flow diagram */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
              }}>
                {ONPREM_FLOW.map(({ label, icon, direction }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.2rem',
                    }}>
                      <span style={{ fontSize: '1.25rem' }}>{icon}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4rem', letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--color-faint)' }}>{label}</span>
                    </div>
                    {direction && <span style={{ color: '#2D6B31', fontWeight: 700, fontSize: '1rem' }}>{direction}</span>}
                  </div>
                ))}
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.4rem',
                  letterSpacing: '0.08em',
                  color: '#2D6B31',
                  background: 'rgba(45,107,49,0.08)',
                  border: '1px solid rgba(45,107,49,0.2)',
                  borderRadius: 'var(--radius-pill)',
                  padding: '0.15rem 0.5rem',
                  textTransform: 'uppercase',
                }}>
                  No cloud
                </div>
              </div>

              {/* Safe list */}
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {SAFE_ITEMS.map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <Check size={13} style={{ color: '#2D6B31', flexShrink: 0, marginTop: '0.15rem' }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--color-muted)', lineHeight: 1.5 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Callout quote */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            padding: '2rem',
            background: 'var(--color-ink)',
            borderRadius: 'var(--radius-xl)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute',
            top: '-4rem',
            right: '-4rem',
            width: '12rem',
            height: '12rem',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(184,150,62,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5625rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(184,150,62,0.7)',
            marginBottom: '0.75rem',
          }}>
            The Lawline Guarantee
          </div>

          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--color-parchment)',
            lineHeight: 1.4,
            maxWidth: '46rem',
            margin: '0 auto 1.25rem',
          }}>
            "No cloud vendor can subpoena what you never uploaded."
          </p>

          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(253,252,250,0.35)',
          }}>
            Lawline Architecture · Zero data egress · Air-gapped by design
          </div>
        </motion.div>
      </div>
    </section>
  )
}
