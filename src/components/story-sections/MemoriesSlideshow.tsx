import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

import { C, StoryPhotoPlaceholder } from "./shared";

export interface MemoriesSlide {
  id?: string;
  placeholderLabel?: string;
  caption: ReactNode;
  sub: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  imageStyle?: CSSProperties;
  thumbnailImageStyle?: CSSProperties;
  media?: ReactNode;
  thumbnail?: ReactNode;
}

export interface MemoriesSlideshowProps {
  slides: MemoriesSlide[];
  autoAdvanceMs?: number;
  layoutStyle?: CSSProperties;
  mainColumnStyle?: CSSProperties;
  thumbnailColumnStyle?: CSSProperties;
}

function renderSlideMedia(slide: MemoriesSlide, index: number, variant: "main" | "thumb") {
  if (variant === "main" && slide.media) {
    return slide.media;
  }

  if (variant === "thumb" && slide.thumbnail) {
    return slide.thumbnail;
  }

  if (slide.imageSrc) {
    return (
      <img
        src={slide.imageSrc}
        alt={slide.imageAlt ?? ""}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          objectFit: "cover",
          ...(variant === "main" ? slide.imageStyle : slide.thumbnailImageStyle ?? slide.imageStyle),
        }}
      />
    );
  }

  return (
    <StoryPhotoPlaceholder
      label={variant === "main" ? slide.placeholderLabel ?? "" : ""}
      aspectRatio={variant === "main" ? "4/5" : "1"}
      index={index}
    />
  );
}

export function MemoriesSlideshow({
  slides,
  autoAdvanceMs = 4000,
  layoutStyle,
  mainColumnStyle,
  thumbnailColumnStyle,
}: MemoriesSlideshowProps) {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (active >= slides.length) {
      setActive(0);
    }
  }, [active, slides.length]);

  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, autoAdvanceMs);
  }, [autoAdvanceMs, slides.length]);

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }

    startTimer();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [slides.length, startTimer]);

  const goTo = (index: number) => {
    setActive(index);
    if (slides.length > 1) {
      startTimer();
    }
  };

  if (slides.length === 0) {
    return null;
  }

  const previous = (active - 1 + slides.length) % slides.length;
  const next = (active + 1) % slides.length;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start", ...layoutStyle }}>
      <div style={mainColumnStyle}>
        <div
          style={{
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(13,59,110,0.14)",
            position: "relative",
          }}
        >
          {renderSlideMedia(slides[active], active, "main")}
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
            {active + 1} / {slides.length}
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
            {slides[active].caption}
          </div>
          <div style={{ fontSize: 13, color: C.muted, letterSpacing: "0.04em" }}>{slides[active].sub}</div>
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
            {slides.map((slide, index) => (
              <button
                key={slide.id ?? index}
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

      <div style={{ display: "flex", flexDirection: "column", gap: 12, ...thumbnailColumnStyle }}>
        {slides.map((slide, index) => (
          <button
            key={slide.id ?? index}
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
              {renderSlideMedia(slide, index, "thumb")}
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
