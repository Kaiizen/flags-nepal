"use client";

import { cn } from "@/lib/cn";
import { easeOut, springSnappy, staggerDelay, transition } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    id: "step-1",
    number: "01",
    label: "Consultation",
    body: "From embassy ceremonial sets to Nepal national cricket jersey runs and corporate lobby banners, we begin by understanding purpose, viewing distance, and any regulatory spec. Timeline, budget, and installation context shape the brief.",
  },
  {
    id: "step-2",
    number: "02",
    label: "Design",
    body: "Our studio refines artwork to production separations, confirms Pantone or institutional colour references, and issues proofs before any yardage is committed.",
  },
  {
    id: "step-3",
    number: "03",
    label: "Material",
    body: "Fabric is selected for drape, wind load, and longevity — premium nylon, polyester, or knitted constructions depending on indoor, outdoor, or ceremonial use.",
  },
  {
    id: "step-4",
    number: "04",
    label: "Printing",
    body: "Direct-to-fabric digital, screen, or hybrid methods are matched to your graphic complexity. Each pass is monitored for registration and ink saturation.",
  },
  {
    id: "step-5",
    number: "05",
    label: "Delivery",
    body: "Finished pieces pass QC for stitch tension, hem integrity, and colour fidelity. We pack for safe transit across Nepal or coordinate international freight.",
  },
];

const processViewport = { once: true as const, margin: "-48px" as const, amount: 0.15 as const };

function StepCopy({
  step,
  className,
  baseDelay = 0,
}: {
  step: (typeof steps)[number];
  className?: string;
  baseDelay?: number;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <motion.h3
        className="font-display text-[1.15rem] font-bold leading-snug tracking-[0.01em] text-cream sm:text-[1.2rem]"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={processViewport}
        transition={{ ...transition.reveal, delay: baseDelay }}
      >
        {step.label}
      </motion.h3>
      <motion.p
        className="mt-3 text-[13px] leading-[1.95] text-cream/35 sm:mt-4 sm:text-[14px] sm:leading-[2]"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={processViewport}
        transition={{ ...transition.reveal, delay: baseDelay + 0.05 }}
      >
        {step.body}
      </motion.p>
    </div>
  );
}

