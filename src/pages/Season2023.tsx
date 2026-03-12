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
          , our chassis resembled a cube which limited our access to wires and motors for repairs. The cube created a
          higher center of mass, causing the robot to tip over when extending linear slides. Now, with our innovative
          juggernaut design, our center of mass is lower, the robot is more stable, and wires and motors are easier to
          access for quick, convenient repairs.
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
          The main goals for our arm design are to have a wide range of motion, and be multi-functional, fast, and
          accurate. We took inspiration from an excavator design to create a triple-jointed arm.ode itself.
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
          <br />A ramp was carefully designed to align pixels as they enter the bed one at a time. The constraint of
          fitting inside the chassis encouraged us to shorten the original ramp and perform multiple tests to find the
          optimal angle for the pixels to be sent to the bed successfully. The sloped bed includes a side ramp to ensure
          the pixels fall precisely where the claw can grab two at a time.
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
          The claw grabs the pixels in a horizontal configuration allowing easy placement on the backboard. It only
          utilizes one servo and is 3D printed. Early iterations used a stationary wrist so only the bottom part was
          able to move.
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
          Using a simple design, we launch our drone with a rubber band in a U channel. During earlier competitions, it
          could be knocked out of place due to robot collisions so we added additional protections by competition 3.
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
          This judged award is given to the team that most connects with their local science, technology, engineering,
          and math (STEM) community. A true FIRST team is more than a sum of its parts and recognizes that engaging their
          local STEM community plays an essential part in their success. The recipient of this award is recognized for
          helping the community understand FIRST, the FIRST Tech Challenge, and the team itself. The team that wins the
          Connect Award actively seeks and recruits engineers and explores the opportunities available in the world of
          engineering, science, and technology. This team has a clear team plan and has identified steps to achieve
          their goals
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
          The Control Award celebrates a team that uses sensors and software to increase the robot’s functionality in
          the field. This award is given to the team that demonstrates innovative thinking to solve game challenges such
          as autonomous operation, improving mechanical systems with intelligent control, or using sensors to achieve
          better results. The control component should work consistently in the field. The team’s engineering portfolio
          must contain a summary of the software, sensors, and mechanical control, but would not include copies of the
          code itself.
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
          This judged award recognizes design elements of the robot that are both functional and aesthetic. The Design
          Award is presented to teams that incorporate industrial design elements into their solution. These design
          elements could simplify the robot’s appearance by giving it a clean look, be decorative in nature, or
          otherwise express the creativity of the team. The robot should be durable, efficiently designed, and
          effectively address the game challenge.
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
          The Innovate Award celebrates a team that thinks imaginatively and has the ingenuity, creativity, and
          inventiveness to make their designs come to life. This judged award is given to the team that has an
          innovative and creative robot design solution to any specific components in the FIRST Tech Challenge game.
          Elements of this award include elegant design, robustness, and ‘out of the box’ thinking related to design.
          This award may address the design of the whole robot or of a sub-assembly attached to the robot. The creative
          component must work consistently, but a robot does not have to work all the time during matches to be
          considered for this award.
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
          The Inspire Award winner is an inspiration to other teams, acting with Gracious Professionalism® both on and
          off the playing field. This team shares their experiences, enthusiasm and knowledge with other teams,
          sponsors, their community, and the judges. Working as a unit, this team will have shown success in performing
          the task of designing and building a robot.
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
          This team embraces the culture of FIRST and clearly shows what it means to be a team. This judged award
          celebrates the team that represents the essence of the FIRST Tech Challenge competition through Gracious
          Professionalism® and general enthusiasm for the overall philosophy of FIRST and what it means to be a FIRST
          Tech Challenge team. This is a team who makes a collective effort to make FIRST known throughout their school
          and community, and sparks others to embrace the culture of FIRST.
        </p>
      </div>
    ),
  },
  {
    label: 'Think',
    content: (
      <div className="vertical-tabs__content">
        <p>
          <strong>Award Placement</strong> – 3nd Place
          <br />
          <br />
          <strong>Description:</strong>
          <br />
          This judged award is given to the team that best reflects the journey the team took as they experienced the
          engineering design process during the build season. The engineering content within the portfolio is the key
          reference for judges to help identify the most deserving team. The team’s engineering content must focus on
          the design and build stage of the team’s robot.
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
          This judged award recognizes design elements of the robot that are both functional and aesthetic. The Design
          Award is presented to teams that incorporate industrial design elements into their solution. These design
          elements could simplify the robot’s appearance by giving it a clean look, be decorative in nature, or
          otherwise express the creativity of the team. The robot should be durable, efficiently designed, and
          effectively address the game challenge.
        </p>
      </div>
    ),
  },
]

export default function Season2023() {
  const gradient = 'linear-gradient(315deg, rgb(0,0,0) 0%, rgb(255,0,0) 100%)'

  return (
    <div>
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
            Before building our robot, we designed it all in the CAD software Fusion 360. We focused on a modular
            system, starting with our chassis, then the arm, and then the intake, ensuring that each module could be
            independently modified and worked together cohesively. A struggle last season was our intake/outtake
            system. Since they were on the same side, it forced us to rotate the robot during matches and cost us
            valuable time. Now, our intake/outtake system extends through the entire robot from end to end. Pixels are
            taken in using a counter roller, sent up a ramp with a series of boot wheels, and fed into a bed to be
            sorted and grabbed by our claw. Our intake consistently sorts the 1st pixel into the right position and the
            2nd pixel into the left. This provides our coaches and human players more control over pixel placements on
            the board. Last year we faced challenges with linear slides. So this season, we opted for a triple-jointed
            arm. This increases our range of motion: ability to scoop pixels off the floor, speed: quickly place pixels
            on the backboard, and strength: hanging using this bracket.
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

      <section
        className="cover"
        style={{
          background: gradient,
          minHeight: '50vh',
        }}
      >
        <div className="container" style={{ textAlign: 'center', padding: '40px 0' }}>
          <h2 className="cover-title">Explore the Robot in 3D</h2>
          
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <h2 className="section-title">Interleague B</h2>
          <p className="section-copy">
            This event marked the fourth competition within our season, presenting us with a palpable sense of
            anticipation as we prepared to engage in spirited competition. Initially, our performance was auspicious
            as we swiftly ascended to the top position during the qualification matches. Regrettably, our journey took
            an unexpected turn during the elimination rounds, culminating in our early exit following the first match.
            Despite this setback, our team persevered with resilience. It was with profound satisfaction that we
            emerged triumphant, clinching every award, including the coveted First Place Inspire Award.
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
            This event marked the culmination of our season, serving as our fifth and ultimate competition. While our
            initial performance exhibited promise, we encountered unforeseen challenges with our robot shortly
            thereafter, hindering our progression to the elimination rounds. Despite the disappointment weighing upon
            us, our team was uplifted by an unexpected triumph: securing the prestigious First Place Design Award.
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
