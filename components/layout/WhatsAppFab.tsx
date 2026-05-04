"use client";

import { cn } from "@/lib/cn";
import { siteConfig, whatsappHref } from "@/lib/site";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

/** Pixels above the footer top edge; stops the button sitting on the footer. */
const FOOTER_GAP = 12;
const FAB_MD_MIN_WIDTH = 768;

function defaultBottomPx() {
  if (typeof window === "undefined") {
    return 20;
  }
  return window.innerWidth >= FAB_MD_MIN_WIDTH ? 24 : 20;
}

/**
 * Floating WhatsApp action button: bottom-right, but rides up to stay above the site footer
 * (does not sit on top of the footer when you scroll to the end of the page).
 *
 * - Hides while the home-page hero intro animation is running.
 * - Slightly larger hit-target on mobile for one-thumb tapping.
 * - Subtle breathing pulse ring to draw attention without being noisy.
 */
export function WhatsAppFab() {
  const pathname = usePathname();
  const [introActive, setIntroActive] = useState(pathname === "/");
  const [mounted, setMounted] = useState(false);
  const [bottomPx, setBottomPx] = useState(20);

  useEffect(() => {
    // Fade in slightly after load so it does not fight the page entry.
    const t = window.setTimeout(() => setMounted(true), 400);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setIntroActive(false);
      return;
    }
    setIntroActive(document.body.dataset.heroIntro === "1");
    const onIntroChange = (event: Event) => {
      const e = event as CustomEvent<{ active?: boolean }>;
      setIntroActive(Boolean(e.detail?.active));
    };
    window.addEventListener("hero-intro-change", onIntroChange);
    return () => window.removeEventListener("hero-intro-change", onIntroChange);
  }, [pathname]);

  useLayoutEffect(() => {
    const updateBottom = () => {
      const base = defaultBottomPx();
      const footer = document.getElementById("site-footer");
      if (!footer) {
        setBottomPx(base);
        return;
      }
      const f = footer.getBoundingClientRect();
      const h = window.innerHeight;
      // `bottom` is distance from viewport bottom to the FAB’s bottom: keep FAB above the footer
      // when the footer is in view (fab bottom y = h - bottom, want that ≤ f.top - gap).
      const minBottom = h - f.top + FOOTER_GAP;
      setBottomPx(Math.max(base, minBottom));
    };

    updateBottom();
    window.addEventListener("scroll", updateBottom, { passive: true });
    window.addEventListener("resize", updateBottom);
    const footer = document.getElementById("site-footer");
    const ro = footer
      ? new ResizeObserver(() => {
          requestAnimationFrame(updateBottom);
        })
      : null;
    if (footer && ro) {
      ro.observe(footer);
    }
    return () => {
      window.removeEventListener("scroll", updateBottom);
      window.removeEventListener("resize", updateBottom);
      ro?.disconnect();
    };
  }, []);

  const hidden = introActive || !mounted;

  return (
    <a
      href={whatsappHref("Hi Flags Nepal, I have a question about your products.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with Flags Nepal on WhatsApp (${siteConfig.phone})`}
      className={cn(
        "group fixed right-5 z-[60] inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-[0_8px_24px_rgba(4,120,87,0.28)] ring-1 ring-white/10 transition-[bottom,transform,opacity,box-shadow,background-color] duration-300 ease-out hover:scale-[1.04] hover:bg-emerald-700 hover:shadow-[0_12px_32px_rgba(4,120,87,0.38)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal md:right-6 md:h-16 md:w-16",
        hidden && "pointer-events-none translate-y-3 opacity-0",
      )}
      style={{ bottom: bottomPx }}
    >
      {/* Gentle breathing halo — slower, softer than animate-ping */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full bg-emerald-500/40 motion-safe:animate-[whatsapp-breathe_2.8s_ease-out_infinite]"
      />
      {/* WhatsApp glyph (inline SVG for a crisp, scalable logo) */}
      <svg
        viewBox="0 0 32 32"
        fill="currentColor"
        aria-hidden
        className="relative h-7 w-7 md:h-8 md:w-8"
      >
        <path d="M16.004 3.2c-7.07 0-12.8 5.73-12.8 12.8 0 2.257.593 4.462 1.72 6.404L3.2 28.8l6.553-1.716a12.77 12.77 0 006.25 1.596h.006c7.069 0 12.8-5.73 12.8-12.8 0-3.42-1.331-6.635-3.749-9.053A12.719 12.719 0 0016.004 3.2zm0 23.36h-.005a10.605 10.605 0 01-5.405-1.48l-.387-.23-4.048 1.06 1.08-3.946-.252-.404a10.57 10.57 0 01-1.619-5.65c0-5.87 4.777-10.646 10.646-10.646 2.843 0 5.516 1.108 7.525 3.119a10.57 10.57 0 013.12 7.531c0 5.87-4.777 10.647-10.655 10.647zm5.84-7.972c-.32-.16-1.892-.934-2.185-1.04-.293-.107-.506-.16-.72.16-.212.32-.826 1.04-1.013 1.253-.187.213-.373.24-.693.08-.32-.16-1.35-.497-2.572-1.585-.951-.847-1.593-1.894-1.78-2.214-.187-.32-.02-.493.14-.653.144-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.987-2.373-.26-.624-.524-.54-.72-.55l-.613-.011c-.213 0-.56.08-.853.4-.293.32-1.12 1.093-1.12 2.666 0 1.573 1.146 3.093 1.306 3.306.16.213 2.253 3.44 5.46 4.826.763.33 1.358.527 1.822.674.766.244 1.464.21 2.015.127.615-.092 1.892-.773 2.158-1.519.267-.747.267-1.388.187-1.52-.08-.134-.293-.213-.613-.373z" />
      </svg>
    </a>
  );
}
