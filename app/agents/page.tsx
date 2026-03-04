'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import {
  GitBranch, FileText, MessageSquare, Stethoscope,
  Search, BookOpen, Calculator, Scale, FileCheck,
  Shield, Archive, AlertTriangle, TrendingDown,
  Users, Clock, Mail, Zap, ArrowRight, Check, Lock,
  Server, ChevronRight,
} from 'lucide-react'
import { useApp } from '@/components/providers/app-providers'

/* ─────────────────────────────────────────────────────
   AGENT DATA — full descriptions + plan + capabilities
───────────────────────────────────────────────────── */
type AgentStatus = 'live' | 'beta' | 'soon'
type AgentPlan   = 'solo' | 'team' | 'firm'

interface Agent {
  icon:         React.ElementType
  title:        string
  tagline:      string
  description:  string
  capabilities: string[]
  status:       AgentStatus
  plan:         AgentPlan
  accent:       string
  category:     string
  inputTypes:   string[]
  outputTypes:  string[]
}

const AGENTS: Agent[] = [
  /* ── Case Intelligence ── */
  {
    icon:        GitBranch,
    title:       'Case Timeline Builder',
    tagline:     'Source-linked chronology in 42 seconds',
    description: 'Upload the full case dump — depositions, ER records, police reports, expert opinions, all at once. Lawline reads every page, extracts every date-stamped event, and builds a colour-coded, source-cited chronology. Each entry links back to the exact page and line it came from, so you can verify in one click.',
    capabilities: [
      'Processes 800+ pages simultaneously from PDF, DOCX, or scanned docs',
      'Flags treatment gaps, inconsistencies, and contradictions automatically',
      'Source citation on every event — click to jump to originating page',
      'Exports to Word, Excel, or PDF ready for mediation binders',
    ],
    status:      'live',
    plan:        'solo',
    accent:      '#B8963E',
    category:    'Case Intelligence',
    inputTypes:  ['Depositions', 'Medical records', 'Police reports', 'Expert opinions'],
    outputTypes: ['Chronology PDF', 'Excel timeline', 'Word doc'],
  },
  {
    icon:        Stethoscope,
    title:       'Medical Record Analyzer',
    tagline:     'Provider-by-provider breakdown with billing audit',
    description: 'Lawline reads every page of every treating provider\'s records and synthesises a structured breakdown: who treated the client, on what dates, with what diagnoses, and what was billed. Treatment gaps — a classic IME attack vector — are flagged automatically with supporting page cites.',
    capabilities: [
      'Identifies every treating provider with date ranges and diagnosis codes',
      'Flags 6-month+ treatment gaps that oppose counsel will exploit',
      'Line-item billing reconciliation to catch duplicate or unsupported charges',
      'Produces provider-by-provider summary table ready for demand section',
    ],
    status:      'live',
    plan:        'solo',
    accent:      '#2D6B31',
    category:    'Case Intelligence',
    inputTypes:  ['Medical records', 'Billing invoices', 'EOB statements'],
    outputTypes: ['Provider summary', 'Gap analysis', 'Billing audit'],
  },
  {
    icon:        BookOpen,
    title:       'Expert Report Cross-Ref',
    tagline:     'Contradictions between experts flagged before trial',
    description: 'Upload every expert report in the case — yours and theirs. Lawline reads each one and maps where opinions conflict: causation disagreements, standard-of-care differences, damages methodology gaps. Every contradiction surfaces with a side-by-side quote from the originating reports.',
    capabilities: [
      'Compares unlimited expert reports across plaintiff and defence',
      'Side-by-side quote extraction for each identified contradiction',
      'Organized by issue type: causation, standard of care, damages, prognosis',
      'Ready-to-use cross-examination fodder with page and line references',
    ],
    status:      'live',
    plan:        'solo',
    accent:      '#B8963E',
    category:    'Case Intelligence',
    inputTypes:  ['Expert reports', 'IME reports', 'Rebuttal reports'],
    outputTypes: ['Contradiction matrix', 'Cross-exam prep'],
  },
  {
    icon:        Clock,
    title:       'Standard of Care Timeline',
    tagline:     'Med-mal deviation analysis across 15+ treating providers',
    description: 'Built specifically for medical malpractice. Lawline maps every clinical decision against published standard-of-care guidelines, identifies the moment of deviation, and charts the causal chain from breach to harm. Designed with input from med-mal litigators and nurse consultants.',
    capabilities: [
      'Event-by-event comparison against specialty-specific SOC guidelines',
      'Identifies deviation point with exact date, provider, and decision',
      'Causal chain analysis from breach through injury and damages',
      'Expert affidavit draft scaffold for each identified deviation',
    ],
    status:      'soon',
    plan:        'firm',
    accent:      '#B8963E',
    category:    'Case Intelligence',
    inputTypes:  ['Medical records', 'Hospital charts', 'Clinical notes'],
    outputTypes: ['SOC deviation report', 'Causal chain map'],
  },

  /* ── Document Generation ── */
  {
    icon:        FileText,
    title:       'Demand Letter Generator',
    tagline:     'Full demand with auto-calculated damages tally',
    description: 'From raw medical records and invoices to a signed demand letter — one click. Lawline totals every documented expense, synthesises the treatment narrative, calculates lost wages from employment records, and drafts the demand in your firm\'s voice. Attorney review time drops to 15 minutes.',
    capabilities: [
      'Auto-calculates past medical, future medical, lost wages, and general damages',
      'Synthesises treatment narrative from all provider records',
      'Adapts to your firm\'s tone and formatting with a one-time style upload',
      'Flags items that need attorney judgment before finalising',
    ],
    status:      'live',
    plan:        'solo',
    accent:      '#1A3A6B',
    category:    'Document Generation',
    inputTypes:  ['Medical records', 'Billing invoices', 'Employment records'],
    outputTypes: ['Demand letter DOCX', 'Damages calculation sheet'],
  },
  {
    icon:        Shield,
    title:       'Deposition Summary',
    tagline:     'Issue-by-issue breakdown ready for attorney review',
    description: 'Upload the deposition transcript and Lawline produces a structured, issue-by-issue summary: testimony on liability, causation, damages, and credibility — each section with exact page-and-line citations. Summaries that take paralegals 4–6 hours are ready in under 2 minutes.',
    capabilities: [
      'Organises by issue type: liability, causation, damages, credibility',
      'Every summary point cited to exact page and line number',
      'Inconsistency flags when testimony contradicts prior statements or documents',
      'Exports as Word doc formatted for deposition binder insertion',
    ],
    status:      'live',
    plan:        'solo',
    accent:      '#1A3A6B',
    category:    'Document Generation',
    inputTypes:  ['Deposition transcripts', 'Prior statements'],
    outputTypes: ['Issue summary', 'Inconsistency report'],
  },
  {
    icon:        Mail,
    title:       'Client Status Letter',
    tagline:     "Plain-language update in your firm's voice",
    description: 'Lawline reads recent case activity — filings, medical appointments, insurance correspondence — and drafts a plain-language client update letter. No legal jargon. Warm, clear, and formatted in your firm letterhead style. Clients feel informed; attorneys save 30 minutes per case per month.',
    capabilities: [
      'Reads case activity from uploaded documents and hearing notes',
      'Plain-language translation of complex legal developments',
      'Adapts to your firm\'s letterhead style and tone preferences',
      'Flags items that require attorney personalisation before sending',
    ],
    status:      'beta',
    plan:        'team',
    accent:      '#2D6B31',
    category:    'Document Generation',
    inputTypes:  ['Case notes', 'Filings', 'Correspondence'],
    outputTypes: ['Client letter DOCX'],
  },
  {
    icon:        FileCheck,
    title:       'Privilege Log Generator',
    tagline:     'Auto-generate privilege log from withheld document set',
    description: 'Mark documents as withheld and Lawline auto-generates a compliant privilege log: document description, date, author, recipients, privilege basis, and Bates number — formatted to your jurisdiction\'s discovery rules. What takes paralegals days takes Lawline minutes.',
    capabilities: [
      'Identifies author, recipient, date, and subject from each withheld doc',
      'Applies correct privilege basis: attorney-client, work product, or common interest',
      'Jurisdiction-aware formatting for federal and state court requirements',
      'Exportable to Excel or Word for opposing counsel production',
    ],
    status:      'soon',
    plan:        'firm',
    accent:      '#4A52A0',
    category:    'Document Generation',
    inputTypes:  ['Withheld document set', 'Attorney correspondence'],
    outputTypes: ['Privilege log Excel', 'Log DOCX'],
  },

  /* ── Discovery & Review ── */
  {
    icon:        Search,
    title:       'Discovery Review',
    tagline:     'Responsiveness, privilege & relevance tagging at scale',
    description: 'Upload the full production — thousands of documents — and Lawline reviews every page for responsiveness to each discovery request, privilege flags, and relevance tagging. What takes a document review vendor weeks and $240K takes Lawline a weekend.',
    capabilities: [
      'Responsive or non-responsive determination against each RFP',
      'Privilege flagging with basis identification for each flagged doc',
      'Issue-code relevance tagging across up to 50 custom issue codes',
      'Quality control sampling with confidence scores per determination',
    ],
    status:      'beta',
    plan:        'team',
    accent:      '#1A3A6B',
    category:    'Discovery & Review',
    inputTypes:  ['Full document production', 'RFP list'],
    outputTypes: ['Review database', 'Privilege log', 'Responsiveness report'],
  },
  {
    icon:        Archive,
    title:       'Exhibit Indexer',
    tagline:     'Bates-number and index every exhibit automatically',
    description: 'Upload your trial exhibits and Lawline auto-assigns Bates numbers, generates a complete exhibit index with description, page count, and source, and creates a formatted exhibit list for court submission. Hours of paralegal work reduced to minutes.',
    capabilities: [
      'Auto-assigns Bates numbers sequentially across all uploaded exhibits',
      'Generates exhibit descriptions from document content analysis',
      'Produces court-formatted exhibit list with page counts',
      'Cross-references exhibits to deposition citations and witness lists',
    ],
    status:      'beta',
    plan:        'team',
    accent:      '#2D6B31',
    category:    'Discovery & Review',
    inputTypes:  ['Trial exhibits', 'Document production'],
    outputTypes: ['Bates-numbered set', 'Exhibit index', 'Court exhibit list'],
  },
  {
    icon:        MessageSquare,
    title:       'Deposition Prep Kit',
    tagline:     'Cross-exam outlines + inconsistency flags from all transcripts',
    description: 'Feed Lawline all prior testimony — depositions, recorded statements, prior-case testimony — and it builds a cross-examination outline organised by theme. Every inconsistency between statements is flagged with the originating transcript cite, ready to use in the examination room.',
    capabilities: [
      'Cross-exam outline organised by theme: credibility, liability, causation, damages',
      'Inconsistency map comparing all prior statements for the same witness',
      'Impeachment material with transcript page and line for each contradiction',
      'Suggested follow-up question chains for each inconsistency surfaced',
    ],
    status:      'live',
    plan:        'solo',
    accent:      '#B8963E',
    category:    'Discovery & Review',
    inputTypes:  ['Deposition transcripts', 'Prior statements', 'Recorded interviews'],
    outputTypes: ['Cross-exam outline', 'Inconsistency map'],
  },

  /* ── Financial Analysis ── */
  {
    icon:        Calculator,
    title:       'Damages Calculator',
    tagline:     'Medical expenses totaled with per-invoice source citation',
    description: 'Lawline reads every invoice, EOB, and billing statement and produces a categorised damages table: past medical by provider, future medical projections, lost wages by pay period, and household services. Every line item is cited back to the originating invoice page.',
    capabilities: [
      'Itemises past medical expenses by provider with date and diagnosis code',
      'Lost wage calculation from employment records and W-2s',
      'Future damages projection framework for long-term injury cases',
      'Per-invoice source citation so adjusters can verify every dollar',
    ],
    status:      'live',
    plan:        'solo',
    accent:      '#1A3A6B',
    category:    'Financial Analysis',
    inputTypes:  ['Medical bills', 'EOBs', 'Employment records', 'Pay stubs'],
    outputTypes: ['Damages table Excel', 'Damages summary PDF'],
  },
  {
    icon:        Scale,
    title:       'Settlement Authority Memo',
    tagline:     'Confidential memo from case strengths + exposure analysis',
    description: 'Lawline analyses liability strength, damages documentation, venue tendencies, and comparable verdicts to produce a confidential settlement authority memo for partner review. The memo includes upside/downside ranges with supporting rationale for each figure.',
    capabilities: [
      'Liability strength assessment from available evidence and expert opinions',
      'Comparable verdict and settlement analysis for the venue and case type',
      'Upside / downside range with probability-weighted expected value',
      'Risk factor matrix: statute of limitations, comparative fault, insurance limits',
    ],
    status:      'beta',
    plan:        'team',
    accent:      '#B8963E',
    category:    'Financial Analysis',
    inputTypes:  ['Case file', 'Expert reports', 'Comparable verdicts'],
    outputTypes: ['Settlement authority memo', 'Risk matrix'],
  },
  {
    icon:        TrendingDown,
    title:       'Asset Dissipation Tracker',
    tagline:     'Surface hidden transfers across bank statements & financials',
    description: 'Designed for divorce, fraudulent transfer, and judgment enforcement matters. Upload bank statements, financial disclosures, and tax returns — Lawline traces fund flows, flags suspicious timing patterns, and identifies transfers that may constitute dissipation of marital or judgment assets.',
    capabilities: [
      'Transaction-level analysis across multiple accounts and time periods',
      'Pattern detection: unusual transfers, round-number payments, undisclosed accounts',
      'Timeline of asset movements correlated with key litigation dates',
      'Produces report format acceptable as exhibit in family or civil proceedings',
    ],
    status:      'soon',
    plan:        'firm',
    accent:      '#1A3A6B',
    category:    'Financial Analysis',
    inputTypes:  ['Bank statements', 'Tax returns', 'Financial disclosures'],
    outputTypes: ['Asset flow report', 'Transaction timeline'],
  },
  {
    icon:        AlertTriangle,
    title:       'Contract Breach Finder',
    tagline:     'Pin first breach date from agreement + correspondence chain',
    description: 'Upload the contract and the full email/letter correspondence chain. Lawline identifies where obligations arose, maps performance against those obligations, and pins the first breach — the date, the clause, the party, and the supporting correspondence. Essential for business litigation and real estate disputes.',
    capabilities: [
      'Obligation extraction from every clause in the agreement',
      'Performance mapping: what was promised, what was delivered, what was missed',
      'First breach identification with date, clause reference, and correspondence cite',
      'Damages exposure framework from breach through quantified loss',
    ],
    status:      'soon',
    plan:        'firm',
    accent:      '#B8963E',
    category:    'Financial Analysis',
    inputTypes:  ['Contract', 'Correspondence chain', 'Performance records'],
    outputTypes: ['Breach analysis', 'Obligation map'],
  },
  {
    icon:        Users,
    title:       'EEOC Charge Analyzer',
    tagline:     'Discrimination pattern timeline from HR records + email review',
    description: 'Employment discrimination cases live or die on pattern evidence. Lawline reviews the full HR file — performance reviews, emails, disciplinary records, pay history — and builds a discrimination pattern timeline: protected class events mapped to adverse actions, with comparative employee data.',
    capabilities: [
      'Adverse action timeline correlated with protected class events',
      'Comparator analysis: how similarly-situated employees were treated',
      'Email review for discriminatory language with page and date cites',
      'EEOC charge narrative draft ready for agency submission',
    ],
    status:      'soon',
    plan:        'firm',
    accent:      '#4A52A0',
    category:    'Compliance & Investigations',
    inputTypes:  ['HR files', 'Email records', 'Pay history', 'Performance reviews'],
    outputTypes: ['Pattern timeline', 'Comparator analysis', 'EEOC narrative'],
  },
]

