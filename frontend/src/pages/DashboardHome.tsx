import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { NAVIGATION_CONFIG } from "../constants/navigation";
import { ROLE_BADGES } from "../constants/auth";
import { PageContainer } from "../components/dashboard/PageContainer";
import { PageHeader } from "../components/dashboard/PageHeader";

/**
 * DashboardHome – Enterprise landing view for authenticated users.
 * Consumes centralized route metadata and renders lightweight responsive preview cards
 * for upcoming sprint modules without fake metrics or backend calls.
 */
export const DashboardHome: React.FC = React.memo(() => {
  const { user } = useAuth();
  const meta = NAVIGATION_CONFIG.dashboard;
  const roleConfig = user && ROLE_BADGES[user.role] ? ROLE_BADGES[user.role] : ROLE_BADGES.junior;

  // 4 lightweight dashboard cards from centralized metadata
  const previewCards = [
    NAVIGATION_CONFIG.knowledgeGraph,
    NAVIGATION_CONFIG.documents,
    NAVIGATION_CONFIG.chat,
    NAVIGATION_CONFIG.analytics,
  ];

  return (
    <PageContainer>
      {/* Page Header driven by centralized config */}
      <PageHeader
        title={meta.pageTitle}
        description={meta.pageDescription}
        badge={roleConfig.label}
      />

      {/* Welcome & Role Overview Card */}
      <div className="backdrop-blur-md bg-gradient-to-r from-card/90 via-card/60 to-primary/10 border border-border/80 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none group-hover:bg-primary/15 transition-all duration-500" />
        
        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/15 text-primary border border-primary/25">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Sprint 1 Step 6 Foundation Active</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100">
            Welcome back{user ? `, ${user.email.split("@")[0]}` : ""}
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Your Industrial Brain OS framework is initialized and configured for role-based enterprise operations.
            Select a module below or from the left navigation to explore upcoming capabilities.
          </p>
        </div>
      </div>

      {/* 4 Lightweight Enterprise Module Preview Cards */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Core Module Preview
          </h3>
          <span className="text-xs text-slate-500 font-medium">Sprint 2 – 6 Roadmap</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {previewCards.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={item.route}
                className="group relative backdrop-blur-md bg-card/60 hover:bg-card/90 border border-border/80 hover:border-primary/40 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:shadow-primary/5 transition-all duration-200 flex flex-col justify-between overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-200 shrink-0">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                      Coming Soon
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="text-lg font-bold text-slate-100 group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                      {item.pageDescription}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-slate-200 transition-colors">
                  <span>Explore Module Architecture</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform text-primary" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </PageContainer>
  );
});

DashboardHome.displayName = "DashboardHome";
