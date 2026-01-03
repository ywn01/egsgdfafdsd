import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function VerifyPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Check your email</h1>
          <p className="mt-4 text-muted-foreground">
            We've sent you a confirmation email. Please click the link in the email to verify your account and get
            started with buii.ink.
          </p>
        </div>

        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/auth/login">Back to login</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
