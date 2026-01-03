"use client"

import { useEffect } from "react"
import { trackProfileVisit } from "@/lib/actions/analytics"

interface TrackVisitProps {
  userId: string
}

export function TrackVisit({ userId }: TrackVisitProps) {
  useEffect(() => {
    trackProfileVisit(userId)
  }, [userId])

  return null
}
