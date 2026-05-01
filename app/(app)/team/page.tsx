import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getStaffMembers, createStaffMember } from '@/actions/staff'
import { Badge } from '@/components/ui/badge'
import { UserCircle, Mail, Phone, Info, Image as ImageIcon } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

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
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="email" name="email" type="email" placeholder="maria@salon.com" className="pl-9" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="phone" name="phone" placeholder="+1 (555) 123-4567" className="pl-9" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="avatar_url">Photo URL</Label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="avatar_url" name="avatar_url" placeholder="https://images.unsplash.com/..." className="pl-9" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Biography / Specialties</Label>
                <Textarea 
                  id="bio" 
                  name="bio" 
                  placeholder="Expert in balayage and treatments..." 
                  className="resize-none h-24"
                />
              </div>
              <Button type="submit" className="w-full gradient-brand text-white shadow-lg hover:shadow-xl transition-all">
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
                      className="group relative flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:shadow-md hover:border-primary/20"
                    >
                      <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16 border-2 border-primary/10">
                          <AvatarImage src={member.avatar_url} alt={member.name} />
                          <AvatarFallback className="gradient-brand text-white text-xl font-bold">
                            {member.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="font-bold text-lg truncate">{member.name}</h4>
                            <Badge variant={member.is_active ? 'default' : 'secondary'} className="text-[10px] uppercase tracking-wider">
                              {member.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium text-primary/80 capitalize">
                            {member.role.replace('_', ' ')}
                          </p>
                          
                          <div className="mt-3 flex flex-col gap-1.5">
                            {member.email && (
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Mail className="h-3 w-3" />
                                <span className="truncate">{member.email}</span>
                              </div>
                            )}
                            {member.phone && (
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Phone className="h-3 w-3" />
                                <span>{member.phone}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {member.bio && (
                        <div className="mt-2 border-t pt-3">
                          <div className="flex items-start gap-2">
                            <Info className="h-3 w-3 text-muted-foreground mt-1 shrink-0" />
                            <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                              {member.bio}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {/* Optional: Add edit button here later */}
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
