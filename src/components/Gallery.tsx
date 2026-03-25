import { useEffect, useState } from 'react'
import { Maximize2 } from 'lucide-react'

type GalleryProps = {
  images: string[]
  alt: string
  enableLightbox?: boolean
}

export default function Gallery({ images, alt, enableLightbox = true }: GalleryProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  const openLightbox = (img: string) => {
    setActiveImage(img)
  }

  const closeLightbox = () => {
    setIsVisible(false)
  }

  useEffect(() => {
    if (!activeImage) {
      return
    }

    setIsVisible(false)
    const raf = window.requestAnimationFrame(() => {
      setIsVisible(true)
    })

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeLightbox()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKey)

    return () => {
      window.cancelAnimationFrame(raf)
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKey)
    }
  }, [activeImage])

  useEffect(() => {
    if (!activeImage) {
      return
    }

    if (!isVisible) {
      const timeout = window.setTimeout(() => {
        setActiveImage(null)
      }, 300)

      return () => window.clearTimeout(timeout)
    }
  }, [isVisible, activeImage])

  return (
    <>
      <div className="gallery">
        {images.map((img, index) => (
          enableLightbox ? (
            <button
              key={img}
              type="button"
              className="gallery-item image-frame"
              onClick={() => openLightbox(img)}
              aria-label={`Open ${alt} ${index + 1}`}
            >
              <span className="lightbox-trigger" aria-hidden="true">
                <Maximize2 size={16} />
              </span>
              <img src={img} alt={`${alt} ${index + 1}`} loading="lazy" />
            </button>
          ) : (
            <div key={img} className="gallery-item gallery-item--static image-frame">
              <img src={img} alt={`${alt} ${index + 1}`} loading="lazy" />
            </div>
          )
        ))}
      </div>

      {enableLightbox && activeImage && (
        <div
          className={`lightbox${isVisible ? ' open' : ''}`}
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <button className="lightbox-close" type="button" onClick={closeLightbox}>
            X
          </button>
          <img src={activeImage} alt={alt} onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </>
  )
}
