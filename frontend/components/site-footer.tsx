import { EchoLogo } from '@/components/echo-logo'

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <EchoLogo />
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {'\u00A9'} {new Date().getFullYear()} echo · Written in the stars
        </p>
        <div className="flex gap-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <a href="#privacy" className="transition-colors hover:text-foreground">
            Privacy
          </a>
          <a href="#how" className="transition-colors hover:text-foreground">
            How It Works
          </a>
        </div>
      </div>
    </footer>
  )
}
