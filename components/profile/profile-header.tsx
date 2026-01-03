import { User } from "lucide-react"

interface ProfileHeaderProps {
  displayName: string
  username: string
  bio?: string
  avatarUrl?: string
}

export function ProfileHeader({ displayName, username, bio, avatarUrl }: ProfileHeaderProps) {
  return (
    <div className="mb-8 text-center">
      <div className="mb-4 flex justify-center">
        {avatarUrl ? (
          <img
            src={avatarUrl || "/placeholder.svg"}
            alt={displayName}
            className="h-24 w-24 rounded-full border-4 border-border"
          />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-border bg-muted">
            <User className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
      </div>

      <h1 className="mb-2 text-3xl font-bold tracking-tight">{displayName}</h1>
      <p className="mb-4 text-muted-foreground">@{username}</p>

      {bio && <p className="mx-auto max-w-md text-balance text-muted-foreground">{bio}</p>}
    </div>
  )
}
