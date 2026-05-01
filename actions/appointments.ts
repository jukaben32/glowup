'use server'

import { createClient } from '@/lib/supabase/server'
import { getMyBusiness } from './business'

export async function getAppointments() {
  const supabase = await createClient()
  const { data: business } = await getMyBusiness()
  if (!business) return { error: 'No business found' }

  const { data, error } = await supabase
    .from('appointments')
    .select(`
      *,
      clients ( name, email, phone ),
      services ( name, duration_minutes, price )
    `)
    .eq('business_id', business.id)
    .order('start_time', { ascending: true })

  return { data, error: error?.message }
}

export async function createAppointment(formData: FormData) {
  const supabase = await createClient()
  const { data: business } = await getMyBusiness()
  if (!business) return { error: 'No business found' }

  const client_id = formData.get('client_id') as string
  const service_id = formData.get('service_id') as string
  const start_time = formData.get('start_time') as string
  const end_time = formData.get('end_time') as string
  const source = 'manual'

  const { data, error } = await supabase
    .from('appointments')
    .insert({
      business_id: business.id,
      client_id,
      service_id,
      start_time,
      end_time,
      source,
    })
    .select()

  return { data, error: error?.message }
}

export async function updateAppointmentStatus(id: string, status: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('appointments')
    .update({ status })
    .eq('id', id)

  return { error: error?.message }
}