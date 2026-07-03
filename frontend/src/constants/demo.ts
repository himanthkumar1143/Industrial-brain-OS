import type { LucideIcon } from "./icons";
import {
  Brain,
  BookOpen,
  Network,
  Shield,
  ShieldCheck,
  FileScan,
  BarChart3,
  Sparkles,
  LayoutDashboard,
  Users,
  UserCog,
  HardHat,
  Cog,
  CheckCircle,
  Lock,
  FileSearch,
  Wrench,
  GraduationCap,
  Scale,
  Rocket,
  Search,
  BrainCircuit,
  AlertTriangle,
} from "./icons";

export type DemoStatus = "Available" | "Coming Soon" | "Future Sprint";
export type ModuleCategory = "Knowledge" | "AI" | "Administration" | "Compliance" | "Analytics";

export interface DemoModuleItem {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  category: ModuleCategory;
  status: DemoStatus;
  sprintBadge?: string;
}

export interface DemoWorkflowStep {
  step: number;
  title: string;
  moduleName: string;
  description: string;
  icon: LucideIcon;
}

export interface DemoColorTheme {
  primaryText: string;
  primaryBg: string;
  primaryBorder: string;
  badgeBg: string;
  badgeText: string;
  timelineColor: string;
}

export interface DemoDataPayload {
  key: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  responsibilities: string[];
  theme: DemoColorTheme;
  loginPath?: string;
  loginRoleState?: string;
  primaryActionLabel: string;
  workflowSteps: DemoWorkflowStep[];
  modules: DemoModuleItem[];
  // Optional hooks for future product walkthroughs
  videoUrl?: string;
  gifUrl?: string;
  screenshots?: string[];
  interactiveTourUrl?: string;
  voiceNarrationUrl?: string;
  aiGuideEnabled?: boolean;
}

