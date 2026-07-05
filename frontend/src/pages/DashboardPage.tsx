import React, { useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, ShieldAlert } from "lucide-react";

/**
 * DashboardPage – Main dashboard view (placeholder).
 * Displays a welcome banner and role badge.
 * Will be enriched in future steps with stats, activity logs, and health cards.
 */
export const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    logout();
    navigate("/", { replace: true });
  }, [logout, navigate]);

  return (
    <div className="space-y-6">
      {/* Temporary Enterprise Logout Control (Step 5.1 Verification Helper) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-amber-300">
              Authentication Verification Helper
            </p>
            <p className="text-[11px] text-amber-400/80">
              Use this control to verify multi-role login flows and session termination.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          aria-label="Logout (Temporary – moved to Navbar in Step 6)"
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-rose-600/90 hover:bg-rose-600 text-white text-xs font-semibold shadow-lg shadow-rose-600/25 hover:shadow-rose-600/40 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0f] transition-all duration-200 flex items-center justify-center gap-2 shrink-0"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout (Temporary – moved to Navbar in Step 6)</span>
        </button>
      </div>

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
