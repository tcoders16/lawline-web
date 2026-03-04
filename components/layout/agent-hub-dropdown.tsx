'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GitBranch, FileText, MessageSquare, Stethoscope,
  Search, BookOpen, Calculator, Scale, FileCheck,
  Shield, Archive, AlertTriangle, TrendingDown,
  Users, Clock, Mail, ChevronRight, Zap,
} from 'lucide-react'

/* ─────────────────────────────────────────────────
   16 Agentic Workflows — specific legal tasks
───────────────────────────────────────────────── */
const AGENT_WORKFLOWS = [
  {
    icon: GitBranch,
    title: 'Case Timeline Builder',
    description: 'Source-linked chronology from 800+ pages in 42 seconds',
    status: 'live' as const,
    accent: '#B8963E',
  },
  {
    icon: FileText,
    title: 'Demand Letter Generator',
    description: 'Full demand with damages tally from medical records & invoices',
    status: 'live' as const,
    accent: '#1A3A6B',
  },
  {
    icon: MessageSquare,
    title: 'Deposition Prep Kit',
    description: 'Cross-exam outlines + inconsistency flags from all transcripts',
    status: 'live' as const,
    accent: '#B8963E',
  },
  {
    icon: Stethoscope,
    title: 'Medical Record Analyzer',
    description: 'Provider-by-provider breakdown, treatment gaps & billing errors',
    status: 'live' as const,
    accent: '#2D6B31',
  },
  {
    icon: Search,
    title: 'Discovery Review',
    description: 'Responsiveness, privilege & relevance tags across full production',
    status: 'beta' as const,
    accent: '#1A3A6B',
  },
  {
    icon: BookOpen,
    title: 'Expert Report Cross-Ref',
    description: 'Contradictions between expert opinions flagged before trial',
    status: 'live' as const,
    accent: '#B8963E',
  },
  {
    icon: Calculator,
    title: 'Damages Calculator',
    description: 'Medical expenses totaled with per-invoice source citation',
    status: 'live' as const,
    accent: '#1A3A6B',
  },
  {
    icon: Scale,
    title: 'Settlement Authority Memo',
    description: 'Confidential memo from case strengths + exposure analysis',
    status: 'beta' as const,
    accent: '#B8963E',
  },
  {
    icon: FileCheck,
    title: 'Privilege Log Generator',
    description: 'Auto-generate privilege log from withheld document set',
    status: 'soon' as const,
    accent: '#4A52A0',
  },
  {
    icon: Archive,
    title: 'Exhibit Indexer',
    description: 'Auto-index and Bates-number exhibit pages with full exhibit list',
    status: 'beta' as const,
    accent: '#2D6B31',
  },
  {
    icon: AlertTriangle,
    title: 'Contract Breach Finder',
    description: 'Pin first breach date from agreement + correspondence chain',
    status: 'soon' as const,
    accent: '#B8963E',
  },
  {
    icon: TrendingDown,
    title: 'Asset Dissipation Tracker',
    description: 'Surface hidden transfers across bank statements & financials',
    status: 'soon' as const,
    accent: '#1A3A6B',
  },
  {
    icon: Users,
    title: 'EEOC Charge Analyzer',
    description: 'Discrimination pattern timeline from HR records + email review',
    status: 'soon' as const,
    accent: '#4A52A0',
  },
  {
    icon: Clock,
    title: 'Standard of Care Timeline',
    description: 'Med-mal deviation analysis across 15+ treating providers',
    status: 'soon' as const,
    accent: '#B8963E',
  },
  {
    icon: Mail,
    title: 'Client Status Letter',
    description: "Plain-language update in your firm's voice from case activity",
    status: 'beta' as const,
    accent: '#2D6B31',
  },
  {
    icon: Shield,
    title: 'Deposition Summary',
    description: 'Issue-by-issue deposition breakdown ready for attorney review',
    status: 'live' as const,
    accent: '#1A3A6B',
  },
] as const

const STATUS_CONFIG = {
  live:  { label: 'Live',  bg: 'rgba(45,107,49,0.10)',   color: '#2D6B31',  border: 'rgba(45,107,49,0.25)'  },
  beta:  { label: 'Beta',  bg: 'rgba(26,58,107,0.10)',   color: '#1A3A6B',  border: 'rgba(26,58,107,0.25)'  },
  soon:  { label: 'Soon',  bg: 'rgba(184,150,62,0.10)',  color: '#B8963E',  border: 'rgba(184,150,62,0.30)' },
} as const

