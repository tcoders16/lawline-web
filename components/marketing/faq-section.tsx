'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Plus, Minus } from 'lucide-react'

const FAQS = [
  {
    q: 'Does Lawline send my client files to any cloud or third-party AI?',
    a: 'Never. Lawline runs entirely on your hardware — your Mac or Linux server. The AI models that read and reason over your documents are installed locally and operate without any network connection. No file, snippet, or metadata leaves your premises. This is why firms handling sealed matters, protective orders, and partner-level clients choose Lawline.',
    category: 'Security',
  },
  {
    q: 'How accurate is the AI timeline? Can I trust it before filing?',
    a: 'Lawline achieves 97% accuracy on dates and dollar amounts, validated by practicing litigators across PI, med-mal, and employment matters. More importantly, every fact in every output is cited to the exact source page number. You\'re not trusting the AI — you\'re trusting your own documents. Attorneys review and edit before anything goes to the client or opposing counsel.',
    category: 'Accuracy',
  },
  {
    q: 'How large a case file can Lawline handle?',
    a: 'Lawline routinely handles files up to 2GB — which covers most PI and med-mal cases with 800–1,200 pages of medical records, multiple deposition transcripts, expert reports, and discovery production. For Am Law 200 clients, we\'ve processed 12,000-page discovery reviews in a single session. If you have an unusually large matter, contact us for a scoping call.',
    category: 'Capabilities',
  },
  {
    q: 'What file types does Lawline accept?',
    a: 'Lawline ingests PDF, DOCX, DOC, TXT, RTF, EML, and MSG files — meaning you can drop in everything from scanned medical records and e-filed court documents to Outlook email exports and Word drafts. Mixed batches work fine. You don\'t need to pre-sort or rename anything.',
    category: 'Capabilities',
  },
  {
    q: 'How long does it take to process a typical PI case file?',
    a: 'A typical PI file — 800–900 pages of mixed medical records, one police report, and two deposition transcripts — is processed in 42 seconds on average. A 12,000-page discovery review typically completes in under 8 minutes. Processing time scales with document volume and your hardware specs.',
    category: 'Speed',
  },
  {
    q: 'What hardware does Lawline require?',
    a: 'For individual attorneys or small teams, Lawline runs on any Apple Silicon Mac (M1 Pro or better) with 16GB RAM and 4GB VRAM minimum. For firm-wide deployments, we recommend a Linux server with an NVIDIA GPU (RTX 3060 or better). We handle the installation and configuration — you just provide the hardware.',
    category: 'Technical',
  },
  {
    q: 'Can I edit the AI-generated timeline and demand letter?',
    a: 'Yes — every output is fully editable. The timeline opens as a structured, paginated document where you can add, remove, or modify entries inline. The demand letter opens as a Word-compatible document in your firm\'s template. One-click redaction is built in, with an audit log recording who redacted what and when.',
    category: 'Workflow',
  },
  {
    q: 'Does Lawline work for practice areas other than personal injury?',
    a: 'Lawline was originally built for PI and med-mal, but it handles employment discrimination, family law, real estate / landlord-tenant, contract disputes, securities litigation, and general commercial litigation. The AI agents for employment (EEOC Charge Analyzer), family law (Asset Dissipation Tracker), and contract disputes (Breach Finder) are in beta and rolling out to waitlist firms first.',
    category: 'Capabilities',
  },
  {
    q: 'What does the on-prem installation look like? Is IT involved?',
    a: 'We handle the full installation remotely or on-site — your IT team just needs to provide SSH or VPN access to the server. The install takes 2–4 hours. There are no ongoing cloud subscriptions, no data pipelines to manage, and no vendor access to your environment after setup. We provide documentation so your IT team understands every component.',
    category: 'Technical',
  },
  {
    q: 'Is Lawline SOC 2 compliant?',
    a: 'Lawline is SOC 2 Type II compliant. Because all processing is on-prem, the SOC 2 scope is tightly bounded — your files never touch our infrastructure. We provide audit-ready logging (per-user action logs with timestamps), redaction trails, and privilege log auto-generation to satisfy your own client obligations under protective orders and confidentiality agreements.',
    category: 'Security',
  },
  {
    q: 'Can paralegals use Lawline, or is it attorney-only?',
    a: 'Lawline is designed to be used primarily by paralegals and legal assistants for document processing and first-pass output generation, with attorneys doing a 15–30 minute review before any output leaves the firm. Role-based access (in beta) lets partners restrict which matters each staff member can access.',
    category: 'Workflow',
  },
  {
    q: 'What is your pricing model?',
    a: 'Solo practitioners start at $49/month (40 case files). Boutique firms use our Team plan at $149/month (200 case files, shared workspace). Full-firm deployments start at $399/month (unlimited case files, SSO/SAML, dedicated account manager). All plans include the full suite of 16 AI agent workflows. Early-access firms on the waitlist lock in current pricing permanently.',
    category: 'Pricing',
  },
] as const

