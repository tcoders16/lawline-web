'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  X, ArrowRight, Check, Sparkles,
  Zap, GitBranch, FileText, MessageSquare, Stethoscope,
  Search, BookOpen, Calculator, Scale, Shield, Archive,
  AlertTriangle, TrendingDown, Users, Clock, Mail, FileCheck,
  Link2, Database, Lock, BarChart3, Globe, Smartphone,
  Chrome, FileEdit, Headphones, BookMarked, Layout,
  Layers, Bell, CreditCard, Download,
} from 'lucide-react'

/* ─────────────────────────────────────────────────
   Pricing Tiers
───────────────────────────────────────────────── */
const TIERS = [
  {
    name: 'Solo',
    price: 49,
    period: 'mo',
    trial: '30-day free trial',
    featured: false,
    features: ['40 case files / month', 'AI timeline generation', 'PDF & DOCX export', 'On-device processing'],
  },
  {
    name: 'Team',
    price: 149,
    period: 'mo',
    trial: '14-day free trial',
    featured: true,
    features: ['200 case files / month', 'Shared workspace', 'Priority support', 'All 16 AI agents'],
  },
  {
    name: 'Firm',
    price: 399,
    period: 'mo',
    trial: '14-day free trial',
    featured: false,
    features: ['Unlimited case files', 'SSO / SAML', 'Dedicated account manager', 'Custom integrations'],
  },
] as const

