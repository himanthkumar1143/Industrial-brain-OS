import React, { useState, useCallback, useMemo } from "react";
import { Sparkles, Copy, Check, Zap, ArrowRight, KeyRound } from "lucide-react";
import { useToast } from "../../contexts/ToastContext";

interface DemoCredentialsCardProps {
  role: "junior" | "senior" | "admin";
  onFillCredentials: (email: string, pass: string) => void;
  onQuickLogin: (email: string, pass: string, targetRole: "junior" | "senior" | "admin") => Promise<void>;
  isLoading?: boolean;
}

/**
 * DemoCredentialsCard – Enterprise evaluation enhancer.
 * Provides hackathon judges and evaluators with one-click credential autofill,
 * clipboard copy buttons with visual feedback, and Quick Login for all roles.
 */
export const DemoCredentialsCard: React.FC<DemoCredentialsCardProps> = React.memo(
  ({ role, onFillCredentials, onQuickLogin, isLoading = false }) => {
    const toast = useToast();
    const [copiedField, setCopiedField] = useState<string | null>(null);
    const [activeQuickRole, setActiveQuickRole] = useState<string | null>(null);

    const demoAccounts = useMemo(
      () => ({
        junior: {
          title: "Junior Engineer",
          email: "junior@industrialbrainos.demo",
          pass: "Demo@123",
          badge: "Ops L1",
          color: "text-sky-400 bg-sky-500/10 border-sky-500/20 hover:bg-sky-500/20",
        },
        senior: {
          title: "Senior Engineer",
          email: "senior@industrialbrainos.demo",
          pass: "Demo@123",
          badge: "Eng L2",
          color: "text-amber-400 bg-amber-500/10 border-amber-500/20 hover:bg-amber-500/20",
        },
        admin: {
          title: "Administrator",
          email: "admin@industrialbrainos.demo",
          pass: "Demo@123",
          badge: "Admin L3",
          color: "text-purple-400 bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20",
        },
      }),
      []
    );

    const currentAccount = demoAccounts[role];

    const handleCopy = useCallback(
      async (text: string, fieldName: string) => {
        try {
          await navigator.clipboard.writeText(text);
          setCopiedField(fieldName);
          toast.info(`Copied ${fieldName} to clipboard`, "Demo Credentials");
          setTimeout(() => {
            setCopiedField(null);
          }, 2000);
        } catch {
          toast.error("Failed to copy to clipboard");
        }
      },
      [toast]
    );

    const handleFill = useCallback(() => {
      onFillCredentials(currentAccount.email, currentAccount.pass);
      toast.success("Credentials filled automatically", "Demo Mode");
    }, [currentAccount, onFillCredentials, toast]);

    const handleQuickLoginClick = useCallback(
      async (targetRole: "junior" | "senior" | "admin") => {
        const acc = demoAccounts[targetRole];
        setActiveQuickRole(targetRole);
        toast.info(`Authenticating as ${acc.title}...`, "Quick Demo Login");
        try {
          await onQuickLogin(acc.email, acc.pass, targetRole);
        } finally {
          setActiveQuickRole(null);
        }
      },
      [demoAccounts, onQuickLogin, toast]
    );

    return (
      <div className="mt-8 rounded-2xl border border-primary/25 bg-gradient-to-b from-primary/10 via-slate-900/60 to-slate-950/80 p-5 backdrop-blur-md shadow-xl transition-all duration-300">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/20 text-primary">
              <Sparkles className="h-4 w-4 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Evaluator & Hackathon Mode
              </h3>
              <p className="text-[11px] text-slate-400">
                Instant testing credentials for system judges
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-slate-300">
            Active Role: {currentAccount.badge}
          </span>
        </div>

        {/* Current Role Credentials Display */}
        <div className="space-y-2 mb-4 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
          {/* Email Row */}
          <div className="flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="text-slate-500 font-mono shrink-0">Email:</span>
              <span className="font-mono text-slate-200 truncate select-all">{currentAccount.email}</span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(currentAccount.email, "Email")}
              disabled={isLoading}
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors shrink-0 disabled:opacity-50"
              title="Copy Email"
              aria-label="Copy Email"
            >
              {copiedField === "Email" ? (
                <Check className="h-3.5 w-3.5 text-emerald-400 animate-scale-up" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          </div>

          {/* Password Row */}
          <div className="flex items-center justify-between gap-2 text-xs pt-1 border-t border-slate-800/60">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="text-slate-500 font-mono shrink-0">Pass:</span>
              <span className="font-mono text-slate-200 select-all">{currentAccount.pass}</span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(currentAccount.pass, "Password")}
              disabled={isLoading}
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors shrink-0 disabled:opacity-50"
              title="Copy Password"
              aria-label="Copy Password"
            >
              {copiedField === "Password" ? (
                <Check className="h-3.5 w-3.5 text-emerald-400 animate-scale-up" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Fill Credentials Button */}
        <button
          type="button"
          onClick={handleFill}
          disabled={isLoading || !!activeQuickRole}
          className="w-full mb-4 py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-xs font-semibold text-slate-200 hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm"
        >
          <KeyRound className="h-3.5 w-3.5 text-primary" />
          <span>Fill Credentials for {currentAccount.title}</span>
        </button>

        {/* One-Click Quick Login Section */}
        <div className="pt-3 border-t border-slate-800/80">
          <p className="text-[11px] font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
            <Zap className="h-3 w-3 text-amber-400" />
            One-Click Demo Login (Auto-Authenticate):
          </p>
          <div className="grid grid-cols-3 gap-2">
            {(["junior", "senior", "admin"] as const).map((r) => {
              const acc = demoAccounts[r];
              const isThisLoading = activeQuickRole === r;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleQuickLoginClick(r)}
                  disabled={isLoading || !!activeQuickRole}
                  className={`py-2 px-2 rounded-xl border text-xs font-semibold transition-all flex flex-col items-center justify-center gap-1 disabled:opacity-50 relative overflow-hidden group ${acc.color}`}
                  title={`Instant login as ${acc.title}`}
                >
                  {isThisLoading ? (
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin my-0.5" />
                  ) : (
                    <>
                      <span>{acc.badge}</span>
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all absolute right-1.5 bottom-1.5" />
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);

DemoCredentialsCard.displayName = "DemoCredentialsCard";
