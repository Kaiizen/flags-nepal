import { NepalFlagWatermark } from "@/components/icons/NepalFlag";
import { Button } from "@/components/ui/Button";
import {
  flagGuideGallery,
  flagGuideGeometryFacts,
  flagGuidePullQuote,
  flagGuideSymbols,
  flagGuideTimeline,
  flagsNepalReferenceAsset,
  wikimediaOfficialFlag,
  wikipediaAttribution,
} from "@/lib/nepal-flag-guide";
import { cn } from "@/lib/cn";
import { neFace } from "@/lib/nepali-labels";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nepal's Flag Guide — History, Meaning & Official Proportions",
  description:
    "Nepal’s flag guide: double-pennon history, symbolism from Wikipedia’s Flag of Nepal article, Schedule 1 geometry, downloadable studio reference, and mirrored Wikimedia Commons imagery with attribution.",
  alternates: {
    canonical: "/nepal-flag-proportions",
  },
  keywords: [
    "Nepal flag guide",
    "Nepal flag history Wikipedia",
    "Nepal flag proportions",
    "Schedule 1 Nepal flag",
    "Flag of Nepal Commons",
    "double pennon Nepal",
  ],
  openGraph: {
    title: "Nepal's Flag Guide | Flags Nepal",
    description:
      "History, symbolism, Wikimedia Commons diagrams, and Flags Nepal’s printable reference — anchored to Schedule 1 geometry.",
  },
};

const symbolTint = {
  crimson: "border-crimson/20 bg-crimson/[0.07]",
  blue: "border-deep-blue/25 bg-deep-blue/[0.08]",
  gold: "border-gold/30 bg-gold/[0.09]",
  charcoal: "border-charcoal/12 bg-charcoal/[0.04]",
} as const;

/** Shared media well for the two top cards — equal flex growth + min height for symmetry. */
const referencePairMediaClass =
  "flex min-h-[280px] flex-1 basis-0 flex-col items-center justify-center px-4 py-4 md:min-h-[320px] md:px-5 md:py-5 lg:min-h-[360px]";

/** Official vector sits in a hoist-heavy SVG viewBox — a bit more horizontal padding reads as centred in the panel. */
const referencePairMediaClassVector =
  "flex min-h-[280px] flex-1 basis-0 flex-col items-center justify-center px-6 py-4 md:min-h-[320px] md:px-9 md:py-5 lg:min-h-[360px]";

const referencePairHeaderClass =
  "flex min-h-[9.5rem] flex-col justify-start border-b border-charcoal/[0.06] px-5 py-4 md:min-h-[10.5rem] md:px-7";

const referencePairFooterShell = "mt-auto flex min-h-[5.25rem] border-t px-5 py-4 md:px-7 md:py-5";

