import React, { useState, useRef, useEffect, useCallback } from "react";
import { Bell, BellOff } from "lucide-react";
import type { Notification } from "../../types/notification";

/**
 * NotificationBell – Enterprise notification indicator and popover.
 * Consumes internal typed notification model, displays "No notifications" empty state,
 * and lazy-renders dropdown DOM with full ESC/click-outside accessibility.
 */
export const NotificationBell: React.FC = React.memo(() => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [notifications] = useState<Notification[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

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

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={toggleDropdown}
        aria-label="View notifications"
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="relative p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-card/80 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
        )}
      </button>

      {/* Lazy rendered dropdown DOM */}
      {isOpen && (
        <div
          role="menu"
          aria-label="Notifications"
          className="absolute right-0 mt-2 w-80 rounded-2xl bg-card border border-border shadow-2xl py-3 px-4 z-50 animate-scale-up origin-top-right space-y-3"
        >
          <div className="flex items-center justify-between border-b border-border/80 pb-2.5">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Notifications</h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary/10 text-primary border border-primary/20">
              {unreadCount} new
            </span>
          </div>

          <div className="py-6 flex flex-col items-center justify-center text-center space-y-2">
            <div className="p-3 rounded-full bg-muted/40 text-slate-500">
              <BellOff className="h-6 w-6" />
            </div>
            <p className="text-xs font-semibold text-slate-300">No notifications</p>
            <p className="text-[11px] text-slate-500 max-w-[200px]">
              You are caught up! Platform alerts will appear here as modules are deployed.
            </p>
          </div>
        </div>
      )}
    </div>
  );
});

NotificationBell.displayName = "NotificationBell";
