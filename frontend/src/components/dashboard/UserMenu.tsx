import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { User as UserIcon, LogOut, Settings, UserCircle, Clock, CheckCircle } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { ROLE_BADGES } from "../../constants/auth";

/**
 * UserMenu – Enterprise user profile control and session telemetry display.
 * Features 3-tier avatar fallback (image -> initials -> generic icon), centralized role badge styling,
 * remembered vs. temporary session status, and clean logout execution with graceful transition.
 */
export const UserMenu: React.FC = React.memo(() => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggingOut(true);
    closeDropdown();
    logout();
    navigate("/", { replace: true });
  }, [closeDropdown, logout, navigate]);

  // Click outside and ESC key listeners
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closeDropdown();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeDropdown]);

  // 3-tier avatar fallback: Image -> Initials -> Generic Icon
  const avatarInitials = useMemo(() => {
    if (!user) return null;
    if (user.role === "junior") return "JE";
    if (user.role === "senior") return "SE";
    if (user.role === "admin") return "AD";
    return user.email.slice(0, 2).toUpperCase();
  }, [user]);

  const roleConfig = user && ROLE_BADGES[user.role] ? ROLE_BADGES[user.role] : ROLE_BADGES.junior;

  const extendedUser = user as (typeof user & { displayName?: string; name?: string }) | null;
  const displayName = extendedUser?.displayName || extendedUser?.name;
  const buttonPrimaryText = displayName || (user ? user.email.split("@")[0] : "User");
  const buttonSecondaryText = displayName ? (user ? user.email : "") : roleConfig.label;

  const dropdownPrimaryText = displayName || (user ? user.email.split("@")[0] : "User");
  const dropdownSecondaryText = user ? user.email : "user@industrialbrain.os";

  const isRememberedSession = useMemo(() => {
    try {
      return !!localStorage.getItem("token");
    } catch {
      return false;
    }
  }, []);

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={toggleDropdown}
        aria-label="User profile and settings menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-card/80 border border-transparent hover:border-border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {/* Avatar Display */}
        <div className={`h-8 w-8 rounded-lg flex items-center justify-center font-bold text-xs shadow-sm ${roleConfig.bgClass} ${roleConfig.textClass} border ${roleConfig.borderClass}`}>
          {avatarInitials ? <span>{avatarInitials}</span> : <UserIcon className="h-4 w-4" />}
        </div>

        <div className="hidden lg:flex flex-col text-left overflow-hidden">
          <span className="text-xs font-semibold text-slate-200 truncate max-w-[130px]">
            {buttonPrimaryText}
          </span>
          <span className="text-[10px] text-slate-400 font-medium truncate max-w-[130px]">
            {buttonSecondaryText}
          </span>
        </div>
      </button>

      {/* Lazy rendered dropdown DOM */}
      {isOpen && (
        <div
          role="menu"
          aria-label="User Menu"
          className="absolute right-0 mt-2 w-72 rounded-2xl bg-card border border-border shadow-2xl py-2 z-50 animate-scale-up origin-top-right divide-y divide-border/80"
        >
          {/* User Info Header */}
          <div className="px-4 py-3 space-y-2">
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-md ${roleConfig.bgClass} ${roleConfig.textClass} border ${roleConfig.borderClass}`}>
                {avatarInitials ? <span>{avatarInitials}</span> : <UserIcon className="h-5 w-5" />}
              </div>
              <div className="overflow-hidden flex-1">
                <p className="text-xs font-bold text-slate-100 truncate">
                  {dropdownPrimaryText}
                </p>
                <p className="text-[11px] text-slate-400 truncate font-medium">
                  {dropdownSecondaryText}
                </p>
                <span className={`inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-semibold ${roleConfig.bgClass} ${roleConfig.textClass} border ${roleConfig.borderClass}`}>
                  {roleConfig.label}
                </span>
              </div>
            </div>

            {/* Session Type Telemetry */}
            <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400 bg-muted/40 px-2.5 py-1.5 rounded-lg border border-border/60">
              <span className="flex items-center gap-1.5 font-medium">
                {isRememberedSession ? (
                  <>
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>Remembered Session</span>
                  </>
                ) : (
                  <>
                    <Clock className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                    <span>Temporary Session</span>
                  </>
                )}
              </span>
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Telemetry</span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1.5 px-1 space-y-0.5">
            <button
              type="button"
              disabled
              role="menuitem"
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-400 opacity-60 cursor-not-allowed hover:bg-muted/30 transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <UserCircle className="h-4 w-4 text-slate-400" />
                <span>Profile</span>
              </span>
              <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-muted text-slate-400">
                Coming Soon
              </span>
            </button>

            <button
              type="button"
              disabled
              role="menuitem"
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-400 opacity-60 cursor-not-allowed hover:bg-muted/30 transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <Settings className="h-4 w-4 text-slate-400" />
                <span>Settings</span>
              </span>
              <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-muted text-slate-400">
                Coming Soon
              </span>
            </button>
          </div>

          {/* Logout Action */}
          <div className="pt-1.5 pb-1 px-1">
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              role="menuitem"
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${
                isLoggingOut ? "opacity-50 cursor-wait" : ""
              }`}
            >
              <LogOut className={`h-4 w-4 shrink-0 ${isLoggingOut ? "animate-spin" : ""}`} />
              <span>{isLoggingOut ? "Signing Out..." : "Sign Out of Industrial Brain OS"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

UserMenu.displayName = "UserMenu";
