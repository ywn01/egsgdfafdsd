"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Plus, GripVertical, ExternalLink, Trash2, Edit2 } from "lucide-react"
import { Link2 } from "lucide-react" // Declared the Link2 variable

interface Link {
  id: string
  title: string
  url: string
  description?: string
  position: number
  is_active: boolean
  clicks: number
  icon?: string // Added icon field to Link interface
}

interface LinksManagerProps {
  links: Link[]
  userId: string
}

export function LinksManager({ links: initialLinks, userId }: LinksManagerProps) {
  const [links, setLinks] = useState(initialLinks)
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
  })
  const router = useRouter()

  const fetchFavicon = async (url: string): Promise<string | null> => {
    try {
      const urlObj = new URL(url.startsWith("http") ? url : `https://${url}`)
      return `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=64`
    } catch {
      return null
    }
  }

  const handleAdd = async () => {
    if (!formData.title || !formData.url) return

    const fullUrl = formData.url.startsWith("http") ? formData.url : `https://${formData.url}`
    const icon = await fetchFavicon(fullUrl)

    const supabase = createClient()
    const { error } = await supabase.from("links").insert({
      user_id: userId,
      title: formData.title,
      url: fullUrl,
      description: formData.description || null,
      icon: icon, // Store favicon URL
      position: links.length,
    })

    if (!error) {
      setFormData({ title: "", url: "", description: "" })
      setIsAdding(false)
      router.refresh()
    }
  }

  const handleUpdate = async (id: string) => {
    const fullUrl = formData.url.startsWith("http") ? formData.url : `https://${formData.url}`
    const icon = await fetchFavicon(fullUrl)

    const supabase = createClient()
    const { error } = await supabase
      .from("links")
      .update({
        title: formData.title,
        url: fullUrl,
        description: formData.description || null,
        icon: icon, // Update favicon URL
      })
      .eq("id", id)

    if (!error) {
      setEditingId(null)
      setFormData({ title: "", url: "", description: "" })
      router.refresh()
    }
  }

  const handleDelete = async (id: string) => {
    const supabase = createClient()
    const { error } = await supabase.from("links").delete().eq("id", id)

    if (!error) {
      router.refresh()
    }
  }

  const toggleActive = async (id: string, currentState: boolean) => {
    const supabase = createClient()
    const { error } = await supabase.from("links").update({ is_active: !currentState }).eq("id", id)

    if (!error) {
      router.refresh()
    }
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6 hover-lift transition-smooth">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Links</h2>
          <p className="text-sm text-muted-foreground">Manage your link-in-bio links</p>
        </div>
        <Button
          onClick={() => setIsAdding(true)}
          disabled={isAdding}
          className="transition-smooth scale-press glow-primary"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Link
        </Button>
      </div>

      <div className="space-y-3">
        {isAdding && (
          <div className="rounded-lg border border-border bg-muted/50 p-4 space-y-3 animate-fade-in">
            <div className="space-y-2">
              <Label htmlFor="new-title">Title</Label>
              <Input
                id="new-title"
                placeholder="My Website"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-url">URL</Label>
              <Input
                id="new-url"
                placeholder="https://example.com"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-description">Description (optional)</Label>
              <Input
                id="new-description"
                placeholder="Check out my website"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAdd} className="transition-smooth scale-press">
                Add
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAdding(false)
                  setFormData({ title: "", url: "", description: "" })
                }}
                className="transition-smooth scale-press"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {links.length === 0 && !isAdding && (
          <div className="py-12 text-center text-muted-foreground animate-fade-in">
            <Link2 className="mx-auto mb-4 h-12 w-12 opacity-20" />
            <p>No links yet. Add your first link to get started!</p>
          </div>
        )}

        {links.map((link) =>
          editingId === link.id ? (
            <div key={link.id} className="rounded-lg border border-border bg-muted/50 p-4 space-y-3 animate-fade-in">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  placeholder="My Website"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>URL</Label>
                <Input
                  placeholder="https://example.com"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Description (optional)</Label>
                <Input
                  placeholder="Check out my website"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={() => handleUpdate(link.id)} className="transition-smooth scale-press">
                  Save
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingId(null)
                    setFormData({ title: "", url: "", description: "" })
                  }}
                  className="transition-smooth scale-press"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div
              key={link.id}
              className={`group flex items-center gap-4 rounded-lg border border-border bg-muted/30 p-4 hover-lift transition-all duration-300 hover:bg-muted/50 hover:shadow-lg ${
                !link.is_active ? "opacity-50" : ""
              }`}
            >
              {link.icon ? (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-background p-2">
                  <img src={link.icon || "/placeholder.svg"} alt="" className="h-full w-full object-contain" />
                </div>
              ) : (
                <GripVertical className="h-5 w-5 text-muted-foreground transition-transform group-hover:scale-110" />
              )}

              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{link.title}</h3>
                  {!link.is_active && (
                    <span className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">Inactive</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{link.url}</p>
                {link.description && <p className="text-xs text-muted-foreground">{link.description}</p>}
              </div>

              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-sm font-medium">{link.clicks}</p>
                  <p className="text-xs text-muted-foreground">clicks</p>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setEditingId(link.id)
                    setFormData({
                      title: link.title,
                      url: link.url,
                      description: link.description || "",
                    })
                  }}
                  className="transition-smooth hover:scale-110"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleActive(link.id, link.is_active)}
                  className="transition-smooth hover:scale-110"
                >
                  {link.is_active ? "Hide" : "Show"}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(link.id)}
                  className="transition-smooth hover:scale-110"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>

                <Button variant="ghost" size="sm" asChild className="transition-smooth hover:scale-110">
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  )
}
