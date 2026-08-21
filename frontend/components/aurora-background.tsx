"use client"

import { useMemo } from "react"

/**
 * Aurora background: a deep night sky with animated aurora ribbons,
 * faint hairline "constellation" grid, and a scatter of fixed stars.
 * Deterministic star placement keeps server/client markup identical.
 */
export function AuroraBackground({ density = 70 }: { density?: number }) {
  const stars = useMemo(() => {
    let seed = 7
    const rand = () => {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff
      return seed / 0x7fffffff
    }
    return Array.from({ length: density }, (_, i) => ({
      id: i,
      top: rand() * 100,
      left: rand() * 100,
      size: rand() * 1.6 + 0.6,
      delay: rand() * 6,
      duration: rand() * 4 + 3,
    }))
  }, [density])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* hairline constellation grid */}
      {/* <div className="echo-hairline absolute inset-0 opacity-60" /> */}
      {/* aurora ribbons */}
      <div className="echo-aurora-bg absolute inset-0" />
      <div
        className="echo-aurora-bg absolute inset-0"
        style={{ animationDelay: "-9s", animationDuration: "24s" }}
      />
      {/* fixed stars */}
      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute rounded-full bg-foreground"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animation: `echo-twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
          }}
        />
      ))}
      {/* vignette to keep edges deep */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,transparent_40%,oklch(0.13_0.03_250)_100%)]" />
    </div>
  )
}
