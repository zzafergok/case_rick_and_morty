'use client'

import { useTranslation } from 'react-i18next'

import { useEffect } from 'react'

import { FormProvider, useForm } from 'react-hook-form'

import { useQueryState } from 'nuqs'
import { Search, X } from 'lucide-react'

import { Button } from '@/components/core/button'
import { TextField } from '@/components/forms/text-field'

interface FilterFormValues {
  name: string
  episode: string
}

export function EpisodeFilterBar() {
  const { t } = useTranslation()
  const [name, setName] = useQueryState('name', { shallow: false, throttleMs: 500 })
  const [episode, setEpisode] = useQueryState('episode', { shallow: false, throttleMs: 500 })
  const [, setPage] = useQueryState('page')

  const methods = useForm<FilterFormValues>({
    defaultValues: {
      name: name || '',
      episode: episode || '',
    },
    mode: 'onChange',
  })

  const { watch, reset, setValue } = methods
  const watchedName = watch('name')
  const watchedEpisode = watch('episode')

  useEffect(() => {
    if (watchedName !== undefined && watchedName !== (name || '')) {
      setName(watchedName || null)
      setPage(null)
    }
  }, [watchedName, setName, setPage])

  useEffect(() => {
    if (watchedEpisode !== undefined && watchedEpisode !== (episode || '')) {
      setEpisode(watchedEpisode || null)
      setPage(null)
    }
  }, [watchedEpisode, setEpisode, setPage])

  useEffect(() => {
    if (name !== watchedName) {
      setValue('name', name || '', { shouldDirty: false, shouldTouch: false })
    }
    if (episode !== watchedEpisode) {
      setValue('episode', episode || '', { shouldDirty: false, shouldTouch: false })
    }
  }, [name, episode, setValue])

  const clearFilters = () => {
    reset({ name: '', episode: '' })
    setName(null)
    setEpisode(null)
    setPage(null)
  }

  const hasFilters = !!watchedName || !!watchedEpisode

  return (
    <FormProvider {...methods}>
      <div className='flex flex-col items-end gap-4 rounded-lg bg-muted/50 p-4 md:flex-row'>
        <div className='relative w-full md:w-1/2'>
          <TextField
            name='name'
            label={t('episode.filter.name.label')}
            placeholder={t('episode.filter.name.placeholder')}
            className='w-full'
            showPasswordToggle={false}
          />
          <Search className='pointer-events-none absolute right-3 top-10 h-4 w-4 text-muted-foreground' />
        </div>

        <div className='w-full md:w-1/2'>
          <TextField
            name='episode'
            label={t('episode.filter.code.label')}
            placeholder={t('episode.filter.code.placeholder')}
            className='w-full'
            showPasswordToggle={false}
          />
        </div>

        {hasFilters && (
          <Button variant='ghost' onClick={clearFilters} className='mb-0.5 whitespace-nowrap'>
            <X className='mr-2 h-4 w-4' />
            {t('episode.filter.clear')}
          </Button>
        )}
      </div>
    </FormProvider>
  )
}
