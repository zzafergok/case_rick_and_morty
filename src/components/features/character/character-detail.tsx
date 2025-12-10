'use client'

import Link from 'next/link'
import Image from 'next/image'

import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'
import { Activity, ArrowLeft, Calendar, Disc, Dna, Globe, Info, MapPin, Tv } from 'lucide-react'

import { Badge } from '@/components/core/badge'
import { Button } from '@/components/core/button'
import { Separator } from '@/components/core/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card'

import { type Character } from '@/types/rick-and-morty'

interface CharacterDetailProps {
  character: Character
}

export function CharacterDetail({ character }: CharacterDetailProps) {
  const { t } = useTranslation()
  const createdDate = new Date(character.created)
  const formattedDate = format(createdDate, 'PPP')

  const statusColor =
    character.status === 'Alive'
      ? 'bg-green-500/10 text-green-500 border-green-500/20'
      : character.status === 'Dead'
        ? 'bg-red-500/10 text-red-500 border-red-500/20'
        : 'bg-gray-500/10 text-gray-500 border-gray-500/20'

  return (
    <div className='animate-in fade-in mx-auto max-w-6xl space-y-8 p-4 duration-500 md:p-8'>
      {/* Navigation */}
      <Button variant='ghost' className='group -ml-2 pl-0 hover:bg-transparent'>
        <Link
          href='/character'
          className='flex items-center gap-2 text-muted-foreground transition-colors group-hover:text-foreground'
        >
          <ArrowLeft className='h-4 w-4 transition-transform group-hover:-translate-x-1' />
          {t('character.detail.backToDirectory')}
        </Link>
      </Button>

      {/* Hero Section */}
      <div className='grid gap-8 lg:grid-cols-[400px_1fr]'>
        <div className='space-y-4'>
          <div className='relative aspect-square overflow-hidden rounded-2xl border bg-muted shadow-xl'>
            <Image
              src={character.image}
              alt={character.name}
              fill
              className='object-cover transition-transform duration-700 hover:scale-105'
              sizes='(max-width: 768px) 100vw, 400px'
              priority
            />
          </div>
          <div className='flex items-center justify-center gap-2 text-sm text-muted-foreground'>
            <Calendar className='h-4 w-4' />
            <span>
              {t('character.detail.created')} {formattedDate}
            </span>
          </div>
        </div>

        <div className='space-y-8'>
          <div>
            <div className='mb-4 flex items-center gap-3'>
              <h1 className='text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl'>{character.name}</h1>
            </div>
            <div className='flex flex-wrap items-center gap-3'>
              <Badge variant='outline' className={`px-3 py-1 ${statusColor}`}>
                <Activity className='mr-2 h-3 w-3' />
                {character.status}
              </Badge>
              <Badge variant='secondary' className='px-3 py-1'>
                <Dna className='mr-2 h-3 w-3' />
                {character.species}
              </Badge>
              <Badge variant='secondary' className='px-3 py-1'>
                {character.gender === 'Male' ? (
                  <span className='mr-2 text-blue-400'>♂</span>
                ) : character.gender === 'Female' ? (
                  <span className='mr-2 text-pink-400'>♀</span>
                ) : (
                  <Disc className='mr-2 h-3 w-3' />
                )}
                {character.gender}
              </Badge>
              {character.type && (
                <Badge variant='outline' className='px-3 py-1'>
                  <Info className='mr-2 h-3 w-3' />
                  {character.type}
                </Badge>
              )}
            </div>
          </div>

          <Separator />

          <div className='grid gap-4 sm:grid-cols-2'>
            <Card className='border-primary/10 bg-primary/5'>
              <CardHeader className='pb-2'>
                <CardTitle className='flex items-center gap-2 text-sm font-medium text-muted-foreground'>
                  <Globe className='h-4 w-4' />
                  {t('character.detail.origin')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-lg font-semibold'>{character.origin.name}</div>
                {character.origin.url && (
                  <div className='mt-1 text-xs text-muted-foreground'>{t('character.detail.dimensionDetails')}</div>
                )}
              </CardContent>
            </Card>

            <Card className='border-primary/10 bg-primary/5'>
              <CardHeader className='pb-2'>
                <CardTitle className='flex items-center gap-2 text-sm font-medium text-muted-foreground'>
                  <MapPin className='h-4 w-4' />
                  {t('character.detail.location')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-lg font-semibold'>{character.location.name}</div>
                {character.location.url && (
                  <div className='mt-1 text-xs text-muted-foreground'>{t('character.detail.locationDetails')}</div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Tv className='h-5 w-5' />
                {t('character.detail.episodes')} ({character.episode.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-2 gap-2 pt-4 sm:grid-cols-3 md:grid-cols-4'>
                {character.episode.map((ep) => {
                  const episodeId = ep.split('/').pop()
                  return (
                    <div
                      key={ep}
                      className='flex cursor-default items-center justify-center rounded-md border bg-muted/50 p-2 text-sm transition-colors hover:bg-muted'
                      title={ep}
                    >
                      {t('character.detail.episode')} {episodeId}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
