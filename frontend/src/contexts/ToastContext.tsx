import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastMessage {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

interface ToastContextProps {
  toast: {
    success: (message: string, title?: string, duration?: number) => void;
    error: (message: string, title?: string, duration?: number) => void;
    info: (message: string, title?: string, duration?: number) => void;
    warning: (message: string, title?: string, duration?: number) => void;
    dismiss: (id: string) => void;
  };
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (type: ToastType, message: string, title?: string, duration = 4000) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastMessage = { id, type, title, message, duration };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          dismiss(id);
        }, duration);
      }
    },
    [dismiss]
  );

  const toastMethods = useMemo(
    () => ({
      success: (msg: string, title?: string, duration?: number) => addToast("success", msg, title, duration),
      error: (msg: string, title?: string, duration?: number) => addToast("error", msg, title, duration),
      info: (msg: string, title?: string, duration?: number) => addToast("info", msg, title, duration),
      warning: (msg: string, title?: string, duration?: number) => addToast("warning", msg, title, duration),
      dismiss,
    }),
    [addToast, dismiss]
  );

  return (
    <ToastContext.Provider value={{ toast: toastMethods }}>
      {children}
      {/* Toast Container */}
      <div
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0"
        role="region"
        aria-label="Notifications"
      >
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: () => void }> = React.memo(
  ({ toast, onDismiss }) => {
    const iconMap = {
      success: <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />,
      error: <AlertCircle className="h-5 w-5 text-rose-400 shrink-0" />,
      info: <Info className="h-5 w-5 text-sky-400 shrink-0" />,
      warning: <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0" />,
    };

    const borderMap = {
      success: "border-emerald-500/30 bg-emerald-950/40",
      error: "border-rose-500/30 bg-rose-950/40",
      info: "border-sky-500/30 bg-sky-950/40",
      warning: "border-amber-500/30 bg-amber-950/40",
    };

    return (
      <div
        className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md shadow-lg shadow-black/40 transition-all duration-300 animate-scale-up ${borderMap[toast.type]}`}
        role="alert"
        aria-live="assertive"
      >
        {iconMap[toast.type]}
        <div className="flex-1 text-sm">
          {toast.title && <p className="font-semibold text-slate-100 mb-0.5">{toast.title}</p>}
          <p className="text-slate-300 leading-relaxed">{toast.message}</p>
        </div>
        <button
          onClick={onDismiss}
          className="text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-white/5 transition-colors"
          aria-label="Close notification"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }
);

ToastItem.displayName = "ToastItem";

// eslint-disable-next-line react/only-export-components
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context.toast;
};
