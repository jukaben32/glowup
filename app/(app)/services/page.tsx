import { getServices } from '@/actions/services'
import { getServiceCategories } from '@/actions/categories'
import ServicesPageClient from './services-client'

export default async function ServicesPage() {
  const { data: services } = await getServices()
  const { data: categories } = await getServiceCategories()

  return <ServicesPageClient services={services || []} categories={categories || []} />
}
