import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

const C = {
  navy: "#0d3b6e",
  blue: "#1a5fa8",
  teal: "#1b7a5e",
  sand: "#f5e6c3",
  cream: "#fdf8f0",
  white: "#ffffff",
  sky: "#daeef8",
  seafoam: "#cce8dc",
  muted: "#5a6e82",
  gold: "#c89a10",
} as const;

const HERO_STATS = [
  { val: "A.S.-T", label: "Computer Science" },
  { val: "2 Years", label: "of coursework" },
  { val: "UC / CSU", label: "transfer eligible" },
];

const DEGREE_HIGHLIGHTS = [
  {
    title: "Core CS Foundations",
    body: "Data structures, algorithms, computer architecture, and discrete mathematics, C++, Java — were the foundation of my technical education.",
    color: C.blue,
    delay: 0,
  },
  {
    title: "Applied Mathematics",
    body: "Calculus through Linear Algebra gave me a deeper intuition for computation, modeling, and the mechanics behind modern software systems.",
    color: C.teal,
    delay: 80,
  },
  {
    title: "Transfer Pathway",
    body: "The A.S.-T guarantees priority admission consideration to CSU campuses.",
    color: C.gold,
    delay: 160,
  },
  {
    title: "Campus Environment",
    body: "MiraCosta's Oceanside campus provided a focused and resource-rich setting — faculty office hours, peer tutoring, and dedicated study spaces that supported serious academic work.",
    color: "#9b6b9b",
    delay: 240,
  },
];

const SLIDES = [
  { label: "Graduation Ceremony", caption: "Commencement · May 22nd 2026", sub: "FrontWave Arena - Oceanside" },
  { label: "With Close Friends", caption: "Family", sub: "FrontWave Arena - Oceanside" },
  { label: "Cap & Gown", caption: "Friends", sub: "FrontWave Arena - Oceanside" },
  { label: "Family Celebration", caption: "Final day on campus", sub: "MiraCosta College - Oceanside" },
];

const HERO_HEADER_OVERLAP = "128px";

function useScrollY(): number {
  const [y, setY] = useState(0);

  useEffect(() => {
    let raf: number | undefined;

    const onScroll = () => {
      if (raf) {
        cancelAnimationFrame(raf);
      }

      raf = requestAnimationFrame(() => setY(window.scrollY));
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);

      if (raf) {
        cancelAnimationFrame(raf);
      }
    };
  }, []);

  return y;
}

interface MiracostaSectionProps {
  id?: string;
  bgColor: string;
  bgSpeed?: number;
  fadeTop?: string;
  fadeBottom?: string;
  children: ReactNode;
  style?: CSSProperties;
}

function MiracostaSection({
  id,
  bgColor,
  bgSpeed = 0.3,
  fadeTop,
  fadeBottom,
  children,
  style = {},
}: MiracostaSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const scrollY = useScrollY();
  const [top, setTop] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setTop(ref.current.offsetTop);
    }
  }, []);

  const dy = (scrollY - top) * bgSpeed;

  return (
    <section ref={ref} id={id} style={{ position: "relative", overflow: "hidden", ...style }}>
      <div
        style={{
          position: "absolute",
          inset: "-20% -4px",
          background: bgColor,
          transform: `translateY(${dy}px)`,
          willChange: "transform",
          zIndex: 0,
        }}
      />
      {fadeTop && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 180,
            background: `linear-gradient(to bottom, ${fadeTop}, transparent)`,
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
      )}
      {fadeBottom && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 180,
            background: `linear-gradient(to top, ${fadeBottom}, transparent)`,
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
      )}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </section>
  );
}

