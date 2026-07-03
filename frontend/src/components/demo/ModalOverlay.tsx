import React from "react";

interface ModalOverlayProps {
  onClose: () => void;
  children: React.ReactNode;
}

/**
 * ModalOverlay – Backdrop overlay wrapper with smooth fade transition.
 * Handles clicking outside the modal dialog to close and prevents scroll chaining.
 */
export const ModalOverlay: React.FC<ModalOverlayProps> = React.memo(({ onClose, children }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-sm overflow-y-auto overscroll-none animate-fade-in"
    onClick={(e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    }}
  >
    {children}
  </div>
));

ModalOverlay.displayName = "ModalOverlay";
