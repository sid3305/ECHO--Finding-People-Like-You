"use client"

import Link from "next/link"
import { mockUsers } from "@/lib/echo-data"
import { CosmicAvatar } from "@/components/cosmic-avatar"
import { MbtiBadge, ZodiacBadge } from "@/components/identity-badges"
import { CompatibilityRing, StatBar } from "@/components/app/ui-bits"

export default function MatchesPage() {
  const matches = mockUsers.slice(0, 12) // Show more matches on dedicated page

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-6 px-6 py-6 lg:px-8">
          {/* Header */}
          <section className="overflow-hidden rounded-xl border border-border bg-card/60 backdrop-blur">
            <div className="echo-sunset-band h-1.5 w-full" />
            <div className="flex flex-col gap-4 p-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  Matches
                </p>
                <h1 className="font-serif text-3xl font-light text-foreground">
                  Your cosmic connections
                </h1>
                <p className="mt-2 text-muted-foreground">
                  All your matches in one place
                </p>
              </div>
            </div>
          </section>

          {/* Matches Grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {matches.map((match) => (
              <article
                key={match.id}
                className="flex flex-col rounded-xl border border-border bg-card/60 p-5 backdrop-blur transition-all hover:border-border/80"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3 flex-1">
                    <CosmicAvatar
                      hue={match.hue}
                      name={match.username}
                      size="md"
                      online={match.online}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        {match.username}
                      </p>
                      <div className="mt-1 flex items-center gap-1.5">
                        <MbtiBadge type={match.mbti} />
                        <ZodiacBadge symbol={match.zodiacSymbol} />
                      </div>
                    </div>
                  </div>
                  <CompatibilityRing value={match.compatibility} size={44} />
                </div>

                {/* Shared Signals */}
                <div className="mb-4 pb-4 border-b border-border">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    Shared Signals
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {["Photography", "Film Making", "Travel"].map((signal) => (
                      <span
                        key={signal}
                        className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] text-primary"
                      >
                        {signal}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-2 mb-4">
                  <StatBar label="Interests" value={match.breakdown.interest} />
                  <StatBar label="Personality" value={match.breakdown.mbti} />
                  <StatBar label="Zodiac" value={match.breakdown.zodiac} />
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link
                    href="/discover"
                    className="flex-1 rounded-md border border-border py-2 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    View
                  </Link>
                  <Link
                    href="/messages"
                    className="flex-1 rounded-md bg-primary py-2 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    Connect
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
