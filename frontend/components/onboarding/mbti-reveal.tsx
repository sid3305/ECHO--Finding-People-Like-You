"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { MbtiInfo } from "@/lib/echo-data"

export function MbtiReveal({
  info,
  onContinue,
}: {
  info: MbtiInfo
  onContinue: () => void
}) {
  return (
    <div className="mx-auto w-full max-w-xl text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
      <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
        Your personality, decoded
      </p>
      <h1 className="echo-sunset-text mt-4 font-serif text-7xl font-light tracking-tight sm:text-8xl drop-shadow-[0_0_25px_rgba(255,160,200,0.25)]">
        {info.type}
      </h1>
      <p className="mt-2 font-serif text-2xl font-light italic text-foreground">
        {info.title}
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {info.traits.map((t) => (
    <span
      key={t}
      className="flex items-center gap-2 rounded-sm border border-border bg-secondary/60 px-3 py-1 text-sm text-foreground"
    >
      <span className="text-primary">✦</span>
      <span>{t}</span>
    </span>
       ))}
       </div>
      <p className="mx-auto mt-6 max-w-md text-pretty font-serif leading-relaxed text-muted-foreground">
        {info.description}
      </p>

      <div className="mt-8 grid gap-4 text-left sm:grid-cols-2">
        <RevealCard title="Strengths" items={info.strengths} accent="text-primary" />
        <RevealCard title="Growth edges" items={info.weaknesses} accent="text-accent" />
      </div>

      <div className="mt-4 border border-border bg-card/50 p-5 text-left">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Communication style
        </p>
        <p className="mt-2 text-pretty leading-relaxed text-foreground">
          {info.communication}
        </p>
      </div>

      <Button
        onClick={onContinue}
        size="lg"
        className="group mt-8 h-12 px-7"
      >
        Continue
        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Button>
    </div>
  )
}

function RevealCard({
  title,
  items,
  accent,
}: {
  title: string
  items: string[]
  accent: string
}) {
  return (
    <div className="border border-border bg-card/50 p-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        {title}
      </p>
      <ul className="mt-3 flex flex-col gap-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-foreground">
            <span className={accent}>✦</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
