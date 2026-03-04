import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import type { InsightPost } from '@/types/content'

export const metadata: Metadata = {
  title: 'Insights',
  description: 'Legal AI updates, case studies, and practitioner guides from the Lawline team.',
}

const POSTS: InsightPost[] = [
  {
    slug:        'ai-timeline-generation-explained',
    title:       'How Lawline Builds a Case Timeline from Raw Documents',
    excerpt:     'A deep dive into the extraction pipeline that turns unstructured discovery packages into structured, source-linked chronologies in under 10 seconds.',
    category:    'Product',
    publishedAt: '2024-11-20',
    readMinutes: 8,
    featured:    true,
  },
  {
    slug:        'on-prem-legal-ai-guide',
    title:       'Why On-Prem AI Matters for Litigation Practice',
    excerpt:     'Data sovereignty, privilege protection, and the operational case for running your AI stack inside your own infrastructure.',
    category:    'Security',
    publishedAt: '2024-10-15',
    readMinutes: 6,
  },
  {
    slug:        'case-study-personal-injury-firm',
    title:       'Case Study: How a PI Firm Cut Timeline Prep from 8 Hours to 45 Minutes',
    excerpt:     'A Chicago personal injury practice shares how they integrated Lawline into their intake workflow and the measurable outcomes after three months.',
    category:    'Case Study',
    publishedAt: '2024-09-28',
    readMinutes: 5,
  },
  {
    slug:        'soc2-compliance-lawline',
    title:       'Lawline\'s Path to SOC 2 Type II Compliance',
    excerpt:     'What we built, what we changed, and why we believe security certifications matter more in legal tech than in any other vertical.',
    category:    'Security',
    publishedAt: '2024-08-12',
    readMinutes: 7,
  },
  {
    slug:        'legal-ai-hallucination-problem',
    title:       'The Hallucination Problem in Legal AI — and How We Solve It',
    excerpt:     'Every Lawline output traces back to a page number. Here is the architectural reason why, and how source-linking changes the trust equation for attorneys.',
    category:    'AI',
    publishedAt: '2024-07-05',
    readMinutes: 9,
  },
]

const CATEGORY_COLORS: Record<string, string> = {
  Product:    'var(--color-terracotta)',
  Security:   'var(--color-sage)',
  'Case Study': 'var(--color-gold)',
  AI:         'var(--color-ink)',
}

function formatDate(s: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(s))
}

export default function InsightsPage() {
  const [featured, ...rest] = POSTS

  return (
    <>
      {/* ── Header ──────────────────────────── */}
      <section
        style={{
          padding: '8rem 2rem 4rem',
          borderBottom: '1px solid var(--color-warm-100)',
        }}
      >
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <span className="text-label" style={{ color: 'var(--color-terracotta)', display: 'block', marginBottom: '1rem' }}>
            Insights
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 300,
              letterSpacing: '-0.03em',
              color: 'var(--color-ink)',
              lineHeight: 1.05,
            }}
          >
            From the Lawline team
          </h1>
        </div>
      </section>

      {/* ── Featured post ───────────────────── */}
      <section style={{ padding: '4rem 2rem 0', background: 'var(--color-parchment)' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <Link
            href={`/insights/${featured.slug}`}
            style={{ textDecoration: 'none', display: 'block' }}
          >
            <div
              className="card-law"
              style={{ padding: '3rem', marginBottom: '1rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1.25rem' }}>
                <span
                  className="badge-tier"
                  style={{
                    color: CATEGORY_COLORS[featured.category] ?? 'var(--color-ink)',
                    borderColor: `${CATEGORY_COLORS[featured.category] ?? 'var(--color-ink)'}40`,
                    fontSize: '0.5625rem',
                  }}
                >
                  {featured.category}
                </span>
                <span className="text-label" style={{ color: 'var(--color-faint)' }}>Featured</span>
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                  fontWeight: 300,
                  letterSpacing: '-0.025em',
                  color: 'var(--color-ink)',
                  lineHeight: 1.2,
                  marginBottom: '1rem',
                }}
              >
                {featured.title}
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '48rem' }}>
                {featured.excerpt}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--color-faint)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {formatDate(featured.publishedAt)}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--color-faint)' }}>
                  <Clock size={11} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    {featured.readMinutes} min read
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--color-terracotta)' }}>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500 }}>Read article</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Post grid ───────────────────────── */}
      <section style={{ padding: '2rem 2rem 8rem', background: 'var(--color-parchment)' }}>
        <div
          style={{
            maxWidth: '72rem',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem',
          }}
        >
          {rest.map(post => (
            <Link
              key={post.slug}
              href={`/insights/${post.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <article
                className="card-law"
                style={{ padding: '1.75rem', height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <span
                  className="badge-tier"
                  style={{
                    color: CATEGORY_COLORS[post.category] ?? 'var(--color-ink)',
                    borderColor: `${CATEGORY_COLORS[post.category] ?? 'var(--color-ink)'}40`,
                    fontSize: '0.5625rem',
                    marginBottom: '1rem',
                    alignSelf: 'flex-start',
                  }}
                >
                  {post.category}
                </span>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.125rem',
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                    color: 'var(--color-ink)',
                    lineHeight: 1.3,
                    marginBottom: '0.75rem',
                    flex: 1,
                  }}
                >
                  {post.title}
                </h3>

                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--color-muted)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                  {post.excerpt}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: 'auto' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--color-faint)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    {formatDate(post.publishedAt)}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-faint)' }}>
                    <Clock size={10} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      {post.readMinutes} min
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
