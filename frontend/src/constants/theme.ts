/**
 * Centralized UI theme tokens for role styling, module status indicators,
 * and design system layout primitives.
 */

export const STATUS_BADGE_THEME: Record<string, string> = {
  Available: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "Coming Soon": "bg-amber-500/15 text-amber-400 border-amber-500/30",
  "Future Sprint": "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  DEFAULT: "bg-slate-800 text-slate-300 border-slate-700",
} as const;

export const ROLE_THEME_TOKENS = {
  general: {
    primaryText: "text-cyan-400",
    primaryBg: "bg-cyan-500/10",
    primaryBorder: "border-cyan-500/20",
    badgeBg: "bg-cyan-500/15 border-cyan-500/30",
    badgeText: "text-cyan-300",
    timelineColor: "bg-cyan-500",
  },
  junior: {
    primaryText: "text-blue-400",
    primaryBg: "bg-blue-500/10",
    primaryBorder: "border-blue-500/20",
    badgeBg: "bg-blue-500/15 border-blue-500/30",
    badgeText: "text-blue-300",
    timelineColor: "bg-blue-500",
  },
  senior: {
    primaryText: "text-emerald-400",
    primaryBg: "bg-emerald-500/10",
    primaryBorder: "border-emerald-500/20",
    badgeBg: "bg-emerald-500/15 border-emerald-500/30",
    badgeText: "text-emerald-300",
    timelineColor: "bg-emerald-500",
  },
  admin: {
    primaryText: "text-purple-400",
    primaryBg: "bg-purple-500/10",
    primaryBorder: "border-purple-500/20",
    badgeBg: "bg-purple-500/15 border-purple-500/30",
    badgeText: "text-purple-300",
    timelineColor: "bg-purple-500",
  },
} as const;
