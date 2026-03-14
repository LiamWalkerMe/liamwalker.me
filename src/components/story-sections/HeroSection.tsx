import type { CSSProperties, ReactNode } from "react";

import { C, StorySection } from "./shared";

export interface HeroAction {
  id?: string;
  label: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  style?: CSSProperties;
}

export interface HeroStat {
  id?: string;
  value: ReactNode;
  label: ReactNode;
  style?: CSSProperties;
}

export interface HeroSectionProps {
  id?: string;
  badge?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: HeroAction[];
  stats?: HeroStat[];
  bgColor?: string;
  bgSpeed?: number;
  sectionStyle?: CSSProperties;
  containerStyle?: CSSProperties;
  contentStyle?: CSSProperties;
  badgeStyle?: CSSProperties;
  titleStyle?: CSSProperties;
  descriptionStyle?: CSSProperties;
  actionsStyle?: CSSProperties;
  statsWrapStyle?: CSSProperties;
  statsDelayStart?: number;
}

function getActionBaseStyle(variant: HeroAction["variant"]): CSSProperties {
  if (variant === "secondary") {
    return {
      background: "transparent",
      color: C.navy,
      padding: "13px 28px",
      borderRadius: 100,
      fontSize: 14,
      fontWeight: 500,
      border: `1.5px solid ${C.navy}35`,
      textDecoration: "none",
      letterSpacing: "0.04em",
      transition: "background 0.2s, color 0.2s, border-color 0.2s, transform 0.2s",
      display: "inline-block",
    };
  }

  return {
    background: C.navy,
    color: C.white,
    padding: "13px 30px",
    borderRadius: 100,
    fontSize: 14,
    fontWeight: 500,
    border: `1.5px solid ${C.navy}`,
    textDecoration: "none",
    letterSpacing: "0.04em",
    transition: "background 0.2s, color 0.2s, border-color 0.2s, transform 0.2s",
    display: "inline-block",
  };
}

export function HeroSection({
  id = "hero",
  badge,
  title,
  description,
  actions = [],
  stats = [],
  bgColor = `linear-gradient(150deg, ${C.sky} 0%, ${C.seafoam} 55%, ${C.sand} 100%)`,
  bgSpeed = 0.20,
  sectionStyle,
  containerStyle,
  contentStyle,
  badgeStyle,
  titleStyle,
  descriptionStyle,
  actionsStyle,
  statsWrapStyle,
  statsDelayStart = 560,
}: HeroSectionProps) {
  return (
    <StorySection
      id={id}
      bgColor={bgColor}
      bgSpeed={bgSpeed}
      style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", ...sectionStyle }}
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
          ...containerStyle,
        }}
      >
        <div style={{ maxWidth: 680, ...contentStyle }}>
          {badge && (
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
                ...badgeStyle,
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.teal }} />
              {badge}
            </div>
          )}

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
              ...titleStyle,
            }}
          >
            {title}
          </h1>

          {description && (
            <div
              className="h1-3"
              style={{
                fontSize: "clamp(15px, 1.8vw, 18px)",
                color: C.muted,
                lineHeight: 1.85,
                maxWidth: 500,
                fontWeight: 300,
                margin: "0 auto 44px",
                ...descriptionStyle,
              }}
            >
              {description}
            </div>
          )}

          {actions.length > 0 && (
            <div className="h1-3" style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", ...actionsStyle }}>
              {actions.map((action) => (
                <a
                  key={action.id ?? action.href}
                  href={action.href}
                  style={{ ...getActionBaseStyle(action.variant), ...action.style }}
                  onMouseOver={(e) => {
                    if (action.variant === "secondary") {
                      e.currentTarget.style.background = C.navy;
                      e.currentTarget.style.color = C.white;
                      e.currentTarget.style.borderColor = C.navy;
                      e.currentTarget.style.transform = "translateY(-2px)";
                    } else {
                      e.currentTarget.style.background = C.white;
                      e.currentTarget.style.color = C.navy;
                      e.currentTarget.style.borderColor = C.navy;
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }
                  }}
                  onMouseOut={(e) => {
                    if (action.variant === "secondary") {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = C.navy;
                      e.currentTarget.style.borderColor = `${C.navy}35`;
                      e.currentTarget.style.transform = "translateY(0)";
                    } else {
                      e.currentTarget.style.background = C.navy;
                      e.currentTarget.style.color = C.white;
                      e.currentTarget.style.borderColor = C.navy;
                      e.currentTarget.style.transform = "translateY(0)";
                    }
                  }}
                >
                  {action.label}
                </a>
              ))}
            </div>
          )}
        </div>

        {stats.length > 0 && (
          <div style={{ display: "flex", gap: 14, marginTop: 64, flexWrap: "wrap", justifyContent: "center", ...statsWrapStyle }}>
            {stats.map((stat, index) => (
            <div
              key={stat.id ?? index}
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
                animationDelay: `${statsDelayStart + index * 100}ms`,
                boxShadow: "0 4px 20px rgba(13,59,110,0.07)",
                ...stat.style,
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
                {stat.value}
              </span>
              <span style={{ width: 1, height: 28, background: `${C.navy}18`, display: "block" }} />
              <span style={{ fontSize: 12, color: C.muted, lineHeight: 1.4 }}>{stat.label}</span>
            </div>
            ))}
          </div>
        )}
      </div>
    </StorySection>
  );
}
