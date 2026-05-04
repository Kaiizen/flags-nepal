"use client";

import { Button } from "@/components/ui/Button";
import type { GoogleReviewsPayload } from "@/lib/google-reviews.server";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/cn";
import { easeOut } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, Star } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

/** Beyond this length, show Read more / Show less. */
const READ_MORE_AT = 200;

type CardItem = {
  key: string;
  quote: string;
  name: string;
  meta: string;
  rating: number;
  profilePhotoUrl?: string;
};

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function buildReviewItems(google: GoogleReviewsPayload | null | undefined): CardItem[] {
  return (
    google?.reviews.map((r, i) => ({
      key: `google-${i}-${r.author_name.replace(/\s+/g, "-")}`,
      quote: r.text.trim(),
      name: r.author_name,
      meta: (r.relative_time_description ?? "").trim(),
      rating: Math.min(5, Math.max(1, Math.round(r.rating))),
      profilePhotoUrl: r.profile_photo_url,
    })) ?? []
  );
}

function GoogleGMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={18}
      height={18}
      aria-hidden
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function GoogleReviewCard({ item }: { item: CardItem }) {
  const [expanded, setExpanded] = useState(false);
  const needsToggle = item.quote.length > READ_MORE_AT;

  return (
    <article
      className={cn(
        "group flex h-full min-h-[280px] w-[300px] shrink-0 flex-col rounded-sm border border-cream/[0.08] bg-cream/[0.02] p-5 transition-[border-color,background-color] duration-500 hover:border-gold/20 hover:bg-cream/[0.04] md:w-[340px] md:p-6",
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          {item.profilePhotoUrl ? (
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-cream/[0.1] bg-cream/[0.06]">
              <Image
                src={item.profilePhotoUrl}
                alt=""
                width={44}
                height={44}
                className="object-cover"
                sizes="44px"
              />
            </div>
          ) : (
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-gold/[0.12] font-sans text-[13px] font-semibold tracking-tight text-gold/90"
              aria-hidden
            >
              {initialsFromName(item.name)}
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate font-sans text-[14px] font-semibold tracking-[0.01em] text-cream/90">
              {item.name}
            </p>
            {item.meta ? (
              <p className="mt-0.5 line-clamp-2 font-sans text-[11px] leading-snug text-cream/35">
                {item.meta}
              </p>
            ) : null}
          </div>
        </div>
        <GoogleGMark className="shrink-0 opacity-80 transition-opacity group-hover:opacity-100" />
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-1.5">
        <div className="flex gap-0.5" aria-label={`${item.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, idx) => (
            <Star
              key={idx}
              className={cn(
                "h-3.5 w-3.5",
                idx < item.rating ? "fill-gold/75 text-gold/75" : "text-cream/12",
              )}
            />
          ))}
        </div>
        <BadgeCheck className="h-4 w-4 shrink-0 text-gold/55" aria-hidden strokeWidth={2} />
        <span className="sr-only">From Google Business profile</span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        <p
          className={cn(
            "font-sans text-[13px] leading-[1.75] text-cream/55 transition-colors duration-500 group-hover:text-cream/68 md:text-[13.5px]",
            needsToggle && !expanded && "line-clamp-5",
          )}
        >
          {item.quote}
        </p>
        {needsToggle ? (
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="mt-2 self-start font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-gold/65 transition-colors hover:text-gold"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        ) : null}
      </div>
    </article>
  );
}

function ReviewStrip({
  items,
  direction,
  className,
}: {
  items: CardItem[];
  direction: "left" | "right";
  className?: string;
}) {
  const reducedMotion = useReducedMotion();

  const cards = items.map((t) => <GoogleReviewCard key={t.key} item={t} />);
  const cardsDup = items.map((t, i) => (
    <GoogleReviewCard key={`${t.key}-loop-${i}`} item={t} />
  ));

  if (reducedMotion) {
    return (
      <div className={cn("flex gap-4 overflow-x-auto scrollbar-hide px-5 md:px-8", className)}>
        {cards}
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-charcoal to-transparent md:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-charcoal to-transparent md:w-24" />

      <motion.div
        className="flex w-max gap-4"
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: 80, ease: "linear", repeat: Infinity }}
      >
        {cards}
        {cardsDup}
      </motion.div>
    </div>
  );
}

type TestimonialsProps = {
  google?: GoogleReviewsPayload | null;
};

export function Testimonials({ google }: TestimonialsProps) {
  const items = useMemo(() => buildReviewItems(google ?? null), [google]);
  const hasReviews = items.length > 0;
  const reducedMotion = useReducedMotion();

  const ratingLabel = siteConfig.publicGoogleAverageRating.toFixed(1);
  const countLabel =
    google?.user_ratings_total && google.user_ratings_total > 0
      ? `${google.user_ratings_total}+ on Google`
      : "4.5+ on Google";

  const allReviewsHref = siteConfig.googleMapsPlaceUrl;
  const totalReviews = google?.user_ratings_total ?? 0;
  const shownCount = items.length;

  return (
    <section className="relative overflow-hidden bg-charcoal py-20 text-cream sm:py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cream/[0.06] to-transparent" />

      <div className="mx-auto max-w-content px-5 md:px-8">
        <motion.div
          className="mb-10 md:mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.0, ease: easeOut }}
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.38em] text-gold/70 md:text-[11px]">
                Client Testimonials
              </p>
              <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                <h2 className="font-display font-bold leading-[1.14] tracking-[-0.03em] text-cream">
                  <span className="block text-[clamp(2.4rem,7vw,4.2rem)]">STUDIO</span>
                  <span className="block text-[clamp(2.4rem,7vw,4.2rem)]">
                    <em className="font-normal not-italic hero-pride">Reviews</em>
                  </span>
                </h2>
                <div className="text-left sm:text-right">
                  <p className="flex items-baseline gap-1.5 sm:justify-end">
                    <span className="font-display text-[2.6rem] font-bold leading-none tracking-[-0.02em] text-gold/50">
                      {ratingLabel}
                    </span>
                    <span className="text-[13px] text-cream/20">/5</span>
                  </p>
                  <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.25em] text-cream/25">
                    {countLabel}
                  </p>
                </div>
              </div>
              <p className="mt-4 max-w-xl text-[12px] leading-relaxed text-cream/30">
                Verified public reviews from our{" "}
                <a
                  href={siteConfig.googleMapsPlaceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold/60 underline-offset-2 transition-colors hover:text-gold hover:underline"
                >
                  Google Business
                </a>{" "}
                profile.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {hasReviews ? (
        <>
          <ReviewStrip items={items} direction="left" className="mt-2" />

          <div className="mx-auto max-w-content px-5 md:px-8">
            <motion.div
              className="mt-10 flex justify-end md:mt-12"
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.7, ease: easeOut, delay: reducedMotion ? 0 : 0.15 }}
            >
              <Button
                href={allReviewsHref}
                external
                variant="primary"
                className="rounded-sm px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] md:px-8 md:text-[11px] md:tracking-[0.26em]"
                aria-label={
                  totalReviews > shownCount
                    ? `Check all Google reviews, ${totalReviews} total`
                    : "Check all Google reviews"
                }
              >
                Check all Google reviews
              </Button>
            </motion.div>
          </div>
        </>
      ) : (
        <div className="mx-auto max-w-content px-5 md:px-8">
          <motion.div
            className="flex flex-col items-start gap-4 rounded-sm border border-cream/[0.06] p-6 sm:flex-row sm:items-center sm:justify-between md:p-8"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: easeOut }}
          >
            <div className="flex items-center gap-4">
              <div className="flex gap-1" aria-hidden>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-gold/60 text-gold/60" />
                ))}
              </div>
              <p className="text-[13px] leading-[1.85] text-cream/55 md:text-[14px]">
                Read verified reviews from clients across Nepal on our Google Business profile.
              </p>
            </div>
            <Button href={siteConfig.googleBusinessReviewUrl} external variant="outline" className="shrink-0">
              Read on Google
            </Button>
          </motion.div>
        </div>
      )}
    </section>
  );
}
