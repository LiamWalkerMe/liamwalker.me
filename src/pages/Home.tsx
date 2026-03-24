import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import DeferredBackgroundSection from '../components/DeferredBackgroundSection'
import ResponsiveImage from '../components/ResponsiveImage'
import SplitSection from '../components/SplitSection'
import { photoSections } from '../data/photography'
import { responsiveImages } from '../generated/responsiveImages'

const homeWebsiteRandomPages = [
  { label: 'This Website', to: '/website' },
  { label: 'Photography', to: '/photography' },
  { label: 'Associates Degree', to: '/miracosta' },
]

function pickRandomHomeWebsitePage() {
  return homeWebsiteRandomPages[Math.floor(Math.random() * homeWebsiteRandomPages.length)] ?? homeWebsiteRandomPages[0]
}

const homePhotographyImages = photoSections.flatMap((section) =>
  section.images.map((src, index) => ({
    id: `${section.title}-${index}`,
    src,
  }))
)

const homePhotographyRails = Array.from({ length: 3 }, (_, railIndex) =>
  homePhotographyImages.filter((_, imageIndex) => imageIndex % 3 === railIndex)
)

export default function Home() {
  const navigate = useNavigate()
  const [randomHomePage] = useState(() => pickRandomHomeWebsitePage())

  const handleRandomWebsiteClick = () => {
    navigate(randomHomePage.to)
  }

  return (
    <div className="page-stack page-stack--home">
      <section className="hero hero--home page-hero-under-header">
        <div className="container hero-home">
          <div className="hero-home__copy fade-in">
            <p className="hero-subtitle hero-home__subtitle">COMPUTER SCIENCE STUDENT AT MIRACOSTA COLLEGE</p>
            <h1 className="hero-title hero-home__title">liamwalker.me</h1>
            <div className="hero-home__actions">
              <button
                type="button"
                className="button hero-home__button"
                onClick={handleRandomWebsiteClick}
              >
                View {randomHomePage.label}
              </button>
              <a
                className="button hero-home__button hero-home__button--ghost"
                href="/LiamWalkerResume.pdf"
                target="_blank"
                rel="noreferrer"
                aria-label="View resume, opens in a new tab"
              >
                View Resume
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
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

      <section className="home-photography-promo page-stack-gap-before">
        <div className="container home-photography-promo__inner">
          <div className="home-photography-promo__copy fade-in">
            <h2 className="home-photography-promo__title">Photography</h2>
            <p className="home-photography-promo__subtitle">My Creative Outlet</p>
            <Link className="button home-photography-promo__button" to="/photography">
              Learn More
            </Link>
          </div>

          <div className="home-photography-promo__rail-wrap fade-in" aria-hidden="true">
            <div className="home-photography-promo__rail-stack">
              {homePhotographyRails.map((railImages, railIndex) => (
                <div
                  key={`rail-${railIndex}`}
                  className={`home-photography-promo__rail-viewport ${
                    railIndex === 1 ? 'home-photography-promo__rail-viewport--reverse' : ''
                  }`}
                >
                  <div className="home-photography-promo__rail-track">
                    <div className="home-photography-promo__rail-group">
                      {railImages.map((image) => (
                        <div key={image.id} className="home-photography-promo__rail-card">
                          <img src={image.src} alt="" loading="lazy" decoding="async" />
                        </div>
                      ))}
                    </div>

                    <div className="home-photography-promo__rail-group home-photography-promo__rail-group--duplicate">
                      {railImages.map((image) => (
                        <div key={`duplicate-${image.id}`} className="home-photography-promo__rail-card">
                          <img src={image.src} alt="" loading="lazy" decoding="async" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
