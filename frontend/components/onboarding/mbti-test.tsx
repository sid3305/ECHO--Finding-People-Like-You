"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import {
  mbtiQuestions,
  scoreMbti,
  getMbti,
  type MbtiInfo,
} from "@/lib/echo-data"

const dimensionLabels: Record<string, string> = {
  EI: "Energy · Extraversion / Introversion",
  SN: "Information · Sensing / Intuition",
  TF: "Decisions · Thinking / Feeling",
  JP: "Structure · Judging / Perceiving",
}

export function MbtiTest({
  onComplete,
}: {
  onComplete: (type: string, info: MbtiInfo) => void
}) {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<("a" | "b")[]>([])

  const total = mbtiQuestions.length
  const q = mbtiQuestions[index]
  if (!q) {
  return <div>Question not found. Index: {index}</div>
}
  const progress = (index / total) * 100

  const choose = (choice: "a" | "b") => {
    const next = [...answers]
    next[index] = choice
    setAnswers(next)
    if (index < total - 1) {
      setTimeout(() => setIndex((i) => i + 1), 180)
    } else {
      const type = scoreMbti(next)
      onComplete(type, getMbti(type))
    }
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        <span>
          Question {index + 1} / {total}
        </span>
        <span className="text-primary">{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className="mt-3 h-px" />

      <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
        {dimensionLabels[q.dimension]}
      </p>
      <h2 className="mt-3 text-balance font-serif text-3xl font-light leading-tight text-foreground sm:text-4xl">
        {q.prompt}
      </h2>

      <div className="mt-8 flex flex-col gap-3">
        {(["a", "b"] as const).map((key) => {
          const opt = q[key]
          const active = answers[index] === key
          return (
            <button
              key={key}
              type="button"
              onClick={() => choose(key)}
              className={cn(
                "group flex items-center gap-4 border px-5 py-4 text-left transition-colors",
                active
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card/50 hover:border-primary/50",
              )}
            >
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-mono text-xs",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground group-hover:border-primary/60",
                )}
              >
                {active ? <Check className="h-3.5 w-3.5" /> : key.toUpperCase()}
              </span>
              <span className="text-pretty text-base leading-relaxed text-foreground">
                {opt.text}
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="text-muted-foreground"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="ghost"
          onClick={() => setIndex((i) => Math.min(total - 1, i + 1))}
          disabled={!answers[index] || index === total - 1}
          className="text-muted-foreground"
        >
          Next
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
