'use client'

import { useMemo } from 'react'

import { I18nextProvider, initReactI18next } from 'react-i18next'
import i18n from 'i18next'

import { resources } from '@/lib/i18n'

interface I18nProviderProps {
  children: React.ReactNode
  locale?: string
}

export default function I18nProvider({ children, locale }: I18nProviderProps) {
  const i18nInstance = useMemo(() => {
    const instance = i18n.createInstance()
    instance.use(initReactI18next).init({
      resources,
      lng: locale || 'tr',
      fallbackLng: 'en',
      supportedLngs: ['tr', 'en'],
      defaultNS: 'translation',
      fallbackNS: 'translation',
      ns: ['translation'],
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['cookie', 'htmlTag', 'localStorage', 'navigator'],
        caches: ['cookie'],
      },
    })
    return instance
  }, [locale])

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>
}
