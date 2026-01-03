"use client"

interface ProfileVisit {
  visited_at: string
}

interface VisitorChartProps {
  profileVisits: ProfileVisit[]
}

export function VisitorChart({ profileVisits }: VisitorChartProps) {
  // Group visits by day
  const visitsByDay = profileVisits.reduce(
    (acc, visit) => {
      const date = new Date(visit.visited_at).toLocaleDateString()
      acc[date] = (acc[date] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Get last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    return date.toLocaleDateString()
  })

  const chartData = last7Days.map((date) => ({
    date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    visits: visitsByDay[date] || 0,
  }))

  const maxVisits = Math.max(...chartData.map((d) => d.visits), 1)

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Profile Views</h2>
        <p className="text-sm text-muted-foreground">Daily views over the last 7 days</p>
      </div>

      <div className="space-y-4">
        {chartData.map((data, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{data.date}</span>
              <span className="text-muted-foreground">{data.visits} views</span>
            </div>
            <div className="h-8 w-full overflow-hidden rounded-md bg-muted">
              <div
                className="h-full rounded-md bg-primary transition-all"
                style={{ width: `${(data.visits / maxVisits) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
