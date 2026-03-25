import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div>
      <section className="title-hero">
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="hero-subtitle" style={{ marginBottom: 12 }}>404</p>
          <h1 className="hero-title">Page Not Found</h1>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <div className="card" style={{ textAlign: 'center' }}>
            <p style={{ margin: '0 0 24px', fontSize: 18, lineHeight: 1.7 }}>
              The page you were looking for doesn&apos;t exist or may have moved.
            </p>
            <Link className="button" to="/" reloadDocument>
              Go Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
