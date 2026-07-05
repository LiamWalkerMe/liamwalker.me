import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import DeferredBackgroundSection from '../components/DeferredBackgroundSection'
import ResponsiveImage from '../components/ResponsiveImage'
import SplitSection from '../components/SplitSection'
import { isPageUnderConstruction } from '../config/siteFlags'
import { photoSections } from '../data/photography'
import { homePhotographyImageAssets } from '../generated/homePhotographyImages'
import { responsiveImages } from '../generated/responsiveImages'

type HomePhotoOrientation = 'portrait' | 'landscape'

const homePhotographySlotOrientations: HomePhotoOrientation[] = ['landscape', 'portrait', 'landscape', 'landscape', 'portrait']
const homePhotographyAssetByOriginalSrc = new Map<string, (typeof homePhotographyImageAssets)[number]>(
  homePhotographyImageAssets.map((asset) => [asset.originalSrc, asset])
)

const homePhotographyImages = photoSections.flatMap((section) =>
  section.images.map((src, index) => ({
    id: `${section.title}-${index}`,
    src: homePhotographyAssetByOriginalSrc.get(src)?.thumbSrc ?? src,
    title: section.title,
    orientation: homePhotographyAssetByOriginalSrc.get(src)?.orientation ?? 'landscape',
  }))
)

const homePhotographyCycleMs = 3600
const homePhotographyImagesByOrientation = {
  landscape: homePhotographyImages.filter((image) => image.orientation === 'landscape'),
  portrait: homePhotographyImages.filter((image) => image.orientation === 'portrait'),
}
const homePhotographyPreloadWarmupCount = 16

type HomePhotographyImage = (typeof homePhotographyImages)[number]

function getHomePhotographyPool(orientation: HomePhotoOrientation) {
  const orientationPool = homePhotographyImagesByOrientation[orientation]
  return orientationPool.length ? orientationPool : homePhotographyImages
}

function getInitialHomePhotographyFeature() {
  return homePhotographySlotOrientations.map((orientation, slot) => {
    const pool = getHomePhotographyPool(orientation)
    return pool[slot % pool.length]
  }).filter(Boolean)
}

function getRandomHomePhotographyFeature(previousFeature: HomePhotographyImage[] = []) {
  const usedImageIds = new Set<string>()
  const previousImageIds = new Set(previousFeature.map((image) => image.id))

  return homePhotographySlotOrientations.map((orientation) => {
    const pool = getHomePhotographyPool(orientation)
    const unusedFreshImages = pool.filter((image) => !usedImageIds.has(image.id) && !previousImageIds.has(image.id))
    const unusedImages = pool.filter((image) => !usedImageIds.has(image.id))
    const candidates = unusedFreshImages.length ? unusedFreshImages : unusedImages.length ? unusedImages : pool
    const image = candidates[Math.floor(Math.random() * candidates.length)]

    usedImageIds.add(image.id)
    return image
  })
}

function preloadHomePhotographyFeature(feature: HomePhotographyImage[]) {
  return Promise.all(
    feature.map(
      (image) =>
        new Promise<void>((resolve) => {
          const preloadImage = new Image()

          preloadImage.onload = () => {
            const decode = preloadImage.decode?.()
            if (decode) {
              decode.then(() => resolve()).catch(() => resolve())
              return
            }

            resolve()
          }
          preloadImage.onerror = () => resolve()
          preloadImage.src = image.src

          if (preloadImage.complete) {
            resolve()
          }
        })
    )
  )
}

function HomePhotographyCard({
  image,
  slot,
}: {
  image: (typeof homePhotographyImages)[number]
  slot: number
}) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <figure
      className={`home-photography-promo__photo-card home-photography-promo__photo-card--${slot} ${
        isLoaded ? 'is-loaded' : ''
      }`}
    >
      <span className="home-photography-promo__photo-glow" aria-hidden="true" />
      <img
        src={image.src}
        alt=""
        loading={slot === 0 ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={slot === 0 ? 'high' : 'auto'}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
      />
      <figcaption>{image.title}</figcaption>
    </figure>
  )
}

