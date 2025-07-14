"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Mail, UserPlus, X } from "lucide-react"

interface InviteUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const roles = [
  { value: "viewer", label: "Viewer", description: "Can view tasks and boards" },
  { value: "editor", label: "Editor", description: "Can create and edit tasks" },
  { value: "admin", label: "Admin", description: "Can manage users and settings" },
  { value: "owner", label: "Owner", description: "Full access to everything" },
]

export function InviteUserDialog({ open, onOpenChange }: InviteUserDialogProps) {
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("editor")
  const [invites, setInvites] = useState<Array<{ email: string; role: string }>>([])

  const addInvite = () => {
    if (email && !invites.find((invite) => invite.email === email)) {
      setInvites([...invites, { email, role }])
      setEmail("")
    }
  }

  const removeInvite = (emailToRemove: string) => {
    setInvites(invites.filter((invite) => invite.email !== emailToRemove))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) addInvite()

    // Handle sending invites
    console.log("Sending invites:", invites)
    onOpenChange(false)
    setInvites([])
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Invite Team Members
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="flex gap-2">
              <Input
                id="email"
                type="email"
                placeholder="colleague@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Button type="button" onClick={addInvite} disabled={!email}>
                Add
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {roles.map((roleOption) => (
                  <SelectItem key={roleOption.value} value={roleOption.value}>
                    <div>
                      <div className="font-medium">{roleOption.label}</div>
                      <div className="text-xs text-muted-foreground">{roleOption.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {invites.length > 0 && (
            <div className="space-y-2">
              <Label>Pending Invites</Label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {invites.map((invite) => (
                  <div key={invite.email} className="flex items-center justify-between p-2 bg-muted rounded-md">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          <Mail className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">{invite.email}</div>
                        <Badge variant="secondary" className="text-xs">
                          {roles.find((r) => r.value === invite.role)?.label}
                        </Badge>
                      </div>
                    </div>
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeInvite(invite.email)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={invites.length === 0 && !email}>
              Send Invites
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
