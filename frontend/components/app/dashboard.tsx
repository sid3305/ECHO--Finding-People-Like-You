"use client"
import { conversations } from "@/lib/echo-data"
import { useState } from "react"
import Link from "next/link"
import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { CosmicAvatar } from "@/components/cosmic-avatar"
import { MbtiBadge, ZodiacBadge } from "@/components/identity-badges"
import { CompatibilityRing, StatBar } from "@/components/app/ui-bits"
import { useProfile } from "@/components/profile-provider"
import {
  feedPosts,
  mockUsers,
  questionOfTheDay,
  getMbti,
} from "@/lib/echo-data"
export function DashboardFeed() {
  const { profile } = useProfile()

  return (
    <div className="flex flex-col gap-8 px-6 py-8 lg:px-8">
      <section className="overflow-hidden rounded-xl border border-border bg-card/60 backdrop-blur">
        <div className="echo-sunset-band h-1.5 w-full" />

        <div className="p-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Good Evening 🌙
          </p>

          <h1 className="mt-3 font-serif text-3xl font-light text-foreground">
            {profile.username || "Stargazer"}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
            We found{" "}
            <span className="font-semibold text-foreground">
              {mockUsers.length}
            </span>{" "}
            people who share your interests. Start exploring meaningful
            conversations.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {(profile.interests.length
              ? profile.interests
              : ["Photography", "Music", "UI/UX"])
              .slice(0, 4)
              .map((interest) => (
                <span
                  key={interest}
                  className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-foreground"
                >
                  {interest}
                </span>
              ))}
          </div>

          <Link
            href="/discover"
            className="mt-6 inline-flex items-center rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:opacity-90"
          >
            Discover People →
          </Link>
        </div>
      </section>
      <RecommendedSection />
      
{/* <section className="mt-16">
  <div className="mb-6 flex items-end justify-between">
    <div>
      <h2 className="font-serif text-3xl font-light text-foreground">
        Continue Conversations
      </h2>

      <p className="mt-1 text-sm text-muted-foreground">
        Pick up where you left off.
      </p>
    </div>

    <Link
      href="/messages"
      className="text-sm text-primary transition-colors hover:text-foreground"
    >
      See all →
    </Link>
  </div>

  <div className="grid gap-4">
    {conversations.slice(0, 3).map((conversation) => (
      <Link
        key={conversation.id}
        href="/messages"
        className="group flex items-center justify-between rounded-xl border border-border bg-card/60 p-5 backdrop-blur transition-all hover:border-primary/40 hover:bg-card"
      >
        <div className="flex flex-col items-start">
          <CosmicAvatar
            hue={conversation.hue}
            name={conversation.username}
            size="md"
            online={conversation.online}
          />

          <div>
            <h3 className="font-medium text-foreground">
              {conversation.username}
            </h3>

            <p className="mt-1 max-w-md truncate text-sm text-muted-foreground">
              {conversation.preview}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          {conversation.unread > 0 && (
            <span className="rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground">
              {conversation.unread}
            </span>
          )}

          <span className="text-xs text-muted-foreground">
            Continue →
          </span>
        </div>
      </Link>
    ))}
  </div>
</section> */}
{/* <section className="mt-16">
  <div className="mb-6 flex items-end justify-between">
    <div>
      <h2 className="font-serif text-3xl font-light text-foreground">
        Recent Connections
      </h2>

      <p className="mt-1 text-sm text-muted-foreground">
        People you've recently connected with.
      </p>
    </div>

    <Link
      href="/connections"
      className="text-sm text-primary transition-colors hover:text-foreground"
    >
      See all →
    </Link>
  </div>

  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
    {mockUsers.slice(3, 6).map((user) => (
      <article
        key={user.id}
        className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
      >
        <div className="flex flex-col items-start">
          <CosmicAvatar
            hue={user.hue}
            name={user.username}
            size="md"
            online={user.online}
          />

          <div>
            <h3 className="font-medium text-foreground">
              {user.username}
            </h3>

            <p className="text-sm text-muted-foreground">
              {user.age} years old
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {user.interests.slice(0, 3).map((interest) => (
            <span
              key={interest}
             className="rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs text-foreground"
            >
              {interest}
            </span>
          ))}
        </div>

        <Link
          href={`/discover?id=${user.id}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-foreground"
        >
          View Profile →
        </Link>
      </article>
    ))}
  </div>
</section> */}
    </div>
  )
}

function FeedAction({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: typeof Heart
  label: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors",
        active ? "text-primary" : "text-muted-foreground hover:text-foreground",
      )}
    >
      <Icon className={cn("h-4 w-4", active && "fill-primary")} />
      {label}
    </button>
  )
}
export function RecommendedSection() {
  const users = mockUsers.slice(0, 3)

  return (
    <section className="mt-16">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="font-serif text-3xl font-light text-foreground">
            Recommended For You
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            People chosen for you based on shared interests and personality.
          </p>
        </div>

        <Link
          href="/discover"
          className="text-sm text-primary hover:text-foreground transition-colors"
        >
          See all →
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {users.map((user) => (
          <article
            key={user.id}
            className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur transition-all duration-300 hover:border-primary/40 hover:-translate-y-1"
          >
            <div className="flex flex-col items-start">
              <CosmicAvatar
                hue={user.hue}
                name={user.username}
                size="lg"
                online={user.online}
              />

              <div className="flex flex-col">
                <h3 className="font-serif text-xl font-light text-foreground">
                  {user.username}
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  {user.age} years old
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {user.interests.slice(0, 3).map((interest) => (
                <span
                  key={interest}
                  className="rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs text-foreground"
                >
                  {interest}
                </span>
              ))}
            </div>

            <Link
    href={`/discover?id=${user.id}`}
    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-foreground"
>
    View Profile →
</Link>
          </article>
        ))}
      </div>
    </section>
  )
}
