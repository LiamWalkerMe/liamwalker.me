import { type MouseEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
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

interface DevelopmentProcessStage {
  id: string;
  label: string;
  iconSrc: string;
}

interface DevelopmentProcessStep {
  id: string;
  activeStageId: string;
  imageSrc: string;
  imageAlt: string;
  caption: string;
}

interface ProcessMetric {
  scrollSpan: number;
  stickyHeight: number;
}

interface ProcessTimelineState {
  currentIndex: number;
  nextIndex: number;
  transitionProgress: number;
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
    body: "The WordPress site started on a shared hosting account, and it didn't take long to outgrow it. Load times were slow, and getting updates live was more of a hassle than it needed to be — tweaking something small still meant wading through a process that felt heavier than it should. \n Moving to a dedicated, self-managed server fixed both problems. With full control over the environment, the site got faster and deploying changes became a lot more straightforward. It's the kind of setup that actually gets out of your way and lets you focus on the work.",
    imageSrc: "/assets/Website/LocalApp.png",
    imageAlt: "Early website development stage",
  },
  {
    id: "aws-ec2",
    title: "AWS EC2 Instance",
    subtitle: "More control, more overhead",
    body: "Switching to a dedicated Amazon EC2 instance made the site noticeably faster. That part worked. The problem was the bill. \n Bot traffic was hammering the server constantly, and AWS charges the same whether a request comes from a real person or a script running somewhere in a data center. The costs kept climbing with nothing to show for it, and it became clear EC2 wasn't going to be a long-term option. \n So the search started for something cheaper. Free would be even better, as long as it didn't mean going back to the headaches of shared hosting.",
    imageSrc: "/assets/Website/AWS.png",
    imageAlt: "Website version hosted on an EC2 setup",
  },
  {
    id: "local-wordpress",
    title: "Local WordPress",
    subtitle: "Static export from a local build",
    body: "GitHub Pages was a solid option, mostly because it was free. The catch is it doesn't support WordPress, so the workaround was running WordPress locally, building the site, and exporting the whole thing as static HTML to deploy. It worked, but it was clunky. \n Even with that setup, WordPress felt limiting. There was only so much you could do with it, and at some point the constraints outweighed the convenience. It made more sense to start fresh with a modern framework that allowed for real customization, something that could actually reflect the technical work behind it rather than just the content on top of it.",
    imageSrc: "/assets/Website/GitHub.png",
    imageAlt: "Website version built from a local WordPress environment",
  },
  {
    id: "react",
    title: "React",
    subtitle: "FIGMA → REACT → GITHUB PAGES",
    body: "The current version of the site is built on React, which was picked up during an internship at Epik AI. It handles more complex layouts and animations than anything the previous setups could manage. \n The workflow starts in Figma. Every page gets designed there first, which makes it easy to experiment with typography, color, and layout before writing a single line of code. From there it gets built out in React and deployed to GitHub Pages. That full cycle, from design tool to framework to live site, is what makes it possible to build something that feels genuinely modern and design-forward rather than just functional. The end result looks like it had a designer behind it, because it did. \n React was also a practical choice. It's one of the more in-demand skills in the industry right now, so the project does double duty as a portfolio piece and something worth knowing well.",
    imageSrc: "/assets/Website/FrontPage.png",
    imageAlt: "Current website front page",
  },
];

const developmentProcessStages: DevelopmentProcessStage[] = [
  {
    id: "figma",
    label: "Figma",
    iconSrc: "/assets/Website/Icons/Figma.png",
  },
  {
    id: "build",
    label: "VS Code + React",
    iconSrc: "/assets/Website/Icons/Code.png",
  },
  {
    id: "local",
    label: "Localhost",
    iconSrc: "/assets/Website/Icons/Chrome.png",
  },
  {
    id: "github",
    label: "GitHub",
    iconSrc: "/assets/Website/Icons/GitHub.png",
  },
  {
    id: "live",
    label: "Final Product",
    iconSrc: "/assets/Website/Icons/Chrome.png",
  },
];

