import Link from "next/link"
import { EchoLogo } from "@/components/echo-logo"

const navItems = [
  { href: "#how", label: "How It Works" },
  { href: "#signals", label: "The Signals" },
  { href: "#privacy", label: "Privacy" },
  { href: "/login", label: "Sign In" },
]

export function SiteHeader() {
  return (
    <header className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
      <Link href="/" aria-label="echo home">
        <EchoLogo />
      </Link>
      <nav className="hidden items-center gap-7 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground md:flex">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="transition-colors hover:text-primary"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <Link
        href="/signup"
        className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary transition-colors hover:text-foreground md:hidden"
      >
        Begin
      </Link>
    </header>
  )
}
