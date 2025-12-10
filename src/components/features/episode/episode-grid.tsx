'use client'

import { useTranslation } from 'react-i18next'

import { EpisodeCard } from './episode-card'

import { Skeleton } from '@/components/core/skeleton'
import { Card, CardContent, CardHeader } from '@/components/core/card'

import { type Episode } from '@/types/rick-and-morty'

interface EpisodeGridProps {
  episodes: Episode[]
  isLoading?: boolean
}

export function EpisodeGrid({ episodes, isLoading = false }: EpisodeGridProps) {
  const { t } = useTranslation()

  if (isLoading) {
    return (
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4'>
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className='h-[160px] overflow-hidden'>
            <CardHeader className='space-y-2 p-4 pb-2'>
              <Skeleton className='h-6 w-3/4' />
              <Skeleton className='h-4 w-1/4' />
            </CardHeader>
            <CardContent className='space-y-3 p-4 pt-2'>
              <Skeleton className='h-4 w-1/2' />
              <Skeleton className='h-4 w-1/3' />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (episodes.length === 0) {
    return (
      <div className='py-12 text-center'>
        <p className='text-lg text-muted-foreground'>{t('episode.grid.noResults')}</p>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4'>
      {episodes.map((episode) => (
        <EpisodeCard key={episode.id} episode={episode} />
      ))}
    </div>
  )
}
