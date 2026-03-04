'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, FileText, Clock, Shield, Cpu, ChevronDown } from 'lucide-react'
import { useApp } from '@/components/providers/app-providers'

const TRUST_SIGNALS = [
  { icon: FileText, text: '12,000+ case files' },
  { icon: Clock,    text: '42s avg. timeline' },
  { icon: Shield,   text: 'SOC 2 · On-prem' },
  { icon: Cpu,      text: 'On-device AI' },
] as const

const TYPEWRITER_WORDS = [
  'case documents',
  'deposition transcripts',
  'exhibits & filings',
  'discovery records',
]

export function HeroSection() {
  const { openComingSoon } = useApp()
  const [wordIndex, setWordIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Typewriter effect
  useEffect(() => {
    const full = TYPEWRITER_WORDS[wordIndex]
    const speed = isDeleting ? 40 : 70

    intervalRef.current = setTimeout(() => {
      if (!isDeleting) {
        const next = full.slice(0, displayed.length + 1)
        setDisplayed(next)
        if (next === full) {
          setTimeout(() => setIsDeleting(true), 1400)
        }
      } else {
        const next = full.slice(0, displayed.length - 1)
        setDisplayed(next)
        if (next === '') {
          setIsDeleting(false)
          setWordIndex(i => (i + 1) % TYPEWRITER_WORDS.length)
        }
      }
    }, speed)

    return () => { if (intervalRef.current) clearTimeout(intervalRef.current) }
  }, [displayed, isDeleting, wordIndex])

  return (
    <section
      className="hero-section-pad"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--color-parchment)',
      }}
    >
      {/* ── Layered Background ── */}
      <HeroBackground />

      {/* ── Floating document cards (background decoration) ── */}
      <FloatingCards />

      {/* ── Main Content ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '68rem',
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          style={{ marginBottom: '2rem' }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-terracotta)',
              background: 'rgba(184,150,62,0.07)',
              border: '1px solid rgba(184,150,62,0.2)',
              borderRadius: 'var(--radius-pill)',
              padding: '0.35rem 0.875rem',
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: 'var(--color-terracotta)',
                display: 'inline-block',
                boxShadow: '0 0 8px rgba(184,150,62,0.6)',
                animation: 'live-ping 2.5s ease infinite',
              }}
            />
            Legal AI Platform · Private by Design
          </span>
        </motion.div>

        {/* ── Headline ── */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3.25rem, 8vw, 6rem)',
            fontWeight: 300,
            lineHeight: 1.02,
            letterSpacing: '-0.03em',
            color: 'var(--color-ink)',
            marginBottom: '0.5rem',
          }}
        >
          From Case Chaos
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.18, ease: [0.19, 1, 0.22, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3.25rem, 8vw, 6rem)',
            fontWeight: 300,
            lineHeight: 1.02,
            letterSpacing: '-0.03em',
            marginBottom: '2.5rem',
            fontStyle: 'italic',
            background: 'linear-gradient(135deg, #D4AE58 0%, #B8963E 60%, #8B6E28 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          to Ordered Truth.
        </motion.h1>

        {/* Typewriter sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 2.2vw, 1.1875rem)',
            lineHeight: 1.7,
            color: 'var(--color-muted)',
            maxWidth: '40rem',
            margin: '0 auto 0.75rem',
          }}
        >
          Lawline reads your{' '}
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.875em',
              color: 'var(--color-ink)',
              background: 'var(--color-cream-deep)',
              padding: '0.1rem 0.45rem',
              borderRadius: '4px',
              border: '1px solid var(--color-warm-100)',
              display: 'inline-block',
              minWidth: '14ch',
              textAlign: 'left',
            }}
          >
            {displayed}
            <span
              style={{
                display: 'inline-block',
                width: 2,
                height: '1em',
                background: 'var(--color-terracotta)',
                marginLeft: 1,
                verticalAlign: 'text-bottom',
                animation: 'live-ping 0.8s ease infinite',
                borderRadius: 1,
              }}
            />
          </span>
          {' '}and builds structured timelines, client-safe drafts,
          and court-ready exhibits — in seconds.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-faint)',
            marginBottom: '2.75rem',
          }}
        >
          Built for law firms that refuse to slow down.
        </motion.p>

        {/* ── CTA Buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '4rem',
          }}
        >
          <button
            onClick={() => openComingSoon()}
            className="btn-primary shimmer-button animate-pulse-glow"
            style={{
              fontSize: '0.9375rem',
              padding: '0.875rem 2rem',
              cursor: 'pointer',
              border: 'none',
              gap: '0.625rem',
            }}
          >
            Start Free Trial
            <ArrowRight size={16} />
          </button>
          <Link
            href="/insights"
            className="btn-ghost"
            style={{ fontSize: '0.9375rem', padding: '0.875rem 2rem' }}
          >
            See how it works
          </Link>
        </motion.div>

        {/* ── Trust Signals ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="trust-signals"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.75rem',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '5rem',
          }}
        >
          {TRUST_SIGNALS.map(({ icon: Icon, text }, i) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.07 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                color: 'var(--color-muted)',
              }}
            >
              <Icon size={13} style={{ color: 'var(--color-terracotta)', flexShrink: 0 }} />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.06em',
                }}
              >
                {text}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Document Ticker ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.95 }}
          style={{
            width: '100%',
            maxWidth: '52rem',
            overflow: 'hidden',
            position: 'relative',
            marginBottom: '2.5rem',
          }}
        >
          {/* Fade masks */}
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: 80,
            background: 'linear-gradient(to right, var(--color-parchment), transparent)',
            zIndex: 2, pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: 80,
            background: 'linear-gradient(to left, var(--color-parchment), transparent)',
            zIndex: 2, pointerEvents: 'none',
          }} />

          <style>{`
            @keyframes ticker-scroll {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .ticker-track {
              display: flex;
              width: max-content;
              animation: ticker-scroll 28s linear infinite;
            }
            .ticker-track:hover { animation-play-state: paused; }
          `}</style>

          <div className="ticker-track">
            {[
              'ER records', 'Police reports', 'Deposition transcripts', 'Expert reports',
              'Insurance exhibits', 'Lease amendments', 'Financial affidavits', 'HR files',
              'Interrogatory responses', 'Medical invoices', 'Nurse notes', 'Demand letters',
              'EEOC charges', 'Bank statements', 'Trial exhibits', 'Arbitration briefs',
              // Duplicate for seamless loop
              'ER records', 'Police reports', 'Deposition transcripts', 'Expert reports',
              'Insurance exhibits', 'Lease amendments', 'Financial affidavits', 'HR files',
              'Interrogatory responses', 'Medical invoices', 'Nurse notes', 'Demand letters',
              'EEOC charges', 'Bank statements', 'Trial exhibits', 'Arbitration briefs',
            ].map((doc, i) => (
              <span key={i} style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5625rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-faint)',
                padding: '0 1.25rem',
                whiteSpace: 'nowrap',
                borderRight: '1px solid var(--color-warm-100)',
              }}>
                {doc}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── Demo Widget ── */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.19, 1, 0.22, 1] }}
          style={{ width: '100%', maxWidth: '42rem' }}
        >
          <CasePreviewWidget />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.375rem',
          color: 'var(--color-faint)',
          animation: 'float-slow 2.5s ease-in-out infinite',
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <ChevronDown size={14} />
      </motion.div>
    </section>
  )
}

