import React from "react";
import { Menu } from "lucide-react";
import { Breadcrumbs } from "./Breadcrumbs";
import { SearchPlaceholder } from "./SearchPlaceholder";
import { NotificationBell } from "./NotificationBell";
import { UserMenu } from "./UserMenu";
import { useSidebar } from "../../contexts/SidebarContext";

/**
 * Navbar – Sticky enterprise top navigation bar (h-16).
 * Contains mobile drawer toggle, intelligent breadcrumbs, search placeholder, notification bell,
 * and user menu with zero layout shifts.
 */
export const Navbar: React.FC = React.memo(() => {
  const { toggleMobile } = useSidebar();

  return (
    <header className="h-16 border-b border-border/80 bg-card/80 backdrop-blur-md sticky top-0 z-20 px-4 md:px-6 flex items-center justify-between gap-4 shrink-0 shadow-md shadow-black/20">
      {/* Left Section: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-4 min-w-0">
        <button
          type="button"
          onClick={toggleMobile}
          aria-label="Open mobile navigation"
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-card/80 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shrink-0"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Breadcrumbs />
      </div>

      {/* Right Section: Search, Notifications & User Menu */}
      <div className="flex items-center gap-3 md:gap-4 shrink-0">
        <SearchPlaceholder />
        <div className="h-4 w-px bg-border hidden md:block" />
        <NotificationBell />
        <UserMenu />
      </div>
    </header>
  );
});

Navbar.displayName = "Navbar";
