import type { Metadata, Viewport } from 'next'
import { cookies } from 'next/headers'

import React from 'react'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import { ThemeProvider } from '@/providers/theme-provider'
import { ReactQueryProvider } from '@/providers/ReactQueryProvider'

import { DisableDevTools } from '@/components/security/disable-devtools'

import './globals.css'

function I18nWrapper({ children, locale }: { children: React.ReactNode; locale: string }) {
  try {
    const I18nProviderModule = require('@/providers/I18nProvider')
    const I18nProvider = I18nProviderModule.default || I18nProviderModule.I18nProvider
    return React.createElement(I18nProvider, { locale }, children)
  } catch {
    return <>{children}</>
  }
}

export const metadata: Metadata = {
  title: {
    default: 'Rick and Morty',
    template: '%s | Rick and Morty',
  },
  description: 'Rick and Morty API based application',
  keywords: ['React', 'Next.js', 'UI Kit', 'Components', 'TypeScript', 'Tailwind CSS'],
  authors: [{ name: 'Zafer Gök', url: 'https://github.com/zzafergok' }],
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: 'light dark',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const cookieStore = await cookies()
  const language = cookieStore.get('language')?.value || 'tr'

  return (
    <html lang={language} suppressHydrationWarning>
      <body className='bg-background text-foreground antialiased'>
        <ReactQueryProvider>
          <NuqsAdapter>
            <ThemeProvider>
              <I18nWrapper locale={language}>
                <DisableDevTools />
                {children}
              </I18nWrapper>
            </ThemeProvider>
          </NuqsAdapter>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
