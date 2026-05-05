"use client";

import { Button } from "@/components/ui/Button";
import { easeOut } from "@/lib/motion";
import { motion } from "framer-motion";

export function ClosingCTA() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-24 text-cream md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cream/[0.06] to-transparent" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(212,168,83,0.03),transparent_70%)]" />

      <div className="relative mx-auto max-w-content px-5 md:px-8">
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.0, ease: easeOut }}
        >
          <p className="mb-5 text-[13px] font-medium uppercase tracking-[0.38em] text-gold/70 md:text-[15px]">
            Let&apos;s Work Together
          </p>

          <h2 className="font-display font-bold leading-[1.14] tracking-[-0.03em] text-cream">
            <span className="block text-[clamp(2.2rem,6vw,3.8rem)]">READY TO</span>
            <span className="block text-[clamp(2.2rem,6vw,3.8rem)]">
              <em className="font-normal not-italic hero-pride">Begin?</em>
            </span>
          </h2>

          <motion.div
            className="my-8 h-px w-14 origin-center bg-gradient-to-r from-transparent via-gold/40 to-transparent md:my-10 md:w-20"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.2 }}
          />

          <p className="max-w-md text-[13.5px] leading-[1.9] text-cream/35 md:text-[14.5px]">
            Share your brief and we&apos;ll respond within one business day
            with a tailored proposal.
          </p>

          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.3 }}
          >
            <Button href="/contact" variant="primary" className="px-8 py-3.5">
              Request a Quote
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
