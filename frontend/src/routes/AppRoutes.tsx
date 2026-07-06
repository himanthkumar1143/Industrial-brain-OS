import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute } from "../components/common/PrivateRoute";
import { RoleRoute } from "../components/common/RoleRoute";
import { GuestRoute } from "../components/common/GuestRoute";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import { NotFoundState } from "../components/common/states/NotFoundState";
import { LoadingState } from "../components/common/states/LoadingState";

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
const ForbiddenPage = lazy(() =>
  import("../pages/ForbiddenPage").then((m) => ({ default: m.ForbiddenPage }))
);
const SessionExpiredPage = lazy(() =>
  import("../pages/SessionExpiredPage").then((m) => ({ default: m.SessionExpiredPage }))
);

/**
 * SuspenseFallback – Shown while lazy pages are loading. Reuses Step 7 LoadingState.
 */
const SuspenseFallback: React.FC = () => (
  <LoadingState fullPage size="medium" title="Loading module..." description="Retrieving code bundle and assets." />
);

/**
 * AppRoutes – Central route definitions for Industrial Brain OS.
 */
export const AppRoutes: React.FC = () => (
  <Suspense fallback={<SuspenseFallback />}>
    <Routes>
      {/* ── Public & Guest Routes ── */}
      <Route path="/" element={<GuestRoute><LandingPage /></GuestRoute>} />
      <Route path="/login/:role" element={<GuestRoute><LoginPage /></GuestRoute>} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="/forbidden" element={<ForbiddenPage />} />
      <Route path="/session-expired" element={<SessionExpiredPage />} />

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
        <Route path="analytics" element={<ComingSoonPage />} />

        {/* RBAC Protected Administrative & Senior Modules */}
        <Route
          path="users"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <ComingSoonPage />
            </RoleRoute>
          }
        />
        <Route
          path="settings"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <ComingSoonPage />
            </RoleRoute>
          }
        />
        <Route
          path="review-center"
          element={
            <RoleRoute allowedRoles={["senior", "admin"]}>
              <ComingSoonPage />
            </RoleRoute>
          }
        />
        <Route
          path="user-management"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <ComingSoonPage />
            </RoleRoute>
          }
        />

        {/* Legacy / Step 5 Backward Compatibility Routes */}
        <Route path="knowledge-repository" element={<ComingSoonPage />} />
        <Route path="ai-copilot" element={<ComingSoonPage />} />
        <Route path="expert-vault" element={<ComingSoonPage />} />
        <Route path="decision-intelligence" element={<ComingSoonPage />} />
        <Route path="compliance" element={<ComingSoonPage />} />

        {/* Step 7 Enterprise UI States Framework 404 Catch-All within Dashboard Shell */}
        <Route path="*" element={<NotFoundState />} />
      </Route>

      {/* ── Catch-all Public Route (Redirects to Landing Page) ── */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Suspense>
);
