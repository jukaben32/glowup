import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

export async function POST(req: Request) {
  try {
    const { messages, business_id } = await req.json()

    if (!business_id) {
      return NextResponse.json({ error: 'business_id is required' }, { status: 400 })
    }

    const { data: aiSettings } = await supabase
      .from('ai_settings')
      .select('*')
      .eq('business_id', business_id)
      .single()

    const { data: business } = await supabase
      .from('businesses')
      .select('*')
      .eq('id', business_id)
      .single()

    const systemPrompt = `You are the booking assistant for "${business?.name || 'this salon'}". 
Your tone should be ${aiSettings?.tone || 'friendly'}.
${aiSettings?.prompt_context || ''}
The current date and time is ${new Date().toISOString()}. The timezone is ${business?.timezone || 'UTC'}.

You help clients book appointments at this salon/barbershop. Follow this flow:
1. Greet the client warmly.
2. Ask what service they'd like (use get_services to show options).
3. Ask which professional they prefer (use get_staff to show available team members).
4. Ask for their preferred date and check availability (use get_available_slots).
5. Confirm details and book (use book_appointment).

Always be helpful, concise, and confirm all details before booking.
If a client doesn't have a preference for a professional, suggest one who offers the requested service.`

    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages,
      tools: [
        {
          name: 'get_services',
          description: 'Get the list of services offered by the salon, organized by category.',
          input_schema: { type: 'object', properties: {} }
        },
        {
          name: 'get_staff',
          description: 'Get the list of active professionals/stylists at the salon.',
          input_schema: { type: 'object', properties: {} }
        },
        {
          name: 'get_available_slots',
          description: 'Get available time slots for a specific date and optional staff member.',
          input_schema: {
            type: 'object',
            properties: {
              date: { type: 'string', description: 'The date in YYYY-MM-DD format.' },
              staff_id: { type: 'string', description: 'Optional. The staff member ID to check availability for.' }
            },
            required: ['date']
          }
        },
        {
          name: 'book_appointment',
          description: 'Book an appointment for the client.',
          input_schema: {
            type: 'object',
            properties: {
              service_id: { type: 'string', description: 'The service ID.' },
              staff_id: { type: 'string', description: 'The staff member ID.' },
              client_name: { type: 'string' },
              client_email: { type: 'string' },
              client_phone: { type: 'string' },
              start_time: { type: 'string', description: 'ISO string of the appointment start time.' },
              notes: { type: 'string', description: 'Any notes from the client.' }
            },
            required: ['service_id', 'staff_id', 'client_name', 'start_time']
          }
        }
      ]
    })

    if (response.stop_reason === 'tool_use') {
      const toolUse = response.content.find(c => c.type === 'tool_use') as any

      if (toolUse.name === 'get_services') {
        const { data: services } = await supabase
          .from('services')
          .select('id, name, description, duration_minutes, price, category_id, service_categories(name)')
          .eq('business_id', business_id)
          .eq('is_active', true)
        return NextResponse.json({
          content: response.content,
          toolResult: { tool_use_id: toolUse.id, content: JSON.stringify(services || []) }
        })
      }

      if (toolUse.name === 'get_staff') {
        const { data: staff } = await supabase
          .from('staff_members')
          .select('id, name, role')
          .eq('business_id', business_id)
          .eq('is_active', true)
        return NextResponse.json({
          content: response.content,
          toolResult: { tool_use_id: toolUse.id, content: JSON.stringify(staff || []) }
        })
      }

      if (toolUse.name === 'get_available_slots') {
        const { date, staff_id } = toolUse.input

        // Get existing appointments for that date
        const dayStart = `${date}T00:00:00Z`
        const dayEnd = `${date}T23:59:59Z`

        let query = supabase
          .from('appointments')
          .select('start_time, end_time')
          .eq('business_id', business_id)
          .gte('start_time', dayStart)
          .lte('start_time', dayEnd)
          .neq('status', 'cancelled')

        if (staff_id) {
          query = query.eq('staff_id', staff_id)
        }

        const { data: existingAppts } = await query
        const bookedTimes = new Set(existingAppts?.map(a => new Date(a.start_time).getHours()) || [])

        // Generate available slots (9am-6pm, skip booked hours)
        const slots = []
        for (let h = 9; h < 18; h++) {
          if (!bookedTimes.has(h)) {
            const hour = h.toString().padStart(2, '0')
            slots.push(`${date}T${hour}:00:00Z`)
          }
        }

        return NextResponse.json({
          content: response.content,
          toolResult: { tool_use_id: toolUse.id, content: JSON.stringify(slots) }
        })
      }

      if (toolUse.name === 'book_appointment') {
        const { service_id, staff_id, client_name, client_email, client_phone, start_time, notes } = toolUse.input

        // Create or find client
        let client: any = null
        if (client_email) {
          const { data } = await supabase
            .from('clients')
            .select('id')
            .eq('email', client_email)
            .eq('business_id', business_id)
            .single()
          client = data
        }
        if (!client) {
          const { data } = await supabase
            .from('clients')
            .insert({ business_id, name: client_name, email: client_email, phone: client_phone })
            .select('id')
            .single()
          client = data
        }

        // Get service duration
        const { data: service } = await supabase
          .from('services')
          .select('duration_minutes')
          .eq('id', service_id)
          .single()

        const end_time = new Date(
          new Date(start_time).getTime() + (service?.duration_minutes || 30) * 60000
        ).toISOString()

        const { error } = await supabase.from('appointments').insert({
          business_id,
          client_id: client?.id,
          service_id,
          staff_id,
          start_time,
          end_time,
          notes,
          source: 'ai_widget'
        })

        const result = error
          ? { error: error.message }
          : { success: true, message: 'Appointment booked successfully! ✨' }

        return NextResponse.json({
          content: response.content,
          toolResult: { tool_use_id: toolUse.id, content: JSON.stringify(result) }
        })
      }
    }

    return NextResponse.json(response)
  } catch (error: any) {
    console.error('API Chat Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
