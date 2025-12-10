'use client'

import { useTranslation } from 'react-i18next'
import { type Character } from '@/types/rick-and-morty'
import { CharacterCard } from './character-card'

interface CharacterGridProps {
  characters: Character[]
  isLoading?: boolean
}

export function CharacterGrid({ characters, isLoading }: CharacterGridProps) {
  const { t } = useTranslation()

  if (isLoading) {
    return (
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4'>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className='h-[280px] animate-pulse rounded-lg bg-muted sm:h-[350px]' />
        ))}
      </div>
    )
  }

  if (characters.length === 0) {
    return (
      <div className='py-12 text-center'>
        <div className='text-lg font-semibold'>{t('character.grid.noResults')}</div>
        <p className='text-muted-foreground'>{t('character.grid.adjustFilters')}</p>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4'>
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  )
}
