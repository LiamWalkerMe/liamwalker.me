import Gallery from '../components/Gallery'
import VerticalTabs, { type VerticalTab } from '../components/VerticalTabs'

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

const modularTabs: VerticalTab[] = [
  {
    label: 'Chassis',
    content: (
      <div className="vertical-tabs__content">
        <img src="/assets/Robotics/2023/Modular/Chassis.jpeg" alt="Chassis module" loading="lazy" />
        <p>
          <strong>Description:</strong>
          <br />
          <a href="/2022-23-season/" target="_blank" rel="noreferrer">
            Last season
          </a>
          , our cube-shaped chassis made repairs harder and raised the center of mass. This season’s juggernaut-style
          chassis is lower, more stable, and much easier to service.
        </p>
      </div>
    ),
  },
  {
    label: 'Arm',
    content: (
      <div className="vertical-tabs__content">
        <img
          src="/assets/Robotics/2023/Modular/Arm.jpeg"
          alt="Arm module"
          loading="lazy"
        />
        <p>
          <strong>Description:</strong>
          <br />
          We wanted an arm with wide range, speed, and accuracy. An excavator-inspired triple-jointed design gave us
          flexible movement for intake, scoring, and hanging.
        </p>
      </div>
    ),
  },
  {
    label: 'Intake',
    content: (
      <div className="vertical-tabs__content">
        <img
          src= "/assets/Robotics/2023/Modular/Intake.jpeg"
          alt="Intake module"
          loading="lazy"
        />
        <p>
          <strong>Description:</strong>
          <br />
          The intake ramp guides pixels into the robot one at a time. After testing different lengths and angles, we
          tuned it to feed pixels cleanly into the bed so the claw can grab two at once.
        </p>
      </div>
    ),
  },
  {
    label: 'Claw',
    content: (
      <div className="vertical-tabs__content">
        <img src="/assets/Robotics/2023/Modular/Claw.jpeg" alt="Claw module" loading="lazy" />
        <p>
          <strong>Description:</strong>
          <br />
          The claw holds pixels horizontally for easier placement on the backboard. It uses one servo, is 3D printed,
          and improved on earlier versions that had less wrist movement.
        </p>
      </div>
    ),
  },
  {
    label: 'Drone Launcher',
    content: (
      <div className="vertical-tabs__content">
        <img src="/assets/Robotics/2023/Modular/DroneLauncher.jpeg" alt="Drone launcher module" loading="lazy" />
        <p>
          <strong>Description:</strong>
          <br />
          The drone launcher uses a simple rubber-band design in a U-channel. After early collisions knocked it out of
          place, we added extra protection before later competitions.
        </p>
      </div>
    ),
  },
]

const interleagueAwards: VerticalTab[] = [
  {
    label: 'Connect',
    content: (
      <div className="vertical-tabs__content">
        <p>
          <strong>Award Placement</strong> – 2nd Place
          <br />
          <br />
          <strong>Description:</strong>
        </p>
        <p>
          Recognizes the team that builds strong connections with its local STEM community and grows support for FIRST.
        </p>
      </div>
    ),
  },
  {
    label: 'Control',
    content: (
      <div className="vertical-tabs__content">
        <p>
          <strong>Award Placement</strong> – 2nd Place
          <br />
          <br />
          <strong>Description:</strong>
          <br />
          Recognizes strong use of sensors, software, and reliable control systems to improve robot performance.
        </p>
      </div>
    ),
  },
  {
    label: 'Design',
    content: (
      <div className="vertical-tabs__content">
        <p>
          <strong>Award Placement</strong> – 2nd Place
          <br />
          <br />
          <strong>Description:</strong>
          <br />
          Recognizes a robot that combines strong function with a clean, thoughtful design.
        </p>
      </div>
    ),
  },
  {
    label: 'Innovate',
    content: (
      <div className="vertical-tabs__content">
        <p>
          <strong>Award Placement</strong> – 2nd Place
          <br />
          <br />
          <strong>Description:</strong>
          <br />
          Recognizes a creative and effective design solution for a specific game challenge.
        </p>
      </div>
    ),
  },
  {
    label: 'Inspire',
    content: (
      <div className="vertical-tabs__content">
        <p>
          <strong>Award Placement</strong> – 1st Place
          <br />
          <br />
          <strong>Description:</strong>
          <br />
          Recognizes the team that best represents the spirit of FIRST through teamwork, outreach, and overall
          excellence.
        </p>
      </div>
    ),
  },
  {
    label: 'Motivate',
    content: (
      <div className="vertical-tabs__content">
        <p>
          <strong>Award Placement</strong> – 2nd Place
          <br />
          <br />
          <strong>Description:</strong>
          <br />
          Recognizes the team that best shares the culture and enthusiasm of FIRST in its school and community.
        </p>
      </div>
    ),
  },
  {
    label: 'Think',
    content: (
      <div className="vertical-tabs__content">
        <p>
          <strong>Award Placement</strong> – 3rd Place
          <br />
          <br />
          <strong>Description:</strong>
          <br />
          Recognizes the team whose portfolio best shows its engineering design journey.
        </p>
      </div>
    ),
  },
]

const regionalAwards: VerticalTab[] = [
  {
    label: 'Design',
    content: (
      <div className="vertical-tabs__content">
        <p>
          <strong>Award Placement</strong> – 1st Place
          <br />
          <br />
          <strong>Description:</strong>
          <br />
          Recognizes a robot that combines strong function with a clean, thoughtful design.
        </p>
      </div>
    ),
  },
]

export default function Season2023() {
  const gradient = 'linear-gradient(315deg, rgb(0,0,0) 0%, rgb(255,0,0) 100%)'

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
          <Gallery images={robotPhotos} alt="2023-24 robot" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Modular Systems</h2>
          <VerticalTabs idPrefix="modular" tabs={modularTabs} />
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
          <Gallery images={interleaguePhotos} alt="Interleague B" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Awards Won</h2>
          <VerticalTabs idPrefix="interleague-awards" tabs={interleagueAwards} />
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
          <Gallery images={regionalPhotos} alt="Regional competition" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Awards Won</h2>
          <VerticalTabs idPrefix="regional-awards" tabs={regionalAwards} />
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
