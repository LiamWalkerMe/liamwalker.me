import { useRef, useState } from 'react'

const issues = [
  {
    title: 'Energy',
    text:
      'The Zora campaign promises to fund research into more efficient and cleaner sources of energy through any means possible. Efficiency in energy production would drastically reduce costs of living in many densely populated areas, leading to a better quality of life, and more reliability in necessary amenities in the modern day. In addition, cleaner energy research would directly impact the health of our global ecosystem, from the redwoods to the everglades. In today’s world there is still a fallacy in energy provision for many communities which must be corrected. In today’s world, energy means freedom. The Zora campaign will build energy for the present, and energy for the future. Zora 2024.',
    image: '/assets/2023/12/IMG_5825.jpeg',
    lightText: true,
    reverse: false,
  },
  {
    title: 'Healthcare',
    text:
      'Our healthcare system needs change. We face challenges such as it being very costly, a lack of insurance, a lack of transparency, and a lack of access. The COVID-19 pandemic rocked the healthcare system and highlighted these flaws. We now have a shortage of healthcare workers. Expanding health Insurance, investing in more clinics to increase access, enforcing doctor-patient transparency, and decreasing costs for medical treatments and appointments are the beginnings of creating a better healthcare system. Life isn’t predictable and we want to be there when you need it. Vote Zora.',
    image: '/assets/2023/12/upscaled2.png',
    lightText: false,
    reverse: true,
  },
  {
    title: 'Animal Protections',
    text:
      'As Gandhi once said, “The greatness of a nation and its moral progress can be judged by the way its animals are treated.” My team and I believe in addressing not only the big problems but also the issues facing the under-represented. We pride ourselves on being active listeners, but more than that, we take action.Animal abuse is a rampant problem here in these states, whether it is defended by animal testing for the benefit of FDA-approved products or the abuse that farm animals endure before being used as a food product for us. We would never condone subjecting humans to this treatment, so why do we, as a nation, think it is acceptable to do so to the animals that help provide millions of products for our benefit?As your president, I would like to allocate funds to companies such as PETA to support them in their journey to protect the animals in this nation. I would also like to implement stricter policies to help protect many animals from being hunted for sport or products. This doesn’t just include our forest friends, but it also translates to the sea. Sea creatures such as orcas, salmon, tuna, and more are being hunted and overfished constantly, and there needs to be a stop to it. I hope that with a vote from all of you, I can help the animals in this nation and take action for those of you who are deeply concerned with this issue, like me.',
    image: '/assets/2023/12/upscaled.png',
    lightText: true,
    reverse: false,
  },
  {
    title: 'Immigration',
    text:
      'Families who enter the United States seeking asylum are often met with alternate harshness to their place of origin. The difficult, monotonous, and dragged-out immigration process, which can especially be observed at the Southern border, can often divide families and put them at greater risk of trafficking or imprisonment. This is not the America that we, our parents, our grandparents, or our great-grandparents arrived in. The Zora campaign is promising a more efficient immigration system, better funding to the United States Citizenship and Immigration Services offices. More courts will open, and more stations will be established so the Zora presidency can provide true democracy to the world.',
    image: '/assets/2023/12/IMG_5738.jpeg',
    lightText: true,
    reverse: true,
  },
  {
    title: 'Education Programs ',
    text:
      'A college degree is essential in this day and age. The Zora platform wants to help not only the underprivileged but also the underrepresented. We will increase funding to FAFSA and push policies that will help those in need of financial aid on a case-to-case basis. A college degree helps to open doors and we want to help open the door to your future. Vote Zora.',
    image: '/assets/2023/12/IMG_5759.jpeg',
    lightText: false,
    reverse: false,
  },
]

const teamMembers = [
  {
    name: 'Zora Pipersburg',
    role: 'Presidential Candidate',
    image: '/assets/2023/12/IMG_5849.jpeg',
  },
  {
    name: 'Jack Burnett',
    role: 'Vice President Candadite',
    image: '/assets/2023/12/IMG_5763-2.jpeg',
  },
  {
    name: 'Athena Woosener',
    role: 'Campaign Manager',
    image: '/assets/2023/12/IMG_5769-2.jpeg',
  },
  {
    name: 'Adam Esch',
    role: 'Campaign Worker',
    image: '/assets/2023/12/IMG_5751-2.jpeg',
  },
  {
    name: 'Weiam Elmahdi',
    role: 'Campaign Worker',
    image: '/assets/2023/12/IMG_5761-2.jpeg',
  },
  {
    name: 'Emma Na',
    role: 'Campaign Worker',
    image: '/assets/2023/12/IMG_5777-2.jpeg',
  },
]

