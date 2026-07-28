import { AuroraBackground } from '@/components/aurora-background'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/landing/hero'
import { Signals } from '@/components/landing/signals'
import { HowItWorks } from '@/components/landing/how-it-works'
import { PrivacyCta } from '@/components/landing/privacy-cta'

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <AuroraBackground density={80} />
      <SiteHeader />
      <main>
        <Hero />
        <Signals />
        <HowItWorks />
        <PrivacyCta />
      </main>
      <SiteFooter />
    </div>
  )
}
