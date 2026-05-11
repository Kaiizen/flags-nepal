"use client";

import { Accordion } from "@/components/ui/Accordion";
import { easeOut } from "@/lib/motion";
import { faqItems } from "@/lib/faq";
import { motion } from "framer-motion";
import Link from "next/link";

export function FAQ() {
  return (
    <section id="faq" className="relative overflow-hidden bg-charcoal py-20 text-cream sm:py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cream/[0.06] to-transparent" />

      <div className="mx-auto max-w-content px-5 md:px-8">
        {/* Header */}
        <motion.div
          className="mb-14 md:mb-20"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.0, ease: easeOut }}
        >
          <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.38em] text-gold/70 md:text-[15px]">
            Frequently Asked
          </p>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="font-display font-bold leading-[1.14] tracking-[-0.03em] text-cream">
              <span className="block text-[clamp(2.4rem,7vw,4.2rem)]">COMMON</span>
              <span className="block text-[clamp(2.4rem,7vw,4.2rem)]">
                <em className="font-normal not-italic hero-pride">Clarity</em>
              </span>
            </h2>
            <p className="max-w-sm text-[13px] leading-[1.9] text-cream/30 md:text-right md:text-[14px]">
              Answers to the questions we hear most from clients across
              Nepal and internationally.
            </p>
          </div>
        </motion.div>

        {/* Two-column layout on desktop */}
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          {/* Left — quick stats */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, ease: easeOut, delay: 0.05 }}
          >
            <div className="sticky top-28 space-y-8">
              <div>
                <p className="font-display text-[2.8rem] font-bold leading-none tracking-[-0.02em] text-gold/50">
                  {faqItems.length}
                </p>
                <p className="mt-2 text-[13px] font-medium uppercase tracking-[0.25em] text-cream/25">
                  Common questions answered
                </p>
              </div>
              <div className="h-px w-12 bg-cream/[0.06]" />
              <p className="max-w-xs text-[13px] leading-[1.9] text-cream/30">
                Can&apos;t find what you&apos;re looking for? Reach out directly and
                we&apos;ll get back to you within one business day.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.3em] text-cream/30 transition-colors duration-300 hover:text-gold/70"
              >
                Contact us &#8594;
              </Link>
            </div>
          </motion.div>

          {/* Right — accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, ease: easeOut, delay: 0.1 }}
          >
            <Accordion
              defaultOpenId={null}
              className="rounded-sm border-cream/[0.06]"
              items={faqItems.map((f, i) => ({
                id: f.id,
                title: (
                  <span className="flex items-start gap-4">
                    <span className="mt-0.5 shrink-0 font-display text-[13px] font-bold tabular-nums text-gold/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{f.title}</span>
                  </span>
                ),
                content: (
                  <p className="pl-10 text-[13px] leading-[1.9] text-cream/40">{f.content}</p>
                ),
              }))}
            />

            {/* Mobile / tablet contact nudge — desktop shows the same CTA in the left rail */}
            <div className="mt-8 flex flex-col items-start gap-3 border-t border-cream/[0.06] pt-6 lg:hidden">
              <p className="text-[13px] leading-[1.9] text-cream/40">
                Can&rsquo;t find what you&rsquo;re looking for? Reach out and
                we&rsquo;ll reply within one business day.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.3em] text-gold/80 transition-colors hover:text-gold"
              >
                Contact us &#8594;
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
