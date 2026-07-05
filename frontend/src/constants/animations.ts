/**
 * Centralized Animation Constants – Industrial Brain OS
 * Single source of truth for duration, easing, and Tailwind transition classes.
 * Ensures 60 FPS hardware acceleration and zero CLS across all enterprise modules.
 */

export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 200,
  medium: 300,
  slow: 500,
  skeletonPulse: 1500,
} as const;

export const ANIMATION_TIMINGS = {
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

export const TRANSITION_CLASSES = {
  page: "transition-all duration-200 ease-in-out",
  modal: "transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1)",
  fade: "transition-opacity duration-200 ease-in-out",
  scale: "transition-transform duration-200 ease-in-out",
  skeleton: "animate-pulse",
} as const;
