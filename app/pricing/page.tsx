'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ArrowRight, Clock, FileText, MessageSquare, Mic, Mail, ChevronDown } from 'lucide-react'
import { PricingCard } from '@/components/pricing/pricing-card'
import { usePrices } from '@/hooks/use-prices'
import type { PricingPlan } from '@/types/billing'

/* ── Core Agents ──────────────────────────────────────── */
const CORE_AGENTS = [
  {
    icon:    FileText,
    number:  '01',
    name:    'Case Chronologist',
    tagline: 'Your 800-page case file → ordered truth in 42 seconds',
    reads:   ['Medical records', 'Depositions', 'Police reports', 'Expert opinions', 'Insurance exhibits'],
    outputs: ['Source-linked timeline', 'Bates-cited chronology', 'Treatment gap flags', 'Word / Excel / PDF'],
    before:  '4–8 hrs paralegal',
    after:   '42 seconds',
    accent:  '#B8963E',
  },
  {
    icon:    MessageSquare,
    number:  '02',
    name:    'Demand Letter Generator',
    tagline: 'From timeline to sent-ready demand — under 60 seconds',
    reads:   ['Case timeline (from Agent 01)', 'Billing invoices', 'Client intake form', 'Treatment summary'],
    outputs: ['Full demand letter draft', 'Damages calculation breakdown', 'Event citations by page', 'Firm-voice formatting'],
    before:  '2–3 hrs drafting',
    after:   '< 60 seconds',
    accent:  '#1A3A6B',
  },
  {
    icon:    Mic,
    number:  '03',
    name:    'Deposition Prep Kit',
    tagline: 'Cross-exam outline with page/line citations in 55 seconds',
    reads:   ['Opposing deposition transcript', 'Prior statements', 'Expert reports', 'Case file context'],
    outputs: ['Cross-exam outline', 'Inconsistency flags with quotes', 'Witness gap analysis', 'Page/line citations'],
    before:  '10–20 hrs prep',
    after:   '55 seconds',
    accent:  '#4A5578',
  },
]

/* ── Plans ────────────────────────────────────────────── */
const PLANS: PricingPlan[] = [
  {
    id:          'macos',
    name:        'macOS App',
    tagline:     'All three agents on your Mac. Air-gapped, offline-first — your data never leaves your machine.',
    price:       99,
    priceKey:    'macos',
    billingMode: 'subscription',
    trialDays:   14,
    featured:    true,
    badge:       'macOS · Local AI',
    features: [
      '✦ All 3 AI agents — local',
      'Air-gapped · zero cloud exposure',
      'Unlimited cases & documents',
      'Apple Silicon optimized',
      'Runs on 16 GB RAM MacBook',
      '14-day free trial included',
    ],
    cta: 'Start 14-Day Free Trial',
  },
  {
    id:          'enterprise',
    name:        'Enterprise Server',
    tagline:     'Dedicated on-prem server for firms, agencies, and sensitive matter departments.',
    price:       null,
    priceKey:    null,
    billingMode: 'payment',
    trialDays:   null,
    featured:    false,
    features: [
      '✦ Everything in macOS App',
      'Dedicated server hardware',
      '32 GB+ RAM · 2 TB+ NVMe',
      'Unlimited concurrent users',
      'Custom model fine-tuning',
      'White-label deployment',
    ],
    cta: 'Contact Sales',
  },
]

const FAQS = [
  {
    q: 'What document types does Lawline support?',
    a: 'PDFs, Word (.docx), plain text, and email exports (.eml, .msg). Scanned PDFs work via OCR. Bates-stamped documents are handled natively.',
  },
  {
    q: 'Is my client data secure?',
    a: 'The macOS App is fully air-gapped — your data never leaves your Mac. No cloud servers, no telemetry, no uploads of any kind.',
  },
  {
    q: 'Can I cancel my subscription at any time?',
    a: 'Yes. Cancel anytime from your Stripe billing portal. Access continues until the end of the billing period. No cancellation fees ever.',
  },
  {
    q: 'What are the macOS system requirements?',
    a: 'macOS 13 Ventura or later. Minimum 16 GB RAM. Apple Silicon (M1/M2/M3/M4) runs fastest — Intel Macs are fully supported.',
  },
  {
    q: 'Do you offer discounts for public defenders or legal aid?',
    a: 'Yes. Email hello@lawline.ai with proof of your organization and we will arrange a discounted rate.',
  },
]

