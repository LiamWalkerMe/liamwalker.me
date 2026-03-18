import { useCallback, useEffect, useRef, useState } from "react";

import { C, MiracostaPhotoPlaceholder } from "./shared";

interface Slide {
  label: string;
  caption: string;
  sub: string;
}

const SLIDES: Slide[] = [
  { label: "Graduation Ceremony", caption: "Commencement · May 22nd 2026", sub: "FrontWave Arena - Oceanside" },
  { label: "With Close Friends", caption: "Family", sub: "FrontWave Arena - Oceanside" },
  { label: "Cap & Gown", caption: "Friends", sub: "FrontWave Arena - Oceanside" },
  { label: "Family Celebration", caption: "Final day on campus", sub: "MiraCosta College - Oceanside" },
];

export function MemoriesSlideshow() {
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
