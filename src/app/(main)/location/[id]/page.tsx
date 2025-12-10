import { notFound } from 'next/navigation'

import { fetchLocation, fetchCharactersByIds } from '@/hooks/useRickAndMorty'
import { LocationDetail } from '@/components/features/location/location-detail'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function LocationDetailPage({ params }: PageProps) {
  const { id } = await params

  if (!id || isNaN(parseInt(id))) {
    notFound()
  }

  try {
    // Fetch location
    const location = await fetchLocation(parseInt(id))

    // Extract resident IDs from URLs
    const residentIds = location.residents
      .map((url) => {
        const parts = url.split('/')
        return parseInt(parts[parts.length - 1])
      })
      .filter((id) => !isNaN(id))

    const residents = residentIds.length > 0 ? await fetchCharactersByIds(residentIds) : []

    return <LocationDetail location={location} residents={residents} />
  } catch (error) {
    console.error(error)
    notFound()
  }
}
