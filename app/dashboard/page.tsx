import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { LinksManager } from "@/components/dashboard/links-manager"
import { VisitorStats } from "@/components/dashboard/visitor-stats"
import { RefreshButton } from "@/components/dashboard/refresh-button"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle()

  console.log("[v0] Dashboard profile fetch:", { profile, profileError, userId: user.id })

  // If profile doesn't exist, show setup message
  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Setting up your profile...</h1>
          <p className="mb-4 text-muted-foreground">Your profile is being created. This usually takes a few seconds.</p>
          <RefreshButton />
        </div>
      </div>
    )
  }

  // Fetch user links
  const { data: links } = await supabase.from("links").select("*").eq("user_id", user.id).order("position")

  // Fetch analytics data
  const { data: profileVisits } = await supabase
    .from("profile_visits")
    .select("*")
    .eq("profile_user_id", user.id)
    .gte("visited_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())

  const { data: linkVisits } = await supabase
    .from("link_visits")
    .select("*, links!inner(user_id)")
    .eq("links.user_id", user.id)
    .gte("visited_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())

  const totalClicks = links?.reduce((sum, link) => sum + (link.clicks || 0), 0) || 0
  const totalProfileVisits = profileVisits?.length || 0

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader profile={profile} user={user} />

      <main className="mx-auto max-w-7xl space-y-6 p-6">
        <StatsCards totalVisitors={totalProfileVisits} totalClicks={totalClicks} links={links || []} />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <LinksManager links={links || []} userId={user.id} />
          </div>

          <div className="space-y-6">
            <VisitorStats profileVisits={profileVisits || []} />
          </div>
        </div>
      </main>
    </div>
  )
}
