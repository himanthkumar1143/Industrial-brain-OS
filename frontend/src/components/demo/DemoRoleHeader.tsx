import React from "react";
import { X, CheckCircle2 } from "../../constants/icons";
import type { DemoColorTheme } from "../../constants/demo";

interface DemoRoleHeaderProps {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  responsibilities: string[];
  theme: DemoColorTheme;
  estimatedWalkthroughTime?: string;
  onClose: () => void;
  titleId: string;
  descId: string;
}

/**
 * DemoRoleHeader – Displays the role badge, estimated walkthrough time, title, subtitle,
 * responsibilities checklist, and top-right close action inside the Explore Demo modal.
 */
export const DemoRoleHeader: React.FC<DemoRoleHeaderProps> = React.memo(({
  badge,
  title,
  subtitle,
  description,
  responsibilities,
  theme,
  estimatedWalkthroughTime,
  onClose,
  titleId,
  descId,
}) => (
  <div className="relative border-b border-border/60 p-6 sm:p-8 bg-gradient-to-b from-[#141420] to-[#101018]">
    {/* Close Button */}
    <button
      type="button"
      onClick={onClose}
      aria-label="Close Explore Demo dialog"
      className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800/60 text-slate-400 hover:text-slate-100 hover:bg-slate-700/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
    >
      <X className="h-5 w-5" aria-hidden="true" />
    </button>

    {/* Badges Row */}
    <div className="flex flex-wrap items-center gap-2.5 mb-4 pr-12">
      <span className={`inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${theme.badgeBg} ${theme.badgeText}`}>
        {badge}
      </span>
      {estimatedWalkthroughTime && (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-800/80 text-slate-300 border border-slate-700">
          Estimated Walkthrough Time: {estimatedWalkthroughTime}
        </span>
      )}
    </div>

    {/* Title & Subtitle */}
    <h2 id={titleId} className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight mb-2">
      {title}
    </h2>
    <p className={`text-base font-semibold mb-4 ${theme.primaryText}`}>
      {subtitle}
    </p>

    {/* Description */}
    <p id={descId} className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed mb-6">
      {description}
    </p>

    {/* Responsibilities */}
    {responsibilities.length > 0 && (
      <div className="bg-[#0b0b12] border border-border/50 rounded-xl p-5">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          Key Role Responsibilities & Capabilities
        </h3>
        <ul className="grid sm:grid-cols-2 gap-3">
          {responsibilities.map((resp) => (
            <li key={resp} className="flex items-start gap-2.5 text-sm text-slate-300">
              <CheckCircle2 className={`h-4 w-4 mt-0.5 shrink-0 ${theme.primaryText}`} aria-hidden="true" />
              <span>{resp}</span>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
));

DemoRoleHeader.displayName = "DemoRoleHeader";
