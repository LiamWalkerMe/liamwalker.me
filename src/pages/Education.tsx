import { Link } from 'react-router-dom'
import SplitSection from '../components/SplitSection'

export default function Education() {
  return (
    <div>
      <section className="title-hero">
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="hero-title">Educational Projects</h1>
        </div>
      </section>

      <section
        className="cover bg-accent fixed"
        style={{
          backgroundImage: 'url(/assets/StoveSolutions/teamphoto.jpg)',
        }}
      >
        <div className="container" style={{ textAlign: 'center' }}>
          <img
            src="/assets/StoveSolutions/banner.png"
            alt="Stove Solutions"
            style={{maxWidth: 1000, margin: '0 auto 20px' }}
          />
          <p>An Engineering Design and Development Course Project</p>
          <Link className="button accent" to="/stovesolutions">
            Learn More
          </Link>
        </div>
      </section>

      <SplitSection
        imageSrc="/assets/Robotics/banner.jpeg"
        imageAlt="FIRST Robotics"
        textClassName="gradient-panel no-radius"
        textStyle={{ textAlign: 'center' }}
      >
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <h2 className="title-xl">FIRST Robotics</h2>
          <p>My experience on Team #10809 Crow Force</p>
          <Link className="button light" to="/ftc-robotics">
            Learn More
          </Link>
        </div>
      </SplitSection>

      <SplitSection
        imageSrc="/assets/Website/FrontPage.png"
        imageAlt="Website preview"
        sectionStyle={{ background: '#f1f1f1' }}
        reverse={true}
        textStyle={{ textAlign: 'center' }}
      >
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <h2 className="title-xl">This Website!</h2>
          <p>Learn More About the Creation of This Website!</p>
          <Link className="button" to="/website">
            Learn More
          </Link>
        </div>
      </SplitSection>
    </div>                                                                                                                                                                                           
  )
}
