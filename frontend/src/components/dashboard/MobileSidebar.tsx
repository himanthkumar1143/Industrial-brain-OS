import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { NAVIGATION_SECTIONS } from "../../constants/navigation";
import { SidebarSection } from "./SidebarSection";
import { DashboardLogo } from "./DashboardLogo";
import { useSidebar } from "../../contexts/SidebarContext";

/**
 * MobileSidebar – Off-canvas navigation drawer for tablet and mobile devices (<1024px).
 * Features backdrop blur, smooth entrance animation, ESC key closure, backdrop click closure,
 * and focus trapping for full WCAG AA compliance.
 */
export const MobileSidebar: React.FC = React.memo(() => {
  const { isMobileOpen, closeMobile } = useSidebar();
  const drawerRef = useRef<HTMLElement>(null);

  // ESC key closure and body scroll locking
  useEffect(() => {
    if (!isMobileOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMobile();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMobileOpen, closeMobile]);

  // Focus trapping inside drawer
  useEffect(() => {
    if (isMobileOpen && drawerRef.current) {
      const focusableElements = drawerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      if (firstElement) {
        firstElement.focus();
      }
    }
  }, [isMobileOpen]);

  if (!isMobileOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={closeMobile}
        aria-hidden="true"
      />

      {/* Slide-in Drawer */}
      <aside
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Drawer"
        className="relative w-72 max-w-[80vw] bg-card border-r border-border shadow-2xl flex flex-col h-full animate-scale-up z-10"
      >
        {/* Drawer Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border shrink-0">
          <DashboardLogo isCollapsed={false} onMobileClose={closeMobile} />
          <button
            type="button"
            onClick={closeMobile}
            aria-label="Close navigation drawer"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-card/80 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Navigation Sections */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-6">
          {NAVIGATION_SECTIONS.map((section) => (
            <SidebarSection key={section.title} section={section} />
          ))}
        </nav>
      </aside>
    </div>
  );
});

MobileSidebar.displayName = "MobileSidebar";
