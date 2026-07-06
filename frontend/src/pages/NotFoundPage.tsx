import React from "react";
import { NotFoundState } from "../components/common/states/NotFoundState";
import { PageContainer } from "../components/dashboard/PageContainer";

/**
 * NotFoundPage – Reusable 404 page displayed for unknown routes within the dashboard shell.
 * Strictly driven by the Enterprise UI States Framework (NotFoundState) with zero duplication.
 */
export const NotFoundPage: React.FC = React.memo(() => (
  <PageContainer>
    <div className="flex items-center justify-center min-h-[70vh]">
      <NotFoundState />
    </div>
  </PageContainer>
));

NotFoundPage.displayName = "NotFoundPage";
