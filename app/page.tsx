import type { Metadata } from 'next'

import { HeroSection }         from '@/components/marketing/hero-section'
import { StatsBar }            from '@/components/marketing/stats-bar'
import { FeaturesSection }     from '@/components/marketing/features-section'
import { HowItWorksSection }   from '@/components/marketing/how-it-works-section'
import { AiAgentDemoSection }  from '@/components/marketing/ai-agent-demo-section'
import { UseCasesSection }     from '@/components/marketing/use-cases-section'
import { TestimonialsSection } from '@/components/marketing/testimonials-section'
import { FounderCtaSection }   from '@/components/marketing/founder-cta-section'

export const metadata: Metadata = {
  title: 'Lawline — AI for Legal Teams',
  description:
    'Lawline turns raw case documents into structured timelines, demand letters, and deposition prep — in seconds.',
}

export default function HomePage() {
  return (
    <>
      {/* 1. Value prop + hero widget */}
      <HeroSection />

      {/* 2. Trust numbers */}
      <StatsBar />

      {/* 3. What it does — 6 capability cards */}
      <FeaturesSection />

      {/* 4. How it works — 3-step process */}
      <HowItWorksSection />

      {/* 5. The 3 agents in action */}
      <AiAgentDemoSection />

      {/* 6. By practice area */}
      <UseCasesSection />

      {/* 7. Social proof */}
      <TestimonialsSection />

      {/* 8. Personal close */}
      <FounderCtaSection />
    </>
  )
}
