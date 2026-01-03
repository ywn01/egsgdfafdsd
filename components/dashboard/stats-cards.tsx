import { TrendingUp, MousePointerClick, Link2 } from "lucide-react"

interface StatsCardsProps {
  totalVisitors: number
  totalClicks: number
  links: Array<{ is_active: boolean }>
}

export function StatsCards({ totalVisitors, totalClicks, links }: StatsCardsProps) {
  const activeLinks = links.filter((link) => link.is_active).length

  const stats = [
    {
      title: "Visitors",
      value: totalVisitors,
      subtitle: "Last 7 days",
      icon: TrendingUp,
      trend: "+100%",
      trendUp: true,
    },
    {
      title: "Total Clicks",
      value: totalClicks,
      subtitle: "All time",
      icon: MousePointerClick,
      trend: "+0%",
      trendUp: false,
    },
    {
      title: "Active Links",
      value: activeLinks,
      subtitle: `${links.length} total`,
      icon: Link2,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.title} className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
            </div>
            <div className="rounded-lg bg-primary/10 p-3">
              <stat.icon className="h-5 w-5 text-primary" />
            </div>
          </div>
          {stat.trend && (
            <div className="mt-4 flex items-center gap-1">
              <span className={`text-sm font-medium ${stat.trendUp ? "text-green-500" : "text-muted-foreground"}`}>
                {stat.trend}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
