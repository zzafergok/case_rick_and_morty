'use client'

import { useEffect } from 'react'

import { useQueryState } from 'nuqs'
import { Search, X } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'

import { Button } from '@/components/core/button'
import { TextField } from '@/components/forms/text-field'

interface FilterFormValues {
  name: string
  type: string
  dimension: string
}

export function LocationFilterBar() {
  const [name, setName] = useQueryState('name', { shallow: false, throttleMs: 500 })
  const [type, setType] = useQueryState('type', { shallow: false, throttleMs: 500 })
  const [dimension, setDimension] = useQueryState('dimension', { shallow: false, throttleMs: 500 })
  const [, setPage] = useQueryState('page')

  const methods = useForm<FilterFormValues>({
    defaultValues: {
      name: name || '',
      type: type || '',
      dimension: dimension || '',
    },
    mode: 'onChange',
  })

  const { watch, reset, setValue } = methods
  const watchedName = watch('name')
  const watchedType = watch('type')
  const watchedDimension = watch('dimension')

  // Sync Form -> URL
  useEffect(() => {
    if (watchedName !== undefined && watchedName !== (name || '')) {
      setName(watchedName || null)
      setPage(null)
    }
  }, [watchedName, setName, setPage])

  useEffect(() => {
    if (watchedType !== undefined && watchedType !== (type || '')) {
      setType(watchedType || null)
      setPage(null)
    }
  }, [watchedType, setType, setPage])

  useEffect(() => {
    if (watchedDimension !== undefined && watchedDimension !== (dimension || '')) {
      setDimension(watchedDimension || null)
      setPage(null)
    }
  }, [watchedDimension, setDimension, setPage])

  // Sync URL -> Form
  useEffect(() => {
    if (name !== watchedName) {
      setValue('name', name || '', { shouldDirty: false, shouldTouch: false })
    }
    if (type !== watchedType) {
      setValue('type', type || '', { shouldDirty: false, shouldTouch: false })
    }
    if (dimension !== watchedDimension) {
      setValue('dimension', dimension || '', { shouldDirty: false, shouldTouch: false })
    }
  }, [name, type, dimension, setValue])

  const clearFilters = () => {
    reset({ name: '', type: '', dimension: '' })
    setName(null)
    setType(null)
    setDimension(null)
    setPage(null)
  }

  const hasFilters = !!watchedName || !!watchedType || !!watchedDimension

  return (
    <FormProvider {...methods}>
      <div className='flex flex-col items-end gap-4 rounded-lg bg-muted/50 p-4 md:flex-row'>
        <div className='relative w-full md:w-1/3'>
          <TextField
            name='name'
            label='Name'
            placeholder='Search locations...'
            className='w-full'
            showPasswordToggle={false}
          />
          <Search className='pointer-events-none absolute right-3 top-10 h-4 w-4 text-muted-foreground' />
        </div>

        <div className='w-full md:w-1/3'>
          <TextField
            name='type'
            label='Type'
            placeholder='e.g. Planet, Cluster...'
            className='w-full'
            showPasswordToggle={false}
          />
        </div>

        <div className='w-full md:w-1/3'>
          <TextField
            name='dimension'
            label='Dimension'
            placeholder='e.g. C-137...'
            className='w-full'
            showPasswordToggle={false}
          />
        </div>

        {hasFilters && (
          <Button variant='ghost' onClick={clearFilters} className='mb-0.5 whitespace-nowrap'>
            <X className='mr-2 h-4 w-4' />
            Clear
          </Button>
        )}
      </div>
    </FormProvider>
  )
}
