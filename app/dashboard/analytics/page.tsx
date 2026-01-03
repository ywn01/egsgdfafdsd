import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/header"
import { AnalyticsOverview } from "@/components/analytics/analytics-overview"
import { LinkPerformance } from "@/components/analytics/link-performance"
import { VisitorChart } from "@/components/analytics/visitor-chart"

export default async function AnalyticsPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle()

  if (!profile) {
    redirect("/dashboard")
  }

  // Fetch all analytics data
  const { data: links } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", user.id)
    .order("clicks", { ascending: false })

  const { data: profileVisits } = await supabase
    .from("profile_visits")
    .select("*")
    .eq("profile_user_id", user.id)
    .gte("visited_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
    .order("visited_at", { ascending: true })

  const { data: linkVisits } = await supabase
    .from("link_visits")
    .select("*, links!inner(user_id, title)")
    .eq("links.user_id", user.id)
    .gte("visited_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
    .order("visited_at", { ascending: true })

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader profile={profile} user={user} />

      <main className="mx-auto max-w-7xl space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Track your performance and visitor insights</p>
        </div>

        <AnalyticsOverview profileVisits={profileVisits || []} linkVisits={linkVisits || []} links={links || []} />

        <div className="grid gap-6 lg:grid-cols-2">
          <VisitorChart profileVisits={profileVisits || []} />
          <LinkPerformance links={links || []} />
        </div>
      </main>
    </div>
  )
}
