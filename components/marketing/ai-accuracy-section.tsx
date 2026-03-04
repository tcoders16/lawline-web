'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Shield, Link, AlertCircle, Eye, ThumbsUp, BookOpen } from 'lucide-react'

const PILLARS = [
  {
    icon: Link,
    title: 'Every Claim Is Source-Cited',
    detail: 'Every event, date, and dollar figure in a Lawline output links directly to the page number and document it came from. No assertion without a citation. Period.',
    metric: '100%',
    metricLabel: 'of outputs source-cited',
    accent: '#1A3A6B',
    example: '"Treatment gap identified between 03/22/2021 (PT visit, p.4) and 05/03/2021 (next PT record, p.17) — 42-day lapse."',
  },
  {
    icon: AlertCircle,
    title: 'Hallucination Prevention Architecture',
    detail: 'Lawline only synthesizes from documents you upload. It cannot invent facts, dates, or people. If the record doesn\'t say it, Lawline doesn\'t say it — even if asked.',
    metric: '0',
    metricLabel: 'invented facts in outputs',
    accent: '#B8963E',
    example: '"Lawline found no records for treatment after 11/15/2021. If additional treatment occurred, upload those records to include them."',
  },
  {
    icon: Eye,
    title: 'Confidence Scoring on Every Entry',
    detail: 'Each timeline entry carries a confidence score (High / Medium / Review). Lower-confidence entries are flagged for attorney review before submission.',
    metric: '97%',
    metricLabel: 'accuracy on high-confidence entries',
    accent: '#2D6B31',
    example: '"[REVIEW] Plaintiff date of birth inferred from deposition p.14. Confirm against intake form before including in demand."',
  },
  {
    icon: Shield,
    title: 'No AI "Creativity" in Legal Output',
    detail: 'Lawline applies AI to extract and organize — not to invent arguments or fabricate records. Your professional judgment drives strategy. Lawline drives the document work.',
    metric: '∅',
    metricLabel: 'legal opinions by AI',
    accent: '#C45C30',
    example: '"Lawline has identified 3 possible IME contradictions. Attorney review required before characterizing them in the demand letter."',
  },
  {
    icon: ThumbsUp,
    title: 'Validated by Active Litigators',
    detail: 'Every Lawline output type was designed with practicing PI and employment attorneys. We iterate accuracy based on real case feedback — not academic benchmarks.',
    metric: '400+',
    metricLabel: 'attorneys in validation panel',
    accent: '#1A3A6B',
    example: 'Validation process: 200-page PI record → Lawline output → attorney comparison → accuracy score → iterate.',
  },
  {
    icon: BookOpen,
    title: 'Audit Trail Included',
    detail: 'Every Lawline session logs which documents were uploaded, what was processed, and what was output. Full audit trail for privilege logs, client files, and firm records.',
    metric: '100%',
    metricLabel: 'session audit coverage',
    accent: '#2D6B31',
    example: '"Session 2024-03-14 · 3 documents uploaded · 847 pages processed · Timeline exported 14:32 PST · Exported by J. Martinez"',
  },
] as const

export function AiAccuracySection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

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
            Accuracy & Trust
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
            "What if the AI gets it wrong?" —
            <br />
            <em style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #D4AE58 0%, #B8963E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              every attorney's first question
            </em>
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--color-muted)',
            maxWidth: '42rem',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            It's the right question. Here's exactly how Lawline handles accuracy — with architecturally enforced honesty, not marketing promises.
          </p>
        </motion.div>

        {/* Pillars grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.25rem',
        }}>
          {PILLARS.map(({ icon: Icon, title, detail, metric, metricLabel, accent, example }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                background: '#FFFFFF',
                border: '1px solid var(--color-warm-100)',
                borderRadius: 'var(--radius-xl)',
                padding: '1.75rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Top accent line */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: `linear-gradient(to right, ${accent}, ${accent}40)`,
                borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
              }} />

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem', marginTop: '0.5rem' }}>
                <div style={{
                  width: 40, height: 40,
                  borderRadius: 'var(--radius-md)',
                  background: `${accent}10`,
                  border: `1px solid ${accent}22`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon size={18} style={{ color: accent }} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 400, color: accent, letterSpacing: '-0.02em', lineHeight: 1 }}>
                    {metric}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4375rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-faint)' }}>
                    {metricLabel}
                  </div>
                </div>
              </div>

              <h3 style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.9375rem',
                fontWeight: 700,
                color: 'var(--color-ink)',
                letterSpacing: '-0.015em',
                lineHeight: 1.3,
                marginBottom: '0.75rem',
              }}>
                {title}
              </h3>

              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                color: 'var(--color-muted)',
                lineHeight: 1.65,
                marginBottom: '1rem',
              }}>
                {detail}
              </p>

              {/* Example output */}
              <div style={{
                background: `${accent}04`,
                border: `1px solid ${accent}15`,
                borderLeft: `3px solid ${accent}60`,
                borderRadius: '0 var(--radius-md) var(--radius-md) 0',
                padding: '0.75rem',
              }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.375rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: accent,
                  marginBottom: '0.35rem',
                }}>
                  Example output
                </div>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5625rem',
                  color: 'var(--color-muted)',
                  lineHeight: 1.6,
                  margin: 0,
                  fontStyle: 'italic',
                }}>
                  {example}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom assurance bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          style={{
            marginTop: '3rem',
            padding: '1.5rem 2rem',
            background: 'var(--color-cream)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-warm-100)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
          }}
        >
          <Shield size={24} style={{ color: '#1A3A6B', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-ink)', letterSpacing: '-0.01em', marginBottom: '0.25rem' }}>
              Lawline is a tool for attorneys. Not a substitute for legal judgment.
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--color-muted)', lineHeight: 1.5 }}>
              Every output is designed to be reviewed and signed off by a licensed attorney. Lawline handles the document labor. You handle the law.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
