import React, { useMemo, useEffect, useState, useRef } from "react";
import { useParams, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { AuthLayout } from "../components/auth/AuthLayout";
import { LoginCard } from "../components/auth/LoginCard";

/**
 * Helper to format enterprise role code into readable display name.
 */
const getRoleDisplayName = (role?: string): string => {
  switch (role) {
    case "admin":
      return "Administrator";
    case "senior":
      return "Senior Engineer";
    case "junior":
      return "Junior Engineer";
    default:
      return "Authenticated Engineer";
  }
};

/**
 * LoginPage – Dynamic Role-Based Authentication Portal (/login/:role).
 *
 * Implements a single reusable route for all enterprise roles:
 *  - /login/junior
 *  - /login/senior
 *  - /login/admin
 *
 * Automatically normalizes unrecognized roles to "admin", redirects already-logged-in
 * users while preserving intended destination state, and renders the enterprise
 * glassmorphism AuthLayout and LoginCard.
 *
 * Sprint 1 - Step 5.4 Enhancement & Bug Fix:
 * When an already-authenticated user visits a login route, displays an informative toast
 * and delays redirection by ~900ms without flashing any login form UI or getting stuck in loading states.
 */
export const LoginPage: React.FC = React.memo(() => {
  const { role } = useParams<{ role: string }>();
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  const [isRedirecting, setIsRedirecting] = useState(false);
  const hasToastedRef = useRef(false);
  const wasLoggedOutRef = useRef(false);

  // Validate and normalize role parameter
  const validRole = useMemo((): "junior" | "senior" | "admin" | null => {
    if (role === "junior" || role === "senior" || role === "admin") {
      return role;
    }
    return null;
  }, [role]);

  // Track if the user arrived at this page without an active session (i.e. saw the login form)
  if (!isLoading && user === null) {
    wasLoggedOutRef.current = true;
  }

  // Handle already-authenticated sessions: display info toast & delay redirect by ~900ms.
  // Must ONLY run when loading is false AND user is confirmed valid.
  useEffect(() => {
    // Requirement 2 & 4: Ensure redirect logic executes ONLY AFTER loading === false AND user !== null
    if (isLoading || user === null) {
      return;
    }

    // If the user arrived without a session (saw the login form) and just logged in, do not trigger the "already signed in" flow
    if (wasLoggedOutRef.current) {
      return;
    }

    // Requirement 3 & 7: Trigger toast exactly once across re-renders
    if (!hasToastedRef.current) {
      hasToastedRef.current = true;
      setIsRedirecting(true);

      const roleDisplayName = getRoleDisplayName(user.role);
      toast.info(
        `You're already signed in as ${roleDisplayName}. Please log out first to switch accounts.`,
        "Already Signed In"
      );
    }

    // Requirement 3 & 6: Properly managed redirect timer.
    // If the effect re-runs (e.g. due to React Strict Mode remount or dependency changes),
    // we must ensure a timer is active to complete the redirect.
    const destination = (location.state as any)?.from?.pathname || "/dashboard";
    const timer = setTimeout(() => {
      navigate(destination, { replace: true });
    }, 900);

    return () => {
      clearTimeout(timer);
    };
  }, [isLoading, user, location, navigate, toast]);

  // Invalid role protection: immediately redirect to landing page
  if (!validRole) {
    return <Navigate to="/" replace />;
  }

  // Already authenticated login protection:
  // 1. If arrived already logged in (!wasLoggedOutRef.current), display info toast & delay redirect by ~900ms without flashing login UI
  // 2. If just logged in via form (wasLoggedOutRef.current), redirect immediately without showing duplicate toast
  if (user !== null || isRedirecting) {
    if (wasLoggedOutRef.current && !isRedirecting) {
      const destination = (location.state as any)?.from?.pathname || "/dashboard";
      return <Navigate to={destination} replace />;
    }

    return (
      <AuthLayout role={validRole}>
        <div className="flex flex-col items-center justify-center p-12 text-center space-y-4 animate-fade-in">
          <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-slate-300">
            Active session detected. Redirecting to your workspace...
          </p>
        </div>
      </AuthLayout>
    );
  }

  // If session is still loading, show a subtle loading spinner inside AuthLayout
  if (isLoading) {
    return (
      <AuthLayout role={validRole}>
        <div className="flex items-center justify-center p-12">
          <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout role={validRole}>
      <LoginCard role={validRole} />
    </AuthLayout>
  );
});

LoginPage.displayName = "LoginPage";
