import React from "react";
import type { NavSectionConfig } from "../../types/navigation";
import { SidebarItem } from "./SidebarItem";
import { useSidebar } from "../../contexts/SidebarContext";

export interface SidebarSectionProps {
  section: NavSectionConfig;
}

/**
 * SidebarSection – Grouping container for sidebar navigation items.
 * Renders uppercase section headers or subtle separator dividers when collapsed.
 */
export const SidebarSection: React.FC<SidebarSectionProps> = React.memo(({ section }) => {
  const { isCollapsed } = useSidebar();

  return (
    <div className="space-y-1.5">
      {!isCollapsed ? (
        <h3 className="px-3 text-[10px] font-bold text-slate-500 tracking-wider uppercase select-none">
          {section.title}
        </h3>
      ) : (
        <div className="h-4 flex items-center justify-center">
          <span className="w-4 h-0.5 rounded-full bg-border" />
        </div>
      )}
      <ul className="space-y-1 m-0 p-0">
        {section.items.map((item) => (
          <SidebarItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
});

SidebarSection.displayName = "SidebarSection";
