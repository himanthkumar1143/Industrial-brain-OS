import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "../components/common/PrivateRoute";
import { DashboardLayout } from "../layouts/DashboardLayout";

/**
 * Lazy-loaded pages for code-splitting.
 * Each page is loaded asynchronously to optimize the initial bundle size.
 */
const LandingPage = lazy(() =>
  import("../pages/LandingPage").then((m) => ({ default: m.LandingPage }))
);
const LoginPage = lazy(() =>
  import("../pages/LoginPage").then((m) => ({ default: m.LoginPage }))
);
const DashboardPage = lazy(() =>
  import("../pages/DashboardPage").then((m) => ({ default: m.DashboardPage }))
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
 * Will be replaced by SkeletonLoader in Step 10.
 */
const SuspenseFallback: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#0a0a0f] text-slate-400">
    <div className="animate-pulse text-sm font-medium">Loading...</div>
  </div>
);

/**
 * AppRoutes – Central route definitions for the entire application.
 *
 * Route structure:
 *   /                           → LandingPage          (public)
 *   /login/:role                → LoginPage            (public)
 *   /unauthorized               → UnauthorizedPage     (public)
 *   /dashboard                  → DashboardLayout      (protected)
 *     index                     → DashboardPage
 *     knowledge-repository      → ComingSoonPage
 *     ai-copilot                → ComingSoonPage
 *     knowledge-graph           → ComingSoonPage
 *     expert-vault              → ComingSoonPage
 *     decision-intelligence     → ComingSoonPage
 *     compliance                → ComingSoonPage
 *     review-center             → ComingSoonPage
 *     user-management           → ComingSoonPage
 *     settings                  → ComingSoonPage
 *   *                           → NotFoundPage         (catch-all)
 */
export const AppRoutes: React.FC = () => (
  <Suspense fallback={<SuspenseFallback />}>
    <Routes>
      {/* ── Public Routes ── */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login/:role" element={<LoginPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* ── Protected Dashboard Routes ── */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        {/* Default dashboard index */}
        <Route index element={<DashboardPage />} />

        {/* Future module placeholders */}
        <Route path="knowledge-repository" element={<ComingSoonPage />} />
        <Route path="ai-copilot" element={<ComingSoonPage />} />
        <Route path="knowledge-graph" element={<ComingSoonPage />} />
        <Route path="expert-vault" element={<ComingSoonPage />} />
        <Route path="decision-intelligence" element={<ComingSoonPage />} />
        <Route path="compliance" element={<ComingSoonPage />} />
        <Route path="review-center" element={<ComingSoonPage />} />
        <Route path="user-management" element={<ComingSoonPage />} />
        <Route path="settings" element={<ComingSoonPage />} />
      </Route>

      {/* ── Catch-all 404 ── */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
);
