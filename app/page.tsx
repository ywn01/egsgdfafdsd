import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Link2, BarChart3, Zap, Globe, Shield, Palette, CheckCircle2, Users, TrendingUp } from "lucide-react"

export default async function HomePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If user is logged in, redirect to dashboard
  if (user) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/50 backdrop-blur-xl transition-all duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-6">
          <h1 className="text-2xl font-bold animate-fade-in">buii.ink</h1>
          <div className="flex gap-3 animate-fade-in stagger-1">
            <Button variant="ghost" asChild className="transition-smooth hover-lift">
              <Link href="/auth/login">Sign in</Link>
            </Button>
            <Button asChild className="transition-smooth scale-press glow-primary">
              <Link href="/auth/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-4 py-20 md:py-32">
          <div className="text-center">
            <h2 className="mb-4 text-5xl font-bold tracking-tight md:text-7xl animate-fade-in-up text-balance">
              One link for
              <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                {" "}
                everything
              </span>
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-balance text-xl text-muted-foreground animate-fade-in-up stagger-1 md:text-2xl">
              Share your links, social profiles, and content in one beautiful page. Perfect for creators, artists, and
              professionals.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up stagger-2">
              <Button size="lg" asChild className="transition-smooth scale-press animate-pulse-glow text-lg">
                <Link href="/auth/signup">Create Your Page Free</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="transition-smooth hover-lift scale-press bg-transparent text-lg"
              >
                <Link href="/auth/login">Sign In</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground animate-fade-in-up stagger-3">
              No credit card required. Set up in 2 minutes.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mx-auto max-w-7xl px-4 py-20">
          <div className="mb-12 text-center">
            <h3 className="text-3xl font-bold md:text-4xl animate-fade-in-up">Everything you need</h3>
            <p className="mt-2 text-muted-foreground animate-fade-in-up stagger-1">
              Built for creators who want more from their link-in-bio
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-8 hover-lift transition-smooth animate-fade-in-up stagger-2">
              <div className="mb-4 flex justify-center">
                <div className="rounded-lg bg-primary/10 p-4 transition-smooth hover:scale-110 hover:bg-primary/20">
                  <Link2 className="h-8 w-8 text-primary transition-transform hover:rotate-12" />
                </div>
              </div>
              <h4 className="mb-2 text-xl font-bold">Unlimited Links</h4>
              <p className="text-muted-foreground text-pretty">
                Add as many links as you want. No limits, no restrictions. Share everything that matters.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-8 hover-lift transition-smooth animate-fade-in-up stagger-3">
              <div className="mb-4 flex justify-center">
                <div className="rounded-lg bg-primary/10 p-4 transition-smooth hover:scale-110 hover:bg-primary/20">
                  <BarChart3 className="h-8 w-8 text-primary transition-transform hover:scale-110" />
                </div>
              </div>
              <h4 className="mb-2 text-xl font-bold">Advanced Analytics</h4>
              <p className="text-muted-foreground text-pretty">
                Track every click, view, and visitor. Understand your audience with detailed insights.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-8 hover-lift transition-smooth animate-fade-in-up stagger-4">
              <div className="mb-4 flex justify-center">
                <div className="rounded-lg bg-primary/10 p-4 transition-smooth hover:scale-110 hover:bg-primary/20">
                  <Zap className="h-8 w-8 text-primary transition-transform hover:rotate-12" />
                </div>
              </div>
              <h4 className="mb-2 text-xl font-bold">Lightning Fast</h4>
              <p className="text-muted-foreground text-pretty">
                Built with cutting-edge technology. Your page loads instantly, everywhere.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-8 hover-lift transition-smooth animate-fade-in-up stagger-5">
              <div className="mb-4 flex justify-center">
                <div className="rounded-lg bg-primary/10 p-4 transition-smooth hover:scale-110 hover:bg-primary/20">
                  <Palette className="h-8 w-8 text-primary transition-transform hover:scale-110" />
                </div>
              </div>
              <h4 className="mb-2 text-xl font-bold">Beautiful Design</h4>
              <p className="text-muted-foreground text-pretty">
                Sleek, modern, and professional. Your links will look amazing on every device.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-8 hover-lift transition-smooth animate-fade-in-up stagger-6">
              <div className="mb-4 flex justify-center">
                <div className="rounded-lg bg-primary/10 p-4 transition-smooth hover:scale-110 hover:bg-primary/20">
                  <Globe className="h-8 w-8 text-primary transition-transform hover:rotate-12" />
                </div>
              </div>
              <h4 className="mb-2 text-xl font-bold">Custom URLs</h4>
              <p className="text-muted-foreground text-pretty">
                Get your own branded URL. buii.ink/yourname - simple and memorable.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-8 hover-lift transition-smooth animate-fade-in-up stagger-7">
              <div className="mb-4 flex justify-center">
                <div className="rounded-lg bg-primary/10 p-4 transition-smooth hover:scale-110 hover:bg-primary/20">
                  <Shield className="h-8 w-8 text-primary transition-transform hover:scale-110" />
                </div>
              </div>
              <h4 className="mb-2 text-xl font-bold">Secure & Private</h4>
              <p className="text-muted-foreground text-pretty">
                Your data is encrypted and secure. We never share your information.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mx-auto max-w-7xl px-4 py-20">
          <div className="mb-12 text-center">
            <h3 className="text-3xl font-bold md:text-4xl animate-fade-in-up">How it works</h3>
            <p className="mt-2 text-muted-foreground animate-fade-in-up stagger-1">Get started in minutes, not hours</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center animate-fade-in-up stagger-2">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                  1
                </div>
              </div>
              <h4 className="mb-2 text-xl font-bold">Create Account</h4>
              <p className="text-muted-foreground">Sign up with your email and choose your custom username</p>
            </div>

            <div className="text-center animate-fade-in-up stagger-3">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                  2
                </div>
              </div>
              <h4 className="mb-2 text-xl font-bold">Add Your Links</h4>
              <p className="text-muted-foreground">Add all your important links, social profiles, and content</p>
            </div>

            <div className="text-center animate-fade-in-up stagger-4">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                  3
                </div>
              </div>
              <h4 className="mb-2 text-xl font-bold">Share & Track</h4>
              <p className="text-muted-foreground">Share your page and watch your analytics grow</p>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="mx-auto max-w-7xl px-4 py-20">
          <div className="rounded-2xl border border-border bg-card p-12 text-center animate-fade-in-up">
            <div className="mb-8 flex justify-center gap-8">
              <div>
                <div className="mb-2 flex items-center justify-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  <p className="text-4xl font-bold">10K+</p>
                </div>
                <p className="text-muted-foreground">Active Users</p>
              </div>
              <div className="h-20 w-px bg-border" />
              <div>
                <div className="mb-2 flex items-center justify-center gap-2">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  <p className="text-4xl font-bold">1M+</p>
                </div>
                <p className="text-muted-foreground">Links Shared</p>
              </div>
              <div className="h-20 w-px bg-border hidden sm:block" />
              <div className="hidden sm:block">
                <div className="mb-2 flex items-center justify-center gap-2">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                  <p className="text-4xl font-bold">99.9%</p>
                </div>
                <p className="text-muted-foreground">Uptime</p>
              </div>
            </div>
            <h3 className="mb-4 text-3xl font-bold">Trusted by creators worldwide</h3>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              From artists to entrepreneurs, thousands of creators use buii.ink to share their work and grow their
              audience.
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto max-w-7xl px-4 py-20">
          <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-primary/5 p-12 text-center animate-fade-in-up">
            <h3 className="mb-4 text-4xl font-bold md:text-5xl text-balance">Ready to get started?</h3>
            <p className="mx-auto mb-8 max-w-2xl text-balance text-xl text-muted-foreground">
              Join thousands of creators who are already using buii.ink to share their work.
            </p>
            <Button size="lg" asChild className="transition-smooth scale-press glow-primary text-lg">
              <Link href="/auth/signup">Create Your Free Page</Link>
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">Free forever. No credit card required.</p>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-12 animate-fade-in">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h4 className="mb-4 text-lg font-bold">buii.ink</h4>
              <p className="text-sm text-muted-foreground">
                The premium link-in-bio platform for creators and professionals.
              </p>
            </div>
            <div>
              <h5 className="mb-4 font-semibold">Product</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/auth/signup" className="transition-colors hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signup" className="transition-colors hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signup" className="transition-colors hover:text-foreground">
                    Analytics
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="mb-4 font-semibold">Company</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/auth/signup" className="transition-colors hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signup" className="transition-colors hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signup" className="transition-colors hover:text-foreground">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="mb-4 font-semibold">Legal</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/auth/signup" className="transition-colors hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signup" className="transition-colors hover:text-foreground">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signup" className="transition-colors hover:text-foreground">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p className="transition-colors hover:text-foreground">&copy; 2026 buii.ink. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
