import { C, MiracostaCard, MiracostaEyebrow, MiracostaSection } from "./shared";

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

export function DegreeSection() {
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
