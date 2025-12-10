'use client'

import * as React from 'react'
import { AlertCircle } from 'lucide-react'
import { Controller, type FieldError, useFormContext } from 'react-hook-form'

import { Label } from '@/components/core/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/core/select'

import { cn } from '@/lib/utils'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface SelectFieldProps {
  name: string
  label: string
  options: SelectOption[]
  placeholder?: string
  required?: boolean
  description?: string
  className?: string
  disabled?: boolean
  allowNone?: boolean
  noneLabel?: string
}

export function SelectField({
  name,
  label,
  options,
  placeholder = 'Select...',
  required = false,
  description,
  className,
  disabled,
  allowNone = false,
  noneLabel = 'None',
}: SelectFieldProps) {
  const {
    control,
    formState: { errors, isSubmitting },
  } = useFormContext()

  // Get nested error if field name contains dots (e.g., "settings.defaultProjectType")
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
      <Label htmlFor={name} className='text-xs sm:text-sm'>
        {label} {required && <span className='text-red-500'>*</span>}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          // Memoize the change handler to prevent re-renders
          const handleValueChange = (value: string) => {
            const currentValue = field.value ? String(field.value) : allowNone ? 'none' : ''

            // Prevent infinite loop by checking if value actually changed
            if (value === currentValue) {
              return
            }

            if (value === 'none' && allowNone) {
              field.onChange(null)
            } else {
              field.onChange(value)
            }
          }

          // Compute value once
          const selectValue = field.value ? String(field.value) : allowNone ? 'none' : ''

          return (
            <Select value={selectValue} onValueChange={handleValueChange} disabled={isDisabled}>
              <SelectTrigger id={name} className={cn('text-xs sm:text-sm', error && 'border-red-500')}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {allowNone && (
                  <SelectItem value='none' className='text-xs sm:text-sm'>
                    {noneLabel}
                  </SelectItem>
                )}
                {options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    className='text-xs sm:text-sm'
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )
        }}
      />
      {description && !error && <p className='text-[10px] text-muted-foreground sm:text-xs'>{description}</p>}
      {error && (
        <p className='flex items-center gap-1 text-[10px] text-red-500 sm:text-xs'>
          <AlertCircle className='h-3 w-3' />
          {error.message as string}
        </p>
      )}
    </div>
  )
}
