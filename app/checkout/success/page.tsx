'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { CheckCircle, Check, Mail, Download, ChevronRight, Smartphone } from 'lucide-react'

/* ─── Sub-components ─────────────────────────────────── */

function StepCard({
  number, title, done = false, children,
}: {
  number: string; title: string; done?: boolean; children: React.ReactNode
}) {
  return (
    <div style={{
      border: '1px solid var(--color-warm-100)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      background: '#FFFFFF',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.875rem',
        padding: '0.875rem 1.25rem',
        borderBottom: '1px solid var(--color-warm-100)',
        background: done ? 'rgba(184,150,62,0.04)' : 'var(--color-cream)',
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
          background: done ? '#B8963E' : 'var(--color-ink)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {done
            ? <Check size={13} style={{ color: 'white' }} />
            : <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#B8963E', fontWeight: 700 }}>{number}</span>
          }
        </div>
        <span style={{
          fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: '0.9375rem',
          color: 'var(--color-ink)', letterSpacing: '-0.01em', flex: 1,
        }}>
          {title}
        </span>
        {done && (
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.08em',
            textTransform: 'uppercase', color: '#B8963E', fontWeight: 600,
          }}>
            Done
          </span>
        )}
      </div>
      <div style={{ padding: '1.25rem' }}>{children}</div>
    </div>
  )
}

/* ─── Main content ───────────────────────────────────── */

function SuccessContent() {
  const params    = useSearchParams()
  const sessionId = params.get('session_id')

  const downloadHref = sessionId
    ? `/api/stripe/download?session_id=${sessionId}`
    : '/api/stripe/download'

  return (
    <div style={{
      minHeight: '100vh',
      background: `
        radial-gradient(ellipse 80% 35% at 50% -5%, rgba(184,150,62,0.07) 0%, transparent 65%),
        var(--color-parchment)
      `,
      padding: '5rem 1.5rem 6rem',
    }}>
      <div style={{ maxWidth: '34rem', margin: '0 auto' }}>

        {/* ── Header ─────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            width: 68, height: 68, borderRadius: '50%',
            background: 'rgba(184,150,62,0.1)',
            border: '2px solid rgba(184,150,62,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.5rem',
          }}>
            <CheckCircle size={30} style={{ color: '#B8963E' }} />
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 2.75rem)',
            fontWeight: 300, letterSpacing: '-0.03em',
            color: 'var(--color-ink)', marginBottom: '0.625rem',
          }}>
            You&apos;re in.
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '0.9375rem',
            color: 'var(--color-muted)', lineHeight: 1.7, margin: 0,
          }}>
            Your 14-day free trial is active. Download Lawline and sign in with your email — no password needed.
          </p>
        </div>

        {/* ── Progress bar ───────────────────────────── */}
        <div style={{
          display: 'flex', alignItems: 'center',
          background: 'var(--color-cream)', border: '1px solid var(--color-warm-100)',
          borderRadius: 'var(--radius-lg)', padding: '0.875rem 1.25rem',
          marginBottom: '1.75rem', gap: 0,
        }}>
          {[
            { label: 'Payment', done: true },
            { label: 'Download', done: false },
            { label: 'Sign in', done: false },
          ].map((s, i, arr) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', flex: i < arr.length - 1 ? 1 : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
                <div style={{
                  width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: s.done ? '#B8963E' : 'var(--color-warm-100)',
                }}>
                  {s.done
                    ? <Check size={10} style={{ color: 'white' }} />
                    : <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--color-faint)', fontWeight: 600 }}>{i + 1}</span>
                  }
                </div>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.5rem',
                  letterSpacing: '0.07em', textTransform: 'uppercase',
                  color: s.done ? 'var(--color-ink)' : 'var(--color-faint)',
                  fontWeight: s.done ? 600 : 400, whiteSpace: 'nowrap',
                }}>
                  {s.label}
                </span>
              </div>
              {i < arr.length - 1 && (
                <div style={{ flex: 1, height: 1, background: 'var(--color-warm-100)', margin: '0 0.5rem', minWidth: 8 }} />
              )}
            </div>
          ))}
        </div>

        {/* ── Step 01 — Download ─────────────────────── */}
        <div style={{ marginBottom: '1rem' }}>
          <StepCard number="01" title="Download Lawline for macOS">
            <a
              href={downloadHref}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0.875rem 1.125rem',
                background: 'var(--color-navy)',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none', color: 'white',
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.88' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                  background: 'rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Download size={16} />
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: '0.875rem', margin: 0 }}>
                    Lawline.dmg
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.5rem',
                    color: 'rgba(255,255,255,0.45)', letterSpacing: '0.07em',
                    textTransform: 'uppercase', margin: 0,
                  }}>
                    macOS 13+ · Apple Silicon · ~120 MB · Private download
                  </p>
                </div>
              </div>
              <ChevronRight size={16} style={{ opacity: 0.45 }} />
            </a>

            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.5rem',
              color: 'var(--color-faint)', letterSpacing: '0.06em',
              textTransform: 'uppercase', textAlign: 'center',
              marginTop: '0.75rem', marginBottom: 0,
            }}>
              Requires 16 GB RAM · Runs entirely on-device
            </p>
          </StepCard>
        </div>

        {/* ── Step 02 — Sign in with OTP ──────────────── */}
        <div style={{ marginBottom: '2.5rem' }}>
          <StepCard number="02" title="Open the app and sign in">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>

              {[
                { step: '01', text: 'Open Lawline.dmg and drag Lawline to Applications' },
                { step: '02', text: 'Launch Lawline from your Applications folder' },
              ].map(({ step, text }) => (
                <div key={step} style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  background: 'var(--color-cream)', borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-warm-100)',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.5rem', fontWeight: 700,
                    color: '#B8963E', letterSpacing: '0.06em', flexShrink: 0,
                  }}>
                    {step}
                  </span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-ink)', lineHeight: 1.55 }}>
                    {text}
                  </span>
                </div>
              ))}

              {/* Email OTP sign-in box */}
              <div style={{
                marginTop: '0.25rem', padding: '1rem 1.125rem',
                background: 'var(--color-ink)', borderRadius: 'var(--radius-md)',
              }}>
                <p style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.5rem', fontWeight: 600,
                  color: 'rgba(253,252,250,0.3)', letterSpacing: '0.1em',
                  textTransform: 'uppercase', marginBottom: '0.75rem',
                }}>
                  Sign in — no password needed
                </p>

                {[
                  { icon: <Mail size={13} />,        text: 'Enter your email address in the Lawline app' },
                  { icon: <Smartphone size={13} />,  text: 'We send you a 6-digit code — check your inbox' },
                  { icon: <Check size={13} />,        text: 'Enter the code in the app → you\'re in' },
                ].map(({ icon, text }, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '0.5rem 0',
                    borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  }}>
                    <span style={{ color: '#B8963E', flexShrink: 0 }}>{icon}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'rgba(253,252,250,0.75)', lineHeight: 1.5 }}>
                      {text}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </StepCard>
        </div>

        {/* ── Footer ─────────────────────────────────── */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.625rem', alignItems: 'center' }}>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.5rem',
            color: 'var(--color-faint)', letterSpacing: '0.06em',
            textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.375rem', margin: 0,
          }}>
            <Mail size={9} />
            Questions? hello@lawline.ai
          </p>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.5rem',
            color: 'var(--color-faint)', letterSpacing: '0.06em',
            textTransform: 'uppercase', margin: 0,
          }}>
            Powered by Stripe · Cancel anytime · Access continues until period end
          </p>
        </div>

      </div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return <Suspense><SuccessContent /></Suspense>
}
