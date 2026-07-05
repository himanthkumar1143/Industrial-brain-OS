import React from "react";
import { Search } from "lucide-react";

/**
 * SearchPlaceholder – Extracted reusable platform search input.
 * Displays disabled state with enterprise tooltip ready for Sprint 5 logic drop-in.
 */
export const SearchPlaceholder: React.FC = React.memo(() => {
  return (
    <div className="relative w-full max-w-sm hidden md:block">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
        <Search className="h-4 w-4" />
      </div>
      <input
        type="text"
        disabled
        value="Search coming in Sprint 5"
        readOnly
        aria-label="Platform search (coming in Sprint 5)"
        className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-muted/40 border border-border/80 text-xs font-medium text-slate-400 opacity-70 cursor-not-allowed select-none focus:outline-none transition-all shadow-inner"
      />
    </div>
  );
});

SearchPlaceholder.displayName = "SearchPlaceholder";
