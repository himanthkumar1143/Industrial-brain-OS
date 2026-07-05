import type { UserRole } from "../types/navigation";

export interface RoleBadgeConfig {
  label: string;
  variant: "cyan" | "indigo" | "amber";
  bgClass: string;
  textClass: string;
  borderClass: string;
}

/**
 * ROLE_BADGES – Centralized styling and labels for enterprise RBAC roles.
 * Eliminates magic strings and hardcoded styles inside UserMenu and dashboards.
 */
export const ROLE_BADGES: Record<UserRole, RoleBadgeConfig> = {
  junior: {
    label: "Junior Engineer",
    variant: "cyan",
    bgClass: "bg-cyan-500/10",
    textClass: "text-cyan-400",
    borderClass: "border-cyan-500/20",
  },
  senior: {
    label: "Senior Engineer",
    variant: "indigo",
    bgClass: "bg-indigo-500/10",
    textClass: "text-indigo-400",
    borderClass: "border-indigo-500/20",
  },
  admin: {
    label: "Administrator",
    variant: "amber",
    bgClass: "bg-amber-500/10",
    textClass: "text-amber-400",
    borderClass: "border-amber-500/20",
  },
} as const;
