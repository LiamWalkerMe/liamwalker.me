import { useEffect, useRef, useState, type ComponentPropsWithoutRef, type CSSProperties } from 'react'

interface DeferredBackgroundSectionProps extends Omit<ComponentPropsWithoutRef<'section'>, 'style'> {
  backgroundImageUrl: string
  rootMargin?: string
  style?: CSSProperties
}

export default function DeferredBackgroundSection({
  backgroundImageUrl,
  rootMargin = '320px 0px',
  style,
  ...props
}: DeferredBackgroundSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
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
      ref={sectionRef}
      {...props}
      style={{
        ...style,
        backgroundImage: shouldLoadBackground ? `url(${backgroundImageUrl})` : style?.backgroundImage,
      }}
    />
  )
}
