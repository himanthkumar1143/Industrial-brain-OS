import React from "react";
import { STATUS_BADGE_THEME } from "../../constants/theme";

interface StatusBadgeProps {
  status: string;
  sprintBadge?: string;
  className?: string;
}

/**
 * StatusBadge – Reusable pill indicator for module lifecycle status
 * (e.g., Available, Coming Soon, Future Sprint) and optional roadmap sprint numbers.
 */
export const StatusBadge: React.FC<StatusBadgeProps> = React.memo(({
  status,
  sprintBadge,
  className = "",
}) => {
  const badgeClass = STATUS_BADGE_THEME[status] || STATUS_BADGE_THEME.DEFAULT;

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      {sprintBadge && (
        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-800/80 text-slate-300 border border-slate-700">
          {sprintBadge}
        </span>
      )}
      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${badgeClass}`}>
        {status}
      </span>
    </div>
  );
});

StatusBadge.displayName = "StatusBadge";
