import { ExternalLink } from "lucide-react"

interface Link {
  id: string
  title: string
  url: string
  clicks: number
  is_active: boolean
}

interface LinkPerformanceProps {
  links: Link[]
}

export function LinkPerformance({ links }: LinkPerformanceProps) {
  const totalClicks = links.reduce((sum, link) => sum + (link.clicks || 0), 0)

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Top Performing Links</h2>
        <p className="text-sm text-muted-foreground">Links sorted by total clicks</p>
      </div>

      <div className="space-y-3">
        {links.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">No links yet</p>
        ) : (
          links.slice(0, 5).map((link, index) => (
            <div key={link.id} className="flex items-center gap-4 rounded-lg border border-border bg-muted/30 p-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {index + 1}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{link.title}</h3>
                  {!link.is_active && (
                    <span className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">Inactive</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{link.url}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-lg font-bold">{link.clicks}</p>
                  <p className="text-xs text-muted-foreground">
                    {totalClicks > 0 ? Math.round((link.clicks / totalClicks) * 100) : 0}%
                  </p>
                </div>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
