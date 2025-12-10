'use client'

import Link from 'next/link'

import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Calendar, Tv, Users } from 'lucide-react'

import { Badge } from '@/components/core/badge'
import { Separator } from '@/components/core/separator'
import { Card, CardContent } from '@/components/core/card'
import { buttonVariants } from '@/components/core/button-variants'
import { CharacterGrid } from '@/components/features/character/character-grid'

import { cn } from '@/lib/utils'

import { type Character, type Episode } from '@/types/rick-and-morty'

interface EpisodeDetailProps {
  episode: Episode
  characters: Character[]
}

export function EpisodeDetail({ episode, characters }: EpisodeDetailProps) {
  const { t } = useTranslation()

  const createdDate = new Date(episode.created)
  const formattedDate = format(createdDate, 'PPP')

  return (
    <div className='animate-in fade-in container mx-auto space-y-8 px-4 py-8 duration-500 md:px-6'>
      {/* Navigation */}
      <Link
        href='/episode'
        className={cn(buttonVariants({ variant: 'ghost' }), 'group -ml-2 pl-0 hover:bg-transparent')}
      >
        <ArrowLeft className='h-4 w-4 transition-transform group-hover:-translate-x-1' />
        {t('episode.detail.backToList')}
      </Link>

      <div className='grid gap-8 lg:grid-cols-[350px_1fr]'>
        {/* Sidebar / Info */}
        <div className='space-y-6'>
          <div className='relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow'>
            <div className='flex h-32 items-center justify-center bg-gradient-to-br from-pink-500/20 to-rose-500/20'>
              <Tv className='h-12 w-12 text-primary/50' />
            </div>
            <div className='space-y-6 p-6'>
              <div>
                <h1 className='mb-2 text-3xl font-bold tracking-tight'>{episode.name}</h1>
                <Badge variant='secondary' className='text-sm'>
                  {episode.episode}
                </Badge>
              </div>

              <Separator />

              <div className='space-y-4'>
                <div className='flex items-center gap-3 text-muted-foreground'>
                  <div className='shrink-0 rounded-lg bg-primary/10 p-2'>
                    <Calendar className='h-4 w-4 text-primary' />
                  </div>
                  <div>
                    <p className='text-xs font-medium uppercase tracking-wider'>{t('episode.detail.airDate')}</p>
                    <p className='text-sm font-semibold text-foreground'>{episode.air_date}</p>
                  </div>
                </div>

                <div className='flex items-center gap-3 text-muted-foreground'>
                  <div className='shrink-0 rounded-lg bg-primary/10 p-2'>
                    <Users className='h-4 w-4 text-primary' />
                  </div>
                  <div>
                    <p className='text-xs font-medium uppercase tracking-wider'>{t('episode.detail.characters')}</p>
                    <p className='text-sm font-semibold text-foreground'>{episode.characters.length}</p>
                  </div>
                </div>

                <div className='flex items-center gap-3 text-muted-foreground'>
                  <div className='shrink-0 rounded-lg bg-primary/10 p-2'>
                    <Calendar className='h-4 w-4 text-primary' />
                  </div>
                  <div>
                    <p className='text-xs font-medium uppercase tracking-wider'>{t('episode.detail.created')}</p>
                    <p className='text-sm font-semibold text-foreground'>{formattedDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Characters Grid */}
        <div className='space-y-6'>
          <h2 className='flex items-center gap-2 text-2xl font-bold tracking-tight'>
            <Users className='h-6 w-6' />
            {t('episode.detail.charactersAppearing')} ({characters.length})
          </h2>

          {characters.length > 0 ? (
            <CharacterGrid characters={characters} />
          ) : (
            <Card className='bg-muted/30'>
              <CardContent className='py-8 text-center text-muted-foreground'>
                {t('episode.detail.noCharacters')}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
