import { C, MiracostaSection } from "./shared";

const HERO_STATS = [
  { val: "A.S.-T", label: "Computer Science" },
  { val: "2 Years", label: "of coursework" },
  { val: "UC / CSU", label: "transfer eligible" },
];

export function HeroSection() {
  return (
    <MiracostaSection
      id="hero"
      bgColor={`linear-gradient(150deg, ${C.sky} 0%, ${C.seafoam} 55%, ${C.sand} 100%)`}
      bgSpeed={0.28}
      style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: "120px 48px 100px",
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
              lineHeight: 1,
              letterSpacing: "-0.035em",
              marginBottom: 26,
              color: C.navy,
            }}
          >
            <span className="grad-text">Two Years.</span>
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