export default function NepalFlagProportionsPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Nepal's flag guide",
        item: `${siteConfig.url}/nepal-flag-proportions`,
      },
    ],
  };

  return (
    <div className="bg-cream text-charcoal">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="relative overflow-hidden bg-charcoal pb-16 pt-24 text-cream md:pb-20 md:pt-28">
        <NepalFlagWatermark className="absolute -right-4 top-1/2 h-[min(90vw,420px)] w-auto -translate-y-1/2 opacity-40 md:right-8 md:h-[480px]" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -bottom-px h-24 bg-gradient-to-b from-transparent to-cream/8"
        />
        <div className="page-container relative">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.3em] text-cream/40"
          >
            <Link href="/" className="transition-colors hover:text-gold">
              Home
            </Link>
            <span aria-hidden className="text-cream/20">
              /
            </span>
            <span className="text-gold/80">Nepal&apos;s flag guide</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
            <div>
              <p lang="ne" className={cn("mb-4 text-gold/80", neFace)}>
                नेपालको झण्डा — इतिहास, अर्थ र आधिकारिक अनुपात
              </p>
              <h1 className="font-display font-bold leading-[1.1] tracking-[-0.03em]">
                <span className="block text-[clamp(2.3rem,6.5vw,4rem)]">NEPAL&apos;S FLAG</span>
                <span className="mt-1 block text-[clamp(1.9rem,4.5vw,2.75rem)] font-normal text-cream/88">
                  History, meaning &amp; true proportions
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-[15px] leading-[1.85] text-cream/55">
                The world&apos;s only sovereign non-rectangular flag — crimson, cobalt, and lunar–solar emblems locked by
                constitutional geometry. This guide blends{" "}
                <a
                  href={wikipediaAttribution.articleUrl}
                  className="text-gold/90 underline decoration-gold/35 underline-offset-2 transition-colors hover:text-cream"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Wikipedia&apos;s Flag of Nepal article
                </a>
                , mirrored Commons artwork, and Flags Nepal&apos;s downloadable studio sheet.
              </p>
            </div>
            <div className="flex justify-start lg:justify-end">
              <div className="flex max-w-[19.5rem] items-start gap-4 rounded-md border border-cream/25 bg-charcoal px-5 py-5 shadow-[0_14px_48px_rgba(0,0,0,0.45)] ring-1 ring-inset ring-white/[0.08]">
                {/* Official Commons vector — matches copy; avoids decorative “hexagon” misread */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={wikimediaOfficialFlag.src}
                  alt=""
                  width={78}
                  height={95}
                  className="h-[5.5rem] w-auto shrink-0 object-contain [filter:drop-shadow(0_2px_8px_rgba(0,0,0,0.35))]"
                />
                <div className="min-w-0 flex-1 text-left">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-gold/75">Double pennon</p>
                  <p className="mt-1.5 font-display text-lg leading-tight text-cream">Unique outline</p>
                  <p className="mt-2 text-[12px] leading-snug text-cream/50">
                    Two stacked crimson wedges with sun and moon emblems — the only national flag that is not a rectangle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-container pb-24 pt-12 md:pb-32 md:pt-16">
        <aside className="rounded-sm border border-gold/35 bg-gold/[0.07] px-5 py-5 md:px-8 md:py-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-charcoal/50">Source · Wikipedia</p>
          <p className="mt-2 text-[14px] leading-[1.85] text-charcoal/[0.62]">
            Narrative summaries track the English article{" "}
            <a
              href={wikipediaAttribution.articleUrl}
              className="font-medium text-charcoal underline decoration-gold/45 underline-offset-[3px] hover:text-gold"
              target="_blank"
              rel="noopener noreferrer"
            >
              {wikipediaAttribution.articleTitle}
            </a>
            . {wikipediaAttribution.licenseNote}{" "}
            <a
              href={wikimediaOfficialFlag.commonsUrl}
              className="font-medium text-charcoal underline decoration-gold/35 underline-offset-[3px] hover:text-gold"
              target="_blank"
              rel="noopener noreferrer"
            >
              Wikimedia Commons
            </a>{" "}
            files credited per image. Always verify state work against{" "}
            <a
              href="https://lawcommission.gov.np/"
              className="font-medium text-charcoal underline decoration-gold/35 underline-offset-[3px] hover:text-gold"
              target="_blank"
              rel="noopener noreferrer"
            >
              Nepal Law Commission
            </a>{" "}
            originals.
          </p>
        </aside>

        <section className="mt-12 grid gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-8" aria-labelledby="reference-heading">
          <article className="flex h-full min-h-0 flex-col overflow-hidden rounded-sm border border-charcoal/[0.08] bg-white shadow-[0_10px_36px_rgba(15,15,15,0.05)]">
            <div className={referencePairHeaderClass}>
              <h2 id="reference-heading" className="font-display text-xl font-bold">
                {flagsNepalReferenceAsset.title}
              </h2>
              <p className="mt-2 text-[13px] leading-[1.8] text-charcoal/48">{flagsNepalReferenceAsset.caption}</p>
            </div>
            <div data-protected="true" className={cn(referencePairMediaClass, "bg-charcoal/[0.03]")}>
              <div className="flex min-h-0 w-full max-w-full flex-1 flex-col items-center justify-center">
                <Image
                  src={flagsNepalReferenceAsset.previewSrc}
                  alt="Flags Nepal Nepal flag construction reference sheet from provided PDF"
                  width={1600}
                  height={1131}
                  className="mx-auto block h-auto max-h-[min(54vh,460px)] w-auto max-w-[calc(100%-4px)] object-contain object-center"
                  sizes="(min-width: 1024px) 460px, 92vw"
                  priority
                />
              </div>
            </div>
            <div
              className={cn(
                referencePairFooterShell,
                "flex-row flex-wrap items-center gap-3 border-charcoal/[0.05]",
              )}
            >
              <a
                href={flagsNepalReferenceAsset.pdfHref}
                download
                className="inline-flex rounded-full border border-charcoal/15 bg-cream px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal/70 transition-colors hover:border-gold/50 hover:text-charcoal"
              >
                Download PDF
              </a>
              <span className="text-[12px] text-charcoal/38">
                From your supplied PDF — downloadable above for offline reference.
              </span>
            </div>
          </article>

          <article className="flex h-full min-h-0 flex-col overflow-hidden rounded-sm border border-charcoal/[0.08] bg-white shadow-[0_10px_36px_rgba(15,15,15,0.05)]">
            <div className={referencePairHeaderClass}>
              <h2 className="font-display text-xl font-bold">Official vector (Commons)</h2>
              <p className="mt-2 text-[13px] leading-[1.8] text-charcoal/48">
                SVG coded to the 1990 Schedule&nbsp;1 engineering notes embedded in the SVG metadata — ideal for lossless
                previews.
              </p>
            </div>
            <figure className={cn(referencePairMediaClassVector, "m-0 bg-deep-blue/[0.06]")}>
              {/* Hoist-heavy viewBox — cap width first, generous padding, true center so the wedge reads balanced in the panel. */}
              <div className="flex min-h-0 w-full max-w-full flex-1 flex-col items-center justify-center py-6 md:py-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={wikimediaOfficialFlag.src}
                  alt="Official vector construction of the Nepal national flag (Wikimedia Commons)."
                  width={726}
                  height={885}
                  className="mx-auto block h-auto w-auto max-w-[min(15rem,calc(100%-1.25rem))] max-h-[min(44vh,360px)] object-contain object-center sm:max-w-[16rem] md:max-w-[17rem] md:max-h-[min(46vh,380px)]"
                />
              </div>
            </figure>
            <figcaption
              className={cn(
                referencePairFooterShell,
                "flex-col justify-center border-charcoal/[0.06] text-[12px] leading-[1.75] text-charcoal/45",
              )}
            >
              <a
                href={wikimediaOfficialFlag.commonsUrl}
                className="text-gold underline decoration-gold/35 underline-offset-2 hover:text-charcoal"
                target="_blank"
                rel="noopener noreferrer"
              >
                {wikimediaOfficialFlag.commonsTitle}
              </a>{" "}
              — Wikimedia Commons (vector).
            </figcaption>
          </article>
        </section>

        <blockquote className="relative mt-12 border-l-[3px] border-gold bg-white px-6 py-7 shadow-[0_10px_40px_rgba(15,15,15,0.06)] md:px-10 md:py-9">
          <p className="font-display text-[1.35rem] leading-snug text-charcoal md:text-[1.55rem] md:leading-tight">
            &ldquo;{flagGuidePullQuote}&rdquo;
          </p>
          <footer className="mt-4 text-[12px] font-medium uppercase tracking-[0.2em] text-charcoal/35">Flags Nepal workshop note</footer>
        </blockquote>

        <section className="content-vis-auto mt-16 md:mt-20" aria-labelledby="flag-history-heading">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p lang="ne" className={cn("mb-3 text-gold", neFace)}>
                इतिहासको संक्षिप्त रेखाचित्र
              </p>
              <h2 id="flag-history-heading" className="font-display text-3xl font-bold tracking-[-0.02em] md:text-[2.125rem]">
                Highlights from Himalayan vexillology
              </h2>
            </div>
            <p className="max-w-md text-[13px] leading-[1.85] text-charcoal/48 md:text-right">
              Condensed from the Wikipedia-led chronology above — lengthen any era with archival dates as you finalize in-house research.
            </p>
          </div>

          <ol className="mt-10 space-y-8 md:mt-14 md:space-y-0">
            {flagGuideTimeline.map((entry, index) => {
              const isFirst = index === 0;
              const isLast = index === flagGuideTimeline.length - 1;
              return (
                <li
                  key={entry.title}
                  className={cn(
                    "grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,11.5rem)_1.25rem_minmax(0,1fr)] md:items-stretch md:gap-x-5",
                    !isLast && "md:pb-10",
                  )}
                >
                  <div className="hidden min-w-0 md:block md:max-w-[11.5rem] md:justify-self-end md:pt-8 md:pr-2">
                    <time className="block text-balance text-right font-display text-[12.5px] font-semibold uppercase leading-snug tracking-[0.12em] text-gold/90">
                      {entry.period}
                    </time>
                  </div>
                  <div className="relative hidden min-h-[3rem] md:block" aria-hidden>
                    {!isFirst ? (
                      <span className="absolute left-1/2 top-0 h-8 w-px -translate-x-1/2 bg-charcoal/15" />
                    ) : null}
                    <span className="absolute left-1/2 top-8 z-[1] h-3 w-3 -translate-x-1/2 rounded-full border-2 border-gold/90 bg-cream shadow-[0_0_0_4px_rgba(212,168,83,0.12)]" />
                    {!isLast ? (
                      <span className="absolute left-1/2 top-[calc(2.5rem-1px)] bottom-0 w-px -translate-x-1/2 bg-charcoal/15" />
                    ) : null}
                  </div>
                  <article className="rounded-sm border border-charcoal/[0.07] bg-white px-6 py-6 shadow-[0_8px_28px_rgba(15,15,15,0.045)] md:px-8 md:py-7">
                    <p className="mb-3 font-display text-xs font-semibold uppercase tracking-[0.22em] text-gold md:hidden">
                      {entry.period}
                    </p>
                    <h3 className="font-display text-xl font-bold text-charcoal md:text-[1.35rem]">{entry.title}</h3>
                    <p className="mt-3 text-[14px] leading-[1.9] text-charcoal/[0.52]">{entry.body}</p>
                  </article>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="mt-16 md:mt-24" aria-labelledby="flag-symbols-heading">
          <p lang="ne" className={cn("mb-3 text-gold", neFace)}>
            रङ र प्रतीक
          </p>
          <h2 id="flag-symbols-heading" className="font-display text-3xl font-bold tracking-[-0.02em] md:text-[2.125rem]">
            Meaning in crimson, blue, moon, and sun
          </h2>
          <p className="mt-3 max-w-2xl text-[14px] leading-[1.85] text-charcoal/48">
            Multiple readings coexist — we list the encyclopaedic summaries most often quoted in classrooms and diplomacy.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:items-stretch">
            {flagGuideSymbols.map((card) => (
              <article
                key={card.title}
                className={cn("flex h-full min-h-0 flex-col rounded-sm border p-6 md:p-7", symbolTint[card.tint])}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-charcoal/45">{card.label}</p>
                <h3 className="mt-2 font-display text-xl font-bold text-charcoal">{card.title}</h3>
                <p className="mt-3 flex-1 text-[13px] leading-[1.85] text-charcoal/[0.55]">{card.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-sm bg-charcoal px-6 py-9 text-cream md:mt-20 md:px-10 md:py-11" aria-labelledby="geometry-heading">
          <p lang="ne" className={cn("text-gold/75", neFace)}>
            ज्यामिति र अन्तर्राष्ट्रिय प्रयोग
          </p>
          <h2 id="geometry-heading" className="mt-2 font-display text-2xl font-bold md:text-3xl">
            Where the math surprises visitors
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3 md:items-stretch">
            {flagGuideGeometryFacts.map((fact) => (
              <article key={fact.title} className="flex h-full min-h-0 flex-col rounded-sm border border-cream/12 bg-cream/[0.04] p-5 md:p-6">
                <h3 className="font-display text-lg text-gold">{fact.title}</h3>
                <p className="mt-3 flex-1 text-[13px] leading-[1.85] text-cream/50">{fact.body}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 text-[13px] leading-[1.85] text-cream/45">
            Statute text:{" "}
            <a
              href="https://en.wikipedia.org/wiki/Flag_of_Nepal#Aspect_ratio"
              className="text-gold/90 underline decoration-gold/35 underline-offset-2 hover:text-cream"
              target="_blank"
              rel="noopener noreferrer"
            >
              Wikipedia — Aspect ratio
            </a>{" "}
            (with primary citations) and{" "}
            <a
              href="https://oeis.org/A230582"
              className="text-gold/90 underline decoration-gold/35 underline-offset-2 hover:text-cream"
              target="_blank"
              rel="noopener noreferrer"
            >
              OEIS A230582
            </a>
            .
          </p>
        </section>

        <section className="mt-16 md:mt-20" aria-labelledby="gallery-heading">
          <p lang="ne" className={cn("mb-3 text-gold", neFace)}>
            विकिमिडिया कमन्स · ऐतिहासिक दृश्य
          </p>
          <h2 id="gallery-heading" className="font-display text-3xl font-bold tracking-[-0.02em] md:text-[2.125rem]">
            Historical plates &amp; diagrams
          </h2>
          <p className="mt-3 max-w-2xl text-[14px] leading-[1.85] text-charcoal/48">
            Raster and vector mirrors stored locally for fast delivery; always follow the Commons licence (typically public domain or
            CC&nbsp;BY-SA) when redistributing derivatives.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 sm:items-stretch">
            {flagGuideGallery.map((item) => (
              <figure
                key={item.src}
                className="flex h-full min-h-0 flex-col overflow-hidden rounded-sm border border-charcoal/[0.08] bg-white shadow-[0_8px_28px_rgba(15,15,15,0.05)]"
              >
                <div className="flex min-h-[3.25rem] flex-none items-center border-b border-charcoal/[0.06] px-4 py-3 md:min-h-[3.5rem]">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">{item.label}</span>
                </div>
                <div className="relative h-[280px] w-full flex-none bg-charcoal/[0.03] sm:h-[300px] lg:h-[320px]">
                  {item.kind === "raster" ? (
                    <Image src={item.src} alt={item.alt} fill className="object-contain p-4" sizes="(min-width: 640px) 40vw, 92vw" />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="absolute inset-0 m-auto block h-full max-h-full w-full max-w-[calc(100%-2rem)] object-contain p-4"
                      width={240}
                      height={280}
                    />
                  )}
                </div>
                <figcaption className="mt-auto flex flex-col space-y-2 px-4 py-4 text-[13px] leading-[1.8] text-charcoal/50 md:min-h-[7.5rem]">
                  <p>{item.caption}</p>
                  <a
                    href={item.commonsFileUrl}
                    className="inline-flex text-gold underline decoration-gold/35 underline-offset-2 hover:text-charcoal"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View file on Wikimedia Commons
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="mt-14 md:mt-16" aria-labelledby="sizes-heading">
          <h2 id="sizes-heading" className="font-display text-2xl font-bold md:text-[1.85rem]">
            Practical sizing for real rooms
          </h2>
          <p className="mt-2 max-w-xl text-[14px] text-charcoal/45">
            Bands we quote daily in Bagbazar — every size still honours the same aspect when artwork is prepared from Schedule&nbsp;1
            sources.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3 md:items-stretch">
            {[
              { title: "Desk display", detail: "5 to 9 inch formats with proportion-safe scaling on stands.", tag: "Indoor" },
              { title: "Ceremony & stage", detail: "2–5 ft systems with reinforced hems and hoist patches.", tag: "Formal" },
              { title: "Outdoor hoisting", detail: "Fabrics chosen for gust load plus double-stitched fly ends.", tag: "Outdoor" },
            ].map((item) => (
              <article
                key={item.title}
                className="flex h-full min-h-0 flex-col rounded-sm border border-charcoal/[0.08] bg-white p-6 shadow-[0_8px_28px_rgba(15,15,15,0.04)]"
              >
                <span className="inline-flex w-fit rounded-full border border-gold/25 bg-gold/[0.08] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/90">
                  {item.tag}
                </span>
                <h3 className="mt-4 font-display text-xl text-charcoal">{item.title}</h3>
                <p className="mt-2 flex-1 text-[13px] leading-[1.8] text-charcoal/48">{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-sm border border-charcoal/[0.08] bg-gradient-to-br from-white to-cream/40 p-8 shadow-[0_10px_36px_rgba(15,15,15,0.05)] md:mt-16 md:flex md:items-center md:justify-between md:p-10">
          <div>
            <p lang="ne" className={cn("text-gold", neFace)}>
              अब उत्पादनतर्फ
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold">Need proofs before you hoist?</h3>
            <p className="mt-3 max-w-xl text-[14px] leading-[1.9] text-charcoal/48">
              Send finish sizes and quantities — we&apos;ll reconcile artwork with statutory geometry before any fabric ships.
            </p>
          </div>
          <div className="mt-8 flex shrink-0 flex-col gap-3 sm:flex-row md:mt-0 md:ml-10">
            <Button href="/contact" variant="primary" className="text-xs uppercase tracking-[0.16em]">
              Request dimensions
            </Button>
            <Button href="/shop" variant="inverse" className="text-xs uppercase tracking-[0.16em]">
              Browse catalogue
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
