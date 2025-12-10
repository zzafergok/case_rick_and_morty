'use client'

import { useTheme as useNextTheme } from 'next-themes'
import { useCallback, useEffect, useState } from 'react'

export function useTheme() {
  const { theme, setTheme, resolvedTheme } = useNextTheme()
  const [mounted, setMounted] = useState(false)

  // Hydration shim
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }, [setTheme, resolvedTheme])

  return {
    theme: theme as 'light' | 'dark',
    setTheme,
    toggleTheme,
    isInitialized: mounted,
    isTransitioning: false, // Shim
    isDark: resolvedTheme === 'dark',
    isLight: resolvedTheme === 'light',
  }
}
