'use client'

import { useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { FormProvider, useForm } from 'react-hook-form'

import { Button } from '@/components/core/button'
import { SelectField } from '@/components/forms/select-field'

interface FilterFormValues {
  status: string
  gender: string
}

export function FilterBar() {
  const { t } = useTranslation()
  const [status, setStatus] = useQueryState('status', {
    shallow: false,
  })
  const [gender, setGender] = useQueryState('gender', {
    shallow: false,
  })
  const [, setPage] = useQueryState('page')

  const statusOptions = [
    { value: 'alive', label: t('character.filter.status.options.alive') },
    { value: 'dead', label: t('character.filter.status.options.dead') },
    { value: 'unknown', label: t('character.filter.status.options.unknown') },
  ]

  const genderOptions = [
    { value: 'female', label: t('character.filter.gender.options.female') },
    { value: 'male', label: t('character.filter.gender.options.male') },
    { value: 'genderless', label: t('character.filter.gender.options.genderless') },
    { value: 'unknown', label: t('character.filter.gender.options.unknown') },
  ]

  const methods = useForm<FilterFormValues>({
    defaultValues: {
      status: status || '',
      gender: gender || '',
    },
    mode: 'onChange',
  })

  const { watch, reset, setValue } = methods
  const watchedStatus = watch('status')
  const watchedGender = watch('gender')

  useEffect(() => {
    if (watchedStatus !== undefined && watchedStatus !== (status || '')) {
      setStatus(watchedStatus || null)
      setPage(null)
    }
  }, [watchedStatus, setStatus, setPage])

  useEffect(() => {
    if (watchedGender !== undefined && watchedGender !== (gender || '')) {
      setGender(watchedGender || null)
      setPage(null)
    }
  }, [watchedGender, setGender, setPage])

  useEffect(() => {
    // Sync URL to form without triggering dirty state
    if (status !== watchedStatus) {
      setValue('status', status || '', { shouldDirty: false, shouldTouch: false })
    }
    if (gender !== watchedGender) {
      setValue('gender', gender || '', { shouldDirty: false, shouldTouch: false })
    }
  }, [status, gender, setValue])

  const clearFilters = () => {
    reset({ status: '', gender: '' })
    setStatus(null)
    setGender(null)
    setPage(null)
  }

  const hasFilters = !!watchedStatus || !!watchedGender

  return (
    <FormProvider {...methods}>
      <div className='flex flex-wrap items-end gap-4 rounded-lg bg-muted/50 p-4'>
        <div className='w-full sm:w-[200px]'>
          <SelectField
            name='status'
            label={t('character.filter.status.label')}
            options={statusOptions}
            placeholder={t('character.filter.status.placeholder')}
            allowNone
            noneLabel={t('character.filter.status.all')}
          />
        </div>

        <div className='w-full sm:w-[200px]'>
          <SelectField
            name='gender'
            label={t('character.filter.gender.label')}
            options={genderOptions}
            placeholder={t('character.filter.gender.placeholder')}
            allowNone
            noneLabel={t('character.filter.gender.all')}
          />
        </div>

        {hasFilters && (
          <Button variant='ghost' size='sm' onClick={clearFilters} className='mb-2 ml-auto'>
            <X className='mr-2 h-4 w-4' />
            {t('character.filter.clear')}
          </Button>
        )}
      </div>
    </FormProvider>
  )
}
