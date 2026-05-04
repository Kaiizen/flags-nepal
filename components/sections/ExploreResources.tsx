import Link from "next/link";

const links = [
  {
    href: "/nepal-flag-proportions",
    title: "Nepal flag proportions",
    description:
      "Official two-pennon geometry, sizing for desk and ceremony, and what to check before printing.",
  },
  {
    href: "/services",
    title: "Flag & print services",
    description:
      "Custom flags, foil, paper, jerseys, and banners — from consultation through delivery in Kathmandu.",
  },
  {
    href: "/shop",
    title: "Catalogue & stands",
    description:
      "Table stands, golden desk sets, outdoor hardware, and hand flags ready to ship across Nepal.",
  },
  {
    href: "/works",
    title: "Recent work",
    description: "Ceremonial installs, retail displays, and campaign pieces from our studio.",
  },
  {
    href: "/contact",
    title: "Bulk & custom quotes",
    description: "Share quantities and timeline for institutional, club, or corporate orders.",
  },
] as const;

/**
 * Static internal links for crawlers and users — deepens topical connections without a blog CMS.
 */
export function ExploreResources() {
  return (
    <section
      id="guides-resources"
      className="content-vis-auto relative scroll-mt-36 border-t border-cream/[0.06] bg-charcoal py-16 text-cream sm:py-20 md:py-24"
      aria-labelledby="explore-resources-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cream/[0.06] to-transparent" />

      <div className="mx-auto max-w-content px-5 md:px-8">
        <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.38em] text-gold/70 md:text-[11px]">
          Guides &amp; next steps
        </p>
        <h2
          id="explore-resources-heading"
          className="font-display text-[clamp(1.75rem,4.5vw,2.5rem)] font-bold leading-[1.15] tracking-[-0.03em] text-cream"
        >
          Explore <em className="font-normal not-italic hero-pride">resources</em>
        </h2>
        <p className="mt-4 max-w-2xl text-[13px] leading-[1.9] text-cream/35 md:text-[14px]">
          Authoritative pages on geometry, services, and ordering — linked from the homepage so search
          engines and visitors can move from intent to action.
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {links.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group block h-full rounded-sm border border-cream/[0.08] bg-cream/[0.02] p-5 transition-[border-color,background-color] duration-300 hover:border-gold/25 hover:bg-cream/[0.04] md:p-6"
              >
                <span className="font-display text-lg font-semibold tracking-[-0.02em] text-cream/90 transition-colors group-hover:text-gold">
                  {item.title}
                </span>
                <span className="mt-2 block text-[12px] leading-[1.75] text-cream/40 md:text-[13px]">
                  {item.description}
                </span>
                <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-[0.22em] text-gold/60 transition-colors group-hover:text-gold">
                  Open
                  <span aria-hidden className="translate-y-px">
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
