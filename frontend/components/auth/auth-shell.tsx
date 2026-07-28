import Link from "next/link"
import { AuroraBackground } from "@/components/aurora-background"
import { EchoLogo } from "@/components/echo-logo"

export function AuthShell({
  children,
  eyebrow,
  title,
  subtitle,
}: {
  children: React.ReactNode
  eyebrow: string
  title: string
  subtitle: string
}) {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <AuroraBackground />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-md flex-col px-6 py-8">
        <header>
          <Link href="/" aria-label="echo home">
            <EchoLogo />
          </Link>
        </header>

        <div className="flex flex-1 flex-col justify-center py-10">
          <div className="mb-8">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/70">
                 Identity • 1/4
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/70">
                25%
              </span>
          </div>

          <div className="h-[2px] w-full bg-white/10">
            <div className="h-full w-1/4 bg-primary transition-all duration-500" />
            </div>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
            {eyebrow}
          </p>
          <h1 className="mt-3 text-balance font-serif text-4xl font-light leading-tight tracking-tight text-foreground sm:text-5xl">
            {title}
          </h1>
          <p className="mt-3 text-pretty font-serif leading-relaxed text-muted-foreground">
            {subtitle}
          </p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </main>
  )
}
