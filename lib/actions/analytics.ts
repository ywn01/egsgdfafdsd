"use server"

import { createClient } from "@/lib/supabase/server"
import { headers } from "next/headers"

export async function trackProfileVisit(profileUserId: string) {
  const supabase = await createClient()
  const headersList = await headers()

  const userAgent = headersList.get("user-agent") || undefined
  const referer = headersList.get("referer") || undefined

  // Note: In production, you'd use a geolocation service or Vercel's geo headers
  // For now, we'll just insert without country/city data
  await supabase.from("profile_visits").insert({
    profile_user_id: profileUserId,
    visitor_country: null,
    visitor_city: null,
    user_agent: userAgent,
    referrer: referer,
  })
}

export async function trackLinkClick(linkId: string) {
  const supabase = await createClient()
  const headersList = await headers()

  const userAgent = headersList.get("user-agent") || undefined
  const referer = headersList.get("referer") || undefined

  // Insert visit record
  await supabase.from("link_visits").insert({
    link_id: linkId,
    user_id: null,
    visitor_country: null,
    visitor_city: null,
    user_agent: userAgent,
    referrer: referer,
  })

  // Increment click count on the link
  const { data: link } = await supabase.from("links").select("clicks").eq("id", linkId).single()

  if (link) {
    await supabase
      .from("links")
      .update({ clicks: (link.clicks || 0) + 1 })
      .eq("id", linkId)
  }
}
