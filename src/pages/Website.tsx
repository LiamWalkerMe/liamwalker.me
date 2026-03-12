export default function Website() {
  return (
    <div>
      <section className="title-hero">
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="hero-title">My Website!</h1>
          <p>Learn more about how this website is made.</p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="title-xl">How is it made?</h2>
          <p>Discover the three easy steps it takes to make this website possible!</p>
        </div>
        <div className="container narrow" style={{ marginTop: 32, textAlign: 'center' }}>
          <div className="stacked-steps">
            <div className="step-card">
              <h3>1. Local Instance of WordPress</h3>
              <p>
                I first build the website using a local instance of WordPress. I chose WordPress because it's free,
                user-friendly, and offers a wide range of plugins for effortless, beautiful website creation. To run the
                local instance, I used a program called \"Local\".
              </p>
              <img src="/assets/Website/LocalHost.png" alt="Local WP" />
            </div>
            <div className="step-card">
              <h3>2. WordPress to Static Webpage</h3>
              <p>
                I use the \"Simply Static\" plugin to convert my web pages into static HTML. The plugin offers a variety of
                options and allows me to export the static files directly to a local folder on my computer.
              </p>
              <img src="/assets/Website/VSCode.png" alt="VS Code" />
            </div>
            <div className="step-card">
              <h3>3. Github Pages</h3>
              <p>
                The static HTML pages are exported to a GitHub Pages repository, where I review the changes and push them
                to GitHub. Within minutes, the updates are live on the website!
              </p>
              <img src="/assets/Website/GitHub.png" alt="GitHub" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
