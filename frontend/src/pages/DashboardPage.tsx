import React from "react";
import { useAuth } from "../contexts/AuthContext";

/**
 * DashboardPage – Main dashboard view (placeholder).
 * Displays a welcome banner and role badge.
 * Will be enriched in future steps with stats, activity logs, and health cards.
 */
export const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="backdrop-blur-md bg-card/60 border border-border rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
        <h1 className="text-2xl font-bold text-slate-100 mb-1">
          Welcome back{user ? `, ${user.email}` : ""}
        </h1>
        {user && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 capitalize">
            {user.role} Engineer
          </span>
        )}
        <p className="text-sm text-slate-400 mt-3">
          Your Industrial Brain OS dashboard. Modules will appear here as they are built in future sprints.
        </p>
      </div>
    </div>
  );
};
