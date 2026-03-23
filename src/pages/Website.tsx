import { type MouseEvent, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface WebsiteFeature {
  title: string;
  bullets: string[];
}

interface WebsiteVersion {
  id: string;
  title: string;
  subtitle: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
}

interface SkillGroup {
  title: string;
  tone: string;
  items: string[];
}

interface SkillStat {
  value: number;
  suffix?: string;
  label: string;
}

const websiteFeatures: WebsiteFeature[] = [
  {
    title: "Web Design Skills",
    bullets: [
      "Strengthened both front-end and back-end web development skills through hands-on iteration.",
      "Built experience with tools like WordPress, Figma, and React in a real project workflow.",
      "Improved technical confidence in layout, interaction, design translation, and deployment.",
      "Turned the site into a meaningful portfolio piece that supported internship and professional growth.",
    ],
  },
  {
    title: "Showcase My Projects",
    bullets: [
      "Creates a dedicated place to present software, design, and photography work together.",
      "Acts as a living portfolio that can evolve as new skills and projects are added.",
      "Balances technical development with storytelling and visual presentation.",
      "Reflects a broader commitment to craftsmanship beyond just writing code.",
    ],
  },
];

const websiteVersions: WebsiteVersion[] = [
  {
    id: "wordpress-beginnings",
    title: "WordPress Beginnings",
    subtitle: "Shared hosting and first launch",
    body: "What began as a WordPress site hosted on a shared account quickly revealed its limitations — slow load times and a cumbersome design and launch process made it clear that a better solution was needed. To address this, the site was migrated to a dedicated, self-managed server, giving it the performance and flexibility it deserved.",
    imageSrc: "/assets/Website/LocalHost.png",
    imageAlt: "Early website development stage",
  },
  {
    id: "aws-ec2",
    title: "AWS EC2 Instance",
    subtitle: "More control, more overhead",
    body: "To further improve speed and reliability, the site was migrated to a dedicated Amazon EC2 instance. However, this introduced a new challenge: cost. A significant volume of automated bot traffic was driving up hosting expenses, making the solution unsustainable. This necessitated a shift toward a more cost-effective, and ideally free, hosting alternative.",
    imageSrc: "/assets/Website/AWS.png",
    imageAlt: "Website version hosted on an EC2 setup",
  },
  {
    id: "local-wordpress",
    title: "Local WordPress",
    subtitle: "Static export from a local build",
    body: "GitHub Pages presented an attractive free hosting solution, though it came with a notable limitation: it does not support WordPress. To work around this, a local WordPress environment was used to build and export raw HTML, which was then deployed as a static site. However, it became apparent that WordPress — even in this configuration — was too restrictive. The decision was made to move on entirely and rebuild using a modern framework, one that offered the flexibility and customizability needed to truly showcase technical ability.",
    imageSrc: "/assets/Website/GitHub.png",
    imageAlt: "Website version built from a local WordPress environment",
  },
  {
    id: "react",
    title: "React",
    subtitle: "React + Github Pages",
    body: "The current iteration of the site represents a significant step forward in both design capability and technical complexity, supporting advanced page layouts and smooth animations. It is built on React, a framework gained hands-on experience with during an internship at Epik AI. Prior to development, each page is carefully designed in Figma — allowing for thoughtful exploration of typography, color, and layout — before being brought to life in code. React's widespread adoption across the industry makes it not only a powerful tool for this project, but a valuable and in-demand skill in modern web development.",
    imageSrc: "/assets/Website/React.png",
    imageAlt: "Current website front page",
  },
];

const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    tone: "blue",
    items: ["TypeScript", "JavaScript", "HTML", "CSS"],
  },
  {
    title: "Frameworks & Architecture",
    tone: "green",
    items: ["Vite", "React.js", "React Router", "Single-Page Applications", "Component-Based Architecture"],
  },
  {
    title: "Design",
    tone: "lavender",
    items: ["Figma", "UI/UX Design", "Responsive Design", "Mobile-First Design", "CSS Animation"],
  },
  {
    title: "Tools & Workflow",
    tone: "pink",
    items: ["Git", "GitHub", "npm", "Debugging", "Refactoring", "Deployment"],
  },
];

const skillStats: SkillStat[] = [
  { value: 3, suffix: "+", label: "major rebuilds" },
  { value: 4, label: "hosting approaches tried" },
  { value: 20, suffix: "+", label: "tools explored" },
];

function getFadeDelay(delayMs: number) {
  return { animationDelay: `${delayMs}ms` };
}

function handleWebsiteAnchorClick(event: MouseEvent<HTMLAnchorElement>) {
  const href = event.currentTarget.getAttribute("href");

  if (!href || !href.startsWith("#")) {
    return;
  }

  const target = document.querySelector<HTMLElement>(href);

  if (!target) {
    return;
  }

  event.preventDefault();
  window.history.replaceState(null, "", href);
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function WebsiteSkillStatCard({ value, suffix = "", label, delay = 0 }: SkillStat & { delay?: number }) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const element = cardRef.current;

    if (!element || hasStarted) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayValue(value);
      setHasStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) {
          return;
        }

        setHasStarted(true);
        observer.disconnect();
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -2% 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [hasStarted, value]);

  useEffect(() => {
    if (!hasStarted) {
      return;
    }

    let frameId = 0;
    let timeoutId = 0;

    const startAnimation = () => {
      const duration = 800;
      const startTime = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);

        setDisplayValue(Math.round(value * easedProgress));

        if (progress < 1) {
          frameId = window.requestAnimationFrame(tick);
          return;
        }

        setDisplayValue(value);
      };

      frameId = window.requestAnimationFrame(tick);
    };

    timeoutId = window.setTimeout(startAnimation, delay);

    return () => {
      window.clearTimeout(timeoutId);
      window.cancelAnimationFrame(frameId);
    };
  }, [delay, hasStarted, value]);

  return (
    <div ref={cardRef} className="website-stat-card">
      <strong>
        {displayValue}
        {suffix}
      </strong>
      <span>{label}</span>
    </div>
  );
}

