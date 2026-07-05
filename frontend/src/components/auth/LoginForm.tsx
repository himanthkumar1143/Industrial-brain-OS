import React, { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/ToastContext";
import { PasswordInput } from "./PasswordInput";
import { Loader2, LogIn, Mail, CheckSquare, Square } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

// Strict Zod validation schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required.")
    .trim()
    .email("Please enter a valid enterprise email address."),
  password: z
    .string()
    .min(1, "Password is required.")
    .min(8, "Password must be at least 8 characters.")
    .max(64, "Password cannot exceed 64 characters.")
    .refine((val) => val === val.trim(), {
      message: "Password cannot contain leading or trailing whitespace.",
    }),
  rememberMe: z.boolean(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export interface LoginFormProps {
  role: "junior" | "senior" | "admin";
  onRegisterAutofill?: (fillFn: (email: string, pass: string) => void) => void;
  onRegisterQuickLogin?: (
    quickLoginFn: (email: string, pass: string, targetRole: "junior" | "senior" | "admin") => Promise<void>
  ) => void;
}

/**
 * LoginForm – React Hook Form + Zod enterprise authentication form.
 * Handles strict validation, browser autofill compatibility, dual storage Remember Me,
 * comprehensive network error differentiation, and one-click evaluator integration.
 */
export const LoginForm: React.FC<LoginFormProps> = ({
  role,
  onRegisterAutofill,
  onRegisterQuickLogin,
}) => {
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const rememberMeValue = watch("rememberMe");

  // Expose autofill helper to parent/DemoCard
  const handleFillCredentials = useCallback(
    (email: string, pass: string) => {
      setValue("email", email, { shouldValidate: true });
      setValue("password", pass, { shouldValidate: true });
    },
    [setValue]
  );

  useEffect(() => {
    if (onRegisterAutofill) {
      onRegisterAutofill(handleFillCredentials);
    }
  }, [onRegisterAutofill, handleFillCredentials]);

  // Execute login with error handling and redirection
  const executeLogin = useCallback(
    async (email: string, pass: string, remember: boolean, targetRole?: string) => {
      if (!navigator.onLine) {
        toast.error("No internet connection available. Please check your network.", "Offline Error");
        return;
      }

      setIsSubmitting(true);
      try {
        await login(email, pass, remember);
        toast.success(`Successfully authenticated as ${targetRole || role} engineer`, "Welcome Back");

        // Preserve intended destination after login
        const destination = (location.state as any)?.from?.pathname || "/dashboard";
        navigate(destination, { replace: true });
      } catch (error: any) {
        // Differentiate network & HTTP errors
        const status = error?.response?.status;
        const code = error?.code;
        const msg = error?.message?.toLowerCase() || "";

        if (!navigator.onLine || code === "ERR_NETWORK" || msg.includes("network error") || msg.includes("offline")) {
          toast.error("Internet connection unavailable. Please check your network and try again.", "Offline");
        } else if (code === "ECONNABORTED" || code === "ETIMEDOUT" || code === "ERR_CANCELED" || msg.includes("timeout") || msg.includes("request timeout")) {
          toast.error("Request timed out. Please try again.", "Network Timeout");
        } else if (status === 401) {
          toast.error("Invalid email or password. Please check your credentials.", "Authentication Failed");
        } else if (status === 429) {
          toast.error(
            "Too many login attempts from this IP. Please try again after 1 minute.",
            "Rate Limit Exceeded"
          );
        } else if (status >= 500) {
          toast.error("Internal server error. Please try again later.", "Server Error");
        } else {
          toast.error(
            error?.response?.data?.message || "Something went wrong. Please try again.",
            "Login Error"
          );
        }
        throw error;
      } finally {
        setIsSubmitting(false);
      }
    },
    [login, toast, location, navigate, role]
  );

  // Expose Quick Login helper to parent/DemoCard
  const handleQuickLogin = useCallback(
    async (email: string, pass: string, targetRole: "junior" | "senior" | "admin") => {
      setValue("email", email);
      setValue("password", pass);
      try {
        await executeLogin(email, pass, rememberMeValue, targetRole);
      } catch {
        // Error already handled and toasted in executeLogin
      }
    },
    [executeLogin, rememberMeValue, setValue]
  );

  useEffect(() => {
    if (onRegisterQuickLogin) {
      onRegisterQuickLogin(handleQuickLogin);
    }
  }, [onRegisterQuickLogin, handleQuickLogin]);

  const onSubmit = useCallback(
    async (data: LoginFormData) => {
      try {
        await executeLogin(data.email, data.password, data.rememberMe);
      } catch {
        // Handled in executeLogin
      }
    },
    [executeLogin]
  );

  const handleForgotPasswordClick = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      toast.info("Forgot Password will be available in Sprint 3.");
    },
    [toast]
  );

  const handleForgotPasswordKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLAnchorElement>) => {
      if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        e.currentTarget.click();
      }
    },
    []
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Email Field */}
      <div className="space-y-1.5">
        <label
          htmlFor="email"
          className="block text-xs font-semibold uppercase tracking-wider text-slate-300"
        >
          Enterprise Email
        </label>
        <div className="relative rounded-xl shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Mail className="h-4 w-4" />
          </div>
          <input
            {...register("email")}
            id="email"
            type="email"
            autoComplete="email"
            disabled={isSubmitting}
            placeholder={`${role}@industrialbrainos.demo`}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`w-full bg-slate-900/80 border ${
              errors.email
                ? "border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/20"
                : "border-slate-800 focus:border-primary focus:ring-primary/20"
            } rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 disabled:opacity-50`}
          />
        </div>
        {errors.email && (
          <p id="email-error" className="text-xs font-medium text-rose-400 animate-fade-in pt-0.5" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password Field */}
      <PasswordInput
        {...register("password")}
        id="password"
        label="Password"
        autoComplete="current-password"
        disabled={isSubmitting}
        placeholder="••••••••••••"
        error={errors.password?.message}
      />

      {/* Remember Me & Forgot Password Row */}
      <div className="flex items-center justify-between pt-1">
        <label className="inline-flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none group">
          <input
            type="checkbox"
            {...register("rememberMe")}
            disabled={isSubmitting}
            className="sr-only"
          />
          <span className="text-primary group-hover:scale-110 transition-transform">
            {rememberMeValue ? (
              <CheckSquare className="h-4 w-4 text-primary fill-primary/20" />
            ) : (
              <Square className="h-4 w-4 text-slate-500 group-hover:text-slate-400" />
            )}
          </span>
          <span className="group-hover:text-white transition-colors">Remember my session</span>
        </label>

        {/* Forgot Password Placeholder Link */}
        <a
          href="#"
          role="button"
          aria-label="Forgot Password (Coming Soon)"
          onClick={handleForgotPasswordClick}
          onKeyDown={handleForgotPasswordKeyDown}
          className="text-xs font-medium text-slate-500 hover:text-slate-300 transition-colors cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-[#0a0a0f] rounded"
        >
          Forgot password? <span className="text-[10px] text-slate-600">(IT Admin)</span>
        </a>
      </div>

      {/* Submit Login Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-[#0a0a0f] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-none"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Signing In...</span>
          </>
        ) : (
          <>
            <LogIn className="h-4 w-4" />
            <span>Authenticate to Industrial Brain OS</span>
          </>
        )}
      </button>
    </form>
  );
};
