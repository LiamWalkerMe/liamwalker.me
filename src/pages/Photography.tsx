import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Maximize2 } from 'lucide-react'
import Lightbox from '../components/Lightbox'
import { photoSections, type PhotoLayoutToken } from '../data/photography'
import { homePhotographyImageAssets } from '../generated/homePhotographyImages'

type GalleryImage = {
  originalSrc: string
  displaySrc: string
  width?: number
  height?: number
  orientation: 'portrait' | 'landscape'
}
type Tile = { images: GalleryImage[] }
type RailMetric = {
  overflow: number
  scrollSpan: number
  stickyHeight: number
  tileCenterProgresses: number[]
}

const defaultRailPattern = [1, 2, 1, 1]
const priorityImageCount = 8
const layoutTokenSizes: Record<PhotoLayoutToken, number> = {
  single: 1,
  stack: 2,
}
const pinnedLayoutQuery = '(min-width: 860px) and (prefers-reduced-motion: no-preference)'
const tileRevealFocus = 0.74
const tileRevealDuration = 0.18
const openingTileRevealDuration = 0.06
const optimizedImageByOriginalSrc = new Map<string, (typeof homePhotographyImageAssets)[number]>(
  homePhotographyImageAssets.map((asset) => [asset.originalSrc, asset])
)

function getGalleryImage(src: string): GalleryImage {
  const optimizedImage = optimizedImageByOriginalSrc.get(src)
  const width = optimizedImage?.width
  const height = optimizedImage?.height

  return {
    originalSrc: src,
    displaySrc: optimizedImage?.thumbSrc ?? src,
    width,
    height,
    orientation: optimizedImage?.orientation ?? (height && width && height > width ? 'portrait' : 'landscape'),
  }
}

function buildTilesWithPattern(images: GalleryImage[], pattern: number[]): Tile[] {
  const tiles: Tile[] = []
  let i = 0
  while (i < images.length) {
    for (const size of pattern) {
      if (i >= images.length) break
      tiles.push({ images: images.slice(i, i + size) })
      i += size
    }
  }
  return tiles
}

function getLayoutPattern(layout?: PhotoLayoutToken[]): number[] {
  const pattern = layout?.map((token) => layoutTokenSizes[token]).filter(Boolean) ?? []
  return pattern.length ? pattern : defaultRailPattern
}

