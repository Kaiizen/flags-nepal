"use client";

import { cn } from "@/lib/cn";
import { transition } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";

export type SectionLabelProps = {
  devanagari: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
} & (
  | { english: string; englishLines?: never }
  | { english?: never; englishLines: string[] }
);

export function SectionLabel({
  devanagari,
  english,
  englishLines,
  align = "left",
  light,
  className,
}: SectionLabelProps) {
  const stacked = englishLines && englishLines.length > 0;
  const reduceMotion = useReducedMotion();

  const inner = (
    <>
      <p
        className={cn(
          "text-[20px] font-medium uppercase tracking-[0.08em] md:text-[22px]",
          light ? "text-deep-blue/70" : "text-muted",
        )}
      >
        {devanagari}
      </p>
      {stacked ? (
        <h2
          className={cn(
            "font-display font-bold tracking-[-0.03em]",
            light ? "text-charcoal" : "text-cream",
          )}
        >
          {englishLines!.map((line) => (
            <span
              key={line}
              className="block leading-[0.9] first:mt-0 text-[clamp(2.25rem,6.5vw,3.85rem)]"
            >
              {line}
            </span>
          ))}
        </h2>
      ) : (
        <h2
          className={cn(
            "font-display text-heading-sm font-bold tracking-[-0.02em] md:text-heading",
            light ? "text-charcoal" : "text-cream",
          )}
        >
          {english}
        </h2>
      )}
    </>
  );

  if (reduceMotion) {
    return (
      <div
        className={cn(
          "space-y-3 md:space-y-4",
          align === "center" && "text-center",
          className,
        )}
      >
        {inner}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={transition.revealSlow}
      className={cn(
        "space-y-3 md:space-y-4",
        align === "center" && "text-center",
        className,
      )}
    >
      {inner}
    </motion.div>
  );
}
