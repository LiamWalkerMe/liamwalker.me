import type { CSSProperties } from 'react'
import { ArrowLeft, ArrowUpRight, Globe2 } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faInstagram, faLinkedinIn, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'

type SocialLink = {
  label: string
  href: string
  handle: string
  note: string
  accent: string
  surface: string
  glow: string
  icon: 'website' | 'github' | 'linkedin' | 'instagram' | 'youtube'
  featured?: boolean
}

const socials: SocialLink[] = [

  {
    label: 'Website',
    href: 'https://liamwalker.me/',
    handle: 'liamwalker.me',
    note: 'Projects, case studies, photography, and the broader story behind what I am building.',
    accent: '#0f3d73',
    surface: 'rgba(207, 232, 255, 0.84)',
    glow: 'rgba(120, 184, 255, 0.42)',
    icon: 'website',
    featured: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/liamrwalker/',
    handle: 'liamrwalker',
    note: 'Professional updates, resume context, and how I am growing through school and projects.',
    accent: '#0a66c2',
    surface: 'rgba(209, 233, 255, 0.82)',
    glow: 'rgba(10, 102, 194, 0.24)',
    icon: 'linkedin',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/LiamWalkerMe',
    handle: '@LiamWalkerMe',
    note: 'Code, experiments, and the more technical side of my work.',
    accent: '#111827',
    surface: 'rgba(228, 232, 240, 0.82)',
    glow: 'rgba(88, 103, 140, 0.28)',
    icon: 'github',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/liamwalker.me/',
    handle: '@liamwalker.me',
    note: 'Photography, visual experiments, and snapshots from recent trips.',
    accent: '#d62976',
    surface: 'rgba(255, 221, 237, 0.82)',
    glow: 'rgba(214, 41, 118, 0.24)',
    icon: 'instagram',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@liamwalkerme',
    handle: '@liamwalkerme',
    note: 'A home for videos, longer-form updates, and anything that works best in motion.',
    accent: '#ff0033',
    surface: 'rgba(255, 221, 226, 0.84)',
    glow: 'rgba(255, 0, 51, 0.2)',
    icon: 'youtube',
  },
]

function SocialCardIcon({ icon }: { icon: SocialLink['icon'] }) {
  switch (icon) {
    case 'website':
      return <Globe2 size={24} aria-hidden="true" />
    case 'github':
      return <FontAwesomeIcon icon={faGithub} />
    case 'linkedin':
      return <FontAwesomeIcon icon={faLinkedinIn} />
    case 'instagram':
      return <FontAwesomeIcon icon={faInstagram} />
    case 'youtube':
      return <FontAwesomeIcon icon={faYoutube} />
    default:
      return null
  }
}

export default function Socials() {
  return (
    <div className="socials-page">
      <section className="container socials-shell">
        <Link className="socials-back-link fade-in" to="/" aria-label="Back to home page">
          <ArrowLeft size={18} aria-hidden="true" />
          <span>Home</span>
        </Link>

        <div className="socials-hero fade-in">
          <span className="socials-kicker">Find Me Online</span>
          <h1 className="socials-title">Socials</h1>
          <p className="socials-lede">
            Pick the platform that matches what you want to see most: code, photography, projects, or professional updates.
          </p>
          <div className="socials-tags">
            <span>Projects</span>
            <span>Photography</span>
            <span>Career</span>
            <span>Videos</span>
          </div>
        </div>

        <div className="socials-grid">
          {socials.map((social, index) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="social-card fade-in"
              style={
                {
                  '--social-card-accent': social.accent,
                  '--social-card-surface': social.surface,
                  '--social-card-glow': social.glow,
                  animationDelay: `${80 + index * 70}ms`,
                } as CSSProperties
              }
              aria-label={`${social.label}: ${social.handle}, opens in a new tab`}
            >
              <span className="social-card__icon">
                <SocialCardIcon icon={social.icon} />
              </span>
              <div className="social-card__copy">
                <strong className="social-card__label">{social.label}</strong>
                <span className="social-card__handle">{social.handle}</span>
              </div>
              <span className="social-card__arrow" aria-hidden="true">
                <ArrowUpRight size={18} />
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
