import React from "react";
import { Loader2 } from "lucide-react";
import { LOADING_MESSAGES } from "../../../constants/uiStates";

export interface LoadingStateProps {
  /** Size of the spinner: small (16px), medium (24px), large (36px). Defaults to medium. */
  size?: "small" | "medium" | "large";
  /** Primary status heading. Defaults to common loading title. */
  title?: string;
  /** Secondary explanatory text. */
  description?: string;
  /** If true, renders full screen with centered backdrop. */
  fullPage?: boolean;
  /** If true, renders a minimal inline/compact layout without extra padding or background card. */
  compact?: boolean;
}

/**
 * LoadingState – Enterprise loading indicator with hardware-accelerated SVG spinner.
 * Supports compact inline rendering, standard card placeholders, and full-screen blocking modes.
 * Enforces WCAG AA compliance with role="status" and aria-live="polite".
 */
export const LoadingState: React.FC<LoadingStateProps> = React.memo(({
  size = "medium",
  title = LOADING_MESSAGES.common.title,
  description = LOADING_MESSAGES.common.description,
  fullPage = false,
  compact = false,
}) => {
  // Spinner dimensions based on size prop
  const spinnerSizeClass = {
    small: "h-4 w-4",
    medium: "h-6 w-6",
    large: "h-9 w-9",
  }[size];

  // If compact mode is enabled, render minimal inline layout
  if (compact) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex items-center gap-2.5 py-2 text-slate-400 animate-fade-in"
      >
        <Loader2 className={`${spinnerSizeClass} animate-spin text-primary shrink-0`} />
        {title && <span className="text-xs font-medium text-slate-300 truncate">{title}</span>}
        <span className="sr-only">Loading</span>
      </div>
    );
  }

  // Base inner content
  const content = (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center text-center p-6 md:p-8 max-w-md mx-auto space-y-3 animate-fade-in"
    >
      <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary shadow-inner mb-1">
        <Loader2 className={`${spinnerSizeClass} animate-spin`} />
      </div>

      {title && (
        <h3 className="text-base md:text-lg font-bold text-slate-100 tracking-tight">
          {title}
        </h3>
      )}

      {description && (
        <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
          {description}
        </p>
      )}

      <span className="sr-only">{title || "Loading"}</span>
    </div>
  );

  // If fullPage mode is enabled, wrap in full screen backdrop
  if (fullPage) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0f]/80 backdrop-blur-md pointer-events-auto select-none cursor-wait">
        <div className="w-full max-w-md bg-card/90 border border-border rounded-3xl shadow-2xl p-4 pointer-events-auto cursor-default">
          {content}
        </div>
      </div>
    );
  }

  // Default container mode (fits nicely inside PageContainer or widgets)
  return (
    <div className="flex items-center justify-center min-h-[280px] w-full rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm">
      {content}
    </div>
  );
});

LoadingState.displayName = "LoadingState";
