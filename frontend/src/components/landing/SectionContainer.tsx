import React from "react";

interface SectionContainerProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  ariaLabelledBy?: string;
}

/**
 * SectionContainer – Reusable wrapper for landing page sections.
 * Provides consistent max-width, horizontal padding, and vertical spacing.
 */
export const SectionContainer: React.FC<SectionContainerProps> = React.memo(({
  id,
  children,
  className = "",
  ariaLabel,
  ariaLabelledBy,
}) => (
  <section
    id={id}
    aria-label={ariaLabel}
    aria-labelledby={ariaLabelledBy}
    className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 ${className}`}
  >
    {children}
  </section>
));

SectionContainer.displayName = "SectionContainer";
