'use server'

import { createClient } from '@/lib/supabase/server'

// Get business info for the logged in user
export async function getMyBusiness() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('owner_id', user.id)
    .single()

  return { data, error: error?.message }
}
