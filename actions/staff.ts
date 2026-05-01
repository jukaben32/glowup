'use server'

import { createClient } from '@/lib/supabase/server'
import { getMyBusiness } from './business'

export async function getStaffMembers() {
  const supabase = await createClient()
  const { data: business } = await getMyBusiness()
  if (!business) return { error: 'No business found' }

  const { data, error } = await supabase
    .from('staff_members')
    .select('*')
    .eq('business_id', business.id)
    .order('sort_order', { ascending: true })

  return { data, error: error?.message }
}

export async function createStaffMember(formData: FormData) {
  const supabase = await createClient()
  const { data: business } = await getMyBusiness()
  if (!business) return { error: 'No business found' }

  const name = formData.get('name') as string
  const role = formData.get('role') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string

  const { data, error } = await supabase
    .from('staff_members')
    .insert({
      business_id: business.id,
      name,
      role,
      email,
      phone,
    })
    .select()
    .single()

  if (error) return { error: error.message }

  // Create default schedule (Mon-Sat, 9-18)
  if (data) {
    const defaultSchedule = [0, 1, 2, 3, 4, 5, 6].map(day => ({
      staff_id: data.id,
      day_of_week: day,
      start_time: '09:00:00',
      end_time: '18:00:00',
      is_available: day !== 0, // Sunday off by default
    }))

    await supabase.from('staff_schedules').insert(defaultSchedule)
  }

  return { data, error: null }
}

export async function toggleStaffStatus(id: string, is_active: boolean) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('staff_members')
    .update({ is_active })
    .eq('id', id)

  return { error: error?.message }
}

export async function getStaffSchedule(staffId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('staff_schedules')
    .select('*')
    .eq('staff_id', staffId)
    .order('day_of_week', { ascending: true })

  return { data, error: error?.message }
}

export async function getStaffServices(staffId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('staff_services')
    .select(`
      *,
      services ( id, name, duration_minutes, price, category_id )
    `)
    .eq('staff_id', staffId)

  return { data, error: error?.message }
}

export async function assignServiceToStaff(staffId: string, serviceId: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('staff_services')
    .insert({ staff_id: staffId, service_id: serviceId })

  return { error: error?.message }
}

export async function removeServiceFromStaff(staffId: string, serviceId: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('staff_services')
    .delete()
    .eq('staff_id', staffId)
    .eq('service_id', serviceId)

  return { error: error?.message }
}
