import React from "react";
import { AuthorizationState } from "../components/common/states/AuthorizationState";

/**
 * ForbiddenPage – Thin wrapper around AuthorizationState for 403 Forbidden errors.
 * Enforces zero duplication and reuses centralized strings.
 */
export const ForbiddenPage: React.FC = React.memo(() => (
  <div className="min-h-screen w-full bg-[#0a0a0f] text-slate-100 flex items-center justify-center p-4">
    <AuthorizationState variant="forbidden" primaryAction="dashboard" secondaryAction="back" />
  </div>
));

ForbiddenPage.displayName = "ForbiddenPage";
