import React, { useEffect, useRef } from "react";
import { DEMO_DATA } from "../../constants/demo";
import { ModalOverlay } from "./ModalOverlay";
import { DemoRoleHeader } from "./DemoRoleHeader";
import { WorkflowTimeline } from "./WorkflowTimeline";
import { ModuleGrid } from "./ModuleGrid";
import { DemoFooter } from "./DemoFooter";

interface ExploreDemoModalProps {
  demoKey: string | null;
  onClose: () => void;
  onOpenCallback?: (key: string) => void;
  onCloseCallback?: (key: string) => void;
}

/**
 * ExploreDemoModal – Enterprise-grade interactive walkthrough modal system.
 * Renders role architecture, workflow timelines, and accessible modules without requiring login.
 */
export const ExploreDemoModal: React.FC<ExploreDemoModalProps> = React.memo(({
  demoKey,
  onClose,
  onOpenCallback,
  onCloseCallback,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);

  const data = demoKey ? DEMO_DATA[demoKey] : null;

  // ESC key closing and focus restoration
  useEffect(() => {
    if (!data) return;

    // Save previously focused element
    triggerElementRef.current = document.activeElement as HTMLElement;

    // Trigger optional analytics callback
    onOpenCallback?.(data.key);

    // Focus the modal container
    setTimeout(() => {
      modalRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      onCloseCallback?.(data.key);
      // Restore focus
      if (triggerElementRef.current && typeof triggerElementRef.current.focus === "function") {
        triggerElementRef.current.focus();
      }
    };
  }, [data, onClose, onOpenCallback, onCloseCallback]);

  if (!data) return null;

  const titleId = "demo-modal-title";
  const descId = "demo-modal-desc";

  return (
    <ModalOverlay onClose={onClose}>
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-[#0f0f17] border border-border/80 shadow-[0_20px_70px_rgb(0,0,0,0.8)] overflow-hidden focus:outline-none animate-scale-up"
      >
        <div className="overflow-y-auto flex-1 divide-y divide-border/40">
          {/* Header */}
          <DemoRoleHeader
            badge={data.badge}
            title={data.title}
            subtitle={data.subtitle}
            description={data.description}
            responsibilities={data.responsibilities}
            theme={data.theme}
            onClose={onClose}
            titleId={titleId}
            descId={descId}
          />

          {/* Workflow Timeline */}
          <WorkflowTimeline steps={data.workflowSteps} theme={data.theme} />

          {/* Accessible Modules Grid */}
          <ModuleGrid modules={data.modules} />
        </div>

        {/* Action Footer */}
        <DemoFooter
          primaryLabel={data.primaryActionLabel}
          loginPath={data.loginPath}
          loginRoleState={data.loginRoleState}
          onClose={onClose}
        />
      </div>
    </ModalOverlay>
  );
});

ExploreDemoModal.displayName = "ExploreDemoModal";
