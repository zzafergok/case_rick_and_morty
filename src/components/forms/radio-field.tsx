'use client'

import { AlertCircle } from 'lucide-react'
import { Controller, type FieldError, useFormContext } from 'react-hook-form'

import { Label } from '@/components/core/label'

import { cn } from '@/lib/utils'

export interface RadioOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

interface RadioFieldProps {
  name: string
  label: string
  options: RadioOption[]
  required?: boolean
  description?: string
  className?: string
  disabled?: boolean
  orientation?: 'vertical' | 'horizontal'
}

export function RadioField({
  name,
  label,
  options,
  required = false,
  description,
  className,
  disabled,
  orientation = 'vertical',
}: RadioFieldProps) {
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
      <Label className='text-xs sm:text-sm'>
        {label} {required && <span className='text-red-500'>*</span>}
      </Label>
      {description && !error && <p className='text-[10px] text-muted-foreground sm:text-xs'>{description}</p>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div
            className={cn(
              orientation === 'horizontal' ? 'flex flex-wrap gap-4' : 'space-y-2',
              error && 'border-red-500',
            )}
          >
            {options.map((option) => (
              <div key={option.value} className='flex items-start space-x-2 sm:space-x-3'>
                <input
                  type='radio'
                  id={`${name}-${option.value}`}
                  value={option.value}
                  checked={field.value === option.value}
                  onChange={() => field.onChange(option.value)}
                  disabled={option.disabled || isDisabled}
                  className='mt-0.5 h-4 w-4 text-primary disabled:cursor-not-allowed disabled:opacity-50'
                />
                <div className='flex-1 space-y-1'>
                  <Label
                    htmlFor={`${name}-${option.value}`}
                    className={cn(
                      'cursor-pointer text-xs font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sm:text-sm',
                    )}
                  >
                    {option.label}
                  </Label>
                  {option.description && (
                    <p className='text-[10px] text-muted-foreground sm:text-xs'>{option.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      />
      {error && (
        <p className='flex items-center gap-1 text-[10px] text-red-500 sm:text-xs'>
          <AlertCircle className='h-3 w-3' />
          {error.message as string}
        </p>
      )}
    </div>
  )
}
