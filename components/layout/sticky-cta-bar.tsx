'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, X, Zap } from 'lucide-react'
import { useApp } from '@/components/providers/app-providers'

export function StickyCtaBar() {
  const { openComingSoon } = useApp()
  const [visible,   setVisible]   = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const shownAt = useRef(0)

  useEffect(() => {
    if (dismissed) return
    const onScroll = () => {
      const scrollPct = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      if (scrollPct > 0.35 && !visible) {
        setVisible(true)
        shownAt.current = Date.now()
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [dismissed, visible])

  const handleDismiss = () => {
    setDismissed(true)
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          key="sticky-cta"
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 90,
            background: 'var(--color-ink)',
            border: '1px solid rgba(184,150,62,0.25)',
            borderRadius: 'var(--radius-pill)',
            boxShadow: '0 20px 60px rgba(10,16,32,0.35), 0 4px 16px rgba(10,16,32,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '0.75rem 0.75rem 0.75rem 1.25rem',
            backdropFilter: 'blur(16px)',
            maxWidth: 'min(92vw, 560px)',
          }}
        >
          {/* Animated pulse */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                position: 'absolute',
                inset: -4,
                borderRadius: '50%',
                background: '#B8963E',
              }}
            />
            <div style={{
              width: 32, height: 32,
              borderRadius: '50%',
              background: 'rgba(184,150,62,0.15)',
              border: '1px solid rgba(184,150,62,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}>
              <Zap size={14} style={{ color: '#B8963E' }} />
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--color-parchment)',
              letterSpacing: '-0.01em',
              marginBottom: '0.1rem',
            }}>
              42 seconds per case file
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.475rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'rgba(253,252,250,0.45)',
            }}>
              First 100 firms · 3 months free
            </div>
          </div>

          <button
            onClick={() => openComingSoon()}
            className="btn-primary"
            style={{
              gap: '0.375rem',
              fontSize: '0.8125rem',
              padding: '0.625rem 1.125rem',
              cursor: 'pointer',
              border: 'none',
              flexShrink: 0,
            }}
          >
            Join waitlist
            <ArrowRight size={13} />
          </button>

          <button
            onClick={handleDismiss}
            aria-label="Dismiss"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.375rem',
              cursor: 'pointer',
              color: 'rgba(253,252,250,0.4)',
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
            }}
          >
            <X size={13} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
