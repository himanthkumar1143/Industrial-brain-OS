import type React from "react";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

type RoleRouteProps = {
  allowedRoles: ("junior" | "senior" | "admin")[ ];
  children: ReactNode;
};

export const RoleRoute: React.FC<RoleRouteProps> = ({ allowedRoles, children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Not authenticated – redirect to landing page while preserving destination
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Authenticated but role not permitted – redirect to unauthorized page
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
