"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useProfile } from "@/components/profile-provider"
import { generateUsername } from "@/lib/echo-data"

export function LoginForm() {
  const router = useRouter()
  const { profile, update } = useProfile()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)

  const valid = email.includes("@") && password.length >= 1

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!valid) return
    // Mock auth: ensure an identity exists, then route based on onboarding state.
    if (!profile.username) {
      update({
        email,
        username: generateUsername(),
        avatarHue: Math.floor(Math.random() * 360),
      })
    } else {
      update({ email })
    }
    router.push(profile.onboarded ? "/dashboard" : "/onboarding")
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
            autoComplete="current-password"
            placeholder="Your password"
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
      <Button type="submit" size="lg" disabled={!valid} className="group mt-2 h-12">
        Sign in
        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Button>
      <p className="text-center font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
        New here?{" "}
        <Link href="/signup" className="text-primary hover:text-foreground">
          Create an identity
        </Link>
      </p>
    </form>
  )
}
