import type { Metadata, Viewport } from 'next'
import { SiteNavbar }        from '@/components/layout/site-navbar'
import { SiteFooter }        from '@/components/layout/site-footer'
import { AnnouncementBar }   from '@/components/layout/announcement-bar'
import { ScrollProgressBar } from '@/components/layout/scroll-progress-bar'
import { StickyCtaBar }      from '@/components/layout/sticky-cta-bar'
import { CookieBanner }      from '@/components/layout/cookie-banner'
import { BackToTop }         from '@/components/layout/back-to-top'
import { AppProviders }      from '@/components/providers/app-providers'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Lawline — AI for Legal Teams',
    template: '%s | Lawline',
  },
  description:
    'Lawline turns raw case documents into structured timelines, client-safe drafts, and court-ready exhibits — in seconds. Built for law firms that refuse to slow down.',
  keywords: ['legal AI', 'case management', 'law firm software', 'document automation', 'legal timeline'],
  authors: [{ name: 'Lawline' }],
  creator: 'Lawline',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://lawline.ai'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Lawline — AI for Legal Teams',
    description: 'From case chaos to ordered truth. AI-powered legal document intelligence.',
    siteName: 'Lawline',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lawline — AI for Legal Teams',
    description: 'From case chaos to ordered truth.',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FDFCFA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=Space+Grotesk:wght@300;400;500;600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" style={{ fontFamily: 'var(--font-body)' }}>
        <AppProviders>
          {/* Reading progress bar — gold strip at top */}
          <ScrollProgressBar />

          {/* Announcement bar — above navbar */}
          <AnnouncementBar />

          {/* Primary navigation */}
          <SiteNavbar />

          {/* Page content */}
          <main>{children}</main>

          {/* Footer */}
          <SiteFooter />

          {/* Sticky CTA — appears after 35% scroll */}
          <StickyCtaBar />

          {/* Cookie consent banner */}
          <CookieBanner />

          {/* Back to top button — appears after 600px scroll */}
          <BackToTop />
        </AppProviders>
      </body>
    </html>
  )
}
