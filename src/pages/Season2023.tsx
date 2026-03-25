import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import AwardGrid, { type AwardItem } from '../components/AwardGrid'
import Gallery from '../components/Gallery'

const robotPhotos = [
  '/assets/Robotics/2023/Robot/FTC1.jpeg',
  '/assets/Robotics/2023/Robot/FTC2.jpeg',
  '/assets/Robotics/2023/Robot/FTC3.jpeg',
  '/assets/Robotics/2023/Robot/FTC4.jpeg',
  '/assets/Robotics/2023/Robot/FTC5.jpeg',
  '/assets/Robotics/2023/Robot/FTC6.jpeg',
  '/assets/Robotics/2023/Robot/FTC7.jpeg',
  '/assets/Robotics/2023/Robot/FTC8.jpeg',
  '/assets/Robotics/2023/Robot/FTC9.jpeg',
]

const interleaguePhotos = [
  '/assets/Robotics/2023/InterleagueB/FTC1.jpeg',
  '/assets/Robotics/2023/InterleagueB/FTC2.jpeg',
  '/assets/Robotics/2023/InterleagueB/FTC3.jpeg',
  '/assets/Robotics/2023/InterleagueB/FTC4.jpeg',
  '/assets/Robotics/2023/InterleagueB/FTC5.jpeg',
  '/assets/Robotics/2023/InterleagueB/FTC6.jpeg',
  '/assets/Robotics/2023/InterleagueB/FTC7.jpeg',
  '/assets/Robotics/2023/InterleagueB/FTC8.jpeg',
  '/assets/Robotics/2023/InterleagueB/FTC9.jpeg',
]

const regionalPhotos = [
  '/assets/Robotics/2023/Regionals/FTC1.jpeg',
  '/assets/Robotics/2023/Regionals/FTC2.jpg',
  '/assets/Robotics/2023/Regionals/FTC3.jpeg',
  '/assets/Robotics/2023/Regionals/FTC4.jpg',
  '/assets/Robotics/2023/Regionals/FTC5.jpg',
  '/assets/Robotics/2023/Regionals/FTC6.jpg',
  '/assets/Robotics/2023/Regionals/FTC7.jpg',
  '/assets/Robotics/2023/Regionals/FTC8.jpg',
  '/assets/Robotics/2023/Regionals/FTC9.jpeg',
]

const modularSlides = [
  {
    title: 'Chassis',
    image: '/assets/Robotics/2023/Modular/Chassis.jpeg',
    description: (
      <>
        <a href="/2022-23-season" target="_blank" rel="noreferrer">
          Last season
        </a>
        , our cube-shaped chassis made repairs harder and raised the center of mass. This season&apos;s
        juggernaut-style chassis is lower, more stable, and much easier to service.
      </>
    ),
  },
  {
    title: 'Arm',
    image: '/assets/Robotics/2023/Modular/Arm.jpeg',
    description:
      'We wanted an arm with wide range, speed, and accuracy. An excavator-inspired triple-jointed design gave us flexible movement for intake, scoring, and hanging.',
  },
  {
    title: 'Intake',
    image: '/assets/Robotics/2023/Modular/Intake.jpeg',
    description:
      'The intake ramp guides pixels into the robot one at a time. After testing different lengths and angles, we tuned it to feed pixels cleanly into the bed so the claw can grab two at once.',
  },
  {
    title: 'Claw',
    image: '/assets/Robotics/2023/Modular/Claw.jpeg',
    description:
      'The claw holds pixels horizontally for easier placement on the backboard. It uses one servo, is 3D printed, and improved on earlier versions that had less wrist movement.',
  },
  {
    title: 'Drone Launcher',
    image: '/assets/Robotics/2023/Modular/DroneLauncher.jpeg',
    description:
      'The drone launcher uses a simple rubber-band design in a U-channel. After early collisions knocked it out of place, we added extra protection before later competitions.',
  },
]

const interleagueAwards: AwardItem[] = [
  {
    title: 'Connect',
    placement: '2nd Place',
    description: 'Recognizes the team that builds strong connections with its local STEM community and grows support for FIRST.',
    icon: 'handshake',
  },
  {
    title: 'Control',
    placement: '2nd Place',
    description: 'Recognizes strong use of sensors, software, and reliable control systems to improve robot performance.',
    icon: 'cpu',
  },
  {
    title: 'Design',
    placement: '2nd Place',
    description: 'Recognizes a robot that combines strong function with a clean, thoughtful design.',
    icon: 'ruler',
  },
  {
    title: 'Innovate',
    placement: '2nd Place',
    description: 'Recognizes a creative and effective design solution for a specific game challenge.',
    icon: 'lightbulb',
  },
  {
    title: 'Inspire',
    placement: '1st Place',
    description: 'Recognizes the team that best represents the spirit of FIRST through teamwork, outreach, and overall excellence.',
    icon: 'star',
  },
  {
    title: 'Motivate',
    placement: '2nd Place',
    description: 'Recognizes the team that best shares the culture and enthusiasm of FIRST in its school and community.',
    icon: 'megaphone',
  },
  {
    title: 'Think',
    placement: '3rd Place',
    description: 'Recognizes the team whose portfolio best shows its engineering design journey.',
    icon: 'file',
  },
]

