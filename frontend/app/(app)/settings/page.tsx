"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useProfile } from "@/components/profile-provider"
import { cn } from "@/lib/utils"

export default function SettingsPage() {
  const router = useRouter()
  const { profile, reset } = useProfile()
  const [settings, setSettings] = useState({
    notifications: true,
    privateProfile: false,
    darkMode: true,
  })

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleLogout = () => {
    reset()
    router.push("/")
  }

  const SettingToggle = ({
    label,
    description,
    value,
    onChange,
  }: {
    label: string
    description: string
    value: boolean
    onChange: () => void
  }) => (
    <div className="flex items-start justify-between border-b border-border/50 py-4 last:border-0">
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </div>
      <button
        onClick={onChange}
        className={cn(
          "relative ml-4 h-6 w-11 rounded-full transition-all flex-shrink-0",
          value ? "bg-primary" : "bg-secondary"
        )}
      >
        <div
          className={cn(
            "absolute top-1 h-4 w-4 rounded-full bg-white transition-transform",
            value ? "translate-x-[22px]" : "translate-x-1"
          )}
        />
      </button>
    </div>
  )

  const SettingButton = ({
    label,
    description,
    onClick,
  }: {
    label: string
    description: string
    onClick: () => void
  }) => (
    <button
      onClick={onClick}
      className="w-full border-b border-border/50 py-4 text-left transition-colors hover:bg-secondary/20 px-0 last:border-0"
    >
      <p className="text-sm font-medium text-foreground">{label}</p>
      <p className="mt-1 text-xs text-muted-foreground">{description}</p>
    </button>
  )

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-6 px-6 py-6 lg:px-8 max-w-2xl">
          {/* Header */}
          <section className="overflow-hidden rounded-xl border border-border bg-card/60 backdrop-blur">
            <div className="echo-sunset-band h-1.5 w-full" />
            <div className="p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Settings
              </p>
              <h1 className="font-serif text-3xl font-light text-foreground">
                Preferences
              </h1>
              <p className="mt-2 text-muted-foreground">
                Manage your account and customize your experience
              </p>
            </div>
          </section>

          {/* Notifications */}
          <section className="rounded-xl border border-border bg-card/60 p-6 backdrop-blur">
            <h2 className="font-serif text-lg font-light text-foreground mb-4">
              Notifications
            </h2>
            <div>
              <SettingToggle
                label="Push Notifications"
                description="Receive notifications about matches and messages"
                value={settings.notifications}
                onChange={() => toggleSetting("notifications")}
              />
              <SettingToggle
                label="Email Updates"
                description="Receive weekly digest emails"
                value={settings.notifications}
                onChange={() => toggleSetting("notifications")}
              />
            </div>
          </section>

          {/* Privacy */}
          <section className="rounded-xl border border-border bg-card/60 p-6 backdrop-blur">
            <h2 className="font-serif text-lg font-light text-foreground mb-4">
              Privacy & Safety
            </h2>
            <div>
              <SettingToggle
                label="Private Profile"
                description="Only people you connect with can see your profile"
                value={settings.privateProfile}
                onChange={() => toggleSetting("privateProfile")}
              />
              <SettingButton
                label="Blocked Users"
                description="Manage your blocked users list"
                onClick={() => {}}
              />
              <SettingButton
                label="Report an Issue"
                description="Report inappropriate behavior or content"
                onClick={() => {}}
              />
            </div>
          </section>

          {/* Display */}
          <section className="rounded-xl border border-border bg-card/60 p-6 backdrop-blur">
            <h2 className="font-serif text-lg font-light text-foreground mb-4">
              Display
            </h2>
            <div>
              <SettingToggle
                label="Dark Mode"
                description="Use dark theme throughout the app"
                value={settings.darkMode}
                onChange={() => toggleSetting("darkMode")}
              />
              <SettingButton
                label="Theme"
                description="Customize your color scheme"
                onClick={() => {}}
              />
            </div>
          </section>

          {/* Data */}
          <section className="rounded-xl border border-border bg-card/60 p-6 backdrop-blur">
            <h2 className="font-serif text-lg font-light text-foreground mb-4">
              Data
            </h2>
            <div>
              <SettingButton
                label="Download Your Data"
                description="Get a copy of all your personal data"
                onClick={() => {}}
              />
              <SettingButton
                label="Clear Browsing Data"
                description="Remove temporary files and cache"
                onClick={() => {}}
              />
            </div>
          </section>

          {/* Account */}
          <section className="rounded-xl border border-border bg-card/60 p-6 backdrop-blur">
            <h2 className="font-serif text-lg font-light text-foreground mb-4">
              Account
            </h2>
            <div>
              <SettingButton
                label="Change Password"
                description="Update your password for security"
                onClick={() => {}}
              />
              <SettingButton
                label="Sign Out"
                description="Sign out of this device"
                onClick={handleLogout}
              />
              <button
                onClick={() => {}}
                className="w-full border-b border-border/50 py-4 text-left transition-colors hover:bg-red-900/20 px-0 last:border-0"
              >
                <p className="text-sm font-medium text-red-500">Delete Account</p>
                <p className="mt-1 text-xs text-red-500/70">
                  Permanently delete your account and data
                </p>
              </button>
            </div>
          </section>

          {/* Version */}
          <div className="text-center py-6 border-t border-border/50 mt-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              Echo v1.0.0
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              © 2024 Echo. Find the people who echo back.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
