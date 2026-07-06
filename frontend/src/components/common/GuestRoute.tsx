import type React from "react";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

type GuestRouteProps = {
  children: ReactNode;
};

/**
 * GuestRoute – UI-agnostic guard for public portals (/ and /login/:role).
 * Uses history replacement (replace: true) when redirecting authenticated users
 * to prevent browser Back button loops.
 */
export const GuestRoute: React.FC<GuestRouteProps> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  // If already authenticated, redirect using history replacement to prevent back-button trap
  if (user) {
    const stateData = (location.state as any) || {};
    const destination = stateData.from?.pathname || "/dashboard";
    const search = stateData.from?.search || "";
    const hash = stateData.from?.hash || "";
    return <Navigate to={`${destination}${search}${hash}`} replace />;
  }

  return <>{children}</>;
};
