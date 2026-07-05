import React from "react";
import type { NavItemConfig } from "../../types/navigation";
import { NavigationItem } from "./NavigationItem";
import { useSidebar } from "../../contexts/SidebarContext";

export interface SidebarItemProps {
  item: NavItemConfig;
}

/**
 * SidebarItem – Wraps NavigationItem for sidebar usage.
 * Integrates zero-dependency CSS tooltips when collapsed and closes mobile drawer on selection.
 */
export const SidebarItem: React.FC<SidebarItemProps> = React.memo(({ item }) => {
  const { isCollapsed, closeMobile } = useSidebar();

  return (
    <li className="relative group/item list-none">
      <NavigationItem item={item} isCollapsed={isCollapsed} onClick={closeMobile} />
      {isCollapsed && (
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1.5 rounded-lg bg-popover text-popover-foreground text-xs font-medium border border-border shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover/item:opacity-100 group-hover/item:pointer-events-auto transition-all duration-150 z-50 flex items-center gap-2">
          <span>{item.title}</span>
          {item.badge && (
            <span className="px-1 py-0.2 rounded text-[9px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              {item.badge}
            </span>
          )}
        </div>
      )}
    </li>
  );
});

SidebarItem.displayName = "SidebarItem";
