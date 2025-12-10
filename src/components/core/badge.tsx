'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'warning'
type BadgeSize = 'default' | 'sm' | 'lg'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
  borderColor?: string
  backgroundColor?: string
  textColor?: string
}

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  default: {
    backgroundColor: 'hsl(var(--primary))',
    color: 'hsl(var(--primary-foreground))',
    borderWidth: '0',
  },
  secondary: {
    backgroundColor: 'hsl(var(--secondary))',
    color: 'hsl(var(--secondary-foreground))',
    borderWidth: '0',
  },
  destructive: {
    backgroundColor: 'hsl(var(--destructive))',
    color: 'hsl(var(--destructive-foreground))',
    borderWidth: '0',
  },
  warning: {
    backgroundColor: 'rgb(251 146 60)', // orange-400
    color: 'rgb(255 255 255)', // white
    borderWidth: '0',
  },
  outline: {
    backgroundColor: 'transparent',
    color: 'hsl(var(--foreground))',
    borderColor: 'hsl(var(--border))',
    borderWidth: '1px',
    borderStyle: 'solid',
  },
}

const sizeStyles: Record<BadgeSize, string> = {
  default: 'px-2.5 py-0.5 text-xs',
  sm: 'px-2 py-0.5 text-xs',
  lg: 'px-3 py-1 text-sm',
}

function Badge({
  className,
  variant = 'default',
  size = 'default',
  borderColor,
  backgroundColor,
  textColor,
  style,
  ...props
}: BadgeProps) {
  const combinedStyle: React.CSSProperties = {
    ...variantStyles[variant],
    ...(backgroundColor && { backgroundColor }),
    ...(textColor && { color: textColor }),
    ...(borderColor && {
      borderColor,
      borderWidth: '1px',
      borderStyle: 'solid',
    }),
    ...style,
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-semibold transition-colors focus:outline-none',
        sizeStyles[size],
        'hover:opacity-80',
        className,
      )}
      style={combinedStyle}
      {...props}
    />
  )
}

export { Badge }
