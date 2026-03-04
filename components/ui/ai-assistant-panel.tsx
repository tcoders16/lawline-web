'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, X, Send, RotateCcw, ChevronDown } from 'lucide-react'

type Message = {
  id:      number
  role:    'user' | 'assistant'
  content: string
  typing?: boolean
}

const QUICK_PROMPTS = [
  'What does Lawline do?',
  'How does timeline generation work?',
  'Is my data secure?',
  'What pricing plan fits a solo attorney?',
]

const RESPONSES: Record<string, string> = {
  'what does lawline do':
    'Lawline is a legal AI platform that reads your raw case documents — PDFs, emails, discovery packets — and builds structured, source-linked timelines, client-safe narrative drafts, and court-ready exhibits. Automatically, in seconds.',
  'how does timeline generation work':
    'You upload documents. The pipeline detects the document type, extracts named entities (dates, parties, dollar amounts), links each fact to its source page, then sorts everything into a chronological timeline you can edit and export.',
  'is my data secure':
    'Yes. Cloud plans use TLS 1.3 in transit and AES-256 at rest. The On-Prem Pro plan runs entirely on your machine — no data ever touches our servers. We are SOC 2 Type II certified.',
  'what pricing plan fits a solo attorney':
    'The Solo plan at $49/month is designed for solo practitioners. It includes 40 case files per month, AI timeline generation, PDF & DOCX export, and source-linked citations. There\'s a 30-day free trial — no credit card required.',
}

function getResponse(input: string): Promise<string> {
  const key = Object.keys(RESPONSES).find(k =>
    input.toLowerCase().includes(k.split(' ')[0]) ||
    k.split(' ').some(w => input.toLowerCase().includes(w))
  )
  const answer = key
    ? RESPONSES[key]
    : "That's a great question. Lawline is purpose-built for legal professionals — upload your case documents and the AI handles extraction, timeline building, and draft generation. Want me to tell you more about a specific feature?"

  // Simulate streaming delay
  return new Promise(resolve => setTimeout(() => resolve(answer), 800 + Math.random() * 600))
}

