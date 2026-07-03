import React from "react";
import { Link } from "react-router-dom";
import type { LucideIcon } from "../../constants/icons";

type CTAVariant = "primary" | "secondary" | "ghost";

interface CTAButtonProps {
  label: string;
  to?: string;
  state?: Record<string, unknown>;
  onClick?: () => void;
  variant?: CTAVariant;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  size?: "sm" | "md" | "lg";
  className?: string;
  ariaLabel?: string;
}

const variantStyles: Record<CTAVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-primary/40",
  secondary:
    "bg-slate-800/60 text-slate-200 border border-border hover:bg-slate-700/60 hover:border-slate-600",
  ghost:
    "bg-transparent text-primary border border-primary/30 hover:bg-primary/10 hover:border-primary/50",
};

const sizeStyles: Record<"sm" | "md" | "lg", string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-2.5 text-sm gap-2",
  lg: "px-8 py-3 text-base gap-2.5",
};

/**
 * CTAButton – Reusable call-to-action button with variants.
 * Renders as a Link when `to` is provided (supporting route `state`), otherwise as a button.
 */
export const CTAButton: React.FC<CTAButtonProps> = React.memo(({
  label,
  to,
  state,
  onClick,
  variant = "primary",
  icon: Icon,
  iconPosition = "left",
  size = "md",
  className = "",
  ariaLabel,
}) => {
  const baseClasses = `inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f] ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  const content = (
    <>
      {Icon && iconPosition === "left" && <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />}
      <span>{label}</span>
      {Icon && iconPosition === "right" && <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} state={state} className={baseClasses} aria-label={ariaLabel || label}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={baseClasses} aria-label={ariaLabel || label}>
      {content}
    </button>
  );
});

CTAButton.displayName = "CTAButton";
