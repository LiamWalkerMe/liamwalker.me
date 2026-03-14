import type { CSSProperties, ReactNode } from 'react'

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
}: SplitSectionProps) {
  const imageNode = (
    <div className="split-edge__media" style={imageWrapperStyle}>
      <img
        src={imageSrc}
        alt={imageAlt}
        style={{
          objectFit: imageFit,
          ...imageStyle,
        }}
      />
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
