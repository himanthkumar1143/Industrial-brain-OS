import React from "react";
import { User, ShieldAlert, ShieldCheck } from "lucide-react";

interface AuthHeaderProps {
  role: "junior" | "senior" | "admin";
}

/**
 * AuthHeader – Displays dynamic role branding, badge, title, and description.
 * Wrapped in React.memo for high performance.
 */
export const AuthHeader: React.FC<AuthHeaderProps> = React.memo(({ role }) => {
  const roleConfig = {
    junior: {
      title: "Junior Engineer Login",
      subtitle: "Access operations telemetry, diagnostics, and real-time monitoring workflows.",
      badgeText: "Operations Level 1",
      badgeClass: "bg-sky-500/10 text-sky-400 border-sky-500/20",
      iconClass: "bg-sky-500/10 text-sky-400 border-sky-500/30",
      Icon: User,
    },
    senior: {
      title: "Senior Engineer Login",
      subtitle: "Manage system control loops, neural optimization, and architecture governance.",
      badgeText: "Engineering Level 2",
      badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      iconClass: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      Icon: ShieldCheck,
    },
    admin: {
      title: "Administrator Login",
      subtitle: "Command enterprise security policies, multi-tenant RBAC, and global orchestration.",
      badgeText: "System Admin Level 3",
      badgeClass: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      iconClass: "bg-purple-500/10 text-purple-400 border-purple-500/30",
      Icon: ShieldAlert,
    },
  }[role];

  const { title, subtitle, badgeText, badgeClass, iconClass, Icon } = roleConfig;

  return (
    <div className="text-center mb-8">
      {/* Role Icon & Badge */}
      <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border mb-4 text-xs font-semibold shadow-sm backdrop-blur-sm transition-all duration-300">
        <div className={`p-1 rounded-md border ${iconClass}`}>
          <Icon className="h-3.5 w-3.5" />
        </div>
        <span className={badgeClass.split(" ")[1]}>{badgeText}</span>
      </div>

      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
        {title}
      </h2>

      {/* Subtitle */}
      <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
});

AuthHeader.displayName = "AuthHeader";
