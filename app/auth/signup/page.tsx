"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (username.length < 3 || username.length > 30) {
      setError("Username must be between 3 and 30 characters")
      setIsLoading(false)
      return
    }

    if (!/^[a-z0-9_-]+$/.test(username)) {
      setError("Username can only contain lowercase letters, numbers, hyphens, and underscores")
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`,
          data: {
            username,
            display_name: displayName || username,
          },
        },
      })
      if (error) throw error
      router.push("/auth/verify")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in-up">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">buii.ink</h1>
          <p className="mt-2 text-muted-foreground">Create your account</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2 animate-fade-in-up stagger-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 transition-all duration-300 focus:ring-2 focus:ring-primary/50 focus:scale-[1.02]"
              />
            </div>

            <div className="space-y-2 animate-fade-in-up stagger-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors">
                  buii.ink/
                </span>
                <Input
                  id="username"
                  type="text"
                  placeholder="yourname"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase())}
                  className="h-11 pl-20 transition-all duration-300 focus:ring-2 focus:ring-primary/50 focus:scale-[1.02]"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                3-30 characters, lowercase letters, numbers, hyphens, and underscores only
              </p>
            </div>

            <div className="space-y-2 animate-fade-in-up stagger-3">
              <Label htmlFor="displayName">Display Name (optional)</Label>
              <Input
                id="displayName"
                type="text"
                placeholder="Your Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="h-11 transition-all duration-300 focus:ring-2 focus:ring-primary/50 focus:scale-[1.02]"
              />
            </div>

            <div className="space-y-2 animate-fade-in-up stagger-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 transition-all duration-300 focus:ring-2 focus:ring-primary/50 focus:scale-[1.02]"
              />
            </div>

            <div className="space-y-2 animate-fade-in-up stagger-5">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-11 transition-all duration-300 focus:ring-2 focus:ring-primary/50 focus:scale-[1.02]"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive animate-fade-in border border-destructive/20">
              {error}
            </div>
          )}

          <Button type="submit" className="h-11 w-full transition-smooth scale-press glow-primary" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create account"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-medium underline underline-offset-4 hover:text-foreground transition-colors"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
