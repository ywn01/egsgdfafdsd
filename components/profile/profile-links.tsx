"use client"

import { ExternalLink } from "lucide-react"
import { trackLinkClick } from "@/lib/actions/analytics"
import { useState, useEffect } from "react"

interface Link {
  id: string
  title: string
  url: string
  description?: string
  icon?: string
}

interface ProfileLinksProps {
  links: Link[]
}

export function ProfileLinks({ links }: ProfileLinksProps) {
  const handleClick = async (linkId: string, url: string) => {
    // Track the click
    await trackLinkClick(linkId)

    // Open the link
    window.open(url, "_blank", "noopener,noreferrer")
  }

  if (links.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        <p>No links yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {links.map((link) => (
        <LinkCard key={link.id} link={link} onClick={() => handleClick(link.id, link.url)} />
      ))}
    </div>
  )
}

function LinkCard({ link, onClick }: { link: Link; onClick: () => void }) {
  const [favicon, setFavicon] = useState<string | null>(link.icon || null)

  useEffect(() => {
    // If icon is not in database, fetch favicon
    if (!link.icon) {
      try {
        const url = new URL(link.url)
        const faviconUrl = `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=64`
        setFavicon(faviconUrl)
      } catch {
        setFavicon(null)
      }
    }
  }, [link.url, link.icon])

  return (
    <button
      onClick={onClick}
      className="group w-full rounded-xl border border-border bg-card p-5 text-left transition-all hover:scale-[1.02] hover:border-primary/50 hover:bg-card/80 hover:shadow-lg active:scale-[0.98]"
    >
      <div className="flex items-center gap-4">
        {favicon && (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted p-2">
            <img src={favicon || "/placeholder.svg"} alt="" className="h-full w-full object-contain" />
          </div>
        )}
        <div className="flex-1 space-y-1">
          <h3 className="font-semibold transition-colors group-hover:text-primary">{link.title}</h3>
          {link.description && <p className="text-sm text-muted-foreground">{link.description}</p>}
        </div>
        <ExternalLink className="ml-4 h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
      </div>
    </button>
  )
}
