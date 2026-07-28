"use client"
import { Dice5 } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { EchoLogo } from "@/components/echo-logo"
import { CosmicAvatar } from "@/components/cosmic-avatar"
import { MbtiTest } from "@/components/onboarding/mbti-test"
import { MbtiReveal } from "@/components/onboarding/mbti-reveal"
import { useProfile } from "@/components/profile-provider"
import {
  generateUsername,
  getMbti,
  getZodiac,
  interestCategories,
  type MbtiInfo,
} from "@/lib/echo-data"

const steps = ["Profile", "Interests", "Personality", "Reveal", "Stars", "Complete"]

export function OnboardingFlow() {
  const router = useRouter()
  const { profile, update } = useProfile()
  const [step, setStep] = useState(0)
  const [mbtiInfo, setMbtiInfo] = useState<MbtiInfo | null>(
    profile.mbti ? getMbti(profile.mbti) : null,
  )
  const [search, setSearch] = useState("")
  const [custom, setCustom] = useState("")

  const lastInteractiveStep = steps.length - 1
  const progress = (step / lastInteractiveStep) * 100

  const toggleInterest = (interest: string) => {
    update({
      interests: profile.interests.includes(interest)
        ? profile.interests.filter((i) => i !== interest)
        : [...profile.interests, interest],
    })
  }

  const addCustom = () => {
    const value = custom.trim()
    if (value && !profile.interests.includes(value)) {
      update({ interests: [...profile.interests, value] })
    }
    setCustom("")
  }

  const handleDob = (dob: string) => {
    update({ dob })
    if (dob) {
      const [, m, d] = dob.split("-").map(Number)
      const sign = getZodiac(m, d)
      update({ zodiac: sign.name, zodiacSymbol: sign.symbol })
    }
  }

  const canContinue = () => {
    switch (step) {
      case 0:
  return (
    profile.username.trim().length >= 3 &&
    profile.age.trim() !== "" &&
    profile.gender !== "" &&
    profile.friendPreference !== ""
  )
      case 1:
        return profile.interests.length >= 3
      case 4:
        return profile.zodiac !== ""
      default:
        return true
    }
  }

  const finish = () => {
    update({ onboarded: true })
    router.push("/dashboard")
  }

  const showFooter = step !== 2 && step !== 3 && step !== lastInteractiveStep

  return (
    <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-2xl flex-col px-6 py-8">
      <header className="flex items-center justify-between">
        <Link href="/" aria-label="echo home">
          <EchoLogo />
        </Link>
        {step < lastInteractiveStep && (
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Step {Math.min(step + 1, lastInteractiveStep)} of {lastInteractiveStep}
          </span>
        )}
      </header>

      {step < lastInteractiveStep && (
        <div className="mt-6">
          <Progress value={progress} className="h-px" />
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
            {steps[step]}
          </p>
        </div>
      )}

      <div className="flex flex-1 flex-col justify-center py-10">
        {step === 0 && (
          <StepShell
            title="Tell us about yourself"
            description="Just enough to find the right orbit. This stays private until you choose to share."
          >
           <div className="space-y-2">
  <Label htmlFor="username">Username</Label>

  <div className="flex items-center gap-2">
    <Input
      id="username"
      value={profile.username}
      onChange={(e) =>
        update({
          username: e.target.value
            .toLowerCase()
            .replace(/\s+/g, "")
            .replace(/[^a-z0-9_.]/g, ""),
        })
      }
      className="h-12 bg-input/40"
    />

    <Button
      type="button"
      variant="outline"
      size="icon"
      className="h-12 w-12 shrink-0"
      onClick={() =>
        update({
          username: generateUsername(),
        })
      }
    >
      <Dice5 className="h-5 w-5" />
    </Button>
  </div>

  <p className="text-xs text-muted-foreground">
    We generated a username for you. Edit it or roll the dice for another.
  </p>
</div>
            <div className="flex flex-col gap-6">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  min={13}
                  max={120}
                  placeholder="e.g. 24"
                  value={profile.age}
                  onChange={(e) => update({ age: e.target.value })}
                  className="h-12 max-w-[140px] bg-input/40 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label>Gender</Label>
                <ChipRow
                  options={["Woman", "Man", "Non-binary", "Other"]}
                  value={profile.gender}
                  onChange={(v) => update({ gender: v })}
                />
              </div>

              <div className="space-y-2">
                <Label>I want to meet</Label>
                <ChipRow
                  options={["Female", "Male", "Everyone"]}
                  value={profile.friendPreference}
                  onChange={(v) =>
                    update({ friendPreference: v as typeof profile.friendPreference })
                  }
                />
              </div>
            </div>
          </StepShell>
        )}

        {step === 1 && (
          <StepShell
            title="What lights you up?"
            description="Choose at least 3. Interests are echo's strongest matching signal."
          >
            <Input
              placeholder="Search interests…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-5 h-11 bg-input/40"
            />
            <div className="flex flex-col gap-5">
              {interestCategories.map((group) => {
                const items = group.items.filter((i) =>
                  i.toLowerCase().includes(search.toLowerCase()),
                )
                if (items.length === 0) return null
                return (
                  <div key={group.category}>
                    <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      {group.category}
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {items.map((interest) => (
                        <InterestChip
                          key={interest}
                          label={interest}
                          active={profile.interests.includes(interest)}
                          onClick={() => toggleInterest(interest)}
                        />
                      ))}
                    </div>
                  </div>
                )
              })}

              <div>
                <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  Add your own
                </p>
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g. Astrophotography"
                    value={custom}
                    onChange={(e) => setCustom(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addCustom()
                      }
                    }}
                    className="h-11 bg-input/40"
                  />
                  <Button type="button" variant="secondary" onClick={addCustom}>
                    Add
                  </Button>
                </div>
                {profile.interests.some(
                  (i) =>
                    !interestCategories.flatMap((c) => c.items).includes(i),
                ) && (
                  <div className="mt-3 flex flex-wrap gap-2.5">
                    {profile.interests
                      .filter(
                        (i) =>
                          !interestCategories
                            .flatMap((c) => c.items)
                            .includes(i),
                      )
                      .map((interest) => (
                        <InterestChip
                          key={interest}
                          label={interest}
                          active
                          onClick={() => toggleInterest(interest)}
                        />
                      ))}
                  </div>
                )}
              </div>
            </div>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              {profile.interests.length} selected
            </p>
          </StepShell>
        )}

        {step === 2 && (
          <div>
            <div className="mb-8 text-center">
              <h1 className="text-balance font-serif text-4xl font-light tracking-tight text-foreground sm:text-5xl">
                The personality assessment
              </h1>
              <p className="mx-auto mt-3 max-w-md text-pretty font-serif leading-relaxed text-muted-foreground">
                Twenty quick reflections. There are no wrong answers — only your
                truest instinct.
              </p>
            </div>
            <MbtiTest
              onComplete={(type, info) => {
                update({ mbti: type })
                setMbtiInfo(info)
                setStep(3)
              }}
            />
          </div>
        )}

        {step === 3 && mbtiInfo && (
          <MbtiReveal info={mbtiInfo} onContinue={() => setStep(4)} />
        )}

        {step === 4 && (
          <StepShell
            title="When did your story begin?"
            description="Every story begins under a different sky.
Let's discover yours."
          >
            <div className="space-y-2">
              <Label htmlFor="dob">Date of birth</Label>
              <Input
                id="dob"
                type="date"
                value={profile.dob}
                onChange={(e) => handleDob(e.target.value)}
                className="h-12 max-w-[220px] bg-input/40 text-base"
              />
            </div>
            {profile.zodiac && (
              <div className="mt-10 border border-border bg-card/50 p-8 text-center animate-in fade-in duration-500">
                <div className="echo-sunset-text font-serif text-7xl">
                   {profile.zodiacSymbol}
                </div>

                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  Your sign
                </p>

                <h3 className="mt-2 font-serif text-4xl font-light text-foreground">
                   {profile.zodiac}
                </h3>
              </div>
            )}
          </StepShell>
        )}

        {step === lastInteractiveStep && (
          <CompleteStep onFinish={finish} />
        )}
      </div>

      {showFooter && (
        <footer className="flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="text-muted-foreground"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back
          </Button>
          <Button
            size="lg"
            onClick={() => setStep((s) => s + 1)}
            disabled={!canContinue()}
            className="group h-12 px-7"
          >
            {step === 4 ? "Map my constellation" : "Continue"}
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </footer>
      )}
    </div>
  )
}

