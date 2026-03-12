import { useEffect, useMemo, useRef, useState } from 'react'
import { Maximize2, X } from 'lucide-react'
import { photoSections } from '../data/photography'

type Tile = { images: string[] }

const defaultSlidePattern = [1, 2, 1, 1]

const sectionOrder: Record<string, number[]> = {
  Italy: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  LA: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  'Lake Tahoe': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  'Imperial Sand Dunes': [0, 1, 2, 3, 4],
  'Mount Laguna': [0, 1, 2, 3, 4, 5],
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
    return buildTilesWithPattern(images, defaultSlidePattern)
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
    tiles.push(...buildTilesWithPattern(images.slice(i), defaultSlidePattern))
  }
  return tiles
}

export default function Photography() {
  const tileSections = useMemo(
    () =>
      photoSections.map((section) => {
        const orderedImages = reorderImages(section.images, sectionOrder[section.title])
        const tiles = buildTilesFromLayout(orderedImages, layoutBySection[section.title])
        return {
          title: section.title,
          images: orderedImages,
          tiles,
        }
      }),
    []
  )

  const [indexes, setIndexes] = useState(() => tileSections.map(() => 0))
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const carouselRefs = useRef<Array<HTMLDivElement | null>>([])

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

  const handleMove = (sectionIndex: number, dir: number) => {
    const carousel = carouselRefs.current[sectionIndex]
    if (!carousel) return
    const slideWidth = carousel.clientWidth
    const currentIndex = Math.round(carousel.scrollLeft / slideWidth)
    const tiles = tileSections[sectionIndex].tiles
    const slideCount = Math.max(1, Math.ceil(tiles.length / 4))
    const nextIndex = (currentIndex + dir + slideCount) % slideCount
    carousel.scrollTo({ left: nextIndex * slideWidth, behavior: 'smooth' })
  }

  return (
    <div>
      <section className="title-hero">
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="hero-title">Photography</h1>
        </div>
      </section>
      {tileSections.map((section, sectionIndex) => {
        const tiles = section.tiles
        const slides: Tile[][] = []
        for (let i = 0; i < tiles.length; i += 4) {
          slides.push(tiles.slice(i, i + 4))
        }
        const slideCount = Math.max(1, slides.length)
        const isStatic = section.title === 'Mount Laguna' || section.title === 'Imperial Sand Dunes'
        return (
          <section key={section.title} className="section compact">
            <div className="container">
              <h2 style={{ textAlign: 'center' }}>{section.title}</h2>
              {isStatic ? (
                <div className="static-tiles" style={{ marginTop: 24 }}>
                  {slides.map((slide, slideIndex) => (
                    <div className="carousel-row static-row" key={`${section.title}-static-${slideIndex}`}>
                      {slide.map((tile, tileIndex) => (
                        <div
                          className={`carousel-tile ${tile.images.length === 1 ? 'single' : ''}`.trim()}
                          key={`${section.title}-static-${tileIndex}`}
                        >
                          {tile.images.map((img) => (
                            <div key={img} className="image-frame">
                              <img src={img} alt={section.title} loading="lazy" />
                              <button
                                className="lightbox-trigger"
                                onClick={() => setLightboxSrc(img)}
                                aria-label="View full screen"
                              >
                                <Maximize2 size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="carousel" style={{ marginTop: 24 }}>
                    <button className="carousel-arrow left" onClick={() => handleMove(sectionIndex, -1)}>
                      ‹
                    </button>
                    <div
                      className="carousel-viewport"
                      ref={(node) => {
                        carouselRefs.current[sectionIndex] = node
                      }}
                      onScroll={(event) => {
                        const target = event.currentTarget
                        const slideWidth = target.clientWidth
                        if (!slideWidth) return
                        const nextIndex = Math.round(target.scrollLeft / slideWidth)
                        setIndexes((prev) => {
                          if (prev[sectionIndex] === nextIndex) return prev
                          const copy = [...prev]
                          copy[sectionIndex] = nextIndex
                          return copy
                        })
                      }}
                    >
                      <div className="carousel-track">
                        {slides.map((slide, slideIndex) => (
                          <div className="carousel-slide" key={`${section.title}-${slideIndex}`}>
                            <div className="carousel-row">
                        {slide.map((tile, tileIndex) => (
                          <div
                            className={`carousel-tile ${tile.images.length === 1 ? 'single' : ''}`.trim()}
                            key={`${section.title}-${tileIndex}`}
                          >
                            {tile.images.map((img) => (
                              <div key={img} className="image-frame">
                                <img src={img} alt={section.title} loading="lazy" />
                                <button
                                  className="lightbox-trigger"
                                  onClick={() => setLightboxSrc(img)}
                                  aria-label="View full screen"
                                >
                                  <Maximize2 size={16} />
                                </button>
                              </div>
                            ))}
                          </div>
                        ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button className="carousel-arrow right" onClick={() => handleMove(sectionIndex, 1)}>
                      ›
                    </button>
                  </div>
                  <div className="carousel-dots">
                    {Array.from({ length: slideCount }).map((_, dotIndex) => (
                      <button
                        key={`${section.title}-dot-${dotIndex}`}
                        className={`carousel-dot ${dotIndex === indexes[sectionIndex] ? 'active' : ''}`}
                        onClick={() => handleMove(sectionIndex, dotIndex - indexes[sectionIndex])}
                        aria-label={`Go to slide ${dotIndex + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        )
      })}
      {lightboxSrc && (
        <div
          className={`lightbox ${isLightboxOpen ? 'open' : ''}`}
          role="dialog"
          aria-modal="true"
          onClick={() => {
            setIsLightboxOpen(false)
            setTimeout(() => setLightboxSrc(null), 220)
          }}
        >
          <button
            className="lightbox-close"
            onClick={() => {
              setIsLightboxOpen(false)
              setTimeout(() => setLightboxSrc(null), 220)
            }}
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <img src={lightboxSrc} alt="Full screen" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  )
}
