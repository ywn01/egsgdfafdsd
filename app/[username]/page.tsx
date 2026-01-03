import { createClient } from "@/lib/supabase/server"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileLinks } from "@/components/profile/profile-links"
import { TrackVisit } from "@/components/profile/track-visit"
import { notFound } from "next/navigation"

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params

  // Remove @ symbol if present
  const cleanUsername = username.startsWith("@") ? username.slice(1) : username

  console.log("[v0] Fetching profile for username:", cleanUsername)

  const supabase = await createClient()

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", cleanUsername)
    .maybeSingle()

  console.log("[v0] Profile fetch result:", { profile, error })

  if (error || !profile) {
    notFound()
  }

  // Fetch active links
  const { data: links } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", profile.id)
    .eq("is_active", true)
    .order("position")

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <TrackVisit profileUserId={profile.id} />

      <main className="mx-auto max-w-2xl px-4 py-16">
        <ProfileHeader
          displayName={profile.display_name || profile.username}
          username={profile.username}
          bio={profile.bio}
          avatarUrl={profile.avatar_url}
        />
        <ProfileLinks links={links || []} />
      </main>

      <footer className="py-8 text-center text-sm text-muted-foreground">
        <p>
          Powered by <span className="font-semibold">buii.ink</span>
        </p>
      </footer>
    </div>
  )
}
