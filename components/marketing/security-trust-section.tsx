'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Shield, Lock, Server, Eye, FileCheck, AlertTriangle,
  Check, Database, Globe,
} from 'lucide-react'

const PILLARS = [
  {
    icon: Server,
    title: 'Fully Air-Gapped',
    description: 'The AI runs on your hardware. Not AWS, not Azure, not Google Cloud — your server in your office or your data center. No vendor can subpoena what you never uploaded.',
    specs: ['Mac (M1 Pro+) or Linux server', 'No outbound connections required', 'Works 100% offline'],
    accent: '#B8963E',
  },
  {
    icon: Lock,
    title: 'Zero Data Egress',
    description: 'Every document you process stays inside your four walls. We have zero access to your client files, your outputs, or your processing history. Our servers never see your data.',
    specs: ['Client files never transmitted', 'No model training on your docs', 'No vendor access logs'],
    accent: '#1A3A6B',
  },
  {
    icon: Shield,
    title: 'SOC 2 Type II',
    description: 'Lawline is SOC 2 Type II certified. Because processing is on-prem, our audit scope is minimal — but your own obligations under protective orders and confidentiality agreements are fully met.',
    specs: ['Per-user audit timestamps', 'Redaction trails included', 'Privilege log auto-generated'],
    accent: '#2D6B31',
  },
  {
    icon: Eye,
    title: 'Privilege-Safe by Design',
    description: 'Every AI inference runs locally — no shared models, no fine-tuning on client files, no vendor access logs. Attorney-client privilege and work product doctrine protections are preserved.',
    specs: ['No shared inference layer', 'Privilege log export built in', 'Meets ABA Formal Opinion 477R'],
    accent: '#B8963E',
  },
  {
    icon: FileCheck,
    title: 'Protective Order Compliant',
    description: 'For matters under protective orders limiting data sharing with vendors, Lawline is the only AI platform that categorically satisfies the restriction — because we never receive the data.',
    specs: ['Sealed matter-safe', 'Court-order compliant by architecture', 'No vendor data processing agreement required'],
    accent: '#1A3A6B',
  },
  {
    icon: Database,
    title: 'No Subpoena Risk',
    description: 'Because your documents never touch our servers, a subpoena directed at Lawline returns nothing. We have nothing to produce. Your most sensitive client matters remain yours alone.',
    specs: ['Nothing to subpoena', 'No litigation hold exposure to vendor', 'No third-party cloud custodian'],
    accent: '#2D6B31',
  },
] as const

const CERTIFICATIONS = [
  { label: 'SOC 2 Type II',          sub: 'Certified' },
  { label: 'ABA 477R',               sub: 'Compliant' },
  { label: 'CCPA / GDPR',            sub: 'Architecture-native' },
  { label: 'HIPAA-Aligned',          sub: 'On-prem architecture' },
  { label: 'FedRAMP Ready',          sub: 'Gov. deployments' },
  { label: 'Protective Order–Safe',  sub: 'Court-verified' },
] as const

export function SecurityTrustSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

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
      {/* Dark background decoration */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '800px',
        height: '400px',
        background: 'radial-gradient(ellipse at center, rgba(184,150,62,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '-5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(26,58,107,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '76rem', margin: '0 auto', position: 'relative' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
        >
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#B8963E',
            display: 'block',
            marginBottom: '1.25rem',
          }}>
            Security & Compliance
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)',
            fontWeight: 300,
            letterSpacing: '-0.03em',
            color: 'var(--color-parchment)',
            lineHeight: 1.08,
            marginBottom: '1.25rem',
          }}>
            Built for sealed matters.
            <br />
            <em style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #D4AE58 0%, #B8963E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Not a marketing footnote.
            </em>
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'rgba(253,252,250,0.6)',
            maxWidth: '38rem',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            Every security property Lawline claims is structural — built into the architecture, not layered on after the fact.
          </p>
        </motion.div>

        {/* Pillar grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
          marginBottom: '4rem',
        }}>
          {PILLARS.map(({ icon: Icon, title, description, specs, accent }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -4, boxShadow: `0 20px 40px rgba(0,0,0,0.3), 0 4px 12px ${accent}18` }}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 'var(--radius-xl)',
                padding: '1.875rem',
                position: 'relative',
                overflow: 'hidden',
                transition: 'box-shadow 0.3s ease, transform 0.3s ease',
              }}
            >
              {/* Accent corner */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100px',
                height: '100px',
                background: `radial-gradient(ellipse at top right, ${accent}12 0%, transparent 70%)`,
                pointerEvents: 'none',
              }} />

              {/* Icon */}
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 'var(--radius-md)',
                background: `${accent}12`,
                border: `1px solid ${accent}25`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.375rem',
              }}>
                <Icon size={20} style={{ color: accent }} />
              </div>

              <h3 style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '1.0625rem',
                fontWeight: 600,
                letterSpacing: '-0.015em',
                color: 'var(--color-parchment)',
                marginBottom: '0.75rem',
                lineHeight: 1.2,
              }}>
                {title}
              </h3>

              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                lineHeight: 1.7,
                color: 'rgba(253,252,250,0.55)',
                marginBottom: '1.25rem',
              }}>
                {description}
              </p>

              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                {specs.map(s => (
                  <li key={s} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <Check size={11} style={{ color: accent, flexShrink: 0, marginTop: '0.2rem' }} />
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.5625rem',
                      letterSpacing: '0.06em',
                      color: 'rgba(253,252,250,0.45)',
                      textTransform: 'uppercase',
                    }}>
                      {s}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Certifications strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {CERTIFICATIONS.map(({ label, sub }, i) => (
            <div
              key={label}
              style={{
                flex: '1 1 150px',
                padding: '1.25rem 1.5rem',
                background: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.02)',
                borderRight: i < CERTIFICATIONS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                textAlign: 'center',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.375rem',
                marginBottom: '0.25rem',
              }}>
                <Globe size={11} style={{ color: '#B8963E', flexShrink: 0 }} />
                <span style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--color-parchment)',
                  letterSpacing: '-0.01em',
                }}>
                  {label}
                </span>
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.4375rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(253,252,250,0.35)',
              }}>
                {sub}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{
            marginTop: '3rem',
            textAlign: 'center',
          }}
        >
          <blockquote style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.125rem',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'rgba(253,252,250,0.6)',
            lineHeight: 1.6,
            maxWidth: '42rem',
            margin: '0 auto',
          }}>
            "Our clients are financial institutions under active regulatory scrutiny. On-prem wasn't a nice-to-have — it was a hard requirement. Lawline was the only AI tool that didn't send data to a cloud."
          </blockquote>
          <div style={{
            marginTop: '1rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5625rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(253,252,250,0.35)',
          }}>
            Marcus T. · Managing Partner, Securities Litigation · San Francisco, CA
          </div>
        </motion.div>
      </div>
    </section>
  )
}
