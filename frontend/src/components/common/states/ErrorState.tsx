import React from "react";
import { AlertTriangle, RefreshCw, ArrowLeft, LayoutDashboard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { ERROR_MESSAGES } from "../../../constants/uiStates";

export type ActionConfig =
  | string
  | {
      label?: string;
      text?: string;
      title?: string;
      onClick?: () => void;
      onAction?: () => void;
      handler?: () => void;
      href?: string;
      to?: string;
      url?: string;
      icon?: LucideIcon;
    };

export interface ErrorStateProps {
  /** Optional Lucide icon to display. Defaults to AlertTriangle. */
  icon?: LucideIcon;
  /** Primary error heading. */
  title?: string;
  /** Secondary error description or diagnostic message. */
  description?: string;
  /** Convenience handler for Retry action. */
  onRetry?: () => void;
  /** Primary action configuration or keyword ('Retry', 'Dashboard', 'Back'). */
  primaryAction?: ActionConfig;
  /** Secondary action configuration or keyword ('Dashboard', 'Back', 'Retry'). */
  secondaryAction?: ActionConfig;
  /** Optional fallback action label */
  actionLabel?: string;
  /** Optional fallback action callback */
  onAction?: () => void;
  /** Optional fallback action link */
  actionHref?: string;
}

/**
 * ErrorState – Enterprise error display component.
 * Fully generic support for Retry, Go Back, Dashboard, and custom secondary actions.
 * Enforces WCAG AA compliance with role="alert" and high-contrast styling.
 */
export const ErrorState: React.FC<ErrorStateProps> = React.memo(({
  icon: Icon = AlertTriangle,
  title = ERROR_MESSAGES.common.title,
  description = ERROR_MESSAGES.common.description,
  onRetry,
  primaryAction,
  secondaryAction,
  actionLabel,
  onAction,
  actionHref,
}) => {
  const navigate = useNavigate();

  // Helper to resolve string keywords ('Retry', 'Dashboard', 'Back') or custom action objects
  const resolveAction = (config?: ActionConfig, isPrimary = false) => {
    if (!config) {
      if (isPrimary && actionLabel) {
        return { label: actionLabel, onClick: onAction || onRetry, href: actionHref };
      }
      if (isPrimary && (onRetry || onAction)) {
        return { label: "Retry", onClick: onRetry || onAction, icon: RefreshCw };
      }
      return null;
    }

    if (typeof config === "string") {
      const lower = config.toLowerCase();
      if (lower === "retry") {
        return { label: "Retry", onClick: onRetry || onAction, icon: RefreshCw };
      }
      if (lower === "dashboard" || lower === "go dashboard" || lower === "return to dashboard") {
        return { label: "Return to Dashboard", href: "/dashboard", icon: LayoutDashboard };
      }
      if (lower === "back" || lower === "go back") {
        return { label: "Go Back", onClick: () => navigate(-1), icon: ArrowLeft };
      }
      return { label: config, onClick: onRetry || onAction };
    }

    // Normalize object schemas (supporting label/text/title, onClick/onAction/handler, href/to/url)
    const label = config.label || config.text || config.title || (isPrimary ? "Retry" : "Action");
    const onClick = config.onClick || config.onAction || config.handler || (isPrimary ? (onRetry || onAction) : undefined);
    const href = config.href || config.to || config.url;

    // Infer icon if not provided
    let ActionIcon = config.icon;
    if (!ActionIcon && typeof label === "string") {
      const lower = label.toLowerCase();
      if (lower.includes("retry") || lower.includes("refresh") || lower.includes("try again")) {
        ActionIcon = RefreshCw;
      } else if (lower.includes("dashboard") || lower.includes("home")) {
        ActionIcon = LayoutDashboard;
      } else if (lower.includes("back") || lower.includes("return")) {
        ActionIcon = ArrowLeft;
      }
    }

    return { label, onClick, href, icon: ActionIcon };
  };

  const resolvedPrimary = resolveAction(primaryAction, true);
  const resolvedSecondary = resolveAction(secondaryAction, false);

  type ResolvedAction = {
    label: string;
    onClick?: () => void;
    href?: string;
    icon?: React.ComponentType<{ className?: string }>;
  } | null;

  const renderButton = (action: ResolvedAction, isPrimary: boolean) => {
    if (!action) return null;
    const ActionIcon = action.icon;
    const baseClass = "inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-xs transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-md";
    const styleClass = isPrimary
      ? "bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20"
      : "bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-border/80 shadow-slate-900/40";

    if (action.href) {
      return (
        <Link key={action.label} to={action.href} className={`${baseClass} ${styleClass}`}>
          {ActionIcon && <ActionIcon className="h-4 w-4" />}
          <span>{action.label}</span>
        </Link>
      );
    }

    return (
      <button
        key={action.label}
        type="button"
        onClick={action.onClick}
        className={`${baseClass} ${styleClass}`}
      >
        {ActionIcon && <ActionIcon className="h-4 w-4" />}
        <span>{action.label}</span>
      </button>
    );
  };

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="flex flex-col items-center justify-center text-center p-8 md:p-12 min-h-[320px] w-full rounded-3xl border border-rose-500/20 bg-card/60 backdrop-blur-md shadow-2xl max-w-2xl mx-auto space-y-6 animate-fade-in"
    >
      {/* Visual Header */}
      <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-rose-500/10 border border-rose-500/20 text-rose-400 shadow-inner">
        <Icon className="h-10 w-10 animate-pulse" />
      </div>

      {/* Error Content */}
      <div className="space-y-2 max-w-md mx-auto">
        <h3 className="text-xl md:text-2xl font-bold text-slate-100 tracking-tight">
          {title}
        </h3>
        {description && (
          <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Action Controls */}
      {(resolvedPrimary || resolvedSecondary) && (
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {renderButton(resolvedPrimary, true)}
          {renderButton(resolvedSecondary, false)}
        </div>
      )}
    </div>
  );
});

ErrorState.displayName = "ErrorState";
