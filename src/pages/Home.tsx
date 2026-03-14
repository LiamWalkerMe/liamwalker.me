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
            <img src="/assets/Hero/profile.png" alt="Liam Walker" />
          </div>
        </div>
      </section>


      <section
        className="cover home-photography-cover"
        style={{
          backgroundImage: 'url(/assets/Photography/Banner.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: '67% 58%',
        }}
      >
        <div className="container home-photography-cover__content">
          <h2 className="cover-title">Photography</h2>
          <p className="cover-subtitle home-photography-cover__subtitle">My Creative Outlet</p>
          <Link className="button light" to="/photography">
            Learn More
          </Link>
        </div>
      </section>

      <SplitSection
        imageSrc="/assets/Website/FrontPage.png"
        imageAlt="Website preview"
        sectionStyle={{ background: '#f1f1f1' }}
        imageFit="contain"
        imageWrapperStyle={{
          padding: 'clamp(24px, 6vw, 40px) clamp(20px, 5vw, 36px)',
        }}
        imageStyle={{
          objectPosition: 'center',
          filter: 'drop-shadow(0 20px 32px rgba(15, 17, 21, 0.16))',
        }}
        reverse={true}
        textStyle={{ textAlign: 'center' }}
      >
        <div className="split-feature-copy" style={{ maxWidth: 520, margin: '0 auto' }}>
          <h2 className="title-xl">This Website!</h2>
          <p>Learn More About the Creation of This Website!</p>
          <Link className="button" to="/website">
            Learn More
          </Link>
        </div>
      </SplitSection> 

      <section
        className="cover bg-accent fixed home-stove-cover"
        style={{
          backgroundImage: 'url(/assets/StoveSolutions/teamphoto.jpg)',
          backgroundPosition: 'center',
        }}
      >
        <div className="container home-stove-cover__content">
          <img
            src="/assets/StoveSolutions/banner.png"
            alt="Stove Solutions"
            className="home-stove-cover__banner"
          />
          <p className="home-stove-cover__description">An Engineering Design and Development Course Project</p>
          <Link className="button accent" to="/stovesolutions">
            Learn More
          </Link>
        </div>
      </section>

      <SplitSection
        imageSrc="/assets/Robotics/banner.jpeg"
        imageAlt="Liam Walker Robotics"
        textClassName="gradient-panel no-radius"
        textStyle={{ textAlign: 'center' }}
      >
        <div className="split-feature-copy home-robotics-copy" style={{ maxWidth: 520, margin: '0 auto' }}>
          <h2 className="title-xl">FIRST Robotics</h2>
          <p>My experience on Team #10809 Crow Force</p>
          <Link className="button light" to="/2023-24-season">
            Learn More
          </Link>
        </div>
      </SplitSection>

      
    </div>
  )
}
