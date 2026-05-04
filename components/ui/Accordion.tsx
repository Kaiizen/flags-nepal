"use client";

import { cn } from "@/lib/cn";
import { duration, easeOut, transition } from "@/lib/motion";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState, type ReactNode } from "react";

export type AccordionItem = {
  id: string;
  title: ReactNode;
  content: ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  className?: string;
  defaultOpenId?: string | null;
  tone?: "dark" | "light";
  /** Merged into each row trigger (e.g. extra vertical padding). */
  triggerClassName?: string;
  /** Merged into the expanded body wrapper. */
  contentClassName?: string;
};

export function Accordion({
  items,
  className,
  defaultOpenId,
  tone = "dark",
  triggerClassName,
  contentClassName,
}: AccordionProps) {
  const [open, setOpen] = useState<string | null>(
    defaultOpenId === undefined ? items[0]?.id ?? null : defaultOpenId,
  );

  function toggle(id: string) {
    setOpen((prev) => (prev === id ? null : id));
  }

  const isLight = tone === "light";

  return (
    <div
      className={cn(
        "divide-y border rounded-sm",
        isLight
          ? "divide-charcoal/10 border-charcoal/10 bg-white/80"
          : "divide-cream/[0.06] border-cream/[0.06]",
        className,
      )}
    >
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <div
            key={item.id}
            className={cn(
              "transition-colors duration-300",
              !isLight && isOpen && "bg-cream/[0.02]",
            )}
          >
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className={cn(
                "flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-7 md:py-6",
                isLight
                  ? "text-charcoal hover:bg-cream"
                  : "text-cream hover:bg-cream/[0.03]",
                triggerClassName,
              )}
              aria-expanded={isOpen}
            >
              <span className={cn(
                "text-[14px] font-medium leading-snug md:text-[15px]",
                !isLight && "tracking-[0.01em]",
              )}>
                {item.title}
              </span>
              <span className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                isLight
                  ? "border-charcoal/15"
                  : "border-cream/[0.1]",
                isOpen && !isLight && "border-gold/30 bg-gold/[0.06]",
                isOpen && isLight && "border-charcoal/25 bg-charcoal/5",
              )}>
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 shrink-0 transition-all duration-300 ease-out",
                    isLight ? "text-charcoal/50" : "text-cream/30",
                    isOpen && "rotate-180",
                    isOpen && !isLight && "text-gold/60",
                    isOpen && isLight && "text-charcoal/70",
                  )}
                />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: duration.xs + 0.08, ease: easeOut }}
                  className="overflow-hidden"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...transition.reveal, delay: 0.04 }}
                    className={cn(
                      "px-5 pb-6 pt-0 md:px-7",
                      isLight ? "text-muted" : "",
                      contentClassName,
                    )}
                  >
                    {item.content}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
