import { TrendingUp, MousePointerClick, Eye, Globe } from "lucide-react"

interface AnalyticsOverviewProps {
  profileVisits: Array<{ visitor_country?: string }>
  linkVisits: Array<{ link_id: string }>
  links: Array<{ clicks: number }>
}

export function AnalyticsOverview({ profileVisits, linkVisits, links }: AnalyticsOverviewProps) {
  const totalProfileVisits = profileVisits.length
  const totalLinkClicks = linkVisits.length
  const totalClicks = links.reduce((sum, link) => sum + (link.clicks || 0), 0)
  const uniqueCountries = new Set(profileVisits.map((v) => v.visitor_country).filter(Boolean)).size

  const stats = [
    {
      title: "Profile Views",
      value: totalProfileVisits,
      subtitle: "Last 30 days",
      icon: Eye,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Link Clicks",
      value: totalLinkClicks,
      subtitle: "Last 30 days",
      icon: MousePointerClick,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Total Clicks",
      value: totalClicks,
      subtitle: "All time",
      icon: TrendingUp,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Countries",
      value: uniqueCountries,
      subtitle: "Last 30 days",
      icon: Globe,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.title} className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
            </div>
            <div className={`rounded-lg ${stat.bgColor} p-3`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
