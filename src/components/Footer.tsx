import { Link } from 'react-router-dom'
import { Share2 } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

const socials = [
  { label: 'GitHub', href: 'https://github.com/LiamWalkerMe', icon: faGithub },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/liamrwalker', icon: faLinkedinIn },
  { label: 'Socials', to: '/socials' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <strong>Liam&apos;s Digital Portfolio</strong>
        </div>
        <div className="footer-socials">
          {socials.map((social) => (
            social.to ? (
              <Link
                key={social.to}
                className="footer-social-icon"
                to={social.to}
                aria-label={social.label}
                title={social.label}
              >
                <Share2 size={18} aria-hidden="true" />
              </Link>
            ) : (
              <a
                key={social.href}
                className="footer-social-icon"
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                title={social.label}
              >
                <FontAwesomeIcon icon={social.icon!} />
              </a>
            )
          ))}
        </div>
      </div>
    </footer>
  )
}
