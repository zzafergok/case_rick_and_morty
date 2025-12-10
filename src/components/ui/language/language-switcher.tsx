'use client'

import { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { Globe, Languages } from 'lucide-react'

import { Button } from '@/components/core/button'

import { getCurrentLanguage, updateLanguageCookies } from '@/lib/i18n'

import { cn } from '@/lib/utils'

interface LanguageSwitcherProps {
  showLabel?: boolean
  className?: string
  variant?: 'button' | 'toggle'
  size?: 'sm' | 'default' | 'lg'
}

export function LanguageSwitcher({
  className,
  size = 'default',
  variant = 'toggle',
  showLabel = false,
}: LanguageSwitcherProps) {
  const { t, i18n } = useTranslation()

  const [mounted, setMounted] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState(getCurrentLanguage())

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleLanguageChanged = () => {
      setCurrentLanguage(i18n.language)
      setIsTransitioning(false)
    }

    i18n.on('languageChanged', handleLanguageChanged)
    return () => {
      i18n.off('languageChanged', handleLanguageChanged)
    }
  }, [i18n])

  const handleLanguageToggle = async () => {
    const newLanguage = currentLanguage === 'tr' ? 'en' : 'tr'

    if (isTransitioning) {
      return
    }

    setIsTransitioning(true)
    try {
      // 1. Update i18n instance (immediate UI feedback)
      await i18n.changeLanguage(newLanguage)

      // 2. Update persistence (cookies, local storage)
      updateLanguageCookies(newLanguage)

      // 3. Update local state
      setCurrentLanguage(newLanguage)

      // 4. Refresh router to sync server components (optional but good for consistency)
      // router.refresh()

      setIsTransitioning(false)
    } catch (error) {
      console.error('Language change failed:', error)
      setIsTransitioning(false)
    }
  }

  if (!mounted) {
    return (
      <Button variant='ghost' size={size} className={cn('pointer-events-none opacity-50', className)} disabled>
        <Languages className='h-4 w-4' />
        {showLabel && <span className='ml-2'>{t('language.title')}</span>}
      </Button>
    )
  }

  const languageDataMap = {
    tr: {
      label: t('language.turkish.title'),
      native: t('language.turkish.native'),
      flag: '🇹🇷',
      icon: Languages,
    },
    en: {
      label: t('language.english.title'),
      native: t('language.english.native'),
      flag: '🇺🇸',
      icon: Globe,
    },
  }

  const currentLanguageData = languageDataMap[currentLanguage as keyof typeof languageDataMap] || languageDataMap.en

  const nextLanguage = currentLanguage === 'tr' ? 'en' : 'tr'
  const nextLanguageData = languageDataMap[nextLanguage as keyof typeof languageDataMap] || languageDataMap.en

  if (variant === 'button') {
    return (
      <Button
        variant='ghost'
        size={size}
        onClick={handleLanguageToggle}
        disabled={isTransitioning}
        className={cn('transition-all duration-200', isTransitioning && 'pointer-events-none opacity-75', className)}
        aria-label={t('language.switchTo', { language: nextLanguageData.label })}
      >
        <span className='mr-2 text-base'>{currentLanguageData.flag}</span>
        {showLabel && <span className='ml-1'>{currentLanguageData.native}</span>}
      </Button>
    )
  }

  return (
    <Button
      variant='ghost'
      size={size}
      onClick={handleLanguageToggle}
      disabled={isTransitioning}
      className={cn('relative transition-all duration-200', isTransitioning && 'pointer-events-none', className)}
      aria-label={t('language.switchTo', { language: nextLanguageData.label })}
    >
      <div className='relative flex items-center'>
        <span
          className={cn(
            'text-base transition-all duration-300',
            isTransitioning ? 'scale-75 opacity-50' : 'scale-100 opacity-100',
          )}
        >
          {currentLanguageData.flag}
        </span>
        {isTransitioning && (
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='h-3 w-3 animate-spin rounded-full border border-primary border-t-transparent' />
          </div>
        )}
      </div>
      {showLabel && <span className='ml-2 font-medium'>{currentLanguageData.native}</span>}
    </Button>
  )
}
