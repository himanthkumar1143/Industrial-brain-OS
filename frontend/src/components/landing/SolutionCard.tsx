import React from "react";
import type { LucideIcon } from "../../constants/icons";
import { animations } from "../../lib/animations";

interface SolutionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

/**
 * SolutionCard – Displays how Industrial Brain OS solves a specific pain-point.
 * Uses the primary/emerald palette to convey a positive/solution theme.
 */
export const SolutionCard: React.FC<SolutionCardProps> = React.memo(({
  icon: Icon,
  title,
  description,
}) => (
  <div className={`group bg-[#101018]/95 border border-border rounded-2xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.3)] hover:border-emerald-500/30 ${animations.cardHover}`}>
    {/* Icon */}
    <div className={`inline-flex items-center justify-center p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-4 ${animations.iconScaleHover}`}>
      <Icon className="h-6 w-6 text-emerald-400" aria-hidden="true" />
    </div>

    {/* Title */}
    <h3 className="text-lg font-bold text-slate-100 mb-2">
      {title}
    </h3>

    {/* Description */}
    <p className="text-sm text-slate-400 leading-relaxed">
      {description}
    </p>
  </div>
));

SolutionCard.displayName = "SolutionCard";