const regionalAwards: AwardItem[] = [
  {
    title: 'Design',
    placement: '1st Place',
    description: 'Recognizes a robot that combines strong function with a clean, thoughtful design.',
    icon: 'ruler',
  },
]

export default function Season2023() {
  const gradient = 'linear-gradient(315deg, rgb(0,0,0) 0%, rgb(255,0,0) 100%)'
  const [modularSlideIndex, setModularSlideIndex] = useState(0)
  const modularSlideCount = modularSlides.length

  const moveModularSlide = (direction: number) => {
    setModularSlideIndex((prev) => (prev + direction + modularSlideCount) % modularSlideCount)
  }

  return (
    <div className="ftc-page">
      <section
        className="cover"
        style={{
          background: gradient,
          minHeight: '45vh',
        }}
      >
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="cover-title">2023-24 Season</h1>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <h2 className="section-title">Our Robot</h2>
          <p className="section-copy">
            We designed the robot in Fusion 360 around a modular system so the chassis, arm, and intake could each be
            improved without rebuilding everything. Compared with last season, the new intake and outtake run through
            the full robot, sort two pixels into predictable positions, and give our drivers more control. We also
            replaced the linear slides with a triple-jointed arm for better floor pickup, faster scoring, and a
            stronger hanging setup.
          </p>
        </div>
        <div className="container wide">
          <Gallery images={robotPhotos} alt="2023-24 robot" enableLightbox={false} />
        </div>
      </section>

      <section className="section modular-carousel-section">
        <div className="container">
          <h2 className="section-title">Modular Systems</h2>
          <div className="concept-carousel modular-carousel">
            <button
              type="button"
              className="carousel-arrow left"
              onClick={() => moveModularSlide(-1)}
              aria-label="Previous modular system"
            >
              <ChevronLeft size={20} strokeWidth={2.25} />
            </button>
            <div className="carousel-track" style={{ transform: `translateX(-${modularSlideIndex * 100}%)` }}>
              {modularSlides.map((slide, index) => (
                <div key={slide.title} className="carousel-slide">
                  <article className="concept-slide">
                    <div className="image-frame tight concept-slide__media">
                      <img src={slide.image} alt={`${slide.title} module`} loading="lazy" decoding="async" />
                    </div>
                    <div className="concept-slide__body">
                      <span className="concept-slide__eyebrow">Module {String(index + 1).padStart(2, '0')}</span>
                      <h3>{slide.title}</h3>
                      <p>{slide.description}</p>
                    </div>
                  </article>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="carousel-arrow right"
              onClick={() => moveModularSlide(1)}
              aria-label="Next modular system"
            >
              <ChevronRight size={20} strokeWidth={2.25} />
            </button>
          </div>
          <div className="carousel-dots">
            {modularSlides.map((slide, index) => (
              <button
                type="button"
                key={slide.title}
                className={`carousel-dot ${index === modularSlideIndex ? 'active' : ''}`}
                onClick={() => setModularSlideIndex(index)}
                aria-label={`Go to ${slide.title}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <h2 className="section-title">Interleague B</h2>
          <p className="section-copy">
            Interleague B was our fourth event of the season. We finished qualification matches in first, but an early
            elimination exit cut our playoff run short. Even so, it was one of our strongest judged events, and we won
            every award, including 1st Place Inspire.
          </p>
        </div>
        <div className="container wide">
          <Gallery images={interleaguePhotos} alt="Interleague B" enableLightbox={false} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Awards Won</h2>
          <AwardGrid awards={interleagueAwards} ariaLabel="Interleague B awards" />
        </div>
      </section>

      <section
        className="cover"
        style={{
          background: gradient,
          minHeight: '50vh',
        }}
      >
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="video-frame">
            <div style={{ position: 'relative', paddingTop: '56.25%' }}>
              <iframe
                src="https://www.youtube.com/embed/ie1PQW1d8bs"
                title="Interleague Interviews"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <h2 className="section-title">Regionals</h2>
          <p className="section-copy">
            Regionals was our final event of the season. We showed promise early, but robot issues kept us out of the
            elimination rounds. Even with that setback, we earned the 1st Place Design Award.
          </p>
        </div>
        <div className="container wide">
          <Gallery images={regionalPhotos} alt="Regional competition" enableLightbox={false} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Awards Won</h2>
          <AwardGrid awards={regionalAwards} ariaLabel="2023-24 regional awards" />
        </div>
      </section>

      <section
        className="cover"
        style={{
          background: gradient,
          minHeight: '50vh',
        }}
      >
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="video-frame">
            <div style={{ position: 'relative', paddingTop: '56.25%' }}>
              <iframe
                src="https://www.youtube.com/embed/rZmrD8Gy3eU"
                title="Judging Presentation"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
