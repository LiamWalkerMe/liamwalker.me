import { type CSSProperties, type ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { isPageUnderConstruction } from '../config/siteFlags'
import { isArchivedPath } from '../config/archivedPages'
import { applyRouteMetadataToDocument, getRouteMetadata, normalizePathname } from '../lib/routeMetadata'

const viewAnimatedSelector = ['.fade-in', '.reveal', '.h1-1', '.h1-2', '.h1-3', '.spec-item', '.logo-video-credit', '.spin', '.grad-text'].join(', ')
const imageFadeSelector = 'img'
const initialBootMinDurationMs = 480
const initialBootMaxDurationMs = 1800

function waitForFonts() {
  if (typeof document === 'undefined' || !('fonts' in document)) {
    return Promise.resolve()
  }

  return document.fonts.ready.then(() => undefined).catch(() => undefined)
}

function waitForImage(image: HTMLImageElement) {
  if (image.complete) {
    return Promise.resolve()
  }

  return new Promise<void>((resolve) => {
    const handleComplete = () => {
      image.removeEventListener('load', handleComplete)
      image.removeEventListener('error', handleComplete)
      resolve()
    }

    image.addEventListener('load', handleComplete, { once: true })
    image.addEventListener('error', handleComplete, { once: true })
  })
}

function waitForCriticalImages(root: HTMLElement | null) {
  if (!root || typeof window === 'undefined') {
    return Promise.resolve()
  }

  const viewportCutoff = window.innerHeight * 1.15
  const criticalImages = Array.from(root.querySelectorAll<HTMLImageElement>('img')).filter((image) => {
    const rect = image.getBoundingClientRect()
    const isPriorityImage = image.loading === 'eager' || image.getAttribute('fetchpriority') === 'high'
    const isNearViewport = rect.width > 0 && rect.height > 0 && rect.top < viewportCutoff && rect.bottom > -80

    return isPriorityImage || isNearViewport
  })

  return Promise.all(criticalImages.map(waitForImage)).then(() => undefined)
}

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const pathname = normalizePathname(location.pathname)
  const routeMetadata = getRouteMetadata(pathname)
  const mainRef = useRef<HTMLElement>(null)
  const [isInitialBootReady, setIsInitialBootReady] = useState(() => typeof window === 'undefined')
  const hideHeader = isArchivedPath(pathname) || pathname === '/socials'
  const hideFooter = pathname === '/socials'
  const isHomePage = pathname === '/'
  const hasUnderHeaderHero =
    pathname === '/' ||
    pathname === '/photography' ||
    (pathname === '/website' && !isPageUnderConstruction('website')) ||
    (pathname === '/miracosta' && !isPageUnderConstruction('miracosta'))

  useEffect(() => {
    if (!window.history.scrollRestoration) {
      return
    }

    const previousScrollRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'

    return () => {
      window.history.scrollRestoration = previousScrollRestoration
    }
  }, [])

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  useEffect(() => {
    applyRouteMetadataToDocument(pathname)
  }, [pathname])

  useEffect(() => {
    document.body.style.setProperty('--brand-accent', routeMetadata.themeColor)

    return () => {
      document.body.style.removeProperty('--brand-accent')
    }
  }, [routeMetadata.themeColor])

  useEffect(() => {
    if (isInitialBootReady) {
      return
    }

    let isCancelled = false
    let minDelayTimer = 0
    let maxDelayTimer = 0
    let revealFrame = 0

    const minDelay = new Promise<void>((resolve) => {
      minDelayTimer = window.setTimeout(resolve, initialBootMinDurationMs)
    })

    const maxDelay = new Promise<void>((resolve) => {
      maxDelayTimer = window.setTimeout(resolve, initialBootMaxDurationMs)
    })

    Promise.race([
      Promise.all([minDelay, waitForFonts(), waitForCriticalImages(mainRef.current)]).then(() => undefined),
      maxDelay,
    ]).then(() => {
      if (isCancelled) {
        return
      }

      revealFrame = window.requestAnimationFrame(() => {
        if (!isCancelled) {
          setIsInitialBootReady(true)
        }
      })
    })

    return () => {
      isCancelled = true
      window.clearTimeout(minDelayTimer)
      window.clearTimeout(maxDelayTimer)
      window.cancelAnimationFrame(revealFrame)
    }
  }, [isInitialBootReady])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow

    if (!isInitialBootReady) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isInitialBootReady])

  useEffect(() => {
    const observedElements = new Set<HTMLElement>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement
          const isContinuousMotion = element.classList.contains('spin') || element.classList.contains('grad-text')

          if (entry.isIntersecting) {
            element.classList.add('is-in-view')

            if (isContinuousMotion) {
              element.classList.add('is-in-view-active')
            } else {
              observer.unobserve(element)
            }

            return
          }

          if (isContinuousMotion) {
            element.classList.remove('is-in-view-active')
          }
        })
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -2% 0px',
      }
    )

    const observeElement = (element: HTMLElement) => {
      if (observedElements.has(element)) {
        return
      }

      element.classList.remove('is-in-view')
      element.classList.remove('is-in-view-active')
      observer.observe(element)
      observedElements.add(element)
    }

    const observeMatchingElements = (root: ParentNode) => {
      if (root instanceof HTMLElement && root.matches(viewAnimatedSelector)) {
        observeElement(root)
      }

      root.querySelectorAll<HTMLElement>(viewAnimatedSelector).forEach(observeElement)
    }

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) {
            return
          }

          observeMatchingElements(node)
        })
      })
    })

    const id = window.requestAnimationFrame(() => {
      const mainElement = mainRef.current

      if (!mainElement) {
        return
      }

      observeMatchingElements(mainElement)
      mutationObserver.observe(mainElement, { childList: true, subtree: true })
    })

    return () => {
      window.cancelAnimationFrame(id)
      mutationObserver.disconnect()
      observer.disconnect()
      observedElements.clear()
    }
  }, [pathname])

  useEffect(() => {
    const observedImages = new Set<HTMLImageElement>()
    const imageCleanupMap = new Map<HTMLImageElement, () => void>()

    const markImageLoaded = (image: HTMLImageElement) => {
      if (image.classList.contains('is-image-loaded')) {
        return
      }

      window.requestAnimationFrame(() => {
        image.classList.add('is-image-loaded')
      })
    }

    const observeImage = (image: HTMLImageElement) => {
      if (observedImages.has(image)) {
        return
      }

      observedImages.add(image)
      image.classList.add('image-fade-target')
      image.classList.remove('is-image-loaded')

      if (image.complete) {
        markImageLoaded(image)
        return
      }

      const handleComplete = () => {
        markImageLoaded(image)
        cleanup()
      }

      const cleanup = () => {
        image.removeEventListener('load', handleComplete)
        image.removeEventListener('error', handleComplete)
        imageCleanupMap.delete(image)
      }

      image.addEventListener('load', handleComplete)
      image.addEventListener('error', handleComplete)
      imageCleanupMap.set(image, cleanup)
    }

    const observeMatchingImages = (root: ParentNode) => {
      if (root instanceof HTMLImageElement && root.matches(imageFadeSelector)) {
        observeImage(root)
      }

      root.querySelectorAll<HTMLImageElement>(imageFadeSelector).forEach(observeImage)
    }

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) {
            return
          }

          observeMatchingImages(node)
        })
      })
    })

    const id = window.requestAnimationFrame(() => {
      const mainElement = mainRef.current

      if (!mainElement) {
        return
      }

      observeMatchingImages(mainElement)
      mutationObserver.observe(mainElement, { childList: true, subtree: true })
    })

    return () => {
      window.cancelAnimationFrame(id)
      mutationObserver.disconnect()
      imageCleanupMap.forEach((cleanup) => cleanup())
      imageCleanupMap.clear()
      observedImages.clear()
    }
  }, [pathname])

  return (
    <>
      <div className={`app-shell ${isInitialBootReady ? 'is-ready' : 'is-booting'}`} aria-hidden={!isInitialBootReady}>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {!hideHeader && <Header key={pathname} />}
        <main
          key={pathname}
          id="main-content"
          ref={mainRef}
          className={`main page-fade ${hideHeader ? 'main--no-header' : ''} ${isHomePage ? 'main--home' : ''} ${
            hasUnderHeaderHero ? 'main--under-header-hero' : ''
          }`.trim()}
        >
          {children}
        </main>
        {!hideFooter && <Footer key={pathname} />}
      </div>
      <div
        className={`boot-loader ${isInitialBootReady ? 'is-ready' : ''}`}
        style={{ '--boot-loader-accent': routeMetadata.themeColor } as CSSProperties}
        aria-hidden={isInitialBootReady}
      />
    </>
  )
}