type Props = {
  open:    boolean
  onClose: () => void
}

export function AgentHubDropdown({ open, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  /* Close on outside click */
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    const t = setTimeout(() => document.addEventListener('mousedown', handler), 100)
    return () => { clearTimeout(t); document.removeEventListener('mousedown', handler) }
  }, [open, onClose])

  /* Close on Escape */
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          key="agent-hub-dropdown"
          initial={{ opacity: 0, y: -10, scale: 0.97 }}
          animate={{ opacity: 1,  y: 0,   scale: 1     }}
          exit={{   opacity: 0,  y: -8,   scale: 0.98  }}
          transition={{ duration: 0.18, ease: [0.19, 1, 0.22, 1] }}
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 100,
            width: 'min(92vw, 820px)',
            background: 'var(--color-parchment)',
            border: '1px solid var(--color-warm-100)',
            borderTop: '2px solid rgba(184,150,62,0.35)',
            borderRadius: '0 0 var(--radius-xl) var(--radius-xl)',
            boxShadow: '0 24px 64px rgba(10,16,32,0.14), 0 4px 16px rgba(10,16,32,0.06)',
            overflow: 'hidden',
          }}
        >

          {/* ── Header ── */}
          <div
            style={{
              padding: '1rem 1.25rem',
              borderBottom: '1px solid var(--color-warm-100)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'var(--color-cream)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <div
                style={{
                  width: 30, height: 30,
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(184,150,62,0.12)',
                  border: '1px solid rgba(184,150,62,0.28)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Zap size={14} style={{ color: '#B8963E' }} />
              </div>
              <div>
                <div style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--color-ink)',
                  letterSpacing: '-0.01em',
                }}>
                  Agent Hub
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-faint)',
                }}>
                  16 agentic legal workflows
                </div>
              </div>
            </div>

            {/* Status legend */}
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {(['live', 'beta', 'soon'] as const).map(s => (
                <span
                  key={s}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.4375rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: STATUS_CONFIG[s].color,
                    background: STATUS_CONFIG[s].bg,
                    border: `1px solid ${STATUS_CONFIG[s].border}`,
                    padding: '0.175rem 0.5rem',
                    borderRadius: 'var(--radius-pill)',
                  }}
                >
                  {STATUS_CONFIG[s].label}
                </span>
              ))}
            </div>
          </div>

          {/* ── Workflow Grid ── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
              gap: '0',
              padding: '0.625rem',
              maxHeight: '400px',
              overflowY: 'auto',
            }}
          >
            {AGENT_WORKFLOWS.map(({ icon: Icon, title, description, status, accent }, i) => (
              <motion.button
                key={title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.02 }}
                onClick={onClose}
                whileHover={{ background: `${accent}08` }}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  padding: '0.75rem 0.875rem',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.15s ease',
                }}
              >
                {/* Icon box */}
                <div
                  style={{
                    width: 32, height: 32, flexShrink: 0,
                    borderRadius: '6px',
                    background: `${accent}10`,
                    border: `1px solid ${accent}22`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <Icon size={14} style={{ color: accent }} />
                </div>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.175rem', flexWrap: 'wrap' }}>
                    <span style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.8125rem',
                      fontWeight: 500,
                      color: 'var(--color-ink)',
                      letterSpacing: '-0.01em',
                    }}>
                      {title}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.4rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: STATUS_CONFIG[status].color,
                      background: STATUS_CONFIG[status].bg,
                      border: `1px solid ${STATUS_CONFIG[status].border}`,
                      padding: '0.1rem 0.375rem',
                      borderRadius: 'var(--radius-pill)',
                      flexShrink: 0,
                    }}>
                      {STATUS_CONFIG[status].label}
                    </span>
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.6875rem',
                    color: 'var(--color-muted)',
                    lineHeight: 1.45,
                    display: 'block',
                  }}>
                    {description}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* ── Footer ── */}
          <div
            style={{
              padding: '0.75rem 1.25rem',
              borderTop: '1px solid var(--color-warm-100)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'var(--color-cream)',
            }}
          >
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.475rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-faint)',
            }}>
              All workflows run on-device · no data leaves your walls
            </span>
            <Link
              href="/agents"
              onClick={onClose}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontFamily: 'var(--font-ui)',
                fontSize: '0.75rem',
                fontWeight: 500,
                color: 'var(--color-terracotta)',
                textDecoration: 'none',
              }}
            >
              View all agents <ChevronRight size={12} />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
