import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

type RoleRouteProps = {
  allowedRoles: ("junior" | "senior" | "admin")[ ];
  children: ReactNode;
};

export const RoleRoute: React.FC<RoleRouteProps> = ({ allowedRoles, children }) => {
  const { user } = useAuth();

  if (!user) {
    // Not authenticated – redirect to landing/home
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Authenticated but role not permitted – redirect to unauthorized page
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
