import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FileQuestion, ArrowLeft, Bug } from "lucide-react";
import { NOT_FOUND_MESSAGES } from "../../../constants/uiStates";

export interface NotFoundStateProps {
  /** Optional custom title override. Defaults to 404. */
  title?: string;
  /** Optional custom subtitle override. Defaults to Page Not Found. */
  subtitle?: string;
  /** Optional custom description. */
  description?: string;
}

/**
 * NotFoundState – Reusable enterprise 404 state component for unknown dashboard routes.
 * Displays clean return action to Dashboard Command and renders current route debugging
 * exclusively in development environments (import.meta.env.DEV).
 */
export const NotFoundState: React.FC<NotFoundStateProps> = React.memo(({
  title = NOT_FOUND_MESSAGES.dashboard.title,
  subtitle = NOT_FOUND_MESSAGES.dashboard.subtitle,
  description = NOT_FOUND_MESSAGES.dashboard.description,
}) => {
  const location = useLocation();

  return (
    <div
      role="region"
      aria-label="Page Not Found"
      className="flex flex-col items-center justify-center text-center p-8 md:p-12 min-h-[50vh] w-full rounded-3xl border border-border/80 bg-card/50 backdrop-blur-md shadow-xl max-w-2xl mx-auto space-y-6 animate-fade-in my-auto"
    >
      {/* Icon */}
      <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shadow-inner">
        <FileQuestion className="h-10 w-10 animate-pulse" />
      </div>

      {/* Typography */}
      <div className="space-y-2 max-w-md mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400">
          {title}
        </h2>
        <p className="text-lg md:text-xl font-bold text-slate-100">{subtitle}</p>
        <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Dev-Only Route Debugging Badge (Strictly hidden in production build) */}
      {import.meta.env.DEV && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-[11px] font-mono text-slate-300 max-w-full overflow-hidden shadow-inner">
          <Bug className="h-3.5 w-3.5 text-amber-400 shrink-0" />
          <span className="text-slate-500 font-semibold uppercase tracking-wider text-[9px] mr-1 shrink-0">
            Current Route:
          </span>
          <span className="truncate font-semibold text-amber-300">{location.pathname}</span>
        </div>
      )}

      {/* Action Control */}
      <div className="pt-2">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs shadow-lg shadow-primary/20 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Dashboard Command</span>
        </Link>
      </div>
    </div>
  );
});

NotFoundState.displayName = "NotFoundState";
