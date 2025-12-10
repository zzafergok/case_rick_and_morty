import { useQuery } from '@tanstack/react-query'
import { keepPreviousData } from '@tanstack/react-query'

import type {
  Character,
  CharacterResponse,
  Episode,
  EpisodeResponse,
  GetCharactersParams,
  GetEpisodesParams,
  GetLocationsParams,
  Location,
  LocationResponse,
} from '@/types/rick-and-morty'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

// ============================================================================
// Fetch Functions - Can be used by both hooks and server components
// ============================================================================

/**
 * Fetch paginated characters with filters
 */
export async function fetchCharacters(params: GetCharactersParams): Promise<CharacterResponse> {
  const searchParams = new URLSearchParams()
  searchParams.append('page', params.page?.toString() || '1')
  if (params.status) {
    searchParams.append('status', params.status)
  }
  if (params.gender) {
    searchParams.append('gender', params.gender)
  }

  const response = await fetch(`${API_BASE_URL}/character/?${searchParams.toString()}`)

  if (!response.ok) {
    if (response.status === 404) {
      return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] }
    }
    throw new Error('Failed to fetch characters')
  }

  return response.json()
}

/**
 * Fetch a single character by ID
 */
export async function fetchCharacter(id: number): Promise<Character> {
  const response = await fetch(`${API_BASE_URL}/character/${id}`)

  if (!response.ok) {
    throw new Error('Failed to fetch character')
  }

  return response.json()
}

/**
 * Fetch paginated locations with filters
 */
export async function fetchLocations(params: GetLocationsParams): Promise<LocationResponse> {
  const searchParams = new URLSearchParams()
  searchParams.append('page', params.page?.toString() || '1')
  if (params.name) {
    searchParams.append('name', params.name)
  }
  if (params.type) {
    searchParams.append('type', params.type)
  }
  if (params.dimension) {
    searchParams.append('dimension', params.dimension)
  }

  const response = await fetch(`${API_BASE_URL}/location/?${searchParams.toString()}`)

  if (!response.ok) {
    if (response.status === 404) {
      return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] }
    }
    throw new Error('Failed to fetch locations')
  }

  return response.json()
}

/**
 * Fetch a single location by ID
 */
export async function fetchLocation(id: number): Promise<Location> {
  const response = await fetch(`${API_BASE_URL}/location/${id}`)

  if (!response.ok) {
    throw new Error('Failed to fetch location')
  }

  return response.json()
}

/**
 * Fetch paginated episodes with filters
 */
export async function fetchEpisodes(params: GetEpisodesParams): Promise<EpisodeResponse> {
  const searchParams = new URLSearchParams()
  searchParams.append('page', params.page?.toString() || '1')
  if (params.name) {
    searchParams.append('name', params.name)
  }
  if (params.episode) {
    searchParams.append('episode', params.episode)
  }

  const response = await fetch(`${API_BASE_URL}/episode/?${searchParams.toString()}`)

  if (!response.ok) {
    if (response.status === 404) {
      return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] }
    }
    throw new Error('Failed to fetch episodes')
  }

  return response.json()
}

/**
 * Fetch a single episode by ID
 */
export async function fetchEpisode(id: number): Promise<Episode> {
  const response = await fetch(`${API_BASE_URL}/episode/${id}`)

  if (!response.ok) {
    throw new Error('Failed to fetch episode')
  }

  return response.json()
}

/**
 * Fetch multiple characters by their IDs
 */
export async function fetchCharactersByIds(ids: number[]): Promise<Character[]> {
  if (ids.length === 0) {
    return []
  }

  const response = await fetch(`${API_BASE_URL}/character/${ids.join(',')}`)

  if (!response.ok) {
    throw new Error('Failed to fetch characters')
  }

  // API returns a single object if only one ID is requested, or an array if multiple
  const data = await response.json()
  return Array.isArray(data) ? data : [data]
}

// ============================================================================
// React Query Hooks - Use the fetch functions above
// ============================================================================

/**
 * React Query hook for fetching paginated characters with filters
 * @param params - Query parameters (page, status, gender)
 * @returns React Query result with character data
 */
export function useCharacters(params: GetCharactersParams) {
  return useQuery({
    queryKey: ['characters', params],
    queryFn: () => fetchCharacters(params),
    placeholderData: keepPreviousData,
  })
}

/**
 * React Query hook for fetching a single character by ID
 * @param id - Character ID
 * @returns React Query result with character data
 */
export function useCharacter(id: number) {
  return useQuery({
    queryKey: ['character', id],
    queryFn: () => fetchCharacter(id),
    enabled: !!id,
  })
}

/**
 * React Query hook for fetching paginated locations with filters
 * @param params - Query parameters (page, name, type, dimension)
 * @returns React Query result with location data
 */
export function useLocations(params: GetLocationsParams) {
  return useQuery({
    queryKey: ['locations', params],
    queryFn: () => fetchLocations(params),
    placeholderData: keepPreviousData,
  })
}

/**
 * React Query hook for fetching a single location by ID
 * @param id - Location ID
 * @returns React Query result with location data
 */
export function useLocation(id: number) {
  return useQuery({
    queryKey: ['location', id],
    queryFn: () => fetchLocation(id),
    enabled: !!id,
  })
}

/**
 * React Query hook for fetching paginated episodes with filters
 * @param params - Query parameters (page, name, episode)
 * @returns React Query result with episode data
 */
export function useEpisodes(params: GetEpisodesParams) {
  return useQuery({
    queryKey: ['episodes', params],
    queryFn: () => fetchEpisodes(params),
    placeholderData: keepPreviousData,
  })
}

/**
 * React Query hook for fetching a single episode by ID
 * @param id - Episode ID
 * @returns React Query result with episode data
 */
export function useEpisode(id: number) {
  return useQuery({
    queryKey: ['episode', id],
    queryFn: () => fetchEpisode(id),
    enabled: !!id,
  })
}

/**
 * React Query hook for fetching multiple characters by their IDs
 * @param ids - Array of character IDs
 * @returns React Query result with characters data
 */
export function useCharactersByIds(ids: number[]) {
  return useQuery({
    queryKey: ['characters', 'byIds', ids],
    queryFn: () => fetchCharactersByIds(ids),
    enabled: ids.length > 0,
  })
}
