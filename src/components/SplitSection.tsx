import type { CSSProperties, ReactNode } from 'react'

interface SplitSectionProps {
  imageSrc: string
  imageAlt: string
  children: ReactNode
  reverse?: boolean
  sectionStyle?: CSSProperties
  textClassName?: string
  textStyle?: CSSProperties
}

export default function SplitSection({
  imageSrc,
  imageAlt,
  children,
  reverse = false,
  sectionStyle,
  textClassName = '',
  textStyle,
}: SplitSectionProps) {
  return (
    <section className="section" style={sectionStyle}>
      <div className="split-edge">
        {reverse ? (
          <>
            <div className={`text-block ${textClassName}`.trim()} style={textStyle}>
              {children}
            </div>
            <img src={imageSrc} alt={imageAlt} />
          </>
        ) : (
          <>
            <img src={imageSrc} alt={imageAlt} />
            <div className={`text-block ${textClassName}`.trim()} style={textStyle}>
              {children}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
