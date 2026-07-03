import React from "react";
import { animations } from "../../lib/animations";

interface TechBadgeProps {
  name: string;
  color?: string;
  bgColor?: string;
  borderColor?: string;
}

/**
 * TechBadge – Pill-shaped badge for displaying a technology name.
 * Accepts color overrides for categorizing frontend/backend/AI tech.
 */
export const TechBadge: React.FC<TechBadgeProps> = React.memo(({
  name,
  color = "text-slate-300",
  bgColor = "bg-slate-800/50",
  borderColor = "border-slate-700/50",
}) => (
  <span className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold ${color} ${bgColor} ${borderColor} border ${animations.badgeHoverScale}`}>
    {name}
  </span>
));

TechBadge.displayName = "TechBadge";
