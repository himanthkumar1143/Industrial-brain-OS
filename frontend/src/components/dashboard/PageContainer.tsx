import React, { useEffect, useState } from "react";
import type { ReactNode } from "react";

// Track initial page load at module level so first load never animates
let isFirstPageLoad = true;

export interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * PageContainer – Reusable wrapper for all enterprise dashboard pages.
 * Ensures consistent padding, max-width, zero CLS, and subtle 150-200ms page transitions
 * (suppressed on initial application load to prevent first-render flicker).
 */
export const PageContainer: React.FC<PageContainerProps> = React.memo(({ children, className = "" }) => {
  const [shouldAnimate, setShouldAnimate] = useState(!isFirstPageLoad);

  useEffect(() => {
    if (isFirstPageLoad) {
      isFirstPageLoad = false;
    } else {
      setShouldAnimate(true);
    }
  }, []);

  return (
    <div
      className={`max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-6 transition-all duration-200 ease-out ${
        shouldAnimate ? "animate-fade-in" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
});

PageContainer.displayName = "PageContainer";
