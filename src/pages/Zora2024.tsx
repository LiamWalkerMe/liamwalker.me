import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { isArchivedPath } from '../config/archivedPages'

const issues = [
  {
    title: 'Energy',
    text:
      'The Zora campaign supports cleaner, more efficient energy. Better power systems can lower costs, improve reliability, and support healthier communities.',
    image: '/assets/Zora2024/Issues/Energy.jpeg',
    lightText: true,
    reverse: false,
  },
  {
    title: 'Healthcare',
    text:
      'Healthcare should be easier to afford, easier to understand, and easier to access. Zora supports lower costs, more clinics, clearer pricing, and stronger support for healthcare workers.',
    image: '/assets/Zora2024/Issues/Healthcare.png',
    lightText: false,
    reverse: true,
  },
  {
    title: 'Animal Rights',
    text:
      'Animals deserve stronger protections. Zora supports stricter anti-cruelty policies, less harmful testing, and better safeguards for wildlife on land and in the ocean.',
    image: '/assets/Zora2024/Issues/AnimalProtections.png',
    lightText: true,
    reverse: false,
  },
  {
    title: 'Immigration',
    text:
      'Families seeking safety deserve a fairer and faster process. Zora supports better funding, more staff, and more courts so immigration cases move with less delay and less harm.',
    image: '/assets/Zora2024/Issues/Immigration.jpeg',
    lightText: true,
    reverse: true,
  },
  {
    title: 'Education Programs ',
    text:
      'College and career education should be more reachable for every student. Zora supports more financial aid and targeted help for students who need extra support.',
    image: '/assets/Zora2024/Issues/Education.jpeg',
    lightText: false,
    reverse: false,
  },
]

const teamMembers = [
  {
    name: 'Zora Pipersburg',
    role: 'Presidential Candidate',
    image: '/assets/Zora2024/Team/Zora.jpeg',
  },
  {
    name: 'Jack Burnett',
    role: 'Vice President Candadite',
    image: '/assets/Zora2024/Team/Jack.jpeg',
  },
    {
    name: 'Liam Walker',
    role: 'Campaign Manager',
    image: '/assets/Zora2024/Team/Liam.jpeg',
  },
  {
    name: 'Athena Woosener',
    role: 'Campaign Manager',
    image: '/assets/Zora2024/Team/Athena.jpeg',
  },
  {
    name: 'Adam Esch',
    role: 'Campaign Worker',
    image: '/assets/Zora2024/Team/Adam.jpeg',
  },
  {
    name: 'Weiam Elmahdi',
    role: 'Campaign Worker',
    image: '/assets/Zora2024/Team/Weiam.jpeg',
  },
  {
    name: 'Emma Na',
    role: 'Campaign Worker',
    image: '/assets/Zora2024/Team/Emma.jpeg',
  },

]

export default function Zora2024() {
  const [teamIndex, setTeamIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const isArchived = isArchivedPath('/zora2024')

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
          <img className="zora-hero-logo" src="/assets/Zora2024/Promotional/Logo.png" alt="Zora campaign" />
          <img className="zora-hero-image" src="/assets/Zora2024/Promotional/Headshot.png" alt="Zora campaign artwork" />
          {isArchived && (
            <p className="zora-hero-note">
              This page is archived and listed in the Archived Pages menu.
              Website created by Liam Walker.
            </p>
          )}
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
          <img className="zora-bumper-image" src="/assets/Zora2024/Promotional/BumperSticker.png" alt="Zora bumper sticker" />
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
          <div className="carousel zora-team-carousel" style={{ marginTop: 24 }}>
            <button className="carousel-arrow left" onClick={() => handleTeamMove(-1)} aria-label="Previous team member">
              <ChevronLeft size={20} strokeWidth={2.25} />
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
                {teamMembers.map((member, index) => (
                  <div className="carousel-slide" key={member.name}>
                    <article className="zora-team-card">
                      <div className="zora-team-card__media">
                        <img className="zora-team-image" src={member.image} alt={member.name} />
                      </div>
                      <div className="zora-team-card__body">
                        <span className="zora-team-card__eyebrow">
                          Team Member {String(index + 1).padStart(2, '0')}
                        </span>
                        <h3 className="zora-team-name">{member.name}</h3>
                        <p className="zora-team-role">{member.role}</p>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
            <button className="carousel-arrow right" onClick={() => handleTeamMove(1)} aria-label="Next team member">
              <ChevronRight size={20} strokeWidth={2.25} />
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
