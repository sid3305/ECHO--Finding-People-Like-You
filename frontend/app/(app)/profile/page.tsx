"use client"

import { useProfile } from "@/components/profile-provider"
import { CosmicAvatar } from "@/components/cosmic-avatar"
import { MbtiBadge, ZodiacBadge } from "@/components/identity-badges"
import { getMbti } from "@/lib/echo-data"

export default function ProfilePage() {
  const { profile } = useProfile()
  const mbtiInfo = profile.mbti ? getMbti(profile.mbti) : null

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-6 px-6 py-6 lg:px-8 max-w-3xl">
          {/* Profile Header */}
          <section className="overflow-hidden rounded-xl border border-border bg-card/60 backdrop-blur">
            <div className="echo-sunset-band h-1.5 w-full" />
            <div className="p-6">
              <div className="flex items-start gap-6">
                <CosmicAvatar
                  hue={profile.avatarHue}
                  name={profile.username || "Echo"}
                  size="lg"
                />
                <div className="flex-1">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Your Profile
                  </p>
                  <h1 className="font-serif text-3xl font-light text-foreground">
                    {profile.username || "stargazer"}
                  </h1>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {profile.age || "Age not set"} years old
                    </span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">
                      {profile.gender || "Gender not set"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Personality */}
          <section className="rounded-xl border border-border bg-card/60 p-6 backdrop-blur">
            <h2 className="font-serif text-xl font-light text-foreground mb-4">
              Your Personality
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {/* MBTI */}
              <div className="rounded-lg border border-border/50 bg-background/40 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  Myers-Briggs Type
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <span className="echo-sunset-text font-serif text-3xl font-light">
                    {profile.mbti || "—"}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {mbtiInfo?.title || "Take the assessment"}
                    </p>
                  </div>
                </div>
                {mbtiInfo?.traits && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {mbtiInfo.traits.map((trait) => (
                      <span
                        key={trait}
                        className="rounded-sm border border-border bg-secondary/60 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Zodiac */}
              <div className="rounded-lg border border-border/50 bg-background/40 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  Astrological Sign
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-3xl">{profile.zodiacSymbol || "—"}</span>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {profile.zodiac || "Sign not set"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Interests */}
          <section className="rounded-xl border border-border bg-card/60 p-6 backdrop-blur">
            <h2 className="font-serif text-xl font-light text-foreground mb-4">
              Your Interests
            </h2>
            {profile.interests.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest) => (
                  <span
                    key={interest}
                    className="rounded-full border border-border px-3 py-1.5 text-sm text-foreground hover:border-primary transition-colors cursor-pointer"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">
                No interests added yet. Add some to find better matches!
              </p>
            )}
          </section>

          {/* Friends Preference */}
          <section className="rounded-xl border border-border bg-card/60 p-6 backdrop-blur">
            <h2 className="font-serif text-xl font-light text-foreground mb-4">
              Friends Preference
            </h2>
            <p className="text-sm text-foreground">
              {profile.friendPreference || "Preference not set"}
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
