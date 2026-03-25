import { useState } from 'react'
import { Maximize2 } from 'lucide-react'
import Lightbox from './Lightbox'

type GalleryProps = {
  images: string[]
  alt: string
  enableLightbox?: boolean
}

export default function Gallery({ images, alt, enableLightbox = true }: GalleryProps) {
  const [activeImage, setActiveImage] = useState<{ src: string; alt: string } | null>(null)

  return (
    <>
      <div className="gallery">
        {images.map((img, index) => (
          enableLightbox ? (
            <button
              key={img}
              type="button"
              className="gallery-item image-frame"
              onClick={() => setActiveImage({ src: img, alt: `${alt} ${index + 1}` })}
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
        <Lightbox src={activeImage.src} alt={activeImage.alt} onClose={() => setActiveImage(null)} />
      )}
    </>
  )
}
