import { Link } from 'react-router-dom'
import SplitSection from '../components/SplitSection'

export default function Home() {
  return (
    <div className="page-stack page-stack--home">
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

      <section className="home-website-showcase page-stack-gap-before">
        <div className="container home-website-showcase__inner">
          <div className="home-website-showcase__copy fade-in">
            <h2 className="home-website-showcase__title">This Website</h2>
            <Link className="button home-website-showcase__button" to="/website">
              Learn More
            </Link>
          </div>

          <div className="home-website-showcase__preview fade-in">
            <div className="home-website-showcase__frame">
              <div
                className="home-website-showcase__image"
                role="img"
                aria-label="Current website homepage preview"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        className="cover bg-accent fixed home-stove-cover page-stack-gap-before"
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
        sectionStyle={{ paddingBottom: 0 }}
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
