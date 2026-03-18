import type { CSSProperties, ReactNode } from 'react'
import ResponsiveImage from './ResponsiveImage'
import type { ResponsiveImageAsset } from '../lib/responsiveImages'

interface SplitSectionProps {
  imageSrc: string
  imageAlt: string
  children: ReactNode
  reverse?: boolean
  sectionStyle?: CSSProperties
  textClassName?: string
  textStyle?: CSSProperties
  imageFit?: CSSProperties['objectFit']
  imageWrapperStyle?: CSSProperties
  imageStyle?: CSSProperties
  imageAsset?: ResponsiveImageAsset
  imageSizes?: string
}

export default function SplitSection({
  imageSrc,
  imageAlt,
  children,
  reverse = false,
  sectionStyle,
  textClassName = '',
  textStyle,
  imageFit = 'cover',
  imageWrapperStyle,
  imageStyle,
  imageAsset,
  imageSizes = '(max-width: 900px) 100vw, 50vw',
}: SplitSectionProps) {
  const imageNode = (
    <div className="split-edge__media" style={imageWrapperStyle}>
      {imageAsset ? (
        <ResponsiveImage
          asset={imageAsset}
          alt={imageAlt}
          sizes={imageSizes}
          loading="lazy"
          decoding="async"
          pictureStyle={{ width: '100%', height: '100%' }}
          style={{
            objectFit: imageFit,
            ...imageStyle,
          }}
        />
      ) : (
        <img
          src={imageSrc}
          alt={imageAlt}
          loading="lazy"
          decoding="async"
          style={{
            objectFit: imageFit,
            ...imageStyle,
          }}
        />
      )}
    </div>
  )

  return (
    <section className="section" style={sectionStyle}>
      <div className="split-edge">
        {reverse ? (
          <>
            <div className={`text-block ${textClassName}`.trim()} style={textStyle}>
              {children}
            </div>
            {imageNode}
          </>
        ) : (
          <>
            {imageNode}
            <div className={`text-block ${textClassName}`.trim()} style={textStyle}>
              {children}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
