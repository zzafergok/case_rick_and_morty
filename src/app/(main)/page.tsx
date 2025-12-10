'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

import { Card, CardContent } from '@/components/core/card'

const modules = [
  {
    titleKey: 'homePage.modules.characters.title',
    descriptionKey: 'homePage.modules.characters.description',
    image: '/morty.jpeg',
    href: '/character',
  },
  {
    titleKey: 'homePage.modules.locations.title',
    descriptionKey: 'homePage.modules.locations.description',
    image: '/home.jpeg',
    href: '/location',
  },
  {
    titleKey: 'homePage.modules.episodes.title',
    descriptionKey: 'homePage.modules.episodes.description',
    image: '/rick_and_morty_season_one.jpeg',
    href: '/episode',
  },
]

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className='container mx-auto space-y-8 px-4 py-12'>
      <div className='space-y-4 text-center'>
        <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl' suppressHydrationWarning>
          {t('homePage.title')}
        </h1>
        <p className='mx-auto max-w-2xl text-lg text-muted-foreground' suppressHydrationWarning>
          {t('homePage.subtitle')}
        </p>
      </div>

      <div className='mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3'>
        {modules.map((module) => (
          <Link key={module.href} href={module.href} className='group'>
            <Card className='overflow-hidden border-2 border-transparent transition-all group-hover:border-primary/50 group-hover:shadow-lg'>
              <div className='relative aspect-video overflow-hidden sm:aspect-[4/3]'>
                <Image
                  src={module.image}
                  alt={t(module.titleKey)}
                  fill
                  className='object-cover transition-transform duration-500 group-hover:scale-105'
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                />
                <div className='absolute inset-0 flex items-end bg-gradient-to-t from-black/80 to-transparent p-6'>
                  <h2 className='text-2xl font-bold tracking-wide text-white' suppressHydrationWarning>
                    {t(module.titleKey)}
                  </h2>
                </div>
              </div>
              <CardContent className='bg-card p-4'>
                <p className='text-sm text-muted-foreground' suppressHydrationWarning>
                  {t(module.descriptionKey)}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
