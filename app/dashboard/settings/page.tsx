import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/header"
import { ProfileSettings } from "@/components/dashboard/profile-settings"

export default async function SettingsPage() {
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

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader profile={profile} user={user} />

      <main className="mx-auto max-w-3xl space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your profile and account settings</p>
        </div>

        <ProfileSettings profile={profile} user={user} />
      </main>
    </div>
  )
}
