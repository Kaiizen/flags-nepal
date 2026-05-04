"use client";

import { cn } from "@/lib/cn";
import { transition } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";

type MarqueeProps = {
  text: string;
  className?: string;
};

export function Marquee({ text, className }: MarqueeProps) {
  const reducedMotion = useReducedMotion();
  const doubled = `${text} · ${text} · `;

  const bar = cn(
    "border-y border-crimson/20 bg-charcoal py-3",
    reducedMotion ? "text-center" : "relative overflow-hidden",
    className,
  );

  const textClass =
    "text-sm font-medium uppercase tracking-[0.2em] text-crimson";

  if (reducedMotion) {
    return (
      <motion.div
        className={bar}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={transition.revealSlow}
      >
        <p className={textClass}>{text}</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={bar}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={transition.revealSlow}
    >
      <motion.div
        className={cn("flex w-max whitespace-nowrap", textClass)}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 42, ease: "linear", repeat: Infinity }}
      >
        <span className="pr-16">{doubled}</span>
        <span className="pr-16" aria-hidden>
          {doubled}
        </span>
      </motion.div>
    </motion.div>
  );
}
