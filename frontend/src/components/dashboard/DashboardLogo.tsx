import React from "react";
import { Brain } from "lucide-react";
import { Link } from "react-router-dom";

export interface DashboardLogoProps {
  isCollapsed?: boolean;
  onMobileClose?: () => void;
}

/**
 * DashboardLogo – Enterprise branding header for navigation bars and sidebars.
 * Adapts layout dynamically when left navigation is collapsed.
 */
export const DashboardLogo: React.FC<DashboardLogoProps> = React.memo(({ isCollapsed = false, onMobileClose }) => {
  return (
    <Link
      to="/dashboard"
      onClick={onMobileClose}
      className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-card/40 transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      aria-label="Industrial Brain OS Dashboard Home"
    >
      <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-indigo-600 text-white shadow-lg shadow-primary/25 shrink-0 group-hover:scale-105 transition-transform duration-200">
        <Brain className="h-5 w-5" />
      </div>
      {!isCollapsed && (
        <div className="flex flex-col overflow-hidden transition-all duration-200 whitespace-nowrap">
          <span className="font-bold text-sm text-slate-100 tracking-tight flex items-center gap-1.5">
            Industrial Brain <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-primary/20 text-primary border border-primary/30">OS</span>
          </span>
          <span className="text-[11px] text-slate-400 font-medium">Enterprise Command</span>
        </div>
      )}
    </Link>
  );
});

DashboardLogo.displayName = "DashboardLogo";
