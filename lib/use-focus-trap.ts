"use client";

import { type RefObject, useEffect } from "react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function focusableElements(root: HTMLElement): HTMLElement[] {
  return [...root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)].filter((el) => {
    if (el.getAttribute("aria-hidden") === "true") return false;
    const style = typeof window !== "undefined" ? window.getComputedStyle(el) : null;
    if (style && (style.visibility === "hidden" || style.display === "none")) return false;
    return true;
  });
}

/**
 * Keeps Tab / Shift+Tab inside `containerRef` while `enabled`.
 * Calls `onEscape` on Escape; restores focus to `returnFocusRef` when disabled/unmounted.
 */
export function useFocusTrap(
  enabled: boolean,
  containerRef: RefObject<HTMLElement | null>,
  options: { returnFocusRef: RefObject<HTMLElement | null>; onEscape: () => void },
): void {
  const { returnFocusRef, onEscape } = options;

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const root = containerRef.current;
    const initial = focusableElements(root)[0];
    if (initial) {
      window.requestAnimationFrame(() => initial.focus({ preventScroll: true }));
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onEscape();
        return;
      }
      if (e.key !== "Tab") return;

      const nodes = focusableElements(root);
      if (nodes.length === 0) return;
      const f = nodes[0];
      const l = nodes[nodes.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === f) {
          e.preventDefault();
          l.focus({ preventScroll: true });
        }
      } else if (document.activeElement === l) {
        e.preventDefault();
        f.focus({ preventScroll: true });
      }
    }

    const elementToRestore = returnFocusRef.current;

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      elementToRestore?.focus({ preventScroll: true });
    };
  }, [enabled, containerRef, returnFocusRef, onEscape]);
}
