import { type ReactNode, useEffect, useLayoutEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { isPageUnderConstruction } from '../config/siteFlags'

const viewAnimatedSelector = ['.fade-in', '.reveal', '.h1-1', '.h1-2', '.h1-3', '.spec-item', '.logo-video-credit', '.spin', '.grad-text'].join(', ')
const baseDocumentTitle = "Liam's Digital Portfolio"

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
  const hideHeader = location.pathname.startsWith('/zora2024')
  const isHomePage = location.pathname === '/'
  const hasUnderHeaderHero =
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

  useEffect(() => {
    setVisible(false)
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [location.pathname])

  useEffect(() => {
    document.title = `${baseDocumentTitle} - ${getPageTitle(location.pathname)}`
  }, [location.pathname])

  useEffect(() => {
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

    const id = window.requestAnimationFrame(() => {
      const elements = document.querySelectorAll<HTMLElement>(viewAnimatedSelector)

      elements.forEach((element) => {
        element.classList.remove('is-in-view')
        element.classList.remove('is-in-view-active')
        observer.observe(element)
      })
    })

    return () => {
      window.cancelAnimationFrame(id)
      observer.disconnect()
    }
  }, [location.pathname])

  return (
    <>
      {!hideHeader && <Header />}
      <main
        className={`main page-fade ${visible ? 'is-visible' : ''} ${hideHeader ? 'main--no-header' : ''} ${
          isHomePage ? 'main--home' : ''
        } ${
          hasUnderHeaderHero ? 'main--under-header-hero' : ''
        }`.trim()}
      >
        {children}
      </main>
      <Footer />
    </>
  )
}
