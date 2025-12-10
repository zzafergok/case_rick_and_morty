import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

import { getQueryClient } from '@/lib/get-query-client'
import { fetchCharacters } from '@/hooks/useRickAndMorty'

import { ClientPage } from './client-page'

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams

  const page = typeof resolvedSearchParams.page === 'string' ? parseInt(resolvedSearchParams.page) : 1
  const status = typeof resolvedSearchParams.status === 'string' ? resolvedSearchParams.status : undefined
  const gender = typeof resolvedSearchParams.gender === 'string' ? resolvedSearchParams.gender : undefined

  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['characters', { page, status, gender }],
    queryFn: () => fetchCharacters({ page, status, gender }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientPage />
    </HydrationBoundary>
  )
}
