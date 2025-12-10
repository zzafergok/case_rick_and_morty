'use client'

import { AlertCircle } from 'lucide-react'
import { type FieldError, useFormContext } from 'react-hook-form'

import { Label } from '@/components/core/label'
import { Textarea } from '@/components/core/textarea'

import { cn } from '@/lib/utils'

interface TextareaFieldProps {
  name: string
  label: string
  placeholder?: string
  required?: boolean
  description?: string
  className?: string
  disabled?: boolean
  rows?: number
  maxLength?: number
  showCharCount?: boolean
}

export function TextareaField({
  name,
  label,
  placeholder,
  required = false,
  description,
  className,
  disabled,
  rows = 4,
  maxLength,
  showCharCount = false,
}: TextareaFieldProps) {
  const {
    register,
    watch,
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

  // Watch field value for character count
  const fieldValue = watch(name) as string

  const isDisabled = disabled || isSubmitting
  const charCount = fieldValue?.length || 0

  return (
    <div className={cn('space-y-1.5 sm:space-y-2', className)}>
      <div className='flex items-center justify-between'>
        <Label htmlFor={name} className='text-xs sm:text-sm'>
          {label} {required && <span className='text-red-500'>*</span>}
        </Label>
        {showCharCount && maxLength && (
          <span className='text-[10px] text-muted-foreground sm:text-xs'>
            {charCount}/{maxLength}
          </span>
        )}
      </div>
      <Textarea
        id={name}
        placeholder={placeholder}
        disabled={isDisabled}
        rows={rows}
        maxLength={maxLength}
        {...register(name)}
        className={cn('resize-none text-xs sm:text-sm', error && 'border-red-500')}
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
