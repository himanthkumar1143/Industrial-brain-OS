import {
  LayoutDashboard,
  Network,
  FileText,
  Bot,
  Search,
  Users,
  BarChart3,
  Settings,
  BookOpen,
  Brain,
  GraduationCap,
  BrainCircuit,
  ShieldCheck,
  CheckCircle2,
  UserCog,
} from "lucide-react";
import type { NavItemId, NavItemConfig, NavSectionConfig } from "../types/navigation";

/**
 * NAVIGATION_CONFIG – Centralized single source of truth for all modules.
 * Drives Sidebar, Breadcrumbs, PageHeaders, Dashboard Home cards, and RBAC.
 */
export const NAVIGATION_CONFIG: Record<string, NavItemConfig> = {
  dashboard: {
    id: "dashboard" as NavItemId,
    title: "Dashboard",
    route: "/dashboard",
    breadcrumb: "Dashboard",
    pageTitle: "Dashboard",
    pageDescription: "Enterprise Command & Control Center",
    icon: LayoutDashboard,
    allowedRoles: ["junior", "senior", "admin"],
  },
  knowledgeGraph: {
    id: "knowledgeGraph" as NavItemId,
    title: "Knowledge Graph",
    route: "/dashboard/knowledge-graph",
    breadcrumb: "Knowledge Graph",
    pageTitle: "Knowledge Graph",
    pageDescription: "Neo4j-powered visual graph connecting equipment, failures, experts, and documents.",
    icon: Network,
    allowedRoles: ["junior", "senior", "admin"],
    comingSoon: true,
  },
  documents: {
    id: "documents" as NavItemId,
    title: "Documents",
    route: "/dashboard/documents",
    breadcrumb: "Documents",
    pageTitle: "Documents",
    pageDescription: "Centralized storage for factory documents, SOPs, maintenance logs, and engineering knowledge.",
    icon: FileText,
    allowedRoles: ["junior", "senior", "admin"],
    comingSoon: true,
  },
  chat: {
    id: "chat" as NavItemId,
    title: "AI Chat",
    route: "/dashboard/chat",
    breadcrumb: "AI Chat",
    pageTitle: "AI Chat",
    pageDescription: "Intelligent assistant powered by Gemini for instant troubleshooting and knowledge retrieval.",
    icon: Bot,
    allowedRoles: ["junior", "senior", "admin"],
    comingSoon: true,
  },
  search: {
    id: "search" as NavItemId,
    title: "Search",
    route: "/dashboard/search",
    breadcrumb: "Search",
    pageTitle: "Search",
    pageDescription: "Platform-wide semantic and keyword search engine.",
    icon: Search,
    allowedRoles: ["junior", "senior", "admin"],
    comingSoon: true,
  },
  users: {
    id: "users" as NavItemId,
    title: "Users",
    route: "/dashboard/users",
    breadcrumb: "Users",
    pageTitle: "User Management",
    pageDescription: "Admin panel for managing users, roles, permissions, and organizational access controls.",
    icon: Users,
    allowedRoles: ["admin"],
    badge: "Admin",
    comingSoon: true,
  },
  analytics: {
    id: "analytics" as NavItemId,
    title: "Analytics",
    route: "/dashboard/analytics",
    breadcrumb: "Analytics",
    pageTitle: "Analytics",
    pageDescription: "Data-driven operational metrics, system usage, and plant performance insights.",
    icon: BarChart3,
    allowedRoles: ["junior", "senior", "admin"],
    comingSoon: true,
  },
  settings: {
    id: "settings" as NavItemId,
    title: "Settings",
    route: "/dashboard/settings",
    breadcrumb: "Settings",
    pageTitle: "Settings",
    pageDescription: "Platform-wide configuration, notification preferences, and system tuning.",
    icon: Settings,
    allowedRoles: ["admin"],
    comingSoon: true,
  },

  // Backward compatibility mappings for Step 5 routes
  "knowledge-repository": {
    id: "documents" as NavItemId,
    title: "Knowledge Repository",
    route: "/dashboard/knowledge-repository",
    breadcrumb: "Knowledge Repository",
    pageTitle: "Knowledge Repository",
    pageDescription: "Centralized storage for factory documents, SOPs, maintenance logs, and engineering knowledge.",
    icon: BookOpen,
    allowedRoles: ["junior", "senior", "admin"],
    comingSoon: true,
  },
  "ai-copilot": {
    id: "chat" as NavItemId,
    title: "AI Copilot",
    route: "/dashboard/ai-copilot",
    breadcrumb: "AI Copilot",
    pageTitle: "AI Copilot",
    pageDescription: "Intelligent assistant powered by Gemini for instant troubleshooting and knowledge retrieval.",
    icon: Brain,
    allowedRoles: ["junior", "senior", "admin"],
    comingSoon: true,
  },
  "expert-vault": {
    id: "documents" as NavItemId,
    title: "Expert Vault",
    route: "/dashboard/expert-vault",
    breadcrumb: "Expert Vault",
    pageTitle: "Expert Vault",
    pageDescription: "Preserve retiring engineers' knowledge through structured capture and AI indexing.",
    icon: GraduationCap,
    allowedRoles: ["junior", "senior", "admin"],
    comingSoon: true,
  },
  "decision-intelligence": {
    id: "analytics" as NavItemId,
    title: "Decision Intelligence",
    route: "/dashboard/decision-intelligence",
    breadcrumb: "Decision Intelligence",
    pageTitle: "Decision Intelligence",
    pageDescription: "Data-driven decision support with AI-generated recommendations for plant operations.",
    icon: BrainCircuit,
    allowedRoles: ["junior", "senior", "admin"],
    comingSoon: true,
  },
  compliance: {
    id: "analytics" as NavItemId,
    title: "Compliance Center",
    route: "/dashboard/compliance",
    breadcrumb: "Compliance Center",
    pageTitle: "Compliance Center",
    pageDescription: "Automated compliance tracking, audit trails, and regulatory document management.",
    icon: ShieldCheck,
    allowedRoles: ["junior", "senior", "admin"],
    comingSoon: true,
  },
  "review-center": {
    id: "documents" as NavItemId,
    title: "Review Center",
    route: "/dashboard/review-center",
    breadcrumb: "Review Center",
    pageTitle: "Review Center",
    pageDescription: "Senior engineers review, validate, and approve knowledge contributions before publication.",
    icon: CheckCircle2,
    allowedRoles: ["senior", "admin"],
    comingSoon: true,
  },
  "user-management": {
    id: "users" as NavItemId,
    title: "User Management",
    route: "/dashboard/user-management",
    breadcrumb: "User Management",
    pageTitle: "User Management",
    pageDescription: "Admin panel for managing users, roles, permissions, and organizational access controls.",
    icon: UserCog,
    allowedRoles: ["admin"],
    comingSoon: true,
  },
};

