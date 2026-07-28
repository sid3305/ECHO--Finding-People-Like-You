"use client"

import { useMemo, useState } from "react"
import { Bookmark, Heart, RotateCcw, Sparkles, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { CosmicAvatar } from "@/components/cosmic-avatar"
import { MbtiBadge, ZodiacBadge } from "@/components/identity-badges"
import { CompatibilityRing, StatBar } from "@/components/app/ui-bits"
import { mockUsers, type MockUser } from "@/lib/echo-data"

type Action = "connect" | "save" | "skip"

export function DiscoverDeck() {
  const [index, setIndex] = useState(0)
  const [history, setHistory] = useState<Action[]>([])
  const [flash, setFlash] = useState<Action | null>(null)

  const deck = mockUsers
  const user = deck[index]

  const advance = (action: Action) => {
    setFlash(action)
    setHistory((h) => [...h, action])
    setTimeout(() => {
      setIndex((i) => i + 1)
      setFlash(null)
    }, 220)
  }

  const undo = () => {
    if (index === 0) return
    setIndex((i) => i - 1)
    setHistory((h) => h.slice(0, -1))
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <Sparkles className="h-8 w-8 text-primary" />
        <h2 className="mt-4 font-serif text-3xl font-light text-foreground">
          That&apos;s everyone for now
        </h2>
        <p className="mt-2 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
          You&apos;ve drifted through every soul in range. Check back as new
          constellations come into view.
        </p>
        <button
          onClick={() => {
            setIndex(0)
            setHistory([])
          }}
          className="mt-6 inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <RotateCcw className="h-4 w-4" />
          Start over
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="relative">
        {/* peek of next card */}
        {deck[index + 1] && (
          <div className="absolute inset-x-4 -bottom-3 top-3 -z-10 rounded-2xl border border-border bg-card/40" />
        )}
        <ProfileCard user={user} flash={flash} />
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <ActionButton
          label="Skip"
          icon={X}
          onClick={() => advance("skip")}
          variant="muted"
        />
        <ActionButton
          label="Save"
          icon={Bookmark}
          onClick={() => advance("save")}
          variant="accent"
        />
        <ActionButton
          label="Connect"
          icon={Heart}
          onClick={() => advance("connect")}
          variant="primary"
        />
      </div>
      <div className="mt-4 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        <button
          onClick={undo}
          disabled={index === 0}
          className="inline-flex items-center gap-1 transition-colors hover:text-foreground disabled:opacity-40"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Undo
        </button>
        <span>·</span>
        <span>
          {index + 1} / {deck.length}
        </span>
      </div>
    </div>
  )
}

function ProfileCard({
  user,
  flash,
}: {
  user: MockUser
  flash: Action | null
}) {
  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-card/70 backdrop-blur transition-all duration-200",
        flash === "connect" && "translate-x-6 rotate-2 opacity-0",
        flash === "skip" && "-translate-x-6 -rotate-2 opacity-0",
        flash === "save" && "scale-95 opacity-0",
      )}
    >
      <div
        className="h-28 w-full"
        style={{
          background: `radial-gradient(circle at 30% 20%, oklch(0.7 0.14 ${user.hue} / 0.5), transparent 60%), radial-gradient(circle at 80% 60%, oklch(0.6 0.12 ${(user.hue + 60) % 360} / 0.4), transparent 60%)`,
        }}
      />
      <div className="px-6 pb-6">
        <div className="-mt-10 flex items-end justify-between">
          <CosmicAvatar hue={user.hue} name={user.username} size="xl" online={user.online} />
          <CompatibilityRing value={user.compatibility} size={56} />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <h2 className="font-serif text-2xl font-light text-foreground">
            {user.username}
          </h2>
          <span className="font-mono text-sm text-muted-foreground">
            {user.age}
          </span>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <MbtiBadge type={user.mbti} />
          <ZodiacBadge symbol={user.zodiacSymbol} name={user.zodiac} />
        </div>
        <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">
          {user.bio}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {user.interests.map((i) => (
            <span
              key={i}
              className="rounded-full border border-border px-3 py-1 text-xs text-foreground"
            >
              {i}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-2.5 border-t border-border pt-5">
          <StatBar label="Interest match" value={user.breakdown.interest} />
          <StatBar label="Personality match" value={user.breakdown.mbti} />
          <StatBar label="Zodiac match" value={user.breakdown.zodiac} />
        </div>
      </div>
    </article>
  )
}

function ActionButton({
  label,
  icon: Icon,
  onClick,
  variant,
}: {
  label: string
  icon: typeof Heart
  onClick: () => void
  variant: "primary" | "accent" | "muted"
}) {
  const styles = {
    primary: "border-primary bg-primary text-primary-foreground h-16 w-16",
    accent: "border-accent text-accent h-14 w-14 hover:bg-accent/10",
    muted: "border-border text-muted-foreground h-14 w-14 hover:text-foreground",
  }
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={cn(
        "flex items-center justify-center rounded-full border transition-colors",
        styles[variant],
      )}
    >
      <Icon className={cn(variant === "primary" ? "h-6 w-6" : "h-5 w-5")} />
    </button>
  )
}

export function DiscoverFilters() {
  const allMbti = useMemo(
    () => Array.from(new Set(mockUsers.map((u) => u.mbti))),
    [],
  )
  const [mbti, setMbti] = useState<string[]>([])
  const [age, setAge] = useState(35)

  return (
    <div className="flex flex-col gap-6 rounded-xl border border-border bg-card/60 p-5 backdrop-blur">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          Age range
        </p>
        <input
          type="range"
          min={18}
          max={60}
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          className="mt-3 w-full accent-[var(--primary)]"
        />
        <p className="mt-1 font-mono text-xs text-foreground">18 – {age}</p>
      </div>

      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          Personality
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {allMbti.map((t) => {
            const active = mbti.includes(t)
            return (
              <button
                key={t}
                onClick={() =>
                  setMbti((prev) =>
                    active ? prev.filter((x) => x !== t) : [...prev, t],
                  )
                }
                className={cn(
                  "rounded-sm border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-foreground hover:border-primary/50",
                )}
              >
                {t}
              </button>
            )
          })}
        </div>
      </div>

      <p className="text-pretty text-xs leading-relaxed text-muted-foreground">
        Filters are illustrative in this preview — the deck shows a curated set
        of your strongest matches.
      </p>
    </div>
  )
}
