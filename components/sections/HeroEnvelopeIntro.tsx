"use client";

import { easeOut } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type HeroEnvelopeIntroProps = {
  onFinish: () => void;
};

/**
 * Nepal flag split vertically — two halves swing open in 3D (envelope-style),
 * then the overlay fades to reveal the hero.
 */
export function HeroEnvelopeIntro({ onFinish }: HeroEnvelopeIntroProps) {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<"closed" | "opening" | "exit">("closed");
  const doneRef = useRef(false);
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onFinishRef.current();
  };

  useEffect(() => {
    if (reducedMotion === true) {
      finish();
      return;
    }

    const t1 = window.setTimeout(() => setPhase("opening"), 400);
    const t2 = window.setTimeout(() => setPhase("exit"), 1720);
    const t3 = window.setTimeout(() => finish(), 2480);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [reducedMotion]);

  if (reducedMotion === true) {
    return null;
  }

  const flapTransition = {
    duration: 1.12,
    ease: easeOut,
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal"
      role="presentation"
      aria-hidden
      initial={{ opacity: 1 }}
      animate={
        phase === "exit"
          ? { opacity: 0, transition: { duration: 0.7, ease: easeOut } }
          : { opacity: 1 }
      }
      style={{ pointerEvents: phase === "exit" ? "none" : "auto" }}
    >
      <div
        className="relative flex items-center justify-center"
        style={{ perspective: "1600px", perspectiveOrigin: "50% 42%" }}
      >
        <div className="flex" style={{ transformStyle: "preserve-3d" }}>
          <motion.div
            className="relative h-[min(50vh,300px)] w-[92px] overflow-hidden sm:h-[min(52vh,340px)] sm:w-[100px] md:h-[min(58vh,400px)] md:w-[108px]"
            style={{
              transformStyle: "preserve-3d",
              transformOrigin: "right center",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
            initial={{ rotateY: 0 }}
            animate={
              phase === "opening" || phase === "exit"
                ? { rotateY: -80 }
                : { rotateY: 0 }
            }
            transition={flapTransition}
          >
            <div
              className="h-full min-h-[260px] w-[216px] max-w-none bg-contain bg-left bg-no-repeat"
              style={{
                backgroundImage: "url('/flags-nepal-logo-white.png')",
              }}
            />
          </motion.div>

          <motion.div
            className="relative h-[min(50vh,300px)] w-[92px] overflow-hidden sm:h-[min(52vh,340px)] sm:w-[100px] md:h-[min(58vh,400px)] md:w-[108px]"
            style={{
              transformStyle: "preserve-3d",
              transformOrigin: "left center",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
            initial={{ rotateY: 0 }}
            animate={
              phase === "opening" || phase === "exit"
                ? { rotateY: 80 }
                : { rotateY: 0 }
            }
            transition={flapTransition}
          >
            <div
              className="h-full min-h-[260px] w-[216px] max-w-none -translate-x-[108px] bg-contain bg-right bg-no-repeat"
              style={{
                backgroundImage: "url('/flags-nepal-logo-white.png')",
              }}
            />
          </motion.div>
        </div>

        <div
          className="pointer-events-none absolute inset-y-10 w-px bg-gradient-to-b from-transparent via-cream/30 to-transparent opacity-60"
          style={{ left: "50%", transform: "translateX(-0.5px)" }}
        />
      </div>

      <p className="pointer-events-none absolute bottom-10 left-1/2 max-w-xs -translate-x-1/2 text-center text-[13px] font-medium uppercase tracking-[0.4em] text-cream/30">
        Flags Nepal
      </p>
    </motion.div>
  );
}
