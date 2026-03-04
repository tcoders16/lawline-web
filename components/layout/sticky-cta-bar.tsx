'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, X, Zap } from 'lucide-react'
import { useApp } from '@/components/providers/app-providers'

export function StickyCtaBar() {
  const { openComingSoon } = useApp()
  const [visible,   setVisible]   = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (dismissed) return
    const onScroll = () => {
      const scrollPct = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      if (scrollPct > 0.35 && !visible) setVisible(true)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [dismissed, visible])

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        /* Outer wrapper handles centering — keeps framer-motion transform clean */
        <div style={{ position: 'fixed', bottom: '1.5rem', left: 0, right: 0, zIndex: 90, display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
        <motion.div
          key="sticky-cta"
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          style={{
            display:      'flex',
            alignItems:   'center',
            gap:          '0',
            background:   '#0D1729',
            border:       '1px solid rgba(184,150,62,0.28)',
            borderRadius: 'var(--radius-pill)',
            boxShadow:    '0 20px 60px rgba(10,16,32,0.40), 0 4px 16px rgba(10,16,32,0.25)',
            backdropFilter: 'blur(20px)',
            width:        'min(92vw, 520px)',
            overflow:     'hidden',
            pointerEvents: 'auto',
          }}
        >
          {/* Left: icon + copy */}
          <div style={{
            display:     'flex',
            alignItems:  'center',
            gap:         '0.75rem',
            padding:     '0.875rem 1.125rem',
            flex:        1,
            minWidth:    0,
          }}>
            {/* Pulsing icon */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <motion.div
                animate={{ scale: [1, 1.8, 1], opacity: [0.35, 0, 0.35] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position:     'absolute',
                  inset:        -5,
                  borderRadius: '50%',
                  background:   '#B8963E',
                }}
              />
              <div style={{
                width:           28,
                height:          28,
                borderRadius:    '50%',
                background:      'rgba(184,150,62,0.15)',
                border:          '1px solid rgba(184,150,62,0.4)',
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'center',
                position:        'relative',
              }}>
                <Zap size={12} style={{ color: '#B8963E' }} />
              </div>
            </div>

            {/* Copy */}
            <div style={{ minWidth: 0 }}>
              <div style={{
                fontFamily:    'var(--font-ui)',
                fontSize:      '0.875rem',
                fontWeight:    600,
                color:         '#FDFCFA',
                letterSpacing: '-0.01em',
                lineHeight:    1.2,
                whiteSpace:    'nowrap',
                overflow:      'hidden',
                textOverflow:  'ellipsis',
              }}>
                42 seconds per case file
              </div>
              <div className="sticky-sub-label" style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.5625rem',
                letterSpacing: '0.09em',
                textTransform: 'uppercase',
                color:         'rgba(253,252,250,0.4)',
                marginTop:     '0.1rem',
              }}>
                First 100 firms · 3 months free
              </div>
            </div>
          </div>

          {/* CTA pill */}
          <div style={{ padding: '0.5rem 0.5rem 0.5rem 0', flexShrink: 0 }}>
            <motion.button
              onClick={() => openComingSoon()}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display:        'flex',
                alignItems:     'center',
                gap:            '0.35rem',
                fontFamily:     'var(--font-ui)',
                fontSize:       '0.8125rem',
                fontWeight:     600,
                color:          '#0D1729',
                background:     'linear-gradient(135deg, #E4C068, #C9A84C)',
                border:         'none',
                borderRadius:   '999px',
                padding:        '0.55rem 1.125rem',
                cursor:         'pointer',
                letterSpacing:  '-0.01em',
                whiteSpace:     'nowrap',
                boxShadow:      '0 0 18px rgba(201,168,76,0.55), 0 2px 6px rgba(0,0,0,0.25)',
              }}
            >
              Get early access <ArrowRight size={12} />
            </motion.button>
          </div>

          {/* Dismiss */}
          <button
            onClick={() => { setDismissed(true); setVisible(false) }}
            aria-label="Dismiss"
            style={{
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              background:     'none',
              border:         'none',
              borderLeft:     '1px solid rgba(255,255,255,0.07)',
              padding:        '0 0.875rem',
              cursor:         'pointer',
              color:          'rgba(253,252,250,0.35)',
              alignSelf:      'stretch',
              flexShrink:     0,
              transition:     'color 0.15s ease',
            }}
          >
            <X size={13} />
          </button>
        </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
