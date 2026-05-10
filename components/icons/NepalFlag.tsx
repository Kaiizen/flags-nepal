import { cn } from "@/lib/cn";

type NepalFlagProps = {
  className?: string;
  title?: string;
};

/**
 * Small wedge silhouette from the official Schedule&nbsp;1 geometry (crimson + azure border),
 * so the mark reads as Nepal’s double pennon — not a generic hexagon.
 */
export function NepalFlagIcon({ className, title = "Nepal flag" }: NepalFlagProps) {
  return (
    <svg viewBox="-17.582 -4.664 71.571 87.246" role="img" aria-label={title} className={cn("h-[4.75rem] w-auto shrink-0", className)}>
      <title>{title}</title>
      <path
        d="M -15,37.5735931288 h 60 L -15,0 v 80 h 60 L -15,20 z"
        fill="#DC143C"
        stroke="#003893"
        strokeWidth="5.165"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export function NepalFlagWatermark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 260"
      className={cn("pointer-events-none", className)}
      aria-hidden
    >
      <path
        d="M100 8 L188 78 L188 182 L100 252 L12 182 L12 78 Z"
        fill="#1E3A5F"
        opacity="0.12"
      />
      <path
        d="M100 36 L170 92 L170 168 L100 224 L30 168 L30 92 Z"
        fill="#B91C1C"
        opacity="0.08"
      />
    </svg>
  );
}
