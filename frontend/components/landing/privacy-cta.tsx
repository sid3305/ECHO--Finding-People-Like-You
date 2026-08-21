import Link from 'next/link'

const points = [
  {
    glyph: '☾',
    title: 'Anonymous by default',
    text: 'No photos or real names required. You stay a constellation, not a profile, until you choose otherwise.',
  },
  {
    glyph: '♁',
    title: 'Your signals, your control',
    text: 'Edit or delete your interests, type, and sign at any time. Nothing is sold or shared.',
  },
  {
    glyph: '✶',
    title: 'Safe introductions',
    text: 'Every match is mutual. Conversations only open when both people opt in.',
  },
]

export function PrivacyCta() {
  return (
    <section id="privacy" className="relative z-10">
      {/* Fill-in-the-blank moment on a sunset band */}
      <div className="echo-sunset-band">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center text-background">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-background/70">
            Looking 4 a sign?
          </p>
          <p className="mx-auto mt-8 max-w-2xl font-mono text-lg leading-loose sm:text-xl">
            {'I was born under '}
            <span className="border-b border-background/50 px-2 pb-1 font-serif italic">
              a sign
            </span>
            {', I think like an '}
            <span className="border-b border-background/50 px-2 pb-1 font-serif italic">
              MBTI
            </span>
            {', and I am into '}
            <span className="border-b border-background/50 px-2 pb-1 font-serif italic">
              everything
            </span>
            {'.'}
          </p>
          <Link
            href="/onboarding"
            className="mt-10 inline-flex h-11 items-center justify-center border border-background/60 bg-background/10 px-8 font-mono text-xs uppercase tracking-[0.2em] text-background backdrop-blur transition-colors hover:bg-background hover:text-foreground"
          >
            Cast my chart
          </Link>
        </div>
      </div>

      {/* Privacy points */}
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Privacy
          </p>
          <h2 className="mt-4 text-balance font-serif text-4xl font-light tracking-tight text-foreground sm:text-5xl">
            Connection without exposure
          </h2>
        </div>
        <div className="mt-12 grid border-t border-border sm:grid-cols-3 sm:border-l">
          {points.map((point) => (
            <div
              key={point.title}
              className="border-b border-border p-8 sm:border-b-0 sm:border-r"
            >
              <span className="font-serif text-3xl text-primary">
                {point.glyph}
              </span>
              <h3 className="mt-5 font-serif text-xl font-normal text-foreground">
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {point.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