export default function Website() {
  const [activeVersionIndex, setActiveVersionIndex] = useState(0);
  const [isHistoryPaused, setIsHistoryPaused] = useState(false);
  const activeVersion = websiteVersions[activeVersionIndex];

  useEffect(() => {
    if (isHistoryPaused || websiteVersions.length < 2) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setActiveVersionIndex((index) => (index + 1) % websiteVersions.length);
    }, 5000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [activeVersionIndex, isHistoryPaused]);

  return (
    <div className="website-page">
      <section className="website-hero page-hero-under-header">
        <div className="container website-hero__content">
          <div className="website-kicker fade-in" style={getFadeDelay(20)}>Digital Portfolio</div>
          <div className="website-hero__title-wrap fade-in" style={getFadeDelay(80)}>
            <h1 className="website-display-title website-display-title--hero">
              This <br /> Website
            </h1>
          </div>
          <p className="website-hero__description fade-in" style={getFadeDelay(140)}>
            This site has gone through a lot of versions, and every iteration taught me something new about
            development, design, hosting, and the craft of building for the web.
          </p>
          <div className="website-hero__actions fade-in" style={getFadeDelay(200)}>
            <a
              className="website-pill-button website-pill-button--solid"
              href="#version-history"
              onClick={handleWebsiteAnchorClick}
            >
              Website Versions
            </a>
            <a
              className="website-pill-button website-pill-button--ghost"
              href="#skills-learned"
              onClick={handleWebsiteAnchorClick}
            >
              Skills Learned
            </a>
          </div>
        </div>

        <div className="website-hero__split">
          {websiteFeatures.map((feature, index) => (
            <div key={feature.title} className="website-hero__panel">
              <article className="website-feature-card fade-in" style={getFadeDelay(240 + index * 70)}>
                <span className="website-feature-card__accent" />
                <h2 className="website-display-subtitle">{feature.title}</h2>
                <ul className="website-feature-card__list">
                  {feature.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            </div>
          ))}
        </div>
      </section>

      <section
        id="version-history"
        className="website-history"
        onMouseEnter={() => setIsHistoryPaused(true)}
        onMouseLeave={() => setIsHistoryPaused(false)}
        onFocusCapture={() => setIsHistoryPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setIsHistoryPaused(false);
          }
        }}
      >
        <div className="container">
          <div className="website-section-kicker fade-in" style={getFadeDelay(20)}>From Concept To Reality</div>
          <h2 className="website-display-title website-display-title--section fade-in" style={getFadeDelay(80)}>
            Site History
          </h2>

          <div className="website-history__controls">
            <div className="website-history__timeline" aria-label="Website version timeline">
              <div className="website-history__track" />
              {websiteVersions.map((version, index) => (
                <button
                  key={version.id}
                  type="button"
                  className={`website-history__marker${index === activeVersionIndex ? " is-active" : ""}`}
                  aria-label={`View ${version.title}`}
                  aria-pressed={index === activeVersionIndex}
                  onClick={() => setActiveVersionIndex(index)}
                />
              ))}
            </div>

            <div className="website-history__nav">
              <button
                type="button"
                className="website-history__arrow"
                aria-label="Previous website version"
                disabled={activeVersionIndex === 0}
                onClick={() => setActiveVersionIndex((index) => Math.max(index - 1, 0))}
              >
                <ArrowLeft size={22} />
              </button>
              <button
                type="button"
                className="website-history__arrow"
                aria-label="Next website version"
                disabled={activeVersionIndex === websiteVersions.length - 1}
                onClick={() => setActiveVersionIndex((index) => Math.min(index + 1, websiteVersions.length - 1))}
              >
                <ArrowRight size={22} />
              </button>
            </div>
          </div>

          <article key={activeVersion.id} className="website-history__panel">
            <div className="website-history__image-frame">
              <img src={activeVersion.imageSrc} alt={activeVersion.imageAlt} />
            </div>

            <div className="website-history__copy">
              <p className="website-history__eyebrow">{activeVersion.subtitle}</p>
              <h3 className="website-display-subtitle">{activeVersion.title}</h3>
              <p>{activeVersion.body}</p>
            </div>
          </article>
        </div>
      </section>

      <section id="skills-learned" className="website-skills">
        <div className="container website-skills__inner">
          <div className="website-section-kicker website-section-kicker--light fade-in" style={getFadeDelay(20)}>
            More Than Just A Website
          </div>
          <h2 className="website-display-title website-display-title--skills fade-in" style={getFadeDelay(80)}>
            Skills
          </h2>
          <p className="website-skills__intro fade-in" style={getFadeDelay(140)}>
            Building this website has been a comprehensive, hands-on education in modern web development - spanning the full front-end stack, from languages and frameworks to design tooling and deployment.
          </p>

          <div className="website-skills__grid">
            {skillGroups.map((group, index) => (
              <section key={group.title} className="website-skill-group fade-in" style={getFadeDelay(180 + index * 60)}>
                <h3>{group.title}</h3>
                <div className="website-skill-group__chips">
                  {group.items.map((item) => (
                    <span key={item} className={`website-skill-chip website-skill-chip--${group.tone}`}>
                      {item}
                    </span>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="website-skills__stats">
            {skillStats.map((stat, index) => (
              <WebsiteSkillStatCard
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                delay={index * 60}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
