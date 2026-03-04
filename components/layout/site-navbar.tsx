'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '@/components/providers/app-providers'
import { AgentHubDropdown } from '@/components/layout/agent-hub-dropdown'

const ANNOUNCEMENT_BAR_HEIGHT = 40 /* px — matches the bar's rendered height */

const NAV_LINKS = [
  { label: 'Home',     href: '/' },
  { label: 'Pricing',  href: '/pricing' },
  { label: 'Insights', href: '/insights' },
] as const

export function SiteNavbar() {
  const pathname  = usePathname()
  const { openComingSoon, announcementVisible } = useApp()
  const [scrolled,    setScrolled]    = useState(false)
  const [open,        setOpen]        = useState(false)
  const [agentsOpen,  setAgentsOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false); setAgentsOpen(false) }, [pathname])

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: announcementVisible ? ANNOUNCEMENT_BAR_HEIGHT : 0,
          left: 0,
          right: 0,
          zIndex: 50,
          overflow: 'visible',
          backgroundColor: scrolled || agentsOpen ? 'rgba(253,252,250,0.97)' : 'transparent',
          backdropFilter: scrolled || agentsOpen ? 'blur(16px) saturate(1.8)' : 'none',
          borderBottom: scrolled || agentsOpen ? '1px solid rgba(221,214,200,0.7)' : '1px solid transparent',
          transition: 'top 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), background-color 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), backdrop-filter 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: scrolled ? '0.875rem 2.5rem' : '1.375rem 2.5rem',
          transition: 'padding 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}>
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          <LawlineLogo />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.375rem',
                fontWeight: 500,
                letterSpacing: '-0.025em',
                color: 'var(--color-ink)',
                lineHeight: 1.1,
              }}
            >
              Lawline
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-terracotta)',
                lineHeight: 1,
              }}
            >
              Legal AI
            </span>
          </div>
        </Link>

        {/* Desktop nav — pill style + Agents button */}
        <div className="nav-desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.125rem',
              background: 'rgba(246,247,250,0.85)',
              border: '1px solid var(--color-warm-100)',
              borderRadius: 'var(--radius-pill)',
              padding: '0.3rem',
              backdropFilter: 'blur(8px)',
            }}
          >
            {NAV_LINKS.map(({ label, href }) => {
              const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.8125rem',
                    fontWeight: active ? 500 : 400,
                    color: active ? 'var(--color-ink)' : 'var(--color-muted)',
                    textDecoration: 'none',
                    padding: '0.4rem 1rem',
                    borderRadius: 'var(--radius-pill)',
                    background: active
                      ? 'var(--color-parchment)'
                      : 'transparent',
                    boxShadow: active ? '0 1px 4px rgba(28,27,24,0.08)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {label}
                </Link>
              )
            })}
          </nav>

          {/* Agents Hub dropdown trigger */}
          <button
            onClick={() => setAgentsOpen(v => !v)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontFamily: 'var(--font-ui)',
              fontSize: '0.8125rem',
              fontWeight: 500,
              color: agentsOpen ? 'var(--color-ink)' : 'var(--color-muted)',
              background: agentsOpen ? 'rgba(184,150,62,0.08)' : 'rgba(246,247,250,0.85)',
              border: agentsOpen ? '1px solid rgba(184,150,62,0.35)' : '1px solid var(--color-warm-100)',
              borderRadius: 'var(--radius-pill)',
              padding: '0.4rem 0.875rem',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s ease',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#2D6B31',
                display: 'inline-block',
                boxShadow: '0 0 6px rgba(45,107,49,0.6)',
              }}
            />
            Agents
            <motion.div
              animate={{ rotate: agentsOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={13} />
            </motion.div>
          </button>
        </div>

        {/* Right CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => openComingSoon()}
            className="nav-desktop-only btn-primary shimmer-button"
            style={{
              fontSize: '0.8125rem',
              padding: '0.55rem 1.25rem',
              cursor: 'pointer',
              border: 'none',
            }}
          >
            Start Free Trial
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(v => !v)}
            className="nav-mobile-only"
            aria-label="Toggle menu"
            style={{
              background: 'var(--color-cream)',
              border: '1px solid var(--color-warm-100)',
              borderRadius: 'var(--radius-md)',
              padding: '0.5rem',
              cursor: 'pointer',
              color: 'var(--color-ink)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        </div>{/* end nav row wrapper */}

        {/* Agent Hub Dropdown — inside header so it drops from below navbar */}
        <AgentHubDropdown open={agentsOpen} onClose={() => setAgentsOpen(false)} />
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 40,
              backgroundColor: 'var(--color-parchment)',
              display: 'flex',
              flexDirection: 'column',
              padding: '5.5rem 2rem 2rem',
            }}
          >
            {/* Decorative line */}
            <div className="glow-line" style={{ marginBottom: '2rem' }} />

            {NAV_LINKS.map(({ label, href }, i) => (
              <motion.div
                key={href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  href={href}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.75rem',
                    fontWeight: 300,
                    letterSpacing: '-0.025em',
                    color: 'var(--color-ink)',
                    textDecoration: 'none',
                    padding: '0.875rem 0',
                    borderBottom: '1px solid var(--color-warm-100)',
                    display: 'block',
                    fontStyle: 'italic',
                  }}
                >
                  {label}
                </Link>
              </motion.div>
            ))}

            {/* Mobile Agents link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.06 }}
            >
              <button
                onClick={() => { setOpen(false); setAgentsOpen(true) }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.75rem',
                  fontWeight: 300,
                  letterSpacing: '-0.025em',
                  color: '#B8963E',
                  textDecoration: 'none',
                  padding: '0.875rem 0',
                  display: 'block',
                  fontStyle: 'italic',
                  background: 'none',
                  border: 'none',
                  borderBottom: '1px solid var(--color-warm-100)',
                  width: '100%',
                  textAlign: 'left',
                  cursor: 'pointer',
                }}
              >
                Agents ↓
              </button>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              onClick={() => { setOpen(false); openComingSoon() }}
              className="btn-primary shimmer-button"
              style={{ marginTop: '2.5rem', justifyContent: 'center', cursor: 'pointer', border: 'none', fontSize: '1rem', padding: '0.875rem' }}
            >
              Start Free Trial
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ──────────────────────────────────────────────
   LAWLINE LOGO — Clean "L" lettermark + AI node
────────────────────────────────────────────── */
function LawlineLogo() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Lawline logo"
    >
      {/* Background */}
      <rect width="36" height="36" rx="9" fill="#1C1B18" />
      <rect width="36" height="36" rx="9" fill="url(#ll-bg)" opacity="0.45" />

      {/* L letterform — vertical stroke */}
      <rect x="10" y="8" width="5" height="19" rx="1.5" fill="#FDFCFA" opacity="0.92" />

      {/* L letterform — horizontal base */}
      <rect x="10" y="22" width="16" height="5" rx="1.5" fill="#FDFCFA" opacity="0.92" />

      {/* AI accent — glowing node at top-right */}
      <circle cx="27" cy="9" r="3.5" fill="#B8963E" opacity="0.9" />
      <circle cx="27" cy="9" r="2"   fill="#D4AE58" />

      {/* Neural thread — subtle dashed line from L-top to node */}
      <line
        x1="15" y1="10.5" x2="23.5" y2="9"
        stroke="#D4AE58"
        strokeWidth="0.75"
        strokeDasharray="2 2"
        opacity="0.5"
      />

      <defs>
        <linearGradient id="ll-bg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#B8963E" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#8B6E28" stopOpacity="0.15" />
        </linearGradient>
      </defs>
    </svg>
  )
}
