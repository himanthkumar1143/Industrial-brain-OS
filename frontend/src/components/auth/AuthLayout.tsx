import React from "react";
import { AuthIllustration } from "./AuthIllustration";
import { Shield, Lock, Cpu, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: React.ReactNode;
  role?: "junior" | "senior" | "admin";
}

/**
 * AuthLayout – Reusable enterprise authentication layout.
 * Shared across Login, Register, Forgot Password, and Reset Password.
 * Features a split-screen design on lg screens and a centered glassmorphism card on mobile/tablet.
 * Optimized for 0 CLS and 320px to 1920px responsive scalability.
 */
export const AuthLayout: React.FC<AuthLayoutProps> = React.memo(({ children, role = "admin" }) => {
  const roleBranding = {
    junior: {
      tag: "Operations & Analytics Portal",
      desc: "Real-time telemetry telemetry monitoring, automated workflow orchestration, and diagnostic anomaly detection.",
      badgeColor: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    },
    senior: {
      tag: "Engineering & System Control",
      desc: "Advanced neural optimization, system architecture governance, and autonomous feedback loops.",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    },
    admin: {
      tag: "Enterprise Command Center",
      desc: "Global system orchestration, security policy enforcement, and multi-tenant access governance.",
      badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    },
  }[role];

  return (
    <div className="min-h-screen w-full bg-[#0a0a0f] text-slate-100 flex flex-col lg:flex-row relative overflow-x-hidden selection:bg-primary/30 selection:text-white">
      {/* Ambient background glow */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* ── Left Column: Enterprise Illustration & Branding (Hidden on small mobile, visible lg+) ── */}
      <div className="hidden lg:flex lg:w-5/12 xl:w-1/2 bg-slate-950/60 border-r border-slate-800/60 p-8 xl:p-14 flex-col justify-between relative z-10">
        <div>
          {/* Back to Home Link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors mb-10 group"
          >
            <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back to Industrial Brain OS
          </Link>

          {/* Logo & Brand */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center shadow-lg shadow-primary/25">
              <Cpu className="h-5 w-5 text-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Industrial Brain <span className="text-primary text-xs font-mono uppercase bg-primary/15 px-2 py-0.5 rounded-md">OS v4.2</span>
              </h1>
              <p className="text-xs text-slate-400 font-medium">Enterprise Autonomous Intelligence</p>
            </div>
          </div>

          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border mb-4 ${roleBranding.badgeColor}`}>
            <Shield className="h-3.5 w-3.5" />
            <span>{roleBranding.tag}</span>
          </div>
          <p className="text-sm text-slate-300 max-w-md leading-relaxed">
            {roleBranding.desc}
          </p>
        </div>

        {/* Lightweight SVG Architecture Illustration */}
        <div className="my-auto py-8 flex items-center justify-center">
          <AuthIllustration role={role} />
        </div>

        {/* Security & Compliance Footer */}
        <div className="pt-6 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-2">
            <Lock className="h-3.5 w-3.5 text-emerald-400" />
            <span>256-Bit TLS Encryption Active</span>
          </div>
          <span>SOC2 Type II • ISO 27001</span>
        </div>
      </div>

      {/* ── Right Column: Authentication Form Container ── */}
      <div className="flex-1 flex flex-col justify-center items-center p-4 sm:p-8 md:p-12 lg:p-16 relative z-10 min-h-screen lg:min-h-0">
        {/* Mobile Header Link */}
        <div className="w-full max-w-md mb-6 lg:hidden flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Home
          </Link>
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold text-slate-200">Industrial Brain OS</span>
          </div>
        </div>

        {/* Form Content */}
        <div className="w-full max-w-md">
          {children}
        </div>

        {/* Mobile Footer */}
        <div className="mt-8 lg:hidden text-center text-[11px] text-slate-500 font-mono flex items-center justify-center gap-4">
          <span className="flex items-center gap-1">
            <Lock className="h-3 w-3 text-emerald-400" /> 256-Bit TLS
          </span>
          <span>•</span>
          <span>SOC2 Type II Certified</span>
        </div>
      </div>
    </div>
  );
});

AuthLayout.displayName = "AuthLayout";
