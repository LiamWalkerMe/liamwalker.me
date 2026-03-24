import { type ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { isPageUnderConstruction } from '../config/siteFlags'
import { isArchivedPath } from '../config/archivedPages'

const viewAnimatedSelector = ['.fade-in', '.reveal', '.h1-1', '.h1-2', '.h1-3', '.spec-item', '.logo-video-credit', '.spin', '.grad-text'].join(', ')
const imageFadeSelector = 'img'
const baseDocumentTitle = "Liam's Digital Portfolio"

function getBrandAccent(pathname: string) {
  switch (pathname) {
    case '/':
      return '#002142'
    case '/miracosta':
      return '#0d3b6e'
    case '/website':
      return '#24317b'
    case '/stovesolutions':
      return '#0f8277'
    case '/zora2024':
      return '#162466'
    case '/2022-23-season':
      return '#7a0c2e'
    case '/2023-24-season':
      return '#7a0c2e'
    case '/photography':
      return '#1B0A07'

    default:
      return '#0f1115'
  }
}

function getPageTitle(pathname: string) {
  switch (pathname) {
    case '/':
      return 'Home'
    case '/miracosta':
      return isPageUnderConstruction('miracosta') ? 'MiraCosta (Under Construction)' : 'MiraCosta'
    case '/stovesolutions':
      return 'Stove Solutions'
    case '/photography':
      return 'Photography'
    case '/socials':
      return 'Socials'
    case '/website':
      return isPageUnderConstruction('website') ? 'Website (Under Construction)' : 'Website'
    case '/2022-23-season':
      return 'Robotics 2022-23 Season'
    case '/2023-24-season':
      return 'Robotics 2023-24 Season'
    case '/zora2024':
      return 'ZORA 2024'
    default:
      return 'Not Found'
  }
}

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const [visible, setVisible] = useState(false)
  const mainRef = useRef<HTMLElement>(null)
  const hideHeader = isArchivedPath(location.pathname) || location.pathname === '/socials'
  const hideFooter = location.pathname === '/socials'
  const isHomePage = location.pathname === '/'
  const hasUnderHeaderHero =
    location.pathname === '/' ||
    location.pathname === '/photography' ||
    (location.pathname === '/website' && !isPageUnderConstruction('website')) ||
    (location.pathname === '/miracosta' && !isPageUnderConstruction('miracosta'))

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

  useLayoutEffect(() => {
    setVisible(false)
    const id = window.requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [location.pathname])

  useEffect(() => {
    document.title = `${baseDocumentTitle} - ${getPageTitle(location.pathname)}`
  }, [location.pathname])

  useEffect(() => {
    const accent = getBrandAccent(location.pathname)
    document.body.style.setProperty('--brand-accent', accent)

    return () => {
      document.body.style.removeProperty('--brand-accent')
    }
  }, [location.pathname])

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
  }, [location.pathname])

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
  }, [location.pathname])

  return (
    <>
      {!hideHeader && <Header />}
      <main
        ref={mainRef}
        className={`main page-fade ${visible ? 'is-visible' : ''} ${hideHeader ? 'main--no-header' : ''} ${
          isHomePage ? 'main--home' : ''
        } ${
          hasUnderHeaderHero ? 'main--under-header-hero' : ''
        }`.trim()}
      >
        {children}
      </main>
      {!hideFooter && <Footer />}
    </>
  )
}
