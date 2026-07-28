import { AuroraBackground } from "@/components/aurora-background"
import { AppSidebar } from "@/components/app/app-sidebar"
import { AppGuard } from "@/components/app/app-guard"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppGuard>
      <div className="relative min-h-screen">
        <AuroraBackground density={40} />
        <div className="relative z-10 mx-auto flex w-full max-w-[1400px]">
          <AppSidebar />
          <div className="min-w-0 flex-1 pb-20 lg:pb-0">{children}</div>
        </div>
      </div>
    </AppGuard>
  )
}
