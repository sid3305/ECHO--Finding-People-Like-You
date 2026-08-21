"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useProfile } from "@/components/profile-provider"
import { CosmicAvatar } from "@/components/cosmic-avatar"
import { generateUsername } from "@/lib/echo-data"

export function SignupForm() {
  const router = useRouter()
  const { update } = useProfile()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)
  const [identity, setIdentity] = useState<{ username: string; hue: number } | null>(null)

  const valid = email.includes("@") && password.length >= 6

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!valid) return
    const username = generateUsername()
    const hue = Math.floor(Math.random() * 360)
    setIdentity({ username, hue })
    update({ email, username, avatarHue: hue })
  }

  if (identity) {
    return (
      <div className="text-center">
        <div className="flex justify-center">
          <CosmicAvatar hue={identity.hue} name={identity.username} size="xl" />
        </div>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
          YOUR ECHO
        </p>
        <p className="mt-2 font-serif text-4xl font-light text-foreground">
          {identity.username}
        </p>
        <p className="mx-auto mt-3 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
          No real names, no photos — just you, distilled. You can reveal more as
          trust grows.
        </p>
        <Button
          onClick={() => router.push("/onboarding")}
          size="lg"
          className="group mt-8 h-12 w-full"
        >
          Begin onboarding
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@somewhere.space"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 bg-input/40 text-base"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={show ? "text" : "password"}
            autoComplete="new-password"
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 bg-input/40 pr-11 text-base"
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <Button type="submit" size="lg" disabled={!valid} className="group mt-2 h-12 transition-all duration-300 hover:-translate-y-0.5
                                                                   hover:shadow-[0_0_60px_rgba(74,124,158,0.6),0_0_100px_rgba(107,91,124,0.35)]">
        Create my identity
        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Button>
      <p className="text-center font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
        Already drifting?{" "}
        <Link href="/login" className="text-primary hover:text-foreground">
          Sign in
        </Link>
      </p>
    </form>
  )
}