/* ─────────────────────────────────────────────────
   Coming Soon Feature Roadmap — 6 categories × 5-6 features
───────────────────────────────────────────────── */
const ROADMAP = [
  {
    category: 'AI Agents',
    icon: Zap,
    accent: '#B8963E',
    eta: 'Q2 2025',
    features: [
      { icon: AlertTriangle,  label: 'Contract Breach Finder',       status: 'soon',  desc: 'Pin first breach date from agreement + correspondence' },
      { icon: TrendingDown,   label: 'Asset Dissipation Tracker',    status: 'soon',  desc: 'Surface hidden transfers from bank statements' },
      { icon: Users,          label: 'EEOC Charge Analyzer',         status: 'soon',  desc: 'Discrimination pattern timeline from HR files + email' },
      { icon: Clock,          label: 'Standard of Care Timeline',    status: 'soon',  desc: 'Med-mal deviation analysis across 15+ providers' },
      { icon: Scale,          label: 'Arbitration Brief Builder',    status: 'soon',  desc: 'Structure arguments from hearing transcripts + exhibits' },
      { icon: FileCheck,      label: 'Privilege Log Generator',      status: 'soon',  desc: 'Auto-generate privilege log from withheld document set' },
    ],
  },
  {
    category: 'Court & Practice Integrations',
    icon: Link2,
    accent: '#1A3A6B',
    eta: 'Q3 2025',
    features: [
      { icon: Database,       label: 'Clio Integration',             status: 'soon',  desc: 'Auto-import case files and sync timeline outputs' },
      { icon: Database,       label: 'MyCase Sync',                  status: 'soon',  desc: 'Two-way sync with MyCase matters and documents' },
      { icon: Globe,          label: 'PACER / RECAP Import',         status: 'soon',  desc: 'Pull federal docket entries directly into Lawline' },
      { icon: BookMarked,     label: 'Westlaw / Lexis Import',       status: 'soon',  desc: 'Import research documents and link to timeline entries' },
      { icon: FileEdit,       label: 'State E-Filing Connector',     status: 'soon',  desc: 'Generate filing-ready PDFs formatted for state courts' },
      { icon: Archive,        label: 'Filevine Connector',           status: 'soon',  desc: 'Bi-directional sync with Filevine case management' },
    ],
  },
  {
    category: 'Team & Collaboration',
    icon: Users,
    accent: '#2D6B31',
    eta: 'Q2 2025',
    features: [
      { icon: Layout,         label: 'Multi-Attorney Workspaces',    status: 'soon',  desc: 'Shared matters, team timelines, and version history' },
      { icon: FileEdit,       label: 'Inline Comment & Annotation',  status: 'soon',  desc: 'Reviewer comments pinned to exact timeline events' },
      { icon: Layers,         label: 'Role-Based Access Control',    status: 'soon',  desc: 'Partner / Associate / Paralegal / Client permissions' },
      { icon: Globe,          label: 'Client Read-Only Portal',      status: 'soon',  desc: 'Share sanitized timeline with client, no full access' },
      { icon: Bell,           label: 'Matter Assignment Alerts',     status: 'soon',  desc: 'Notify team when new case file is added or ready' },
      { icon: BookMarked,     label: 'Template Library',             status: 'soon',  desc: 'Save and reuse demand letter and timeline templates' },
    ],
  },
  {
    category: 'Security & Compliance',
    icon: Lock,
    accent: '#4A52A0',
    eta: 'Q2 2025',
    features: [
      { icon: Shield,         label: 'Air-Gapped Windows Installer', status: 'soon',  desc: 'Full on-prem installer for Windows Server environments' },
      { icon: FileText,       label: 'Full Audit Log Export',        status: 'soon',  desc: 'SOC 2 Type II–ready per-user action log in CSV/JSON' },
      { icon: Search,         label: 'E-Discovery Export (EDRM)',    status: 'soon',  desc: 'EDRM XML / Concordance load file export for productions' },
      { icon: Lock,           label: 'Per-Document Redaction Trail', status: 'soon',  desc: 'Track every redaction with attorney timestamp and reason' },
      { icon: Users,          label: 'Matter Conflict Checker',      status: 'soon',  desc: 'Flag attorney conflicts across all open matters on-prem' },
      { icon: Shield,         label: 'FedRAMP-Ready Architecture',   status: 'soon',  desc: 'Government / public sector deployment support' },
    ],
  },
  {
    category: 'Analytics & Reporting',
    icon: BarChart3,
    accent: '#B8963E',
    eta: 'Q3 2025',
    features: [
      { icon: BarChart3,      label: 'Firm Productivity Dashboard',  status: 'soon',  desc: 'Hours saved, cases processed, output volume by attorney' },
      { icon: Calculator,     label: 'ROI Report Builder',           status: 'soon',  desc: 'Billable hours saved × rate = value demonstrated to partners' },
      { icon: TrendingDown,   label: 'Settlement Outcome Tracker',   status: 'soon',  desc: 'Track case outcomes correlated with timeline accuracy' },
      { icon: Clock,          label: 'Paralegal Efficiency Metrics', status: 'soon',  desc: 'Before / after time-per-task by paralegal and matter type' },
      { icon: BarChart3,      label: 'Case Pipeline Analytics',      status: 'soon',  desc: 'Active cases, doc volumes, and deadline proximity map' },
      { icon: Bell,           label: 'Weekly Practice Report',       status: 'soon',  desc: 'Auto-generated weekly email summary for managing partners' },
    ],
  },
  {
    category: 'Platform & Mobile',
    icon: Smartphone,
    accent: '#1A3A6B',
    eta: 'Q4 2025',
    features: [
      { icon: Smartphone,     label: 'iOS / iPadOS App',             status: 'soon',  desc: 'Review timelines and approve outputs on iPad at mediation' },
      { icon: Chrome,         label: 'Chrome Extension',             status: 'soon',  desc: 'Capture documents from Gmail and web into Lawline directly' },
      { icon: FileEdit,       label: 'Microsoft Word Add-In',        status: 'soon',  desc: 'Insert AI-generated timelines into Word documents in-place' },
      { icon: Mail,           label: 'Outlook Plugin',               status: 'soon',  desc: 'Flag relevant emails and add to case timeline from Outlook' },
      { icon: Download,       label: 'Offline Processing Mode',      status: 'soon',  desc: 'Full AI pipeline without any network connection required' },
      { icon: Headphones,     label: 'Voice-to-Notes',              status: 'soon',  desc: 'Dictate depo summaries and case notes, auto-structured' },
    ],
  },
] as const

const STATUS_CONFIG = {
  live: { label: 'Live',  bg: 'rgba(45,107,49,0.10)',  color: '#2D6B31', border: 'rgba(45,107,49,0.25)'  },
  beta: { label: 'Beta',  bg: 'rgba(26,58,107,0.10)',  color: '#1A3A6B', border: 'rgba(26,58,107,0.25)'  },
  soon: { label: 'Soon',  bg: 'rgba(184,150,62,0.10)', color: '#B8963E', border: 'rgba(184,150,62,0.30)' },
} as const

type Props = {
  open:    boolean
  tier?:   string
  onClose: () => void
}

