import type { Metadata } from "next"
import { AuthShell } from "@/components/auth/auth-shell"
import { SignupForm } from "@/components/auth/signup-form"

export const metadata: Metadata = {
  title: "Sign up — echo",
  description: "Create your anonymous echo identity and find your constellation.",
}

export default function SignupPage() {
  return (
    <AuthShell
      eyebrow="Step into the dark"
      title="Create your identity"
      subtitle="Two details to begin. We'll spin you an anonymous name and avatar — no photos, no real names, just the real you."
    >
      <SignupForm />
    </AuthShell>
  )
}
