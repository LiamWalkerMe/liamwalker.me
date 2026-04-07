import { useEffect, useRef, useState, type ComponentPropsWithoutRef, type CSSProperties } from 'react'
import { useSectionParallax } from '../lib/useSectionParallax'

interface DeferredBackgroundSectionProps extends Omit<ComponentPropsWithoutRef<'section'>, 'style'> {
  backgroundImageUrl: string
  rootMargin?: string
  backgroundClassName?: string
  backgroundStyle?: CSSProperties
  parallaxOffset?: number
  parallaxScale?: number
  style?: CSSProperties
}

export default function DeferredBackgroundSection({
  backgroundImageUrl,
  rootMargin = '320px 0px',
  backgroundClassName,
  backgroundStyle,
  children,
  parallaxOffset,
  parallaxScale = 1,
  style,
  ...props
}: DeferredBackgroundSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const { sectionRefs, offsets } = useSectionParallax(1, parallaxOffset ?? 0)
  const [shouldLoadBackground, setShouldLoadBackground] = useState(
    () => typeof window === 'undefined' || typeof window.IntersectionObserver === 'undefined'
  )

  useEffect(() => {
    if (shouldLoadBackground) {
      return
    }

    const element = sectionRef.current
    if (!element) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) {
          return
        }

        setShouldLoadBackground(true)
        observer.disconnect()
      },
      { rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [rootMargin, shouldLoadBackground])

  return (
    <section
      ref={(node) => {
        sectionRef.current = node
        sectionRefs.current[0] = node
      }}
      {...props}
      style={{
        ...style,
        backgroundImage:
          parallaxOffset == null ? (shouldLoadBackground ? `url(${backgroundImageUrl})` : style?.backgroundImage) : undefined,
      }}
    >
      {parallaxOffset != null ? (
        <div
          className={backgroundClassName}
          aria-hidden="true"
          style={{
            ...backgroundStyle,
            backgroundImage: shouldLoadBackground ? `url(${backgroundImageUrl})` : backgroundStyle?.backgroundImage,
            transform: `translate3d(0, ${offsets[0] ?? 0}px, 0) scale(${parallaxScale})`,
          }}
        />
      ) : null}
      {children}
    </section>
  )
}
