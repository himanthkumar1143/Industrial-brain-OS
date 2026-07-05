import React from "react";
import { FolderOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { EMPTY_MESSAGES } from "../../../constants/uiStates";

export interface EmptyStateProps {
  /** Optional Lucide icon to display at the top of the empty state. */
  icon?: LucideIcon;
  /** Optional custom React node or branded illustration (takes precedence over icon and imageUrl). */
  illustration?: React.ReactNode;
  /** Optional image URL to display as an illustration fallback. */
  imageUrl?: string;
  /** Primary empty state heading. */
  title?: string;
  /** Secondary descriptive text explaining why it is empty or what to do next. */
  description?: string;
  /** Optional action button callback. */
  onAction?: () => void;
  /** Optional onClick callback (fallback for onAction). */
  onClick?: () => void;
  /** Label for the action button. */
  actionLabel?: string;
  /** Optional route path or URL for action link instead of callback button. */
  actionHref?: string;
  /** Optional custom child elements (e.g. additional action links or info cards). */
  children?: React.ReactNode;
}

/**
 * EmptyState – Reusable enterprise empty placeholder.
 * Supports Lucide icons, branded illustrations, custom images, action buttons/links, and child content.
 * Designed with zero layout shifts and modern glassmorphism styling.
 */
export const EmptyState: React.FC<EmptyStateProps> = React.memo(({
  icon: Icon = FolderOpen,
  illustration,
  imageUrl,
  title = EMPTY_MESSAGES.common.title,
  description = EMPTY_MESSAGES.common.description,
  onAction,
  onClick,
  actionLabel,
  actionHref,
  children,
}) => {
  return (
    <div
      role="region"
      aria-label={title}
      className="flex flex-col items-center justify-center text-center p-8 md:p-12 min-h-[320px] w-full rounded-3xl border border-border/80 bg-card/50 backdrop-blur-md shadow-xl max-w-2xl mx-auto space-y-6 animate-fade-in"
    >
      {/* Visual Header: Illustration -> Image -> Lucide Icon */}
      {illustration ? (
        <div className="flex justify-center mb-2">{illustration}</div>
      ) : imageUrl ? (
        <div className="flex justify-center mb-2">
          <img
            src={imageUrl}
            alt={title}
            className="h-28 w-auto object-contain rounded-2xl shadow-sm"
          />
        </div>
      ) : (
        <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-primary/10 border border-primary/20 text-primary shadow-inner">
          <Icon className="h-10 w-10 animate-pulse" />
        </div>
      )}

      {/* Text Content */}
      <div className="space-y-2 max-w-md mx-auto">
        <h3 className="text-xl md:text-2xl font-bold text-slate-100 tracking-tight">
          {title}
        </h3>
        <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Primary Action Controls */}
      {actionLabel && (
        <div className="pt-2">
          {actionHref ? (
            <Link
              to={actionHref}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs shadow-lg shadow-primary/20 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span>{actionLabel}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <button
              type="button"
              onClick={onAction || onClick}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs shadow-lg shadow-primary/20 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span>{actionLabel}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      {/* Optional Child Elements */}
      {children && <div className="w-full pt-4 border-t border-border/60">{children}</div>}
    </div>
  );
});

EmptyState.displayName = "EmptyState";
