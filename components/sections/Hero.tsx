"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { ne, neFace } from "@/lib/nepali-labels";
import { easeOut } from "@/lib/motion";
import { siteConfig, whatsappHref } from "@/lib/site";
import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";

/** Faster handoff on ≤767px: mobile Lighthouse LCP tracks the hero intro/logo sequence; shorten it materially. */
type IntroTiming = {
  doneMs: number;
  overlayDelay: number;
  overlayDur: number;
  logoEnterDur: number;
};

const INTRO_DESKTOP: IntroTiming = {
  doneMs: 3500,
  overlayDelay: 3.0,
  overlayDur: 0.5,
  logoEnterDur: 1.2,
};

const INTRO_MOBILE: IntroTiming = {
  doneMs: 1720,
  overlayDelay: 1.08,
  overlayDur: 0.38,
  logoEnterDur: 0.72,
};

const showcaseProducts = [
  {
    slug: "golden-stand-fst",
    name: "Golden Stand",
    src: "/products/golden-stand-1-fst-21/nepal-flag.png",
    alt: "Golden stand with Nepal flag",
  },
  {
    slug: "desk-feather-stand-dfp-o",
    name: "Desk Feather Stand",
    src: "/products/desk-feather-stand-dfp-o/group.png",
    alt: "Desk feather stand collection",
  },
  {
    slug: "x-crystal-stand-bcb-0x",
    name: "X Crystal Stand",
    src: "/products/x-crystal-stand-bcb-0x/group.png",
    alt: "Crystal base stands",
  },
  {
    slug: "pennant-stand-ppr-t",
    name: "Pennant Stand",
    src: "/products/pennant-stand-ppr-t/trio.png",
    alt: "Pennant stand trio",
  },
];

const trustPills = [
  `${siteConfig.publicGoogleAverageRating} on Google`,
  "Trusted by Nepal cricket players",
  "Delivery across all 7 provinces",
  "50% advance · 50% on delivery",
];

const HERO_VALUES = [
  "PRIDE",
  "PRECISION",
  "HERITAGE",
  "PASSION",
  "CARE",
] as const;

/** Reserves width/height for the longest gold word in the roll (same `hero-pride` as items). */
const HERO_VALUE_SIZER = "PRECISION";

/** Time on each word before advancing (longer = calmer, more readable). */
const VALUE_CYCLE_MS = 4_800;
/** Roll duration — slower + soft ease = more editorial than a snappy ticker. */
const VALUE_ROLL_S = 1.12;
/** Smooth in-out: gentle start, soft landing (distinct from the site’s default easeOut). */
const HERO_ROLL_EASE = [0.65, 0, 0.35, 1] as const;

function HeadlineValueRoll({ index, reduced }: { index: number; reduced: boolean }) {
  const yPercent = reduced ? 0 : -((index * 100) / HERO_VALUES.length);

  return (
    <span className="relative inline-block overflow-hidden align-middle">
      {/* Width/height: longest word; each frame centers shorter words in this slot */}
      <span aria-hidden className="invisible block whitespace-nowrap text-center">
        <span className="font-normal not-italic hero-pride">{HERO_VALUE_SIZER}</span>
      </span>
      <motion.span
        className="absolute inset-x-0 top-0 flex w-full flex-col will-change-transform"
        initial={false}
        animate={{ y: `${yPercent}%` }}
        transition={{ duration: VALUE_ROLL_S, ease: HERO_ROLL_EASE }}
      >
        {HERO_VALUES.map((v) => (
          <span
            key={v}
            className="flex w-full shrink-0 items-center justify-center whitespace-nowrap"
          >
            <span className="font-normal not-italic text-gold hero-pride">{v}</span>
          </span>
        ))}
      </motion.span>
    </span>
  );
}

function reveal(introDone: boolean, delay: number) {
  return {
    initial: { opacity: 0, y: 14 },
    animate: introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    transition: { duration: 1.1, ease: easeOut, delay: introDone ? delay : 0 },
  } as const;
}

