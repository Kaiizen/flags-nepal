/**
 * Shared motion tokens — one easing curve and tight durations site-wide.
 *
 * `MotionProvider` sets `MotionConfig reducedMotion="user"` so components should
 * still branch explicitly (`useReducedMotion`) for infinite loops (marquee) and
 * heavy choreographed UI (Hero intro) wherever Framer’s default shortening is not enough.
 */
export const easeOut = [0.22, 1, 0.36, 1] as const;

export const duration = {
  /** Micro — hovers, small UI */
  xs: 0.28,
  /** Page shell, overlays */
  sm: 0.38,
  /** Sections, cards in view */
  md: 0.48,
  /** Hero imagery, emphasis */
  lg: 0.62,
} as const;

export const transition = {
  page: { duration: duration.sm, ease: easeOut },
  reveal: { duration: duration.md, ease: easeOut },
  revealSlow: { duration: duration.lg, ease: easeOut },
  fast: { duration: duration.xs, ease: easeOut },
} as const;

/** Stagger delay per index — keep steps small for a clean cascade */
export function staggerDelay(index: number, step = 0.045) {
  return index * step;
}

export function fadeUpTransition(index = 0, step?: number) {
  return {
    ...transition.reveal,
    delay: staggerDelay(index, step),
  };
}

/** Framer variants: parent uses `staggerContainer()`, children use `staggerItem` */
export function staggerContainer(stagger = 0.08, delayChildren = 0.06) {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.md, ease: easeOut },
  },
} as const;

export const staggerItemWide = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.lg, ease: easeOut },
  },
} as const;

/** Spring for sliding UI (e.g. filter pills) — still subtle */
export const springSnappy = { type: "spring" as const, stiffness: 420, damping: 34 };
