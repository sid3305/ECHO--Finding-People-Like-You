import { cn } from "@/lib/utils"

export function EchoLogo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-serif text-2xl font-normal tracking-tight text-foreground",
        className,
      )}
    >
      echo
    </span>
  )
}
