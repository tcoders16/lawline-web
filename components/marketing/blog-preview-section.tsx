'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'

const POSTS = [
  {
    slug:      'how-lawline-handles-protective-orders',
    tag:       'Security & Ethics',
    tagColor:  '#1A3A6B',
    featured:  true,
    title:     'Using AI on matters under protective orders: what your bar association actually says',
    excerpt:   'ABA Formal Opinion 477R and most state bar guidance treat cloud AI the same as cloud storage — triggering data-sharing restrictions under standard SDNY and CDCA protective orders. On-premises deployment is the only architecture that doesn\'t. We walked through 6 state bar opinions.',
    author:    'Michael Heller, J.D.',
    authorRole: 'Former BigLaw lit associate',
    readTime:  '8 min',
    date:      'Mar 11, 2025',
  },
  {
    slug:      '8-medical-record-patterns-that-change-demands',
    tag:       'PI Strategy',
    tagColor:  '#B8963E',
    featured:  false,
    title:     'The 8 medical record patterns that change your demand — and how AI surfaces them in seconds',
    excerpt:   'Treatment gaps (>30 days) average $38K less in settlements when unaddressed. IME contradictions with treating physicians increase plaintiff verdicts by 23%. Billing code mismatches flag pre-existing conditions defendants use at trial. Here\'s how Lawline catches all 8 automatically.',
    author:    'Priya Nair',
    authorRole: 'Paralegal, 7-year PI practice',
    readTime:  '6 min',
    date:      'Feb 24, 2025',
  },
  {
    slug:      'deposition-inconsistencies-chatgpt-misses',
    tag:       'AI Accuracy',
    tagColor:  '#2D6B31',
    featured:  false,
    title:     'We tested ChatGPT and Lawline on the same 400-page deposition. The accuracy gap was 33 points.',
    excerpt:   'ChatGPT identified 61% of material inconsistencies across a 400-page PI deposition. Lawline identified 94%. The 33-point gap was largest on: prior accident history (ChatGPT missed 4 of 6), date contradictions (missed 3 of 5), and employment gap disclosures. Full methodology inside.',
    author:    'James Okonkwo',
    authorRole: 'Senior associate, mass tort lit',
    readTime:  '11 min',
    date:      'Feb 8, 2025',
  },
]

export function BlogPreviewSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      style={{
        padding: '7rem 2rem',
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
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '3rem',
          }}
        >
          <div>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-terracotta)',
              display: 'block',
              marginBottom: '0.75rem',
            }}>
              The Lawline Brief
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 300,
              letterSpacing: '-0.03em',
              color: 'var(--color-ink)',
              lineHeight: 1.08,
            }}>
              Written by litigators
              <br />
              <em style={{
                fontStyle: 'italic',
                background: 'linear-gradient(135deg, #D4AE58 0%, #B8963E 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                for litigators
              </em>
            </h2>
          </div>

          <Link
            href="/insights"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              fontFamily: 'var(--font-ui)',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'var(--color-terracotta)',
              textDecoration: 'none',
              border: '1px solid rgba(184,150,62,0.3)',
              borderRadius: 'var(--radius-pill)',
              padding: '0.5rem 1rem',
            }}
          >
            All articles <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.25rem',
        }}>
          {POSTS.map(({ slug, tag, tagColor, title, excerpt, readTime, date, author, authorRole, featured }, i) => (
            <motion.div
              key={slug}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(10,16,32,0.09)' }}
              style={{
                background: '#FFFFFF',
                border: featured ? `1.5px solid ${tagColor}30` : '1px solid var(--color-warm-100)',
                borderRadius: 'var(--radius-xl)',
                padding: '1.875rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Featured badge */}
              {featured && (
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.375rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: tagColor,
                  background: `${tagColor}10`,
                  border: `1px solid ${tagColor}20`,
                  borderRadius: 'var(--radius-pill)',
                  padding: '0.2rem 0.5rem',
                }}>
                  Featured
                </div>
              )}

              {/* Accent line */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '40%',
                height: '2px',
                background: `linear-gradient(to right, ${tagColor}80, transparent)`,
              }} />

              {/* Tag + readtime */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.4375rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: tagColor,
                  background: `${tagColor}10`,
                  border: `1px solid ${tagColor}22`,
                  borderRadius: 'var(--radius-pill)',
                  padding: '0.175rem 0.5rem',
                }}>
                  {tag}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Clock size={9} style={{ color: 'var(--color-faint)' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4375rem', letterSpacing: '0.07em', color: 'var(--color-faint)', textTransform: 'uppercase' }}>
                    {readTime} read
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.0625rem',
                fontWeight: 400,
                letterSpacing: '-0.015em',
                color: 'var(--color-ink)',
                lineHeight: 1.35,
                flex: 1,
              }}>
                {title}
              </h3>

              {/* Excerpt */}
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                color: 'var(--color-muted)',
                lineHeight: 1.65,
                margin: 0,
              }}>
                {excerpt}
              </p>

              {/* Footer */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '1rem',
                borderTop: '1px solid var(--color-warm-100)',
              }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-ink)', letterSpacing: '-0.01em' }}>{author}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4rem', letterSpacing: '0.07em', color: 'var(--color-faint)', textTransform: 'uppercase', marginTop: '0.1rem' }}>{authorRole} · {date}</div>
                </div>
                <Link
                  href={`/insights/${slug}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    color: tagColor,
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Read <ArrowRight size={13} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
