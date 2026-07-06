import React from "react";
import { AuthorizationState } from "../components/common/states/AuthorizationState";

/**
 * SessionExpiredPage – Thin wrapper around AuthorizationState for JWT session timeouts.
 * Enforces zero duplication and reuses centralized strings.
 */
export const SessionExpiredPage: React.FC = React.memo(() => (
  <div className="min-h-screen w-full bg-[#0a0a0f] text-slate-100 flex items-center justify-center p-4">
    <AuthorizationState variant="expired" primaryAction="reauthenticate" />
  </div>
));

SessionExpiredPage.displayName = "SessionExpiredPage";
