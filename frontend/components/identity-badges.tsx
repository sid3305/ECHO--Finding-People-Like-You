import { cn } from "@/lib/utils"

export function MbtiBadge({ type, className }: { type: string; className?: string }) {
  if (!type) return null
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border border-border bg-secondary/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground",
        className,
      )}
    >
      {type}
    </span>
  )
}

export function ZodiacBadge({
  symbol,
  name,
  className,
}: {
  symbol: string
  name?: string
  className?: string
}) {
  if (!symbol) return null
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-sm border border-border bg-secondary/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground",
        className,
      )}
    >
      <span className="text-primary">{symbol}</span>
      {name}
    </span>
  )
}