function buildTilesFromLayout(images: GalleryImage[], layout?: PhotoLayoutToken[]): Tile[] {
  return buildTilesWithPattern(images, getLayoutPattern(layout))
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function easeInOutCubic(value: number) {
  return value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2
}

function toSectionId(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function PhotographyFrame({
  src,
  alt,
  ariaLabel,
  isPriority,
  width,
  height,
  orientation,
  onOpen,
}: {
  src: string
  alt: string
  ariaLabel: string
  isPriority: boolean
  width?: number
  height?: number
  orientation: GalleryImage['orientation']
  onOpen: () => void
}) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <button
      type="button"
      className={`photography-rail-frame photography-rail-frame--${orientation} ${isLoaded ? 'is-loaded' : ''}`}
      onClick={onOpen}
      aria-label={ariaLabel}
    >
      <span className="photography-rail-frame__loader" aria-hidden="true">
        Developing
      </span>
      <img
        src={src}
        alt={alt}
        loading={isPriority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={isPriority ? 'high' : 'auto'}
        width={width}
        height={height}
        data-skip-image-fade="true"
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
      />
      <span className="photography-rail-frame__icon" aria-hidden="true">
        <Maximize2 size={16} />
      </span>
    </button>
  )
}

export default function Photography() {
  const gallerySections = useMemo(
    () =>
      photoSections.map((section) => {
        const images = section.images.map(getGalleryImage)
        const tiles = buildTilesFromLayout(images, section.layout)

        return {
          id: toSectionId(section.title),
          title: section.title,
          locations: section.locations ?? '',
          note: section.note ?? '',
          images,
          imageCount: tiles.reduce((total, tile) => total + tile.images.length, 0),
          tiles,
        }
      }),
    []
  )
  const priorityImageSources = useMemo(
    () => gallerySections.flatMap((section) => section.images.map((image) => image.displaySrc)).slice(0, priorityImageCount),
    [gallerySections]
  )

  const [sectionMetrics, setSectionMetrics] = useState<RailMetric[]>(() =>
    gallerySections.map(() => ({ overflow: 0, scrollSpan: 0, stickyHeight: 0, tileCenterProgresses: [] }))
  )
  const [isPinnedLayout, setIsPinnedLayout] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null)
  const sectionRefs = useRef<Array<HTMLElement | null>>([])
  const stickyRefs = useRef<Array<HTMLDivElement | null>>([])
  const copyRefs = useRef<Array<HTMLDivElement | null>>([])
  const viewportRefs = useRef<Array<HTMLDivElement | null>>([])
  const railRefs = useRef<Array<HTMLDivElement | null>>([])
  const tileRefs = useRef<Array<Array<HTMLElement | null>>>([])
  const revealProgressesRef = useRef<number[]>(gallerySections.map(() => 0))

  useEffect(() => {
    priorityImageSources.forEach((src) => {
      const image = new Image()
      image.decoding = 'async'
      image.src = src
    })
  }, [priorityImageSources])

  useEffect(() => {
    const mediaQuery = window.matchMedia(pinnedLayoutQuery)

    const syncPinnedLayout = () => {
      setIsPinnedLayout(mediaQuery.matches)
    }

    syncPinnedLayout()
    mediaQuery.addEventListener('change', syncPinnedLayout)

    return () => {
      mediaQuery.removeEventListener('change', syncPinnedLayout)
    }
  }, [])

  useLayoutEffect(() => {
    if (!isPinnedLayout) {
      setSectionMetrics(gallerySections.map(() => ({ overflow: 0, scrollSpan: 0, stickyHeight: 0, tileCenterProgresses: [] })))
      return undefined
    }

    const measure = () => {
      const viewportHeight = window.innerHeight || 0
      const nextMetrics = gallerySections.map((_, sectionIndex) => {
        const sticky = stickyRefs.current[sectionIndex]
        const viewport = viewportRefs.current[sectionIndex]
        const rail = railRefs.current[sectionIndex]

        if (!sticky || !viewport || !rail) {
          return { overflow: 0, scrollSpan: 0, stickyHeight: 0, tileCenterProgresses: [] }
        }

        const overflow = Math.max(0, rail.scrollWidth - viewport.clientWidth)
        const stickyHeight = Math.max(sticky.offsetHeight, viewportHeight)
        const revealBuffer = Math.max(40, Math.round(viewport.clientWidth * 0.05))
        const revealTargetX = viewport.clientWidth * tileRevealFocus
        const tileCenterProgresses = (tileRefs.current[sectionIndex] ?? []).map((tile) => {
          if (!tile || overflow <= 0) {
            return 0
          }

          const tileCenter = tile.offsetLeft + tile.offsetWidth / 2
          return clamp((tileCenter - revealTargetX) / overflow, 0, 1)
        })

        return {
          overflow,
          scrollSpan: Math.max(overflow + revealBuffer, viewportHeight * 0.42),
          stickyHeight,
          tileCenterProgresses,
        }
      })

      setSectionMetrics((previousMetrics) => {
        const hasChanged =
          previousMetrics.length !== nextMetrics.length ||
          previousMetrics.some((metric, sectionIndex) => {
            const nextMetric = nextMetrics[sectionIndex]
            return (
              Math.abs(metric.overflow - nextMetric.overflow) > 1 ||
              Math.abs(metric.scrollSpan - nextMetric.scrollSpan) > 1 ||
              Math.abs(metric.stickyHeight - nextMetric.stickyHeight) > 1 ||
              metric.tileCenterProgresses.length !== nextMetric.tileCenterProgresses.length ||
              metric.tileCenterProgresses.some(
                (value, tileIndex) => Math.abs(value - nextMetric.tileCenterProgresses[tileIndex]) > 0.002
              )
            )
          })

        return hasChanged ? nextMetrics : previousMetrics
      })
    }

    const resizeObserver = new ResizeObserver(() => {
      measure()
    })

    stickyRefs.current.forEach((sticky) => {
      if (sticky) {
        resizeObserver.observe(sticky)
      }
    })

    viewportRefs.current.forEach((viewport) => {
      if (viewport) {
        resizeObserver.observe(viewport)
      }
    })

    railRefs.current.forEach((rail) => {
      if (rail) {
        resizeObserver.observe(rail)
      }
    })

    measure()

    return () => {
      resizeObserver.disconnect()
    }
  }, [gallerySections, isPinnedLayout])

  useEffect(() => {
    const resetGalleryMotionStyles = () => {
      railRefs.current.forEach((rail) => {
        if (rail) {
          rail.style.transform = ''
        }
      })

      copyRefs.current.forEach((copy) => {
        if (copy) {
          copy.style.opacity = ''
          copy.style.transform = ''
        }
      })

      tileRefs.current.forEach((tiles) => {
        tiles?.forEach((tile) => {
          if (tile) {
            tile.style.opacity = ''
            tile.style.transform = ''
          }
        })
      })
    }

    if (!isPinnedLayout) {
      revealProgressesRef.current = gallerySections.map(() => 0)
      resetGalleryMotionStyles()
      return undefined
    }

    let frameId = 0

    const updateProgress = () => {
      gallerySections.forEach((_, sectionIndex) => {
        const section = sectionRefs.current[sectionIndex]
        const metric = sectionMetrics[sectionIndex]
        const scrollSpan = metric?.scrollSpan ?? 0

        if (!section || scrollSpan <= 0) {
          return
        }

        const { top } = section.getBoundingClientRect()
        const progress = clamp(-top / scrollSpan, 0, 1)
        const revealProgress = Math.max(revealProgressesRef.current[sectionIndex] ?? 0, progress)
        revealProgressesRef.current[sectionIndex] = revealProgress

        const rail = railRefs.current[sectionIndex]
        if (rail) {
          rail.style.transform = `translate3d(${-metric.overflow * easeInOutCubic(progress)}px, 0, 0)`
        }

        const copy = copyRefs.current[sectionIndex]
        if (copy) {
          const copyReveal = clamp(progress / 0.18, 0, 1)
          copy.style.opacity = String(0.42 + copyReveal * 0.58)
          copy.style.transform = `translate3d(0, ${Math.round((1 - copyReveal) * 32)}px, 0)`
        }

        const easedRevealProgress = easeInOutCubic(revealProgress)
        const tiles = tileRefs.current[sectionIndex] ?? []

        tiles.forEach((tile, tileIndex) => {
          if (!tile) {
            return
          }

          const tileCenterProgress = metric.tileCenterProgresses[tileIndex] ?? 0
          const revealDuration = tileCenterProgress <= 0 ? openingTileRevealDuration : tileRevealDuration
          const tileRevealProgress = tileCenterProgress <= 0 ? revealProgress : easedRevealProgress
          const tileRevealStart = Math.max(0, tileCenterProgress - revealDuration)
          const tileReveal = clamp((tileRevealProgress - tileRevealStart) / revealDuration, 0, 1)

          tile.style.opacity = String(0.18 + tileReveal * 0.82)
          tile.style.transform = `translate3d(0, ${Math.round((1 - tileReveal) * 42)}px, 0) scale(${0.9 + tileReveal * 0.1})`
        })
      })

      frameId = 0
    }

    const scheduleUpdate = () => {
      if (frameId !== 0) {
        return
      }

      frameId = window.requestAnimationFrame(updateProgress)
    }

    updateProgress()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)

      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId)
      }

      resetGalleryMotionStyles()
    }
  }, [gallerySections, isPinnedLayout, sectionMetrics])

  return (
    <div className="photography-page">
      <section className="photography-hero page-hero-under-header">
        <div className="container photography-hero__inner fade-in">
          <span className="photography-hero__eyebrow">My Creative Outlet</span>
          <h1 className="photography-hero__title">
            <span className="photography-hero__title-text">Photography</span>
          </h1>
          <p className="photography-hero__lede">
            A scroll-driven collection of favorite frames from recent trips. Each section is built around a different location.
          </p>
          <div className="photography-hero__actions">
            <span className="photography-hero__hint">Scroll to move through each collection</span>
          </div>
        </div>
      </section>

      <div id="photo-galleries" className="photography-page__sections">
        {gallerySections.map((section, sectionIndex) => {
          const metric = sectionMetrics[sectionIndex] ?? {
            overflow: 0,
            scrollSpan: 0,
            stickyHeight: 0,
            tileCenterProgresses: [],
          }
          const imagesBeforeSection = gallerySections
            .slice(0, sectionIndex)
            .reduce((total, gallerySection) => total + gallerySection.imageCount, 0)

          return (
            <section
              key={section.title}
              id={section.id}
              ref={(node) => {
                sectionRefs.current[sectionIndex] = node
              }}
              className="photography-rail-section"
              style={
                isPinnedLayout ? { height: `${Math.round(metric.stickyHeight + metric.scrollSpan)}px` } : undefined
              }
            >
              <div
                className="photography-rail-section__sticky"
                ref={(node) => {
                  stickyRefs.current[sectionIndex] = node
                }}
              >
                <div className="photography-rail-section__panel">
                  <div className="photography-rail-section__content">
                    <div
                      className="photography-rail-section__copy"
                      ref={(node) => {
                        copyRefs.current[sectionIndex] = node
                      }}
                    >
                      <div className="photography-rail-section__headline">
                        <h2 className="photography-rail-section__title">{section.title}</h2>
                        <span className="photography-rail-section__arrow" aria-hidden="true">
                          &rarr;
                        </span>
                      </div>
                      <div className="photography-rail-section__meta">
                        {section.locations ? <span>{section.locations}</span> : null}
                        <span>
                          {section.imageCount} {section.imageCount === 1 ? 'frame' : 'frames'}
                        </span>
                      </div>
                      {section.note ? <p className="photography-rail-section__note">{section.note}</p> : null}
                    </div>

                    <div
                      className="photography-rail-viewport"
                      ref={(node) => {
                        viewportRefs.current[sectionIndex] = node
                      }}
                    >
                      <div
                        className="photography-rail"
                        ref={(node) => {
                          railRefs.current[sectionIndex] = node
                        }}
                      >
                        {section.tiles.map((tile, tileIndex) => {
                          return (
                            <article
                              className={`photography-rail-tile ${
                                tile.images.length === 1
                                  ? 'photography-rail-tile--single'
                                  : 'photography-rail-tile--stack'
                              }`}
                              key={`${section.title}-${tileIndex}`}
                              ref={(node) => {
                                tileRefs.current[sectionIndex] ??= []
                                tileRefs.current[sectionIndex][tileIndex] = node
                              }}
                            >
                              {tile.images.map((img, imageIndex) => {
                                const imagesBeforeTile = section.tiles
                                  .slice(0, tileIndex)
                                  .reduce((total, currentTile) => total + currentTile.images.length, 0)
                                const imageGlobalIndex = imagesBeforeSection + imagesBeforeTile + imageIndex
                                const imageNumber = imagesBeforeTile + imageIndex + 1

                                return (
                                  <PhotographyFrame
                                    key={img.originalSrc}
                                    src={img.displaySrc}
                                    alt={`${section.title} photograph`}
                                    ariaLabel={`View ${section.title} photograph ${imageNumber} full screen`}
                                    isPriority={imageGlobalIndex < priorityImageCount}
                                    width={img.width}
                                    height={img.height}
                                    orientation={img.orientation}
                                    onOpen={() =>
                                      setLightboxImage({
                                        src: img.originalSrc,
                                        alt: `${section.title} photograph ${imageNumber}`,
                                      })
                                    }
                                  />
                                )
                              })}
                            </article>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )
        })}
      </div>

      {lightboxImage && (
        <Lightbox src={lightboxImage.src} alt={lightboxImage.alt} onClose={() => setLightboxImage(null)} />
      )}
    </div>
  )
}