export const DEMO_DATA: Record<string, DemoDataPayload> = {
  general: {
    key: "general",
    badge: "Platform Overview",
    title: "Industrial Brain OS Architecture",
    subtitle: "The Unified AI Operating System for Industrial Knowledge",
    description:
      "Industrial Brain OS bridges the gap between retiring senior expertise and onboarding junior engineers through AI copilot intelligence and structured knowledge graphs.",
    responsibilities: [
      "Connects disparate industrial knowledge silos into a centralized enterprise repository",
      "Delivers role-specific interfaces for Junior Engineers, Senior Experts, and Administrators",
      "Interconnects Gemini LLM reasoning with Neo4j Knowledge Graph causal relationships",
      "Ensures regulatory compliance, full audit logging, and role-based access control (RBAC)",
    ],
    theme: {
      primaryText: "text-cyan-400",
      primaryBg: "bg-cyan-500/10",
      primaryBorder: "border-cyan-500/20",
      badgeBg: "bg-cyan-500/15 border-cyan-500/30",
      badgeText: "text-cyan-300",
      timelineColor: "bg-cyan-500",
    },
    primaryActionLabel: "Choose a Role",
    workflowSteps: [
      {
        step: 1,
        title: "Landing",
        moduleName: "Enterprise Entry",
        description: "Explore core platform capabilities and architecture overview without authentication.",
        icon: Globe,
      },
      {
        step: 2,
        title: "Role Selection",
        moduleName: "Tailored Experience",
        description: "Select Junior Engineer, Senior Engineer, or Administrator experience.",
        icon: Users,
      },
      {
        step: 3,
        title: "Authentication",
        moduleName: "Secure JWT Auth",
        description: "Role-verified enterprise session initialization and token validation.",
        icon: Lock,
      },
      {
        step: 4,
        title: "Dashboard",
        moduleName: "Role Command Center",
        description: "Access personalized widgets, quick troubleshooting tools, and knowledge feeds.",
        icon: LayoutDashboard,
      },
      {
        step: 5,
        title: "Role Modules",
        moduleName: "AI & Graph Tools",
        description: "Interact with AI Copilot, Review Center, Expert Vault, and Compliance modules.",
        icon: BrainCircuit,
      },
      {
        step: 6,
        title: "Industrial Brain OS",
        moduleName: "Organizational Wisdom",
        description: "Continuous knowledge loop capturing resolutions and expanding institutional wisdom.",
        icon: Sparkles,
      },
    ],
    modules: [
      {
        id: "copilot",
        name: "AI Copilot",
        description: "Real-time conversational troubleshooting assistant powered by Gemini 2.5.",
        icon: Brain,
        category: "AI",
        status: "Available",
        sprintBadge: "Sprint 2",
      },
      {
        id: "repo",
        name: "Knowledge Repository",
        description: "Central source of truth for SOPs, equipment manuals, and maintenance logs.",
        icon: BookOpen,
        category: "Knowledge",
        status: "Available",
        sprintBadge: "Sprint 3",
      },
      {
        id: "graph",
        name: "Knowledge Graph",
        description: "Interactive Neo4j graph linking equipment failures to root causes and experts.",
        icon: Network,
        category: "Knowledge",
        status: "Coming Soon",
        sprintBadge: "Sprint 5",
      },
      {
        id: "vault",
        name: "Expert Vault",
        description: "Structured interview capture and indexing of senior engineer tribal wisdom.",
        icon: Shield,
        category: "Knowledge",
        status: "Coming Soon",
        sprintBadge: "Sprint 6",
      },
      {
        id: "ocr",
        name: "Document Intelligence",
        description: "OCR digitization of legacy handwritten P&IDs and physical maintenance notes.",
        icon: FileScan,
        category: "AI",
        status: "Future Sprint",
        sprintBadge: "Sprint 7",
      },
      {
        id: "compliance",
        name: "Compliance Center",
        description: "Automated regulatory alignment, OSHA safety validation, and audit tracking.",
        icon: ShieldCheck,
        category: "Compliance",
        status: "Future Sprint",
        sprintBadge: "Sprint 8",
      },
      {
        id: "analytics",
        name: "Industrial Analytics",
        description: "Plant health dashboards, MTBF metrics, and AI performance tracking.",
        icon: BarChart3,
        category: "Analytics",
        status: "Future Sprint",
        sprintBadge: "Sprint 9",
      },
      {
        id: "admin-rbac",
        name: "RBAC & Users",
        description: "Granular access permissions, security logs, and multi-tenant management.",
        icon: UserCog,
        category: "Administration",
        status: "Available",
        sprintBadge: "Sprint 4",
      },
    ],
  },
  junior: {
    key: "junior",
    badge: "Junior Role Demo",
    title: "Junior Engineer Workflow",
    subtitle: "Guided Troubleshooting & Accelerated Onboarding",
    description:
      "Designed for junior maintenance and process engineers to rapidly diagnose equipment issues using AI guidance without waiting for senior staff availability.",
    responsibilities: [
      "Query AI Copilot for step-by-step equipment resolution protocols",
      "Search verified standard operating procedures (SOPs) and safety manuals",
      "Explore historical failure cases across equipment knowledge graphs",
      "Submit field resolutions and edge cases for senior engineer review",
    ],
    theme: {
      primaryText: "text-blue-400",
      primaryBg: "bg-blue-500/10",
      primaryBorder: "border-blue-500/20",
      badgeBg: "bg-blue-500/15 border-blue-500/30",
      badgeText: "text-blue-300",
      timelineColor: "bg-blue-500",
    },
    loginPath: "/login/junior",
    loginRoleState: "junior",
    primaryActionLabel: "Login as Junior Engineer",
    workflowSteps: [
      {
        step: 1,
        title: "Dashboard",
        moduleName: "Junior Workspace",
        description: "Access bookmarked manuals, recent alerts, and learning progression metrics.",
        icon: LayoutDashboard,
      },
      {
        step: 2,
        title: "Knowledge Repository",
        moduleName: "SOP Search",
        description: "Find verified procedures for routine maintenance and safety compliance.",
        icon: BookOpen,
      },
      {
        step: 3,
        title: "AI Copilot",
        moduleName: "Guided Q&A",
        description: "Ask natural language troubleshooting questions and receive grounded answers.",
        icon: Brain,
      },
      {
        step: 4,
        title: "Knowledge Graph",
        moduleName: "Visual Discovery",
        description: "Trace component dependencies and see how past engineers fixed similar faults.",
        icon: Network,
      },
      {
        step: 5,
        title: "Expert Vault",
        moduleName: "Tribal Insights",
        description: "Review recorded tips and audio insights shared by senior plant veterans.",
        icon: GraduationCap,
      },
      {
        step: 6,
        title: "Knowledge Contribution",
        moduleName: "Draft Submissions",
        description: "Log new observations and submit field notes to the senior review queue.",
        icon: Wrench,
      },
    ],
    modules: [
      {
        id: "copilot",
        name: "AI Copilot",
        description: "Instant troubleshooting guidance grounded in verified documentation.",
        icon: Brain,
        category: "AI",
        status: "Available",
        sprintBadge: "Sprint 2",
      },
      {
        id: "repo",
        name: "Knowledge Repository",
        description: "Full read access to technical manuals, SOPs, and safety protocols.",
        icon: BookOpen,
        category: "Knowledge",
        status: "Available",
        sprintBadge: "Sprint 3",
      },
      {
        id: "search",
        name: "Semantic Search",
        description: "Contextual RAG retrieval across thousands of engineering documents.",
        icon: Search,
        category: "AI",
        status: "Available",
        sprintBadge: "Sprint 2",
      },
      {
        id: "graph-view",
        name: "Graph Explorer",
        description: "Read-only exploration of machine failure relationships.",
        icon: Network,
        category: "Knowledge",
        status: "Coming Soon",
        sprintBadge: "Sprint 5",
      },
    ],
  },
  senior: {
    key: "senior",
    badge: "Senior Role Demo",
    title: "Senior Engineer Workflow",
    subtitle: "Knowledge Validation & Decision Intelligence",
    description:
      "Empowers senior experts and reliability engineers to review AI-drafted insights, validate field procedures, and contribute decades of tribal wisdom into the permanent vault.",
    responsibilities: [
      "Review, verify, and approve junior engineer troubleshooting submissions",
      "Contribute expert tips, failure root causes, and audio/text wisdom into Expert Vault",
      "Curate Knowledge Graph node connections for high-accuracy AI Copilot RAG",
      "Analyze plant reliability trends using Decision Intelligence dashboards",
    ],
    theme: {
      primaryText: "text-emerald-400",
      primaryBg: "bg-emerald-500/10",
      primaryBorder: "border-emerald-500/20",
      badgeBg: "bg-emerald-500/15 border-emerald-500/30",
      badgeText: "text-emerald-300",
      timelineColor: "bg-emerald-500",
    },
    loginPath: "/login/senior",
    loginRoleState: "senior",
    primaryActionLabel: "Login as Senior Engineer",
    workflowSteps: [
      {
        step: 1,
        title: "Dashboard",
        moduleName: "Senior Command Hub",
        description: "Monitor pending validation requests and critical plant anomalies.",
        icon: LayoutDashboard,
      },
      {
        step: 2,
        title: "Review Center",
        moduleName: "Validation Queue",
        description: "Inspect draft maintenance notes submitted by field engineers.",
        icon: CheckCircle,
      },
      {
        step: 3,
        title: "Expert Validation",
        moduleName: "Approval Workflow",
        description: "Approve and merge verified resolutions into the active AI knowledge base.",
        icon: ShieldCheck,
      },
      {
        step: 4,
        title: "Knowledge Repository",
        moduleName: "Curated SOPs",
        description: "Author and update standard operating procedures with executive sign-off.",
        icon: BookOpen,
      },
      {
        step: 5,
        title: "AI Copilot",
        moduleName: "Advanced Analytics",
        description: "Query complex cross-plant historical trends and equipment degradation models.",
        icon: BrainCircuit,
      },
      {
        step: 6,
        title: "Decision Intelligence",
        moduleName: "Reliability Insights",
        description: "Leverage predictive maintenance forecasts to optimize outage schedules.",
        icon: Rocket,
      },
    ],
    modules: [
      {
        id: "review",
        name: "Review Center",
        description: "Dedicated dashboard for validating and refining junior field notes.",
        icon: CheckCircle,
        category: "Knowledge",
        status: "Available",
        sprintBadge: "Sprint 3",
      },
      {
        id: "vault-author",
        name: "Expert Vault Authoring",
        description: "Direct input interface to encode specialized troubleshooting secrets.",
        icon: Shield,
        category: "Knowledge",
        status: "Available",
        sprintBadge: "Sprint 4",
      },
      {
        id: "graph-edit",
        name: "Graph Curation",
        description: "Add causal links between new equipment faults and established fixes.",
        icon: Network,
        category: "Knowledge",
        status: "Coming Soon",
        sprintBadge: "Sprint 5",
      },
      {
        id: "decision",
        name: "Decision Intelligence",
        description: "AI-driven failure forecasting and equipment lifecycle analysis.",
        icon: Rocket,
        category: "Analytics",
        status: "Future Sprint",
        sprintBadge: "Sprint 7",
      },
    ],
  },
  admin: {
    key: "admin",
    badge: "Admin Role Demo",
    title: "Platform Administrator Workflow",
    subtitle: "Governance, Security & Enterprise Configuration",
    description:
      "Provides IT administrators and plant security officers full governance over user identities, access permissions, audit trails, and AI knowledge boundary rules.",
    responsibilities: [
      "Manage user accounts, department assignments, and role provisioning",
      "Configure Role-Based Access Control (RBAC) policies across plant zones",
      "Monitor complete security audit logs and data access trails",
      "Ensure AI responses comply with enterprise data security and safety standards",
    ],
    theme: {
      primaryText: "text-purple-400",
      primaryBg: "bg-purple-500/10",
      primaryBorder: "border-purple-500/20",
      badgeBg: "bg-purple-500/15 border-purple-500/30",
      badgeText: "text-purple-300",
      timelineColor: "bg-purple-500",
    },
    loginPath: "/login/admin",
    loginRoleState: "admin",
    primaryActionLabel: "Login as Administrator",
    workflowSteps: [
      {
        step: 1,
        title: "Dashboard",
        moduleName: "System Overview",
        description: "Real-time system health, active user sessions, and API usage statistics.",
        icon: LayoutDashboard,
      },
      {
        step: 2,
        title: "User Management",
        moduleName: "User Provisioning",
        description: "Onboard new engineers, assign roles, and manage department rosters.",
        icon: Users,
      },
      {
        step: 3,
        title: "RBAC",
        moduleName: "Permission Policies",
        description: "Configure fine-grained read/write policies for sensitive documentation zones.",
        icon: Lock,
      },
      {
        step: 4,
        title: "Audit Logs",
        moduleName: "Security Tracking",
        description: "Review comprehensive logs of every document view and AI copilot interaction.",
        icon: FileSearch,
      },
      {
        step: 5,
        title: "Compliance",
        moduleName: "Regulatory Center",
        description: "Export compliance reports for external safety and quality assurance auditors.",
        icon: Scale,
      },
      {
        step: 6,
        title: "Settings",
        moduleName: "Platform Config",
        description: "Adjust LLM inference parameters, vector database indexing, and integration hooks.",
        icon: Cog,
      },
    ],
    modules: [
      {
        id: "users",
        name: "User Management",
        description: "Complete lifecycle management for engineers, contractors, and administrators.",
        icon: Users,
        category: "Administration",
        status: "Available",
        sprintBadge: "Sprint 4",
      },
      {
        id: "rbac",
        name: "RBAC Administration",
        description: "Strict enforcement of access boundaries and departmental confidentiality.",
        icon: Lock,
        category: "Administration",
        status: "Available",
        sprintBadge: "Sprint 4",
      },
      {
        id: "audit",
        name: "Audit & Telemetry",
        description: "Tamper-proof activity logs for compliance verification and incident analysis.",
        icon: FileSearch,
        category: "Compliance",
        status: "Available",
        sprintBadge: "Sprint 4",
      },
      {
        id: "settings",
        name: "Enterprise Settings",
        description: "Centralized configuration for AI models, authentication providers, and storage.",
        icon: Cog,
        category: "Administration",
        status: "Available",
        sprintBadge: "Sprint 4",
      },
    ],
  },
};