export default function Home() {
  const showMiracostaContent = !isPageUnderConstruction('miracosta')
  const [homePhotographyFeature, setHomePhotographyFeature] = useState(getInitialHomePhotographyFeature)

  useEffect(() => {
    homePhotographyImages.slice(0, homePhotographyPreloadWarmupCount).forEach((image) => {
      const preloadImage = new Image()
      preloadImage.src = image.src
    })
  }, [])

  useEffect(() => {
    if (homePhotographyImages.length <= 1) {
      return undefined
    }

    let isCurrent = true
    let isPreparingFeature = false
    let frameId: number | undefined

    const prepareNextFeature = () => {
      if (isPreparingFeature) {
        return
      }

      isPreparingFeature = true

      setHomePhotographyFeature((currentFeature) => {
        const nextFeature = getRandomHomePhotographyFeature(currentFeature)

        preloadHomePhotographyFeature(nextFeature).then(() => {
          if (!isCurrent) {
            return
          }

          frameId = window.requestAnimationFrame(() => {
            if (isCurrent) {
              setHomePhotographyFeature(nextFeature)
            }
          })
        }).finally(() => {
          isPreparingFeature = false
        })

        return currentFeature
      })
    }

    frameId = window.requestAnimationFrame(prepareNextFeature)

    const timer = window.setInterval(() => {
      prepareNextFeature()
    }, homePhotographyCycleMs)

    return () => {
      isCurrent = false
      if (frameId) {
        window.cancelAnimationFrame(frameId)
      }
      window.clearInterval(timer)
    }
  }, [])

  return (
    <div className="page-stack page-stack--home">
      <section className="hero hero--home page-hero-under-header">
        <div className="container hero-home">
          <div className="hero-home__copy fade-in">
            <p className="hero-subtitle hero-home__subtitle">COMPUTER SCIENCE STUDENT AT CAL POLY SAN LUIS OBISPO</p>
            <h1 className="hero-title hero-home__title">liamwalker.me</h1>
            <div className="hero-home__actions">
              {showMiracostaContent ? (
                <Link className="button hero-home__button" to="/miracosta" reloadDocument>
                  View Associate Degrees
                </Link>
              ) : null}
              <a
                className="button hero-home__button hero-home__button--ghost"
                href="/LiamWalkerResume.pdf"
                target="_blank"
                rel="noopener noreferrer"
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

      {showMiracostaContent ? (
        <section className="home-miracosta-promo page-stack-gap-before">
          <div className="container home-miracosta-promo__inner">
            <div className="home-miracosta-promo__panel home-miracosta-promo__panel--start fade-in" aria-hidden="true">
              <div className="home-miracosta-promo__panel-frame">
                <img
                  className="home-miracosta-promo__panel-image"
                  src="/assets/MiraCosta/Throwing.jpg"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            <div className="home-miracosta-promo__content fade-in">
              <p className="home-miracosta-promo__eyebrow">TRANSFER JOURNEY</p>
              <h2 className="home-miracosta-promo__title">MiraCosta</h2>
              <Link className="button home-miracosta-promo__button" to="/miracosta" reloadDocument>
                Learn More
              </Link>
            </div>

            <div className="home-miracosta-promo__panel home-miracosta-promo__panel--end fade-in" aria-hidden="true">
              <div className="home-miracosta-promo__panel-frame">
                <img
                  className="home-miracosta-promo__panel-image"
                  src="/assets/MiraCosta/WalkingTowards.jpg"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="home-website-showcase page-stack-gap-before">
        <div className="container home-website-showcase__inner">
          <div className="home-website-showcase__copy fade-in">
            <p className="home-website-showcase__eyebrow">Digital Portfolio</p>
            <h2 className="home-website-showcase__title">This Website</h2>
            <Link className="button home-website-showcase__button" to="/website" reloadDocument>
              Learn More
            </Link>
          </div>

          <div className="home-website-showcase__preview fade-in">
            <div className="home-website-showcase__frame">
              <div
                className="home-website-showcase__image"
                role="img"
                aria-label="Current website homepage preview"
                style={{ backgroundImage: 'url("/assets/Website/FrontPage.png")' }}
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="home-photography-promo page-stack-gap-before">
        <div className="container home-photography-promo__inner">
          <div className="home-photography-promo__copy fade-in">
            <p className="home-photography-promo__eyebrow">My Creative Outlet</p>
            <h2 className="home-photography-promo__title">Photography</h2>
            <Link className="button home-photography-promo__button" to="/photography" reloadDocument>
              Learn More
            </Link>
          </div>

          <div className="home-photography-promo__showcase fade-in" aria-hidden="true">
            <div className="home-photography-promo__orb home-photography-promo__orb--one" />
            <div className="home-photography-promo__orb home-photography-promo__orb--two" />
            <div className="home-photography-promo__contact-sheet">
              {homePhotographyFeature.map((image, slot) => (
                <HomePhotographyCard key={`${slot}-${image.id}`} image={image} slot={slot} />
              ))}
            </div>
          </div>
        </div>
      </section>



      <DeferredBackgroundSection
        className="home-stove-cover page-stack-gap-before"
        backgroundImageUrl="/assets/StoveSolutions/teamphoto.jpg"
        backgroundClassName="home-stove-cover__media"
        backgroundStyle={{
          backgroundPosition: 'center center',
        }}
        parallaxOffset={92}
        parallaxScale={1.17}
      >
        <div className="container home-stove-cover__content">
          <div className="home-stove-cover__copy fade-in">
            <p className="home-stove-cover__eyebrow">AN ENGINEERING DESIGN AND DEVELOPMENT COURSE PROJECT</p>
            <img
              src="/assets/StoveSolutions/banner.png"
              alt="Stove Solutions"
              className="home-stove-cover__banner"
            />
            <Link className="button accent home-stove-cover__button" to="/stovesolutions" reloadDocument>
              Learn More
            </Link>
          </div>
        </div>
      </DeferredBackgroundSection>

      <SplitSection
        imageSrc="/assets/Robotics/banner.jpeg"
        imageAlt="Liam Walker Robotics"
        imageAsset={responsiveImages.homeRoboticsBanner}
        sectionStyle={{ paddingBottom: 0 }}
        textClassName="gradient-panel no-radius home-robotics-promo__panel fade-in"
        textStyle={{ textAlign: 'center', animationDelay: '140ms' }}
        imageWrapperClassName="home-robotics-promo__media fade-in"
        imageWrapperStyle={{ animationDelay: '40ms' }}
        imageSizes="(max-width: 900px) 100vw, 50vw"
      >
        <div className="split-feature-copy home-robotics-copy" style={{ maxWidth: 520, margin: '0 auto' }}>
          <p className="home-robotics-copy__eyebrow">My experience on Team #10809 Crow Force</p>
          <h2 className="title-xl home-robotics-copy__title">FIRST Robotics</h2>
          <Link className="button light" to="/2023-24-season" reloadDocument>
            Learn More
          </Link>
        </div>
      </SplitSection>
    </div>
  )
}
