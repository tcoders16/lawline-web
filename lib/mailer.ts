/**
 * mailer.ts — Gmail SMTP transporter (singleton)
 *
 * Sends from emailtosolankiom@gmail.com via Gmail's SMTP server.
 * Uses an App Password (not your normal Gmail password).
 *
 * Setup (one-time):
 *   1. Go to myaccount.google.com → Security → 2-Step Verification → enable it
 *   2. Go to myaccount.google.com/apppasswords
 *   3. Create App Password → name it "Lawline" → copy the 16-char code
 *   4. Add to .env.local:
 *        GMAIL_USER=emailtosolankiom@gmail.com
 *        GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
 *
 * Env vars:
 *   GMAIL_USER         — sender address (emailtosolankiom@gmail.com)
 *   GMAIL_APP_PASSWORD — 16-char Google App Password
 */

import nodemailer from 'nodemailer'
import type { Transporter } from 'nodemailer'

let _transporter: Transporter | null = null

function getTransporter(): Transporter {
  if (_transporter) return _transporter

  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD

  if (!user || !pass) {
    throw new Error(
      'Missing GMAIL_USER or GMAIL_APP_PASSWORD env vars. ' +
      'See lib/mailer.ts for setup instructions.'
    )
  }

  _transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  })

  return _transporter
}

export interface MailOptions {
  to: string
  subject: string
  text: string
  html: string
}

/** Send an email via Gmail SMTP. Throws on failure. */
export async function sendMail(opts: MailOptions): Promise<void> {
  const transporter = getTransporter()
  const from = `Lawline <${process.env.GMAIL_USER}>`

  await transporter.sendMail({
    from,
    to:      opts.to,
    subject: opts.subject,
    text:    opts.text,
    html:    opts.html,
  })
}
