import { Link } from 'react-router-dom'
import SplitSection from '../components/SplitSection'
import { responsiveImages } from '../generated/responsiveImages'

export default function FtcRobotics() {
  return (
    <div className="ftc-page">
      <section
        className="cover"
        style={{
          background: 'linear-gradient(315deg, rgb(40,0,0) 0%, rgb(255,0,0) 100%)',
          minHeight: '55vh',
        }}
      >
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="cover-title">FIRST Robotics</h1>
          <p className="cover-subtitle">I'm apart of team #10809 Crow Force. Learn more about my work on our team below!</p>
        </div>
      </section>

      <SplitSection
        imageSrc="/assets/Robotics/2023/banner.jpeg"
        imageAlt="Crow Force 2023-24"
        imageAsset={responsiveImages.ftc2023Banner}
        textClassName="gradient-panel no-radius"
        textStyle={{ textAlign: 'center' }}
      >
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <h2 className="title-xl">2023-24 Season</h2>
          <p>1st place Inspire award winners.</p>
          <Link className="button light" to="/2023-24-season">
            Learn More
          </Link>
        </div>
      </SplitSection>

      <SplitSection
        imageSrc="/assets/Robotics/2022/banner.jpg"
        imageAlt="Crow Force 2022-23"
        imageAsset={responsiveImages.ftc2022Banner}
        sectionStyle={{
          background: 'linear-gradient(315deg, rgb(25,0,0) 0%, rgb(220,0,0) 100%)',
          padding: 0,
        }}
        reverse={true}
        textStyle={{ color: '#fff', textAlign: 'center' }}
      >
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <h2 className="title-xl">2022-23 Season</h2>
          <p>1st year as Software Lead.</p>
          <Link className="button light" to="/2022-23-season">
            Learn More
          </Link>
        </div>
      </SplitSection>
    </div>
  )
}
