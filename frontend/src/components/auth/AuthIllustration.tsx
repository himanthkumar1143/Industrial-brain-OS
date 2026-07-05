import React from "react";

interface AuthIllustrationProps {
  role?: "junior" | "senior" | "admin";
}

/**
 * AuthIllustration – Lightweight, zero-CLS SVG illustration representing
 * enterprise neural architecture and secure industrial data pipelines.
 * Avoids heavy JS animations to maintain 60 FPS performance and fast hydration.
 */
export const AuthIllustration: React.FC<AuthIllustrationProps> = React.memo(({ role = "admin" }) => {
  const primaryColor = {
    junior: "#38bdf8", // Sky blue
    senior: "#f59e0b", // Amber
    admin: "#a855f7",  // Purple
  }[role];

  return (
    <div className="w-full max-w-[340px] aspect-square relative flex items-center justify-center select-none pointer-events-none">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 rounded-full opacity-20 blur-3xl"
        style={{ background: `radial-gradient(circle, ${primaryColor} 0%, transparent 70%)` }}
      />

      {/* Lightweight SVG Neural Network Grid */}
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]"
      >
        {/* Outer security rings */}
        <circle cx="200" cy="200" r="160" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
        <circle cx="200" cy="200" r="120" stroke="#475569" strokeWidth="1.5" opacity="0.6" />
        <circle cx="200" cy="200" r="80" stroke={primaryColor} strokeWidth="1" strokeDasharray="8 8" opacity="0.7" />

        {/* Connecting Data Pipelines */}
        <line x1="200" y1="40" x2="200" y2="360" stroke="#334155" strokeWidth="1" opacity="0.3" />
        <line x1="40" y1="200" x2="360" y2="200" stroke="#334155" strokeWidth="1" opacity="0.3" />
        <line x1="87" y1="87" x2="313" y2="313" stroke="#334155" strokeWidth="1" opacity="0.3" />
        <line x1="313" y1="87" x2="87" y2="313" stroke="#334155" strokeWidth="1" opacity="0.3" />

        {/* Peripheral Telemetry Nodes */}
        <circle cx="200" cy="40" r="6" fill="#1e293b" stroke={primaryColor} strokeWidth="2" />
        <circle cx="200" cy="360" r="6" fill="#1e293b" stroke={primaryColor} strokeWidth="2" />
        <circle cx="40" cy="200" r="6" fill="#1e293b" stroke={primaryColor} strokeWidth="2" />
        <circle cx="360" cy="200" r="6" fill="#1e293b" stroke={primaryColor} strokeWidth="2" />

        {/* Mid-tier Processing Nodes */}
        <circle cx="115" cy="115" r="5" fill={primaryColor} opacity="0.8" />
        <circle cx="285" cy="115" r="5" fill={primaryColor} opacity="0.8" />
        <circle cx="115" cy="285" r="5" fill={primaryColor} opacity="0.8" />
        <circle cx="285" cy="285" r="5" fill={primaryColor} opacity="0.8" />

        {/* Central Brain Core */}
        <circle cx="200" cy="200" r="45" fill="#0f172a" stroke={primaryColor} strokeWidth="3" />
        <circle cx="200" cy="200" r="30" fill={primaryColor} opacity="0.2" />
        <circle cx="200" cy="200" r="15" fill={primaryColor} />

        {/* Inner Core Pulse */}
        <circle cx="200" cy="200" r="6" fill="#ffffff" />
      </svg>
    </div>
  );
});

AuthIllustration.displayName = "AuthIllustration";
