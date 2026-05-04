"use client";

import { cn } from "@/lib/cn";
import { siteConfig, whatsappHref } from "@/lib/site";
import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Thin always-on contact strip that sits above the Navbar site-wide.
 *
 * - Hides while the home-page hero intro animation is running (same signal the
 *   Navbar listens to) so it does not compete with the brand reveal.
 * - Mirrors the Navbar scroll-hide behaviour so it gets out of the way once the
 *   user is reading.
 */
export function ContactRibbon() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [introActive, setIntroActive] = useState(pathname === "/");
  const lastYRef = useRef(0);

  useEffect(() => {
    function onScroll() {
      const currentY = window.scrollY;
      const lastY = lastYRef.current;
      const delta = currentY - lastY;

      if (currentY <= 32) {
        setHidden(false);
      } else if (Math.abs(delta) > 4) {
        setHidden(delta > 0);
      }

      lastYRef.current = currentY;
    }
    lastYRef.current = window.scrollY;
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

  const muted = introActive || hidden;

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-0 z-[45] border-b border-cream/[0.06] bg-charcoal/95 backdrop-blur-md transition-all duration-300",
        muted && "pointer-events-none -translate-y-full opacity-0",
      )}
      aria-hidden={muted}
    >
      <div className="mx-auto flex max-w-content items-center justify-between gap-3 px-5 py-1.5 text-[11px] font-medium tracking-[0.02em] text-cream/55 md:px-8 md:text-[12px]">
        <div className="flex items-center gap-3 md:gap-5">
          <a
            href={`tel:${siteConfig.landlineTel}`}
            className="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-gold/80"
          >
            <Phone className="h-3 w-3 shrink-0" aria-hidden />
            <span>
              <span className="hidden sm:inline">Call </span>
              {siteConfig.landline}
            </span>
          </a>
          <span className="hidden h-3 w-px bg-cream/10 sm:inline-block" aria-hidden />
          <a
            href={whatsappHref("Hi Flags Nepal, I'd like to place an order.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-gold/80"
          >
            <MessageCircle className="h-3 w-3 shrink-0" aria-hidden />
            <span>
              <span className="hidden sm:inline">WhatsApp </span>
              {siteConfig.phone.replace(/^\+977\s?/, "")}
            </span>
          </a>
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <a
            href={siteConfig.googleMapsPlaceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-gold/80"
          >
            <MapPin className="h-3 w-3 shrink-0" aria-hidden />
            <span>Bagbazar, Kathmandu</span>
          </a>
          <span className="inline-block h-3 w-px bg-cream/10" aria-hidden />
          <span className="inline-flex items-center gap-1.5 text-cream/40">
            <Clock className="h-3 w-3 shrink-0" aria-hidden />
            <span>{siteConfig.businessHours.label}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
