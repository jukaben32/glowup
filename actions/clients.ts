'use server'

import { createClient } from '@/lib/supabase/server'
import { getMyBusiness } from './business'

export async function getClients() {
  const supabase = await createClient()
  const { data: business } = await getMyBusiness()
  if (!business) return { error: 'No business found' }

  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('business_id', business.id)
    .order('created_at', { ascending: false })

  return { data, error: error?.message }
}

export async function createClientAction(formData: FormData) {
  const supabase = await createClient()
  const { data: business } = await getMyBusiness()
  if (!business) return { error: 'No business found' }

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const notes = formData.get('notes') as string

  const { data, error } = await supabase
    .from('clients')
    .insert({
      business_id: business.id,
      name,
      email,
      phone,
      notes,
    })
    .select()

  return { data, error: error?.message }
}
