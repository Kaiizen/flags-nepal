import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-sm border border-charcoal/10 bg-cream/5 p-6 transition-colors duration-300",
        className,
      )}
    >
      {children}
    </div>
  );
}
