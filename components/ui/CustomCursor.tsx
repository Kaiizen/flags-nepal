"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const CURSOR_CLASS = "has-custom-cursor";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 520, damping: 34, mass: 0.28 });
  const springY = useSpring(y, { stiffness: 520, damping: 34, mass: 0.28 });

  useEffect(() => {
    const supportsPointer = window.matchMedia("(pointer: fine)").matches;
    setEnabled(supportsPointer);

    if (!supportsPointer) {
      return;
    }

    document.documentElement.classList.add(CURSOR_CLASS);

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      if (!visible) {
        setVisible(true);
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseenter", onEnter);

    return () => {
      document.documentElement.classList.remove(CURSOR_CLASS);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseenter", onEnter);
    };
  }, [visible, x, y]);

  if (!enabled) {
    return null;
  }

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[120] h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/85 bg-gold/10 shadow-[0_0_0_1px_rgba(250,247,242,0.3)_inset,0_0_16px_rgba(212,168,83,0.24)]"
      style={{ x: springX, y: springY }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.72 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    />
  );
}
