import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons'

const educationLinks = [
  { label: 'MiraCosta', to: '/miracosta' },
  { label: 'This Website', to: '/website' },
  { label: 'Stove Solutions', to: '/stovesolutions' },
]

const roboticsLinks = [
  { label: '2023-24 Season', to: '/2023-24-season' },
  { label: '2022-23 Season', to: '/2022-23-season' },
]

const socials = [
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
  {
    label: 'Instagram',
    href: 'https://instagram.com/liamwalker.me',
    color: '#e1306c',
    icon: faInstagram,
  },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="brand">
          Liam&apos;s Digital Portfolio
        </Link>
        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
          Menu
        </button>
        <nav className={`nav-links ${open ? 'open' : ''}`}>
          <Link className="nav-item" to="/">
            Home
          </Link>
          <div className="nav-item has-submenu">
            <Link to="/education">
              Education
              <ChevronDown className="nav-icon" aria-hidden="true" />
            </Link>
            <div className="submenu">
              {educationLinks.map((item) => (
                <Link key={item.to} to={item.to} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              ))}
              <div className="submenu-item has-submenu">
                <Link to="/ftc-robotics" onClick={() => setOpen(false)}>
                  Robotics
                  <ChevronRight className="submenu-icon" aria-hidden="true" />
                </Link>
                <div className="submenu submenu-nested">
                  {roboticsLinks.map((item) => (
                    <Link key={item.to} to={item.to} onClick={() => setOpen(false)}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Link className="nav-item" to="/photography">
            Photography
          </Link>
          <a className="nav-item" href="/LiamWalkerResume.pdf" target="_blank" rel="noreferrer">
            Resume
          </a>
        </nav>
        <div className="nav-socials">
          {socials.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="social-icon"
              style={{ background: social.color }}
              aria-label={social.label}
              title={social.label}
            >
              <FontAwesomeIcon icon={social.icon} />
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
