'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { createService } from '@/actions/services'
import { createServiceCategory } from '@/actions/categories'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Scissors } from 'lucide-react'

function AddCategoryForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">New Category</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={createServiceCategory} className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="cat-name">Category Name</Label>
            <Input id="cat-name" name="name" placeholder="e.g. Haircuts, Nails, Color" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cat-color">Color</Label>
            <Select name="color" defaultValue="#0d9488">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="#0d9488">🟢 Teal</SelectItem>
                <SelectItem value="#3b82f6">🔵 Blue</SelectItem>
                <SelectItem value="#8b5cf6">🟣 Purple</SelectItem>
                <SelectItem value="#f59e0b">🟡 Amber</SelectItem>
                <SelectItem value="#ef4444">🔴 Red</SelectItem>
                <SelectItem value="#ec4899">🩷 Pink</SelectItem>
                <SelectItem value="#10b981">🟩 Green</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" variant="outline" className="w-full">Create Category</Button>
        </form>
      </CardContent>
    </Card>
  )
}

function AddServiceForm({ categories }: { categories: any[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">New Service</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={createService} className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="name">Service Name</Label>
            <Input id="name" name="name" placeholder="e.g. Classic Fade" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" name="description" placeholder="Short description (optional)" />
          </div>
          {categories && categories.length > 0 && (
            <div className="space-y-2">
              <Label>Category</Label>
              <Select name="category_id" defaultValue="none">
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">— No Category —</SelectItem>
                  {categories.map((cat: any) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      <div className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                        {cat.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="duration_minutes">Duration (min)</Label>
              <Input id="duration_minutes" name="duration_minutes" type="number" defaultValue="30" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input id="price" name="price" type="number" step="0.01" defaultValue="25.00" required />
            </div>
          </div>
          <Button type="submit" className="w-full gradient-brand text-white">Add Service</Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default function ServicesPageClient({ services, categories }: { services: any[], categories: any[] }) {
  const uncategorized = services?.filter((s: any) => !s.category_id) || []
  const grouped = categories?.map((cat: any) => ({
    ...cat,
    services: services?.filter((s: any) => s.category_id === cat.id) || []
  })) || []

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Services</h2>
        <p className="text-muted-foreground">Manage your service menu and pricing.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Forms Column */}
        <div className="space-y-6 lg:col-span-1">
          <AddCategoryForm />
          <AddServiceForm categories={categories || []} />
        </div>

        {/* Service Catalog */}
        <div className="lg:col-span-2 space-y-4">
          {grouped.map((cat: any) => (
            <Card key={cat.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: cat.color }} />
                  <CardTitle className="text-lg">{cat.name}</CardTitle>
                  <span className="text-xs text-muted-foreground">({cat.services.length})</span>
                </div>
              </CardHeader>
              <CardContent>
                {cat.services.length > 0 ? (
                  <div className="space-y-3">
                    {cat.services.map((service: any) => (
                      <div key={service.id} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{service.name}</h4>
                            {!service.is_active && (
                              <span className="text-xs text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded">Inactive</span>
                            )}
                          </div>
                          {service.description && <p className="text-xs text-muted-foreground mt-0.5">{service.description}</p>}
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${Number(service.price).toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">{service.duration_minutes} min</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground py-2">No services in this category yet.</p>
                )}
              </CardContent>
            </Card>
          ))}

          {uncategorized.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-muted-foreground">Uncategorized</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {uncategorized.map((service: any) => (
                    <div key={service.id} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                      <div>
                        <h4 className="font-medium">{service.name}</h4>
                        {service.description && <p className="text-xs text-muted-foreground">{service.description}</p>}
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${Number(service.price).toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">{service.duration_minutes} min</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {(!services || services.length === 0) && (!categories || categories.length === 0) && (
            <Card>
              <CardContent className="py-12">
                <div className="flex flex-col items-center justify-center text-center">
                  <Scissors className="h-12 w-12 text-muted-foreground/40 mb-3" />
                  <p className="text-muted-foreground">No services yet.</p>
                  <p className="text-sm text-muted-foreground/60 mt-1">Start by creating a category, then add your services.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
