import { C } from "./shared";

export function ClosingSection() {
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
