import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";

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

const CAL_POLY = {
  green: "#154734",
  gold: "#BD8B13",
  lightGreen: "#6FA58A",
} as const;

const HERO_STATS = [
  { val: "3", label: "associate degrees" },
  { val: "2 Years", label: "of coursework" },
  { val: "CS + Math", label: "transfer-ready foundation" },
];

type DegreeSummary = {
  shortLabel: string;
  title: string;
  compactTitle?: string;
  accent: string;
};

const DEGREE_SUMMARIES: ReadonlyArray<DegreeSummary> = [
  {
    shortLabel: "A.D.-T",
    title: "Computer Science",
    accent: C.blue,
  },
  {
    shortLabel: "A.D.-T",
    title: "Mathematics",
    accent: C.teal,
  },
  {
    shortLabel: "A.A.",
    title: "Liberal Arts",
    compactTitle: "Liberal Arts: Mathematics and Science",
    accent: C.gold,
  },
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
    body: "The transfer-focused degrees strengthened my CSU pathway while the broader liberal arts work deepened the math and science foundation behind it.",
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

interface CourseworkDetail {
  code: string;
  title: string;
  units: string;
  prerequisites: string;
  enrollment?: string;
  credit: string;
  format: string;
  offered: string;
  description: string;
  catalogUrl: string;
}

const COURSEWORK_DETAILS: ReadonlyArray<CourseworkDetail> = [
  {
    code: "CS 111",
    title: "INTRO TO COMPUTER SCI I: JAVA",
    units: "3 units",
    prerequisites: "None",
    enrollment: "",
    credit: "Acceptable for Credit: CSU, UC",
    format: "Lecture 2 hours, laboratory 3 hours",
    offered: "Typically offered Fall, Spring, and Summer",
    description:
      "Introduces object-oriented programming for computer science and engineering majors through topics of personal and social relevance. Covers control structures, data types, input/output, operators, classes, methods and parameters, basic inheritance, documentation practices, testing, and verification techniques.",
    catalogUrl: "https://catalog.miracosta.edu/disciplines/computerscience/#courseinventory",
  },
  {
    code: "CS 112",
    title: "INTRO TO COMPUTER SCI II: JAVA",
    units: "3 units",
    prerequisites: "CS 111",
    enrollment: "",
    credit: "Acceptable for Credit: CSU, UC",
    format: "Lecture 2 hours, laboratory 3 hours",
    offered: "Typically offered Fall, Spring, and Summer",
    description:
      "Builds on CS 111 with advanced object-oriented programming concepts including abstraction, inheritance, polymorphism, and encapsulation. Topics include recursion, generics, event-driven programming, graphical user interfaces, file input/output, and exception handling.",
    catalogUrl: "https://catalog.miracosta.edu/disciplines/computerscience/#courseinventory",
  },
  {
    code: "CS 113",
    title: "BASIC DATA STRUCTURES/ALGORITHMS",
    units: "3 units",
    prerequisites: "CS 112",
    enrollment: "",
    credit: "Acceptable for Credit: CSU, UC",
    format: "Lecture 2 hours, laboratory 3 hours",
    offered: "Typically offered Fall, Spring, and Summer",
    description:
      "Focuses on efficient algorithms and properly designed data structures while introducing the software development process with industry-standard tools. Topics include searching, sorting, hashing, algorithm analysis, object-oriented design, collections, lists, stacks, queues, trees, sets, dictionaries, and graphs.",
    catalogUrl: "https://catalog.miracosta.edu/disciplines/computerscience/#courseinventory",
  },
  {
    code: "CS 150",
    title: "C++ PROGRAMMING",
    units: "3 units",
    prerequisites: "None",
    enrollment: "",
    credit: "Acceptable for Credit: CSU, UC",
    format: "Lecture 2 hours, laboratory 3 hours",
    offered: "Typically offered Fall, Spring, and Summer",
    description:
      "Uses an object-oriented approach to design and programming in C++. Covers data input/output, data types, control structures, operators, functions, and the operating environment, leading to the construction of moderately complex programs.",
    catalogUrl: "https://catalog.miracosta.edu/disciplines/computerscience/#courseinventory",
  },
  {
    code: "CS 151",
    title: "ADVANCED C++ PROGRAMMING",
    units: "3 units",
    prerequisites: "CS 150",
    enrollment: "",
    credit: "Acceptable for Credit: CSU, UC",
    format: "Lecture 2 hours, laboratory 3 hours",
    offered: "Typically offered Fall and Spring",
    description:
      "Advances C++ design and implementation with larger programs and stronger testing practices. Topics include polymorphism, inheritance, class libraries, the standard template library, pointers, advanced file input/output, recursion, virtual functions, exception handling, dynamic memory management, bitwise operators, and data structures such as linked lists, stacks, queues, and binary trees.",
    catalogUrl: "https://catalog.miracosta.edu/disciplines/computerscience/#courseinventory",
  },
  {
    code: "CS 220",
    title: "COMPUTER ARCH AND ASSEM LANG",
    units: "3 units",
    prerequisites: "CS 112",
    enrollment: "",
    credit: "Acceptable for Credit: CSU, UC",
    format: "Lecture 2 hours, laboratory 3 hours",
    offered: "Typically offered Fall, Spring, and Summer",
    description:
      "Introduces the physical and structural foundations of assembly language programming. Topics include machine architecture, memory addressing, input/output, interrupts, control structures, compiling, and linking.",
    catalogUrl: "https://catalog.miracosta.edu/disciplines/computerscience/#courseinventory",
  },
  {
    code: "CS 226",
    title: "DISCRETE STRUCTURES",
    units: "4 units",
    prerequisites: "CS 111, CS 138, or CS 150 and MATH 126, MATH 126S, or placement eligibility",
    enrollment: "",
    credit: "Acceptable for Credit: CSU, UC",
    format: "Lecture 3.5 hours, laboratory 1.5 hours",
    offered: "Typically offered Fall and Spring",
    description:
      "Introduces discrete mathematics for computer science, including logic, methods of proof, number theory, sets, counting, relations, recursion, recurrence relations, Boolean algebra, graphs, trees, and networks. Applications connect directly to algorithms, undecidability, program correctness, and digital logic design.",
    catalogUrl: "https://catalog.miracosta.edu/disciplines/computerscience/#courseinventory",
  },
  {
    code: "MATH 260",
    title: "CALC & ANALYTIC GEOMETRY III",
    units: "4 units",
    prerequisites: "MATH 155",
    enrollment: "Not open to students with prior credit in MATH 260H",
    credit: "Acceptable for Credit: CSU, UC",
    format: "Lecture 3.5 hours, laboratory 1.5 hours",
    offered: "Typically offered Fall, Spring, and Summer",
    description:
      "The third course in a three-semester calculus sequence covering vectors in two- and three-dimensional space, quadratic surfaces, vector-valued functions of several variables, partial differentiation and multiple integration, vector fields, line integrals, and conservative fields for mathematics, science, and engineering majors.",
    catalogUrl: "https://catalog.miracosta.edu/disciplines/mathematics/#courseinventory",
  },
  {
    code: "MATH 265",
    title: "DIFFERENTIAL EQUATIONS",
    units: "4 units",
    prerequisites: "MATH 155",
    enrollment: "Not open to students with prior credit in MATH 265H",
    credit: "Acceptable for Credit: CSU, UC",
    format: "Lecture 4 hours",
    offered: "Typically offered Fall and Spring",
    description:
      "Introduces the theory and applications of ordinary differential equations of first and higher order, along with systems of linear differential equations. Includes quantitative and qualitative methods, existence and uniqueness of solutions, and analytical, numerical, power-series, and Laplace-transform techniques.",
    catalogUrl: "https://catalog.miracosta.edu/disciplines/mathematics/#courseinventory",
  },
  {
    code: "MATH 270",
    title: "LINEAR ALGEBRA",
    units: "4 units",
    prerequisites: "MATH 155",
    enrollment: "Not open to students with prior credit in MATH 270H",
    credit: "Acceptable for Credit: CSU, UC",
    format: "Lecture 4 hours",
    offered: "Typically offered Fall and Spring",
    description:
      "Introduces core linear algebra topics including matrix algebra, Gaussian elimination, determinants, vector spaces, introductory proof work, linear transformations, orthogonality, eigenvalues and eigenvectors, and computational methods.",
    catalogUrl: "https://catalog.miracosta.edu/disciplines/mathematics/#courseinventory",
  },
] as const;

const GRADUATION_PLACEHOLDER_SRC = "/assets/New/placeholder.png";

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
}: {
  label: string;
  aspectRatio?: string;
}) {
  return (
    <div
      style={{
        aspectRatio,
        background: "rgba(255,255,255,0.42)",
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.8)",
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: "100%",
      }}
    >
      <img
        src={GRADUATION_PLACEHOLDER_SRC}
        alt={label}
        loading={label ? "eager" : "lazy"}
        decoding="async"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          objectFit: "cover",
        }}
      />
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

      .coursework-overlay {
        position: fixed;
        inset: 0;
        z-index: 80;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 28px;
        background: rgba(13,59,110,0.28);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        transition: opacity 0.32s ease;
      }
      .coursework-flip-shell {
        width: min(760px, 100%);
        perspective: 1600px;
        transition: transform 0.42s cubic-bezier(0.16,1,0.3,1), opacity 0.28s ease;
      }
      .coursework-flip-card {
        position: relative;
        width: 100%;
        height: 100%;
        min-height: 460px;
        display: block;
      }
      .coursework-face {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 28px;
        overflow: hidden;
        border: 1px solid rgba(255,255,255,0.88);
        box-shadow: 0 28px 80px rgba(13,59,110,0.18);
      }
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
            MIRACOSTA JOURNEY
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
            A reflection on my time at MiraCosta — and on the coursework, the community, and the people who shaped my college experience.
          </p>

          <div className="h1-3" style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <a
              href="#degree"
              style={{
                background: C.navy,
                color: C.white,
                padding: "13px 30px",
                borderRadius: 100,
                border: "1px solid transparent",
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
                letterSpacing: "0.04em",
                transition: "transform 0.2s, box-shadow 0.2s, background 0.2s, color 0.2s, border-color 0.2s",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.background = C.white;
                e.currentTarget.style.color = C.navy;
                e.currentTarget.style.borderColor = C.navy;
                e.currentTarget.style.boxShadow = `0 12px 28px ${C.navy}24`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = C.navy;
                e.currentTarget.style.color = C.white;
                e.currentTarget.style.borderColor = "transparent";
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
                transition: "transform 0.2s, background 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.background = C.navy;
                e.currentTarget.style.color = C.white;
                e.currentTarget.style.borderColor = C.navy;
                e.currentTarget.style.boxShadow = `0 12px 28px ${C.navy}20`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = C.navy;
                e.currentTarget.style.borderColor = `${C.navy}35`;
                e.currentTarget.style.boxShadow = "none";
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
        <MiracostaEyebrow>The Degrees</MiracostaEyebrow>
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
          Academic foundation
          <br />
          <em style={{ fontStyle: "italic", fontWeight: 400, color: C.teal, fontSize: "0.82em" }}>
            built at MiraCosta
          </em>
        </h2>

        <p
          style={{
            maxWidth: 760,
            fontSize: 16,
            lineHeight: 1.9,
            color: C.muted,
            margin: "0 0 32px",
            fontWeight: 300,
          }}
        >
          The degrees reflected the same throughline from different angles: computer science for implementation, mathematics
          for rigor, and liberal arts for breadth across mathematics and science.
        </p>

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
            alignItems: "flex-start",
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
                marginBottom: 16,
              }}
            >
              Degrees completed
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 10,
                flexWrap: "nowrap",
                whiteSpace: "nowrap",
                overflowX: "auto",
                maxWidth: "100%",
                color: `${C.sky}cc`,
                fontSize: 14,
                fontWeight: 300,
                paddingBottom: 4,
              }}
            >
              {DEGREE_SUMMARIES.map((degree, index) => (
                <span
                  key={`${degree.shortLabel}-${degree.compactTitle ?? degree.title}`}
                  style={{ display: "inline-flex", alignItems: "baseline", gap: 8, flexShrink: 0 }}
                >
                  <span style={{ color: degree.accent, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {degree.shortLabel}
                  </span>
                  <span>{degree.compactTitle ?? degree.title}</span>
                  {index < DEGREE_SUMMARIES.length - 1 ? <span style={{ color: `${C.sky}66` }}>·</span> : null}
                </span>
              ))}
            </div>
            <div style={{ color: `${C.sky}aa`, fontSize: 14, marginTop: 18, fontWeight: 300 }}>
              MiraCosta College · Oceanside, CA
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
              alignSelf: "center",
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
          <MiracostaPhotoPlaceholder label={SLIDES[active].label} aspectRatio="4/5" />
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
              <MiracostaPhotoPlaceholder label="" aspectRatio="1" />
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

function CourseworkCard({
  course,
  delay = 0,
  onSelect,
  isActive = false,
}: {
  course: CourseworkDetail;
  delay?: number;
  onSelect: (course: CourseworkDetail, rect: DOMRect) => void;
  isActive?: boolean;
}) {
  const { code, title } = course;

  return (
    <button
      type="button"
      className="reveal"
      style={{
        flex: "1 1 160px",
        minHeight: 96,
        width: "100%",
        maxWidth: "none",
        background:
          "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.88) 28%, rgba(248,252,255,0.78) 52%, rgba(229,242,250,0.42) 100%), linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.86) 100%)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.96)",
        borderRadius: 18,
        boxShadow: "0 10px 24px rgba(13,59,110,0.09)",
        padding: "18px 16px 16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        textAlign: "center",
        animationDelay: `${delay}ms`,
        transformStyle: "preserve-3d",
        transition: "transform 0.1s ease, box-shadow 0.18s ease, border-color 0.18s ease, background 0.12s ease, opacity 0.28s ease",
        cursor: "pointer",
        willChange: "transform",
        appearance: "none",
        outline: "none",
        overflow: "hidden",
        opacity: isActive ? 0 : 1,
        pointerEvents: isActive ? "none" : "auto",
      }}
      onClick={(event) => onSelect(course, event.currentTarget.getBoundingClientRect())}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 28px 56px rgba(13,59,110,0.2)";
        e.currentTarget.style.borderColor = "rgba(26,95,168,0.28)";
        e.currentTarget.style.background =
          "radial-gradient(circle at 50% 50%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.96) 24%, rgba(246,251,255,0.9) 50%, rgba(226,240,249,0.44) 100%), linear-gradient(180deg, rgba(255,255,255,0.99) 0%, rgba(249,252,255,0.95) 100%)";
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rotateY = (px - 0.5) * 16;
        const rotateX = (0.5 - py) * 16;
        const glowX = (px * 100).toFixed(1);
        const glowY = (py * 100).toFixed(1);

        e.currentTarget.style.transform = `perspective(900px) translateY(-10px) scale(1.04) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
        e.currentTarget.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.97) 18%, rgba(244,250,255,0.9) 38%, rgba(222,238,248,0.44) 100%), linear-gradient(180deg, rgba(255,255,255,0.99) 0%, rgba(249,252,255,0.95) 100%)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "perspective(900px) translateY(0) scale(1) rotateX(0deg) rotateY(0deg)";
        e.currentTarget.style.boxShadow = "0 12px 32px rgba(13,59,110,0.1)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.96)";
        e.currentTarget.style.background =
          "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.88) 28%, rgba(248,252,255,0.78) 52%, rgba(229,242,250,0.42) 100%), linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.86) 100%)";
      }}
    >
      <div
        style={{
          width: 34,
          height: 2,
          borderRadius: 999,
          background: `linear-gradient(90deg, ${C.teal}, ${C.blue})`,
          opacity: 0.7,
          marginBottom: 10,
        }}
      />
      <div
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontSize: "clamp(21px, 2.5vw, 28px)",
          fontWeight: 700,
          color: C.navy,
          letterSpacing: "-0.025em",
          lineHeight: 1,
          marginBottom: 8,
          whiteSpace: "nowrap",
        }}
      >
        {code}
      </div>
      <div
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontSize: 11.5,
          fontWeight: 700,
          letterSpacing: "0.02em",
          textTransform: "uppercase",
          color: C.blue,
          lineHeight: 1.32,
          maxWidth: "100%",
          whiteSpace: "normal",
          textWrap: "balance",
        }}
      >
        {title}
      </div>
    </button>
  );
}

function MajorPrepSection() {
  const [selectedCourse, setSelectedCourse] = useState<CourseworkDetail | null>(null);
  const [detailExpanded, setDetailExpanded] = useState(false);
  const [selectedRect, setSelectedRect] = useState<DOMRect | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!selectedCourse) {
      return;
    }

    document.body.style.overflow = "hidden";
    const rafId = requestAnimationFrame(() => setDetailExpanded(true));

    return () => {
      cancelAnimationFrame(rafId);
      document.body.style.overflow = "";
    };
  }, [selectedCourse]);

  const closeDetail = useCallback(() => {
    setDetailExpanded(false);

    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
    }

    closeTimeoutRef.current = window.setTimeout(() => {
      setSelectedCourse(null);
      setSelectedRect(null);
      closeTimeoutRef.current = null;
    }, 420);
  }, []);

  useEffect(() => {
    if (!selectedCourse) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDetail();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedCourse, closeDetail]);

  const openDetail = (course: CourseworkDetail, rect: DOMRect) => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    setDetailExpanded(false);
    setSelectedRect(rect);
    setSelectedCourse(course);
  };

  const modalWidth = typeof window !== "undefined" ? Math.min(760, window.innerWidth - 56) : 760;
  const modalHeight = typeof window !== "undefined" ? Math.min(560, window.innerHeight - 56) : 560;
  const modalLeft = typeof window !== "undefined" ? (window.innerWidth - modalWidth) / 2 : 0;
  const modalTop = typeof window !== "undefined" ? (window.innerHeight - modalHeight) / 2 : 0;
  const shellTransform =
    selectedRect && !detailExpanded
      ? `translate(${(selectedRect.left - modalLeft).toFixed(2)}px, ${(selectedRect.top - modalTop).toFixed(2)}px) scale(${(selectedRect.width / modalWidth).toFixed(3)}, ${(selectedRect.height / modalHeight).toFixed(3)})`
      : "translate(0px, 0px) scale(1, 1)";

  return (
    <MiracostaSection
      id="coursework"
      bgColor={`linear-gradient(150deg, ${C.sky} 0%, ${C.seafoam} 55%, ${C.sand} 100%)`}
      bgSpeed={0.24}
      style={{ padding: "96px 48px 88px" }}
    >
      <div style={{ maxWidth: 1020, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 32,
            alignItems: "start",
            marginBottom: 42,
          }}
        >
          <div style={{ maxWidth: 520 }}>
            <MiracostaEyebrow>
              <span style={{ whiteSpace: "nowrap" }}>Computer Science & Mathematics Courses</span>
            </MiracostaEyebrow>
            <h2
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 800,
                fontSize: "clamp(38px, 5.5vw, 66px)",
                color: C.navy,
                letterSpacing: "-0.04em",
                lineHeight: 0.98,
                marginBottom: 0,
              }}
            >
              Major Prep
              <br />
              <em style={{ fontStyle: "italic", fontWeight: 400, color: C.teal, fontSize: "0.8em" }}>Coursework</em>
            </h2>
            <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.78, maxWidth: 460, fontWeight: 300, margin: "18px 0 0" }}>
              The major-preparation classes at MiraCosta shaped the transfer path from both sides: mathematics for structure and rigor, and computer science for implementation, problem solving, and systems thinking. Click a tile to learn more about the course.
            </p>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
            gap: 16,
          }}
        >
          {COURSEWORK_DETAILS.map((course, courseIndex) => (
            <CourseworkCard
              key={course.code}
              course={course}
              delay={courseIndex * 70}
              onSelect={openDetail}
              isActive={selectedCourse?.code === course.code}
            />
          ))}
        </div>
      </div>

      {selectedCourse && (
        createPortal(
          <div
            className="coursework-overlay"
            onClick={closeDetail}
            style={{ opacity: detailExpanded ? 1 : 0 }}
          >
            <div
              className="coursework-flip-shell"
              onClick={(event) => event.stopPropagation()}
              style={{
                position: "fixed",
                left: modalLeft,
                top: modalTop,
                width: modalWidth,
                height: modalHeight,
                transform: shellTransform,
                transformOrigin: "top left",
                opacity: detailExpanded ? 1 : 0,
              }}
            >
              <div className="coursework-flip-card">
                <div
                  className="coursework-face"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.99) 0%, rgba(247,250,253,0.95) 100%)",
                    padding: "28px 28px 26px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20 }}>
                    <div>
                      <div style={{ fontFamily: "'Figtree', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.14em", color: C.blue, textTransform: "uppercase", marginBottom: 8 }}>
                        {selectedCourse.code}
                      </div>
                      <div style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 700, color: C.navy, lineHeight: 1.06 }}>
                        {selectedCourse.title}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={closeDetail}
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: "50%",
                        border: `1px solid ${C.navy}20`,
                        background: "rgba(255,255,255,0.8)",
                        color: C.navy,
                        fontSize: 22,
                        cursor: "pointer",
                        flexShrink: 0,
                      }}
                    >
                      ×
                    </button>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
                    {[
                      selectedCourse.units,
                      `Prerequisites: ${selectedCourse.prerequisites}`,
                      selectedCourse.enrollment ? `Enrollment: ${selectedCourse.enrollment}` : null,
                      selectedCourse.credit,
                      selectedCourse.format,
                      selectedCourse.offered,
                    ]
                      .filter(Boolean)
                      .map((item) => (
                        <div
                          key={item}
                          style={{
                            background: "rgba(218,238,248,0.4)",
                            border: "1px solid rgba(13,59,110,0.08)",
                            borderRadius: 14,
                            padding: "12px 14px",
                            fontSize: 13.5,
                            color: C.navy,
                            lineHeight: 1.55,
                          }}
                        >
                          {item}
                        </div>
                      ))}
                  </div>

                  <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.86, margin: 0 }}>
                    {selectedCourse.description}
                  </p>

                  <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center", flexWrap: "wrap", marginTop: "auto" }}>
                    <button
                      type="button"
                      onClick={closeDetail}
                      style={{
                        border: `1px solid ${C.navy}22`,
                        background: "transparent",
                        color: C.navy,
                        borderRadius: 999,
                        padding: "12px 18px",
                        fontSize: 13,
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        cursor: "pointer",
                      }}
                    >
                      Close
                    </button>

                    <a
                      href={selectedCourse.catalogUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 10,
                        borderRadius: 999,
                        textDecoration: "none",
                        padding: "12px 18px",
                        background: C.teal,
                        color: C.white,
                        fontSize: 13,
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      View Catalog
                      <span aria-hidden="true" style={{ fontSize: 15, lineHeight: 1 }}>
                        ↗
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )
      )}
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
                <rect x="4" y="5" width="12" height="10" rx="1.5" fill={CAL_POLY.green} fillOpacity={0.72} />
                <path d="M7 9l2 2 4-3" stroke={C.white} strokeWidth="1.2" strokeLinecap="round" />
              </>
            }
            name="Computer Science for the Common Good Club"
            role="Member"
            color={CAL_POLY.green}
            bg={`${CAL_POLY.lightGreen}2e`}
            desc="Examined how computer science intersects with ethics, accessibility, and real-world impact — reinforcing that software is a tool for meaningful change, not just technical output."
            delay={0}
          />
          <ClubCard
            icon={
              <>
                <path
                  d="M5 15l5-9 5 9"
                  stroke={CAL_POLY.gold}
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line x1="7" y1="12" x2="13" y2="12" stroke={CAL_POLY.gold} strokeWidth="1.3" />
              </>
            }
            name="Game Design Club"
            role="Member"
            color={CAL_POLY.gold}
            bg={`${CAL_POLY.gold}18`}
            desc="Combined design thinking and logic using Godot — contributing to game jams, design documents, and peer critiques in a collaborative environment that encouraged creative confidence."
            delay={80}
          />
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
            bg={`${C.sky}72`}
            desc="A hands-on creative space for discussing film, sharing projects, and building portfolios — contributing ideas, giving feedback, and applying storytelling principles to future career goals."
            delay={160}
          />
        </div>
      </div>
    </MiracostaSection>
  );
}

function ClosingSection() {
  return (
    <section
      style={{
        background: `radial-gradient(circle at 82% 14%, ${CAL_POLY.lightGreen}2b 0%, transparent 34%), radial-gradient(circle at 14% 82%, ${CAL_POLY.lightGreen}1a 0%, transparent 28%), ${CAL_POLY.green}`,
        padding: "96px 48px 108px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "8%",
          right: "8%",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${CAL_POLY.lightGreen}22 0%, transparent 70%)`,
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
          background: `radial-gradient(circle, ${CAL_POLY.lightGreen}18 0%, transparent 70%)`,
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
                background: CAL_POLY.gold,
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
          <span style={{ color: CAL_POLY.gold, fontStyle: "italic" }}>is the whole point.</span>
        </h2>

        <p style={{ fontSize: 17, color: "rgba(255, 255, 255, 0.82)", lineHeight: 1.85, maxWidth: 500, margin: "0 auto 52px", fontWeight: 300 }}>
          That work was more than a milestone. It secured my admission to <strong style={{ color: CAL_POLY.gold }}>*Future College*</strong> — proof that the foundation built at MiraCosta was exactly the right one. The next chapter begins now.
        </p>

        <div style={{ marginBottom: 64 }}>
          <a
            href="/future-college"
            className="button"
            style={{
              "--button-bg": CAL_POLY.gold,
              "--button-fg": "#111111",
              "--button-border": "transparent",
              "--button-hover-bg": C.white,
              "--button-hover-fg": "#111111",
              "--button-hover-border": CAL_POLY.gold,
              fontSize: 16,
              paddingInline: 28,
            } as CSSProperties}
          >
            Continue to *Future College*
          </a>
        </div>

        <div
          style={{
            borderTop: `1px solid ${CAL_POLY.gold}33`,
            paddingTop: 32,
            fontSize: 12,
            color: "rgba(255,255,255,0.34)",
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
      <MiracostaWave fill={C.sky} />
      <MajorPrepSection />
      <MiracostaWave fill={C.cream} />
      <ClubsSection />
      <MiracostaWave fill={CAL_POLY.green} flip />
      <ClosingSection />
    </>
  );
}
