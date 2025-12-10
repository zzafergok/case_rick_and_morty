'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'

import * as React from 'react'

import { Map, Menu, Tv, Users, X } from 'lucide-react'

import { Button } from '@/components/core/button'
import { Logo } from '@/components/ui/brand/logo'
import { ThemeToggle } from '@/components/ui/theme/theme-toggle'
import { LanguageSwitcher } from '@/components/ui/language/language-switcher'

import { cn } from '@/lib/utils'

export function Header() {
  const { t } = useTranslation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: t('homePage.modules.characters.title'), href: '/character', icon: Users },
    { name: t('homePage.modules.locations.title'), href: '/location', icon: Map },
    { name: t('homePage.modules.episodes.title'), href: '/episode', icon: Tv },
  ]

  React.useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto px-4'>
        <div className='flex h-16 items-center justify-between'>
          {/* Logo */}
          <Link href='/' className='group flex items-center gap-2 text-xl font-bold'>
            <Logo
              imageSrc='/rick_and_morty_logo.jpeg'
              showText={false}
              size='md'
              className='transition-opacity group-hover:opacity-80'
            />
            <span className='hidden tracking-tight sm:inline-block'>
              Rick and Morty <span className='text-primary'></span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden items-center gap-6 md:flex'>
            {navigation.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary',
                    isActive ? 'text-foreground' : 'text-muted-foreground',
                  )}
                >
                  <item.icon className='h-4 w-4' />
                  <span suppressHydrationWarning>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Actions */}
          <div className='flex items-center gap-2'>
            <LanguageSwitcher />
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <Button
              variant='ghost'
              size='icon'
              className='md:hidden'
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='animate-in slide-in-from-top-2 border-t bg-background/95 backdrop-blur-sm md:hidden'>
          <div className='container mx-auto space-y-4 px-4 py-4'>
            {navigation.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  )}
                >
                  <item.icon className='h-5 w-5' />
                  <span suppressHydrationWarning>{item.name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
