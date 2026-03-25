import AwardGrid, { type AwardItem } from '../components/AwardGrid'
import Gallery from '../components/Gallery'
import { season2022Photos } from '../data/robotics'

const leagueAwards: AwardItem[] = [
  {
    title: 'Winning Alliance',
    placement: '1st Place',
    description: 'Given to the alliance that wins the final match.',
    icon: 'trophy',
  },
]

const regionalAwards: AwardItem[] = [
  {
    title: 'No Awards',
    placement: 'Regionals',
    description: 'No awards were won at regionals.',
    icon: 'minus',
  },
]

export default function Season2022() {
  return (
    <div className="ftc-page">
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
            src="/assets/Robotics/2022/Robot.jpeg"
            alt="2022-23 Robot"
            className="season-hero-image"
          />
        </div>
        <div className="container">
          <p className="section-copy">
            We explored three chassis concepts built around a front gripper, linear slides, and protective side plates.
            Each design kept the wheels and motors inside the frame, used bevel gears for compact packaging and better
            control, and focused on precise movement. We chose clear polycarbonate for the side plates because it is
            strong, affordable, and had already worked well for Crow Force in past seasons.
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
                loading="lazy"
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
          <AwardGrid awards={leagueAwards} ariaLabel="League Champ awards" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="section-subtitle">Regionals</p>
          <AwardGrid awards={regionalAwards} ariaLabel="2022-23 regional awards" />
        </div>
      </section>
    </div>
  )
}
