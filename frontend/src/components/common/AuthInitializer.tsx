import React, { ReactNode } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Loader2 } from "lucide-react";

/**
 * AuthInitializer – Gate that blocks the entire route tree until
 * AuthContext has finished restoring the session from localStorage.
 *
 * Flow:
 *   App Starts → AuthContext.restoreSession() → isLoading = true
 *     → AuthInitializer shows full-screen loader
 *   Session resolved → isLoading = false
 *     → AuthInitializer renders children (routes)
 *
 * This removes the need for every individual guard (PrivateRoute,
 * RoleRoute) to handle the loading state independently, ensuring
 * public routes also don't flash before hydration is complete.
 */
export const AuthInitializer: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0f] text-slate-100 select-none">
        {/* Ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/15 rounded-full blur-[120px] pointer-events-none" />

        {/* Spinner + text */}
        <div className="z-10 flex flex-col items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-primary/10 border border-primary/20">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
          <p className="text-sm font-medium text-slate-400 tracking-wide">
            Restoring session…
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