/**
 * NAVIGATION_SECTIONS – Grouping structure for enterprise left navigation.
 */
export const NAVIGATION_SECTIONS: NavSectionConfig[] = [
  {
    title: "CORE MODULES",
    items: [
      NAVIGATION_CONFIG.dashboard,
      NAVIGATION_CONFIG.knowledgeGraph,
      NAVIGATION_CONFIG.documents,
      NAVIGATION_CONFIG.chat,
      NAVIGATION_CONFIG.search,
    ],
  },
  {
    title: "ADMINISTRATION & SYSTEM",
    items: [
      NAVIGATION_CONFIG.users,
      NAVIGATION_CONFIG.analytics,
      NAVIGATION_CONFIG.settings,
    ],
  },
];

/**
 * getNavItemByPath – Resolves route metadata from a given URL pathname.
 */
export const getNavItemByPath = (pathname: string): NavItemConfig | undefined => {
  // Try exact match first
  const exact = Object.values(NAVIGATION_CONFIG).find((item) => item.route === pathname);
  if (exact) return exact;

  // Try prefix match (for nested routes, excluding root /dashboard index)
  if (pathname !== "/dashboard") {
    const prefix = Object.values(NAVIGATION_CONFIG).find(
      (item) => item.route !== "/dashboard" && pathname.startsWith(item.route + "/")
    );
    if (prefix) return prefix;
  }

  // Fallback by segment matching
  const segment = pathname.split("/").pop();
  if (segment && NAVIGATION_CONFIG[segment]) {
    return NAVIGATION_CONFIG[segment];
  }

  return undefined;
};
