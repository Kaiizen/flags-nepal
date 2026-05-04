"use client";

import { useEffect } from "react";

/**
 * Blocks the right-click context menu when it is opened on an `<img>`
 * element anywhere in the document. Left-click, keyboard navigation, and
 * every other interaction are untouched.
 *
 * This is a casual copy deterrent — determined users can still hit
 * devtools / screenshot / drag-save (the CSS in `globals.css` handles the
 * drag case). For real asset protection, keep print-resolution originals
 * off the public web root and ship only downsized, watermarked derivatives.
 */
export function MediaGuard() {
  useEffect(() => {
    function onContextMenu(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      if (target instanceof HTMLImageElement) {
        event.preventDefault();
        return;
      }

      /**
       * Some framer-motion wrappers or Next/Image containers put the
       * image behind a sibling gradient/overlay. Crawl up a couple of
       * levels and protect anything explicitly marked `data-protected`.
       */
      const protectedAncestor = target.closest<HTMLElement>("[data-protected='true']");
      if (protectedAncestor) {
        event.preventDefault();
      }
    }

    document.addEventListener("contextmenu", onContextMenu);
    return () => document.removeEventListener("contextmenu", onContextMenu);
  }, []);

  return null;
}
