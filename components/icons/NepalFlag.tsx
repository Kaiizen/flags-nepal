import { cn } from "@/lib/cn";

type NepalFlagProps = {
  className?: string;
  title?: string;
};

/** Stylised double-pennant silhouette for wordmark and motifs */
export function NepalFlagIcon({ className, title = "Nepal flag" }: NepalFlagProps) {
  return (
    <svg
      viewBox="0 0 32 40"
      role="img"
      aria-label={title}
      className={cn("shrink-0", className)}
    >
      <path
        d="M16 2 L30 14 L30 26 L16 38 L2 26 L2 14 Z"
        fill="#1E3A5F"
        stroke="rgba(250,247,242,0.15)"
        strokeWidth="0.5"
      />
      <path d="M16 8 L26 16 L26 24 L16 32 L6 24 L6 16 Z" fill="#B91C1C" />
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
