import { cn } from "@/lib/utils"

const sizes = {
  sm: "h-8 w-8 text-[11px]",
  md: "h-10 w-10 text-xs",
  lg: "h-14 w-14 text-sm",
  xl: "h-20 w-20 text-lg",
}

export function CosmicAvatar({
  hue,
  name,
  size = "md",
  online,
  className,
}: {
  hue: number
  name: string
  size?: keyof typeof sizes
  online?: boolean
  className?: string
}) {
  const initials = name
    .replace(/[^a-zA-Z]/g, " ")
    .trim()
    .slice(0, 2)
    .toUpperCase()

  return (
    <span className={cn("relative inline-flex shrink-0", className)}>
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full font-mono font-medium text-background",
          sizes[size],
        )}
        style={{
          background: `radial-gradient(circle at 30% 25%, oklch(0.85 0.12 ${hue}) 0%, oklch(0.6 0.14 ${hue}) 55%, oklch(0.4 0.1 ${(hue + 40) % 360}) 100%)`,
        }}
        aria-hidden
      >
        {initials || "EC"}
      </span>
      {online && (
        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-primary" />
      )}
    </span>
  )
}
