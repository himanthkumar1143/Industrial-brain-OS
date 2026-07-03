/**
 * Reusable animation utility classes for UI components.
 * Centralizing animation strings ensures consistent motion design and simplifies maintenance.
 */

export const animations = {
  // Card hover lift and glow transitions
  cardHover: "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgb(0,0,0,0.5)]",
  cardHoverElevated: "transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_50px_rgb(0,0,0,0.5)]",

  // Icon zoom effect on card hover (requires 'group' class on parent container)
  iconScaleHover: "transition-transform duration-300 group-hover:scale-110",

  // Badge / button hover scale
  badgeHoverScale: "transition-transform duration-200 hover:scale-105",

  // Ambient glow and continuous animations
  pulseSlow: "animate-pulse",
  spinSlow: "animate-[spin_15s_linear_infinite]",
  bounceFloating: "animate-bounce",
} as const;
