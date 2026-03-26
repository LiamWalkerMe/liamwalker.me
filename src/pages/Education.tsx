import { Link } from 'react-router-dom'
import SplitSection from '../components/SplitSection'
import { responsiveImages } from '../generated/responsiveImages'

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
          backgroundImage: 'url(/assets/StoveSolutions/teamphoto-1600.jpg)',
        }}
      >
        <div className="container" style={{ textAlign: 'center' }}>
          <img
            src="/assets/StoveSolutions/banner.png"
            alt="Stove Solutions"
            style={{maxWidth: 1000, margin: '0 auto 20px' }}
          />
          <p>An Engineering Design and Development Course Project</p>
          <Link className="button accent" to="/stovesolutions" reloadDocument>
            Learn More
          </Link>
        </div>
      </section>

      <SplitSection
        imageSrc="/assets/Robotics/banner.jpeg"
        imageAlt="FIRST Robotics"
        imageAsset={responsiveImages.homeRoboticsBanner}
        textClassName="gradient-panel no-radius"
        textStyle={{ textAlign: 'center' }}
      >
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <h2 className="title-xl">FIRST Robotics</h2>
          <p>My experience on Team #10809 Crow Force</p>
          <Link className="button light" to="/2023-24-season" reloadDocument>
            Learn More
          </Link>
        </div>
      </SplitSection>

      <SplitSection
        imageSrc="/assets/Website/FrontPage.png"
        imageAlt="Website preview"
        sectionStyle={{ background: '#f1f1f1' }}
        imageFit="contain"
        imageWrapperStyle={{
          padding: 'clamp(24px, 6vw, 40px) clamp(20px, 5vw, 36px)',
        }}
        imageStyle={{
          objectPosition: 'center',
          filter: 'drop-shadow(0 20px 32px rgba(15, 17, 21, 0.16))',
        }}
        reverse={true}
        textStyle={{ textAlign: 'center' }}
      >
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <h2 className="title-xl">This Website!</h2>
          <p>Learn More About the Creation of This Website!</p>
          <Link className="button" to="/website" reloadDocument>
            Learn More
          </Link>
        </div>
      </SplitSection>
    </div>                                                                                                                                                                                           
  )
}
