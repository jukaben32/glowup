import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getAppointments } from '@/actions/appointments'
import { getClients } from '@/actions/clients'
import { getStaffMembers } from '@/actions/staff'
import { getServices } from '@/actions/services'
import { CalendarDays, Users, Scissors, DollarSign, TrendingUp, UserCircle } from 'lucide-react'

export default async function DashboardPage() {
  const { data: appointments } = await getAppointments()
  const { data: clients } = await getClients()
  const { data: staff } = await getStaffMembers()
  const { data: services } = await getServices()

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const todayAppointments = appointments?.filter((a: any) => {
    const d = new Date(a.start_time)
    return d >= today && d < tomorrow
  }) || []

  const upcomingAppointments = appointments?.filter((a: any) => 
    new Date(a.start_time) > new Date() && a.status === 'booked'
  ) || []

  const completedAppointments = appointments?.filter((a: any) => a.status === 'completed') || []
  
  const totalRevenue = completedAppointments.reduce((sum: number, a: any) => {
    return sum + (a.services?.price || 0)
  }, 0)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Welcome back! Here&apos;s what&apos;s happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today&apos;s Appointments</CardTitle>
            <CalendarDays className="h-4 w-4 text-teal-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold stat-number">{todayAppointments.length}</div>
            <p className="text-xs text-muted-foreground mt-1">{upcomingAppointments.length} upcoming total</p>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-cyan-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold stat-number">{clients?.length || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">registered in your salon</p>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Size</CardTitle>
            <UserCircle className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold stat-number">{staff?.length || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">active professionals</p>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold stat-number">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">from completed bookings</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-teal-500" />
              Today&apos;s Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            {todayAppointments.length > 0 ? (
              <div className="space-y-4">
                {todayAppointments.map((appointment: any) => (
                  <div key={appointment.id} className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-brand text-white text-sm font-bold">
                        {appointment.clients?.name?.charAt(0) || '?'}
                      </div>
                      <div>
                        <p className="font-medium">{appointment.clients?.name || 'Walk-in'}</p>
                        <p className="text-xs text-muted-foreground">{appointment.services?.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">
                        {new Date(appointment.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">{appointment.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CalendarDays className="h-10 w-10 text-muted-foreground/30 mb-2" />
                <p className="text-muted-foreground">No appointments today.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-cyan-500" />
              Quick Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Services offered</span>
                <span className="font-semibold">{services?.length || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total bookings</span>
                <span className="font-semibold">{appointments?.length || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Completed</span>
                <span className="font-semibold">{completedAppointments.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Cancellation rate</span>
                <span className="font-semibold">
                  {appointments && appointments.length > 0 
                    ? Math.round((appointments.filter((a: any) => a.status === 'cancelled').length / appointments.length) * 100) 
                    : 0}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
