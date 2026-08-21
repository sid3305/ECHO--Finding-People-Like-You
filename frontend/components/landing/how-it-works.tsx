const steps = [
  {
    number: '01',
    title: 'Share your signals',
    description:
      'Tell us your interests, your MBTI type, and your zodiac sign. It takes about two minutes and stays private.',
  },
  {
    number: '02',
    title: 'Let echo listen',
    description:
      'Our matching engine compares your signals against the constellation of members to find genuine overlap.',
  },
  {
    number: '03',
    title: 'Meet your match',
    description:
      'Get a small, curated set of compatible people each week. Chat anonymously until you both decide to reveal more.',
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="relative z-10 border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Better together
          </p>
          <h2 className="mt-4 text-balance font-serif text-4xl font-light tracking-tight text-foreground sm:text-5xl">
            How echo works
          </h2>
          <p className="mt-4 text-pretty font-serif leading-relaxed text-muted-foreground">
            A calm, intentional path from stranger to kindred spirit.
          </p>
        </div>
        <div className="mx-auto mt-14 max-w-3xl">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex items-baseline gap-6 border-t border-border py-8 last:border-b"
            >
              <span className="font-mono text-sm text-primary">
                {step.number}
              </span>
              <div>
                <h3 className="font-serif text-2xl font-normal text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
