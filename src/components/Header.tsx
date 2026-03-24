import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, ChevronRight, Menu, Share2, X } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

const educationLinks = [
  { label: 'MiraCosta', to: '/miracosta' },
]

const projectLinks = [
  { label: 'This Website', to: '/website' },
  { label: 'Stove Solutions', to: '/stovesolutions' },
]

const roboticsLinks = [
  { label: '2023-24 Season', to: '/2023-24-season' },
  { label: '2022-23 Season', to: '/2022-23-season' },
]

const socials = [
  {
    label: 'Socials',
    to: '/socials',
    color: '#607284',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/LiamWalkerMe',
    color: '#24292f',
    icon: faGithub,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/liamrwalker',
    color: '#0a66c2',
    icon: faLinkedinIn,
  },

]

function HeaderSocialIcon({
  social,
  className,
  onClick,
}: {
  social: (typeof socials)[number]
  className?: string
  onClick?: () => void
}) {
  if (social.to) {
    return (
      <Link
        key={social.to}
        to={social.to}
        className={className ?? 'social-icon'}
        style={{ background: social.color }}
        aria-label={social.label}
        title={social.label}
        onClick={onClick}
      >
        <Share2 size={18} aria-hidden="true" />
      </Link>
    )
  }

  return (
    <a
      key={social.href}
      href={social.href}
      target="_blank"
      rel="noreferrer"
      className={className ?? 'social-icon'}
      style={{ background: social.color }}
      aria-label={social.label}
      title={social.label}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={social.icon!} />
    </a>
  )
}

export default function Header() {
  const location = useLocation()
  const headerRef = useRef<HTMLElement | null>(null)
  const [open, setOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [isMobileViewport, setIsMobileViewport] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 900px)').matches : false
  )

  const closeAllMenus = () => {
    setOpen(false)
    setActiveMenu(null)
    setActiveSubmenu(null)
  }

  const toggleMenu = (menuId: string) => {
    setActiveSubmenu(null)
    setActiveMenu((current) => (current === menuId ? null : menuId))
  }

  const toggleSubmenu = (submenuId: string) => {
    setActiveSubmenu((current) => (current === submenuId ? null : submenuId))
  }

  const openMenu = (menuId: string) => {
    setActiveMenu(menuId)
    if (menuId !== 'projects') {
      setActiveSubmenu(null)
    }
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 900px)')
    const syncViewport = () => {
      const isMobile = mediaQuery.matches
      setIsMobileViewport(isMobile)
      if (!isMobile) {
        setOpen(false)
        setActiveMenu(null)
        setActiveSubmenu(null)
      }
    }

    syncViewport()
    mediaQuery.addEventListener('change', syncViewport)

    return () => {
      mediaQuery.removeEventListener('change', syncViewport)
    }
  }, [])

  useEffect(() => {
    setOpen(false)
    setActiveMenu(null)
    setActiveSubmenu(null)
  }, [location.pathname])

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (headerRef.current?.contains(event.target as Node)) {
        return
      }

      setOpen(false)
      setActiveMenu(null)
      setActiveSubmenu(null)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        setActiveMenu(null)
        setActiveSubmenu(null)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <header ref={headerRef} className="nav">
      <div className="container nav-inner">
        <Link to="/" className="brand">
          Liam&apos;s Digital Portfolio
        </Link>
        <button
          className={`nav-toggle${open ? ' is-open' : ''}`}
          type="button"
          onClick={() => {
            setOpen((current) => {
              const next = !current
              if (!next) {
                setActiveMenu(null)
                setActiveSubmenu(null)
              }
              return next
            })
          }}
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="site-navigation"
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <nav id="site-navigation" className={`nav-links ${open ? 'open' : ''}`}>
          <Link className="nav-item" to="/" onClick={closeAllMenus}>
            Home
          </Link>
          {educationLinks.length > 0 && (
            <div
              className={`nav-item has-submenu ${activeMenu === 'education' ? 'menu-open' : ''}`.trim()}
              onMouseEnter={() => {
                if (!isMobileViewport) {
                  openMenu('education')
                }
              }}
              onMouseLeave={() => {
                if (!isMobileViewport) {
                  setActiveMenu(null)
                }
              }}
              onFocus={() => {
                if (!isMobileViewport) {
                  openMenu('education')
                }
              }}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setActiveMenu(null)
                }
              }}
            >
              <button
                type="button"
                className="nav-trigger"
                aria-haspopup="true"
                aria-expanded={activeMenu === 'education'}
                onClick={() => toggleMenu('education')}
              >
                Education
                <ChevronDown className="nav-icon" aria-hidden="true" />
              </button>
              <div className="submenu">
                {educationLinks.map((item) => (
                  <Link key={item.to} to={item.to} onClick={closeAllMenus}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
          <div
            className={`nav-item has-submenu ${activeMenu === 'projects' ? 'menu-open' : ''}`.trim()}
            onMouseEnter={() => {
              if (!isMobileViewport) {
                openMenu('projects')
              }
            }}
            onMouseLeave={() => {
              if (!isMobileViewport) {
                setActiveMenu(null)
                setActiveSubmenu(null)
              }
            }}
            onFocus={() => {
              if (!isMobileViewport) {
                openMenu('projects')
              }
            }}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setActiveMenu(null)
                setActiveSubmenu(null)
              }
            }}
          >
            <button
              type="button"
              className="nav-trigger"
              aria-haspopup="true"
              aria-expanded={activeMenu === 'projects'}
              onClick={() => toggleMenu('projects')}
            >
              Projects
              <ChevronDown className="nav-icon" aria-hidden="true" />
            </button>
            <div className="submenu">
              {projectLinks.map((item) => (
                <Link key={item.to} to={item.to} onClick={closeAllMenus}>
                  {item.label}
                </Link>
              ))}
              <div
                className={`submenu-item has-submenu ${activeSubmenu === 'robotics' ? 'menu-open' : ''}`.trim()}
                onMouseEnter={() => {
                  if (!isMobileViewport) {
                    setActiveSubmenu('robotics')
                  }
                }}
                onMouseLeave={() => {
                  if (!isMobileViewport) {
                    setActiveSubmenu(null)
                  }
                }}
                onFocus={() => {
                  if (!isMobileViewport) {
                    setActiveSubmenu('robotics')
                  }
                }}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    setActiveSubmenu(null)
                  }
                }}
              >
                <button
                  type="button"
                  className="submenu-trigger"
                  aria-haspopup="true"
                  aria-expanded={activeSubmenu === 'robotics'}
                  onClick={() => toggleSubmenu('robotics')}
                >
                  Robotics
                  <ChevronRight className="submenu-icon" aria-hidden="true" />
                </button>
                <div className="submenu submenu-nested">
                  {roboticsLinks.map((item) => (
                    <Link key={item.to} to={item.to} onClick={closeAllMenus}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Link className="nav-item" to="/photography" onClick={closeAllMenus}>
            Photography
          </Link>
          <a className="nav-item" href="/LiamWalkerResume.pdf" target="_blank" rel="noreferrer" onClick={closeAllMenus}>
            Resume
          </a>
          <div className="nav-mobile-socials">
            {socials.map((social) => (
              <HeaderSocialIcon
                key={social.to ?? social.href}
                social={social}
                className="social-icon nav-mobile-social-icon"
                onClick={closeAllMenus}
              />
            ))}
          </div>
        </nav>
        <div className="nav-socials">
          {socials.map((social) => (
            <HeaderSocialIcon
              key={social.to ?? social.href}
              social={social}
              className="social-icon"
              onClick={closeAllMenus}
            />
          ))}
        </div>
      </div>
    </header>
  )
}
