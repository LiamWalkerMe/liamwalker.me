export default function Website() {
  return (
    <div>
      <section className="title-hero">
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="hero-title">My Website!</h1>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <div className="card" style={{ textAlign: 'center' }}>
            <h2 className="title-xl">Development Preview</h2>
            <p style={{ margin: 0, fontSize: 18, lineHeight: 1.7 }}>
              This is the real Website page route in local preview. The final content for this page is still being
              planned out.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
