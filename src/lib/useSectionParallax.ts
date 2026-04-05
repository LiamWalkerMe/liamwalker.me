import { useEffect, useRef, useState } from 'react'

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function useSectionParallax(sectionCount: number, maxOffset = 56) {
  const sectionRefs = useRef<Array<HTMLElement | null>>([])
  const [offsets, setOffsets] = useState<number[]>(() => Array.from({ length: sectionCount }, () => 0))

  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, sectionCount)

    setOffsets((previousOffsets) =>
      previousOffsets.length === sectionCount
        ? previousOffsets
        : Array.from({ length: sectionCount }, (_, index) => previousOffsets[index] ?? 0)
    )
  }, [sectionCount])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    let frameId = 0

    const updateOffsets = () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (prefersReducedMotion) {
        setOffsets((previousOffsets) =>
          previousOffsets.every((offset) => offset === 0) ? previousOffsets : Array.from({ length: sectionCount }, () => 0)
        )
        frameId = 0
        return
      }

      const viewportHeight = window.innerHeight || 1
      const nextOffsets = Array.from({ length: sectionCount }, (_, index) => {
        const section = sectionRefs.current[index]

        if (!section) {
          return 0
        }

        const rect = section.getBoundingClientRect()
        const sectionCenter = rect.top + rect.height / 2
        const viewportCenter = viewportHeight / 2
        const normalizedDistance = clamp((viewportCenter - sectionCenter) / viewportHeight, -1, 1)

        return Math.round(normalizedDistance * maxOffset)
      })

      setOffsets((previousOffsets) => {
        const hasChanged =
          previousOffsets.length !== nextOffsets.length ||
          previousOffsets.some((offset, index) => Math.abs(offset - nextOffsets[index]) > 0.5)

        return hasChanged ? nextOffsets : previousOffsets
      })

      frameId = 0
    }

    const scheduleUpdate = () => {
      if (frameId !== 0) {
        return
      }

      frameId = window.requestAnimationFrame(updateOffsets)
    }

    updateOffsets()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)

      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [maxOffset, sectionCount])

  return { sectionRefs, offsets }
}
