import React from "react";
import { useLocation } from "react-router-dom";
import { Clock } from "lucide-react";
import { getNavItemByPath } from "../constants/navigation";
import { PageContainer } from "../components/dashboard/PageContainer";
import { PageHeader } from "../components/dashboard/PageHeader";
import { EmptyState } from "../components/common/states/EmptyState";

/**
 * ComingSoonPage – Placeholder for future sprint modules.
 * Strictly driven by centralized navigation metadata and the reusable EmptyState component (zero duplication).
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

      <div className="py-6">
        <EmptyState
          title={title}
          description="This enterprise module is actively under development and will be available in a future sprint."
          icon={Icon}
          actionLabel="Return to Dashboard Command"
          actionHref="/dashboard"
        />
      </div>
    </PageContainer>
  );
});

ComingSoonPage.displayName = "ComingSoonPage";

