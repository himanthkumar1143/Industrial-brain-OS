import type { LucideIcon } from "lucide-react";

/**
 * UserRole – Enterprise RBAC role definitions.
 */
export type UserRole = "junior" | "senior" | "admin";

/**
 * NavItemId – Permanent unique identifiers for all navigation modules.
 * Eliminates magic strings and hardcoded comparisons throughout the application.
 */
export type NavItemId =
  | "dashboard"
  | "knowledgeGraph"
  | "documents"
  | "chat"
  | "search"
  | "users"
  | "analytics"
  | "settings";

/**
 * NavItemConfig – Centralized navigation and route metadata.
 * Drives Sidebar, Breadcrumbs, PageHeaders, Dashboard Home cards, and future RBAC/SEO.
 */
export interface NavItemConfig {
  id: NavItemId;
  title: string;
  route: string;
  breadcrumb: string;
  pageTitle: string;
  pageDescription: string;
  icon: LucideIcon;
  allowedRoles?: UserRole[];
  requiredRole?: UserRole[];
  badge?: string;
  comingSoon?: boolean;
}

/**
 * NavSectionConfig – Grouping structure for enterprise left navigation.
 */
export interface NavSectionConfig {
  title: string;
  items: NavItemConfig[];
}
