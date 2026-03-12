import { useEffect, useRef, useState } from 'react'
import { Maximize2, X } from 'lucide-react'

const introSections = [
  {
    title: 'Engineering',
    text: 'This project helped us learn how to use the engineering design process to create a project.',
    image: '/assets/2023/12/IMG_5636-Large.jpeg',
  },
  {
    title: 'Electronics',
    text:
      'Our project required the use of electronic components, which can be hard to work with. We learned how to combine an Arduino, motor controller, motor, ac/dc converter, and a bluetooth module to create our product.',
    image: '/assets/2023/12/IMG_5686-Large.jpeg',
    reverse: true,
  },
  {
    title: 'Design',
    text:
      'The design of our product had to work with existing stove designs, we did many measurements and tests to ensure that our product could fit into 5 other stoves.',
    image: '/assets/2023/12/IMG_5674-Large.jpeg',
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
    image: '/assets/2024/03/ProofOfConcept.jpeg',
    text:
      'Our first step was to create our proof of concept. We originally thought that a motor system to shut off the knob could work with a gas flow meter. After talking with our mentor, we realized that we didn’t need a flow meter to show us gas was flowing because we could assume that it was when the knob turned. We decided to take our project in a new direction and work with heat rather than gas flow.',
  },
  {
    title: 'Our Stove',
    image: '/assets/2024/03/Stove.jpeg',
    text:
      'After lots of calling around and trips to recycling yards, we found our beloved stove. With the help of Rob from Appliance Recycler, we were able to get our stove for free!',
  },
  {
    title: 'Modifications',
    image: '/assets/2024/03/Modifications.jpeg',
    text:
      'As you all can see, it has faced a few modifications from its original state, to how it is today. All of these modifications were done to improve aesthetics, increase ease in transportation, and figure out how the whole thing works.',
  },
  {
    title: 'Gears',
    image: '/assets/2024/03/GearRatio.jpeg',
    text:
      'In order to make our system work with a motor, we needed some gears. We designed gears to fit around the motor and the burner valve, which connects to the knob. We originally started with a 24 tooth gear around the burner valve and 36 tooth gear around the motor, however, this created a gear ratio that was too low and required too much torque from the motor. We fixed this issue by switching the 36 tooth gear to the burner valve so less effort was required from the motor.',
  },
  {
    title: 'L - Bracket',
    image: '/assets/2024/03/Welding.jpeg',
    text:
      'The next issue we confronted was how to attach the motor next to the burner valve. We started with 3D designing a mount. Our first design was zip-tied around the gas line, however it allowed the motor to move out of place. This proved to be too fragile and easily detached. We needed a different solution that was more sturdy than 3D filament. Using the screw holes built into the motor, we realized we could attach the motor to an L-bracket and attach the bracket to the gas line with some welding. Which as you can see it didn’t turn out quite as well as we had hoped, but it still does the job!',
  },
  {
    title: 'Thermocouple',
    image: '/assets/2024/03/TempuratureSensor.jpeg',
    text:
      'Paired with the motors, the thermocouple was added by the gas nozzle so that it will be able to detect heat without exceeding the maximum temperature restriction.',
  },
  {
    title: 'Electronics',
    image: '/assets/2024/03/Wiring.jpeg',
    text:
      'Learning electronics proved to be difficult, however we were able to connect a motor controller, power supply, bluetooth module, and LED light to our Arduino. Here is everything put together, as you can see, it looks great!',
  },
  {
    title: 'Logic',
    image: '/assets/2024/03/STOVE-SOLUTIONS-FINAL-PRESENTATION-1.png',
    text:
      'When the Arduino detects the knob has been turned the Arduino grabs the current temperature, waits 10 seconds, then grabs the temperature again. If the temperature change is less than .5 degrees fahrenheit then it shuts off. If not then it stays on. With all of the parts put together, here is a video of our product working, with a heat gun to simulate fire, and compressed air to simulate gas flow:',
  },
  {
    title: 'Testing',
    image: '/assets/2024/03/Testing.jpeg',
    text:
      'We tested gas leakage by sealing a balloon over the valve post-shutdown; no inflation indicated no leaks. For specs 2, 4, 6, and 7, 5 individuals operated the stove without heat, checking for shutdown, app updates, and LED activation controlled via the app. Test 3 involved 5 users mimicking accidental knob contact to ensure immediate shutdown. For spec 5, we compared measurements with 4 other stoves, confirming compatibility with minor adjustments pre-production.',
  },
]

