import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import Lightbox from '../components/Lightbox'
import ResponsiveImage from '../components/ResponsiveImage'
import { responsiveImages } from '../generated/responsiveImages'
import { useSectionParallax } from '../lib/useSectionParallax'

const introSections = [
  {
    title: 'Engineering',
    text: 'This project helped us learn how to use the engineering design process to create a project.',
    image: '/assets/StoveSolutions/Intro/Molly.jpeg',
  },
  {
    title: 'Electronics',
    text:
      'Our project required the use of electronic components, which can be hard to work with. We learned how to combine an Arduino, motor controller, motor, ac/dc converter, and a bluetooth module to create our product.',
    image: '/assets/StoveSolutions/Intro/Liam.jpeg',
    reverse: true,
  },
  {
    title: 'Design',
    text:
      'The design of our product had to work with existing stove designs, we did many measurements and tests to ensure that our product could fit into 5 other stoves.',
    image: '/assets/StoveSolutions/Intro/KaylaLilly.jpeg',
  },
]

const designSpecs = [
  {
    title: 'Less Than 800 ppm of Gas',
    detail: 'Through regular use of the product, less than 800 parts per million of gas will leak.',
  },
  {
    title: 'Emergency Shut Off',
    detail: 'Our product will automatically shut off when gas levels exceed safe amounts.',
  },
  {
    title: 'Young Child/Pet-Proof',
    detail: 'Our product will render the stove young child/pet-proof so it is safe to leave unattended with young kids and pets.',
  },
  {
    title: 'App That Monitors the Stove Status',
    detail:
      'There will be an app that monitors the status of the gas flowing to the stove and allows the user to shut off the stove.',
  },
  {
    title: 'Added to Stoves From Production Stage',
    detail:
      'The device will be a product that can be added to stoves from the production stage, removing any interaction from stove users.',
  },
  {
    title: 'LED Indicator',
    detail: 'The product will have an LED indicator that alerts the user that gas has been shut off.',
  },
  {
    title: 'Notify the User After it Has Been Shut Off',
    detail: 'The stove will notify the user after it has been shut off and the user can easily reset it.',
  },
]

const conceptSlides = [
  {
    title: 'Proof of Concept',
    image: '/assets/StoveSolutions/Carousel/ProofOfConcept.jpeg',
    text:
      'We started with a gas-flow idea, then simplified the design after mentor feedback. That shift led us to focus on heat detection instead.',
  },
  {
    title: 'Our Stove',
    image: '/assets/StoveSolutions/Carousel/Stove.jpeg',
    text:
      'After a lot of calls and recycling-yard visits, we found a free stove through Appliance Recycler. It became the base for our full prototype.',
  },
  {
    title: 'Modifications',
    image: '/assets/StoveSolutions/Carousel/Modifications.jpeg',
    text:
      'We reworked the stove to improve the look, make it easier to move, and better understand how the internals fit together.',
  },
  {
    title: 'Gears',
    image: '/assets/StoveSolutions/Carousel/GearRatio.jpeg',
    text:
      'We designed custom gears for the motor and burner valve. After testing, we flipped the gear sizes to get better torque with less strain on the motor.',
  },
  {
    title: 'L - Bracket',
    image: '/assets/StoveSolutions/Carousel/Welding.jpeg',
    text:
      'Our first 3D-printed mount shifted too much, so we replaced it with a welded L-bracket. That gave the motor a sturdier, more reliable mount.',
  },
  {
    title: 'Thermocouple',
    image: '/assets/StoveSolutions/Carousel/TempuratureSensor.jpeg',
    text:
      'We mounted a thermocouple near the gas nozzle so the system could sense heat quickly without exceeding its temperature limit.',
  },
  {
    title: 'Electronics',
    image: '/assets/StoveSolutions/Carousel/Wiring.jpeg',
    text:
      'We connected the Arduino, motor controller, power supply, Bluetooth module, and LED into one working system ready for testing.',
  },
  {
    title: 'Logic',
    image: '/assets/StoveSolutions/Carousel/Flowchart.png',
    text:
      'When the knob turns, the Arduino checks how much the temperature changes over 10 seconds. If the burner is not heating up, the system shuts the stove off.',
  },
  {
    title: 'Testing',
    image: '/assets/StoveSolutions/Carousel/Testing.jpeg',
    text:
      'We tested for gas leaks, shutdown response, app updates, LED alerts, and fit on other stoves. The prototype met the main goals with only minor adjustments needed.',
  },
]

const aboutTeamMembers = [
  {
    initial: 'M',
    name: 'Molly Glass',
    role: 'Design Lead',
    detail: 'Molly helps lead the product direction and keeps the design practical.',
  },
  {
    initial: 'K',
    name: "Kayla O'Neal",
    role: 'CAD & Modeling',
    detail: 'Kayla builds the CAD models that guide fit checks and hardware changes.',
  },
  {
    initial: 'L',
    name: 'Lilly Sweaney',
    role: 'Product Design',
    detail: 'Lilly helps shape the product so it stays clear, usable, and visually clean.',
  },
  {
    initial: 'LW',
    name: 'Liam Walker',
    role: 'Software & Controls',
    detail: 'Liam develops the monitoring logic and control system behind the prototype.',
  },
]

