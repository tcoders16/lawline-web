'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const FOOTER_LINKS = [
  { label: 'Pricing',  href: '/pricing' },
  { label: 'Insights', href: '/insights' },
  { label: 'Privacy',  href: '/privacy' },
  { label: 'Terms',    href: '/terms' },
] as const

const SECURITY_BADGES = ['SOC 2', 'HIPAA-Ready', 'TLS 1.3', 'On-Prem']

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-midnight)',
        color: 'var(--color-faint)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative top accent */}
      <div
        style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, #B8963E 20%, #B8923A 50%, #B8963E 80%, transparent)',
          opacity: 0.45,
        }}
      />

      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse at center, rgba(196,103,58,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Main footer body */}
      <div
        style={{
          maxWidth: '76rem',
          margin: '0 auto',
          padding: '4rem 2rem 3rem',
          position: 'relative',
        }}
      >
        <div className="grid-footer-cols">
          {/* Brand column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Logo + name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <FooterLogo />
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.375rem',
                    fontWeight: 500,
                    letterSpacing: '-0.025em',
                    color: 'var(--color-parchment)',
                    lineHeight: 1.1,
                  }}
                >
                  Lawline
                </div>
                <div
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
                </div>
              </div>
            </div>

            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                letterSpacing: '0.06em',
                color: 'rgba(253,252,250,0.35)',
                maxWidth: '240px',
                lineHeight: 1.6,
              }}
            >
              case chaos → ordered truth
            </p>

            {/* Security badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {SECURITY_BADGES.map(b => (
                <span
                  key={b}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.5rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(253,252,250,0.35)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 'var(--radius-xs)',
                    padding: '0.2rem 0.5rem',
                  }}
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5625rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(253,252,250,0.25)',
                marginBottom: '0.25rem',
              }}
            >
              Links
            </span>
            {FOOTER_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.875rem',
                  color: 'rgba(253,252,250,0.5)',
                  textDecoration: 'none',
                  transition: 'color 0.15s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-terracotta-light)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(253,252,250,0.5)')}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Social + status */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-end' }}>
            {/* Social links */}
            <div style={{ display: 'flex', gap: '0.625rem' }}>
              <a
                href="https://omkumarsolanki.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Website"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                  height: 32,
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(253,252,250,0.45)',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.09)'
                  e.currentTarget.style.color = 'rgba(253,252,250,0.85)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                  e.currentTarget.style.color = 'rgba(253,252,250,0.45)'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/omkumar-solanki-atluxuarywxtchbusinessmandeveloper2/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                  height: 32,
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(253,252,250,0.45)',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.09)'
                  e.currentTarget.style.color = 'rgba(253,252,250,0.85)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                  e.currentTarget.style.color = 'rgba(253,252,250,0.45)'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 0.875rem',
                background: 'rgba(61,107,65,0.1)',
                border: '1px solid rgba(61,107,65,0.2)',
                borderRadius: 'var(--radius-pill)',
              }}
            >
              <span className="dot-live" />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5625rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-sage-light)',
                }}
              >
                All systems operational
              </span>
            </div>

            {/* Stripe badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.4rem 0.75rem',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 'var(--radius-pill)',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="6" fill="#635BFF" />
                <path d="M14.5 12c0-1.1.9-2 2-2 .8 0 1.5.5 1.8 1.2L22 10c-.8-2.3-3-4-5.5-4C13 6 10.5 8.5 10.5 12c0 5.5 7.5 6.5 7.5 10 0 1.1-.9 2-2 2-.9 0-1.6-.5-1.9-1.3L10 24c.9 2.4 3.1 4 5.5 4C19 28 21.5 25.5 21.5 22c0-5.5-7-6.5-7-10z" fill="white" />
              </svg>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                Secured by Stripe
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          padding: '1.25rem 2rem',
          maxWidth: '76rem',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.75rem',
            color: 'rgba(253,252,250,0.25)',
          }}
        >
          © {year} Lawline Inc. All rights reserved.
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5625rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(253,252,250,0.18)',
          }}
        >
          v2.0.0 · Built for the law
        </span>
      </div>
    </footer>
  )
}

function FooterLogo() {
  return (
    <svg width="34" height="34" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="9" fill="rgba(253,252,250,0.07)" />
      <rect width="36" height="36" rx="9" fill="url(#fl-bg)" opacity="0.4" />
      <rect x="10" y="8" width="5" height="19" rx="1.5" fill="rgba(253,252,250,0.85)" />
      <rect x="10" y="22" width="16" height="5" rx="1.5" fill="rgba(253,252,250,0.85)" />
      <circle cx="27" cy="9" r="3.5" fill="#B8963E" opacity="0.85" />
      <circle cx="27" cy="9" r="2"   fill="#3DBB7B" />
      <line x1="15" y1="10.5" x2="23.5" y2="9" stroke="#D4AE58" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.45" />
      <defs>
        <linearGradient id="fl-bg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#B8963E" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#B8923A" stopOpacity="0.15" />
        </linearGradient>
      </defs>
    </svg>
  )
}
