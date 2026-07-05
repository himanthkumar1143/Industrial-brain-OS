import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { getNavItemByPath, NAVIGATION_CONFIG } from "../../constants/navigation";

/**
 * Breadcrumbs – Intelligent navigation trail generator.
 * Consumes breadcrumb titles directly from centralized route metadata (zero duplication)
 * and automatically formats hierarchy for any URL depth.
 */
export const Breadcrumbs: React.FC = React.memo(() => {
  const location = useLocation();

  const crumbs = useMemo(() => {
    const segments = location.pathname.split("/").filter(Boolean);
    const result: { label: string; path: string; isLast: boolean }[] = [];

    let currentPath = "";
    segments.forEach((seg, index) => {
      currentPath += `/${seg}`;
      const isLast = index === segments.length - 1;

      // Look up in centralized navigation metadata
      const item = getNavItemByPath(currentPath);
      const label = item
        ? item.breadcrumb
        : seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " ");

      result.push({
        label,
        path: currentPath,
        isLast,
      });
    });

    // Ensure Dashboard root is always present as first item if we are in /dashboard/*
    if (result.length === 0 || result[0].path !== "/dashboard") {
      result.unshift({
        label: NAVIGATION_CONFIG.dashboard.breadcrumb,
        path: "/dashboard",
        isLast: result.length === 0,
      });
    }

    return result;
  }, [location.pathname]);

  return (
    <nav aria-label="Breadcrumb navigation" className="hidden sm:flex items-center gap-1.5 text-xs">
      {crumbs.map((crumb, index) => (
        <React.Fragment key={crumb.path}>
          {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-slate-600 shrink-0" />}
          {crumb.isLast ? (
            <span
              aria-current="page"
              className="font-semibold text-slate-200 tracking-tight truncate max-w-[200px]"
            >
              {crumb.label}
            </span>
          ) : (
            <Link
              to={crumb.path}
              className="font-medium text-slate-400 hover:text-primary transition-colors truncate max-w-[150px] focus:outline-none focus-visible:underline"
            >
              {crumb.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
});

Breadcrumbs.displayName = "Breadcrumbs";
