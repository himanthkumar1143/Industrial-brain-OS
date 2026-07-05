import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import type { ReactNode } from "react";

export interface SidebarContextProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  toggleCollapse: () => void;
  setCollapsed: (value: boolean) => void;
  toggleMobile: () => void;
  closeMobile: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

const STORAGE_KEY = "sidebar:collapsed";

/**
 * SidebarProvider – Enterprise navigation state manager.
 * Persists desktop collapse state to localStorage while keeping mobile drawer state strictly in-memory.
 * Automatically reconciles layout on viewport resize without flicker or state pollution.
 */
export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Desktop collapse state persisted in localStorage
  const [isCollapsed, setIsCollapsedState] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored === "true";
    } catch {
      return false;
    }
  });

  // 2. Mobile drawer state NEVER persisted
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  // Synchronize desktop collapse state with localStorage
  const setCollapsed = useCallback((value: boolean) => {
    setIsCollapsedState(value);
    try {
      localStorage.setItem(STORAGE_KEY, String(value));
    } catch {
      // Ignore storage write failures (e.g. private browsing quota)
    }
  }, []);

  const toggleCollapse = useCallback(() => {
    setCollapsed(!isCollapsed);
  }, [isCollapsed, setCollapsed]);

  const toggleMobile = useCallback(() => {
    setIsMobileOpen((prev) => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  // 4. Resizing between desktop and mobile automatically reconciles layout without flicker
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    
    const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        // Switching to desktop (>= 1024px) -> close mobile drawer cleanly
        setIsMobileOpen(false);
      }
    };

    // Initial check
    handleResize(mediaQuery);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleResize);
      return () => mediaQuery.removeEventListener("change", handleResize);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleResize);
      return () => mediaQuery.removeListener(handleResize);
    }
  }, []);

  // 5. Performance optimization via useMemo
  const value = useMemo(
    () => ({
      isCollapsed,
      isMobileOpen,
      toggleCollapse,
      setCollapsed,
      toggleMobile,
      closeMobile,
    }),
    [isCollapsed, isMobileOpen, toggleCollapse, setCollapsed, toggleMobile, closeMobile]
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};

// eslint-disable-next-line react/only-export-components
export const useSidebar = (): SidebarContextProps => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
