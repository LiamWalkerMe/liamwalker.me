import { type ReactNode, useEffect, useLayoutEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const viewAnimatedSelector = ['.fade-in', '.reveal', '.h1-1', '.h1-2', '.h1-3', '.spec-item', '.logo-video-credit', '.spin', '.grad-text'].join(', ')

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const [visible, setVisible] = useState(false)
  const hideHeader = location.pathname.startsWith('/zora2024')

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
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px',
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
      <main className={`main page-fade ${visible ? 'is-visible' : ''} ${hideHeader ? 'main--no-header' : ''}`.trim()}>
        {children}
      </main>
      <Footer />
    </>
  )
}
