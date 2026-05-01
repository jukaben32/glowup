import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getAppointments } from '@/actions/appointments'
import { Badge } from '@/components/ui/badge'

export default async function AppointmentsPage() {
  const { data: appointments, error } = await getAppointments()

  if (error) {
    return <div>Error loading appointments: {error}</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Appointments</h2>
        <p className="text-muted-foreground">Manage your bookings.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Client</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Service</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date & Time</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Source</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {appointments && appointments.length > 0 ? (
                  appointments.map((appointment: any) => (
                    <tr key={appointment.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle font-medium">
                        {appointment.clients.name}
                        <br />
                        <span className="text-xs text-muted-foreground">{appointment.clients.email || appointment.clients.phone}</span>
                      </td>
                      <td className="p-4 align-middle">{appointment.services.name}</td>
                      <td className="p-4 align-middle">
                        {new Date(appointment.start_time).toLocaleDateString()} at {new Date(appointment.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="p-4 align-middle">
                        <Badge variant={appointment.status === 'booked' ? 'default' : appointment.status === 'completed' ? 'secondary' : 'destructive'}>
                          {appointment.status}
                        </Badge>
                      </td>
                      <td className="p-4 align-middle capitalize">{appointment.source.replace('_', ' ')}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-4 align-middle text-center text-muted-foreground">No appointments found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
