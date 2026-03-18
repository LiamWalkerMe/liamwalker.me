export interface ResponsiveImageSource {
  src: string
  width: number
}

export interface ResponsiveImageAsset {
  width: number
  height: number
  fallbackMimeType: string
  sources: {
    avif: ResponsiveImageSource[]
    webp: ResponsiveImageSource[]
    fallback: ResponsiveImageSource[]
  }
}

export function buildResponsiveSrcSet(sources: ResponsiveImageSource[]) {
  return sources.map((source) => `${source.src} ${source.width}w`).join(', ')
}

export function getLargestResponsiveSource(sources: ResponsiveImageSource[]) {
  return sources[sources.length - 1]
}
