'use server'

import { createClient } from '@/lib/supabase/server'
import { getMyBusiness } from './business'

export async function getServices() {
  const supabase = await createClient()
  const { data: business } = await getMyBusiness()
  if (!business) return { error: 'No business found' }

  const { data, error } = await supabase
    .from('services')
    .select('*, service_categories(name, color)')
    .eq('business_id', business.id)
    .order('created_at', { ascending: false })

  return { data, error: error?.message }
}

export async function createService(formData: FormData) {
  const supabase = await createClient()
  const { data: business } = await getMyBusiness()
  if (!business) return { error: 'No business found' }

  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const duration_minutes = parseInt(formData.get('duration_minutes') as string)
  const price = parseFloat(formData.get('price') as string)
  const category_id = formData.get('category_id') as string

  const insertData: any = {
    business_id: business.id,
    name,
    description,
    duration_minutes,
    price,
  }

  // Only add category_id if one was selected
  if (category_id && category_id !== 'none') {
    insertData.category_id = category_id
  }

  const { data, error } = await supabase
    .from('services')
    .insert(insertData)
    .select()

  return { data, error: error?.message }
}

export async function toggleServiceStatus(id: string, is_active: boolean) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('services')
    .update({ is_active })
    .eq('id', id)

  return { error: error?.message }
}