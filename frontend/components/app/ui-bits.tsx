import { cn } from "@/lib/utils"

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string
  subtitle?: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border px-6 py-6 lg:px-8">
      <div>
        <h1 className="font-serif text-3xl font-light tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-pretty text-sm leading-relaxed text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
      {action}
    </div>
  )
}

export function CompatibilityRing({
  value,
  size = 56,
  className,
}: {
  value: number
  size?: number
  className?: string
}) {
  const stroke = 4
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c - (value / 100) * c
  return (
    <span
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--border)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--primary)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="absolute font-mono text-xs font-medium text-foreground">
        {value}
      </span>
    </span>
  )
}

export function StatBar({
  label,
  value,
}: {
  label: string
  value: number
}) {
  return (
    <div>
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
        <span>{label}</span>
        <span className="text-foreground">{value}%</span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}
