'use client'

import React from 'react'

import { QueryClientProvider } from '@tanstack/react-query'

import { getQueryClient } from '@/lib/get-query-client'

interface ReactQueryProviderProps {
  children: React.ReactNode
}

export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  const queryClient = getQueryClient()
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
