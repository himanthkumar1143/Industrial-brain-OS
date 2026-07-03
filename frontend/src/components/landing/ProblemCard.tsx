import React from "react";
import type { LucideIcon } from "../../constants/icons";
import { animations } from "../../lib/animations";

interface ProblemCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

/**
 * ProblemCard – Displays a single industry pain-point.
 * Uses a red-amber color scheme to signal urgency and hover lift animation.
 */
export const ProblemCard: React.FC<ProblemCardProps> = React.memo(({
  icon: Icon,
  title,
  description,
}) => (
  <div className={`group bg-[#101018]/95 border border-border rounded-2xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.3)] hover:border-red-500/30 ${animations.cardHover}`}>
    {/* Icon */}
    <div className={`inline-flex items-center justify-center p-3 rounded-xl bg-red-500/10 border border-red-500/20 mb-4 ${animations.iconScaleHover}`}>
      <Icon className="h-6 w-6 text-red-400" aria-hidden="true" />
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

ProblemCard.displayName = "ProblemCard";