/* ── Background layers ── */
function HeroBackground() {
  return (
    <>
      {/* Radial gradient bloom — top center */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '900px',
          height: '600px',
          background: 'radial-gradient(ellipse at center, rgba(184,150,62,0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* Gold bloom — right side */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(ellipse at center, rgba(184,146,58,0.05) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* Indigo AI bloom — left side */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '-5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(ellipse at center, rgba(74,82,160,0.04) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* Fine dot grid — navy tinted */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(26,58,107,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(26,58,107,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 0%, black 30%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />
    </>
  )
}

/* ── Floating ambient document cards ── */
function FloatingCards() {
  const cards = [
    { top: '15%', left: '3%',  rotate: -8,  delay: 0, label: 'Exhibit A' },
    { top: '50%', left: '1%',  rotate: 5,   delay: 0.8, label: 'Case #24-CV' },
    { top: '20%', right: '3%', rotate: 7,   delay: 0.4, label: 'Deposition' },
    { top: '55%', right: '1%', rotate: -5,  delay: 1.2, label: 'Timeline' },
  ]

  return (
    <>
      {cards.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 + c.delay, duration: 0.6 }}
          style={{
            position: 'absolute',
            top: c.top,
            left: c.left,
            right: c.right,
            width: '100px',
            background: 'rgba(255,255,255,0.92)',
            border: '1px solid #E2E5EF',
            borderRadius: '8px',
            padding: '0.625rem 0.75rem',
            transform: `rotate(${c.rotate}deg)`,
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 16px rgba(10,16,32,0.08)',
            animation: `float-y ${5 + i * 0.7}s ease-in-out infinite ${c.delay}s`,
            pointerEvents: 'none',
            zIndex: 1,
          }}
          className="hidden lg:block"
        >
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-terracotta)',
            marginBottom: '0.375rem',
          }}>
            {c.label}
          </div>
          {[1,2,3].map(j => (
            <div key={j} style={{
              height: 4,
              borderRadius: 2,
              background: 'var(--color-warm-100)',
              marginBottom: 3,
              width: j === 3 ? '60%' : '100%',
            }} />
          ))}
        </motion.div>
      ))}
    </>
  )
}

