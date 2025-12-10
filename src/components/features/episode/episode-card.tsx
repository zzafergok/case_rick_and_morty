'use client'

import { useTranslation } from 'react-i18next'

import Link from 'next/link'
import { Calendar, Users } from 'lucide-react'

import { Card, CardContent, CardHeader } from '@/components/core/card'
import { Badge } from '@/components/core/badge'

import { type Episode } from '@/types/rick-and-morty'

interface EpisodeCardProps {
  episode: Episode
}

export function EpisodeCard({ episode }: EpisodeCardProps) {
  const { t } = useTranslation()

  return (
    <Link href={`/episode/${episode.id}`} className='group block transition-all hover:scale-[1.02]'>
      <Card className='h-full overflow-hidden transition-shadow duration-300 hover:shadow-lg'>
        <CardHeader className='p-4 pb-2'>
          <div className='flex items-start justify-between gap-2'>
            <h3 className='line-clamp-2 text-lg font-bold leading-tight transition-colors group-hover:text-primary'>
              {episode.name}
            </h3>
            <Badge variant='outline' className='shrink-0'>
              {episode.episode}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className='space-y-3 p-4 pt-2'>
          <div className='flex items-center gap-2 text-sm text-muted-foreground'>
            <Calendar className='h-4 w-4 shrink-0' />
            <span className='truncate'>{episode.air_date}</span>
          </div>

          <div className='flex items-center gap-2 text-sm text-muted-foreground'>
            <Users className='h-4 w-4 shrink-0' />
            <span>
              {episode.characters.length} {t('episode.card.characters')}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
