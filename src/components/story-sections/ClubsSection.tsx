import { type CSSProperties, type ReactNode } from "react";

import { C, StoryEyebrow, StorySection } from "./shared";

export interface ClubItem {
  id?: string;
  icon: ReactNode;
  name: ReactNode;
  role: ReactNode;
  color: string;
  bg: string;
  desc: ReactNode;
  delay?: number;
  cardStyle?: CSSProperties;
}

export interface ClubsSectionProps {
  id?: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  clubs: ClubItem[];
  bgColor?: string;
  bgSpeed?: number;
  sectionStyle?: CSSProperties;
  containerStyle?: CSSProperties;
  titleStyle?: CSSProperties;
  descriptionStyle?: CSSProperties;
  gridStyle?: CSSProperties;
}

function ClubCard({ icon, name, role, color, bg, desc, delay = 0, cardStyle }: ClubItem) {
  return (
    <div
      className="reveal"
      style={{
        background: bg,
        border: `1px solid ${color}28`,
        borderRadius: 16,
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        transition: "transform 0.25s, box-shadow 0.25s",
        animationDelay: `${delay}ms`,
        cursor: "default",
        ...cardStyle,
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = `0 14px 36px ${color}18`;
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: `${color}18`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            width: 20,
            height: 20,
            color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </div>
      </div>
      <div>
        <div
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 16,
            fontWeight: 700,
            color: C.navy,
            marginBottom: 2,
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color,
            marginBottom: 10,
          }}
        >
          {role}
        </div>
        <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.7, margin: 0 }}>{desc}</p>
      </div>
    </div>
  );
}

export function ClubsSection({
  id = "clubs",
  eyebrow,
  title,
  description,
  clubs,
  bgColor = `linear-gradient(155deg, ${C.cream} 0%, ${C.sky}50 50%, ${C.seafoam}45 100%)`,
  bgSpeed = 0.26,
  sectionStyle,
  containerStyle,
  titleStyle,
  descriptionStyle,
  gridStyle,
}: ClubsSectionProps) {
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
          <div style={{ fontSize: 16, color: C.muted, lineHeight: 1.8, maxWidth: 500, marginBottom: 52, fontWeight: 300, ...descriptionStyle }}>
            {description}
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18, ...gridStyle }}>
          {clubs.map((club, index) => (
            <ClubCard key={club.id ?? index} {...club} />
          ))}
        </div>
      </div>
    </StorySection>
  );
}
