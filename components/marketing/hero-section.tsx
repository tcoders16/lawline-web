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
      date: 'Jan 14, 2024',
      label: 'Rear-end collision — I-280 northbound, reported at scene',
      type: 'incident' as const,
      source: 'Police_Report_2024-014.pdf · p.2',
      flag: null,
    },
    {
      date: 'Jan 14, 2024',
      label: 'ER admission — Memorial Hospital · Dx: L4-L5 disc herniation',
      type: 'medical' as const,
      source: 'ER_Records_Memorial.pdf · p.7',
      flag: null,
    },
    {
      date: 'Jan–Jul 2024',
      label: '6-month treatment gap — no documented follow-up care',
      type: 'flag' as const,
      source: 'AI analysis across 14 records',
      flag: 'IME will argue gap breaks causation chain',
    },
    {
      date: 'Oct 3, 2024',
      label: 'IME by Dr. Chen — disputes surgery necessity, cites gap',
      type: 'dispute' as const,
      source: 'IME_Report_Chen.pdf · p.12',
      flag: null,
    },
    {
      date: 'Dec 2, 2024',
      label: 'Demand filed — $284,000 · Santa Clara Superior Court',
      type: 'milestone' as const,
      source: 'Demand_Letter_Final.pdf · p.1',
      flag: null,
    },
  ]

  const TYPE = {
    incident:  { dot: '#1A3A6B', badge: '#1A3A6B', bg: 'rgba(26,58,107,0.08)',   label: 'Incident'  },
    medical:   { dot: '#2D6B31', badge: '#2D6B31', bg: 'rgba(45,107,49,0.08)',   label: 'Medical'   },
    flag:      { dot: '#B8963E', badge: '#B8963E', bg: 'rgba(184,150,62,0.10)',  label: '⚠ Flag'    },
    dispute:   { dot: '#4A52A0', badge: '#4A52A0', bg: 'rgba(74,82,160,0.09)',   label: 'Dispute'   },
    milestone: { dot: '#0A1020', badge: '#0A1020', bg: 'rgba(10,16,32,0.07)',    label: 'Milestone' },
  } as const

  return (
    <div style={{
      background: '#FFFFFF',
      border: '1px solid #E2E5EF',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      boxShadow: '0 32px 72px rgba(10,16,32,0.13), 0 4px 20px rgba(10,16,32,0.07)',
    }}>
      {/* ── Window chrome ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0.625rem 1rem',
        background: '#0D1729',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'flex', gap: '0.3rem' }}>
          {['#FF6058', '#FFBD2E', '#28CA42'].map(c => (
            <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.9 }} />
          ))}
        </div>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.4375rem',
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'rgba(253,252,250,0.3)',
        }}>
          Lawline · Case Intelligence
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ADE80', boxShadow: '0 0 6px rgba(74,222,128,0.8)' }}
          />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.375rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4ADE80' }}>
            Live
          </span>
        </div>
      </div>

      {/* ── Scan progress bar ── */}
      <div style={{ background: '#0A1020', padding: '0.5rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4375rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(212,174,88,0.8)' }}>
            ⚡ AI extracting from 847 pages · 6 documents
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4375rem', color: 'rgba(74,222,128,0.7)', letterSpacing: '0.06em' }}>42s</span>
        </div>
        <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.4, delay: 0.6, ease: 'easeOut' }}
            style={{ height: '100%', background: 'linear-gradient(90deg, #1A3A6B 0%, #B8963E 60%, #4ADE80 100%)', borderRadius: 2 }}
          />
        </div>
      </div>

      {/* ── Damages callout strip ── */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
        background: '#F6F7FA',
        borderBottom: '1px solid #E2E5EF',
      }}>
        {[
          { val: '$284,000', sub: 'Damages extracted', accent: '#1A3A6B' },
          { val: '42 events', sub: 'Source-linked', accent: '#2D6B31' },
          { val: '3 flags', sub: 'Need review', accent: '#B8963E' },
        ].map(({ val, sub, accent }) => (
          <div key={val} style={{ padding: '0.5rem 0.875rem', borderRight: '1px solid #E2E5EF' }}>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 600, color: accent, letterSpacing: '-0.01em' }}>{val}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.375rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-faint)', marginTop: '0.1rem' }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* ── Timeline ── */}
      <div style={{ padding: '0.875rem 1rem 0.625rem' }}>
        {events.map(({ date, label, type, source, flag }, i) => {
          const cfg = TYPE[type]
          const isLast = i === events.length - 1
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.15, duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              style={{ display: 'flex', gap: '0.625rem', position: 'relative' }}
            >
              {/* Left: dot + connector line */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, paddingTop: '0.25rem' }}>
                <div style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: cfg.dot,
                  border: `2px solid ${cfg.dot}`,
                  boxShadow: type === 'flag' ? `0 0 8px ${cfg.dot}60` : 'none',
                  flexShrink: 0,
                  zIndex: 1,
                }} />
                {!isLast && (
                  <div style={{ width: 1.5, flex: 1, minHeight: 16, background: 'linear-gradient(to bottom, #E2E5EF, #E2E5EF)', marginTop: 2 }} />
                )}
              </div>

              {/* Right: content */}
              <div style={{ flex: 1, paddingBottom: isLast ? 0 : '0.625rem' }}>
                {/* Date + badge row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4375rem', color: 'var(--color-faint)', letterSpacing: '0.07em', whiteSpace: 'nowrap' }}>
                    {date}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.375rem',
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    color: cfg.badge, background: cfg.bg,
                    border: `1px solid ${cfg.badge}25`,
                    padding: '0.075rem 0.375rem', borderRadius: 'var(--radius-pill)',
                    whiteSpace: 'nowrap',
                  }}>
                    {cfg.label}
                  </span>
                </div>

                {/* Event description */}
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.78rem',
                  color: type === 'milestone' ? 'var(--color-ink)' : type === 'flag' ? '#8B6E28' : 'var(--color-ink)',
                  fontWeight: type === 'milestone' ? 600 : 400,
                  lineHeight: 1.4, margin: '0 0 0.2rem',
                }}>
                  {label}
                </p>

                {/* Source citation */}
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.375rem',
                  color: 'var(--color-faint)', letterSpacing: '0.05em',
                  background: 'var(--color-cream)',
                  border: '1px solid var(--color-warm-100)',
                  padding: '0.075rem 0.375rem', borderRadius: '3px',
                  display: 'inline-block',
                }}>
                  ↗ {source}
                </span>

                {/* AI flag detail */}
                {flag && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ delay: 1.2 + i * 0.15 + 0.2 }}
                    style={{
                      marginTop: '0.3rem',
                      display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
                      fontFamily: 'var(--font-mono)', fontSize: '0.4rem',
                      letterSpacing: '0.05em', color: '#8B6E28',
                      background: 'rgba(184,150,62,0.08)',
                      border: '1px solid rgba(184,150,62,0.25)',
                      padding: '0.175rem 0.5rem', borderRadius: '3px',
                    }}
                  >
                    ⚠ {flag}
                  </motion.div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* ── Footer ── */}
      <div style={{
        padding: '0.5rem 1rem',
        background: '#F6F7FA',
        borderTop: '1px solid #E2E5EF',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          {[
            { dot: '#1A3A6B', label: '6 docs parsed' },
            { dot: '#B8963E', label: '3 flags' },
          ].map(({ dot, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.275rem' }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: dot }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.375rem', color: 'var(--color-faint)', letterSpacing: '0.06em' }}>{label}</span>
            </div>
          ))}
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2 }}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.25rem',
            fontFamily: 'var(--font-mono)', fontSize: '0.375rem',
            color: '#2D6B31', letterSpacing: '0.06em',
          }}
        >
          <span style={{ fontSize: '0.5625rem' }}>✓</span> Ready for export
        </motion.span>
      </div>
    </div>
  )
}