function MiracostaWave({ fill, flip = false }: { fill: string; flip?: boolean }) {
  return (
    <div style={{ lineHeight: 0, transform: flip ? "scaleY(-1)" : "none", marginBottom: -2 }}>
      <svg viewBox="0 0 1440 56" width="100%" preserveAspectRatio="none" style={{ display: "block" }}>
        <path
          d="M0 28 Q180 0 360 28 Q540 56 720 28 Q900 0 1080 28 Q1260 56 1440 28 L1440 56 L0 56 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

function MiracostaCard({
  children,
  style = {},
  delay = 0,
}: {
  children: ReactNode;
  style?: CSSProperties;
  delay?: number;
}) {
  return (
    <div
      className="reveal"
      style={{
        background: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.85)",
        borderRadius: 18,
        padding: "28px 30px",
        boxShadow: "0 6px 32px rgba(13,59,110,0.08)",
        animationDelay: `${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function MiracostaEyebrow({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
      <div style={{ width: 28, height: 2, background: C.teal, borderRadius: 2 }} />
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: C.teal,
        }}
      >
        {children}
      </span>
    </div>
  );
}

function MiracostaPhotoPlaceholder({
  label,
  aspectRatio = "3/4",
  index,
}: {
  label: string;
  aspectRatio?: string;
  index: number;
}) {
  const patterns = [
    `linear-gradient(135deg, ${C.sky} 0%, ${C.seafoam} 100%)`,
    `linear-gradient(145deg, ${C.seafoam} 0%, ${C.sky} 100%)`,
    `linear-gradient(120deg, #dce8f5 0%, ${C.seafoam} 100%)`,
    `linear-gradient(150deg, ${C.sky} 20%, #e8daf0 100%)`,
    `linear-gradient(130deg, #f0e8d8 0%, ${C.seafoam} 100%)`,
  ];

  return (
    <div
      style={{
        aspectRatio,
        background: patterns[index % patterns.length],
        borderRadius: 14,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        border: "1px solid rgba(255,255,255,0.8)",
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(13,59,110,0.04) 40px),
          repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(13,59,110,0.04) 40px)`,
        }}
      />
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ opacity: 0.35 }}>
        <rect x="2" y="6" width="32" height="24" rx="3" stroke={C.navy} strokeWidth="1.5" />
        <circle cx="18" cy="18" r="6" stroke={C.navy} strokeWidth="1.5" />
        <circle cx="28" cy="10" r="2" fill={C.navy} opacity={0.5} />
      </svg>
      {label && (
        <span
          style={{
            fontSize: 11,
            color: C.navy,
            opacity: 0.4,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}

function MiracostaPageStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { background: ${C.cream}; color: ${C.navy}; font-family: 'Figtree', sans-serif; overflow-x: hidden; }

      @keyframes fadeUp   { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes shimmer  { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }

      .reveal, .h1-1, .h1-2, .h1-3 {
        opacity: 0;
        transform: translateY(28px);
      }
      .reveal.is-in-view { animation: fadeUp 0.75s cubic-bezier(0.16,1,0.3,1) both; }
      .h1-1.is-in-view   { animation: fadeUp 0.9s 0.05s cubic-bezier(0.16,1,0.3,1) both; }
      .h1-2.is-in-view   { animation: fadeUp 0.9s 0.2s  cubic-bezier(0.16,1,0.3,1) both; }
      .h1-3.is-in-view   { animation: fadeUp 0.9s 0.38s cubic-bezier(0.16,1,0.3,1) both; }
      .spin {
        animation: spinSlow 28s linear infinite;
        animation-play-state: paused;
      }
      .spin.is-in-view-active { animation-play-state: running; }

      .grad-text {
        background: linear-gradient(100deg, ${C.navy} 0%, ${C.blue} 45%, ${C.teal} 100%);
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: shimmer 7s linear infinite;
        animation-play-state: paused;
      }
      .grad-text.is-in-view-active { animation-play-state: running; }
    `}</style>
  );
}

function HeroSection() {
  return (
    <MiracostaSection
      id="hero"
      bgColor={`linear-gradient(150deg, ${C.sky} 0%, ${C.seafoam} 55%, ${C.sand} 100%)`}
      bgSpeed={0.28}
      style={{
        minHeight: `calc(100svh + ${HERO_HEADER_OVERLAP})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: `calc(-1 * ${HERO_HEADER_OVERLAP})`,
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: `calc(120px + ${HERO_HEADER_OVERLAP}) 48px 100px`,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 680 }}>
          <div
            className="h1-1"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.9)",
              borderRadius: 100,
              padding: "6px 16px",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.1em",
              color: C.teal,
              textTransform: "uppercase",
              marginBottom: 28,
              backdropFilter: "blur(8px)",
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.teal }} />
            MiraCosta College · Class of 2026
          </div>

          <h1
            className="h1-2"
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: "clamp(52px, 8vw, 96px)",
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
              marginBottom: 26,
              color: C.navy,
            }}
          >
            <span className="grad-text">MiraCosta</span>
            <br />
            <em style={{ fontStyle: "italic", fontWeight: 400, color: C.blue, fontSize: "0.88em" }}>A foundation</em>
            <br />
            <span>built to last.</span>
          </h1>

          <p
            className="h1-3"
            style={{
              fontSize: "clamp(15px, 1.8vw, 18px)",
              color: C.muted,
              lineHeight: 1.85,
              maxWidth: 500,
              fontWeight: 300,
              margin: "0 auto 44px",
            }}
          >
            A reflection on earning an <strong style={{ color: C.navy, fontWeight: 600 }}>Associate of Science in Computer Science for Transfer</strong> — the coursework, the community, and the people who shaped my college experience.
          </p>

          <div className="h1-3" style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <a
              href="#degree"
              style={{
                background: C.navy,
                color: C.white,
                padding: "13px 30px",
                borderRadius: 100,
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
                letterSpacing: "0.04em",
                transition: "transform 0.2s, box-shadow 0.2s",
                display: "inline-block",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow = `0 10px 28px ${C.navy}40`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Read My Story
            </a>
            <a
              href="#memories"
              style={{
                background: "transparent",
                color: C.navy,
                padding: "13px 28px",
                borderRadius: 100,
                fontSize: 14,
                fontWeight: 500,
                border: `1.5px solid ${C.navy}35`,
                textDecoration: "none",
                letterSpacing: "0.04em",
                transition: "border-color 0.2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = `${C.navy}80`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = `${C.navy}35`;
              }}
            >
              View Memories
            </a>
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, marginTop: 64, flexWrap: "wrap", justifyContent: "center" }}>
          {HERO_STATS.map((stat, index) => (
            <div
              key={stat.label}
              className="reveal"
              style={{
                background: "rgba(255,255,255,0.65)",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.88)",
                borderRadius: 14,
                padding: "16px 22px",
                display: "flex",
                alignItems: "center",
                gap: 14,
                animationDelay: `${560 + index * 100}ms`,
                boxShadow: "0 4px 20px rgba(13,59,110,0.07)",
              }}
            >
              <span
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontWeight: 700,
                  fontSize: 20,
                  color: C.navy,
                  whiteSpace: "nowrap",
                }}
              >
                {stat.val}
              </span>
              <span style={{ width: 1, height: 28, background: `${C.navy}18`, display: "block" }} />
              <span style={{ fontSize: 12, color: C.muted, lineHeight: 1.4 }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </MiracostaSection>
  );
}

function DegreeSection() {
  return (
    <MiracostaSection
      id="degree"
      bgColor={`linear-gradient(160deg, ${C.cream} 0%, ${C.sky}55 60%, ${C.seafoam}40 100%)`}
      bgSpeed={0.22}
      style={{ padding: "96px 48px 88px" }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <MiracostaEyebrow>The Degree</MiracostaEyebrow>
        <h2
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 800,
            fontSize: "clamp(28px, 4.5vw, 50px)",
            color: C.navy,
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            maxWidth: 580,
            marginBottom: 52,
          }}
        >
          Associate of Science in
          <br />
          <em style={{ fontStyle: "italic", fontWeight: 400, color: C.teal, fontSize: "0.82em" }}>
            Computer Science for Transfer
          </em>
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 18, marginBottom: 32 }}>
          {DEGREE_HIGHLIGHTS.map((highlight) => (
            <MiracostaCard key={highlight.title} delay={highlight.delay}>
              <div style={{ width: 3, height: 28, background: highlight.color, borderRadius: 2, marginBottom: 16 }} />
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: highlight.color,
                  marginBottom: 8,
                }}
              >
                {highlight.title}
              </div>
              <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.75, margin: 0 }}>{highlight.body}</p>
            </MiracostaCard>
          ))}
        </div>

        <div
          style={{
            background: C.navy,
            borderRadius: 18,
            padding: "36px 44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
            boxShadow: `0 16px 48px ${C.navy}30`,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                color: `${C.sky}99`,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Conferred — Spring 2026
            </div>
            <div
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(18px, 2.8vw, 28px)",
                fontWeight: 700,
                color: C.white,
                lineHeight: 1.2,
              }}
            >
              Associate of Science for Transfer
            </div>
            <div style={{ color: `${C.sky}aa`, fontSize: 14, marginTop: 6, fontWeight: 300 }}>
              Computer Science · MiraCosta College · Oceanside, CA
            </div>
          </div>
          <div
            className="spin"
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              border: `1.5px dashed ${C.gold}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="10" r="5" stroke={C.gold} strokeWidth="1.5" />
              <path d="M6 24c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" />
              <path d="M10 18l-2 4M18 18l2 4" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </MiracostaSection>
  );
}

function MemoriesSlideshow() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setActive((current) => (current + 1) % SLIDES.length);
    }, 4000);
  }, []);

  useEffect(() => {
    startTimer();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startTimer]);

  const goTo = (index: number) => {
    setActive(index);
    startTimer();
  };

  const previous = (active - 1 + SLIDES.length) % SLIDES.length;
  const next = (active + 1) % SLIDES.length;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }}>
      <div>
        <div
          style={{
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(13,59,110,0.14)",
            position: "relative",
          }}
        >
          <MiracostaPhotoPlaceholder label={SLIDES[active].label} aspectRatio="4/5" index={active} />
          <div
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(8px)",
              borderRadius: 100,
              padding: "5px 14px",
              fontSize: 12,
              fontWeight: 500,
              color: C.navy,
              letterSpacing: "0.06em",
            }}
          >
            {active + 1} / {SLIDES.length}
          </div>
        </div>

        <div style={{ marginTop: 20, paddingLeft: 4 }}>
          <div
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 20,
              fontWeight: 700,
              color: C.navy,
              marginBottom: 4,
            }}
          >
            {SLIDES[active].caption}
          </div>
          <div style={{ fontSize: 13, color: C.muted, letterSpacing: "0.04em" }}>{SLIDES[active].sub}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 20 }}>
          {([
            ["←", previous],
            ["→", next],
          ] as [string, number][]).map(([label, index]) => (
            <button
              key={label}
              onClick={() => goTo(index)}
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                border: `1.5px solid ${C.navy}30`,
                background: "rgba(255,255,255,0.7)",
                cursor: "pointer",
                fontSize: 15,
                color: C.navy,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s, border-color 0.2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = C.white;
                e.currentTarget.style.borderColor = `${C.navy}66`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.7)";
                e.currentTarget.style.borderColor = `${C.navy}30`;
              }}
            >
              {label}
            </button>
          ))}

          <div style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: 4 }}>
            {SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                style={{
                  width: index === active ? 20 : 8,
                  height: 8,
                  borderRadius: 100,
                  border: "none",
                  background: index === active ? C.navy : `${C.navy}30`,
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {SLIDES.map((slide, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            style={{
              display: "flex",
              gap: 14,
              alignItems: "center",
              background: index === active ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.4)",
              border: `1.5px solid ${index === active ? `${C.navy}30` : "rgba(255,255,255,0.6)"}`,
              borderRadius: 14,
              padding: "12px 16px",
              cursor: "pointer",
              transition: "all 0.25s",
              textAlign: "left",
              boxShadow: index === active ? "0 4px 20px rgba(13,59,110,0.08)" : "none",
            }}
            onMouseOver={(e) => {
              if (index !== active) {
                e.currentTarget.style.background = "rgba(255,255,255,0.65)";
              }
            }}
            onMouseOut={(e) => {
              if (index !== active) {
                e.currentTarget.style.background = "rgba(255,255,255,0.4)";
              }
            }}
          >
            <div style={{ width: 52, height: 52, borderRadius: 10, overflow: "hidden", flexShrink: 0 }}>
              <MiracostaPhotoPlaceholder label="" aspectRatio="1" index={index} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.navy, marginBottom: 2 }}>{slide.caption}</div>
              <div style={{ fontSize: 12, color: C.muted }}>{slide.sub}</div>
            </div>
            {index === active && <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.teal, flexShrink: 0 }} />}
          </button>
        ))}
      </div>
    </div>
  );
}

