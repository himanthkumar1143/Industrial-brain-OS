import React from "react";
import type { LucideIcon } from "../../constants/icons";
import { animations } from "../../lib/animations";
import { CTAButton } from "./CTAButton";
import type { DemoMetadata } from "./HeroSection";

interface RoleCardProps {
  icon: LucideIcon;
  role: string;
  title: string;
  description: string;
  highlights: string[];
  modules?: string[];
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  loginPath: string;
  onExploreDemoClick?: (metadata?: DemoMetadata) => void;
}

/**
 * RoleCard – Premium card showcasing a platform user role.
 * Displays role icon, description, precision-aligned highlights list, and two CTAs.
 */
export const RoleCard: React.FC<RoleCardProps> = React.memo(({
  icon: Icon,
  role,
  title,
  description,
  highlights,
  modules = [],
  accentColor,
  accentBg,
  accentBorder,
  loginPath,
  onExploreDemoClick,
}) => (
  <div className={`group relative bg-[#101018]/95 border border-border rounded-2xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.3)] flex flex-col ${animations.cardHoverElevated}`}>
    {/* Role badge */}
    <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${accentBg} ${accentColor} ${accentBorder} border`}>
      {role}
    </span>

    {/* Icon */}
    <div className={`inline-flex items-center justify-center p-4 rounded-2xl ${accentBg} ${accentBorder} border mb-5 ${animations.iconScaleHover}`}>
      <Icon className={`h-8 w-8 ${accentColor}`} aria-hidden="true" />
    </div>

    {/* Title */}
    <h3 className="text-xl font-bold text-slate-100 mb-3">{title}</h3>

    {/* Description */}
    <p className="text-sm text-slate-400 leading-relaxed mb-5">{description}</p>

    {/* Highlights */}
    <ul className="space-y-2.5 mb-6 flex-1" aria-label={`${title} highlights`}>
      {highlights.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300 leading-5">
          <span className={`mt-[7px] h-1.5 w-1.5 rounded-full ${accentBg} border ${accentBorder} shrink-0`} aria-hidden="true" />
          <span className="flex-1">{item}</span>
        </li>
      ))}
    </ul>

    {/* Actions */}
    <div className="flex flex-col sm:flex-row gap-3 mt-auto">
      <CTAButton
        label="Explore Demo"
        variant="ghost"
        size="sm"
        ariaLabel={`Explore demo for ${title}`}
        onClick={() =>
          onExploreDemoClick?.({
            role: role.toLowerCase(),
            title,
            modules: modules.length > 0 ? modules : highlights,
          })
        }
      />
      <CTAButton
        label="Login"
        to={loginPath}
        state={{ role: role.toLowerCase() }}
        variant="primary"
        size="sm"
        ariaLabel={`Login as ${title}`}
      />
    </div>
  </div>
));

RoleCard.displayName = "RoleCard";
