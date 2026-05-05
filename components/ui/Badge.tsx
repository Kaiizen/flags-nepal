import { cn } from "@/lib/cn";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-cream/15 bg-charcoal/60 px-3 py-1 text-[13px] font-medium uppercase tracking-[0.15em] text-cream/90 backdrop-blur",
        className,
      )}
    >
      {children}
    </span>
  );
}
