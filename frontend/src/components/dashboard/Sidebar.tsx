import React from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { NAVIGATION_SECTIONS } from "../../constants/navigation";
import { SidebarSection } from "./SidebarSection";
import { DashboardLogo } from "./DashboardLogo";
import { useSidebar } from "../../contexts/SidebarContext";

/**
 * Sidebar – Enterprise left navigation panel for desktop screens.
 * Supports smooth hardware-accelerated width transitions (w-64 vs w-20) with zero CLS,
 * consuming centralized route configuration for zero duplication.
 */
export const Sidebar: React.FC = React.memo(() => {
  const { isCollapsed, toggleCollapse } = useSidebar();

  return (
    <aside
      aria-label="Enterprise Navigation Sidebar"
      className={`hidden lg:flex flex-col border-r border-border bg-card/80 backdrop-blur-md transition-all duration-200 ease-in-out shrink-0 h-screen sticky top-0 z-30 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Top Logo Area */}
      <div className="h-16 flex items-center px-3 border-b border-border shrink-0">
        <DashboardLogo isCollapsed={isCollapsed} />
      </div>

      {/* Top Collapse Toggle Control (Relocated from bottom to top section below Logo) */}
      <div className="p-3 border-b border-border/60 shrink-0">
        <button
          type="button"
          onClick={toggleCollapse}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!isCollapsed}
          className="w-full flex items-center justify-center gap-3 px-3 py-2 rounded-xl bg-card hover:bg-card/80 border border-border text-slate-400 hover:text-slate-200 text-xs font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {isCollapsed ? (
            <PanelLeftOpen className="h-4 w-4 shrink-0" />
          ) : (
            <>
              <PanelLeftClose className="h-4 w-4 shrink-0" />
              <span className="truncate">Collapse Sidebar</span>
            </>
          )}
        </button>
      </div>

      {/* Scrollable Navigation Sections */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-6 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        {NAVIGATION_SECTIONS.map((section) => (
          <SidebarSection key={section.title} section={section} />
        ))}
      </nav>
    </aside>
  );
});

Sidebar.displayName = "Sidebar";
