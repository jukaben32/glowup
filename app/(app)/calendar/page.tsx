'use client'

import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getAppointments } from '@/actions/appointments'

export default function CalendarPage() {
  const [events, setEvents] = useState<any[]>([])

  useEffect(() => {
    async function load() {
      const { data } = await getAppointments()
      if (data) {
        const formattedEvents = data.map((app: any) => ({
          id: app.id,
          title: `${app.clients.name} - ${app.services.name}`,
          start: app.start_time,
          end: app.end_time,
          backgroundColor: app.status === 'booked' ? '#3b82f6' : app.status === 'completed' ? '#10b981' : '#ef4444'
        }))
        setEvents(formattedEvents)
      }
    }
    load()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
        <p className="text-muted-foreground">View your schedule.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <FullCalendar
            plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
            initialView="timeGridWeek"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            events={events}
            height="auto"
          />
        </CardContent>
      </Card>
    </div>
  )
}
