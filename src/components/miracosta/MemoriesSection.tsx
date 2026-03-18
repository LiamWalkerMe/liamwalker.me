import { MemoriesSlideshow } from "./MemoriesSlideshow";
import { C, MiracostaCard, MiracostaEyebrow, MiracostaSection } from "./shared";

export function MemoriesSection() {
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
