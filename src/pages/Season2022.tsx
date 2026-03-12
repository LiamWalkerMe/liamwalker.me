import Gallery from '../components/Gallery'
import VerticalTabs, { type VerticalTab } from '../components/VerticalTabs'
import { season2022Photos } from '../data/robotics'

const leagueAwards: VerticalTab[] = [
  {
    label: 'Winning Alliance',
    content: (
      <div className="vertical-tabs__content">
        <p>
          <strong>Award Placement</strong> – 1st Place
          <br />
          <br />
          <strong>Description:</strong>
          <br />
          This award is given to the winning Alliance represented in the final Match.
        </p>
      </div>
    ),
  },
]

const regionalAwards: VerticalTab[] = [
  {
    label: 'N/A',
    content: (
      <div className="vertical-tabs__content">
        <p>No Awards Won At Regionals.</p>
      </div>
    ),
  },
]

export default function Season2022() {
  return (
    <div>
      <section
        className="cover"
        style={{
          background: 'linear-gradient(315deg, rgb(0,0,0) 0%, rgb(255,0,0) 100%)',
          minHeight: '45vh',
        }}
      >
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="cover-title">2022-23 Season</h1>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Our Robot</h2>
        </div>
        <div className="container wide">
          <img
            src="/assets/2024/04/C1A590C9-E5B0-4BE4-925C-4CAC336D8119_1_201_a.jpeg"
            alt="2022-23 Robot"
            className="season-hero-image"
          />
        </div>
        <div className="container">
          <p className="section-copy">
            With the constraints of a linear-slide system with a gripper on the front, as well as a robot with two side
            plates, three initial chassis were designed. The requirements for each design were that the chassis must
            have side plates to have the wheels and motors fit inside an area where no moving components reside (other
            than the wheels). Design 1 was a long and slim chassis, Design 2 was a much shorter and much more compact
            chassis, and Design 3 was a tall chassis, with the motors mounted facing down. All of these chassis used 2:1
            bevel gear ratios connected to 19.2:1 motors, making the effective gear ratio from the motor to wheel 38.4:1,
            which increased precision. It also translated motion from one axis to perpendicular axes for the wheels, as
            this helped to position the motors in a more compact way than without gears. It was decided that clear
            polycarbonate sheets would be used for the material of the side plates because polycarbonate is a relatively
            cheap and strong option for such applications. Also, Crow Force has found success with polycarbonate in the
            past.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Season Photos</h2>
          <Gallery images={season2022Photos} alt="2022-23 season" />
        </div>
      </section>

      <section
        className="cover"
        style={{
          background: 'linear-gradient(135deg, rgb(0,0,0) 0%, rgb(255,0,0) 100%)',
          minHeight: '50vh',
        }}
      >
        <div className="container" style={{ textAlign: 'center', padding: '40px 0' }}>
          <div className="video-frame">
            <div style={{ position: 'relative', paddingTop: '56.25%' }}>
              <iframe
                src="https://www.youtube.com/embed/fnGSo_S2PHU"
                title="League Champ Livestream"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Awards Won</h2>
          <p className="section-subtitle">League Champ</p>
          <VerticalTabs idPrefix="league-champ" tabs={leagueAwards} autoRotate />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="section-subtitle">Regionals</p>
          <VerticalTabs idPrefix="regional-awards-2022" tabs={regionalAwards} />
        </div>
      </section>
    </div>
  )
}
