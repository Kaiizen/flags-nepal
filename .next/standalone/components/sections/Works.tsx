"use client";

import { WorkItemMedia } from "@/components/works/WorkItemMedia";
import { works, type WorkItem } from "@/lib/works";
import { easeOut, fadeUpTransition } from "@/lib/motion";
import { whatsappHref } from "@/lib/site";
import { motion } from "framer-motion";
import Link from "next/link";

function WorksProjectCard({
  project,
  index,
  mediaSizes,
  transitionOffset = 0,
}: {
  project: WorkItem;
  index: number;
  mediaSizes: string;
  transitionOffset?: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px", amount: 0.12 }}
      transition={fadeUpTransition(transitionOffset + index, 0.07)}
      className="group flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden rounded-sm border border-cream/[0.06] bg-cream/[0.02] transition-colors duration-500 hover:border-gold/20"
    >
      <div className="relative w-full shrink-0 overflow-hidden">
        <WorkItemMedia
          project={project}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          sizes={mediaSizes}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/15 to-transparent" />
      </div>

      <div className="flex min-h-[9rem] flex-1 flex-col border-t border-cream/[0.06] p-4 sm:min-h-[10.5rem] sm:p-5">
        <div className="mb-2.5 flex items-center gap-2">
          <span className="text-[14px] font-medium uppercase tracking-[0.25em] text-gold/50">
            {project.category}
          </span>
          <span className="text-cream/10">&middot;</span>
          <span className="text-[14px] font-medium tracking-[0.2em] text-cream/20">
            {project.year}
          </span>
        </div>
        <h3 className="font-display text-[1.1rem] font-bold leading-[1] tracking-[0.01em] text-cream">
          {project.title}
        </h3>
        <p className="mt-1 text-[13px] font-medium uppercase tracking-[0.15em] text-cream/25">
          {project.scope}
        </p>
        <p className="mt-3 line-clamp-2 text-[14px] leading-[1.8] text-cream/35">
          {project.description}
        </p>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
          {project.specs.slice(0, 2).map((spec) => (
            <span
              key={spec}
              className="rounded-full border border-cream/[0.06] px-2 py-0.5 text-[14px] font-medium tracking-wide text-cream/25"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

const FORGED_MEDIA_SIZES =
  "(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 100vw";

export function Works() {
  const featured = works[0];
  const grid = works.slice(1, 5);

  return (
    <section className="relative bg-charcoal py-20 text-cream sm:py-24 md:py-32">
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
            Selected Projects
          </p>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="font-display font-bold leading-[1.14] tracking-[-0.03em] text-cream">
              <span className="block text-[clamp(2.4rem,7vw,4.2rem)]">FORGED</span>
              <span className="block text-[clamp(2.4rem,7vw,4.2rem)]">
                <em className="font-normal not-italic hero-pride">Works</em>
              </span>
            </h2>
            <Link
              href="/works"
              className="group inline-flex w-max items-center gap-2 text-[13px] font-medium uppercase tracking-[0.3em] text-cream/30 transition-colors duration-300 hover:text-gold/70"
            >
              View all projects
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
              >
                &#8594;
              </span>
            </Link>
          </div>
        </motion.div>

        {/* Featured — horizontal card with rich detail */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-56px", amount: 0.12 }}
          transition={fadeUpTransition(0, 0)}
          className="group overflow-hidden rounded-sm border border-cream/[0.06]"
        >
          <div className="flex flex-col md:flex-row md:items-stretch">
            <div className="relative aspect-square overflow-hidden bg-charcoal md:aspect-auto md:w-[50%]">
              <WorkItemMedia
                layout="inset"
                project={featured}
                className="object-contain object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            <div className="flex flex-col justify-center border-t border-cream/[0.06] p-6 sm:p-8 md:w-[50%] md:border-l md:border-t-0 md:p-10 lg:p-14">
              <div className="mb-5 flex items-center gap-3 md:mb-6">
                <span className="text-[13px] font-medium uppercase tracking-[0.3em] text-gold/60">
                  {featured.category}
                </span>
                <span className="text-cream/15">&middot;</span>
                <span className="text-[13px] font-medium uppercase tracking-[0.3em] text-cream/25">
                  {featured.year}
                </span>
              </div>

              <h3 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[0.9] tracking-[-0.02em] text-cream">
                {featured.title}
              </h3>

              <p className="mt-2 text-[13px] font-medium uppercase tracking-[0.2em] text-cream/30">
                {featured.scope}
              </p>

              <div className="my-5 h-px w-10 bg-gold/20 md:my-6" />

              <p className="max-w-md text-[13px] leading-[1.95] text-cream/45 sm:text-[14px]">
                {featured.description}
              </p>

              {/* Specs */}
              <div className="mt-6 flex flex-wrap gap-2 md:mt-8">
                {featured.specs.map((spec) => (
                  <span
                    key={spec}
                    className="rounded-full border border-cream/[0.08] px-3 py-1 text-[13px] font-medium tracking-wide text-cream/35"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.article>

        {/* Four equal project cards: same width, same media frame (WorkItemMedia), aligned rows */}
        <div className="mt-4 grid grid-cols-1 items-stretch gap-4 sm:mt-5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {grid.map((project, index) => (
            <div key={project.slug} className="min-w-0">
              <WorksProjectCard
                project={project}
                index={index}
                mediaSizes={FORGED_MEDIA_SIZES}
                transitionOffset={0}
              />
            </div>
          ))}
        </div>

        {/* Outro CTAs — view the full archive OR order what you see */}
        <motion.div
          className="mt-14 flex flex-col items-start gap-4 border-t border-cream/[0.06] pt-10 sm:flex-row sm:items-center sm:justify-between md:mt-16 md:pt-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <Link
            href="/works"
            className="group/cta inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.3em] text-cream/60 transition-colors hover:text-gold"
          >
            View all projects
            <span
              aria-hidden
              className="inline-block transition-transform duration-300 ease-out group-hover/cta:translate-x-1"
            >
              &#8594;
            </span>
          </Link>
          <a
            href={whatsappHref("Hi Flags Nepal, I saw your work and I'd like to order something similar.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.3em] text-cream/40 transition-colors duration-300 hover:text-gold"
          >
            Order what you see on WhatsApp
            <span aria-hidden>&#8594;</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