function StepShell({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h1 className="text-balance font-serif text-4xl font-light tracking-tight text-foreground sm:text-5xl">
        {title}
      </h1>
      <p className="mt-3 text-pretty font-serif leading-relaxed text-muted-foreground">
        {description}
      </p>
      <div className="mt-8">{children}</div>
    </div>
  )
}

function ChipRow({
  options,
  value,
  onChange,
}: {
  options: string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={cn(
            "border px-4 py-2 text-sm transition-colors",
            value === opt
              ? "border-primary bg-primary text-primary-foreground scale-105 shadow-[0_0_20px_rgba(74,124,158,0.25)]"
              : "border-border bg-card/60 text-foreground hover:border-primary/50",
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

function InterestChip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card/60 text-foreground hover:border-primary/50",
      )}
    >
      {active && <Check className="mr-1 inline h-3.5 w-3.5" />}
      {label}
    </button>
  )
}

function CompleteStep({ onFinish }: { onFinish: () => void }) {
  const { profile } = useProfile()
  return (
    <div className="text-center">
      <div className="mb-6 flex flex-col items-center">
  <CosmicAvatar
    hue={profile.avatarHue}
    name={profile.username}
    size="xl"
  />

  <div className="mt-4 font-mono text-sm tracking-[0.5em] text-primary/80">
    ✦ ✦ ✦
  </div>
</div>
      <h1 className="text-balance font-serif text-4xl font-light tracking-tight text-foreground sm:text-5xl">
        Your constellation is mapped
      </h1>
      <p className="mx-auto mt-3 max-w-md text-pretty font-serif leading-relaxed text-muted-foreground">
        Welcome, {profile.username || "stargazer"}. echo is scanning the sky for
        kindred spirits.
      </p>

      <div className="mx-auto mt-8 max-w-sm border border-border bg-card/60 p-5 text-left backdrop-blur">
        <SummaryRow label="Identity" value={profile.username || "—"} />
        <SummaryRow
          label="Interests"
          value={`${profile.interests.length} selected`}
        />
        <SummaryRow label="Personality" value={profile.mbti || "—"} />
        <SummaryRow
          label="Zodiac"
          value={profile.zodiac ? `${profile.zodiacSymbol} ${profile.zodiac}` : "—"}
        />
      </div>

      <Button onClick={onFinish} size="lg" className="group mt-8 h-12 px-8">
        Enter echo
        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Button>
    </div>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  )
}
