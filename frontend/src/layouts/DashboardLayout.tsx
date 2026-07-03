import React from "react";
import { Outlet } from "react-router-dom";

/**
 * DashboardLayout – Wraps all authenticated dashboard pages.
 * Provides a top navbar, sidebar, and content area via <Outlet />.
 * Full navbar/sidebar will be built in Step 6.
 */
export const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100">
      {/* Placeholder navbar – Step 6 */}
      <header className="h-14 border-b border-border bg-card/60 backdrop-blur-md flex items-center px-6">
        <span className="text-sm font-semibold text-slate-200">Industrial Brain OS</span>
      </header>

      {/* Content area */}
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};
