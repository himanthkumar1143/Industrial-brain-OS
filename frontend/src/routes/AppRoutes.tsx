import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "../components/common/PrivateRoute";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";

/**
 * Lazy-loaded pages for code-splitting.
 */
const LandingPage = lazy(() =>
  import("../pages/LandingPage").then((m) => ({ default: m.LandingPage }))
);
const LoginPage = lazy(() =>
  import("../pages/LoginPage").then((m) => ({ default: m.LoginPage }))
);
const DashboardHome = lazy(() =>
  import("../pages/DashboardHome").then((m) => ({ default: m.DashboardHome }))
);
const ComingSoonPage = lazy(() =>
  import("../pages/ComingSoonPage").then((m) => ({ default: m.ComingSoonPage }))
);
const UnauthorizedPage = lazy(() =>
  import("../pages/UnauthorizedPage").then((m) => ({ default: m.UnauthorizedPage }))
);
const NotFoundPage = lazy(() =>
  import("../pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage }))
);

/**
 * SuspenseFallback – Shown while lazy pages are loading.
 */
const SuspenseFallback: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#0a0a0f] text-slate-400">
    <div className="animate-pulse text-sm font-medium">Loading...</div>
  </div>
);

/**
 * AppRoutes – Central route definitions for Industrial Brain OS.
 */
export const AppRoutes: React.FC = () => (
  <Suspense fallback={<SuspenseFallback />}>
    <Routes>
      {/* ── Public Routes ── */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login/:role" element={<LoginPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* ── Protected Dashboard Shell Routes ── */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        {/* Default dashboard command center */}
        <Route index element={<DashboardHome />} />

        {/* Step 6 Enterprise Module Placeholders */}
        <Route path="knowledge-graph" element={<ComingSoonPage />} />
        <Route path="documents" element={<ComingSoonPage />} />
        <Route path="chat" element={<ComingSoonPage />} />
        <Route path="search" element={<ComingSoonPage />} />
        <Route path="users" element={<ComingSoonPage />} />
        <Route path="analytics" element={<ComingSoonPage />} />
        <Route path="settings" element={<ComingSoonPage />} />

        {/* Legacy / Step 5 Backward Compatibility Routes */}
        <Route path="knowledge-repository" element={<ComingSoonPage />} />
        <Route path="ai-copilot" element={<ComingSoonPage />} />
        <Route path="expert-vault" element={<ComingSoonPage />} />
        <Route path="decision-intelligence" element={<ComingSoonPage />} />
        <Route path="compliance" element={<ComingSoonPage />} />
        <Route path="review-center" element={<ComingSoonPage />} />
        <Route path="user-management" element={<ComingSoonPage />} />
      </Route>

      {/* ── Catch-all 404 ── */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
);
