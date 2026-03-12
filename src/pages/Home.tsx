import { Link } from 'react-router-dom'
import SplitSection from '../components/SplitSection'

export default function Home() {
  return (
    <div>
      <section className="hero">
        <div className="container hero split">
          <div className="hero-card fade-in">
            <p className="hero-subtitle">Computer Science Student at MiraCosta College</p>
            <h1 className="hero-title">liamwalker.me</h1>
            <Link className="button" to="/website">
              Learn More About This Website
            </Link>
          </div>
          <div className="hero-portrait fade-in">
            <img src="/assets/2025/03/Pro-Background-Removed-e1759050563344.png" alt="Liam Walker" />
          </div>
        </div>
      </section>

      <section
        className="cover"
        style={{
          backgroundImage: 'url(/assets/Photography/Banner.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: '67% 58%',
        }}
      >
        <div className="container">
          <h2 className="cover-title">Photography</h2>
          <p className="cover-subtitle" style={{ textAlign: 'left', marginLeft: 0, marginRight: 'auto' }}>
            My Creative Outlet
          </p>
          <Link className="button light" to="/photography">
            Learn More
          </Link>
        </div>
      </section>

      <section
        className="cover bg-accent fixed"
        style={{
          backgroundImage: 'url(/assets/StoveSolutions/teamphoto.jpg)',
        }}
      >
        <div className="container" style={{ textAlign: 'center' }}>
          <img
            src="/assets/StoveSolutions/banner.png"
            alt="Stove Solutions"
            style={{maxWidth: 1000, margin: '0 auto 20px' }}
          />
          <p style={{ marginBottom: 20 }}>An Engineering Design and Development Course Project</p>
          <Link className="button accent" to="/stovesolutions">
            Learn More
          </Link>
        </div>
      </section>

      <SplitSection
        imageSrc="/assets/2024/03/IMG_6060.jpeg"
        imageAlt="Liam Walker Robotics"
        textClassName="gradient-panel no-radius"
        textStyle={{ textAlign: 'center' }}
      >
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <h2 className="title-xl">FIRST Robotics</h2>
          <p>My experience on Team #10809 Crow Force</p>
          <Link className="button light" to="/ftc-robotics">
            Learn More
          </Link>
        </div>
      </SplitSection>

      <SplitSection
        imageSrc="/assets/2025/09/FrontPage-scaled.png"
        imageAlt="Website preview"
        sectionStyle={{ background: '#f1f1f1' }}
        reverse={true}
        textStyle={{ textAlign: 'center' }}
      >
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <h2 className="title-xl">This Website!</h2>
          <p>Learn More About the Creation of This Website!</p>
          <Link className="button" to="/website">
            Learn More
          </Link>
        </div>
      </SplitSection>
    </div>
  )
}
