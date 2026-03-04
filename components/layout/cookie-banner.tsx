'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X, Check } from 'lucide-react'

const STORAGE_KEY = 'lawline-cookie-consent'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY)
    if (!consent) {
      const t = setTimeout(() => setVisible(true), 2500)
      return () => clearTimeout(t)
    }
  }, [])

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-banner"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          style={{
            position: 'fixed',
            bottom: '5rem',
            left: '1.5rem',
            zIndex: 80,
            maxWidth: '360px',
            background: 'var(--color-ink)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.25rem',
            boxShadow: '0 16px 48px rgba(10,16,32,0.3)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{
              width: 32, height: 32, flexShrink: 0,
              borderRadius: 'var(--radius-md)',
              background: 'rgba(184,150,62,0.12)',
              border: '1px solid rgba(184,150,62,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Cookie size={14} style={{ color: '#B8963E' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--color-parchment)',
                letterSpacing: '-0.01em',
                marginBottom: '0.375rem',
              }}>
                We use minimal cookies
              </div>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                color: 'rgba(253,252,250,0.55)',
                lineHeight: 1.5,
                margin: 0,
              }}>
                Only essential cookies for session management. No tracking, no advertising. Your documents always stay on your hardware.
              </p>
            </div>

            <button
              onClick={decline}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'rgba(253,252,250,0.3)',
                flexShrink: 0,
                padding: '0.1rem',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <X size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', gap: '0.625rem' }}>
            <button
              onClick={decline}
              style={{
                flex: 1,
                fontFamily: 'var(--font-ui)',
                fontSize: '0.8125rem',
                fontWeight: 500,
                color: 'rgba(253,252,250,0.5)',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 'var(--radius-md)',
                padding: '0.625rem',
                cursor: 'pointer',
                transition: 'background 0.2s ease',
              }}
            >
              Decline
            </button>
            <button
              onClick={accept}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.375rem',
                fontFamily: 'var(--font-ui)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: 'var(--color-ink)',
                background: '#D4AE58',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                padding: '0.625rem',
                cursor: 'pointer',
              }}
            >
              <Check size={13} /> Accept
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
