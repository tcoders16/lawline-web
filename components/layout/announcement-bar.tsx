'use client'

import { X, ArrowRight, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '@/components/providers/app-providers'

export function AnnouncementBar() {
  const { openComingSoon, announcementVisible, dismissAnnouncement } = useApp()

  return (
    <AnimatePresence>
      {announcementVisible && (
        <motion.div
          key="announcement"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 60,
            background: 'var(--color-ink)',
            borderBottom: '1px solid rgba(184,150,62,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.5rem 3rem',
            gap: '0.625rem',
          }}
        >
          {/* Animated gold shimmer strip */}
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '40%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(184,150,62,0.06), transparent)',
              pointerEvents: 'none',
            }}
          />

          <Sparkles size={12} style={{ color: '#B8963E', flexShrink: 0 }} />

          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8125rem',
            color: 'rgba(253,252,250,0.85)',
            lineHeight: 1,
          }}>
            First 100 firms get <strong style={{ color: '#D4AE58' }}>3 months free</strong> — early access waitlist is now open
          </span>

          <button
            onClick={() => openComingSoon()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontFamily: 'var(--font-ui)',
              fontSize: '0.75rem',
              fontWeight: 500,
              color: '#B8963E',
              background: 'rgba(184,150,62,0.12)',
              border: '1px solid rgba(184,150,62,0.3)',
              borderRadius: 'var(--radius-pill)',
              padding: '0.25rem 0.75rem',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            Join waitlist <ArrowRight size={11} />
          </button>

          <button
            onClick={() => dismissAnnouncement()}
            aria-label="Dismiss announcement"
            style={{
              position: 'absolute',
              right: '1rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(253,252,250,0.4)',
              display: 'flex',
              alignItems: 'center',
              padding: '0.25rem',
            }}
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
