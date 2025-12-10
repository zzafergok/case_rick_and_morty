import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

import { EpisodeClientPage } from './client-page'

import { fetchEpisodes } from '@/hooks/useRickAndMorty'
import { getQueryClient } from '@/lib/get-query-client'

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams

  const page = typeof resolvedSearchParams.page === 'string' ? parseInt(resolvedSearchParams.page) : 1
  const name = typeof resolvedSearchParams.name === 'string' ? resolvedSearchParams.name : undefined
  const episode = typeof resolvedSearchParams.episode === 'string' ? resolvedSearchParams.episode : undefined

  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['episodes', { page, name, episode }],
    queryFn: () => fetchEpisodes({ page, name, episode }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EpisodeClientPage />
    </HydrationBoundary>
  )
}