function MemoriesSection() {
  return (
    <MiracostaSection
      id="memories"
      bgColor={`linear-gradient(165deg, ${C.sand} 0%, #f0e8d8 55%, ${C.sand} 100%)`}
      bgSpeed={0.18}
      style={{ padding: "96px 48px 88px" }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <MiracostaEyebrow>Graduation Memories</MiracostaEyebrow>
        <h2
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 800,
            fontSize: "clamp(28px, 4.5vw, 50px)",
            color: C.navy,
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          The moments that
          <br />
          <em style={{ fontStyle: "italic", fontWeight: 400, color: "#9b6b9b", fontSize: "0.82em" }}>define the chapter.</em>
        </h2>
        <p style={{ fontSize: 16, color: C.muted, lineHeight: 1.8, maxWidth: 500, marginBottom: 52, fontWeight: 300 }}>
          Two years of work celebrated in a single afternoon — surrounded by the people who made every late night and early morning worthwhile.
        </p>

        <MemoriesSlideshow />

        <div style={{ marginTop: 40 }}>
          <MiracostaCard style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div
              style={{
                width: 3,
                minHeight: 56,
                background: `linear-gradient(to bottom, ${C.teal}, #9b6b9b)`,
                borderRadius: 2,
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1, minWidth: 220 }}>
              <div
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontWeight: 700,
                  fontSize: 18,
                  color: C.navy,
                  marginBottom: 10,
                }}
              >
                Family & Support System
              </div>
              <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.8, margin: 0 }}>
                To my friends who joined me in late-night study sessions, . I am extremely grateful for the investment my family makes in education.
              </p>
            </div>
          </MiracostaCard>
        </div>
      </div>
    </MiracostaSection>
  );
}

