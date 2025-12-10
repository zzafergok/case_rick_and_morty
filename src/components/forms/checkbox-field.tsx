'use client'

import { AlertCircle } from 'lucide-react'
import { Controller, type FieldError, useFormContext } from 'react-hook-form'

import { Label } from '@/components/core/label'
import { Checkbox } from '@/components/core/checkbox'

import { cn } from '@/lib/utils'

interface CheckboxFieldProps {
  name: string
  label: React.ReactNode
  description?: string
  className?: string
  disabled?: boolean
  required?: boolean
}

export function CheckboxField({ name, label, description, className, disabled, required = false }: CheckboxFieldProps) {
  const {
    control,
    formState: { errors, isSubmitting },
  } = useFormContext()

  // Get nested error if field name contains dots
  const getNestedError = (fieldName: string): FieldError | undefined => {
    const keys = fieldName.split('.')
    let current: unknown = errors

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = (current as Record<string, unknown>)[key]
      } else {
        return undefined
      }
    }

    return current as FieldError | undefined
  }

  const error = getNestedError(name)

  const isDisabled = disabled || isSubmitting

  return (
    <div className={cn('space-y-1.5 sm:space-y-2', className)}>
      <div className='flex items-center space-x-2 sm:space-x-3'>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Checkbox
              id={name}
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={isDisabled}
              className={cn(error && 'border-red-500')}
            />
          )}
        />
        <div className='flex-1 space-y-1'>
          <Label
            htmlFor={name}
            className={cn(
              'cursor-pointer text-xs font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sm:text-sm',
            )}
          >
            {label} {required && <span className='text-red-500'>*</span>}
          </Label>
          {description && !error && <p className='text-[10px] text-muted-foreground sm:text-xs'>{description}</p>}
          {error && (
            <p className='flex items-center gap-1 text-[10px] text-red-500 sm:text-xs'>
              <AlertCircle className='h-3 w-3' />
              {error.message as string}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