export function AiAssistantPanel() {
  const [open,     setOpen]     = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id:      0,
      role:    'assistant',
      content: 'Hi — I\'m the Lawline assistant. Ask me anything about the platform, pricing, or how the AI works.',
    },
  ])
  const [input,    setInput]    = useState('')
  const [busy,     setBusy]     = useState(false)
  const bottomRef  = useRef<HTMLDivElement>(null)
  const inputRef   = useRef<HTMLInputElement>(null)
  let   _id        = useRef(1)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || busy) return
    setInput('')
    setBusy(true)

    const userMsg: Message = { id: _id.current++, role: 'user', content: text.trim() }
    const typingMsg: Message = { id: _id.current++, role: 'assistant', content: '', typing: true }

    setMessages(prev => [...prev, userMsg, typingMsg])

    const response = await getResponse(text)

    setMessages(prev =>
      prev.map(m => m.typing ? { ...m, content: response, typing: false } : m)
    )
    setBusy(false)
    setTimeout(() => inputRef.current?.focus(), 100)
  }, [busy])

  const reset = () => {
    setMessages([{
      id:      0,
      role:    'assistant',
      content: 'Hi — I\'m the Lawline assistant. Ask me anything about the platform, pricing, or how the AI works.',
    }])
    _id.current = 1
  }

  return (
    <>
      {/* Floating trigger button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="trigger"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={() => setOpen(true)}
            style={{
              position: 'fixed',
              bottom: '1.75rem',
              right: '1.75rem',
              zIndex: 150,
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'var(--color-ink)',
              border: '1.5px solid rgba(196,103,58,0.4)',
              boxShadow: '0 8px 28px rgba(28,27,24,0.35), 0 0 0 0 rgba(196,103,58,0)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-parchment)',
            }}
            whileHover={{ scale: 1.08, boxShadow: '0 12px 36px rgba(28,27,24,0.4), 0 0 0 6px rgba(196,103,58,0.12)' }}
            whileTap={{ scale: 0.94 }}
          >
            {/* Pulse ring */}
            <motion.div
              animate={{ scale: [1, 1.6], opacity: [0.3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                inset: -2,
                borderRadius: '50%',
                border: '1.5px solid var(--color-terracotta)',
              }}
            />
            <Sparkles size={22} style={{ color: 'var(--color-terracotta)' }} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 360, damping: 28 }}
            style={{
              position: 'fixed',
              bottom: '1.75rem',
              right: '1.75rem',
              zIndex: 150,
              width: 'min(380px, calc(100vw - 2rem))',
              maxHeight: '80vh',
              display: 'flex',
              flexDirection: 'column',
              background: 'var(--color-parchment)',
              border: '1px solid var(--color-warm-100)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: '0 24px 64px rgba(28,27,24,0.25)',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div
              style={{
                background: 'var(--color-ink)',
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(196,103,58,0.2)',
                    border: '1px solid rgba(196,103,58,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Sparkles size={15} style={{ color: 'var(--color-terracotta)' }} />
                </div>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: 'var(--color-parchment)',
                    letterSpacing: '-0.01em',
                  }}>
                    Lawline AI
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <span className="dot-live" />
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.5rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--color-sage)',
                    }}>
                      On-device · Private
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.375rem' }}>
                <button
                  onClick={reset}
                  title="Reset conversation"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.375rem',
                    cursor: 'pointer',
                    color: 'rgba(253,252,250,0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    lineHeight: 0,
                  }}
                >
                  <RotateCcw size={14} />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.375rem',
                    cursor: 'pointer',
                    color: 'rgba(253,252,250,0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    lineHeight: 0,
                  }}
                >
                  <ChevronDown size={14} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                minHeight: 200,
                maxHeight: '50vh',
              }}
            >
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: 'flex',
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div
                    style={{
                      maxWidth: '85%',
                      padding: '0.625rem 0.875rem',
                      borderRadius: msg.role === 'user'
                        ? 'var(--radius-lg) var(--radius-lg) 4px var(--radius-lg)'
                        : 'var(--radius-lg) var(--radius-lg) var(--radius-lg) 4px',
                      background: msg.role === 'user'
                        ? 'var(--color-ink)'
                        : 'var(--color-cream)',
                      border: msg.role === 'user'
                        ? 'none'
                        : '1px solid var(--color-warm-100)',
                    }}
                  >
                    {msg.typing ? (
                      <TypingDots />
                    ) : (
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.8125rem',
                        lineHeight: 1.65,
                        color: msg.role === 'user' ? 'var(--color-parchment)' : 'var(--color-ink)',
                        margin: 0,
                      }}>
                        {msg.content}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Quick prompts */}
            {messages.length <= 1 && (
              <div style={{
                padding: '0 1rem 0.75rem',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.375rem',
                flexShrink: 0,
              }}>
                {QUICK_PROMPTS.map(p => (
                  <button
                    key={p}
                    onClick={() => sendMessage(p)}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.5625rem',
                      letterSpacing: '0.04em',
                      color: 'var(--color-muted)',
                      background: 'var(--color-cream)',
                      border: '1px solid var(--color-warm-100)',
                      borderRadius: 'var(--radius-pill)',
                      padding: '0.3rem 0.625rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={e => {
                      const b = e.currentTarget
                      b.style.borderColor = 'var(--color-terracotta)'
                      b.style.color = 'var(--color-terracotta)'
                    }}
                    onMouseLeave={e => {
                      const b = e.currentTarget
                      b.style.borderColor = 'var(--color-warm-100)'
                      b.style.color = 'var(--color-muted)'
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div
              style={{
                padding: '0.75rem 1rem',
                borderTop: '1px solid var(--color-warm-100)',
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center',
                flexShrink: 0,
                background: 'var(--color-cream)',
              }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input) } }}
                placeholder="Ask anything about Lawline…"
                disabled={busy}
                style={{
                  flex: 1,
                  background: 'var(--color-parchment)',
                  border: '1px solid var(--color-warm-100)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.625rem 0.875rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8125rem',
                  color: 'var(--color-ink)',
                  outline: 'none',
                  transition: 'border-color 0.15s',
                }}
                onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-terracotta)' }}
                onBlur={e => { e.currentTarget.style.borderColor = 'var(--color-warm-100)' }}
              />
              <motion.button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || busy}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.94 }}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 'var(--radius-md)',
                  background: input.trim() && !busy ? 'var(--color-terracotta)' : 'var(--color-warm-100)',
                  border: 'none',
                  cursor: input.trim() && !busy ? 'pointer' : 'default',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'background 0.15s',
                }}
              >
                <Send size={15} style={{ color: input.trim() && !busy ? 'var(--color-parchment)' : 'var(--color-warm-300)' }} />
              </motion.button>
            </div>

            {/* Footer */}
            <div style={{
              padding: '0.5rem 1rem',
              background: 'var(--color-cream)',
              borderTop: '1px solid var(--color-warm-100)',
              textAlign: 'center',
              flexShrink: 0,
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-faint)',
              }}>
                Runs on-device · No data sent externally
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: '4px', alignItems: 'center', padding: '2px 0' }}>
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'var(--color-terracotta)',
          }}
        />
      ))}
    </div>
  )
}
