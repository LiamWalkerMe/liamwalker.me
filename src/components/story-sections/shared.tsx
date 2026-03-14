import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export const C = {
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

interface StorySectionProps {
  id?: string;
  bgColor: string;
  bgSpeed?: number;
  fadeTop?: string;
  fadeBottom?: string;
  children: ReactNode;
  style?: CSSProperties;
}

export function StorySection({
  id,
  bgColor,
  bgSpeed = 0.3,
  fadeTop,
  fadeBottom,
  children,
  style = {},
}: StorySectionProps) {
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

interface StoryWaveProps {
  fill: string;
  flip?: boolean;
}

export function StoryWave({ fill, flip = false }: StoryWaveProps) {
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

interface StoryCardProps {
  children: ReactNode;
  style?: CSSProperties;
  delay?: number;
}

export function StoryCard({ children, style = {}, delay = 0 }: StoryCardProps) {
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

interface StoryEyebrowProps {
  children: ReactNode;
  style?: CSSProperties;
  lineStyle?: CSSProperties;
  textStyle?: CSSProperties;
  lineColor?: string;
  textColor?: string;
}

export function StoryEyebrow({
  children,
  style,
  lineStyle,
  textStyle,
  lineColor = C.teal,
  textColor = C.teal,
}: StoryEyebrowProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, ...style }}>
      <div style={{ width: 28, height: 2, background: lineColor, borderRadius: 2, ...lineStyle }} />
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: textColor,
          ...textStyle,
        }}
      >
        {children}
      </span>
    </div>
  );
}

interface StoryPhotoPlaceholderProps {
  label: string;
  aspectRatio?: string;
  index: number;
}

export function StoryPhotoPlaceholder({
  label,
  aspectRatio = "3/4",
  index,
}: StoryPhotoPlaceholderProps) {
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

interface StoryPageStylesProps {
  pageBackground?: string;
  topBackground?: string;
  topBackgroundHeight?: string;
  mainPaddingTop?: string;
}

export function StoryPageStyles({
  pageBackground = C.cream,
  topBackground,
  topBackgroundHeight = "240px",
  mainPaddingTop = "var(--section-gap)",
}: StoryPageStylesProps = {}) {
  const bodyBackgroundImage = topBackground ?? "none";
  const bodyBackgroundPosition = topBackground ? "center top" : "0 0";
  const bodyBackgroundSize = topBackground ? `calc(100% + 8px) ${topBackgroundHeight}` : "auto";
  const bodyBackgroundRepeat = topBackground ? "no-repeat" : "repeat";

  return (
    <style>{`
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body {
        background-color: ${pageBackground};
        background-image: ${bodyBackgroundImage};
        background-position: ${bodyBackgroundPosition};
        background-size: ${bodyBackgroundSize};
        background-repeat: ${bodyBackgroundRepeat};
        color: ${C.navy};
        font-family: 'DM Sans', sans-serif;
        overflow-x: hidden;
      }
      .main { padding-top: ${mainPaddingTop}; }

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
