"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import {
  Compass,
  Heart,
  Home,
  MessageCircle,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useProfile } from "@/components/profile-provider"

const mobileNav = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/discover", label: "Discover", icon: Compass },
  { href: "/matches", label: "Matches", icon: Heart },
  { href: "/messages", label: "Messages", icon: MessageCircle },
  { href: "/insights", label: "Insights", icon: Sparkles },
]

export function AppGuard({ children }: { children: React.ReactNode }) {
  const { profile, hydrated } = useProfile()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (hydrated && !profile.onboarded) {
      router.replace(profile.username ? "/onboarding" : "/signup")
    }
  }, [hydrated, profile.onboarded, profile.username, router])

  if (!hydrated || !profile.onboarded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
          Aligning the stars…
        </p>
      </div>
    )
  }

  return (
    <>
      {children}
      <nav className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-around border-t border-border bg-card/80 px-2 py-2 backdrop-blur lg:hidden">
        {mobileNav.map((item) => {
          const active = pathname.startsWith(item.href)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 rounded-md px-3 py-1.5 text-[10px] uppercase tracking-wider transition-colors",
                active ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </>
  )
}