const STOVE_PARALLAX_OFFSET = 92
const STOVE_PARALLAX_SCALE = 1.17

export default function StoveSolutions() {
  const [slideIndex, setSlideIndex] = useState(0)
  const slideCount = conceptSlides.length
  const logoVideoRef = useRef<HTMLVideoElement | null>(null)
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null)
  const [isPageContentRevealed, setIsPageContentRevealed] = useState(false)
  const [isLogoVideoVisible, setIsLogoVideoVisible] = useState(false)
  const { sectionRefs: introSectionRefs, offsets: introSectionOffsets } = useSectionParallax(
    introSections.length,
    STOVE_PARALLAX_OFFSET
  )

  useEffect(() => {
    const video = logoVideoRef.current
    if (!video) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fadeInDurationMs = prefersReducedMotion ? 0 : 800

    const playVideo = async () => {
      try {
        await video.play()
      } catch {
        // Autoplay might be blocked; ignore.
      }
    }

    const revealId = requestAnimationFrame(() => setIsLogoVideoVisible(true))
    const playTimeoutId = window.setTimeout(() => {
      playVideo()
    }, fadeInDurationMs)

    return () => {
      cancelAnimationFrame(revealId)
      window.clearTimeout(playTimeoutId)
    }
  }, [])

  useEffect(() => {
    let isRevealed = false

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' ' || event.key === 'End') {
        revealPageContent()
      }
    }

    const removeRevealListeners = () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('wheel', revealPageContent)
      window.removeEventListener('touchmove', revealPageContent)
      window.removeEventListener('keydown', handleKeyDown)
    }

    const revealPageContent = () => {
      if (isRevealed) return
      isRevealed = true
      window.clearTimeout(timeoutId)
      removeRevealListeners()
      setIsPageContentRevealed(true)
    }

    const handleScroll = () => {
      if (window.scrollY > 4) {
        revealPageContent()
      }
    }

    const timeoutId = window.setTimeout(revealPageContent, 1500)

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('wheel', revealPageContent, { passive: true })
    window.addEventListener('touchmove', revealPageContent, { passive: true })
    window.addEventListener('keydown', handleKeyDown)
    handleScroll()

    return () => {
      window.clearTimeout(timeoutId)
      removeRevealListeners()
    }
  }, [])

  const moveSlide = (dir: number) => {
    setSlideIndex((prev) => (prev + dir + slideCount) % slideCount)
  }

  const pageContentRevealClass = `stove-page-section ${isPageContentRevealed ? 'is-visible' : ''}`

  return (
    <div className="stove-page">
      <section className="logo-video-section">
        <div className="container">
          <video
            ref={logoVideoRef}
            className={`logo-video ${isLogoVideoVisible ? 'is-visible' : ''}`}
            src="/assets/StoveSolutions/banner.mp4"
            muted
            playsInline
            controls={false}
            onEnded={(event) => {
              const video = event.currentTarget
              video.pause()
              if (video.duration) {
                video.currentTime = Math.max(0, video.duration - 0.01)
              }
            }}
          />
          <p className="logo-video-credit">BY: MOLLY GLASS, KAYLA O&apos;NEAL, LILLY SWEANEY, AND LIAM WALKER.</p>
        </div>
      </section>
      {introSections.map((section, index) => (
        <section
          key={section.title}
          ref={(node) => {
            introSectionRefs.current[index] = node
          }}
          className={`stove-cover fade-in ${pageContentRevealClass}`}
        >
          <div
            className="stove-cover-media"
            style={{
              backgroundImage: `url(${section.image})`,
              transform: `translate3d(0, ${introSectionOffsets[index] ?? 0}px, 0) scale(${STOVE_PARALLAX_SCALE})`,
            }}
            aria-hidden="true"
          />
          <div className="stove-cover-overlay" />
          <div className={`container stove-cover-content ${section.reverse ? 'reverse' : ''}`}>
            <h1 className="stove-cover-title">{section.title}</h1>
            <p className="stove-cover-text">{section.text}</p>
          </div>
        </section>
      ))}

      <section className={`section specs-section ${pageContentRevealClass}`}>
        <div className="container">
          <h2 className="section-title">Design Specifications</h2>
          <div className="spec-list">
            {designSpecs.map((spec, index) => (
              <div key={spec.title} className="spec-item">
                <div className="spec-circle">{index + 1}</div>
                <div className="spec-copy">
                  <h3>{spec.title}</h3>
                  <p>{spec.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`section concept-section ${pageContentRevealClass}`}>
        <div className="container">
          <h2 className="section-title">From Concept to Reality</h2>
          <div className="concept-carousel">
            <button className="carousel-arrow left" onClick={() => moveSlide(-1)} aria-label="Previous slide">
              <ChevronLeft size={20} strokeWidth={2.25} />
            </button>
            <div className="carousel-track" style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
              {conceptSlides.map((slide, index) => (
                <div key={slide.title} className="carousel-slide">
                  <article className="concept-slide">
                    <div className="image-frame tight concept-slide__media">
                      <img src={slide.image} alt={slide.title} className="stove-image" loading="lazy" decoding="async" />
                      <button
                        className="lightbox-trigger"
                        type="button"
                        onClick={() => setLightboxImage({ src: slide.image, alt: slide.title })}
                        aria-label="View full screen"
                      >
                        <Maximize2 size={16} />
                      </button>
                    </div>
                    <div className="concept-slide__body">
                      <span className="concept-slide__eyebrow">
                        Step {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3>{slide.title}</h3>
                      <p>{slide.text}</p>
                    </div>
                  </article>
                </div>
              ))}
            </div>
            <button className="carousel-arrow right" onClick={() => moveSlide(1)} aria-label="Next slide">
              <ChevronRight size={20} strokeWidth={2.25} />
            </button>
          </div>
          <div className="carousel-dots">
            {conceptSlides.map((_, index) => (
              <button
                key={`concept-dot-${index}`}
                className={`carousel-dot ${index === slideIndex ? 'active' : ''}`}
                onClick={() => setSlideIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${pageContentRevealClass}`}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="video-frame">
            <div style={{ position: 'relative', paddingTop: '56.25%' }}>
              <iframe
                src="https://www.youtube.com/embed/s_jmXaB-jYE"
                title="Stove Solutions Presentation"
                loading="lazy"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${pageContentRevealClass}`} style={{ background: '#0f8277' }}>
        <div className="container" style={{ textAlign: 'center', color: '#fff' }}>
          <h2 className="section-title">Our Mentor</h2>
          <div className="image-frame mentor-frame">
            <img
              src="/assets/StoveSolutions/Mentor/ThankYouMentor.png"
              alt="Our mentor"
              className="mentor-image stove-image"
              loading="lazy"
              decoding="async"
            />
            <button
              className="lightbox-trigger"
              type="button"
              onClick={() =>
                setLightboxImage({
                  src: '/assets/StoveSolutions/Mentor/ThankYouMentor.png',
                  alt: 'Our mentor',
                })
              }
              aria-label="View full screen"
            >
              <Maximize2 size={16} />
            </button>
          </div>
        </div>
      </section>

      <section className={`section about-section-wrap ${pageContentRevealClass}`}>
        <div className="container about-section-shell">
          <div className="about-section">
            <div className="about-copy">
              <span className="about-eyebrow">About Us</span>
              <h2 className="section-title">A student team building safer stove technology.</h2>
              <p className="about-lede">
                Stove Solutions combines product design, CAD, electronics, and software to create a gas stove safety
                system that feels practical in a real kitchen.
              </p>
              <p className="about-supporting-copy">
                From early concepts to testing, our team focused on making the system reliable, approachable, and
                ready for everyday use.
              </p>
            </div>

            <div className="about-image-wrap">
              <div className="about-image image-frame fill">
                <ResponsiveImage
                  asset={responsiveImages.stoveTeamPhoto}
                  alt="Stove Solutions team"
                  pictureStyle={{ width: '100%', height: '100%' }}
                  className="stove-image"
                  sizes="(max-width: 900px) 100vw, 50vw"
                  loading="lazy"
                  decoding="async"
                />
                <button
                  className="lightbox-trigger"
                  type="button"
                  onClick={() =>
                    setLightboxImage({
                      src: '/assets/StoveSolutions/teamphoto.jpg',
                      alt: 'Stove Solutions team',
                    })
                  }
                  aria-label="View full screen"
                >
                  <Maximize2 size={16} />
                </button>
              </div>
              <div className="about-image-meta">
                <p className="about-image-caption">The Stove Solutions team</p>
                <div className="about-image-tags" aria-label="Team disciplines">
                  <span className="about-image-tag">Design</span>
                  <span className="about-image-tag">CAD</span>
                  <span className="about-image-tag">Electronics</span>
                  <span className="about-image-tag">Software</span>
                </div>
              </div>
            </div>
          </div>

          <div className="about-team-grid">
            {aboutTeamMembers.map((member) => (
              <article key={member.name} className="about-member-card">
                <div className="about-member-mark" aria-hidden="true">
                  {member.initial}
                </div>
                <div className="about-member-copy">
                  <span className="about-member-role">{member.role}</span>
                  <h3>{member.name}</h3>
                  <p>{member.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {lightboxImage && (
        <Lightbox src={lightboxImage.src} alt={lightboxImage.alt} onClose={() => setLightboxImage(null)} />
      )}
    </div>
  )
}
