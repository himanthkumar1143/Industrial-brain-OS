import React from "react";
import { TRANSITION_CLASSES } from "../../../constants/animations";

export type SkeletonVariant = "page" | "header" | "widget" | "card" | "table" | "list";

export interface PageSkeletonProps {
  /** Variant of the skeleton layout to render. Defaults to card. */
  variant?: SkeletonVariant;
  /** Number of repeating items (cards, rows, widgets, list items). Defaults to 3. */
  count?: number;
  /** Number of columns for table variant. Defaults to 4. */
  columns?: number;
}

/**
 * PageSkeleton – Enterprise loading skeleton using centralized Tailwind pulse animations.
 * Provides zero CLS layouts for pages, headers, widgets, cards, tables, and lists without fake metrics.
 */
export const PageSkeleton: React.FC<PageSkeletonProps> = React.memo(({
  variant = "card",
  count = 3,
  columns = 4,
}) => {
  const pulseClass = `bg-slate-800/60 rounded-xl ${TRANSITION_CLASSES.skeleton}`;

  if (variant === "header") {
    return (
      <div className="space-y-3 mb-8 w-full">
        <div className={`h-8 w-64 md:w-80 ${pulseClass}`} />
        <div className={`h-4 w-full max-w-xl ${pulseClass}`} />
      </div>
    );
  }

  if (variant === "widget") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 w-full">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm space-y-4 shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className={`h-10 w-10 rounded-xl ${pulseClass}`} />
              <div className={`h-5 w-20 rounded-full ${pulseClass}`} />
            </div>
            <div className="space-y-2">
              <div className={`h-6 w-3/4 ${pulseClass}`} />
              <div className={`h-4 w-full ${pulseClass}`} />
              <div className={`h-4 w-5/6 ${pulseClass}`} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "table") {
    return (
      <div className="w-full rounded-2xl border border-border/60 bg-card/40 overflow-hidden shadow-md">
        {/* Table Header Skeleton */}
        <div className="flex items-center justify-between p-4 border-b border-border/80 bg-muted/30 gap-4">
          {Array.from({ length: columns }).map((_, colIdx) => (
            <div key={colIdx} className={`h-5 flex-1 ${pulseClass}`} />
          ))}
        </div>
        {/* Table Rows Skeleton */}
        <div className="divide-y divide-border/40">
          {Array.from({ length: count }).map((_, rowIdx) => (
            <div key={rowIdx} className="flex items-center justify-between p-4 gap-4">
              {Array.from({ length: columns }).map((_, colIdx) => (
                <div
                  key={colIdx}
                  className={`h-4 flex-1 ${colIdx === 0 ? "w-1/3" : ""} ${pulseClass}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div className="space-y-3 w-full">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 rounded-2xl border border-border/60 bg-card/40 gap-4 shadow-sm"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className={`h-10 w-10 rounded-xl shrink-0 ${pulseClass}`} />
              <div className="space-y-1.5 flex-1 max-w-md">
                <div className={`h-5 w-2/3 ${pulseClass}`} />
                <div className={`h-3 w-full ${pulseClass}`} />
              </div>
            </div>
            <div className={`h-6 w-24 rounded-lg shrink-0 ${pulseClass}`} />
          </div>
        ))}
      </div>
    );
  }

  if (variant === "page") {
    return (
      <div className="space-y-8 w-full animate-fade-in">
        <div className="space-y-3">
          <div className={`h-8 w-72 ${pulseClass}`} />
          <div className={`h-4 w-full max-w-2xl ${pulseClass}`} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-5 rounded-2xl border border-border/60 bg-card/40 space-y-3">
              <div className={`h-8 w-8 rounded-lg ${pulseClass}`} />
              <div className={`h-5 w-3/4 ${pulseClass}`} />
              <div className={`h-4 w-1/2 ${pulseClass}`} />
            </div>
          ))}
        </div>
        <div className="w-full rounded-2xl border border-border/60 bg-card/40 p-6 space-y-4">
          <div className={`h-6 w-48 ${pulseClass}`} />
          <div className={`h-48 w-full rounded-xl ${pulseClass}`} />
        </div>
      </div>
    );
  }

  // Default: Card Variant
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="p-6 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm space-y-4 shadow-md flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className={`h-10 w-10 rounded-2xl ${pulseClass}`} />
            <div className={`h-6 w-3/4 ${pulseClass}`} />
            <div className={`h-4 w-full ${pulseClass}`} />
          </div>
          <div className={`h-10 w-full rounded-xl mt-4 ${pulseClass}`} />
        </div>
      ))}
    </div>
  );
});

PageSkeleton.displayName = "PageSkeleton";
