import React, { useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ShieldAlert,
  Lock,
  Clock,
  UserCog,
  Cpu,
  Award,
  LayoutDashboard,
  LogIn,
  ArrowLeft,
  AlertTriangle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ErrorState } from "./ErrorState";
import type { ActionConfig } from "./ErrorState";
import { AUTHORIZATION_MESSAGES } from "../../../constants/uiStates";
import { ROLE_BADGES } from "../../../constants/auth";
import { useAuth } from "../../../contexts/AuthContext";
import type { UserRole } from "../../../types/navigation";

export type AuthorizationVariant =
  | "unauthorized"
  | "forbidden"
  | "expired"
  | "denied"
  | "permissionRequired"
  | "adminOnly"
  | "engineerOnly"
  | "seniorOnly";

export interface AuthorizationStateProps {
  /** Variant preset determining default icon, title, subtitle, and description */
  variant?: AuthorizationVariant;
  /** Optional custom title override */
  title?: string;
  /** Optional custom subtitle override */
  subtitle?: string;
  /** Optional custom description override */
  description?: string;
  /** Optional Lucide icon override */
  icon?: LucideIcon;
  /** Primary action configuration or keyword ('dashboard', 'login', 'reauthenticate', 'back') */
  primaryAction?: ActionConfig;
  /** Secondary action configuration or keyword */
  secondaryAction?: ActionConfig;
}

/**
 * AuthorizationState – Single source of truth for all enterprise authorization UI.
 * Wraps ErrorState from the Step 7 Enterprise UI States Framework to enforce zero duplication,
 * WCAG AA accessibility, zero CLS, and intelligent deep-link state preservation.
 */
export const AuthorizationState: React.FC<AuthorizationStateProps> = React.memo(({
  variant = "denied",
  title,
  subtitle,
  description,
  icon,
  primaryAction,
  secondaryAction,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Extract return destination and role context passed from route guards or error interceptors
  const stateData = useMemo(() => (location.state as any) || {}, [location.state]);
  const returnLocation = useMemo(
    () => stateData.from || { pathname: "/dashboard", search: "", hash: "" },
    [stateData.from]
  );
  const requiredRoles: UserRole[] | undefined = stateData.requiredRoles;

  // Retrieve standardized message preset from uiStates
  const msg = AUTHORIZATION_MESSAGES[variant] || AUTHORIZATION_MESSAGES.denied;

  // Resolve default Lucide icon by variant
  const defaultIcon = useMemo((): LucideIcon => {
    switch (variant) {
      case "unauthorized":
        return ShieldAlert;
      case "forbidden":
      case "permissionRequired":
        return Lock;
      case "expired":
        return Clock;
      case "adminOnly":
        return UserCog;
      case "engineerOnly":
        return Cpu;
      case "seniorOnly":
        return Award;
      case "denied":
      default:
        return AlertTriangle;
    }
  }, [variant]);

  const IconToUse = icon || defaultIcon;

  // Format title combining title and subtitle if not overridden
  const finalTitle = useMemo(() => {
    if (title) return title;
    const sub = subtitle || msg.subtitle;
    return `${msg.title} – ${sub}`;
  }, [title, subtitle, msg.title, msg.subtitle]);

  // Enrich description with current role vs required role context if available
  const finalDescription = useMemo(() => {
    if (description) return description;
    const baseDesc = msg.description;
    if (variant === "forbidden" && user && requiredRoles && requiredRoles.length > 0) {
      const userRoleLabel = ROLE_BADGES[user.role]?.label || user.role;
      const requiredLabels = requiredRoles
        .map((r) => ROLE_BADGES[r]?.label || r)
        .join(" or ");
      return `${baseDesc} Current role (${userRoleLabel}) lacks sufficient clearance. Required role: ${requiredLabels}.`;
    }
    return baseDesc;
  }, [description, msg.description, variant, user, requiredRoles]);

  // Helper to resolve action keywords into deep-link preserving callbacks
  const resolveAction = useCallback(
    (config?: ActionConfig, isPrimary = false): ActionConfig | undefined => {
      if (!config) {
        if (isPrimary) {
          // Default primary actions based on variant
          if (variant === "unauthorized" || variant === "expired") {
            const targetRole = user?.role || "admin";
            return {
              label: variant === "expired" ? "Re-authenticate" : "Sign In",
              onClick: () =>
                navigate(`/login/${targetRole}`, {
                  state: { from: returnLocation, expired: variant === "expired" },
                }),
              icon: LogIn,
            };
          }
          return {
            label: "Return to Dashboard Command",
            onClick: () => navigate("/dashboard"),
            icon: LayoutDashboard,
          };
        }
        // Default secondary action for authorization failures is Go Back
        if (!isPrimary && (variant === "forbidden" || variant === "denied")) {
          return {
            label: "Go Back",
            onClick: () => navigate(-1),
            icon: ArrowLeft,
          };
        }
        return undefined;
      }

      if (typeof config === "string") {
        const lower = config.toLowerCase();
        if (lower === "login" || lower === "reauthenticate" || lower === "sign in") {
          const targetRole = user?.role || "admin";
          return {
            label: variant === "expired" ? "Re-authenticate" : "Sign In",
            onClick: () =>
              navigate(`/login/${targetRole}`, {
                state: { from: returnLocation, expired: variant === "expired" },
              }),
            icon: LogIn,
          };
        }
        if (lower === "dashboard" || lower === "return to dashboard") {
          return {
            label: "Return to Dashboard Command",
            onClick: () => navigate("/dashboard"),
            icon: LayoutDashboard,
          };
        }
        if (lower === "back" || lower === "go back") {
          return {
            label: "Go Back",
            onClick: () => navigate(-1),
            icon: ArrowLeft,
          };
        }
      }

      return config;
    },
    [variant, user, navigate, returnLocation]
  );

  const resolvedPrimary = resolveAction(primaryAction, true);
  const resolvedSecondary = resolveAction(secondaryAction, false);

  return (
    <ErrorState
      icon={IconToUse}
      title={finalTitle}
      description={finalDescription}
      primaryAction={resolvedPrimary}
      secondaryAction={resolvedSecondary}
    />
  );
});

AuthorizationState.displayName = "AuthorizationState";
