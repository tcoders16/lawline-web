import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock } from 'lucide-react'
import { notFound } from 'next/navigation'

// In production, this would come from a CMS or MDX files
const POSTS: Record<string, {
  title: string
  category: string
  publishedAt: string
  readMinutes: number
  content: string
}> = {
  'ai-timeline-generation-explained': {
    title:       'How Lawline Builds a Case Timeline from Raw Documents',
    category:    'Product',
    publishedAt: '2024-11-20',
    readMinutes: 8,
    content: `
When an attorney uploads a discovery package to Lawline, the system doesn't see a PDF — it sees a structured problem waiting to be solved.

**The Extraction Pipeline**

Every document passes through three stages: structural analysis, entity extraction, and chronological anchoring.

In the first stage, Lawline identifies the document type — contract, deposition transcript, email chain, police report — and applies the appropriate parsing heuristics. A contract is read differently than an email thread.

In the second stage, the system extracts named entities: people, organizations, dates, dollar amounts, and legal references. Each extraction is kept with its source location — page number, paragraph, and bounding box.

In the third stage, all date-anchored entities are sorted and deduplicated into a master timeline. Conflicting dates (e.g., a document signed on one date but transmitted on another) are flagged for attorney review.

**Source Linking**

Every event in a Lawline timeline carries a citation object: the document filename, page number, and the original text that produced the extraction. This is non-negotiable. An unsourced fact in legal work is worse than no fact at all.

**Speed**

The average timeline from a 200-page discovery package completes in under 10 seconds. This is possible because the pipeline runs in parallel across document sections, not sequentially.

The goal has always been: give the attorney the review problem, not the organization problem.
    `.trim(),
  },
  'on-prem-legal-ai-guide': {
    title:       'Why On-Prem AI Matters for Litigation Practice',
    category:    'Security',
    publishedAt: '2024-10-15',
    readMinutes: 6,
    content: `
The question we hear most often from litigation partners is not "how accurate is it?" — it is "where does my data go?"

**The Privilege Problem**

Attorney-client privilege is not just an ethical obligation. It is a constitutional protection that, if breached, can result in case dismissal, sanctions, and bar complaints. Sending privileged communications to a third-party cloud service — even a secure one — creates a disclosure risk that many malpractice insurers are now flagging explicitly.

**What On-Prem Means in Practice**

Lawline's on-prem deployment runs as a native macOS or Linux service. The AI model weights are bundled in the application package. No API calls leave the machine. No data is telemetered. The application functions identically with the network cable unplugged.

**The Operational Case**

Beyond privilege, on-prem deployments eliminate the variable latency of cloud APIs, allow firms to process documents in batch overnight, and support the air-gapped environments required by some government and military clients.

Data sovereignty is not a luxury feature. For litigation practice, it is a requirement.
    `.trim(),
  },
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = POSTS[slug]
  if (!post) return {}
  return { title: post.title, description: post.title }
}

function formatDate(s: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(s))
}

export default async function InsightDetailPage({ params }: Props) {
  const { slug } = await params
  const post = POSTS[slug]

  if (!post) notFound()

  // Simple markdown-like renderer (bold + paragraphs)
  const renderContent = (text: string) =>
    text.split('\n\n').map((block, i) => {
      if (block.startsWith('**') && block.includes('**\n')) {
        const [heading, ...rest] = block.split('\n')
        const headingText = heading.replace(/\*\*/g, '')
        return (
          <div key={i}>
            <h3
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '1.0625rem',
                fontWeight: 600,
                color: 'var(--color-ink)',
                letterSpacing: '-0.015em',
                marginBottom: '0.75rem',
                marginTop: '2rem',
              }}
            >
              {headingText}
            </h3>
            {rest.length > 0 && (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.8, color: 'var(--color-muted)', marginBottom: '1.25rem' }}>
                {rest.join(' ')}
              </p>
            )}
          </div>
        )
      }
      return (
        <p key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.8, color: 'var(--color-muted)', marginBottom: '1.5rem' }}>
          {block}
        </p>
      )
    })

  return (
    <>
      {/* ── Back nav ────────────────────────── */}
      <div style={{ padding: '7rem 2rem 0' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
          <Link
            href="/insights"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.625rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-faint)',
              textDecoration: 'none',
              marginBottom: '2.5rem',
            }}
          >
            <ArrowLeft size={12} />
            All Insights
          </Link>
        </div>
      </div>

      {/* ── Article ─────────────────────────── */}
      <article style={{ padding: '0 2rem 8rem' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
          {/* Meta */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <span
              className="badge-tier"
              style={{
                color: 'var(--color-terracotta)',
                borderColor: 'rgba(196,103,58,0.3)',
                fontSize: '0.5625rem',
              }}
            >
              {post.category}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--color-faint)' }}>
              <Clock size={11} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {post.readMinutes} min read
              </span>
            </div>
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.875rem, 4vw, 3rem)',
              fontWeight: 300,
              letterSpacing: '-0.03em',
              color: 'var(--color-ink)',
              lineHeight: 1.1,
              marginBottom: '1rem',
            }}
          >
            {post.title}
          </h1>

          {/* Date */}
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--color-faint)', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: '3rem' }}>
            {formatDate(post.publishedAt)}
          </span>

          {/* Divider */}
          <div className="glow-line" style={{ marginBottom: '3rem' }} />

          {/* Body */}
          <div>{renderContent(post.content)}</div>

          {/* Footer CTA */}
          <div
            style={{
              marginTop: '4rem',
              padding: '2.5rem',
              background: 'var(--color-cream)',
              border: '1px solid var(--color-warm-100)',
              borderRadius: 'var(--radius-xl)',
              textAlign: 'center',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.625rem',
                fontWeight: 300,
                letterSpacing: '-0.025em',
                color: 'var(--color-ink)',
                marginBottom: '0.75rem',
              }}
            >
              Ready to try Lawline?
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)', marginBottom: '1.5rem', fontSize: '0.9375rem' }}>
              Start your free trial — no credit card required.
            </p>
            <Link href="/pricing" className="btn-primary" style={{ display: 'inline-flex' }}>
              View Pricing
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
