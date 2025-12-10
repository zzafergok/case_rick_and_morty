'use client'

import Link from 'next/link'
import { Trans, useTranslation } from 'react-i18next'

import { Github, Heart } from 'lucide-react'

import { Logo } from '@/components/ui/brand/logo'
import { buttonVariants } from '@/components/core/button-variants'

import { cn } from '@/lib/utils'

export function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className='border-t bg-background/95 backdrop-blur-sm'>
      <div className='container mx-auto py-8 md:py-12'>
        <div className='grid grid-cols-1 gap-8 text-center md:grid-cols-3 md:text-left'>
          {/* Brand & Quote */}
          <div className='space-y-4'>
            <div className='flex items-center justify-center gap-2 md:justify-start'>
              <Logo size='sm' showText={false} imageSrc='/rick_and_morty_logo.jpeg' />
              <h3 className='text-lg font-bold'>Rick and Morty</h3>
            </div>
            <p className='mx-auto max-w-xs text-sm italic text-muted-foreground md:mx-0'>{t('footer.quote')}</p>
          </div>

          {/* Quick Links */}
          <div className='space-y-4'>
            <h4 className='text-sm font-semibold uppercase tracking-wider text-foreground/80'>{t('footer.explore')}</h4>
            <nav className='flex flex-col space-y-2 text-sm text-muted-foreground'>
              <Link href='/character' className='transition-colors hover:text-primary'>
                {t('homePage.modules.characters.title')}
              </Link>
              <Link href='/location' className='transition-colors hover:text-primary'>
                {t('homePage.modules.locations.title')}
              </Link>
              <Link href='/episode' className='transition-colors hover:text-primary'>
                {t('homePage.modules.episodes.title')}
              </Link>
            </nav>
          </div>

          {/* Social */}
          <div className='space-y-4'>
            <h4 className='text-sm font-semibold uppercase tracking-wider text-foreground/80'>{t('footer.connect')}</h4>
            <div className='flex justify-center gap-4 md:justify-start'>
              <Link
                href='https://github.com/zzafergok'
                target='_blank'
                rel='noreferrer'
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'icon' }),
                  'h-10 w-10 rounded-full hover:bg-primary/10 hover:text-primary',
                )}
              >
                <Github className='h-5 w-5' />
                <span className='sr-only'>GitHub</span>
              </Link>
            </div>
          </div>
        </div>

        <div className='mt-8 flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm text-muted-foreground md:flex-row'>
          <p>{t('footer.rights', { year: currentYear })}</p>
          <div className='flex items-center gap-1'>
            <Trans
              i18nKey='footer.madeBy'
              components={{
                heart: <Heart className='h-3 w-3 animate-pulse fill-red-500 text-red-500' />,
                author: (
                  <Link
                    href='https://www.zafergok.dev'
                    target='_blank'
                    className='font-medium underline underline-offset-4 hover:text-foreground'
                  >
                    Zafer Gök
                  </Link>
                ),
              }}
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