export function Process() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-charcoal py-24 text-cream sm:py-28 md:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cream/[0.06] to-transparent" />
      {!reducedMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_56%_34%_at_50%_8%,rgba(212,168,83,0.06),transparent_72%)]"
          animate={{ opacity: [0.45, 0.8, 0.45] }}
          transition={{ duration: 7.5, ease: "easeInOut", repeat: Infinity }}
          aria-hidden
        />
      )}

      <div className="mx-auto max-w-content px-5 md:px-8">
        {/* Header */}
        <motion.div
          className="mb-16 md:mb-24 lg:mb-28"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.0, ease: easeOut }}
        >
          <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.38em] text-gold/70 md:text-[15px]">
            How We Work
          </p>
          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end md:gap-12 lg:gap-16">
            <h2 className="font-display font-bold leading-[1.14] tracking-[-0.03em] text-cream">
              <span className="block text-[clamp(2.4rem,7vw,4.2rem)]">MEASURED</span>
              <span className="block text-[clamp(2.4rem,7vw,4.2rem)]">
                <em className="font-normal not-italic hero-pride">Process</em>
              </span>
            </h2>
            <p className="max-w-md text-[14px] leading-[2] text-cream/30 md:text-right md:text-[15px] md:leading-[1.95]">
              Five steps in order — each stage gates the next, from first conversation through dispatch.
            </p>
          </div>
        </motion.div>

        {/* Mobile / tablet — vertical timeline with stagger + rail draw */}
        <ol className="relative space-y-0 lg:hidden" aria-label="Production process steps in order">
          {steps.map((step, i) => {
            const isLast = i === steps.length - 1;
            const t0 = staggerDelay(i, 0.1);
            return (
              <motion.li
                key={step.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={processViewport}
                transition={{ ...transition.reveal, delay: t0 }}
                className="group/process-step flex gap-5 pb-12 sm:gap-6 sm:pb-14 md:pb-16"
              >
                <div className="flex w-11 shrink-0 flex-col items-center sm:w-12">
                  <motion.span
                    className="relative isolate flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-transparent bg-[linear-gradient(#0f0f0f,#0f0f0f)_padding-box,linear-gradient(135deg,rgba(212,168,83,0.78),rgba(250,247,242,0.28),rgba(185,28,28,0.52))_border-box] font-display text-[14px] font-bold tabular-nums text-gold/90 shadow-[0_0_0_1px_rgba(212,168,83,0.08),0_0_14px_rgba(212,168,83,0.22)] sm:h-12 sm:w-12 sm:text-[15px]"
                    initial={{ scale: 0.65, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={processViewport}
                    transition={{ ...springSnappy, delay: t0 + 0.02 }}
                    aria-hidden
                  >
                    <span
                      className="pointer-events-none absolute -inset-[5px] -z-10 rounded-full bg-[radial-gradient(circle,transparent_58%,rgba(212,168,83,0.34)_68%,rgba(250,247,242,0.2)_78%,rgba(185,28,28,0.24)_88%,transparent_100%)] opacity-0 blur-[4px] transition-opacity duration-300 ease-out group-hover/process-step:opacity-100"
                      aria-hidden
                    />
                    {step.number}
                  </motion.span>
                  {!isLast && (
                    <motion.div
                      className="mt-3 w-px flex-1 min-h-[2.5rem] origin-top bg-gradient-to-b from-gold/25 via-cream/[0.1] to-cream/[0.06]"
                      initial={{ scaleY: 0, opacity: 0 }}
                      whileInView={{ scaleY: 1, opacity: 1 }}
                      viewport={processViewport}
                      transition={{ duration: 0.55, ease: easeOut, delay: t0 + 0.1 }}
                      aria-hidden
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <motion.p
                    className="mb-2 text-[14px] font-medium uppercase tracking-[0.32em] text-gold/45"
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={processViewport}
                    transition={{ ...transition.fast, delay: t0 + 0.06 }}
                  >
                    Step {step.number} of 05
                  </motion.p>
                  <StepCopy step={step} baseDelay={t0 + 0.08} />
                  {!isLast && (
                    <motion.p
                      className="mt-8 text-[13px] font-medium uppercase tracking-[0.35em] text-gold/35 sm:mt-10"
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={processViewport}
                      transition={{ ...transition.fast, delay: t0 + 0.14 }}
                    >
                      Next
                    </motion.p>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ol>

        {/* Desktop — horizontal cascade + chevron nudge */}
        <div className="hidden lg:block">
          <ol className="m-0 flex list-none flex-row items-stretch p-0" aria-label="Production process steps in order">
            {steps.map((step, i) => {
              const isLast = i === steps.length - 1;
              const t0 = staggerDelay(i, 0.085);
              return (
                <motion.li
                  key={step.id}
                  className="flex min-w-0 flex-1 flex-row items-stretch"
                  initial={{ opacity: 0, y: 22, x: -12 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={processViewport}
                  transition={{ ...transition.reveal, delay: t0 }}
                >
                  <motion.article
                    className="group/process-step flex min-w-0 flex-1 flex-col"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    whileHover={reducedMotion ? undefined : { y: -3 }}
                    viewport={processViewport}
                    transition={{ duration: 0.35, ease: easeOut, delay: t0 + 0.02 }}
                  >
                    <div className="mb-6 flex items-center gap-3">
                      <motion.span
                        className="relative isolate flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-transparent bg-[linear-gradient(#0f0f0f,#0f0f0f)_padding-box,linear-gradient(135deg,rgba(212,168,83,0.78),rgba(250,247,242,0.28),rgba(185,28,28,0.52))_border-box] font-display text-[13px] font-bold tabular-nums text-gold/90 shadow-[0_0_0_1px_rgba(212,168,83,0.08),0_0_14px_rgba(212,168,83,0.22)] xl:h-11 xl:w-11 xl:text-[15px]"
                        initial={{ scale: 0.65, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={processViewport}
                        transition={{ ...springSnappy, delay: t0 + 0.04 }}
                        aria-hidden
                      >
                        <span
                          className="pointer-events-none absolute -inset-[5px] -z-10 rounded-full bg-[radial-gradient(circle,transparent_58%,rgba(212,168,83,0.34)_68%,rgba(250,247,242,0.2)_78%,rgba(185,28,28,0.24)_88%,transparent_100%)] opacity-0 blur-[4px] transition-opacity duration-300 ease-out group-hover/process-step:opacity-100"
                          aria-hidden
                        />
                        {step.number}
                      </motion.span>
                      <motion.div
                        className="h-px min-w-0 flex-1 origin-left bg-cream/[0.08]"
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileInView={{ scaleX: 1, opacity: 1 }}
                        viewport={processViewport}
                        transition={{ duration: 0.5, ease: easeOut, delay: t0 + 0.1 }}
                        aria-hidden
                      />
                    </div>
                    <motion.p
                      className="mb-2 text-[14px] font-medium uppercase tracking-[0.3em] text-gold/45"
                      initial={{ opacity: 0, x: 8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={processViewport}
                      transition={{ ...transition.fast, delay: t0 + 0.08 }}
                    >
                      Step {step.number} of 05
                    </motion.p>
                    <StepCopy step={step} baseDelay={t0 + 0.1} />
                  </motion.article>
                  {!isLast && (
                    <motion.div
                      className="flex w-9 shrink-0 flex-col items-center justify-start border-l border-cream/[0.06] pl-2 pt-10 min-[1200px]:w-11 min-[1200px]:pl-3 xl:pt-11"
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={processViewport}
                      transition={{ ...transition.reveal, delay: t0 + 0.12 }}
                      aria-hidden
                    >
                      <motion.div
                        initial={{ x: -6, opacity: 0.4 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        animate={reducedMotion ? undefined : { x: [0, 3, 0], opacity: [0.75, 1, 0.75] }}
                        viewport={processViewport}
                        transition={
                          reducedMotion
                            ? { type: "spring", stiffness: 320, damping: 20, delay: t0 + 0.14 }
                            : {
                                delay: t0 + 0.14,
                                x: { duration: 1.6, repeat: Infinity, ease: "easeInOut" },
                                opacity: { duration: 1.6, repeat: Infinity, ease: "easeInOut" },
                              }
                        }
                      >
                        <ChevronRight className="h-5 w-5 text-gold/40 xl:h-6 xl:w-6" strokeWidth={1.25} />
                      </motion.div>
                      <motion.span
                        className="mt-2 text-center text-[8px] font-medium uppercase leading-tight tracking-[0.28em] text-gold/30"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={processViewport}
                        transition={{ ...transition.fast, delay: t0 + 0.2 }}
                      >
                        next
                      </motion.span>
                    </motion.div>
                  )}
                </motion.li>
              );
            })}
          </ol>
        </div>

        {/* Outro CTA — single next-action so the section doesn't dead-end */}
        <motion.div
          className="mt-16 flex flex-col items-start gap-3 border-t border-cream/[0.06] pt-10 sm:flex-row sm:items-center sm:justify-between md:mt-20 md:pt-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <p className="max-w-md text-[13px] leading-[1.9] text-cream/40 md:text-[14px]">
            Have a brief in mind? Share specifications, timeline, and
            quantities — we respond within one business day.
          </p>
          <Link
            href="/contact"
            className="group/cta inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.3em] text-gold/80 transition-colors hover:text-gold"
          >
            Start a brief
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:translate-x-0.5" aria-hidden />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
