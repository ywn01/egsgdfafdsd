import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="text-center">
        <h1 className="mb-2 text-6xl font-bold">404</h1>
        <h2 className="mb-4 text-2xl font-semibold">Profile Not Found</h2>
        <p className="mb-8 text-muted-foreground">The profile you're looking for doesn't exist.</p>
        <Button asChild>
          <Link href="/">Go to Homepage</Link>
        </Button>
      </div>
    </div>
  )
}
