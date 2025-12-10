'use client'

import { useTranslation } from 'react-i18next'

import Link from 'next/link'
import { Globe, Users } from 'lucide-react'

import { Card, CardContent, CardHeader } from '@/components/core/card'
import { Badge } from '@/components/core/badge'

import { type Location } from '@/types/rick-and-morty'

interface LocationCardProps {
  location: Location
}

export function LocationCard({ location }: LocationCardProps) {
  const { t } = useTranslation()

  return (
    <Link href={`/location/${location.id}`} className='group block transition-all hover:scale-[1.02]'>
      <Card className='h-full overflow-hidden transition-shadow duration-300 hover:shadow-lg'>
        <CardHeader className='p-4 pb-2'>
          <div className='flex items-start justify-between gap-2'>
            <h3 className='line-clamp-2 text-lg font-bold leading-tight transition-colors group-hover:text-primary'>
              {location.name}
            </h3>
            <Badge variant='outline' className='shrink-0'>
              {location.type}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className='space-y-3 p-4 pt-2'>
          <div className='flex items-center gap-2 text-sm text-muted-foreground'>
            <Globe className='h-4 w-4 shrink-0' />
            <span className='truncate'>{location.dimension}</span>
          </div>

          <div className='flex items-center gap-2 text-sm text-muted-foreground'>
            <Users className='h-4 w-4 shrink-0' />
            <span>
              {location.residents.length} {t('location.card.residents')}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