export function Hero() {
  const reducedMotion = useReducedMotion();
  const [introDone, setIntroDone] = useState(false);
  const [valueIdx, setValueIdx] = useState(0);
  const [introTiming, setIntroTiming] = useState<IntroTiming>(INTRO_DESKTOP);
  const introActive = !introDone && reducedMotion !== true;
  const isReduced = reducedMotion === true;

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 767px)").matches) {
      setIntroTiming(INTRO_MOBILE);
    }
  }, []);

  useEffect(() => {
    if (reducedMotion === true) {
      setIntroDone(true);
      return;
    }

    if (typeof window !== "undefined" && window.sessionStorage.getItem("heroIntroSeen") === "1") {
      setIntroDone(true);
      return;
    }

    const timer = window.setTimeout(() => setIntroDone(true), introTiming.doneMs);
    return () => window.clearTimeout(timer);
  }, [reducedMotion, introTiming.doneMs]);

  useEffect(() => {
    if (!introDone || reducedMotion === true || typeof window === "undefined") return;
    window.sessionStorage.setItem("heroIntroSeen", "1");
  }, [introDone, reducedMotion]);

  useEffect(() => {
    document.body.dataset.heroIntro = introActive ? "1" : "0";
    window.dispatchEvent(new CustomEvent("hero-intro-change", { detail: { active: introActive } }));
    return () => {
      document.body.dataset.heroIntro = "0";
      window.dispatchEvent(new CustomEvent("hero-intro-change", { detail: { active: false } }));
    };
  }, [introActive]);

  useEffect(() => {
    if (!introDone || isReduced) return;
    const timer = window.setInterval(() => {
      setValueIdx((i) => (i + 1) % HERO_VALUES.length);
    }, VALUE_CYCLE_MS);
    return () => window.clearInterval(timer);
  }, [introDone, isReduced]);

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-charcoal text-cream">
      {/* Intro overlay — brand moment */}
      {introActive && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-charcoal"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{
            delay: introTiming.overlayDelay,
            duration: introTiming.overlayDur,
            ease: easeOut,
          }}
          aria-hidden
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.88, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: introTiming.logoEnterDur, ease: easeOut }}
            className="relative px-6"
          >
            <Image
              src="/flags-nepal-logo-white.png"
              alt=""
              width={310}
              height={112}
              className="h-[min(42vh,168px)] w-auto md:h-[min(46vh,220px)]"
              sizes="(max-width: 767px) 168px, 220px"
              priority
            />
          </motion.div>
        </motion.div>
      )}

      {/* Main content — centered editorial */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pb-8 pt-32 md:px-8 md:pt-36 lg:pb-12">
        {/* Credential block — English first for conversion + Nepali for local trust */}
        <motion.p
          {...reveal(introDone, 0.02)}
          className="mb-2 text-[13px] font-medium uppercase tracking-[0.3em] text-gold/80 md:text-[15px]"
        >
          Nepal&rsquo;s flag &amp; banner workshop — since 2018
        </motion.p>
        <motion.p
          {...reveal(introDone, 0.08)}
          lang="ne"
          className={cn("mb-8 text-gold/45 md:mb-10", neFace)}
        >
          {ne.establishment}
        </motion.p>

        {/* Headline: three lines — craft / in fabric with / {rolling} — extra gap = premium, airy rhythm */}
        <motion.h1
          className="flex flex-col items-center gap-y-2 text-center font-display font-bold leading-none tracking-[-0.035em] sm:gap-y-2.5 md:gap-y-3.5"
          initial={{ opacity: 0 }}
          animate={introDone ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.4, ease: easeOut, delay: introDone ? 0.12 : 0 }}
        >
          <span className="block w-full text-[clamp(2.4rem,9vw,6.5rem)] text-cream">
            CRAFTING
          </span>
          <span className="block w-full text-[clamp(2.4rem,9vw,6.5rem)] text-cream">
            IN FABRIC WITH
          </span>
          <span className="block w-full text-[clamp(2.4rem,9vw,6.5rem)] text-center">
            <HeadlineValueRoll index={isReduced ? 0 : valueIdx} reduced={isReduced} />
          </span>
        </motion.h1>

        {/* Gold rule */}
        <motion.div
          className="my-9 h-px w-14 origin-center bg-gradient-to-r from-transparent via-gold/60 to-transparent md:my-11 md:w-20"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={introDone ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 1.0, ease: easeOut, delay: introDone ? 0.35 : 0 }}
        />

        {/* Tagline */}
        <motion.p
          {...reveal(introDone, 0.45)}
          className="max-w-sm text-center text-[14px] leading-[1.95] text-cream/50 md:max-w-md md:text-[15.5px]"
        >
          Flags, banners &amp; jerseys made in Bagbazar, Kathmandu.
          <br className="hidden sm:block" />
          Delivered across all seven provinces of Nepal.
        </motion.p>

        {/* Primary CTAs */}
        <motion.div
          {...reveal(introDone, 0.58)}
          className="mt-10 flex w-full max-w-sm flex-col gap-3 sm:w-auto sm:flex-row sm:items-center md:mt-12"
        >
          <Button href="/shop" variant="primary" className="w-full sm:w-auto">
            <ShoppingBag className="h-4 w-4" aria-hidden />
            Shop Flags
          </Button>
          <Button
            href={whatsappHref("Hi Flags Nepal, I'd like to order a flag.")}
            variant="outline"
            className="w-full sm:w-auto"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            Order on WhatsApp
          </Button>
        </motion.div>

        {/* Tertiary CTA — B2B / custom work */}
        <motion.p
          {...reveal(introDone, 0.68)}
          className="mt-5 text-[14px] text-cream/40 md:text-[16px]"
        >
          Bulk or custom order?{" "}
          <Link
            href="/contact"
            className="text-cream/70 underline-offset-4 transition-colors hover:text-gold hover:underline"
          >
            Request a quote
          </Link>
          .
        </motion.p>

        {/* Trust strip */}
        <motion.ul
          {...reveal(introDone, 0.78)}
          className="mt-10 flex flex-wrap justify-center gap-x-4 gap-y-2 text-[13px] font-medium uppercase tracking-[0.22em] text-cream/40 md:mt-12 md:text-[15px]"
        >
          {trustPills.map((pill, i) => (
            <li key={pill} className="flex items-center gap-4">
              {i > 0 && (
                <span aria-hidden className="hidden h-3 w-px bg-cream/15 md:inline-block" />
              )}
              <span>{pill}</span>
            </li>
          ))}
        </motion.ul>
      </div>

      {/* Product showcase strip */}
      <div className="relative z-10 mt-auto border-t border-cream/[0.04] px-5 pb-10 pt-6 md:px-8 md:pb-12 md:pt-8">
        <div className="mx-auto grid max-w-content grid-cols-2 gap-2.5 sm:grid-cols-4 md:gap-3.5">
          {showcaseProducts.map((item, i) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{
                duration: 0.9,
                ease: easeOut,
                delay: introDone ? 0.72 + i * 0.07 : 0,
              }}
            >
              <Link
                href={`/shop/${item.slug}`}
                className="group relative block aspect-square overflow-hidden rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
                aria-label={`Shop ${item.name}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-contain object-center transition-transform duration-[800ms] ease-out motion-reduce:transition-none motion-reduce:group-hover:scale-100 group-hover:scale-[1.04]"
                  sizes="(max-width: 639px) 50vw, 25vw"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-cream/90">
                    {item.name}
                  </p>
                  <p className="mt-0.5 inline-flex items-center gap-1 text-[13px] text-gold/80">
                    Shop <span aria-hidden>&rarr;</span>
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Browse link */}
        <motion.div
          {...reveal(introDone, 1.1)}
          className="mt-5 text-center md:mt-6"
        >
          <Link
            href="/shop"
            prefetch
            className="inline-flex items-center gap-1.5 text-[13px] font-medium uppercase tracking-[0.3em] text-cream/30 transition-colors duration-300 hover:text-gold/70"
          >
            View full catalogue
            <span aria-hidden className="translate-y-px">&#8594;</span>
          </Link>
        </motion.div>
      </div>

      {/* Ambient glow — warm gold from top */}
      <div className="pointer-events-none absolute inset-0 hero-ambient" aria-hidden />
      {/* Vignette at edges */}
      <div className="pointer-events-none absolute inset-0 hero-vignette" aria-hidden />
    </section>
  );
}
