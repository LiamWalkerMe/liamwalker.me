import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Maximize2, X } from 'lucide-react'
import { photoSections } from '../data/photography'

type Tile = { images: string[] }
type RailMetric = {
  overflow: number
  scrollSpan: number
  stickyHeight: number
  tileCenterProgresses: number[]
}

const defaultRailPattern = [1, 2, 1, 1]
const pinnedLayoutQuery = '(min-width: 860px) and (prefers-reduced-motion: no-preference)'
const tileRevealFocus = 0.62

const sectionOrder: Record<string, number[]> = {
  Italy: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  LA: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  'Lake Tahoe': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  'Imperial Sand Dunes': [0, 1, 2, 3, 4],
  'Mount Laguna': [0, 2, 1, 3, 5, 4],
}

const layoutBySection: Record<string, number[][]> = {
  Italy: [
    [1, 2, 1, 1],
    [1, 2, 1, 1],
    [2, 1, 1, 1],
  ],
  LA: [
    [1, 1, 2, 1],
    [2, 2, 2, 2],
  ],
  'Lake Tahoe': [
    [2, 1, 2, 1],
    [1, 2, 2, 1],
  ],
  'Imperial Sand Dunes': [[1, 1, 2, 1]],
  'Mount Laguna': [[2, 1, 2, 1]],
}

const sectionDetails: Record<
  string,
  {
    eyebrow: string
    locations: string
    note: string
  }
> = {
  Italy: {
    eyebrow: 'Collection 01',
    locations: 'Rome | Florence | Riomaggiore | Lake Como | Venice',
    note: 'Warm coastlines, quiet canals, and the kind of streets that reward wandering without a plan.',
  },
  LA: {
    eyebrow: 'Collection 02',
    locations: 'West Hollywood | Peterson Automotive Museum | Erewhon | Griffith',
    note: 'Architecture, neon, and city light stitched together into one long evening walk.',
  },
  'Lake Tahoe': {
    eyebrow: 'Collection 03',
    locations: 'Lake View',
    note: 'Cold air, reflective water, and a slower rhythm once the sun starts to drop.',
  },
  'Imperial Sand Dunes': {
    eyebrow: 'Collection 04',
    locations: 'Sunrise Ridges | Wind Lines | Golden Hour',
    note: 'A smaller set built around shape, color, and the way the dunes change every few minutes.',
  },
  'Mount Laguna': {
    eyebrow: 'Collection 05',
    locations: 'Desert View | Pine Forest | Sunset Overlook',
    note: 'The last chapter leans quieter, with softer light and longer shadows through the trees.',
  },
}

function reorderImages(images: string[], order?: number[]) {
  if (!order?.length) return images
  return order.map((index) => images[index]).filter(Boolean)
}

