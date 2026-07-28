import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center sm:py-32">
        <p className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Anonymous · AI matched · Written in the stars
        </p>
        <h1 className="font-serif text-6xl font-light tracking-tight text-foreground sm:text-7xl">
          echo<span className="echo-sunset-text">.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-pretty font-serif text-lg leading-relaxed text-muted-foreground">
          The matchmaker that finds the people who echo back — decoding kinship
          through shared obsessions, personality, and the stars.
        </p>
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/signup"
            className="inline-flex h-11 items-center justify-center bg-foreground px-8 font-mono text-xs uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-90"
          >
            Find my people
          </Link>
          <Link
            href="#how"
            className="inline-flex h-11 items-center justify-center border border-border px-8 font-mono text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            How it works
          </Link>
        </div>
        <Link
          href="#signals"
          className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Or learn more
        </Link>
      </div>
    </section>
  )
}
