import React from "react";
import type { ReactNode } from "react";

export interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: string;
  action?: ReactNode;
  className?: string;
}

/**
 * PageHeader – Reusable enterprise header for dashboard views.
 * Displays large heading, short description, optional badge, and action slots.
 * Consumes titles and descriptions from centralized route metadata.
 */
export const PageHeader: React.FC<PageHeaderProps> = React.memo(
  ({ title, description, badge, action, className = "" }) => {
    return (
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 ${className}`}>
        <div className="space-y-1.5">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-100 tracking-tight">{title}</h1>
            {badge && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                {badge}
              </span>
            )}
          </div>
          {description && <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">{description}</p>}
        </div>
        {action && <div className="shrink-0 flex items-center gap-3">{action}</div>}
      </div>
    );
  }
);

PageHeader.displayName = "PageHeader";
