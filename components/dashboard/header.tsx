"use client"

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ExternalLink, LogOut, User, BarChart3 } from "lucide-react"

interface DashboardHeaderProps {
  profile: {
    username: string
    display_name?: string
  } | null
  user: {
    email?: string
  }
}

export function DashboardHeader({ profile, user }: DashboardHeaderProps) {
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
    router.refresh()
  }

  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-2xl font-bold">
            buii.ink
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground">{profile?.username || "loading..."}</span>
        </div>

        <div className="flex items-center gap-3">
          {profile?.username && (
            <Button variant="outline" asChild>
              <Link href={`/${profile.username}`} target="_blank">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Profile
              </Link>
            </Button>
          )}

          <Button variant="outline" asChild>
            <Link href="/dashboard/analytics">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="/dashboard/settings">
              <User className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </Button>

          <Button variant="ghost" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </div>
      </div>
    </header>
  )
}
