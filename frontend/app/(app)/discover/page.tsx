"use client"

import { DiscoverDeck } from "@/components/app/discover-deck"

export default function DiscoverPage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-6 px-6 py-6 lg:px-8">
          <section className="overflow-hidden rounded-xl border border-border bg-card/60 backdrop-blur">
            <div className="echo-sunset-band h-1.5 w-full" />
            <div className="flex flex-col gap-4 p-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  Discover
                </p>
                <h1 className="font-serif text-3xl font-light text-foreground">
                  Find your cosmic connections
                </h1>
                <p className="mt-2 text-muted-foreground">
                  Swipe through profiles and find your next kindred spirit
                </p>
              </div>
            </div>
          </section>

          <div className="flex justify-center">
            <DiscoverDeck />
          </div>
        </div>
      </div>
    </div>
  )
}
