'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useTranslation } from 'react-i18next'
import { ArrowLeft, Home } from 'lucide-react'

import { Button } from '@/components/core/button'

export default function NotFound() {
  const router = useRouter()
  const { t } = useTranslation()

  return (
    <div className='flex min-h-screen items-center justify-center bg-zinc-950 px-4'>
      <div className='w-full max-w-2xl space-y-8 text-center'>
        {/* 404 Visual */}
        <div className='relative h-[60vh] w-full overflow-hidden rounded-3xl border border-zinc-800 bg-black shadow-2xl shadow-green-500/20'>
          <Image
            src='/not_found.jpeg'
            alt='Lost in the multiverse'
            fill
            className='object-cover transition-transform duration-700 hover:scale-105'
            sizes='(max-width: 768px) 100vw, 800px'
            priority
          />
          <div className='absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-transparent' />

          <div className='absolute left-0 right-0 top-0 p-8'>
            <h1 className='font-creepster mb-2 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-6xl font-black text-transparent drop-shadow-lg md:text-8xl'>
              404
            </h1>
            <p className='text-sm font-medium uppercase tracking-wide text-zinc-400 md:text-base'>
              {t('notFound.dimensionNotFound')}
            </p>
          </div>
        </div>

        {/* Message */}
        <div className='mx-auto max-w-lg space-y-4'>
          <h2 className='text-2xl font-bold text-white md:text-3xl'>{t('notFound.title')}</h2>
          <p className='text-lg leading-relaxed text-zinc-400'>{t('notFound.description')}</p>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
          <Button
            onClick={() => router.push('/')}
            className='h-12 rounded-full bg-green-500 px-8 text-lg font-bold text-zinc-950 transition-all hover:scale-105 hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/25'
          >
            <Home className='mr-2 h-5 w-5' />
            {t('notFound.backHome')}
          </Button>
          <Button
            variant='outline'
            onClick={() => router.back()}
            className='h-12 rounded-full border-zinc-800 px-8 text-zinc-300 transition-all hover:scale-105 hover:bg-zinc-900 hover:text-white'
          >
            <ArrowLeft className='mr-2 h-5 w-5' />
            {t('notFound.goBack')}
          </Button>
        </div>
      </div>
    </div>
  )
}
