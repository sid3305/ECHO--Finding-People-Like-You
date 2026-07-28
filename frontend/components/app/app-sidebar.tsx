"use client"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Home,
  Compass,
  Heart,
  MessageCircle,
  Orbit,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { EchoLogo } from "@/components/echo-logo"
import { CosmicAvatar } from "@/components/cosmic-avatar"
import { MbtiBadge, ZodiacBadge } from "@/components/identity-badges"
import { useProfile } from "@/components/profile-provider"

const nav = [
  { href: "/dashboard", label: "For You", icon: Home },
  { href: "/discover", label: "Discover", icon: Compass },
  { href: "/matches", label: "Connections", icon: Heart },
  { href: "/messages", label: "Messages", icon: MessageCircle },
  // { href: "/universes", label: "Universes", icon: Orbit },
]

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { profile, reset } = useProfile()
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)

  const logout = () => {
    reset()
    router.push("/")
  }

  const isProfileOrSettings = pathname.startsWith("/profile") || pathname.startsWith("/settings")

  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-screen shrink-0 flex-col border-r border-border bg-card/30 px-4 py-6 backdrop-blur transition-all duration-300 lg:flex",
        collapsed ? "w-24" : "w-64"
      )}
    >
      {/* logo with collapse button */}
      <div className="mb-2 flex justify-start">
  <button
    onClick={() => setCollapsed(!collapsed)}
    className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card/40 text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
  >
    <Menu className="h-5 w-5" />
  </button>
</div>
      <Link
  href="/dashboard"
  aria-label="echo home"
  className={cn(
    "mb-1 px-2 transition-all",
    collapsed && "flex justify-center px-0"
  )}
>
  {!collapsed && <EchoLogo />}
</Link>

      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {nav.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(item.href + "/")
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
              )}
            >
             <Icon
               className={cn("h-[18px] w-[18px] shrink-0", active && "text-primary")}
             />

             {!collapsed && item.label}
            </Link>
          )
        })}
      </nav>

      <div className="mt-4 border-t border-border pt-4 relative">
        {/* Profile Submenu - Opens Upwards */}
        {profileMenuOpen && (
          <div className="absolute bottom-full mb-2 left-0 right-0 flex flex-col gap-1 rounded-md bg-secondary/30 p-2 border border-border">
            <Link
              href="/profile"
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                pathname === "/profile"
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
              )}
              onClick={() => setProfileMenuOpen(false)}
            >
              Profile
            </Link>
            <Link
              href="/settings"
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                pathname === "/settings"
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
              )}
              onClick={() => setProfileMenuOpen(false)}
            >
              <Settings className="h-[18px] w-[18px]" />
              Settings
            </Link>
          </div>
        )}

        {/* Profile Card - Collapsible */}
        <button
          onClick={() => setProfileMenuOpen(!profileMenuOpen)}
          className="w-full flex items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-secondary/50"
        >
          <CosmicAvatar
            hue={profile.avatarHue}
            name={profile.username || "Echo"}
            size="md"
          />
          {!collapsed && (
            <div className="min-w-0 flex-1 text-left">
              <p className="truncate text-sm font-medium text-foreground">
                {profile.username || "stargazer"}
              </p>

              <div className="mt-1 flex items-center gap-1.5">
                <MbtiBadge type={profile.mbti} />
                <ZodiacBadge symbol={profile.zodiacSymbol} />
              </div>
            </div>
          )}
          {!collapsed && (
           <ChevronDown
             className={cn(
               "h-4 w-4 text-muted-foreground transition-transform",
               profileMenuOpen && "rotate-180"
            )}
             />
          )}     
        </button>

        <button
          onClick={logout}
          className="mt-2 flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground"
        >
          <LogOut className="h-[18px] w-[18px]" />
         {!collapsed && "Log out"}
        </button>
      </div>
    </aside>
  )
}
