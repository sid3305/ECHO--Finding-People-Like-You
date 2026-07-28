import type { Metadata } from "next"
import { AuthShell } from "@/components/auth/auth-shell"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Sign in — echo",
  description: "Return to your constellation.",
}

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Return to orbit"
      subtitle="Your matches have been quietly forming while you were away."
    >
      <LoginForm />
    </AuthShell>
  )
}
