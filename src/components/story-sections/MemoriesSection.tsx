import type { CSSProperties, ReactNode } from "react";

import { MemoriesSlideshow, type MemoriesSlide } from "./MemoriesSlideshow";
import { C, StoryCard, StoryEyebrow, StorySection } from "./shared";

export interface MemoriesSupportCard {
  title: ReactNode;
  body: ReactNode;
  accentGradient?: string;
  style?: CSSProperties;
}

export interface MemoriesSectionProps {
  id?: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  slides: MemoriesSlide[];
  supportCard?: MemoriesSupportCard;
  bgColor?: string;
  bgSpeed?: number;
  sectionStyle?: CSSProperties;
  containerStyle?: CSSProperties;
  titleStyle?: CSSProperties;
  descriptionStyle?: CSSProperties;
}

export function MemoriesSection({
  id = "memories",
  eyebrow,
  title,
  description,
  slides,
  supportCard,
  bgColor = `linear-gradient(165deg, ${C.sand} 0%, #f0e8d8 55%, ${C.sand} 100%)`,
  bgSpeed = 0.18,
  sectionStyle,
  containerStyle,
  titleStyle,
  descriptionStyle,
}: MemoriesSectionProps) {
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
            marginBottom: 16,
            ...titleStyle,
          }}
        >
          {title}
        </h2>
        {description && (
          <div
            style={{
              fontSize: 16,
              color: C.muted,
              lineHeight: 1.8,
              maxWidth: 500,
              marginBottom: 52,
              fontWeight: 300,
              ...descriptionStyle,
            }}
          >
            {description}
          </div>
        )}

        <MemoriesSlideshow slides={slides} />

        {supportCard && (
          <div style={{ marginTop: 40 }}>
            <StoryCard style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap", ...supportCard.style }}>
              <div
                style={{
                  width: 3,
                  minHeight: 56,
                  background: supportCard.accentGradient ?? `linear-gradient(to bottom, ${C.teal}, #9b6b9b)`,
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
                  {supportCard.title}
                </div>
                <div style={{ fontSize: 14, color: C.muted, lineHeight: 1.8, margin: 0 }}>{supportCard.body}</div>
              </div>
            </StoryCard>
          </div>
        )}
      </div>
    </StorySection>
  );
}
