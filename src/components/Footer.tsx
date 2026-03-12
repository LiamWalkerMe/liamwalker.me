import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons'

const socials = [
  { label: 'GitHub', href: 'https://github.com/LiamWalkerMe', icon: faGithub },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/liamrwalker', icon: faLinkedinIn },
  { label: 'Instagram', href: 'https://instagram.com/liamwalker.me', icon: faInstagram },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <strong>Liam&apos;s Digital Portfolio</strong>
        </div>
        <div className="nav-socials">
          {socials.map((social) => (
            <a
              key={social.href}
              className="social-icon social-icon--gray"
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
              title={social.label}
            >
              <FontAwesomeIcon icon={social.icon} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
