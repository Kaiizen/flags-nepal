"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { staggerDelay, transition } from "@/lib/motion";
import { useFocusTrap } from "@/lib/use-focus-trap";
import { siteConfig, whatsappHref } from "@/lib/site";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
const MotionLink = motion(Link);
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const links = [
  { href: "/works", label: "Works" },
  { href: "/services", label: "Services" },
  { href: "/shop", label: "Catalogue" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [introActive, setIntroActive] = useState(pathname === "/");
  const lastYRef = useRef(0);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const closeMenu = useCallback(() => setOpen(false), []);

  useFocusTrap(open, menuPanelRef, {
    returnFocusRef: menuBtnRef,
    onEscape: closeMenu,
  });

  useEffect(() => {
    function onScroll() {
      const currentY = window.scrollY;
      const lastY = lastYRef.current;
      const delta = currentY - lastY;

      setScrolled(currentY > 24);

      if (prefersReducedMotion) {
        setHidden(false);
      } else if (currentY <= 32) {
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
  }, [prefersReducedMotion]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-[29px] z-50 transition-all duration-300 md:top-[31px]",
          introActive && "pointer-events-none -translate-y-3 opacity-0",
          open && "pointer-events-none opacity-0",
          !open && hidden && "-translate-y-[calc(100%+31px)] opacity-0",
          !open && (!isHome || scrolled)
            ? "border-b border-cream/10 bg-charcoal/95 backdrop-blur-md"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto flex max-w-content items-center justify-between px-5 py-4 md:px-8">
          <MotionLink
            href="/"
            className="flex items-center text-cream"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={transition.fast}
          >
            <Image
              src="/flags-nepal-logo-white.png"
              alt="Flags Nepal logo"
              width={172}
              height={52}
              className="h-9 w-auto md:h-10"
              priority
            />
          </MotionLink>

          <nav aria-label="Main" className="hidden items-center gap-8 text-sm font-medium text-cream/80 lg:flex">
            {links.map((l) => (
              <MotionLink
                key={l.href}
                href={l.href}
                className="relative transition-colors hover:text-gold"
                whileHover={{ y: -2 }}
                transition={transition.fast}
              >
                {l.label}
              </MotionLink>
            ))}
            <a
              href={whatsappHref("Hi Flags Nepal, I'd like to order a flag.")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Order on WhatsApp (${siteConfig.phone})`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/75 transition-all duration-200 hover:border-gold/60 hover:text-gold"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <Button href="/shop" variant="primary" className="px-5 py-2 text-xs uppercase tracking-widest">
              Shop
            </Button>
          </nav>

          <button
            ref={menuBtnRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-cream/15 text-cream lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuPanelRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition.page}
            className="fixed inset-0 z-[100] flex flex-col bg-charcoal lg:hidden"
          >
            <div className="flex shrink-0 items-center justify-end px-5 pb-2 pt-[max(6.75rem,env(safe-area-inset-top)+5.25rem)] md:pt-[max(7rem,env(safe-area-inset-top)+5.5rem)]">
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-cream/15 text-cream"
                aria-label="Close menu"
                onClick={closeMenu}
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <div className="flex flex-1 flex-col justify-center gap-8 px-10 pb-12">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...transition.reveal, delay: staggerDelay(i, 0.055) }}
                >
                  <Link href={l.href} className="font-display text-3xl text-cream" onClick={closeMenu}>
                    {l.label}
                  </Link>
                </motion.div>
              ))}

              <div className="mt-4 flex w-full max-w-xs flex-col gap-3">
                <Button href="/shop" variant="primary" className="w-full">
                  Shop Flags
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    href={whatsappHref("Hi Flags Nepal, I'd like to order a flag.")}
                    variant="outline"
                    className="w-full px-3"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden />
                    WhatsApp
                  </Button>
                  <Button href={`tel:${siteConfig.landlineTel}`} variant="outline" className="w-full px-3">
                    <Phone className="h-4 w-4" aria-hidden />
                    Call
                  </Button>
                </div>
                <Link
                  href="/contact"
                  className="mt-1 text-center text-[14px] text-cream/50 underline-offset-4 transition-colors hover:text-gold hover:underline"
                  onClick={closeMenu}
                >
                  Request a custom quote
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
