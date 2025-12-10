'use client'

import { useQueryState, parseAsInteger } from 'nuqs'
import { useTranslation } from 'react-i18next'

import { FilterBar } from '@/components/features/character/filter-bar'
import { CharacterGrid } from '@/components/features/character/character-grid'
import { EnhancedPaginationControls } from '@/components/core/enhanced-pagination-controls'

import { useCharacters } from '@/hooks/useRickAndMorty'

export function ClientPage() {
  const { t } = useTranslation()
  const [status] = useQueryState('status')
  const [gender] = useQueryState('gender')
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))

  const { data, isLoading, isError } = useCharacters({
    page,
    status: status || undefined,
    gender: gender || undefined,
  })

  // API returns 20 items per page by default
  const pageSize = 20
  const totalItems = data?.info?.count || 0
  const totalPages = data?.info?.pages || 0

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePageSizeChange = () => {
    // API limitation: Fixed page size
  }

  const paginationInfo = {
    current: page,
    pageSize,
    total: totalItems,
    totalPages,
  }

  return (
    <div className='container mx-auto space-y-8 px-4 py-8 md:px-6'>
      <div className='flex flex-col gap-4'>
        <h1 className='text-3xl font-bold tracking-tight'>{t('character.list.title')}</h1>
        <p className='text-muted-foreground'>{t('character.list.description')}</p>
      </div>

      <FilterBar />

      {isError ? (
        <div className='rounded-lg bg-red-50 p-8 text-center text-red-500'>{t('character.list.error')}</div>
      ) : (
        <>
          <CharacterGrid characters={data?.results || []} isLoading={isLoading} />
          {!isLoading && totalPages > 1 && (
            <EnhancedPaginationControls
              pagination={paginationInfo}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              showSizeChanger={false}
            />
          )}
        </>
      )}
    </div>
  )
}
