import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

import { LocationClientPage } from './client-page'

import { fetchLocations } from '@/hooks/useRickAndMorty'
import { getQueryClient } from '@/lib/get-query-client'

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams

  const page = typeof resolvedSearchParams.page === 'string' ? parseInt(resolvedSearchParams.page) : 1
  const name = typeof resolvedSearchParams.name === 'string' ? resolvedSearchParams.name : undefined
  const type = typeof resolvedSearchParams.type === 'string' ? resolvedSearchParams.type : undefined
  const dimension = typeof resolvedSearchParams.dimension === 'string' ? resolvedSearchParams.dimension : undefined

  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['locations', { page, name, type, dimension }],
    queryFn: () => fetchLocations({ page, name, type, dimension }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LocationClientPage />
    </HydrationBoundary>
  )
}
