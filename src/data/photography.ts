import photographyConfig from './photography.collections.json'

export type PhotoLayoutToken = 'single' | 'stack'

export type PhotoSection = {
  enabled?: boolean
  title: string
  locations?: string
  note?: string
  layout?: PhotoLayoutToken[]
  images: string[]
}

type PhotographyConfig = {
  collections: PhotoSection[]
}

const config = photographyConfig as PhotographyConfig

export const photoSections = config.collections.filter((section) => section.enabled !== false)
