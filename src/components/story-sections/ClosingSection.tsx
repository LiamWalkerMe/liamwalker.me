import type { CSSProperties, ReactNode } from "react";

import { C } from "./shared";

export interface ClosingAction {
  label: ReactNode;
  href: string;
  style?: CSSProperties;
}

export interface ClosingSectionProps {
  title: ReactNode;
  body?: ReactNode;
  action?: ClosingAction;
  footer?: ReactNode;
  backgroundColor?: string;
  orbTopColor?: string;
  orbBottomColor?: string;
  sectionStyle?: CSSProperties;
  containerStyle?: CSSProperties;
  titleStyle?: CSSProperties;
  bodyStyle?: CSSProperties;
  footerStyle?: CSSProperties;
}

export function ClosingSection({
  title,
  body,
  action,
  footer,
  backgroundColor = C.navy,
  orbTopColor = `${C.teal}1a`,
  orbBottomColor = `${C.gold}1a`,
  sectionStyle,
  containerStyle,
  titleStyle,
  bodyStyle,
  footerStyle,
}: ClosingSectionProps) {
  return (
    <section style={{ background: backgroundColor, padding: "96px 48px 108px", position: "relative", overflow: "hidden", ...sectionStyle }}>
      <div
        style={{
          position: "absolute",
          top: "8%",
          right: "8%",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${orbTopColor} 0%, transparent 70%)`,
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
          background: `radial-gradient(circle, ${orbBottomColor} 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1, ...containerStyle }}>
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
            ...titleStyle,
          }}
        >
          {title}
        </h2>

        {body && (
          <div style={{ fontSize: 17, color: `${C.sky}bb`, lineHeight: 1.85, maxWidth: 500, margin: "0 auto 52px", fontWeight: 300, ...bodyStyle }}>
            {body}
          </div>
        )}

        {action && (
          <div style={{ marginBottom: 64 }}>
            <a
              href={action.href}
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
                border: `1.5px solid ${C.gold}`,
                textDecoration: "none",
                transition: "background 0.2s, color 0.2s, border-color 0.2s, transform 0.2s",
                ...action.style,
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = C.navy;
                e.currentTarget.style.color = C.gold;
                e.currentTarget.style.borderColor = C.gold;
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = C.gold;
                e.currentTarget.style.color = C.navy;
                e.currentTarget.style.borderColor = C.gold;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {action.label}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        )}

        {footer && (
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              paddingTop: 32,
              fontSize: 12,
              color: "rgba(255,255,255,0.22)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              ...footerStyle,
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </section>
  );
}
