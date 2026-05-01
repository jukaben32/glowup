'use server'

import { createClient } from '@/lib/supabase/server'
import { getMyBusiness } from './business'

export async function getServiceCategories() {
  const supabase = await createClient()
  const { data: business } = await getMyBusiness()
  if (!business) return { error: 'No business found' }

  const { data, error } = await supabase
    .from('service_categories')
    .select('*')
    .eq('business_id', business.id)
    .order('sort_order', { ascending: true })

  return { data, error: error?.message }
}

export async function createServiceCategory(formData: FormData) {
  const supabase = await createClient()
  const { data: business } = await getMyBusiness()
  if (!business) return { error: 'No business found' }

  const name = formData.get('name') as string
  const color = formData.get('color') as string || '#0d9488'

  const { data, error } = await supabase
    .from('service_categories')
    .insert({
      business_id: business.id,
      name,
      color,
    })
    .select()
    .single()

  return { data, error: error?.message }
}
