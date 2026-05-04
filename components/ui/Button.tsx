import { cn } from "@/lib/cn";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost" | "inverse";

const variants: Record<Variant, string> = {
  primary:
    "bg-crimson text-cream hover:bg-crimson/90 border border-transparent shadow-sm",
  outline:
    "border border-cream/30 text-cream hover:border-crimson hover:text-cream bg-transparent",
  ghost: "text-cream hover:bg-cream/10 border border-transparent",
  inverse:
    "border border-charcoal/20 bg-transparent text-charcoal hover:border-crimson hover:text-charcoal",
};

type ButtonProps = Omit<ComponentPropsWithoutRef<"button">, "href"> & {
  variant?: Variant;
  href?: string;
  children: ReactNode;
  /** Override external detection; if true renders as <a target=_blank>. */
  external?: boolean;
};

const externalHrefPattern = /^(https?:|mailto:|tel:|sms:|whatsapp:)/i;

function isExternalHref(href: string, override?: boolean) {
  if (typeof override === "boolean") return override;
  return externalHrefPattern.test(href);
}

export function Button({
  className,
  variant = "primary",
  href,
  children,
  type = "button",
  disabled,
  external,
  "aria-label": ariaLabel,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-sm font-medium tracking-wide transition-[transform,box-shadow,colors] duration-200 will-change-transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.985] disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    className,
  );

  if (href) {
    if (isExternalHref(href, external)) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          aria-label={ariaLabel}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} className={classes} {...props}>
      {children}
    </button>
  );
}
