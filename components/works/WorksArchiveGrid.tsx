"use client";

import { NepalFlagWatermark } from "@/components/icons/NepalFlag";
import { WorkItemMedia } from "@/components/works/WorkItemMedia";
import { cn } from "@/lib/cn";
import { fadeUpTransition } from "@/lib/motion";
import { works, type WorkItem } from "@/lib/works";
import { motion } from "framer-motion";
import Link from "next/link";

function WorkArchiveCard({
  project,
  index,
  titleSize,
  videoFrameClassName,
}: {
  project: WorkItem;
  index: number;
  titleSize: string;
  videoFrameClassName?: string;
}) {
  const isVideo = Boolean(project.video);
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-56px", amount: 0.2 }}
      transition={fadeUpTransition(index, 0.06)}
      className="group min-w-0"
    >
      <div className="relative overflow-hidden rounded-sm border border-cream/[0.06] bg-cream/[0.02]">
        <WorkItemMedia
          project={project}
          frameClassName={isVideo ? videoFrameClassName : undefined}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/18 to-transparent opacity-88 transition-opacity duration-500 group-hover:opacity-92" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 text-cream sm:p-5 md:p-6">
          <div className="min-w-0">
            <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-gold/60">
              {project.category}
            </p>
            <h2
              className={`mt-1 min-w-0 break-words font-display leading-[0.92] tracking-[0.03em] text-cream sm:mt-1.5 ${titleSize}`}
            >
              {project.title}
            </h2>
            <Link
              href="/contact"
              className="group/cta mt-2 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-cream/70 transition-colors hover:text-gold sm:mt-3 sm:text-[15px]"
            >
              Discuss a similar build
              <span
                aria-hidden
                className="transition-transform duration-300 ease-out group-hover/cta:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
          <p className="hidden text-sm font-medium tracking-[0.1em] text-cream/30 sm:block">
            {String(index + 2).padStart(2, "0")}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

function FlagBannerCard({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-56px", amount: 0.2 }}
      transition={fadeUpTransition(index, 0.06)}
      className="relative overflow-hidden rounded-sm border border-cream/[0.06] bg-cream/[0.03]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(212,168,83,0.06),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(212,168,83,0.04),transparent_55%)]" />
      <NepalFlagWatermark className="absolute -bottom-4 right-0 h-36 w-36 translate-x-1/4 text-cream/[0.04] sm:h-44 sm:w-44 md:h-52 md:w-52 lg:h-60 lg:w-60" />
      <NepalFlagWatermark className="absolute -top-2 left-0 h-20 w-20 -translate-x-1/4 rotate-[18deg] text-cream/[0.03] md:h-28 md:w-28" />
      <div className="relative flex flex-col justify-between gap-5 p-5 sm:p-6 md:min-h-[160px] md:flex-row md:items-end md:p-8 lg:p-10">
        <div className="max-w-[36rem]">
          <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-gold/70 sm:text-[15px]">
            Direct Fabric Printing
          </p>
          <p className="mt-2.5 font-display text-[clamp(1.3rem,2.6vw,2.3rem)] leading-[0.95] tracking-[0.03em] text-cream sm:mt-3">
            First in Nepal to print directly on banners and clothes.
          </p>
        </div>
        <div className="flex flex-col items-start gap-4 md:items-end">
          <p className="max-w-[22rem] text-[14px] leading-[1.7] text-cream/40 sm:text-[15px] md:text-right">
            Premium fabric production with sharper detail, richer colour, and a
            finish built for display and wear.
          </p>
          <Link
            href="/contact"
            className="group/cta inline-flex items-center gap-2 rounded-sm border border-gold/20 px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-cream/90 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold hover:text-cream sm:px-5 sm:py-2.5 sm:text-[15px]"
          >
            Get a Quote
            <span
              aria-hidden
              className="transition-transform duration-300 ease-out group-hover/cta:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

const TITLE_LG = "text-[clamp(1.4rem,2.8vw,2.5rem)]";
const TITLE_MD = "text-[clamp(1.25rem,2.2vw,2rem)]";

export function WorksArchiveGrid() {
  const [featured, ...rest] = works;

  const row1 = rest.slice(0, 2);
  const row2 = rest.slice(2, 5);
  const row3 = rest.slice(5);

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-5">
      <motion.article
        key={featured.slug}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px", amount: 0.2 }}
        transition={fadeUpTransition(0, 0)}
        className="group min-w-0"
      >
        <div className="relative h-[min(40vh,320px)] min-h-[240px] overflow-hidden rounded-sm border border-cream/[0.06] bg-charcoal sm:min-h-[280px] sm:h-[min(38vh,360px)] md:min-h-[300px] md:h-[min(36vh,400px)] lg:min-h-[360px] lg:h-[min(50vh,480px)]">
          <WorkItemMedia
            layout="inset"
            project={featured}
            className="object-contain object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/18 to-transparent opacity-88 transition-opacity duration-500 group-hover:opacity-92" />
          <div className="absolute left-4 top-4 rounded-full border border-gold/20 bg-charcoal/40 px-3 py-1 text-[13px] font-semibold uppercase tracking-[0.14em] text-gold/80 backdrop-blur md:left-5 md:top-5">
            Featured Project
          </div>
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 text-cream sm:p-5 md:p-6">
            <div className="min-w-0">
              <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-gold/60">
                {featured.category}
              </p>
              <h2 className="mt-1 min-w-0 break-words font-display text-[clamp(1.6rem,4.6vw,3.4rem)] leading-[0.92] tracking-[0.03em] text-cream sm:mt-1.5">
                {featured.title}
              </h2>
              <Link
                href="/contact"
                className="group/cta mt-2 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-cream/70 transition-colors hover:text-gold sm:mt-3 sm:text-[15px]"
              >
                Discuss a similar build
                <span
                  aria-hidden
                  className="transition-transform duration-300 ease-out group-hover/cta:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
            <p className="hidden text-sm font-medium tracking-[0.1em] text-cream/30 sm:block">
              01
            </p>
          </div>
        </div>
      </motion.article>

      <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2 sm:gap-4">
        {row1.map((project, i) => (
          <WorkArchiveCard
            key={project.slug}
            project={project}
            index={i}
            titleSize={TITLE_LG}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
        {row2.map((project, i) => (
          <WorkArchiveCard
            key={project.slug}
            project={project}
            index={i + row1.length}
            titleSize={TITLE_MD}
          />
        ))}
      </div>

      {row3.length > 0 && (
        <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2 sm:gap-4">
          {row3.map((project, i) => (
            <WorkArchiveCard
              key={project.slug}
              project={project}
              index={i + row1.length + row2.length}
              titleSize={TITLE_LG}
            />
          ))}
        </div>
      )}

      <FlagBannerCard index={rest.length} />
    </div>
  );
}
