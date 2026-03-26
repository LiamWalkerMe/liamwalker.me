import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight, ChevronUp, Share2 } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { getArchivedPages } from '../config/archivedPages'
import { normalizePathname } from '../lib/routeMetadata'

const socials = [
  { label: 'Socials', to: '/socials', color: '#607284' },
  { label: 'GitHub', href: 'https://github.com/LiamWalkerMe', icon: faGithub, color: '#24292f' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/liamrwalker', icon: faLinkedinIn, color: '#0a66c2' },
]

const archivedLinks = getArchivedPages()

export default function Footer() {
  const location = useLocation()
  const pathname = normalizePathname(location.pathname)
  const archiveMenuRef = useRef<HTMLDivElement | null>(null)
  const [isArchiveOpen, setIsArchiveOpen] = useState(false)
  const visibleArchivedLinks = archivedLinks.filter((item) => normalizePathname(item.to) !== pathname)

  useEffect(() => {
    if (!isArchiveOpen) return undefined

    const handlePointerDown = (event: MouseEvent) => {
      if (archiveMenuRef.current?.contains(event.target as Node)) {
        return
      }

      setIsArchiveOpen(false)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsArchiveOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isArchiveOpen])

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand-stack">
          <Link to="/" className="footer-brand brand" reloadDocument>
            Liam&apos;s Digital Portfolio
          </Link>
          {visibleArchivedLinks.length > 0 && (
            <div ref={archiveMenuRef} className={`footer-archive${isArchiveOpen ? ' is-open' : ''}`}>
              <button
                type="button"
                className="footer-archive-trigger"
                aria-haspopup="true"
                aria-expanded={isArchiveOpen}
                onClick={() => setIsArchiveOpen((current) => !current)}
              >
                Archived Pages
                <ChevronUp className="footer-archive-icon" size={16} aria-hidden="true" />
              </button>
              <div className="footer-archive-menu">
                {visibleArchivedLinks.map((item) => (
                  <a
                    key={item.to}
                    href={item.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-archive-link"
                    onClick={() => setIsArchiveOpen(false)}
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="footer-actions">
          <div className="footer-socials">
            {socials.map((social) => (
              social.to ? (
                <Link
                  key={social.to}
                  className="social-icon footer-social-icon"
                  to={social.to}
                  reloadDocument
                  style={{ background: social.color }}
                  aria-label={social.label}
                  title={social.label}
                >
                  <Share2 size={18} aria-hidden="true" />
                </Link>
              ) : (
                <a
                  key={social.href}
                  className="social-icon footer-social-icon"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ background: social.color }}
                  aria-label={social.label}
                  title={social.label}
                >
                  <FontAwesomeIcon icon={social.icon!} />
                </a>
              )
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