const STATUS_CONFIG = {
  live:  { label: 'Live',  bg: 'rgba(45,107,49,0.10)',   color: '#2D6B31', border: 'rgba(45,107,49,0.25)'  },
  beta:  { label: 'Beta',  bg: 'rgba(26,58,107,0.10)',   color: '#1A3A6B', border: 'rgba(26,58,107,0.25)'  },
  soon:  { label: 'Soon',  bg: 'rgba(184,150,62,0.10)',  color: '#B8963E', border: 'rgba(184,150,62,0.30)' },
} as const

const PLAN_CONFIG = {
  solo: { label: 'Solo', price: '$49/mo',  color: '#1A3A6B', bg: 'rgba(26,58,107,0.07)'  },
  team: { label: 'Team', price: '$149/mo', color: '#B8963E', bg: 'rgba(184,150,62,0.07)' },
  firm: { label: 'Firm', price: '$399/mo', color: '#4A52A0', bg: 'rgba(74,82,160,0.07)'  },
} as const

const CATEGORIES = [
  'Case Intelligence',
  'Document Generation',
  'Discovery & Review',
  'Financial Analysis',
  'Compliance & Investigations',
]

/* ─────────────────────────────────────────────────────
   PLAN COMPARISON DATA
───────────────────────────────────────────────────── */
const PLAN_TIERS = [
  {
    key:   'solo' as AgentPlan,
    name:  'Solo',
    price: '$49',
    per:   '/month',
    tagline: 'For solo practitioners and small practices',
    agents: AGENTS.filter(a => a.plan === 'solo').length,
    features: [
      'All 7 Live agents unlocked',
      'Up to 50 case files / month',
      'Unlimited pages per file',
      'PDF, DOCX, scanned doc input',
      'Word, Excel, PDF exports',
      'On-device processing — no cloud',
      'Email support (24h response)',
    ],
    cta: 'Start Free Trial',
    highlight: false,
  },
  {
    key:   'team' as AgentPlan,
    name:  'Team',
    price: '$149',
    per:   '/month',
    tagline: 'For growing firms with paralegal teams',
    agents: AGENTS.filter(a => a.plan === 'solo' || a.plan === 'team').length,
    features: [
      'Everything in Solo, plus:',
      'All 4 Beta agents unlocked',
      'Up to 200 case files / month',
      'Multi-user access (up to 5 seats)',
      'Shared case library across team',
      'Priority processing queue',
      'Slack integration for status alerts',
      'Phone + email support',
    ],
    cta: 'Start Free Trial',
    highlight: true,
  },
  {
    key:   'firm' as AgentPlan,
    name:  'Firm',
    price: '$399',
    per:   '/month',
    tagline: 'For Am Law 200 firms and high-volume practices',
    agents: AGENTS.length,
    features: [
      'Everything in Team, plus:',
      'All 16 agents including Soon releases',
      'Unlimited case files',
      'Unlimited seats',
      'Custom agent fine-tuning on your docs',
      'Dedicated on-prem deployment support',
      'SSO + audit log + compliance reporting',
      'Dedicated success manager',
      'SLA: 4-hour response',
    ],
    cta: 'Talk to Sales',
    highlight: false,
  },
]

