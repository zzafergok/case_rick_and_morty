import type * as React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  fullWidth?: boolean
  loading?: boolean
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
