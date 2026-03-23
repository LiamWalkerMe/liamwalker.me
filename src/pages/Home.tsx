import { Link } from 'react-router-dom'
import DeferredBackgroundSection from '../components/DeferredBackgroundSection'
import ResponsiveImage from '../components/ResponsiveImage'
import SplitSection from '../components/SplitSection'
import { responsiveImages } from '../generated/responsiveImages'

export default function Home() {
  return (
    <div className="page-stack page-stack--home">
      <section className="hero hero--home page-hero-under-header">
        <div className="container hero-home">
          <div className="hero-home__copy fade-in">
            <p className="hero-subtitle hero-home__subtitle">Computer Science Student at MiraCosta College</p>
            <h1 className="hero-title hero-home__title">liamwalker.me</h1>
            <Link className="button hero-home__button" to="/website">
              Learn More About This Website
            </Link>
          </div>
          <div className="hero-portrait hero-home__portrait fade-in">
            <ResponsiveImage
              asset={responsiveImages.heroProfile}
              alt="Liam Walker"
              sizes="(max-width: 900px) calc(100vw - 40px), 480px"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              pictureStyle={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </section>

      <DeferredBackgroundSection
        className="cover home-photography-cover page-stack-gap-before"
        backgroundImageUrl="/assets/Photography/Banner-1600.jpg"
        style={{
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
      </DeferredBackgroundSection>

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
                style={{ backgroundImage: 'url("/assets/Website/React.png")' }}
              />
            </div>
          </div>
        </div>
      </section>

      <DeferredBackgroundSection
        className="cover bg-accent fixed home-stove-cover page-stack-gap-before"
        backgroundImageUrl="/assets/StoveSolutions/teamphoto-1600.jpg"
        style={{
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
      </DeferredBackgroundSection>

      <SplitSection
        imageSrc="/assets/Robotics/banner.jpeg"
        imageAlt="Liam Walker Robotics"
        imageAsset={responsiveImages.homeRoboticsBanner}
        sectionStyle={{ paddingBottom: 0 }}
        textClassName="gradient-panel no-radius"
        textStyle={{ textAlign: 'center' }}
        imageSizes="(max-width: 900px) 100vw, 50vw"
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
