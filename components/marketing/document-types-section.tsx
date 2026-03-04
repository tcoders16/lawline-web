'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FileText, Stethoscope, DollarSign, Scale, Mail, Camera, Mic, FileCheck } from 'lucide-react'

const CATEGORIES = [
  {
    icon: Stethoscope,
    label: 'Medical Records',
    color: '#1A3A6B',
    count: 12,
    types: [
      'Emergency room records',
      'Radiology reports (MRI, CT, X-ray)',
      'Operative reports',
      'Physical therapy notes',
      'Pharmacy records',
      'Hospital discharge summaries',
      'IME reports',
      'Expert medical opinions',
      'Ambulance / EMS reports',
      'Mental health treatment notes',
      'Toxicology reports',
      'Autopsy / coroner reports',
    ],
  },
  {
    icon: Scale,
    label: 'Legal Documents',
    color: '#B8963E',
    count: 10,
    types: [
      'Deposition transcripts',
      'Interrogatory responses',
      'Requests for production',
      'Court orders & rulings',
      'Pleadings (complaints, answers)',
      'Expert witness reports',
      'Demand letters',
      'Settlement agreements',
      'Arbitration awards',
      'Trial transcripts',
    ],
  },
  {
    icon: DollarSign,
    label: 'Financial Records',
    color: '#2D6B31',
    count: 8,
    types: [
      'Medical invoices & bills',
      'Insurance EOBs',
      'Pay stubs & W-2 forms',
      'Tax returns (individual & business)',
      'Bank statements',
      'Property appraisals',
      'Business financial statements',
      'Damages expert reports',
    ],
  },
  {
    icon: Mail,
    label: 'Correspondence',
    color: '#C45C30',
    count: 7,
    types: [
      'Email threads (bulk review)',
      'Text message exports',
      'Insurance adjuster letters',
      'Demand & counter-offer letters',
      'Witness statements',
      'Client intake notes',
      'Internal memoranda',
    ],
  },
  {
    icon: FileCheck,
    label: 'Contracts & Agreements',
    color: '#1A3A6B',
    count: 6,
    types: [
      'Commercial contracts (+ amendments)',
      'Lease agreements',
      'Employment contracts',
      'Non-compete / NDA agreements',
      'Purchase & sale agreements',
      'Settlement and release agreements',
    ],
  },
  {
    icon: Camera,
    label: 'Evidence & Reports',
    color: '#B8963E',
    count: 5,
    types: [
      'Police & accident reports',
      'OSHA investigation reports',
      'DMV driving records',
      'Black box / telematics data',
      'Surveillance footage transcripts',
    ],
  },
  {
    icon: Mic,
    label: 'Audio / Video Transcripts',
    color: '#2D6B31',
    count: 4,
    types: [
      'Recorded witness interviews',
      'Recorded insurance statements',
      '911 call transcripts',
      'Voicemail transcripts',
    ],
  },
  {
    icon: FileText,
    label: 'HR & Employment',
    color: '#C45C30',
    count: 5,
    types: [
      'Employee performance reviews',
      'Disciplinary records',
      'HR investigation reports',
      'EEOC charge documents',
      'Payroll & benefits records',
    ],
  },
] as const

export function DocumentTypesSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const totalTypes = CATEGORIES.reduce((sum, c) => sum + c.count, 0)

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
            Document Intelligence
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
            Lawline reads
            <em style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #D4AE58 0%, #B8963E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: '0 0.4rem',
            }}>
              {totalTypes}+ document types
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
            Upload any document that comes across your desk. Lawline understands legal, medical, financial, and evidentiary documents — in any format.
          </p>
        </motion.div>

        {/* Format strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '3rem',
          }}
        >
          {['PDF', 'DOCX', 'XLSX', 'TIFF', 'JPG', 'TXT', 'RTF', 'HTML', 'EML', 'MSG'].map(fmt => (
            <span key={fmt} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5rem',
              letterSpacing: '0.1em',
              color: 'var(--color-navy)',
              background: 'rgba(26,58,107,0.07)',
              border: '1px solid rgba(26,58,107,0.15)',
              borderRadius: 'var(--radius-pill)',
              padding: '0.25rem 0.75rem',
            }}>
              .{fmt}
            </span>
          ))}
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5rem',
            letterSpacing: '0.1em',
            color: '#B8963E',
            background: 'rgba(184,150,62,0.08)',
            border: '1px solid rgba(184,150,62,0.2)',
            borderRadius: 'var(--radius-pill)',
            padding: '0.25rem 0.75rem',
          }}>
            + more
          </span>
        </motion.div>

        {/* Categories grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
        }}>
          {CATEGORIES.map(({ icon: Icon, label, color, count, types }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
              style={{
                background: '#FFFFFF',
                border: '1px solid var(--color-warm-100)',
                borderRadius: 'var(--radius-xl)',
                padding: '1.5rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Count badge */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.4375rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color,
                background: `${color}10`,
                border: `1px solid ${color}22`,
                borderRadius: 'var(--radius-pill)',
                padding: '0.15rem 0.5rem',
              }}>
                {count} types
              </div>

              {/* Icon + label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{
                  width: 36, height: 36,
                  borderRadius: 'var(--radius-md)',
                  background: `${color}10`,
                  border: `1px solid ${color}22`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon size={17} style={{ color }} />
                </div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-ink)', letterSpacing: '-0.015em' }}>
                  {label}
                </div>
              </div>

              {/* Types list */}
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {types.map(type => (
                  <li key={type} style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    color: 'var(--color-muted)',
                    lineHeight: 1.5,
                    paddingLeft: '0.875rem',
                    position: 'relative',
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      top: '0.45rem',
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      background: `${color}60`,
                    }} />
                    {type}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.8 }}
          style={{
            textAlign: 'center',
            marginTop: '2.5rem',
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            color: 'var(--color-faint)',
          }}
        >
          Don't see your document type?{' '}
          <span style={{ color: 'var(--color-navy)', textDecoration: 'underline', cursor: 'pointer' }}>
            Contact us — we add new document types monthly.
          </span>
        </motion.div>
      </div>
    </section>
  )
}
