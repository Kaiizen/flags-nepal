"use client";

import { transition } from "@/lib/motion";
import { motion, type HTMLMotionProps, useReducedMotion } from "framer-motion";
import type { ComponentProps, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Extra delay after scroll trigger (seconds) */
  delay?: number;
  initialY?: number;
  /** Viewport margin passed to Framer */
  margin?: string;
  once?: boolean;
  viewport?: HTMLMotionProps<"div">["viewport"];
} & Omit<HTMLMotionProps<"div">, "children" | "initial" | "animate" | "transition" | "viewport">;

export function Reveal({
  children,
  className,
  delay = 0,
  initialY = 22,
  margin = "-48px",
  once = true,
  viewport,
  ...rest
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    const divProps = rest as ComponentProps<"div">;
    return (
      <div className={className} {...divProps}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: initialY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin, amount: 0.12, ...viewport }}
      transition={{ ...transition.reveal, delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
