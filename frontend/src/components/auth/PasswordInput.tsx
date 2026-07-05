import React, { useState, forwardRef, useCallback } from "react";
import { Eye, EyeOff, Lock, AlertTriangle } from "lucide-react";

export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

/**
 * PasswordInput – Reusable, accessible password field.
 * Supports eye show/hide toggle, keyboard accessibility, screen reader ARIA attributes,
 * autocomplete compatibility, and real-time Caps Lock detection.
 */
export const PasswordInput = React.memo(
  forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ error, label = "Password", className = "", id = "password", ...props }, ref) => {
      const [showPassword, setShowPassword] = useState(false);
      const [capsLockActive, setCapsLockActive] = useState(false);

      const toggleVisibility = useCallback(() => {
        setShowPassword((prev) => !prev);
      }, []);

      const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.getModifierState && e.getModifierState("CapsLock")) {
          setCapsLockActive(true);
        } else {
          setCapsLockActive(false);
        }
        if (props.onKeyDown) {
          props.onKeyDown(e);
        }
      }, [props]);

      const handleKeyUp = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.getModifierState && e.getModifierState("CapsLock")) {
          setCapsLockActive(true);
        } else {
          setCapsLockActive(false);
        }
        if (props.onKeyUp) {
          props.onKeyUp(e);
        }
      }, [props]);

      return (
        <div className="w-full space-y-1.5">
          {label && (
            <label
              htmlFor={id}
              className="block text-xs font-semibold uppercase tracking-wider text-slate-300"
            >
              {label}
            </label>
          )}

          <div className="relative rounded-xl shadow-sm">
            {/* Left Icon */}
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Lock className="h-4 w-4" />
            </div>

            {/* Input Field */}
            <input
              {...props}
              id={id}
              ref={ref}
              type={showPassword ? "text" : "password"}
              autoComplete={props.autoComplete || "current-password"}
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp}
              aria-invalid={!!error}
              aria-describedby={error ? `${id}-error` : capsLockActive ? `${id}-capslock` : undefined}
              className={`w-full bg-slate-900/80 border ${
                error
                  ? "border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/20"
                  : "border-slate-800 focus:border-primary focus:ring-primary/20"
              } rounded-xl pl-10 pr-11 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            />

            {/* Right Eye Toggle Button */}
            <button
              type="button"
              onClick={toggleVisibility}
              disabled={props.disabled}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 focus:outline-none focus:text-primary transition-colors disabled:opacity-50"
              aria-label={showPassword ? "Hide password" : "Show password"}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {/* Caps Lock Warning */}
          {capsLockActive && (
            <div
              id={`${id}-capslock`}
              className="flex items-center gap-1.5 text-xs font-medium text-amber-400 animate-fade-in pt-0.5"
              role="alert"
            >
              <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
              <span>Caps Lock is ON</span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <p
              id={`${id}-error`}
              className="text-xs font-medium text-rose-400 animate-fade-in pt-0.5"
              role="alert"
            >
              {error}
            </p>
          )}
        </div>
      );
    }
  )
);

PasswordInput.displayName = "PasswordInput";
