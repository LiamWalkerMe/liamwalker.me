import { type ReactNode, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const [visible, setVisible] = useState(false)
  const hideHeader = location.pathname.startsWith('/zora2024')

  useEffect(() => {
    setVisible(false)
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [location.pathname])

  return (
    <>
      {!hideHeader && <Header />}
      <main className={`main page-fade ${visible ? 'is-visible' : ''}`}>{children}</main>
      <Footer />
    </>
  )
}
