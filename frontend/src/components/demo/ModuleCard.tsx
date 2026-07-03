import React from "react";
import type { DemoModuleItem } from "../../constants/demo";
import { StatusBadge } from "./StatusBadge";

interface ModuleCardProps {
  module: DemoModuleItem;
}

/**
 * ModuleCard – Displays an individual platform module with icon, name,
 * description, availability status, and roadmap sprint indicator badge.
 */
export const ModuleCard: React.FC<ModuleCardProps> = React.memo(({ module }) => {
  const Icon = module.icon;

  return (
    <div className="flex flex-col justify-between p-4.5 rounded-xl bg-[#13131e] border border-border/60 hover:border-primary/40 transition-colors">
      <div>
        {/* Top bar: Icon & Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 text-primary">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <StatusBadge status={module.status} sprintBadge={module.sprintBadge} />
        </div>

        {/* Name */}
        <h4 className="text-base font-bold text-slate-100 mb-1.5">{module.name}</h4>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          {module.description}
        </p>
      </div>

      {/* Category Tag */}
      <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-[11px] font-semibold text-slate-500">
        <span>Category</span>
        <span className="text-slate-400">{module.category}</span>
      </div>
    </div>
  );
});

ModuleCard.displayName = "ModuleCard";
