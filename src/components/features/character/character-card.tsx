'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

import { Card, CardContent, CardHeader } from '@/components/core/card'

import { type Character } from '@/types/rick-and-morty'

interface CharacterCardProps {
  character: Character
}

export function CharacterCard({ character }: CharacterCardProps) {
  const { t } = useTranslation()

  return (
    <Link href={`/character/${character.id}`} className='group block transition-all hover:scale-[1.02]'>
      <Card className='h-full overflow-hidden transition-shadow duration-300 hover:shadow-lg'>
        <div className='relative aspect-square'>
          <Image
            src={character.image}
            alt={character.name}
            fill
            className='object-cover transition-transform duration-300 hover:scale-105'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>
        <CardHeader className='p-4'>
          <h3 className='truncate text-lg font-bold' title={character.name}>
            {character.name}
          </h3>
          <div className='mt-2 flex items-center gap-2'>
            <div
              className={`h-2 w-2 rounded-full ${
                character.status === 'Alive'
                  ? 'bg-green-500'
                  : character.status === 'Dead'
                    ? 'bg-red-500'
                    : 'bg-gray-500'
              }`}
            />
            <span className='text-sm font-medium text-muted-foreground'>
              {character.status} - {character.species}
            </span>
          </div>
        </CardHeader>
        <CardContent className='p-4 pt-0'>
          <div className='space-y-2'>
            <div className='flex flex-col'>
              <span className='text-xs text-muted-foreground'>{t('character.card.lastKnownLocation')}</span>
              <span className='truncate text-sm font-medium'>{character.location.name}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
