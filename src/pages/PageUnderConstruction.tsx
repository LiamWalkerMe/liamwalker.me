import { Link } from 'react-router-dom'

interface PageUnderConstructionProps {
  title: string
}

export default function PageUnderConstruction({ title }: PageUnderConstructionProps) {
  return (
    <div>
      <section className="title-hero">
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="hero-title">{title}</h1>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <div className="card" style={{ textAlign: 'center' }}>
            <h2 className="title-xl">Under Construction</h2>
            <p style={{ margin: '0 0 24px', fontSize: 18, lineHeight: 1.7 }}>
              This page is not live yet, but it&apos;s on the way. Check back soon for the finished version.
            </p>
            <Link className="button" to="/">
              Go Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
