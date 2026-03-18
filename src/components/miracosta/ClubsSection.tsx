import { type ReactNode } from "react";

import { C, MiracostaEyebrow, MiracostaSection } from "./shared";

interface ClubCardProps {
  icon: ReactNode;
  name: string;
  role: string;
  color: string;
  bg: string;
  desc: string;
  delay?: number;
}

function ClubCard({ icon, name, role, color, bg, desc, delay = 0 }: ClubCardProps) {
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
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="9" stroke={color} strokeWidth="1.5" />
          {icon}
        </svg>
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

export function ClubsSection() {
  return (
    <MiracostaSection
      id="clubs"
      bgColor={`linear-gradient(155deg, ${C.cream} 0%, ${C.sky}50 50%, ${C.seafoam}45 100%)`}
      bgSpeed={0.26}
      style={{ padding: "96px 48px 88px" }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <MiracostaEyebrow>Clubs & Involvement</MiracostaEyebrow>
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
          Beyond the classroom
          <br />
          <em style={{ fontStyle: "italic", fontWeight: 400, color: C.blue, fontSize: "0.82em" }}>an educational community</em>
        </h2>
        <p style={{ fontSize: 16, color: C.muted, lineHeight: 1.8, maxWidth: 500, marginBottom: 52, fontWeight: 300 }}>
          Student involvement was where academic ambition met real collaboration — clubs that sharpened technical skills and the ability to work, build, and lead alongside others.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
          <ClubCard
            icon={
              <>
                <rect x="5" y="6" width="10" height="8" rx="1" fill={C.blue} fillOpacity={0.7} />
                <line x1="10" y1="14" x2="10" y2="16" stroke={C.blue} strokeWidth="1.2" />
                <line x1="7" y1="16" x2="13" y2="16" stroke={C.blue} strokeWidth="1.2" />
              </>
            }
            name="Film Club"
            role="Member"
            color={C.blue}
            bg={`${C.sky}55`}
            desc="A hands-on creative space for discussing film, sharing projects, and building portfolios — contributing ideas, giving feedback, and applying storytelling principles to future career goals."
            delay={0}
          />
          <ClubCard
            icon={
              <>
                <rect x="4" y="5" width="12" height="10" rx="1.5" fill={C.teal} fillOpacity={0.6} />
                <path d="M7 9l2 2 4-3" stroke={C.white} strokeWidth="1.2" strokeLinecap="round" />
              </>
            }
            name="CS for the Common Good"
            role="Member"
            color={C.teal}
            bg={`${C.seafoam}55`}
            desc="Examined how computer science intersects with ethics, accessibility, and real-world impact — reinforcing that software is a tool for meaningful change, not just technical output."
            delay={80}
          />
          <ClubCard
            icon={
              <>
                <circle cx="10" cy="8" r="3" fill="#9b6b9b" fillOpacity={0.7} />
                <path d="M4 16c0-3 2.7-5 6-5s6 2 6 5" fill="#9b6b9b" fillOpacity={0.4} />
              </>
            }
            name="LeetCode Club"
            role="Member"
            color="#9b6b9b"
            bg="#f0e8f488"
            desc="Sharpened algorithmic thinking and technical interview preparation through peer collaboration — breaking down complex problems and building confidence in both coding and communication."
            delay={160}
          />
          <ClubCard
            icon={
              <>
                <path
                  d="M5 15l5-9 5 9"
                  stroke={C.gold}
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line x1="7" y1="12" x2="13" y2="12" stroke={C.gold} strokeWidth="1.3" />
              </>
            }
            name="Game Design Club"
            role="Member"
            color={C.gold}
            bg={`${C.sand}88`}
            desc="Combined design thinking and logic using Godot — contributing to game jams, design documents, and peer critiques in a collaborative environment that encouraged creative confidence."
            delay={240}
          />
        </div>
      </div>
    </MiracostaSection>
  );
}