const developmentProcessSteps: DevelopmentProcessStep[] = [
  {
    id: "figma-design",
    activeStageId: "figma",
    imageSrc: "/assets/Website/Development/FigmaApp.png",
    imageAlt: "Website design in Figma",
    caption:
      "This Figma screen is where the page gets mapped out first. It is where the layout, spacing, colors, and overall visual direction for this website are worked through before anything moves into code.",
  },
  {
    id: "react-build",
    activeStageId: "build",
    imageSrc: "/assets/Website/Development/VSCode.png",
    imageAlt: "Website code in VS Code",
    caption:
      "Once the design feels right, it gets rebuilt in VS Code using React. This is the stage where the static mockup turns into a real page with responsive layout, styling, and the interactions that make this website feel more polished.",
  },
  {
    id: "localhost-preview",
    activeStageId: "local",
    imageSrc: "/assets/Website/Development/LocalHost.png",
    imageAlt: "Website running locally in the browser",
    caption:
      "The localhost preview is where the page gets checked in the browser while changes are still being made. It makes it easy to test spacing, typography, animation timing, and content updates in real time before anything is published.",
  },
  {
    id: "github-deploy",
    activeStageId: "github",
    imageSrc: "/assets/Website/Development/GitHub-ghpages.png",
    imageAlt: "GitHub deployment workflow for the website",
    caption:
      "When an update is ready, the project gets pushed to GitHub and sent through the deployment flow for this site. That step is what takes the work from a local build into a version that can actually be shipped.",
  },
  {
    id: "live-site",
    activeStageId: "live",
    imageSrc: "/assets/Website/FrontPage.png",
    imageAlt: "Final published version of the website",
    caption:
      "After deployment finishes, the newest version of the website is live as the final product. This is the part where all of the design work, code changes, and testing come together in the finished page that people actually see.",
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

const developmentProcessPinnedLayoutQuery = "(min-width: 960px) and (prefers-reduced-motion: no-preference)";
const emptyProcessMetric: ProcessMetric = { scrollSpan: 0, stickyHeight: 0 };

function getFadeDelay(delayMs: number) {
  return { animationDelay: `${delayMs}ms` };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getWebsiteBodyParagraphs(body: string) {
  return body
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function easeInOutCubic(value: number) {
  return value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function getProcessTimelineState(progress: number, stepCount: number): ProcessTimelineState {
  if (stepCount <= 1) {
    return {
      currentIndex: 0,
      nextIndex: 0,
      transitionProgress: 1,
    };
  }

  const maxIndex = stepCount - 1;
  const stageProgress = clamp(progress, 0, 1) * maxIndex;
  const currentIndex = Math.min(Math.floor(stageProgress), maxIndex);
  const nextIndex = Math.min(currentIndex + 1, maxIndex);
  const stageOffset = stageProgress - currentIndex;
  const transitionProgress =
    currentIndex === maxIndex ? 1 : easeInOutCubic(clamp((stageOffset - 0.42) / 0.58, 0, 1));

  return {
    currentIndex,
    nextIndex,
    transitionProgress,
  };
}

function getProcessStepStrength(index: number, timelineState: ProcessTimelineState) {
  if (index === timelineState.currentIndex && index === timelineState.nextIndex) {
    return 1;
  }

  if (index === timelineState.currentIndex) {
    return 1 - timelineState.transitionProgress;
  }

  if (index === timelineState.nextIndex) {
    return timelineState.transitionProgress;
  }

  return 0;
}

function getDevelopmentProcessStageLabel(activeStageId: string) {
  return developmentProcessStages.find((stage) => stage.id === activeStageId)?.label ?? "";
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
      const raf = window.requestAnimationFrame(() => {
        setDisplayValue(value);
        setHasStarted(true);
      });

      return () => {
        window.cancelAnimationFrame(raf);
      };
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

function WebsiteProcessStageList({ stageStrengths }: { stageStrengths: number[] }) {
  return (
    <ul className="website-process__stage-list" aria-label="Development workflow">
      {developmentProcessStages.map((stage, index) => {
        const strength = easeInOutCubic(clamp(stageStrengths[index] ?? 0, 0, 1));
        const isActive = strength > 0.52;
        const iconStrength = clamp((strength - 0.12) / 0.88, 0, 1);

        return (
          <li
            key={stage.id}
            className={`website-process__stage-item${isActive ? " is-active" : ""}`}
            style={{
              opacity: 0.34 + strength * 0.66,
              transform: `translate3d(${Math.round(strength * 18)}px, 0, 0) scale(${0.92 + strength * 0.08})`,
            }}
          >
            <span
              className="website-process__stage-icon"
              aria-hidden="true"
              style={{
                opacity: iconStrength,
                transform: `translate3d(${Math.round((1 - iconStrength) * 8)}px, 0, 0) scale(${0.72 + iconStrength * 0.28})`,
              }}
            >
              <img src={stage.iconSrc} alt="" loading="lazy" decoding="async" />
            </span>
            <span>{stage.label}</span>
          </li>
        );
      })}
    </ul>
  );
}

export default function Website() {
  const [activeVersionIndex, setActiveVersionIndex] = useState(0);
  const [isHistoryPaused, setIsHistoryPaused] = useState(false);
  const [hasHistoryBeenViewed, setHasHistoryBeenViewed] = useState(false);
  const [isProcessPinned, setIsProcessPinned] = useState(false);
  const [processMetric, setProcessMetric] = useState<ProcessMetric>(emptyProcessMetric);
  const [processProgress, setProcessProgress] = useState(0);
  const historySectionRef = useRef<HTMLElement | null>(null);
  const processSectionRef = useRef<HTMLElement | null>(null);
  const processStickyRef = useRef<HTMLDivElement | null>(null);
  const activeVersion = websiteVersions[activeVersionIndex];
  const processTimelineState = getProcessTimelineState(processProgress, developmentProcessSteps.length);
  const processStageStrengths = developmentProcessStages.map((_, index) =>
    getProcessStepStrength(index, processTimelineState)
  );

  useEffect(() => {
    const historySectionElement = historySectionRef.current;

    if (!historySectionElement || hasHistoryBeenViewed) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) {
          return;
        }

        setHasHistoryBeenViewed(true);
        observer.disconnect();
      },
      {
        threshold: 0.24,
        rootMargin: "0px 0px -12% 0px",
      }
    );

    observer.observe(historySectionElement);

    return () => {
      observer.disconnect();
    };
  }, [hasHistoryBeenViewed]);

  useEffect(() => {
    if (!hasHistoryBeenViewed || isHistoryPaused || websiteVersions.length < 2) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setActiveVersionIndex((index) => (index + 1) % websiteVersions.length);
    }, 5000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [activeVersionIndex, hasHistoryBeenViewed, isHistoryPaused]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(developmentProcessPinnedLayoutQuery);

    const syncProcessLayout = () => {
      setIsProcessPinned(mediaQuery.matches);
    };

    syncProcessLayout();
    mediaQuery.addEventListener("change", syncProcessLayout);

    return () => {
      mediaQuery.removeEventListener("change", syncProcessLayout);
    };
  }, []);

  useLayoutEffect(() => {
    if (!isProcessPinned) {
      return undefined;
    }

    const measure = () => {
      const stickyElement = processStickyRef.current;
      const viewportHeight = window.innerHeight || 0;

      if (!stickyElement || viewportHeight <= 0) {
        setProcessMetric(emptyProcessMetric);
        return;
      }

      const stickyHeight = Math.max(stickyElement.offsetHeight, viewportHeight);
      const stepTravel = Math.max(viewportHeight * 0.72, 420);
      const scrollSpan = stepTravel * Math.max(developmentProcessSteps.length - 1, 1);

      setProcessMetric((previousMetric) => {
        if (
          Math.abs(previousMetric.scrollSpan - scrollSpan) <= 1 &&
          Math.abs(previousMetric.stickyHeight - stickyHeight) <= 1
        ) {
          return previousMetric;
        }

        return {
          scrollSpan,
          stickyHeight,
        };
      });
    };

    const resizeObserver = new ResizeObserver(() => {
      measure();
    });

    if (processStickyRef.current) {
      resizeObserver.observe(processStickyRef.current);
    }

    measure();
    window.addEventListener("resize", measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [isProcessPinned]);

  useEffect(() => {
    if (!isProcessPinned) {
      return undefined;
    }

    let frameId = 0;

    const updateProgress = () => {
      const sectionElement = processSectionRef.current;

      if (!sectionElement || processMetric.scrollSpan <= 0) {
        setProcessProgress(0);
        frameId = 0;
        return;
      }

      const nextProgress = clamp(-sectionElement.getBoundingClientRect().top / processMetric.scrollSpan, 0, 1);

      setProcessProgress((previousProgress) =>
        Math.abs(previousProgress - nextProgress) > 0.002 ? nextProgress : previousProgress
      );

      frameId = 0;
    };

    const scheduleUpdate = () => {
      if (frameId !== 0) {
        return;
      }

      frameId = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);

      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [isProcessPinned, processMetric.scrollSpan]);

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
        id="development-process"
        ref={processSectionRef}
        className={`website-process${isProcessPinned ? " is-pinned" : ""}`}
        style={
          isProcessPinned && processMetric.scrollSpan > 0
            ? { height: `${Math.round(processMetric.stickyHeight + processMetric.scrollSpan)}px` }
            : undefined
        }
      >
        <div
          className="website-process__sticky"
          ref={(node) => {
            processStickyRef.current = node;
          }}
        >
          <div className="container website-process__layout">
            <div className="website-process__intro">
              <div className="website-section-kicker fade-in" style={getFadeDelay(20)}>
                How It Gets Built
              </div>
              <h2
                className="website-display-title website-display-title--section website-process__title fade-in"
                style={getFadeDelay(80)}
              >
                Development Process
              </h2>
              <p className="website-process__intro-copy fade-in" style={getFadeDelay(140)}>
                Each update moves through the same workflow: design in Figma, build in React, test locally, push to
                GitHub, and ship the final page live.
              </p>
            </div>

            {isProcessPinned ? (
              <div className="website-process__experience">
                <div className="website-process__media-column">
                  <div className="website-process__media-stack">
                    {developmentProcessSteps.map((step, index) => {
                      const strength = easeInOutCubic(getProcessStepStrength(index, processTimelineState));

                      return (
                        <article
                          key={step.id}
                          className={`website-process-card${strength > 0.5 ? " is-active" : ""}`}
                          aria-hidden={strength < 0.08}
                          style={{
                            opacity: strength,
                            transform: `translate3d(0, ${Math.round((1 - strength) * 42)}px, 0) scale(${0.94 + strength * 0.06})`,
                            pointerEvents: strength > 0.08 ? "auto" : "none",
                          }}
                        >
                          <img
                            className="website-process-card__image"
                            src={step.imageSrc}
                            alt={step.imageAlt}
                            loading="lazy"
                            decoding="async"
                          />
                          <p className="website-process-card__caption">{step.caption}</p>
                        </article>
                      );
                    })}
                  </div>
                </div>

                <div className="website-process__copy-column">
                  <div className="website-process__copy-panel">
                    <WebsiteProcessStageList stageStrengths={processStageStrengths} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="website-process__mobile-list">
                {developmentProcessSteps.map((step, index) => (
                  <article
                    key={step.id}
                    className="website-process-card website-process-card--stacked fade-in"
                    style={getFadeDelay(180 + index * 60)}
                  >
                    <img
                      className="website-process-card__image"
                      src={step.imageSrc}
                      alt={step.imageAlt}
                      loading="lazy"
                      decoding="async"
                    />
                    <h3 className="website-process-card__mobile-title">
                      {getDevelopmentProcessStageLabel(step.activeStageId)}
                    </h3>
                    <p className="website-process-card__caption">{step.caption}</p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section
        id="version-history"
        ref={historySectionRef}
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
              <div className="website-history__body">
                {getWebsiteBodyParagraphs(activeVersion.body).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
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
