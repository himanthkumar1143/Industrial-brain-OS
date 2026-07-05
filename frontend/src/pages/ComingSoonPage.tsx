import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Clock, Sparkles, ArrowLeft } from "lucide-react";
import { getNavItemByPath } from "../constants/navigation";
import { PageContainer } from "../components/dashboard/PageContainer";
import { PageHeader } from "../components/dashboard/PageHeader";

/**
 * ComingSoonPage – Placeholder for future sprint modules.
 * Strictly driven by centralized navigation metadata (zero duplication) to render
 * Large heading, Short description, and "Coming Soon" badge.
 */
export const ComingSoonPage: React.FC = React.memo(() => {
  const location = useLocation();
  const item = getNavItemByPath(location.pathname);

  const title = item ? item.pageTitle : "Module Coming Soon";
  const description = item
    ? item.pageDescription
    : "This enterprise module is planned for deployment in a future sprint of Industrial Brain OS.";
  const Icon = item ? item.icon : Clock;

  return (
    <PageContainer>
      <PageHeader title={title} description={description} />

      <div className="flex flex-col items-center justify-center min-h-[55vh] px-4 py-8">
        <div className="w-full max-w-lg backdrop-blur-md bg-card/60 border border-border/80 rounded-3xl p-8 md:p-10 shadow-2xl text-center space-y-6 animate-scale-up">
          {/* Module Icon */}
          <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-primary/10 border border-primary/20 text-primary shadow-inner">
            <Icon className="h-10 w-10 animate-pulse" />
          </div>

          {/* Large Heading */}
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 tracking-tight">
            {title}
          </h2>

          {/* Coming Soon Badge */}
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-amber-500/10 text-amber-400 border border-amber-500/25 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Coming Soon</span>
            </span>
          </div>

          {/* Short Description */}
          <p className="text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
            {description}
          </p>

          {/* Back Action */}
          <div className="pt-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 font-semibold text-xs shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Return to Dashboard Command</span>
            </Link>
          </div>
        </div>
      </div>
    </PageContainer>
  );
});

ComingSoonPage.displayName = "ComingSoonPage";
