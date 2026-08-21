const signals = [
  {
    glyph: '☉',
    label: 'Shared Interests',
    title: 'What lights you up',
    description:
      'From vinyl records to midnight hikes, echo learns your obsessions and finds the people chasing the same sparks.',
  },
  {
    glyph: '☿',
    label: 'Personality · MBTI',
    title: 'How you connect',
    description:
      'Your type shapes the way you bond. We pair complementary minds — the dreamers, the builders, the explorers.',
  },
  {
    glyph: '☽',
    label: 'The Stars · Zodiac',
    title: 'Where you align',
    description:
      'Elements meet in surprising ways. We weigh the sky to add a little cosmic chemistry to every introduction.',
  },
]

export function Signals() {
  return (
    <section id="signals" className="relative z-10 border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            What is this
          </p>
          <h2 className="mt-4 text-balance font-serif text-4xl font-light tracking-tight text-foreground sm:text-5xl">
            Three signals, one connection
          </h2>
          <p className="mt-4 text-pretty font-serif leading-relaxed text-muted-foreground">
            echo blends what you love, who you are, and where you fall among the
            stars into a single matching score.
          </p>
        </div>
        <div className="mt-14 grid border-t border-border sm:grid-cols-3 sm:border-l">
          {signals.map((signal) => (
            <div
              key={signal.title}
              className="group border-b border-border p-8 transition-colors hover:bg-card/40 sm:border-b-0 sm:border-r"
            >
              <span className="font-serif text-4xl text-primary">
                {signal.glyph}
              </span>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {signal.label}
              </p>
              <h3 className="mt-2 font-serif text-2xl font-normal text-foreground">
                {signal.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {signal.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
