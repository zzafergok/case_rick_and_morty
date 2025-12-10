import { notFound } from 'next/navigation'

import { fetchEpisode, fetchCharactersByIds } from '@/hooks/useRickAndMorty'
import { EpisodeDetail } from '@/components/features/episode/episode-detail'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EpisodeDetailPage({ params }: PageProps) {
  const { id } = await params

  if (!id || isNaN(parseInt(id))) {
    notFound()
  }

  try {
    // Fetch episode
    const episode = await fetchEpisode(parseInt(id))

    // Extract character IDs from URLs
    const characterIds = episode.characters
      .map((url) => {
        const parts = url.split('/')
        return parseInt(parts[parts.length - 1])
      })
      .filter((id) => !isNaN(id))

    // Fetch characters
    const characters = characterIds.length > 0 ? await fetchCharactersByIds(characterIds) : []

    return <EpisodeDetail episode={episode} characters={characters} />
  } catch (error) {
    console.error(error)
    notFound()
  }
}
