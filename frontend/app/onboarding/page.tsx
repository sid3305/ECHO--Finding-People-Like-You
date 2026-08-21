import { AuroraBackground } from '@/components/aurora-background'
import { OnboardingFlow } from '@/components/onboarding/onboarding-flow'

export default function OnboardingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <AuroraBackground density={50} />
      <OnboardingFlow />
    </div>
  )
}
