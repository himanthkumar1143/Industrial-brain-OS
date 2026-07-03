import type { LucideIcon } from "./icons";
import {
  AlertTriangle,
  BookOpen,
  Brain,
  BrainCircuit,
  CheckCircle,
  ClipboardList,
  Cog,
  Cpu,
  FileScan,
  FileSearch,
  Globe,
  GraduationCap,
  HardHat,
  Lock,
  Network,
  Scale,
  Search,
  Shield,
  ShieldCheck,
  Sparkles,
  BarChart3,
  Users,
  UserCog,
  Wrench,
} from "./icons";

export interface ProblemItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface SolutionItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
}

export interface RoleItem {
  icon: LucideIcon;
  role: string;
  title: string;
  description: string;
  highlights: string[];
  modules: string[];
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  loginPath: string;
}

export interface StatItem {
  icon: LucideIcon;
  value: string;
  label: string;
}

export interface TechStackCategory {
  category: string;
  color: string;
  bgColor: string;
  borderColor: string;
  items: string[];
}

export const PROBLEMS: ProblemItem[] = [
  {
    icon: AlertTriangle,
    title: "Knowledge Loss",
    description:
      "Retiring experts take decades of critical troubleshooting knowledge with them, creating dangerous institutional memory gaps.",
  },
  {
    icon: ClipboardList,
    title: "SOP Overload",
    description:
      "Thousands of standard operating procedures across departments become outdated, inconsistent, and nearly impossible to navigate.",
  },
  {
    icon: Wrench,
    title: "Repeated Troubleshooting",
    description:
      "Engineers waste hours solving problems that have already been resolved, with no centralized record of past solutions.",
  },
  {
    icon: FileSearch,
    title: "Scattered Documentation",
    description:
      "Critical information is spread across file servers, email threads, personal notebooks, and tribal knowledge.",
  },
  {
    icon: GraduationCap,
    title: "Slow Onboarding",
    description:
      "New engineers take 6–12 months to become productive because there is no structured path to learn from past experiences.",
  },
  {
    icon: Scale,
    title: "Compliance Challenges",
    description:
      "Meeting regulatory requirements with manual processes leads to audit failures and costly operational delays.",
  },
];

export const SOLUTIONS: SolutionItem[] = [
  {
    icon: BrainCircuit,
    title: "AI-Powered Assistance",
    description:
      "Gemini-powered copilot provides instant answers to complex industrial queries using your organization's own knowledge base.",
  },
  {
    icon: BookOpen,
    title: "Centralized Knowledge",
    description:
      "A single source of truth for SOPs, troubleshooting guides, maintenance logs, and expert insights — always up to date.",
  },
  {
    icon: Network,
    title: "Knowledge Graph",
    description:
      "Neo4j-powered graph connects equipment, failures, experts, and documents to surface hidden relationships and patterns.",
  },
  {
    icon: CheckCircle,
    title: "Expert Validation",
    description:
      "Senior engineers review and validate AI-generated insights, ensuring accuracy and building a trusted knowledge foundation.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance Intelligence",
    description:
      "Automated compliance tracking and audit trails ensure regulatory adherence with minimal manual effort.",
  },
  {
    icon: Search,
    title: "Intelligent Search",
    description:
      "RAG-powered semantic search understands context and intent, delivering precise answers from thousands of documents.",
  },
];

export const FEATURES: FeatureItem[] = [
  {
    icon: Brain,
    title: "AI Copilot",
    description:
      "Intelligent assistant powered by Gemini for real-time troubleshooting, document analysis, and decision support.",
  },
  {
    icon: BookOpen,
    title: "Knowledge Repository",
    description:
      "Centralized storage for SOPs, maintenance logs, engineering documents, and institutional knowledge.",
  },
  {
    icon: Network,
    title: "Knowledge Graph",
    description:
      "Visual Neo4j-powered graph connecting equipment, failures, experts, and solutions for deep insight.",
  },
  {
    icon: Shield,
    title: "Expert Vault",
    description:
      "Structured capture and AI indexing of retiring engineers' decades of experience and tribal knowledge.",
  },
  {
    icon: Sparkles,
    title: "Decision Intelligence",
    description:
      "Data-driven recommendations and predictive insights for optimal plant operations and maintenance planning.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance Center",
    description:
      "Automated compliance tracking, audit trails, and regulatory document management for enterprise safety.",
  },
  {
    icon: FileScan,
    title: "Document Intelligence (OCR)",
    description:
      "Extract and digitize knowledge from legacy paper documents, P&IDs, and handwritten maintenance logs.",
  },
  {
    icon: BarChart3,
    title: "Industrial Analytics",
    description:
      "Advanced analytics dashboards for equipment health, failure patterns, and operational efficiency metrics.",
    badge: "Coming Soon",
  },
];

export const ROLES: RoleItem[] = [
  {
    icon: HardHat,
    role: "Junior",
    title: "Junior Engineer",
    description:
      "Access guided troubleshooting, SOPs, and AI-powered learning tools to accelerate your expertise development.",
    highlights: [
      "AI Copilot for guided troubleshooting",
      "Knowledge Repository access",
      "Interactive learning from expert-validated content",
      "Document search and intelligent Q&A",
      "Personal knowledge bookmarks",
    ],
    modules: ["AI Copilot", "Knowledge Repository", "Interactive Learning"],
    accentColor: "text-cyan-400",
    accentBg: "bg-cyan-500/10",
    accentBorder: "border-cyan-500/20",
    loginPath: "/login/junior",
  },
  {
    icon: Cog,
    role: "Senior",
    title: "Senior Engineer",
    description:
      "Validate AI-generated knowledge, mentor junior engineers, and contribute expert insights to the knowledge base.",
    highlights: [
      "Knowledge validation and approval workflows",
      "Expert Vault contribution and review",
      "Mentorship tools and knowledge sharing",
      "Advanced Knowledge Graph exploration",
      "Decision Intelligence dashboards",
    ],
    modules: ["Review Center", "Expert Vault", "Knowledge Graph", "Decision Intelligence"],
    accentColor: "text-amber-400",
    accentBg: "bg-amber-500/10",
    accentBorder: "border-amber-500/20",
    loginPath: "/login/senior",
  },
  {
    icon: UserCog,
    role: "Admin",
    title: "Platform Administrator",
    description:
      "Full platform control including user management, role-based access, audit logs, and system configuration.",
    highlights: [
      "Role-based access control (RBAC)",
      "User provisioning and management",
      "Comprehensive audit log tracking",
      "System configuration and settings",
      "Compliance reporting and exports",
    ],
    modules: ["User Management", "Role Administration", "Audit Logs", "Settings"],
    accentColor: "text-primary",
    accentBg: "bg-primary/10",
    accentBorder: "border-primary/20",
    loginPath: "/login/admin",
  },
];

export const STATS: StatItem[] = [
  { icon: Cpu, value: "8+", label: "AI Modules" },
  { icon: Users, value: "3", label: "User Roles" },
  { icon: Lock, value: "JWT", label: "Secure Authentication" },
  { icon: Globe, value: "Enterprise", label: "Architecture" },
];

export const TECH_STACK: TechStackCategory[] = [
  {
    category: "Frontend",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
    items: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Backend",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    items: ["Node.js", "Express", "MongoDB", "Neo4j"],
  },
  {
    category: "AI / ML",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    items: ["Gemini", "RAG", "Knowledge Graph"],
  },
];
