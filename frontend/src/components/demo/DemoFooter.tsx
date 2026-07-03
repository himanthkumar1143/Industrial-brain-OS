import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "../../constants/icons";

interface DemoFooterProps {
  primaryLabel: string;
  loginPath?: string;
  loginRoleState?: string;
  onClose: () => void;
}

/**
 * DemoFooter – Modal action footer offering direct transition to role authentication
 * or scrolling to role selection.
 */
export const DemoFooter: React.FC<DemoFooterProps> = React.memo(({
  primaryLabel,
  loginPath,
  loginRoleState,
  onClose,
}) => {
  const handleChooseRoleClick = () => {
    onClose();
    setTimeout(() => {
      const rolesElement = document.getElementById("roles");
      if (rolesElement) {
        rolesElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 p-6 sm:p-8 bg-[#0c0c14] border-t border-border/60">
      <button
        type="button"
        onClick={onClose}
        className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold text-sm bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        Close
      </button>

      {loginPath ? (
        <Link
          to={loginPath}
          state={{ role: loginRoleState }}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <span>{primaryLabel}</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      ) : (
        <button
          type="button"
          onClick={handleChooseRoleClick}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <span>{primaryLabel}</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
});

DemoFooter.displayName = "DemoFooter";