export function ComingSoonModal({ open, onClose }: Props) {
  const emailRef = useRef<HTMLInputElement>(null)
  const [activeTab, setActiveTab] = useState<'pricing' | 'roadmap'>('pricing')

  /* Close on Escape */
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  /* Reset to pricing tab each open */
  useEffect(() => { if (open) setActiveTab('pricing') }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 200,
              backgroundColor: 'rgba(28,27,24,0.72)',
              backdropFilter: 'blur(12px)',
            }}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{   opacity: 0, y: 40,  scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 201,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: activeTab === 'roadmap' ? '62rem' : '52rem',
                maxHeight: '90vh',
                background: 'var(--color-parchment)',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: '0 32px 80px rgba(28,27,24,0.35)',
                pointerEvents: 'auto',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                transition: 'max-width 0.3s ease',
              }}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem',
                  zIndex: 10,
                  background: 'var(--color-cream)',
                  border: '1px solid var(--color-warm-100)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.5rem',
                  cursor: 'pointer',
                  color: 'var(--color-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  lineHeight: 0,
                }}
              >
                <X size={16} />
              </button>

              {/* ── Header band ── */}
              <div
                style={{
                  background: 'var(--color-ink)',
                  padding: '2rem 2.5rem 1.5rem',
                  position: 'relative',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}
              >
                {/* Animated shimmer orb */}
                <motion.div
                  animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    top: '-4rem',
                    right: '-4rem',
                    width: '16rem',
                    height: '16rem',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, var(--color-terracotta) 0%, transparent 70%)',
                    opacity: 0.15,
                  }}
                />

                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15, type: 'spring', stiffness: 400 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: 'rgba(184,150,62,0.15)',
                    border: '1px solid rgba(184,150,62,0.35)',
                    borderRadius: 'var(--radius-pill)',
                    padding: '0.3rem 0.875rem',
                    marginBottom: '1rem',
                  }}
                >
                  <motion.div
                    animate={{ rotate: [0, 15, -10, 0] }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <Sparkles size={13} style={{ color: 'var(--color-terracotta)' }} />
                  </motion.div>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.625rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-terracotta)',
                  }}>
                    Launching Soon
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                    fontWeight: 300,
                    letterSpacing: '-0.03em',
                    color: 'var(--color-parchment)',
                    lineHeight: 1.1,
                    marginBottom: '0.625rem',
                  }}
                >
                  We're putting the finishing touches on.
                  <br />
                  <em style={{ color: 'var(--color-terracotta)', fontStyle: 'italic' }}>
                    Be the first in.
                  </em>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: 'rgba(253,252,250,0.6)',
                    lineHeight: 1.6,
                    maxWidth: '32rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  Join the waitlist and lock in early-access pricing.
                  No spam — just a single email when we go live.
                </motion.p>

                {/* Tab switcher */}
                <div style={{
                  display: 'flex',
                  gap: '0.25rem',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 'var(--radius-pill)',
                  padding: '0.25rem',
                  width: 'fit-content',
                }}>
                  {[
                    { id: 'pricing'  as const, label: 'Early Access' },
                    { id: 'roadmap'  as const, label: "What's Coming · 36 features" },
                  ].map(({ id, label }) => (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id)}
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.75rem',
                        fontWeight: activeTab === id ? 500 : 400,
                        color: activeTab === id ? 'var(--color-ink)' : 'rgba(253,252,250,0.5)',
                        background: activeTab === id ? 'var(--color-parchment)' : 'transparent',
                        border: 'none',
                        borderRadius: 'var(--radius-pill)',
                        padding: '0.375rem 0.875rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Body (scrollable) ── */}
              <div style={{ flex: 1, overflowY: 'auto' }}>
                <AnimatePresence mode="wait">

                  {/* ── PRICING TAB ── */}
                  {activeTab === 'pricing' && (
                    <motion.div
                      key="pricing-tab"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      style={{ padding: '2rem 2.5rem 2.5rem' }}
                    >
                      {/* Pricing cards row */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="grid-modal-tiers"
                        style={{ marginBottom: '2rem' }}
                      >
                        {TIERS.map((t, i) => (
                          <motion.div
                            key={t.name}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 + i * 0.07 }}
                            style={{
                              padding: '1.25rem',
                              borderRadius: 'var(--radius-lg)',
                              border: t.featured
                                ? '1.5px solid rgba(184,150,62,0.5)'
                                : '1px solid var(--color-warm-100)',
                              background: t.featured
                                ? 'rgba(184,150,62,0.06)'
                                : 'var(--color-cream)',
                              position: 'relative',
                            }}
                          >
                            {t.featured && (
                              <span style={{
                                position: 'absolute',
                                top: '-1px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                background: 'var(--color-terracotta)',
                                color: 'var(--color-parchment)',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.5rem',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                padding: '0.2rem 0.625rem',
                                borderRadius: '0 0 6px 6px',
                                whiteSpace: 'nowrap',
                              }}>
                                Most Popular
                              </span>
                            )}

                            <div style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.5625rem',
                              letterSpacing: '0.1em',
                              textTransform: 'uppercase',
                              color: t.featured ? 'var(--color-terracotta)' : 'var(--color-faint)',
                              marginBottom: '0.625rem',
                            }}>
                              {t.name}
                            </div>

                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.25 + i * 0.08, type: 'spring', stiffness: 400 }}
                              style={{ display: 'flex', alignItems: 'baseline', gap: '0.2rem', marginBottom: '0.25rem' }}
                            >
                              <span style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '2rem',
                                fontWeight: 300,
                                letterSpacing: '-0.04em',
                                color: 'var(--color-ink)',
                                lineHeight: 1,
                              }}>
                                ${t.price}
                              </span>
                              <span style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.5625rem',
                                color: 'var(--color-faint)',
                                letterSpacing: '0.05em',
                              }}>
                                /{t.period}
                              </span>
                            </motion.div>

                            <div style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.5625rem',
                              letterSpacing: '0.06em',
                              color: 'var(--color-terracotta)',
                              textTransform: 'uppercase',
                              marginBottom: '0.875rem',
                            }}>
                              {t.trial}
                            </div>

                            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                              {t.features.map(f => (
                                <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.375rem' }}>
                                  <Check size={11} style={{ color: '#2D6B31', flexShrink: 0, marginTop: '0.15rem' }} />
                                  <span style={{
                                    fontFamily: 'var(--font-body)',
                                    fontSize: '0.75rem',
                                    color: 'var(--color-muted)',
                                    lineHeight: 1.4,
                                  }}>
                                    {f}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        ))}
                      </motion.div>

                      {/* Waitlist email form */}
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                      >
                        <div style={{
                          background: 'var(--color-cream)',
                          border: '1px solid var(--color-warm-100)',
                          borderRadius: 'var(--radius-lg)',
                          padding: '1.5rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '1rem',
                        }}>
                          <div>
                            <div style={{
                              fontFamily: 'var(--font-ui)',
                              fontSize: '0.9375rem',
                              fontWeight: 600,
                              letterSpacing: '-0.015em',
                              color: 'var(--color-ink)',
                              marginBottom: '0.25rem',
                            }}>
                              Join the early-access waitlist
                            </div>
                            <div style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: '0.8125rem',
                              color: 'var(--color-muted)',
                            }}>
                              First 100 firms get 3 months free on any plan.
                            </div>
                          </div>

                          <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <input
                              ref={emailRef}
                              type="email"
                              placeholder="your@firm.com"
                              style={{
                                flex: 1,
                                padding: '0.75rem 1rem',
                                border: '1px solid var(--color-warm-100)',
                                borderRadius: 'var(--radius-md)',
                                background: 'var(--color-parchment)',
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.875rem',
                                color: 'var(--color-ink)',
                                outline: 'none',
                              }}
                              onFocus={e => {
                                e.currentTarget.style.borderColor = 'var(--color-terracotta)'
                                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(184,150,62,0.12)'
                              }}
                              onBlur={e => {
                                e.currentTarget.style.borderColor = 'var(--color-warm-100)'
                                e.currentTarget.style.boxShadow = 'none'
                              }}
                            />
                            <button
                              className="btn-primary"
                              style={{ whiteSpace: 'nowrap', gap: '0.375rem' }}
                              onClick={() => {
                                const email = emailRef.current?.value
                                if (email?.includes('@')) {
                                  alert(`✓ ${email} added to waitlist!`)
                                  onClose()
                                }
                              }}
                            >
                              Notify me
                              <ArrowRight size={14} />
                            </button>
                          </div>

                          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                            {['No credit card required', 'Cancel anytime', 'SOC 2 compliant'].map(t => (
                              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                <Check size={11} style={{ color: '#2D6B31' }} />
                                <span style={{
                                  fontFamily: 'var(--font-mono)',
                                  fontSize: '0.5625rem',
                                  letterSpacing: '0.06em',
                                  textTransform: 'uppercase',
                                  color: 'var(--color-faint)',
                                }}>
                                  {t}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>

                      {/* Alt action */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.45 }}
                        style={{ marginTop: '1.25rem', textAlign: 'center' }}
                      >
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--color-faint)' }}>
                          Want to see it in action first?{' '}
                        </span>
                        <Link
                          href="/insights"
                          onClick={onClose}
                          style={{
                            fontFamily: 'var(--font-ui)',
                            fontSize: '0.8125rem',
                            fontWeight: 500,
                            color: 'var(--color-terracotta)',
                            textDecoration: 'none',
                          }}
                        >
                          Read case studies →
                        </Link>
                      </motion.div>
                    </motion.div>
                  )}

                  {/* ── ROADMAP TAB ── */}
                  {activeTab === 'roadmap' && (
                    <motion.div
                      key="roadmap-tab"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      style={{ padding: '2rem 2.5rem 2.5rem' }}
                    >
                      {/* Header */}
                      <div style={{ marginBottom: '1.75rem' }}>
                        <h3 style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.5rem',
                          fontWeight: 300,
                          letterSpacing: '-0.025em',
                          color: 'var(--color-ink)',
                          marginBottom: '0.375rem',
                        }}>
                          36 features shipping in 2025
                        </h3>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.875rem',
                          color: 'var(--color-muted)',
                          lineHeight: 1.6,
                        }}>
                          Built from feedback by practicing litigators. Every item below came from a real attorney request.
                        </p>
                      </div>

                      {/* Category grid */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                        {ROADMAP.map(({ category, icon: CatIcon, accent, eta, features }, ci) => (
                          <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: ci * 0.07 }}
                          >
                            {/* Category header */}
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.625rem',
                              marginBottom: '0.875rem',
                            }}>
                              <div style={{
                                width: 28, height: 28,
                                borderRadius: 'var(--radius-sm)',
                                background: `${accent}12`,
                                border: `1px solid ${accent}28`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexShrink: 0,
                              }}>
                                <CatIcon size={13} style={{ color: accent }} />
                              </div>
                              <span style={{
                                fontFamily: 'var(--font-ui)',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                color: 'var(--color-ink)',
                                letterSpacing: '-0.01em',
                              }}>
                                {category}
                              </span>
                              <span style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.4375rem',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                color: accent,
                                background: `${accent}0E`,
                                border: `1px solid ${accent}25`,
                                padding: '0.15rem 0.5rem',
                                borderRadius: 'var(--radius-pill)',
                              }}>
                                {eta}
                              </span>
                            </div>

                            {/* Feature cards */}
                            <div style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                              gap: '0.5rem',
                            }}>
                              {features.map(({ icon: FIcon, label, status, desc }) => (
                                <div
                                  key={label}
                                  style={{
                                    padding: '0.75rem',
                                    background: 'var(--color-cream)',
                                    border: '1px solid var(--color-warm-100)',
                                    borderRadius: 'var(--radius-md)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.375rem',
                                  }}
                                >
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                                    <FIcon size={12} style={{ color: accent, flexShrink: 0 }} />
                                    <span style={{
                                      fontFamily: 'var(--font-ui)',
                                      fontSize: '0.75rem',
                                      fontWeight: 500,
                                      color: 'var(--color-ink)',
                                      flex: 1,
                                    }}>
                                      {label}
                                    </span>
                                    <span style={{
                                      fontFamily: 'var(--font-mono)',
                                      fontSize: '0.3875rem',
                                      letterSpacing: '0.08em',
                                      textTransform: 'uppercase',
                                      color: STATUS_CONFIG[status].color,
                                      background: STATUS_CONFIG[status].bg,
                                      border: `1px solid ${STATUS_CONFIG[status].border}`,
                                      padding: '0.1rem 0.35rem',
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
                                    lineHeight: 1.4,
                                  }}>
                                    {desc}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Bottom CTA */}
                      <div style={{
                        marginTop: '2rem',
                        padding: '1.25rem',
                        background: 'var(--color-ink)',
                        borderRadius: 'var(--radius-lg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem',
                        flexWrap: 'wrap',
                      }}>
                        <div>
                          <div style={{
                            fontFamily: 'var(--font-ui)',
                            fontSize: '0.9375rem',
                            fontWeight: 600,
                            color: 'var(--color-parchment)',
                            letterSpacing: '-0.015em',
                            marginBottom: '0.2rem',
                          }}>
                            Want early access to everything on this list?
                          </div>
                          <div style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.8125rem',
                            color: 'rgba(253,252,250,0.55)',
                          }}>
                            Join the waitlist — first 100 firms get 3 months free.
                          </div>
                        </div>
                        <button
                          onClick={() => setActiveTab('pricing')}
                          className="btn-primary"
                          style={{ whiteSpace: 'nowrap', gap: '0.375rem', cursor: 'pointer', border: 'none' }}
                        >
                          Join waitlist
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