export default function PricingPage() {
  const { data: prices, loading } = usePrices()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const macPlan    = PLANS[0]
  const entPlan    = PLANS[1]
  const macPriceId = prices?.macos || undefined
  const macTrial   = prices?.trialDays.macos ?? macPlan.trialDays ?? undefined

  return (
    <>
      {/* ── Hero ──────────────────────────────────── */}
      <section
        style={{
          padding:    '8rem 2rem 4rem',
          textAlign:  'center',
          background: `radial-gradient(ellipse 70% 50% at 50% -5%, rgba(184,150,62,0.06) 0%, transparent 60%), var(--color-parchment)`,
        }}
      >
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="text-label" style={{ color: 'var(--color-terracotta)', display: 'block', marginBottom: '1.25rem' }}>
            Pricing
          </span>
          <h1
            style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight:    300,
              letterSpacing: '-0.03em',
              color:         'var(--color-ink)',
              lineHeight:    1.05,
              marginBottom:  '1.25rem',
            }}
          >
            Three agents.
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--color-terracotta)' }}>one price.</em>
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.0625rem', color: 'var(--color-muted)', maxWidth: '34rem', margin: '0 auto', lineHeight: 1.7 }}>
            $99/month. All three AI agents. Fully local. Start with a 14-day free trial — no credit card required.
          </p>
        </motion.div>
      </section>

      {/* ── Core Agents ───────────────────────────── */}
      <section style={{ padding: '4rem 2rem 5rem', background: 'var(--color-cream)', borderTop: '1px solid var(--color-warm-100)', borderBottom: '1px solid var(--color-warm-100)' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="text-label" style={{ color: 'var(--color-terracotta)', display: 'block', marginBottom: '0.75rem' }}>
              What you&apos;re getting
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 300, letterSpacing: '-0.03em', color: 'var(--color-ink)', marginBottom: '0.75rem' }}>
              The three hardest jobs in litigation prep.<br />
              <em style={{ fontStyle: 'italic', color: 'var(--color-terracotta)' }}>Now done in seconds.</em>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {CORE_AGENTS.map((agent, i) => {
              const Icon = agent.icon
              const rgb  = agent.accent === '#B8963E' ? '184,150,62' : agent.accent === '#1A3A6B' ? '26,58,107' : '74,85,120'
              return (
                <motion.div
                  key={agent.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{ background: '#FFFFFF', border: '1px solid var(--color-warm-100)', borderRadius: 'var(--radius-xl)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: `rgba(${rgb},0.1)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={18} style={{ color: agent.accent }} />
                      </div>
                      <div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-faint)', marginBottom: '0.2rem' }}>Agent {agent.number}</div>
                        <div style={{ fontFamily: 'var(--font-ui)', fontSize: '1rem', fontWeight: 600, color: 'var(--color-ink)', letterSpacing: '-0.02em' }}>{agent.name}</div>
                      </div>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'white', background: agent.accent, padding: '0.25rem 0.5rem', borderRadius: '999px', flexShrink: 0 }}>
                      Included
                    </span>
                  </div>

                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.875rem', color: 'var(--color-muted)', lineHeight: 1.6, margin: 0 }}>{agent.tagline}</p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-faint)', marginBottom: '0.5rem' }}>Reads</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                        {agent.reads.map(r => (
                          <div key={r} style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', color: 'var(--color-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--color-warm-200)', flexShrink: 0 }} />{r}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-faint)', marginBottom: '0.5rem' }}>Outputs</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                        {agent.outputs.map(o => (
                          <div key={o} style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', color: 'var(--color-ink)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <Check size={10} style={{ color: agent.accent, flexShrink: 0 }} />{o}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1rem', background: `rgba(${rgb},0.05)`, borderRadius: 'var(--radius-md)', border: `1px solid rgba(${rgb},0.12)` }}>
                    <Clock size={13} style={{ color: agent.accent, flexShrink: 0 }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--color-faint)', textDecoration: 'line-through' }}>{agent.before}</span>
                      <ArrowRight size={10} style={{ color: 'var(--color-faint)' }} />
                      <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 700, color: agent.accent }}>{agent.after}</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────── */}
      <section style={{ padding: '3.5rem 2rem 0', background: 'var(--color-parchment)' }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span className="text-label" style={{ color: 'var(--color-terracotta)', display: 'block', marginBottom: '0.5rem' }}>
              Get started in 60 seconds
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 300, letterSpacing: '-0.03em', color: 'var(--color-ink)' }}>
              From payment to working in minutes.
            </h2>
          </div>

          {/* Flow steps */}
          <div style={{ display: 'flex', alignItems: 'stretch', gap: 0, background: 'var(--color-cream)', border: '1px solid var(--color-warm-100)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
            {[
              { num: '01', icon: '💳', label: 'Start trial', sub: 'Stripe checkout', time: '~2 min' },
              { num: '02', icon: '🔑', label: 'Get credentials', sub: 'Shown on screen once', time: 'instant' },
              { num: '03', icon: '⬇️', label: 'Download app', sub: 'macOS DMG · 120 MB', time: '~1 min' },
              { num: '04', icon: '⚡', label: 'Start working', sub: 'Sign in and go', time: 'instant' },
            ].map((step, i, arr) => (
              <div key={step.num} style={{ display: 'flex', flex: 1 }}>
                <div style={{ flex: 1, padding: '1.25rem 1rem', textAlign: 'center', borderRight: i < arr.length - 1 ? '1px solid var(--color-warm-100)' : 'none' }}>
                  <div style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{step.icon}</div>
                  <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-ink)', marginBottom: '0.2rem' }}>
                    {step.label}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--color-faint)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.375rem' }}>
                    {step.sub}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--color-terracotta)', letterSpacing: '0.06em', fontWeight: 600 }}>
                    {step.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Plans ─────────────────────────────────── */}
      <section style={{ padding: '4rem 2rem 6rem', background: 'var(--color-parchment)' }}>
        <div style={{ maxWidth: '62rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 300, letterSpacing: '-0.03em', color: 'var(--color-ink)' }}>
              Choose your plan
            </h2>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-faint)', fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.08em' }}>
              LOADING…
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'stretch' }}>

              {/* macOS App — Stripe Checkout */}
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ display: 'flex', flexDirection: 'column' }}>
                <PricingCard
                  plan={macPlan}
                  priceId={macPriceId}
                  trialDays={macTrial}
                  onCheckout={() => {}}
                />
              </motion.div>

              {/* Enterprise Server — custom dark card */}
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ background: '#070C1A', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--radius-lg)', padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <span className="text-label" style={{ color: 'rgba(184,150,62,0.7)', display: 'block', marginBottom: '0.5rem' }}>Enterprise Server</span>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.875rem', color: 'rgba(255,255,255,0.55)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                    {entPlan.tagline}
                  </p>

                  <div style={{ marginBottom: '0.5rem' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 300, letterSpacing: '-0.04em', color: '#fff' }}>Custom</span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'rgba(184,150,62,0.7)', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: '1.75rem' }}>
                    Typically $2,000 – $8,000 / month
                  </span>

                  <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: '1.75rem' }} />

                  {/* Server specs */}
                  <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.75rem' }}>
                      Minimum Server Spec
                    </div>
                    {[
                      { label: 'RAM',     value: '32 GB+ ECC' },
                      { label: 'Storage', value: '2 TB+ NVMe SSD' },
                      { label: 'CPU',     value: '16-core server-class' },
                      { label: 'GPU',     value: 'Optional — accelerates LLM' },
                      { label: 'OS',      value: 'macOS / Ubuntu 22 LTS' },
                    ].map(({ label, value }) => (
                      <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'rgba(255,255,255,0.4)' }}>{label}</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>{value}</span>
                      </div>
                    ))}
                  </div>

                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
                    {entPlan.features.map(f => (
                      <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
                        <Check size={14} style={{ color: 'var(--color-terracotta)', flexShrink: 0, marginTop: '0.15rem' }} />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.45 }}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="mailto:enterprise@lawline.tech?subject=Enterprise%20Server%20Inquiry"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem', padding: '0.875rem', borderRadius: 'var(--radius-md)', background: 'var(--color-terracotta)', color: '#fff', fontFamily: 'var(--font-ui)', fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none', transition: 'opacity 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
                  >
                    <Mail size={14} />
                    Contact Enterprise Sales
                  </a>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.06em', textTransform: 'uppercase', textAlign: 'center', marginTop: '0.875rem' }}>
                    Response within 24 hours · NDA available
                  </p>
                </div>
              </motion.div>

            </div>
          )}

          {/* Trust line */}
          <p style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--color-faint)', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: '2rem' }}>
            Powered by Stripe · 256-bit TLS · Cancel anytime · macOS 13+
          </p>
        </div>
      </section>

      {/* ── Stats strip ───────────────────────────── */}
      <section style={{ padding: '3rem 2rem', background: 'var(--color-cream)', borderTop: '1px solid var(--color-warm-100)', borderBottom: '1px solid var(--color-warm-100)' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '2rem', textAlign: 'center' }}>
          {[
            { value: '12,000+', label: 'Case files analyzed' },
            { value: '94%',     label: 'Time saved on prep' },
            { value: '42s',     label: 'Avg. timeline generation' },
            { value: 'SOC 2',   label: 'Compliant' },
          ].map(({ value, label }) => (
            <div key={label}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 300, letterSpacing: '-0.03em', color: 'var(--color-ink)' }}>{value}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-faint)', marginTop: '0.25rem' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────── */}
      <section style={{ padding: '6rem 2rem', background: 'var(--color-cream)', borderTop: '1px solid var(--color-warm-100)' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="text-label" style={{ color: 'var(--color-terracotta)', display: 'block', marginBottom: '0.75rem' }}>FAQ</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 300, letterSpacing: '-0.03em', color: 'var(--color-ink)' }}>Common questions</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {FAQS.map(({ q, a }, i) => (
              <div key={i} style={{ borderBottom: '1px solid var(--color-warm-100)' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: '1.375rem 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.9375rem', fontWeight: 500, color: 'var(--color-ink)', letterSpacing: '-0.01em' }}>{q}</span>
                  <ChevronDown size={16} style={{ color: 'var(--color-faint)', flexShrink: 0, transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
                </button>
                {openFaq === i && (
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', lineHeight: 1.75, color: 'var(--color-muted)', padding: '0 0 1.5rem', margin: 0 }}>{a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
