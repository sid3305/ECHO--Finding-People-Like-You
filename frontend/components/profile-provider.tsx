"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

export type EchoProfile = {
  email: string
  username: string
  avatarHue: number
  age: string
  gender: string
  friendPreference: "Male" | "Female" | "Everyone" | ""
  interests: string[]
  mbti: string
  zodiac: string
  zodiacSymbol: string
  dob: string
  bio: string
  onboarded: boolean
}

const defaultProfile: EchoProfile = {
  email: "",
  username: "",
  avatarHue: 162,
  age: "",
  gender: "",
  friendPreference: "",
  interests: [],
  mbti: "",
  zodiac: "",
  zodiacSymbol: "",
  dob: "",
  bio: "",
  onboarded: false,
}

const STORAGE_KEY = "echo:profile"

type Ctx = {
  profile: EchoProfile
  update: (patch: Partial<EchoProfile>) => void
  reset: () => void
  hydrated: boolean
}

const ProfileContext = createContext<Ctx | null>(null)

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<EchoProfile>(defaultProfile)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setProfile({ ...defaultProfile, ...JSON.parse(raw) })
    } catch {
      // ignore
    }
    setHydrated(true)
  }, [])

  const update = useCallback((patch: Partial<EchoProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...patch }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // ignore
      }
      return next
    })
  }, [])

  const reset = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
    setProfile(defaultProfile)
  }, [])

  const value = useMemo(
    () => ({ profile, update, reset, hydrated }),
    [profile, update, reset, hydrated],
  )

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  )
}

export function useProfile() {
  const ctx = useContext(ProfileContext)
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider")
  return ctx
}