/* ─────────────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────────────── */
export default function AgentsPage() {
  const { openComingSoon } = useApp()
  const heroRef = useRef<HTMLElement>(null)

  return (
    <main style={{ background: 'var(--color-parchment)', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <section
        ref={heroRef}
        style={{
          background: 'var(--color-ink)',
          padding: '7rem 2rem 5rem',
          position: 'relative',
          overflow: 'hidden',
        }}
        className="hero-section-pad"
      >
        {/* Background glow */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(184,150,62,0.12) 0%, transparent 70%)',
        }} />
        {/* Grid pattern */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
        }} />

        <div style={{ maxWidth: '64rem', margin: '0 auto', position: 'relative', textAlign: 'center' }}>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            style={{ marginBottom: '1.5rem' }}
          >
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              fontFamily: 'var(--font-mono)', fontSize: '0.6875rem',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: '#B8963E',
              background: 'rgba(184,150,62,0.10)',
              border: '1px solid rgba(184,150,62,0.25)',
              borderRadius: 'var(--radius-pill)',
              padding: '0.35rem 0.875rem',
            }}>
              <Zap size={10} />
              3 Core AI Agents · More Coming
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.19, 1, 0.22, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              fontWeight: 300,
              lineHeight: 1.06,
              letterSpacing: '-0.03em',
              color: '#FDFCFA',
              marginBottom: '0.5rem',
            }}
          >
            Three agents.
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.14, ease: [0.19, 1, 0.22, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              fontWeight: 300,
              lineHeight: 1.06,
              letterSpacing: '-0.03em',
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #D4AE58 0%, #B8963E 60%, #8B6E28 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '2rem',
            }}
          >
            the full case workflow.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              color: 'rgba(253,252,250,0.65)',
              maxWidth: '40rem',
              margin: '0 auto 2.5rem',
              lineHeight: 1.7,
            }}
          >
            Case Chronologist → Demand Letter Generator → Deposition Prep Kit.
            From intake to trial — every document-heavy task handled in seconds.
            No data ever leaves your walls.
          </motion.p>

          {/* Stat pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}
          >
            {[
              { v: '7 Live',     l: 'available now' },
              { v: '4 Beta',     l: 'early access'  },
              { v: '5 Soon',     l: 'on the roadmap'},
              { v: '0 bytes',    l: 'data egress'   },
            ].map(({ v, l }) => (
              <div key={v} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)',
                borderRadius: 'var(--radius-md)', padding: '0.625rem 1.125rem',
              }}>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: '1rem', fontWeight: 600, color: '#D4AE58' }}>{v}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(253,252,250,0.4)' }}>{l}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Core 3 Agents ── */}
      <section style={{ padding: '5rem 2rem', background: 'var(--color-parchment)' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#B8963E', display: 'block', marginBottom: '0.75rem' }}>
              Start here
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', fontWeight: 300, letterSpacing: '-0.03em', color: 'var(--color-ink)', lineHeight: 1.1 }}>
              The three hardest jobs in litigation prep.<br />
              <em style={{ fontStyle: 'italic', color: '#B8963E' }}>Now done in seconds.</em>
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              {
                num: '01', name: 'Case Chronologist', plan: 'Solo+', planColor: '#B8963E',
                tagline: 'Upload 800 pages. Get a source-linked timeline in 42 seconds.',
                reads: ['Medical records', 'Deposition transcripts', 'Police reports', 'Expert opinions', 'Insurance exhibits'],
                outputs: ['Source-linked chronology', 'Treatment gap flags', 'Bates-cited timeline', 'Word / Excel / PDF export'],
                before: '4–8 hrs paralegal', after: '42 seconds',
                accentRgb: '184,150,62',
              },
              {
                num: '02', name: 'Demand Letter Generator', plan: 'Team+', planColor: '#1A3A6B',
                tagline: 'Timeline in → full demand letter out. Under 60 seconds.',
                reads: ['Case timeline (Agent 01 output)', 'Medical billing invoices', 'Employment / lost wage records', 'Client intake form'],
                outputs: ['Full demand letter draft', 'Itemized damages tally', 'Page-cited event references', 'Firm-voice formatting'],
                before: '2–3 hrs drafting', after: '< 60 seconds',
                accentRgb: '26,58,107',
              },
              {
                num: '03', name: 'Deposition Prep Kit', plan: 'Firm', planColor: '#4A5578',
                tagline: 'Cross-exam outline with page/line citations. 55 seconds.',
                reads: ['Opposing witness transcript', 'Prior sworn statements', 'Expert reports', 'Case file context'],
                outputs: ['Cross-examination outline', 'Inconsistency flags + quotes', 'Witness gap analysis', 'Page/line citations throughout'],
                before: '10–20 hrs prep', after: '55 seconds',
                accentRgb: '74,85,120',
              },
            ].map((agent, i) => (
              <motion.div
                key={agent.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ background: '#FFFFFF', border: '1px solid var(--color-warm-100)', borderRadius: 'var(--radius-xl)', padding: '2rem 2.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', alignItems: 'start' }}
                className="grid-3col"
              >
                {/* Left: identity */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 700, color: `rgba(${agent.accentRgb},0.15)`, lineHeight: 1 }}>{agent.num}</span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-ui)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-ink)', letterSpacing: '-0.02em' }}>{agent.name}</div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'white', background: agent.planColor, padding: '0.2rem 0.5rem', borderRadius: '999px' }}>{agent.plan}</span>
                    </div>
                  </div>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.9375rem', color: 'var(--color-muted)', lineHeight: 1.6, margin: '0 0 1.5rem' }}>{agent.tagline}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', padding: '0.75rem 1rem', background: `rgba(${agent.accentRgb},0.05)`, borderRadius: 'var(--radius-md)', border: `1px solid rgba(${agent.accentRgb},0.12)` }}>
                    <Clock size={12} style={{ color: `rgb(${agent.accentRgb})`, flexShrink: 0 }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--color-faint)', textDecoration: 'line-through' }}>{agent.before}</span>
                    <ArrowRight size={10} style={{ color: 'var(--color-faint)' }} />
                    <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.875rem', fontWeight: 700, color: `rgb(${agent.accentRgb})` }}>{agent.after}</span>
                  </div>
                </div>

                {/* Middle: reads */}
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-faint)', marginBottom: '0.75rem' }}>Reads</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {agent.reads.map(r => (
                      <div key={r} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.875rem', color: 'var(--color-muted)' }}>
                        <div style={{ width: 5, height: 5, borderRadius: '50%', background: `rgba(${agent.accentRgb},0.4)`, flexShrink: 0 }} />
                        {r}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: outputs */}
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-faint)', marginBottom: '0.75rem' }}>Outputs</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {agent.outputs.map(o => (
                      <div key={o} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.875rem', color: 'var(--color-ink)' }}>
                        <Check size={12} style={{ color: `rgb(${agent.accentRgb})`, flexShrink: 0 }} />
                        {o}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Agent Grid by Category ── */}
      {CATEGORIES.map(cat => {
        const catAgents = AGENTS.filter(a => a.category === cat)
        if (!catAgents.length) return null
        return (
          <CategorySection
            key={cat}
            category={cat}
            agents={catAgents}
            openComingSoon={openComingSoon}
          />
        )
      })}

      {/* ── Plan Comparison ── */}
      <PlanSection openComingSoon={openComingSoon} />

      {/* ── On-device footer banner ── */}
      <section style={{
        background: 'var(--color-ink)',
        padding: '3rem 2rem',
        textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.625rem',
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 'var(--radius-pill)', padding: '0.625rem 1.5rem',
          marginBottom: '1rem',
        }}>
          <Server size={13} style={{ color: '#B8963E' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(253,252,250,0.55)' }}>
            All agents run on-device · no data leaves your walls
          </span>
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'rgba(253,252,250,0.35)', maxWidth: '36rem', margin: '0 auto' }}>
          No OpenAI. No Azure. No Google Cloud. Every inference runs on your own Mac or Linux hardware behind your firewall.
        </p>
      </section>
    </main>
  )
}

