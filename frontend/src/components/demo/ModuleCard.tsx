import React from "react";
import type { DemoModuleItem } from "../../constants/demo";

interface ModuleCardProps {
  module: DemoModuleItem;
}

const statusStyles: Record<string, string> = {
  Available: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "Coming Soon": "bg-amber-500/15 text-amber-400 border-amber-500/30",
  "Future Sprint": "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
};

/**
 * ModuleCard – Displays an individual platform module with icon, name,
 * description, availability status, and roadmap sprint indicator badge.
 */
export const ModuleCard: React.FC<ModuleCardProps> = React.memo(({ module }) => {
  const Icon = module.icon;
  const badgeClass = statusStyles[module.status] || "bg-slate-800 text-slate-300 border-slate-700";

  return (
    <div className="flex flex-col justify-between p-4.5 rounded-xl bg-[#13131e] border border-border/60 hover:border-primary/40 transition-colors">
      <div>
        {/* Top bar: Icon & Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 text-primary">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="flex items-center gap-1.5">
            {module.sprintBadge && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-800/80 text-slate-300 border border-slate-700">
                {module.sprintBadge}
              </span>
            )}
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${badgeClass}`}>
              {module.status}
            </span>
          </div>
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
