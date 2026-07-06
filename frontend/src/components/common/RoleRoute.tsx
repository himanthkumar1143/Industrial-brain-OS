import type React from "react";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { hasRoleAccess } from "../../constants/navigation";
import type { UserRole } from "../../types/navigation";

type RoleRouteProps = {
  allowedRoles: UserRole[];
  children: ReactNode;
};

/**
 * RoleRoute – UI-agnostic guard enforcing RBAC security boundaries.
 * Verifies role clearance and redirects unauthorized access to /forbidden.
 */
export const RoleRoute: React.FC<RoleRouteProps> = ({ allowedRoles, children }) => {
  const { user, isExpired } = useAuth();
  const location = useLocation();

  if (!user) {
    if (isExpired) {
      return <Navigate to="/session-expired" state={{ from: location }} replace />;
    }
    return <Navigate to="/login/admin" state={{ from: location }} replace />;
  }

  if (!hasRoleAccess(user.role, allowedRoles)) {
    // Authenticated but role not permitted – redirect to forbidden page with role context
    return <Navigate to="/forbidden" state={{ from: location, requiredRoles: allowedRoles }} replace />;
  }

  return <>{children}</>;
};
