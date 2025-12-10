export interface Character {
  id: number
  name: string
  status: 'Alive' | 'Dead' | 'unknown'
  species: string
  type: string
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown'
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: string
  episode: string[]
  url: string
  created: string
}

export interface Info {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

export interface CharacterResponse {
  info: Info
  results: Character[]
}

export interface GetCharactersParams {
  page?: number
  status?: string
  gender?: string
}

export interface Location {
  id: number
  name: string
  type: string
  dimension: string
  residents: string[]
  url: string
  created: string
}

export interface LocationResponse {
  info: Info
  results: Location[]
}

export interface GetLocationsParams {
  page?: number
  name?: string
  type?: string
  dimension?: string
}

export interface Episode {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
  url: string
  created: string
}

export interface EpisodeResponse {
  info: Info
  results: Episode[]
}

export interface GetEpisodesParams {
  page?: number
  name?: string
  episode?: string
}