/* ── Category Section ── */
function CategorySection({
  category,
  agents,
  openComingSoon,
}: {
  category:       string
  agents:         Agent[]
  openComingSoon: (tier?: string) => void
}) {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isAlt  = CATEGORIES.indexOf(category) % 2 === 1

  return (
    <section
      ref={ref}
      style={{
        background: isAlt ? 'var(--color-cream)' : 'var(--color-parchment)',
        padding: '5rem 2rem',
      }}
      className="section-pad-md"
    >
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
        {/* Category header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '2.5rem' }}
        >
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.625rem',
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'var(--color-terracotta)',
          }}>
            {category}
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 300,
            letterSpacing: '-0.025em',
            color: 'var(--color-ink)',
            marginTop: '0.375rem',
            lineHeight: 1.15,
          }}>
            {CATEGORY_HEADLINES[category] ?? category}
          </h2>
        </motion.div>

        {/* Agent cards */}
        <div className="grid-agents">
          {agents.map((agent, i) => (
            <AgentCard
              key={agent.title}
              agent={agent}
              index={i}
              inView={inView}
              openComingSoon={openComingSoon}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

const CATEGORY_HEADLINES: Record<string, string> = {
  'Case Intelligence':          'Build the record. Find every fact.',
  'Document Generation':        'First draft done before lunch.',
  'Discovery & Review':         'Review at machine speed.',
  'Financial Analysis':         'Every dollar. Every source. Every argument.',
  'Compliance & Investigations': 'Pattern evidence. Built for the EEOC era.',
}

/* ── Agent Card ── */
function AgentCard({
  agent,
  index,
  inView,
  openComingSoon,
}: {
  agent:          Agent
  index:          number
  inView:         boolean
  openComingSoon: (tier?: string) => void
}) {
  const { icon: Icon, title, tagline, description, capabilities, status, plan, accent, inputTypes, outputTypes } = agent
  const statusCfg = STATUS_CONFIG[status]
  const planCfg   = PLAN_CONFIG[plan]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      style={{
        background: 'var(--color-parchment)',
        border: '1px solid var(--color-warm-100)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 2px 12px rgba(10,16,32,0.05)',
        transition: 'box-shadow 0.25s ease, transform 0.25s ease',
      }}
      whileHover={{ y: -3, boxShadow: '0 8px 32px rgba(10,16,32,0.10)' }}
    >
      {/* Top accent bar */}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${accent}, ${accent}44)` }} />

      {/* Card body */}
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>

        {/* Icon + title row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
          <div style={{
            width: 40, height: 40, flexShrink: 0,
            borderRadius: 'var(--radius-md)',
            background: `${accent}12`,
            border: `1px solid ${accent}28`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon size={18} style={{ color: accent }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
              <h3 style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.9375rem',
                fontWeight: 600,
                color: 'var(--color-ink)',
                letterSpacing: '-0.015em',
                lineHeight: 1.2,
              }}>
                {title}
              </h3>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.4375rem',
                letterSpacing: '0.08em', textTransform: 'uppercase',
                color: statusCfg.color, background: statusCfg.bg,
                border: `1px solid ${statusCfg.border}`,
                padding: '0.175rem 0.5rem', borderRadius: 'var(--radius-pill)',
                flexShrink: 0,
              }}>
                {statusCfg.label}
              </span>
            </div>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.625rem',
              letterSpacing: '0.04em', color: 'var(--color-muted)',
              lineHeight: 1.3,
            }}>
              {tagline}
            </p>
          </div>
        </div>

        {/* Description */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.8125rem',
          color: 'var(--color-muted)',
          lineHeight: 1.65,
        }}>
          {description}
        </p>

        {/* Capabilities */}
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {capabilities.map(c => (
            <li key={c} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <Check size={12} style={{ color: accent, flexShrink: 0, marginTop: '0.2rem' }} />
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: '0.7875rem',
                color: 'var(--color-ink)', lineHeight: 1.5,
              }}>
                {c}
              </span>
            </li>
          ))}
        </ul>

        {/* I/O chips */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <ChipRow label="Input" chips={inputTypes} color="var(--color-muted)" bg="var(--color-cream)" border="var(--color-warm-100)" />
          <ChipRow label="Output" chips={outputTypes} color={accent} bg={`${accent}08`} border={`${accent}22`} />
        </div>
      </div>

      {/* Plan footer */}
      <div style={{
        padding: '0.875rem 1.5rem',
        borderTop: '1px solid var(--color-warm-100)',
        background: 'var(--color-cream)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {plan !== 'solo' && <Lock size={11} style={{ color: planCfg.color }} />}
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.5625rem',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            color: planCfg.color,
            background: planCfg.bg,
            border: `1px solid ${planCfg.color}22`,
            padding: '0.2rem 0.625rem', borderRadius: 'var(--radius-pill)',
          }}>
            {planCfg.label} · {planCfg.price}
          </span>
        </div>
        <button
          onClick={() => openComingSoon(plan)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
            fontFamily: 'var(--font-ui)', fontSize: '0.75rem', fontWeight: 500,
            color: accent, background: 'none', border: 'none', cursor: 'pointer',
            padding: 0,
          }}
        >
          {status === 'soon' ? 'Join waitlist' : 'Try it'} <ChevronRight size={12} />
        </button>
      </div>
    </motion.div>
  )
}

/* ── I/O Chip Row ── */
function ChipRow({ label, chips, color, bg, border }: {
  label: string; chips: string[]; color: string; bg: string; border: string
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', flexWrap: 'wrap' }}>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.4375rem',
        letterSpacing: '0.1em', textTransform: 'uppercase',
        color: 'var(--color-faint)', paddingTop: '0.25rem', flexShrink: 0,
        minWidth: '2.5rem',
      }}>
        {label}
      </span>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
        {chips.map(c => (
          <span key={c} style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.5rem',
            letterSpacing: '0.06em', color,
            background: bg, border: `1px solid ${border}`,
            padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-pill)',
          }}>
            {c}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── Plan Comparison Section ── */
function PlanSection({ openComingSoon }: { openComingSoon: (tier?: string) => void }) {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      style={{ background: 'var(--color-ink)', padding: '6rem 2rem' }}
      className="section-pad-lg"
    >
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <span style={{
            display: 'inline-block',
            fontFamily: 'var(--font-mono)', fontSize: '0.625rem',
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: '#B8963E', marginBottom: '1rem',
          }}>
            Choose your plan
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 300,
            letterSpacing: '-0.03em',
            color: '#FDFCFA',
            lineHeight: 1.1,
          }}>
            Agents unlock with your plan
          </h2>
        </motion.div>

        {/* Plan cards */}
        <div className="grid-3col" style={{ gap: '1.25rem' }}>
          {PLAN_TIERS.map((tier, i) => {
            const isHighlight = tier.highlight
            return (
              <motion.div
                key={tier.key}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{
                  background:    isHighlight ? 'rgba(184,150,62,0.08)' : 'rgba(255,255,255,0.04)',
                  border:        isHighlight ? '1px solid rgba(184,150,62,0.35)' : '1px solid rgba(255,255,255,0.08)',
                  borderRadius:  'var(--radius-xl)',
                  overflow:      'hidden',
                  display:       'flex',
                  flexDirection: 'column',
                  position:      'relative',
                }}
              >
                {isHighlight && (
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                    background: 'linear-gradient(90deg, #B8963E, #D4AE58, #B8963E)',
                  }} />
                )}
                {isHighlight && (
                  <div style={{
                    position: 'absolute', top: '1rem', right: '1rem',
                    fontFamily: 'var(--font-mono)', fontSize: '0.4375rem',
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: '#B8963E', background: 'rgba(184,150,62,0.15)',
                    border: '1px solid rgba(184,150,62,0.3)',
                    padding: '0.2rem 0.625rem', borderRadius: 'var(--radius-pill)',
                  }}>
                    Most popular
                  </div>
                )}
                <div style={{ padding: '1.75rem 1.5rem 1.25rem' }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 600, color: 'rgba(253,252,250,0.55)', letterSpacing: '0.02em' }}>
                      {tier.name}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginTop: '0.375rem' }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 300, color: '#FDFCFA', letterSpacing: '-0.04em' }}>
                        {tier.price}
                      </span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'rgba(253,252,250,0.4)' }}>
                        {tier.per}
                      </span>
                    </div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'rgba(253,252,250,0.45)', marginTop: '0.375rem', lineHeight: 1.5 }}>
                      {tier.tagline}
                    </p>
                  </div>

                  {/* Agent count */}
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                    background: 'rgba(184,150,62,0.10)', border: '1px solid rgba(184,150,62,0.22)',
                    borderRadius: 'var(--radius-pill)', padding: '0.3rem 0.75rem',
                    marginBottom: '1.25rem',
                  }}>
                    <Zap size={10} style={{ color: '#B8963E' }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', letterSpacing: '0.08em', color: '#B8963E' }}>
                      {tier.agents} agents unlocked
                    </span>
                  </div>

                  {/* Features */}
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                    {tier.features.map(f => (
                      <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                        <Check size={12} style={{ color: '#B8963E', flexShrink: 0, marginTop: '0.15rem' }} />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'rgba(253,252,250,0.65)', lineHeight: 1.5 }}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div style={{ padding: '0 1.5rem 1.5rem', marginTop: 'auto' }}>
                  <button
                    onClick={() => openComingSoon(tier.key)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-pill)',
                      fontFamily: 'var(--font-ui)', fontSize: '0.875rem', fontWeight: 600,
                      cursor: 'pointer', border: 'none',
                      background: isHighlight
                        ? 'linear-gradient(135deg, #C9A84C, #B8963E)'
                        : 'rgba(255,255,255,0.07)',
                      color: isHighlight ? '#FFFFFF' : 'rgba(253,252,250,0.8)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {tier.cta} <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
