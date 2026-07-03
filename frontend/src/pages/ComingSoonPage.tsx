import React from "react";
import { Link, useParams } from "react-router-dom";
import { Clock, Sparkles } from "lucide-react";

/**
 * ComingSoonPage – Placeholder for future sprint modules.
 * Extracts the module name from the URL path and renders
 * a polished "Coming Soon" card with a sprint badge.
 */

/** Maps route segments to human-readable module info. */
const MODULE_META: Record<string, { title: string; description: string; sprint: string }> = {
  "knowledge-repository": {
    title: "Knowledge Repository",
    description: "Centralized storage for factory documents, SOPs, maintenance logs, and engineering knowledge.",
    sprint: "Sprint 2",
  },
  "ai-copilot": {
    title: "AI Copilot",
    description: "Intelligent assistant powered by Gemini for instant troubleshooting and knowledge retrieval.",
    sprint: "Sprint 3",
  },
  "knowledge-graph": {
    title: "Knowledge Graph",
    description: "Neo4j-powered visual graph connecting equipment, failures, experts, and documents.",
    sprint: "Sprint 4",
  },
  "expert-vault": {
    title: "Expert Vault",
    description: "Preserve retiring engineers' knowledge through structured capture and AI indexing.",
    sprint: "Sprint 5",
  },
  "decision-intelligence": {
    title: "Decision Intelligence",
    description: "Data-driven decision support with AI-generated recommendations for plant operations.",
    sprint: "Sprint 5",
  },
  compliance: {
    title: "Compliance Center",
    description: "Automated compliance tracking, audit trails, and regulatory document management.",
    sprint: "Sprint 6",
  },
  "review-center": {
    title: "Review Center",
    description: "Senior engineers review, validate, and approve knowledge contributions before publication.",
    sprint: "Sprint 4",
  },
  "user-management": {
    title: "User Management",
    description: "Admin panel for managing users, roles, permissions, and organizational access controls.",
    sprint: "Sprint 3",
  },
  settings: {
    title: "Settings",
    description: "Platform-wide configuration, notification preferences, and system tuning.",
    sprint: "Sprint 6",
  },
};

export const ComingSoonPage: React.FC = () => {
  const { "*": splat } = useParams();
  // Extract the last segment of the URL for module lookup
  const segment = splat?.split("/").pop() ?? "";
  const meta = MODULE_META[segment] ?? {
    title: "Module",
    description: "This module is planned for a future sprint.",
    sprint: "Upcoming",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      {/* Card */}
      <div className="w-full max-w-lg backdrop-blur-md bg-card/60 border border-border rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.4)] text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center p-3.5 rounded-2xl bg-primary/10 border border-primary/20 mb-5">
          <Clock className="h-8 w-8 text-primary" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-slate-100 mb-2">{meta.title}</h2>

        {/* Sprint badge */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-5">
          <Sparkles className="h-3.5 w-3.5" />
          Planned for {meta.sprint}
        </span>

        {/* Description */}
        <p className="text-sm text-slate-400 leading-relaxed mb-6">{meta.description}</p>

        {/* Action */}
        <Link
          to="/dashboard"
          className="inline-flex items-center px-5 py-2.5 rounded-xl bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 transition-all font-medium text-sm"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};
