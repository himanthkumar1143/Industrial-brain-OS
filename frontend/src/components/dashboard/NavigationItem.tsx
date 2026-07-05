import React from "react";
import { Link, useLocation } from "react-router-dom";
import type { NavItemConfig } from "../../types/navigation";

export interface NavigationItemProps {
  item: NavItemConfig;
  isCollapsed?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * NavigationItem – Reusable navigation link button.
 * Supports active route highlighting (exact match for index, prefix match for sub-routes),
 * badges, icons, focus rings, and WCAG AA keyboard accessibility.
 */
export const NavigationItem: React.FC<NavigationItemProps> = React.memo(
  ({ item, isCollapsed = false, onClick, className = "" }) => {
    const location = useLocation();
    const Icon = item.icon;

    // Intelligent active detection: exact match for /dashboard index, prefix match for sub-routes
    const isActive =
      item.route === "/dashboard"
        ? location.pathname === "/dashboard"
        : location.pathname === item.route || location.pathname.startsWith(`${item.route}/`);

    return (
      <Link
        to={item.route}
        onClick={onClick}
        aria-current={isActive ? "page" : undefined}
        title={isCollapsed ? item.title : undefined}
        className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-xs transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
          isActive
            ? "bg-primary/15 text-primary border border-primary/30 shadow-sm shadow-primary/10"
            : "text-slate-400 hover:text-slate-200 hover:bg-card/80 border border-transparent"
        } ${isCollapsed ? "justify-center px-2" : ""} ${className}`}
      >
        <Icon
          className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
            isActive ? "text-primary scale-110" : "text-slate-400 group-hover:text-slate-200"
          }`}
        />

        {!isCollapsed && (
          <span className="truncate flex-1 text-left whitespace-nowrap">{item.title}</span>
        )}

        {!isCollapsed && item.badge && (
          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            {item.badge}
          </span>
        )}

        {/* Subtle left active indicator bar */}
        {isActive && !isCollapsed && (
          <span className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
        )}
      </Link>
    );
  }
);

NavigationItem.displayName = "NavigationItem";
