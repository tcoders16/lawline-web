import type { Metadata } from 'next'

/* ── Existing sections ── */
import { HeroSection }            from '@/components/marketing/hero-section'
import { StatsBar }               from '@/components/marketing/stats-bar'
import { FeaturesSection }        from '@/components/marketing/features-section'
import { HowItWorksSection }      from '@/components/marketing/how-it-works-section'
import { UseCasesSection }        from '@/components/marketing/use-cases-section'
import { AiAgentDemoSection }     from '@/components/marketing/ai-agent-demo-section'
import { DailyTasksSection }      from '@/components/marketing/daily-tasks-section'
import { TestimonialsSection }    from '@/components/marketing/testimonials-section'
import { FounderCtaSection }      from '@/components/marketing/founder-cta-section'

/* ── New sections (Wave 1–4) ── */
import { PressLogosSection }        from '@/components/marketing/press-logos-section'
import { AwardsSection }            from '@/components/marketing/awards-section'
import { ComparisonTableSection }   from '@/components/marketing/comparison-table-section'
import { ProductTourSection }       from '@/components/marketing/product-tour-section'
import { RoiCalculatorSection }     from '@/components/marketing/roi-calculator-section'
import { SecurityTrustSection }     from '@/components/marketing/security-trust-section'
import { IntegrationLogosSection }  from '@/components/marketing/integration-logos-section'
import { CaseStudyCardsSection }    from '@/components/marketing/case-study-cards-section'
import { DemoRequestSection }       from '@/components/marketing/demo-request-section'
import { BlogPreviewSection }       from '@/components/marketing/blog-preview-section'
import { FaqSection }               from '@/components/marketing/faq-section'
import { NewsletterSection }        from '@/components/marketing/newsletter-section'

/* ── New sections (Wave 5) ── */
import { FirmSizeSection }          from '@/components/marketing/firm-size-section'
import { OnPremExplainerSection }   from '@/components/marketing/on-prem-explainer-section'

/* ── New sections (Wave 6) ── */
import { LiveCounterSection }       from '@/components/marketing/live-counter-section'
import { AttorneyWorkflowSection }  from '@/components/marketing/attorney-workflow-section'
import { TimelineVisualizerSection } from '@/components/marketing/timeline-visualizer-section'
import { DocumentTypesSection }     from '@/components/marketing/document-types-section'
import { AiAccuracySection }        from '@/components/marketing/ai-accuracy-section'
import { SpeedBenchmarkSection }    from '@/components/marketing/speed-benchmark-section'
import { OnboardingSection }        from '@/components/marketing/onboarding-section'

/* ── New sections (Wave 7) ── */
import { ClientResultsSection }     from '@/components/marketing/client-results-section'
import { PricingExplainerSection }  from '@/components/marketing/pricing-explainer-section'
import { FeatureSpotlightSection }  from '@/components/marketing/feature-spotlight-section'

export const metadata: Metadata = {
  title: 'Lawline — AI for Legal Teams',
  description:
    'Lawline turns raw case documents into structured timelines, client-safe drafts, and court-ready exhibits in seconds.',
}

export default function HomePage() {
  return (
    <>
      {/* ── 1. Hero — above-the-fold value prop ── */}
      <HeroSection />

      {/* ── 2. Press / credibility logos ── */}
      <PressLogosSection />

      {/* ── 3. Quantified stats bar ── */}
      <StatsBar />

      {/* ── 3b. Live platform counters ── */}
      <LiveCounterSection />

      {/* ── 4. Awards & recognition ── */}
      <AwardsSection />

      {/* ── 5. Features — 6-card grid ── */}
      <FeaturesSection />

      {/* ── 5c. Feature deep-dive spotlight ── */}
      <FeatureSpotlightSection />

      {/* ── 5b. Firm size tiers ── */}
      <FirmSizeSection />

      {/* ── 5c. Lawline vs alternatives comparison ── */}
      <ComparisonTableSection />

      {/* ── 6. How It Works — 3-step process ── */}
      <HowItWorksSection />

      {/* ── 6b. Attorney workflow across full case lifecycle ── */}
      <AttorneyWorkflowSection />

      {/* ── 7. Interactive product tour — 4-step walkthrough ── */}
      <ProductTourSection />

      {/* ── 7b. Onboarding: first timeline in 4 minutes ── */}
      <OnboardingSection />

      {/* ── 8. Practice area tabs — 6 practice areas ── */}
      <UseCasesSection />

      {/* ── 9. AI Agent pipeline demo ── */}
      <AiAgentDemoSection />

      {/* ── 9b. Sample timeline output visualizer ── */}
      <TimelineVisualizerSection />

      {/* ── 10. Monday morning before/after ── */}
      <DailyTasksSection />

      {/* ── 10b. Speed benchmark vs alternatives ── */}
      <SpeedBenchmarkSection />

      {/* ── 11. ROI calculator ── */}
      <RoiCalculatorSection />

      {/* ── 12. Security & compliance deep-dive ── */}
      <SecurityTrustSection />

      {/* ── 12b. On-prem vs Cloud explainer ── */}
      <OnPremExplainerSection />

      {/* ── 12c. AI accuracy & hallucination prevention ── */}
      <AiAccuracySection />

      {/* ── 13. Practice management integrations ── */}
      <IntegrationLogosSection />

      {/* ── 13b. Document types Lawline processes ── */}
      <DocumentTypesSection />

      {/* ── 14. Case study cards ── */}
      <CaseStudyCardsSection />

      {/* ── 14b. Client before/after results ── */}
      <ClientResultsSection />

      {/* ── 15. Testimonials ── */}
      <TestimonialsSection />

      {/* ── 15b. Pricing explainer with full feature compare ── */}
      <PricingExplainerSection />

      {/* ── 16. Demo request ── */}
      <DemoRequestSection />

      {/* ── 17. FAQ ── */}
      <FaqSection />

      {/* ── 18. Latest blog posts preview ── */}
      <BlogPreviewSection />

      {/* ── 19. Founder CTA ── */}
      <FounderCtaSection />

      {/* ── 20. Newsletter signup ── */}
      <NewsletterSection />
    </>
  )
}