function ClubCard({
  icon,
  name,
  role,
  color,
  bg,
  desc,
  delay = 0,
}: {
  icon: ReactNode;
  name: string;
  role: string;
  color: string;
  bg: string;
  desc: string;
  delay?: number;
}) {
  return (
    <div
      className="reveal"
      style={{
        background: bg,
        border: `1px solid ${color}28`,
        borderRadius: 16,
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        transition: "transform 0.25s, box-shadow 0.25s",
        animationDelay: `${delay}ms`,
        cursor: "default",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = `0 14px 36px ${color}18`;
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: `${color}18`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="9" stroke={color} strokeWidth="1.5" />
          {icon}
        </svg>
      </div>
      <div>
        <div
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 16,
            fontWeight: 700,
            color: C.navy,
            marginBottom: 2,
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color,
            marginBottom: 10,
          }}
        >
          {role}
        </div>
        <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.7, margin: 0 }}>{desc}</p>
      </div>
    </div>
  );
}

function ClubsSection() {
  return (
    <MiracostaSection
      id="clubs"
      bgColor={`linear-gradient(155deg, ${C.cream} 0%, ${C.sky}50 50%, ${C.seafoam}45 100%)`}
      bgSpeed={0.26}
      style={{ padding: "96px 48px 88px" }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <MiracostaEyebrow>Clubs & Involvement</MiracostaEyebrow>
        <h2
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 800,
            fontSize: "clamp(28px, 4.5vw, 50px)",
            color: C.navy,
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          Beyond the classroom
          <br />
          <em style={{ fontStyle: "italic", fontWeight: 400, color: C.blue, fontSize: "0.82em" }}>an educational community</em>
        </h2>
        <p style={{ fontSize: 16, color: C.muted, lineHeight: 1.8, maxWidth: 500, marginBottom: 52, fontWeight: 300 }}>
          Student involvement was where academic ambition met real collaboration — clubs that sharpened technical skills and the ability to work, build, and lead alongside others.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
          <ClubCard
            icon={
              <>
                <rect x="5" y="6" width="10" height="8" rx="1" fill={C.blue} fillOpacity={0.7} />
                <line x1="10" y1="14" x2="10" y2="16" stroke={C.blue} strokeWidth="1.2" />
                <line x1="7" y1="16" x2="13" y2="16" stroke={C.blue} strokeWidth="1.2" />
              </>
            }
            name="Film Club"
            role="Member"
            color={C.blue}
            bg={`${C.sky}55`}
            desc="A hands-on creative space for discussing film, sharing projects, and building portfolios — contributing ideas, giving feedback, and applying storytelling principles to future career goals."
            delay={0}
          />
          <ClubCard
            icon={
              <>
                <rect x="4" y="5" width="12" height="10" rx="1.5" fill={C.teal} fillOpacity={0.6} />
                <path d="M7 9l2 2 4-3" stroke={C.white} strokeWidth="1.2" strokeLinecap="round" />
              </>
            }
            name="CS for the Common Good"
            role="Member"
            color={C.teal}
            bg={`${C.seafoam}55`}
            desc="Examined how computer science intersects with ethics, accessibility, and real-world impact — reinforcing that software is a tool for meaningful change, not just technical output."
            delay={80}
          />
          <ClubCard
            icon={
              <>
                <circle cx="10" cy="8" r="3" fill="#9b6b9b" fillOpacity={0.7} />
                <path d="M4 16c0-3 2.7-5 6-5s6 2 6 5" fill="#9b6b9b" fillOpacity={0.4} />
              </>
            }
            name="LeetCode Club"
            role="Member"
            color="#9b6b9b"
            bg="#f0e8f488"
            desc="Sharpened algorithmic thinking and technical interview preparation through peer collaboration — breaking down complex problems and building confidence in both coding and communication."
            delay={160}
          />
          <ClubCard
            icon={
              <>
                <path
                  d="M5 15l5-9 5 9"
                  stroke={C.gold}
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line x1="7" y1="12" x2="13" y2="12" stroke={C.gold} strokeWidth="1.3" />
              </>
            }
            name="Game Design Club"
            role="Member"
            color={C.gold}
            bg={`${C.sand}88`}
            desc="Combined design thinking and logic using Godot — contributing to game jams, design documents, and peer critiques in a collaborative environment that encouraged creative confidence."
            delay={240}
          />
        </div>
      </div>
    </MiracostaSection>
  );
}

function ClosingSection() {
  return (
    <section style={{ background: C.navy, padding: "96px 48px 108px", position: "relative", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          top: "8%",
          right: "8%",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.teal}1a 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          left: "4%",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.gold}1a 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 5, marginBottom: 32 }}>
          {[1, 2, 3, 4, 5].map((index) => (
            <div
              key={index}
              style={{
                width: index === 3 ? 22 : 8,
                height: 8,
                borderRadius: 100,
                background: C.sky,
                opacity: 0.15 + index * 0.12,
              }}
            />
          ))}
        </div>

        <h2
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(36px, 6vw, 68px)",
            fontWeight: 900,
            color: C.white,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            marginBottom: 28,
          }}
        >
          What comes next
          <br />
          <span style={{ color: C.gold, fontStyle: "italic" }}>is the whole point.</span>
        </h2>

        <p style={{ fontSize: 17, color: `${C.sky}bb`, lineHeight: 1.85, maxWidth: 500, margin: "0 auto 52px", fontWeight: 300 }}>
          The A.S.-T was just the first step. Earning it secured my admission to <strong style={{ color: C.gold }}>*Future College*</strong> — proof that the foundation built at MiraCosta was exactly the right one. The next chapter begins now.
        </p>

        <div style={{ marginBottom: 64 }}>
          <a
            href="/future-college"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: C.gold,
              color: C.navy,
              padding: "16px 36px",
              borderRadius: 100,
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: "0.04em",
              textDecoration: "none",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.04)";
              e.currentTarget.style.boxShadow = `0 12px 36px ${C.gold}55`;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Continue to *Future College*
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke={C.navy} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 32,
            fontSize: 12,
            color: "rgba(255,255,255,0.22)",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          MiraCosta College · Oceanside, California
        </div>
      </div>
    </section>
  );
}

export default function Miracosta() {
  return (
    <>
      <MiracostaPageStyles />
      <HeroSection />
      <MiracostaWave fill={C.cream} />
      <DegreeSection />
      <MiracostaWave fill={C.sand} flip />
      <MemoriesSection />
      <MiracostaWave fill={C.cream} />
      <ClubsSection />
      <MiracostaWave fill={C.navy} flip />
      <ClosingSection />
    </>
  );
}