/* ── Live case preview widget ── */
function CasePreviewWidget() {
  const events = [
    {
      date: 'Jan 12, 2024',
      time: '9:14 AM',
      label: 'Contract executed — Unit 4B lease agreement signed by both parties',
      type: 'contract' as const,
      source: 'Lease_Agreement.pdf · p.1',
      ai: false,
      flag: null,
    },
    {
      date: 'Mar 3, 2024',
      time: '2:31 PM',
      label: 'First noise complaint filed by tenant — written notice to landlord',
      type: 'issue' as const,
      source: 'Tenant_Complaint_001.pdf · p.2',
      ai: true,
      flag: null,
    },
    {
      date: 'Apr 17, 2024',
      time: '10:05 AM',
      label: '30-day cure notice issued by landlord via certified mail',
      type: 'notice' as const,
      source: 'Landlord_Notice_Apr.pdf · p.1',
      ai: true,
      flag: '⚠ Tenant claims non-receipt — dispute flagged',
    },
    {
      date: 'Jun 2, 2024',
      time: '3:00 PM',
      label: 'Mediation session attempted — no resolution reached',
      type: 'event' as const,
      source: 'Mediation_Notes.docx · p.4',
      ai: false,
      flag: null,
    },
    {
      date: 'Jul 29, 2024',
      time: '8:47 AM',
      label: 'Lawsuit filed — Case #24-CV-8821 · Santa Clara Superior Court',
      type: 'milestone' as const,
      source: 'Complaint_Filed.pdf · p.1',
      ai: true,
      flag: null,
    },
  ]

  const typeConfig = {
    contract:  { color: '#1A3A6B', bar: '#1A3A6B', bg: 'rgba(26,58,107,0.08)',   label: 'Contract'  },
    issue:     { color: '#B8963E', bar: '#B8963E', bg: 'rgba(184,150,62,0.10)',  label: 'Issue'     },
    notice:    { color: '#4A52A0', bar: '#4A52A0', bg: 'rgba(74,82,160,0.09)',   label: 'Notice'    },
    event:     { color: '#4A5578', bar: '#C5CADE', bg: 'rgba(74,85,120,0.06)',   label: 'Event'     },
    milestone: { color: '#0A1020', bar: '#0A1020', bg: 'rgba(10,16,32,0.07)',    label: 'Milestone' },
  } as const

  return (
    <div style={{
      background: '#FFFFFF',
      border: '1px solid #E2E5EF',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      boxShadow: '0 32px 72px rgba(10,16,32,0.13), 0 4px 20px rgba(10,16,32,0.07)',
      position: 'relative',
    }}>
      {/* ── Window chrome ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0.75rem 1.125rem',
        background: '#0D1729',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}>
        <div style={{ display: 'flex', gap: '0.35rem' }}>
          {['#FF6058', '#FFBD2E', '#28CA42'].map(c => (
            <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />
          ))}
        </div>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.5rem',
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'rgba(253,252,250,0.35)',
        }}>
          Lawline · Case Intelligence
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span style={{
            display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
            background: '#4ADE80', boxShadow: '0 0 8px rgba(74,222,128,0.7)',
          }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4375rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4ADE80' }}>
            Live
          </span>
        </div>
      </div>

      {/* ── AI status bar ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.625rem',
        padding: '0.5rem 1.125rem',
        background: 'rgba(26,58,107,0.04)',
        borderBottom: '1px solid rgba(26,58,107,0.09)',
      }}>
        <Cpu size={10} style={{ color: '#1A3A6B', flexShrink: 0 }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#1A3A6B' }}>
          AI extracting events from 3 documents
        </span>
        <div style={{ flex: 1, height: 2.5, background: 'rgba(26,58,107,0.10)', borderRadius: 2, overflow: 'hidden' }}>
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '82%' }}
            transition={{ duration: 2.2, delay: 1, ease: 'easeOut' }}
            style={{ height: '100%', background: 'linear-gradient(90deg, #1A3A6B, #2456A4)', borderRadius: 2 }}
          />
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4375rem', color: 'rgba(26,58,107,0.55)', whiteSpace: 'nowrap' }}>
          8.2s
        </span>
      </div>

      {/* ── Category tab strip ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 0,
        padding: '0 1.125rem',
        borderBottom: '1px solid var(--color-warm-100)',
        background: '#FAFBFE',
        overflowX: 'auto',
      }}>
        {(['All', 'Contract', 'Issue', 'Notice', 'Milestone'] as const).map((tab, i) => (
          <div key={tab} style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.4375rem',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            color: i === 0 ? '#1A3A6B' : 'var(--color-faint)',
            padding: '0.5rem 0.75rem',
            borderBottom: i === 0 ? '2px solid #1A3A6B' : '2px solid transparent',
            whiteSpace: 'nowrap', cursor: 'pointer',
          }}>
            {tab}
          </div>
        ))}
        <div style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.4375rem', color: 'var(--color-faint)', letterSpacing: '0.06em', whiteSpace: 'nowrap', padding: '0.5rem 0' }}>
          5 events · 3 docs
        </div>
      </div>

      {/* ── Timeline events ── */}
      <div style={{ padding: '0.875rem 0' }}>
        {events.map(({ date, time, label, type, source, ai, flag }, i) => {
          const cfg = typeConfig[type]
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + i * 0.13, duration: 0.35 }}
              style={{
                display: 'flex',
                gap: 0,
                position: 'relative',
                borderLeft: `3px solid ${cfg.bar}`,
                marginLeft: '1.125rem',
                marginBottom: i < events.length - 1 ? '0.125rem' : 0,
                background: 'transparent',
                transition: 'background 0.15s ease',
              }}
            >
              {/* Vertical connector */}
              {i < events.length - 1 && (
                <div style={{
                  position: 'absolute',
                  left: -1,
                  top: '100%',
                  width: 1,
                  height: '0.125rem',
                  background: 'var(--color-warm-100)',
                }} />
              )}

              <div style={{ padding: '0.625rem 0.875rem 0.625rem 0.75rem', flex: 1 }}>
                {/* Top row: date + type badge + source */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.5rem',
                    color: 'var(--color-faint)', letterSpacing: '0.06em', whiteSpace: 'nowrap',
                  }}>
                    {date}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.375rem',
                    color: 'rgba(136,144,168,0.6)', letterSpacing: '0.04em',
                  }}>
                    {time}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.375rem',
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    color: cfg.color, background: cfg.bg,
                    border: `1px solid ${cfg.color}22`,
                    padding: '0.1rem 0.4rem', borderRadius: 'var(--radius-pill)',
                  }}>
                    {cfg.label}
                  </span>
                  {ai && (
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.375rem',
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      color: '#1A3A6B', background: 'rgba(26,58,107,0.07)',
                      border: '1px solid rgba(26,58,107,0.18)',
                      padding: '0.1rem 0.4rem', borderRadius: 'var(--radius-pill)',
                    }}>
                      AI
                    </span>
                  )}
                </div>

                {/* Event label */}
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.8rem',
                  color: 'var(--color-ink)', lineHeight: 1.45,
                  margin: '0 0 0.25rem',
                  fontWeight: type === 'milestone' ? 500 : 400,
                }}>
                  {label}
                </p>

                {/* Source cite */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.4375rem',
                    color: 'var(--color-faint)', letterSpacing: '0.05em',
                    background: 'var(--color-cream)',
                    border: '1px solid var(--color-warm-100)',
                    padding: '0.1rem 0.4rem', borderRadius: '3px',
                  }}>
                    ↗ {source}
                  </span>
                </div>

                {/* Flag (inconsistency warning) */}
                {flag && (
                  <div style={{
                    marginTop: '0.375rem',
                    display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                    fontFamily: 'var(--font-mono)', fontSize: '0.4375rem',
                    letterSpacing: '0.05em', color: '#B8963E',
                    background: 'rgba(184,150,62,0.07)',
                    border: '1px solid rgba(184,150,62,0.22)',
                    padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)',
                  }}>
                    {flag}
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* ── Footer ── */}
      <div style={{
        padding: '0.625rem 1.125rem',
        background: '#F6F7FA',
        borderTop: '1px solid #E2E5EF',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', gap: '0.875rem', alignItems: 'center' }}>
          {[
            { dot: '#1A3A6B', label: '3 docs parsed' },
            { dot: '#B8963E', label: '1 flag' },
          ].map(({ dot, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: dot }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4375rem', color: 'var(--color-faint)', letterSpacing: '0.06em' }}>
                {label}
              </span>
            </div>
          ))}
        </div>
        <span style={{
          display: 'flex', alignItems: 'center', gap: '0.25rem',
          fontFamily: 'var(--font-mono)', fontSize: '0.4375rem',
          color: '#2D6B31', letterSpacing: '0.06em',
        }}>
          <span style={{ fontSize: '0.625rem' }}>✓</span> Ready for export
        </span>
      </div>
    </div>
  )
}