export default function StoveSolutions() {
  const [slideIndex, setSlideIndex] = useState(0)
  const slideCount = conceptSlides.length
  const logoVideoRef = useRef<HTMLVideoElement | null>(null)
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  useEffect(() => {
    const video = logoVideoRef.current
    if (!video) return
    const playVideo = async () => {
      try {
        await video.play()
      } catch {
        // Autoplay might be blocked; ignore.
      }
    }
    playVideo()
  }, [])

  useEffect(() => {
    if (lightboxSrc) {
      setIsLightboxOpen(false)
      const id = requestAnimationFrame(() => setIsLightboxOpen(true))
      return () => cancelAnimationFrame(id)
    }
    return undefined
  }, [lightboxSrc])

  useEffect(() => {
    if (!lightboxSrc) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsLightboxOpen(false)
        setTimeout(() => setLightboxSrc(null), 220)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKey)
    }
  }, [lightboxSrc])

  const moveSlide = (dir: number) => {
    setSlideIndex((prev) => (prev + dir + slideCount) % slideCount)
  }

  return (
    <div>
      <section className="logo-video-section">
        <div className="container">
          <video
            ref={logoVideoRef}
            className="logo-video"
            src="/assets/2024/10/LogoAnimation1.mp4"
            autoPlay
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
          <p className="logo-video-credit">By: Molly Glass, Kayla O&apos;Neal, Lilly Sweaney, and Liam Walker.</p>
        </div>
      </section>
      {introSections.map((section) => (
        <section
          key={section.title}
          className="stove-cover parallax"
          style={{ backgroundImage: `url(${section.image})` }}
        >
          <div className="stove-cover-overlay" />
          <div className={`container stove-cover-content ${section.reverse ? 'reverse' : ''}`}>
            <h1 className="stove-cover-title">{section.title}</h1>
            <p className="stove-cover-text">{section.text}</p>
          </div>
        </section>
      ))}

      <section className="section specs-section">
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

      <section className="section concept-section">
        <div className="container">
          <h2 className="section-title">From Concept to Reality</h2>
          <div className="concept-carousel">
            <button className="carousel-arrow left" onClick={() => moveSlide(-1)}>
              ‹
            </button>
            <div className="carousel-track" style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
              {conceptSlides.map((slide) => (
                <div key={slide.title} className="carousel-slide">
                  <div className="concept-slide">
                    <h3>{slide.title}</h3>
                    <div className="image-frame tight">
                      <img src={slide.image} alt={slide.title} className="stove-image" />
                      <button
                        className="lightbox-trigger"
                        onClick={() => setLightboxSrc(slide.image)}
                        aria-label="View full screen"
                      >
                        <Maximize2 size={16} />
                      </button>
                    </div>
                    <p>{slide.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="carousel-arrow right" onClick={() => moveSlide(1)}>
              ›
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

      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="video-frame">
            <div style={{ position: 'relative', paddingTop: '56.25%' }}>
              <iframe
                src="https://www.youtube.com/embed/s_jmXaB-jYE"
                title="Stove Solutions Presentation"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#0f8277' }}>
        <div className="container" style={{ textAlign: 'center', color: '#fff' }}>
          <h2 className="section-title">Our Mentor</h2>
          <div className="image-frame mentor-frame">
            <img src="/assets/2024/03/ThankYouMentor.png" alt="Our mentor" className="mentor-image stove-image" />
            <button
              className="lightbox-trigger"
              onClick={() => setLightboxSrc('/assets/2024/03/ThankYouMentor.png')}
              aria-label="View full screen"
            >
              <Maximize2 size={16} />
            </button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container about-section">
          <div className="about-copy">
            <h2 className="section-title">About Us</h2>
            <p>
              Welcome to Stove Solutions, where your safety, satisfaction, and peace of mind are our top priorities.
            </p>
            <p>Our team is a powerhouse of talent and expertise:</p>
            <p>
              💡 Molly Glass: Molly is one of our designers, driving our commitment to excellence and innovation. Her
              dedication to creating cutting-edge solutions is the important to our success.
            </p>
            <p>
              💻 Kayla O&apos;Neal: With years of experience in computer aided design (CAD), Kayla digitally designs
              elements of products before we install and test them.
            </p>
            <p>
              💡 Lilly Sweaney: Lilly brings a creative touch to our products, making sure they are both functional and
              aesthetically pleasing. She believes in enhancing your cooking space while keeping it secure.
            </p>
            <p>
              💻 Liam Walker: Liam is our coding specialist, responsible for developing our state-of-the-art monitoring
              systems.
            </p>
          </div>
          <div className="about-image image-frame fill">
            <img src="/assets/2024/03/IMG_0661.jpg" alt="Stove Solutions team" className="stove-image" />
            <button
              className="lightbox-trigger"
              onClick={() => setLightboxSrc('/assets/2024/03/IMG_0661.jpg')}
              aria-label="View full screen"
            >
              <Maximize2 size={16} />
            </button>
          </div>
        </div>
      </section>

      {lightboxSrc && (
        <div
          className={`lightbox ${isLightboxOpen ? 'open' : ''}`}
          role="dialog"
          aria-modal="true"
          onClick={() => {
            setIsLightboxOpen(false)
            setTimeout(() => setLightboxSrc(null), 220)
          }}
        >
          <button
            className="lightbox-close"
            onClick={() => {
              setIsLightboxOpen(false)
              setTimeout(() => setLightboxSrc(null), 220)
            }}
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <img src={lightboxSrc} alt="Full screen" onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </div>
  )
}
