"use client";

import { useEffect } from "react";

export function useKeyboardNavigation(
  swipe: (dir: "left" | "right") => void,
  cancelEdit: () => void,
  options: {
    busy: boolean;
    loading: boolean;
    isEditingDesc: boolean;
  },
) {
  const { busy, loading, isEditingDesc } = options;

  // Swipe keyboard shortcuts (disabled while editing)
  useEffect(() => {
    if (isEditingDesc) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (busy || loading) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        swipe("left");
      }
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        swipe("right");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [swipe, busy, loading, isEditingDesc]);

  // Escape to cancel editing
  useEffect(() => {
    if (!isEditingDesc) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        cancelEdit();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isEditingDesc, cancelEdit]);
}