import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { fetchCharacter } from '@/hooks/useRickAndMorty'
import { CharacterDetail } from '@/components/features/character/character-detail'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  try {
    const character = await fetchCharacter(parseInt(id))
    return {
      title: `${character.name} - Rick and Morty Directory`,
      description: `View details for ${character.name}, a ${character.species} from ${character.origin.name}.`,
    }
  } catch {
    return {
      title: 'Character Not Found',
    }
  }
}

export default async function Page({ params }: PageProps) {
  const { id } = await params

  try {
    const character = await fetchCharacter(parseInt(id))
    return <CharacterDetail character={character} />
  } catch {
    notFound()
  }
}
