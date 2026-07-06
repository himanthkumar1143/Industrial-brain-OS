import type React from "react";
import type { ReactNode } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { LoadingState } from "./states/LoadingState";
import { LOADING_MESSAGES } from "../../constants/uiStates";

/**
 * AuthInitializer – Gate that blocks the entire route tree until
 * AuthContext has finished restoring the session from storage.
 * Reuses Step 7 LoadingState to enforce zero duplication and 0 CLS.
 */
export const AuthInitializer: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <LoadingState
        fullPage
        size="large"
        title={LOADING_MESSAGES.auth.title}
        description={LOADING_MESSAGES.auth.description}
      />
    );
  }

  return <>{children}</>;
};
