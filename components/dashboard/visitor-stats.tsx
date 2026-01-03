interface ProfileVisit {
  visitor_country?: string
  visited_at: string
}

interface VisitorStatsProps {
  profileVisits: ProfileVisit[]
}

export function VisitorStats({ profileVisits }: VisitorStatsProps) {
  // Count visits by country
  const countryData = profileVisits.reduce(
    (acc, visit) => {
      const country = visit.visitor_country || "Unknown"
      acc[country] = (acc[country] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const sortedCountries = Object.entries(countryData)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  const total = profileVisits.length

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Visitors</h2>
        <p className="text-sm text-muted-foreground">By country (last 7 days)</p>
      </div>

      <div className="space-y-3">
        {sortedCountries.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">No visitor data yet</p>
        ) : (
          sortedCountries.map(([country, count]) => (
            <div key={country} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{country}</span>
                <span className="text-muted-foreground">
                  {count} ({total > 0 ? Math.round((count / total) * 100) : 0}%)
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${total > 0 ? (count / total) * 100 : 0}%` }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
