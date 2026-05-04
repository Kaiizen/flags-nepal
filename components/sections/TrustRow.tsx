"use client";

import { easeOut } from "@/lib/motion";
import { siteConfig } from "@/lib/site";
import { motion } from "framer-motion";
import Link from "next/link";

const trustItems = [
  { value: siteConfig.trustStrip.yearsOfCrafting.value, label: siteConfig.trustStrip.yearsOfCrafting.label },
  { value: siteConfig.trustStrip.flagsToCustomers.value, label: siteConfig.trustStrip.flagsToCustomers.label },
  {
    value: siteConfig.publicGoogleAverageRating.toFixed(1),
    suffix: "/5",
    label: "Client Satisfaction",
  },
];

export function TrustRow() {
  return (
    <section className="relative bg-charcoal py-14 text-cream md:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cream/[0.06] to-transparent" />

      <div className="mx-auto max-w-content px-5 md:px-8">
        <motion.div
          className="flex flex-col items-center justify-center gap-10 sm:flex-row sm:gap-0 sm:divide-x sm:divide-cream/[0.08]"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 1.0, ease: easeOut }}
        >
          {trustItems.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center px-8 sm:flex-1 sm:px-6 md:px-10"
            >
              <p className="flex items-baseline gap-0.5">
                <span className="font-display text-[2.8rem] font-bold leading-none tracking-[-0.03em] text-gold/50 md:text-[3.4rem]">
                  {item.value}
                </span>
                {"suffix" in item && (
                  <span className="text-[14px] font-medium text-cream/20">
                    {item.suffix}
                  </span>
                )}
              </p>
              <p className="mt-3 text-center text-[12.5px] font-medium uppercase tracking-[0.28em] text-cream/45 md:text-[12.5px]">
                {item.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Compliance nudge — surface the Nepal flag proportions guide */}
        <motion.p
          className="mx-auto mt-10 max-w-xl text-center text-[12px] leading-[1.9] text-cream/40 md:mt-12 md:text-[13px]"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.9, ease: easeOut, delay: 0.15 }}
        >
          We follow Nepal&rsquo;s constitutional flag geometry for every national
          piece we make.{" "}
          <Link
            href="/nepal-flag-proportions"
            className="font-medium text-gold/80 underline-offset-4 transition-colors hover:text-gold hover:underline"
          >
            See the precise proportions &rarr;
          </Link>
        </motion.p>
      </div>
    </section>
  );
}
