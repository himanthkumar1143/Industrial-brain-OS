import React, { useState, useCallback } from "react";
import { AuthHeader } from "./AuthHeader";
import { LoginForm } from "./LoginForm";
import { DemoCredentialsCard } from "./DemoCredentialsCard";

interface LoginCardProps {
  role: "junior" | "senior" | "admin";
}

/**
 * LoginCard – Assembles AuthHeader, LoginForm, and DemoCredentialsCard into a cohesive,
 * responsive glassmorphism card container.
 * Manages evaluator one-click autofill and instant Quick Login communication between components.
 */
export const LoginCard: React.FC<LoginCardProps> = React.memo(({ role }) => {
  const [fillFn, setFillFn] = useState<((email: string, pass: string) => void) | null>(null);
  const [quickLoginFn, setQuickLoginFn] = useState<
    ((email: string, pass: string, targetRole: "junior" | "senior" | "admin") => Promise<void>) | null
  >(null);

  const handleRegisterAutofill = useCallback((fn: (email: string, pass: string) => void) => {
    setFillFn(() => fn);
  }, []);

  const handleRegisterQuickLogin = useCallback(
    (fn: (email: string, pass: string, targetRole: "junior" | "senior" | "admin") => Promise<void>) => {
      setQuickLoginFn(() => fn);
    },
    []
  );

  const handleFillCredentials = useCallback(
    (email: string, pass: string) => {
      if (fillFn) {
        fillFn(email, pass);
      }
    },
    [fillFn]
  );

  const handleQuickLogin = useCallback(
    async (email: string, pass: string, targetRole: "junior" | "senior" | "admin") => {
      if (quickLoginFn) {
        await quickLoginFn(email, pass, targetRole);
      }
    },
    [quickLoginFn]
  );

  return (
    <div className="w-full bg-slate-950/70 border border-slate-800/80 rounded-3xl p-6 sm:p-8 md:p-10 backdrop-blur-xl shadow-2xl shadow-black/80 relative overflow-hidden transition-all duration-300">
      {/* Top ambient highlight line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Role Branding & Header */}
      <AuthHeader role={role} />

      {/* React Hook Form + Zod Login Form */}
      <LoginForm
        role={role}
        onRegisterAutofill={handleRegisterAutofill}
        onRegisterQuickLogin={handleRegisterQuickLogin}
      />

      {/* Enterprise Evaluator & Hackathon Demo Helper */}
      <DemoCredentialsCard
        role={role}
        onFillCredentials={handleFillCredentials}
        onQuickLogin={handleQuickLogin}
      />
    </div>
  );
});

LoginCard.displayName = "LoginCard";
