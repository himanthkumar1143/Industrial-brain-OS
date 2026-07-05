import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop – Global scroll restoration component.
 * Executes window.scrollTo({ top: 0, behavior: "instant" }) on every pathname change
 * ensuring that pages (e.g. login portals) never open halfway scrolled down.
 */
export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
};
