import React, { useMemo } from "react";
import type { DemoModuleItem, ModuleCategory } from "../../constants/demo";
import { ModuleCard } from "./ModuleCard";

interface ModuleGridProps {
  modules: DemoModuleItem[];
}

const CATEGORY_ORDER: ModuleCategory[] = [
  "Knowledge",
  "AI",
  "Administration",
  "Compliance",
  "Analytics",
];

/**
 * ModuleGrid – Groups and displays platform modules by architectural category.
 * Highlights available, coming soon, and future roadmap sprint modules.
 */
export const ModuleGrid: React.FC<ModuleGridProps> = React.memo(({ modules }) => {
  const groupedModules = useMemo(() => {
    const map = new Map<ModuleCategory, DemoModuleItem[]>();
    modules.forEach((mod) => {
      const list = map.get(mod.category) || [];
      list.push(mod);
      map.set(mod.category, list);
    });
    return map;
  }, [modules]);

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-lg sm:text-xl font-bold text-slate-100 mb-1">
          Accessible Platform Modules & Roadmap
        </h3>
        <p className="text-sm text-slate-400">
          Integrated modules accessible to this role, including active systems and upcoming sprint releases.
        </p>
      </div>

      <div className="space-y-8">
        {CATEGORY_ORDER.map((category) => {
          const categoryModules = groupedModules.get(category);
          if (!categoryModules || categoryModules.length === 0) return null;

          return (
            <div key={category} className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
                  {category} Modules
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
                  {categoryModules.length}
                </span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryModules.map((mod) => (
                  <ModuleCard key={mod.id} module={mod} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

ModuleGrid.displayName = "ModuleGrid";