const CATEGORIES = ['All', 'Security', 'Accuracy', 'Capabilities', 'Speed', 'Technical', 'Workflow', 'Pricing'] as const

export function FaqSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>('All')

  const filtered = activeCategory === 'All'
    ? FAQS
    : FAQS.filter(f => f.category === activeCategory)

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
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '5%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '300px',
        background: 'radial-gradient(ellipse at center, rgba(26,58,107,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '56rem', margin: '0 auto', position: 'relative' }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
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
            From Practitioners
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 300,
            letterSpacing: '-0.03em',
            color: 'var(--color-ink)',
            lineHeight: 1.08,
            marginBottom: '1rem',
          }}>
            Questions attorneys ask
            <br />
            <em style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #D4AE58 0%, #B8963E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              before they sign
            </em>
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--color-muted)',
            maxWidth: '36rem',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            Real questions from real litigators. If yours isn't here, email us — we respond to every attorney within 24 hours.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.375rem',
            justifyContent: 'center',
            marginBottom: '2.5rem',
          }}
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setOpenIdx(null) }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5625rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: activeCategory === cat ? '#FFFFFF' : 'var(--color-muted)',
                background: activeCategory === cat ? 'var(--color-ink)' : 'var(--color-parchment)',
                border: activeCategory === cat ? '1px solid var(--color-ink)' : '1px solid var(--color-warm-100)',
                borderRadius: 'var(--radius-pill)',
                padding: '0.375rem 0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* FAQ accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <AnimatePresence initial={false}>
            {filtered.map(({ q, a, category }, i) => {
              const isOpen = openIdx === i
              return (
                <motion.div
                  key={`${category}-${i}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2, delay: i * 0.03 }}
                >
                  <div
                    style={{
                      background: '#FFFFFF',
                      border: `1px solid ${isOpen ? 'rgba(184,150,62,0.3)' : 'var(--color-warm-100)'}`,
                      borderRadius: 'var(--radius-lg)',
                      overflow: 'hidden',
                      transition: 'border-color 0.2s ease',
                      boxShadow: isOpen ? '0 4px 20px rgba(10,16,32,0.06)' : '0 1px 4px rgba(10,16,32,0.04)',
                    }}
                  >
                    {/* Question row */}
                    <button
                      onClick={() => setOpenIdx(isOpen ? null : i)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem',
                        padding: '1.25rem 1.5rem',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem', flex: 1 }}>
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.4375rem',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: 'var(--color-terracotta)',
                          background: 'rgba(184,150,62,0.1)',
                          border: '1px solid rgba(184,150,62,0.2)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: 'var(--radius-pill)',
                          flexShrink: 0,
                          marginTop: '0.1rem',
                        }}>
                          {category}
                        </span>
                        <span style={{
                          fontFamily: 'var(--font-ui)',
                          fontSize: '0.9375rem',
                          fontWeight: 500,
                          color: 'var(--color-ink)',
                          letterSpacing: '-0.015em',
                          lineHeight: 1.4,
                        }}>
                          {q}
                        </span>
                      </div>

                      <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ flexShrink: 0 }}
                      >
                        {isOpen
                          ? <Minus size={16} style={{ color: 'var(--color-terracotta)' }} />
                          : <Plus size={16} style={{ color: 'var(--color-faint)' }} />
                        }
                      </motion.div>
                    </button>

                    {/* Answer */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div style={{
                            padding: '0 1.5rem 1.375rem 1.5rem',
                            paddingLeft: 'calc(1.5rem + 0.4375rem * 8 + 0.875rem)',
                          }}>
                            <div style={{
                              height: '1px',
                              background: 'var(--color-warm-100)',
                              marginBottom: '1rem',
                            }} />
                            <p style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: '0.9rem',
                              color: 'var(--color-muted)',
                              lineHeight: 1.75,
                              margin: 0,
                            }}>
                              {a}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            marginTop: '2.5rem',
            textAlign: 'center',
          }}
        >
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            color: 'var(--color-faint)',
          }}>
            Still have questions?{' '}
            <a
              href="mailto:hello@lawline.tech"
              style={{
                color: 'var(--color-terracotta)',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              Email us →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
