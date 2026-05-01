import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getStaffMembers, createStaffMember } from '@/actions/staff'
import { Badge } from '@/components/ui/badge'
import { UserCircle } from 'lucide-react'

export default async function TeamPage() {
  const { data: staff, error } = await getStaffMembers()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Team</h2>
        <p className="text-muted-foreground">Manage your professionals and their schedules.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Add Staff Form */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Add Professional</CardTitle>
            <CardDescription>Register a new team member.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={createStaffMember as any} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" placeholder="e.g. Maria Lopez" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select name="role" defaultValue="stylist">
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stylist">Hair Stylist</SelectItem>
                    <SelectItem value="barber">Barber</SelectItem>
                    <SelectItem value="nail_tech">Nail Technician</SelectItem>
                    <SelectItem value="colorist">Colorist</SelectItem>
                    <SelectItem value="esthetician">Esthetician</SelectItem>
                    <SelectItem value="massage_therapist">Massage Therapist</SelectItem>
                    <SelectItem value="makeup_artist">Makeup Artist</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="maria@salon.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" placeholder="+1 (555) 123-4567" />
              </div>
              <Button type="submit" className="w-full gradient-brand text-white">
                Add to Team
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Staff List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Team ({staff?.length || 0})</CardTitle>
              <CardDescription>Professionals registered in your business.</CardDescription>
            </CardHeader>
            <CardContent>
              {staff && staff.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {staff.map((member: any) => (
                    <div
                      key={member.id}
                      className="flex items-start gap-4 rounded-xl border border-border bg-muted/30 p-4 transition-all hover:bg-muted/50"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full gradient-brand text-white font-bold text-lg">
                        {member.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold truncate">{member.name}</h4>
                          <Badge variant={member.is_active ? 'default' : 'destructive'} className="text-xs">
                            {member.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground capitalize mt-0.5">
                          {member.role.replace('_', ' ')}
                        </p>
                        {member.email && (
                          <p className="text-xs text-muted-foreground mt-1 truncate">{member.email}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <UserCircle className="h-12 w-12 text-muted-foreground/40 mb-3" />
                  <p className="text-muted-foreground">No team members yet.</p>
                  <p className="text-sm text-muted-foreground/60">Add your first professional using the form.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
