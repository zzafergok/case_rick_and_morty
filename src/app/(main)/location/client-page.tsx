'use client'

import { useTranslation } from 'react-i18next'

import { useQueryState, parseAsInteger } from 'nuqs'

import { LocationGrid } from '@/components/features/location/location-grid'
import { LocationFilterBar } from '@/components/features/location/location-filter-bar'
import { EnhancedPaginationControls } from '@/components/core/enhanced-pagination-controls'

import { useLocations } from '@/hooks/useRickAndMorty'

export function LocationClientPage() {
  const { t } = useTranslation()
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [name] = useQueryState('name')
  const [type] = useQueryState('type')
  const [dimension] = useQueryState('dimension')

  const { data, isLoading, isError } = useLocations({
    page,
    name: name || undefined,
    type: type || undefined,
    dimension: dimension || undefined,
  })

  const locations = data?.results || []
  const totalPages = data?.info?.pages || 0

  return (
    <div className='container mx-auto space-y-8 px-4 py-8 md:px-6'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-3xl font-bold tracking-tight'>{t('location.list.title')}</h1>
        <p className='text-muted-foreground'>{t('location.list.description')}</p>
      </div>

      <LocationFilterBar />

      {isError ? (
        <div className='py-12 text-center text-red-500'>{t('location.list.error')}</div>
      ) : (
        <>
          <LocationGrid locations={locations} isLoading={isLoading} />

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
