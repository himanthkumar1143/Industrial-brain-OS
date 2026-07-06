import type React from "react";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

type PrivateRouteProps = {
  children: ReactNode;
};

/**
 * PrivateRoute – UI-agnostic guard for protected enterprise routes.
 * Verifies authentication state and preserves deep-link destination.
 */
export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, isExpired } = useAuth();
  const location = useLocation();

  // Redirect unauthenticated users while preserving requested deep-link destination
  if (!user) {
    if (isExpired) {
      return <Navigate to="/session-expired" state={{ from: location }} replace />;
    }
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
