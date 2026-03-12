const socials = [
  { label: 'GitHub', href: 'https://github.com/LiamWalkerMe' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/liamrwalker/' },
  { label: 'Website', href: 'https://liamwalker.me/' },
  { label: 'Instagram', href: 'https://www.instagram.com/liamwalker.me/' },
  { label: 'Youtube', href: 'https://www.youtube.com/@liamwalkerme' },
]

export default function Socials() {
  return (
    <section className="title-hero">
      <div className="container" style={{ textAlign: 'center' }}>
        <h1 className="hero-title">Socials</h1>
        <p className="hero-subtitle">liamwalker.me</p>
        <div style={{ marginTop: 32, display: 'grid', gap: 12, justifyContent: 'center' }}>
          {socials.map((social) => (
            <a key={social.href} href={social.href} target="_blank" rel="noreferrer" className="chip">
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
