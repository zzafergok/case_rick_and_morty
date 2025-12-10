'use client'

import Link from 'next/link'

import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Calendar, Globe, MapPin, Users } from 'lucide-react'

import { Badge } from '@/components/core/badge'
import { Separator } from '@/components/core/separator'
import { Card, CardContent } from '@/components/core/card'
import { buttonVariants } from '@/components/core/button-variants'
import { CharacterGrid } from '@/components/features/character/character-grid'

import { cn } from '@/lib/utils'

import { type Character, type Location } from '@/types/rick-and-morty'

interface LocationDetailProps {
  location: Location
  residents: Character[]
}

export function LocationDetail({ location, residents }: LocationDetailProps) {
  const { t } = useTranslation()

  const createdDate = new Date(location.created)
  const formattedDate = format(createdDate, 'PPP')

  return (
    <div className='animate-in fade-in container mx-auto space-y-8 px-4 py-8 duration-500 md:px-6'>
      {/* Navigation */}
      <Link
        href='/location'
        className={cn(buttonVariants({ variant: 'ghost' }), 'group -ml-2 pl-0 hover:bg-transparent')}
      >
        <ArrowLeft className='h-4 w-4 transition-transform group-hover:-translate-x-1' />
        {t('location.detail.backToList')}
      </Link>

      <div className='grid gap-8 lg:grid-cols-[350px_1fr]'>
        {/* Sidebar / Info */}
        <div className='space-y-6'>
          <div className='relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow'>
            <div className='flex h-32 items-center justify-center bg-gradient-to-br from-indigo-500/20 to-purple-500/20'>
              <MapPin className='h-12 w-12 text-primary/50' />
            </div>
            <div className='space-y-6 p-6'>
              <div>
                <h1 className='mb-2 text-3xl font-bold tracking-tight'>{location.name}</h1>
                <Badge variant='secondary' className='text-sm'>
                  {location.type}
                </Badge>
              </div>

              <Separator />

              <div className='space-y-4'>
                <div className='flex items-center gap-3 text-muted-foreground'>
                  <div className='shrink-0 rounded-lg bg-primary/10 p-2'>
                    <Globe className='h-4 w-4 text-primary' />
                  </div>
                  <div>
                    <p className='text-xs font-medium uppercase tracking-wider'>{t('location.detail.dimension')}</p>
                    <p className='text-sm font-semibold text-foreground'>
                      {location.dimension === 'unknown' ? t('location.detail.unknownDimension') : location.dimension}
                    </p>
                  </div>
                </div>

                <div className='flex items-center gap-3 text-muted-foreground'>
                  <div className='shrink-0 rounded-lg bg-primary/10 p-2'>
                    <Users className='h-4 w-4 text-primary' />
                  </div>
                  <div>
                    <p className='text-xs font-medium uppercase tracking-wider'>{t('location.detail.residents')}</p>
                    <p className='text-sm font-semibold text-foreground'>{location.residents.length}</p>
                  </div>
                </div>

                <div className='flex items-center gap-3 text-muted-foreground'>
                  <div className='shrink-0 rounded-lg bg-primary/10 p-2'>
                    <Calendar className='h-4 w-4 text-primary' />
                  </div>
                  <div>
                    <p className='text-xs font-medium uppercase tracking-wider'>{t('location.detail.created')}</p>
                    <p className='text-sm font-semibold text-foreground'>{formattedDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Residents Grid */}
        <div className='space-y-6'>
          <h2 className='flex items-center gap-2 text-2xl font-bold tracking-tight'>
            <Users className='h-6 w-6' />
            {t('location.detail.residents')} ({residents.length})
          </h2>

          {residents.length > 0 ? (
            <CharacterGrid characters={residents} />
          ) : (
            <Card className='bg-muted/30'>
              <CardContent className='py-8 text-center text-muted-foreground'>
                {t('location.detail.noResidents')}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