export default function Zora2024() {
  const [teamIndex, setTeamIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement | null>(null)

  const handleTeamMove = (dir: number) => {
    const carousel = carouselRef.current
    if (!carousel) return
    const slideWidth = carousel.clientWidth
    if (!slideWidth) return
    const currentIndex = Math.round(carousel.scrollLeft / slideWidth)
    const nextIndex = (currentIndex + dir + teamMembers.length) % teamMembers.length
    carousel.scrollTo({ left: nextIndex * slideWidth, behavior: 'smooth' })
  }

  return (
    <div className="zora-page">
      <section className="zora-hero">
        <div className="container">
          <img className="zora-hero-logo" src="/assets/2023/12/1Artboard-1.png" alt="Zora campaign" />
          <p className="zora-hero-note">
            This page is archived and only accessible by a link. Website and promotional material created by Liam Walker
          </p>
          <img className="zora-hero-image" src="/assets/2023/12/Untitled-2.png" alt="Zora campaign artwork" />
        </div>
      </section>

      <section className="zora-video-section">
        <div className="container">
          <h2 className="zora-section-title">CAMPAIGN VIDEO</h2>
          <div className="video-frame">
            <div style={{ position: 'relative', paddingTop: '56.25%' }}>
              <iframe
                src="https://www.youtube.com/embed/PzWQqw-5sYs?si=1dCG2Gr479iSFhZh"
                title="Zora Campaign Video"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <section className="zora-bumper">
        <div className="container">
          <h2 className="zora-section-title">BUMPER STICKER</h2>
          <img className="zora-bumper-image" src="/assets/2023/12/Bumper-Sticker-1.png" alt="Zora bumper sticker" />
        </div>
      </section>

      {issues.map((issue) => (
        <section
          key={issue.title}
          className={`zora-issue${issue.reverse ? ' reverse' : ''}${issue.lightText ? ' light' : ' dark'}`}
          style={{ backgroundImage: `url(${issue.image})` }}
        >
          <div className="zora-issue-overlay" />
          <div className="zora-issue-inner">
            <div className="zora-issue-col">
              <p className="zora-issue-title">
                <strong>{issue.title}</strong>
              </p>
            </div>
            <div className="zora-issue-col">
              <p className="zora-issue-text">{issue.text}</p>
            </div>
          </div>
        </section>
      ))}

      <section className="zora-team">
        <div className="container">
          <h2 className="zora-section-title">Meet the Team!</h2>
          <div className="carousel" style={{ marginTop: 24 }}>
            <button className="carousel-arrow left" onClick={() => handleTeamMove(-1)} aria-label="Previous team member">
              ‹
            </button>
            <div
              className="carousel-viewport"
              ref={carouselRef}
              onScroll={(event) => {
                const target = event.currentTarget
                const slideWidth = target.clientWidth
                if (!slideWidth) return
                const nextIndex = Math.round(target.scrollLeft / slideWidth)
                setTeamIndex((prev) => (prev === nextIndex ? prev : nextIndex))
              }}
            >
              <div className="carousel-track">
                {teamMembers.map((member) => (
                  <div className="carousel-slide" key={member.name}>
                    <div className="zora-team-card">
                      <p className="zora-team-name">
                        <strong>{member.name}</strong> – {member.role}
                      </p>
                      <img className="zora-team-image" src={member.image} alt={member.name} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button className="carousel-arrow right" onClick={() => handleTeamMove(1)} aria-label="Next team member">
              ›
            </button>
          </div>
          <div className="carousel-dots">
            {teamMembers.map((_, index) => (
              <button
                key={`team-dot-${index}`}
                className={`carousel-dot ${index === teamIndex ? 'active' : ''}`}
                onClick={() => handleTeamMove(index - teamIndex)}
                aria-label={`Go to team member ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
