import type { CSSProperties, ReactNode } from "react";
import { GraduationCap } from "lucide-react";

import { C, StoryCard, StoryEyebrow, StorySection } from "./shared";

export interface DegreeHighlightCard {
  id?: string;
  title: ReactNode;
  body: ReactNode;
  color?: string;
  delay?: number;
  cardStyle?: CSSProperties;
}

export interface DegreeCallout {
  eyebrow?: ReactNode;
  title: ReactNode;
  meta?: ReactNode;
  icon?: ReactNode;
  background?: string;
  accentColor?: string;
  eyebrowColor?: string;
  titleColor?: string;
  metaColor?: string;
  style?: CSSProperties;
}

export interface DegreeSectionProps {
  id?: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  cards: DegreeHighlightCard[];
  callout: DegreeCallout;
  bgColor?: string;
  bgSpeed?: number;
  sectionStyle?: CSSProperties;
  containerStyle?: CSSProperties;
  titleStyle?: CSSProperties;
  gridStyle?: CSSProperties;
}

function DefaultDegreeSeal({ color }: { color: string }) {
  return <GraduationCap size={28} strokeWidth={1.8} color={color} />;
}

export function DegreeSection({
  id = "degree",
  eyebrow,
  title,
  cards,
  callout,
  bgColor = `linear-gradient(160deg, ${C.cream} 0%, ${C.sky}55 60%, ${C.seafoam}40 100%)`,
  bgSpeed = 0.22,
  sectionStyle,
  containerStyle,
  titleStyle,
  gridStyle,
}: DegreeSectionProps) {
  const calloutAccentColor = callout.accentColor ?? C.gold;

  return (
    <StorySection
      id={id}
      bgColor={bgColor}
      bgSpeed={bgSpeed}
      style={{ padding: "96px 48px 88px", ...sectionStyle }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto", ...containerStyle }}>
        {eyebrow && <StoryEyebrow>{eyebrow}</StoryEyebrow>}
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
            ...titleStyle,
          }}
        >
          {title}
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 18, marginBottom: 32, ...gridStyle }}>
          {cards.map((highlight, index) => (
            <StoryCard key={highlight.id ?? index} delay={highlight.delay ?? 0} style={highlight.cardStyle}>
              <div style={{ width: 3, height: 28, background: highlight.color ?? C.blue, borderRadius: 2, marginBottom: 16 }} />
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: highlight.color ?? C.blue,
                  marginBottom: 8,
                }}
              >
                {highlight.title}
              </div>
              <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.75, margin: 0 }}>{highlight.body}</p>
            </StoryCard>
          ))}
        </div>

        <div
          style={{
            background: callout.background ?? C.navy,
            borderRadius: 18,
            padding: "36px 44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
            boxShadow: `0 16px 48px ${(callout.background ?? C.navy)}30`,
            ...callout.style,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                color: callout.eyebrowColor ?? `${C.sky}99`,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              {callout.eyebrow}
            </div>
            <div
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(18px, 2.8vw, 28px)",
                fontWeight: 700,
                color: callout.titleColor ?? C.white,
                lineHeight: 1.2,
              }}
            >
              {callout.title}
            </div>
            {callout.meta && (
              <div style={{ color: callout.metaColor ?? `${C.sky}aa`, fontSize: 14, marginTop: 6, fontWeight: 300 }}>
                {callout.meta}
              </div>
            )}
          </div>
          <div
            className="spin"
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              border: `1.5px dashed ${calloutAccentColor}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {callout.icon ?? <DefaultDegreeSeal color={calloutAccentColor} />}
          </div>
        </div>
      </div>
    </StorySection>
  );
}
