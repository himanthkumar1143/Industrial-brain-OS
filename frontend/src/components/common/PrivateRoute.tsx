import type React from "react";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

type PrivateRouteProps = {
  children: ReactNode;
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useAuth();

  // Redirect unauthenticated users to landing page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
