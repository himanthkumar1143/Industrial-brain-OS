import React from "react";
import { ExploreDemoModal } from "./ExploreDemoModal";

export type ModalType =
  | "exploreDemo"
  | "help"
  | "aiPreview"
  | "knowledgeGraphPreview"
  | "imageViewer"
  | "tutorial"
  | null;

export interface ModalManagerProps {
  /** The currently active modal dialog type */
  activeModal?: ModalType;
  /** Role demo key for ExploreDemoModal (e.g. 'general', 'junior', 'senior', 'admin') */
  demoKey?: string | null;
  /** Global close handler */
  onClose: () => void;
  /** Optional generic payload for future dialogs */
  payload?: Record<string, unknown>;
}

/**
 * ModalManager – Lightweight architectural controller for coordinating application dialogs.
 * Currently renders ExploreDemoModal and provides clean extensible slots for future modal systems
 * (Help, AI Preview, Knowledge Graph Preview, Image Viewer, Tutorial) without altering current behavior.
 */
export const ModalManager: React.FC<ModalManagerProps> = React.memo(({
  activeModal = null,
  demoKey = null,
  onClose,
}) => {
  // Backwards compatible or explicit Explore Demo modal trigger
  if (activeModal === "exploreDemo" || (activeModal === null && demoKey !== null)) {
    return <ExploreDemoModal demoKey={demoKey} onClose={onClose} />;
  }

  // Future dialog hook slots (Help, AI Preview, Knowledge Graph Preview, etc.)
  switch (activeModal) {
    case "help":
    case "aiPreview":
    case "knowledgeGraphPreview":
    case "imageViewer":
    case "tutorial":
      // Prepared for future sprint implementations
      return null;
    default:
      return null;
  }
});

ModalManager.displayName = "ModalManager";
