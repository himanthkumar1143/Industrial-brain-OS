import React from "react";

interface SectionHeadingProps {
  id?: string;
  title: string;
  subtitle?: string;
  badge?: string;
  align?: "center" | "left";
}

/**
 * SectionHeading – Reusable section title block with optional badge and subtitle.
 * Uses the design system's gradient text for visual emphasis.
 */
export const SectionHeading: React.FC<SectionHeadingProps> = React.memo(({
  id,
  title,
  subtitle,
  badge,
  align = "center",
}) => (
  <div className={`mb-12 md:mb-16 ${align === "center" ? "text-center" : "text-left"}`}>
    {badge && (
      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-4">
        {badge}
      </span>
    )}
    <h2 id={id} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-100 mb-4">
      {title}
    </h2>
    {subtitle && (
      <p className="text-base sm:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    )}
  </div>
));

SectionHeading.displayName = "SectionHeading";
