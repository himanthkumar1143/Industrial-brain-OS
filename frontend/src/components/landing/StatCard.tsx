import React from "react";
import type { LucideIcon } from "../../constants/icons";
import { animations } from "../../lib/animations";

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
}

/**
 * StatCard – Compact stat display for the platform statistics section.
 * Renders a numeric/text value with a label and icon.
 */
export const StatCard: React.FC<StatCardProps> = React.memo(({
  icon: Icon,
  value,
  label,
}) => (
  <div className="group flex flex-col items-center text-center bg-[#101018]/90 border border-border rounded-2xl p-6 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
    <div className={`inline-flex items-center justify-center p-3 rounded-xl bg-primary/10 border border-primary/20 mb-4 ${animations.iconScaleHover}`}>
      <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
    </div>
    <span className="text-3xl font-extrabold text-slate-100 mb-1">{value}</span>
    <span className="text-sm text-slate-400 font-medium">{label}</span>
  </div>
));

StatCard.displayName = "StatCard";
