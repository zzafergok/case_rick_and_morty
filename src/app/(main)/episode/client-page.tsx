'use client'

import { useTranslation } from 'react-i18next'

import { useQueryState, parseAsInteger } from 'nuqs'

import { EpisodeFilterBar } from '@/components/features/episode/episode-filter-bar'
import { EpisodeGrid } from '@/components/features/episode/episode-grid'
import { EnhancedPaginationControls } from '@/components/core/enhanced-pagination-controls'

import { useEpisodes } from '@/hooks/useRickAndMorty'

export function EpisodeClientPage() {
  const { t } = useTranslation()
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [name] = useQueryState('name')
  const [episode] = useQueryState('episode')

  const { data, isLoading, isError } = useEpisodes({
    page,
    name: name || undefined,
    episode: episode || undefined,
  })

  // Handle 404/Empty from API which returns { results: [] }
  const episodes = data?.results || []
  const totalPages = data?.info?.pages || 0

  return (
    <div className='container mx-auto space-y-8 px-4 py-8 md:px-6'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-3xl font-bold tracking-tight'>{t('episode.list.title')}</h1>
        <p className='text-muted-foreground'>{t('episode.list.description')}</p>
      </div>

      <EpisodeFilterBar />

      {isError ? (
        <div className='py-12 text-center text-red-500'>{t('episode.list.error')}</div>
      ) : (
        <>
          <EpisodeGrid episodes={episodes} isLoading={isLoading} />

          {totalPages > 1 && (
            <EnhancedPaginationControls
              pagination={{
                current: page,
                pageSize: 20,
                total: data?.info?.count || 0,
                totalPages,
              }}
              onPageChange={setPage}
              onPageSizeChange={() => {}}
              showSizeChanger={false}
            />
          )}
        </>
      )}
    </div>
  )
}
