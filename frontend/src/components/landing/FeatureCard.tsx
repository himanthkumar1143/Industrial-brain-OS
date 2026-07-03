import React from "react";
import type { LucideIcon } from "../../constants/icons";
import { animations } from "../../lib/animations";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
  iconColor?: string;
  iconBgColor?: string;
}

/**
 * FeatureCard – Glassmorphic-styled card for displaying platform features.
 * Optimized for high scroll FPS without heavy blur repainting.
 */
export const FeatureCard: React.FC<FeatureCardProps> = React.memo(({
  icon: Icon,
  title,
  description,
  badge,
  iconColor = "text-primary",
  iconBgColor = "bg-primary/10 border-primary/20",
}) => (
  <div className={`group relative bg-[#101018]/95 border border-border rounded-2xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.3)] hover:border-primary/30 ${animations.cardHover}`}>
    {/* Badge */}
    {badge && (
      <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-500/15 text-amber-400 border border-amber-500/20">
        {badge}
      </span>
    )}

    {/* Icon */}
    <div className={`inline-flex items-center justify-center p-3 rounded-xl ${iconBgColor} border mb-4 ${animations.iconScaleHover}`}>
      <Icon className={`h-6 w-6 ${iconColor}`} aria-hidden="true" />
    </div>

    {/* Title */}
    <h3 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-primary transition-colors duration-300">
      {title}
    </h3>

    {/* Description */}
    <p className="text-sm text-slate-400 leading-relaxed">
      {description}
    </p>
  </div>
));

FeatureCard.displayName = "FeatureCard";