function buildTilesWithPattern(images: string[], pattern: number[]): Tile[] {
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

function buildTilesFromLayout(images: string[], layout?: number[][]): Tile[] {
  if (!layout?.length) {
    return buildTilesWithPattern(images, defaultRailPattern)
  }
  const tiles: Tile[] = []
  let i = 0
  for (const slide of layout) {
    for (const size of slide) {
      if (i >= images.length) break
      tiles.push({ images: images.slice(i, i + size) })
      i += size
    }
  }
  if (i < images.length) {
    tiles.push(...buildTilesWithPattern(images.slice(i), defaultRailPattern))
  }
  return tiles
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

export default function Photography() {
  const gallerySections = useMemo(
    () =>
      photoSections.map((section, sectionIndex) => {
        const orderedImages = reorderImages(section.images, sectionOrder[section.title])
        const tiles = buildTilesFromLayout(orderedImages, layoutBySection[section.title])
        const details = sectionDetails[section.title]

        return {
          id: toSectionId(section.title),
          title: section.title,
          eyebrow: details?.eyebrow ?? `Collection ${String(sectionIndex + 1).padStart(2, '0')}`,
          locations: details?.locations ?? '',
          note: details?.note ?? '',
          images: orderedImages,
          tiles,
        }
      }),
    []
  )

  const [sectionMetrics, setSectionMetrics] = useState<RailMetric[]>(() =>
    gallerySections.map(() => ({ overflow: 0, scrollSpan: 0, stickyHeight: 0, tileCenterProgresses: [] }))
  )
  const [sectionProgresses, setSectionProgresses] = useState(() => gallerySections.map(() => 0))
  const [sectionRevealProgresses, setSectionRevealProgresses] = useState(() => gallerySections.map(() => 0))
  const [isPinnedLayout, setIsPinnedLayout] = useState(false)
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const sectionRefs = useRef<Array<HTMLElement | null>>([])
  const stickyRefs = useRef<Array<HTMLDivElement | null>>([])
  const viewportRefs = useRef<Array<HTMLDivElement | null>>([])
  const railRefs = useRef<Array<HTMLDivElement | null>>([])
  const tileRefs = useRef<Array<Array<HTMLElement | null>>>([])

  useEffect(() => {
    if (lightboxSrc) {
      setIsLightboxOpen(false)
      const id = requestAnimationFrame(() => setIsLightboxOpen(true))
      return () => cancelAnimationFrame(id)
    }
    return undefined
  }, [lightboxSrc])

  useEffect(() => {
    if (!lightboxSrc) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsLightboxOpen(false)
        setTimeout(() => setLightboxSrc(null), 220)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKey)
    }
  }, [lightboxSrc])

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
    if (!isPinnedLayout) {
      setSectionProgresses(gallerySections.map(() => 0))
      setSectionRevealProgresses(gallerySections.map(() => 0))
      return undefined
    }

    let frameId = 0

    const updateProgress = () => {
      const measuredProgresses = gallerySections.map((_, sectionIndex) => {
        const section = sectionRefs.current[sectionIndex]
        const scrollSpan = sectionMetrics[sectionIndex]?.scrollSpan ?? 0

        if (!section || scrollSpan <= 0) {
          return 0
        }

        const { top } = section.getBoundingClientRect()
        return clamp(-top / scrollSpan, 0, 1)
      })

      setSectionProgresses((previousProgresses) => {
        const hasChanged =
          previousProgresses.length !== measuredProgresses.length ||
          previousProgresses.some((value, sectionIndex) => Math.abs(value - measuredProgresses[sectionIndex]) > 0.002)

        return hasChanged ? measuredProgresses : previousProgresses
      })

      setSectionRevealProgresses((previousProgresses) => {
        const nextProgresses = measuredProgresses.map((value, sectionIndex) =>
          Math.max(previousProgresses[sectionIndex] ?? 0, value)
        )
        const hasChanged =
          previousProgresses.length !== nextProgresses.length ||
          previousProgresses.some((value, sectionIndex) => Math.abs(value - nextProgresses[sectionIndex]) > 0.002)

        return hasChanged ? nextProgresses : previousProgresses
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
    }
  }, [gallerySections, isPinnedLayout, sectionMetrics])

  const closeLightbox = () => {
    setIsLightboxOpen(false)
    window.setTimeout(() => setLightboxSrc(null), 220)
  }

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
          const progress = sectionProgresses[sectionIndex] ?? 0
          const revealProgress = sectionRevealProgresses[sectionIndex] ?? progress
          const easedProgress = isPinnedLayout ? easeInOutCubic(progress) : 1
          const easedRevealProgress = isPinnedLayout ? easeInOutCubic(revealProgress) : 1
          const railTranslate = isPinnedLayout ? -metric.overflow * easedProgress : 0
          const copyReveal = isPinnedLayout ? clamp(progress / 0.18, 0, 1) : 1

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
                      style={{
                        opacity: 0.42 + copyReveal * 0.58,
                        transform: `translate3d(0, ${Math.round((1 - copyReveal) * 32)}px, 0)`,
                      }}
                    >
                      <span className="photography-rail-section__eyebrow">{section.eyebrow}</span>
                      <div className="photography-rail-section__headline">
                        <h2 className="photography-rail-section__title">{section.title}</h2>
                        <span className="photography-rail-section__arrow" aria-hidden="true">
                          &rarr;
                        </span>
                      </div>
                      <div className="photography-rail-section__meta">
                        <span>{section.locations}</span>
                        <span>{section.images.length} frames</span>
                      </div>
                      <p className="photography-rail-section__note">{section.note}</p>
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
                        style={isPinnedLayout ? { transform: `translate3d(${railTranslate}px, 0, 0)` } : undefined}
                      >
                        {section.tiles.map((tile, tileIndex) => {
                          const tileCenterProgress = metric.tileCenterProgresses[tileIndex] ?? 0
                          const tileRevealStart = Math.max(0, tileCenterProgress - 0.18)
                          const tileReveal = isPinnedLayout ? clamp((easedRevealProgress - tileRevealStart) / 0.18, 0, 1) : 1

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
                              style={{
                                opacity: 0.18 + tileReveal * 0.82,
                                transform: `translate3d(0, ${Math.round((1 - tileReveal) * 42)}px, 0) scale(${0.9 + tileReveal * 0.1})`,
                              }}
                            >
                              {tile.images.map((img, imageIndex) => {
                                const frameReveal = isPinnedLayout ? clamp(tileReveal - imageIndex * 0.08, 0, 1) : 1

                                return (
                                  <button
                                    type="button"
                                    key={img}
                                    className="photography-rail-frame"
                                    onClick={() => setLightboxSrc(img)}
                                    aria-label={`View ${section.title} photograph ${imageIndex + 1} full screen`}
                                    style={{
                                      opacity: 0.4 + frameReveal * 0.6,
                                      filter: `saturate(${0.78 + frameReveal * 0.22}) brightness(${0.9 + frameReveal * 0.1})`,
                                    }}
                                  >
                                    <img src={img} alt={`${section.title} photograph`} loading="lazy" decoding="async" />
                                    <span className="photography-rail-frame__icon" aria-hidden="true">
                                      <Maximize2 size={16} />
                                    </span>
                                  </button>
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

      {lightboxSrc && (
        <div className={`lightbox ${isLightboxOpen ? 'open' : ''}`} role="dialog" aria-modal="true" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Close">
            <X size={20} />
          </button>
          <img src={lightboxSrc} alt="Full screen" onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </div>
  )
}
