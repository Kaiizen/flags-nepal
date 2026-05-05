import { Button } from "@/components/ui/Button";
import { ServicesFaq } from "@/components/services/ServicesFaq";
import { Services } from "@/components/sections/Services";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { servicesFaqItems } from "@/lib/services-faq";
import { ne, neFace } from "@/lib/nepali-labels";
import { siteConfig } from "@/lib/site";
import type { Metadata } from "next";

const journey = [
  {
    step: "01",
    title: "Share",
    subtitle: "Requirement intake",
    copy: "Tell us what you need to print, quantity, dimensions, and timeline. We map the service line first so the scope is accurate from day one.",
    outcome: "Outcome: category fit + clear brief.",
  },
  {
    step: "02",
    title: "Recommend",
    subtitle: "Material & finish direction",
    copy: "We suggest substrate, print method, and finish quality based on use case: ceremony, storefront, campaign, indoor display, or sportswear.",
    outcome: "Outcome: practical spec and cost path.",
  },
  {
    step: "03",
    title: "Approve",
    subtitle: "Artwork check & confirmation",
    copy: "Layout, colors, names, numbers, logos, and foil areas are reviewed before print so there are no surprises at delivery.",
    outcome: "Outcome: locked artwork and timeline.",
  },
  {
    step: "04",
    title: "Produce",
    subtitle: "Print, quality check, and delivery",
    copy: "Your order moves through production with quality checks at finishing, then dispatch or handover with setup guidance where needed.",
    outcome: "Outcome: ready-to-use output delivered on schedule.",
  },
] as const;

const servicesDesc =
  "Custom flag printing, gold and silver foil printing, paper printing, jersey customization, and advertisement banner printing in Kathmandu, Nepal — from brief to delivery.";

export const metadata: Metadata = {
  title: "Flag Printing Services in Kathmandu, Nepal",
  description: servicesDesc,
  alternates: {
    canonical: "/services",
  },
  keywords: [
    "flag printing Nepal",
    "flag printing Kathmandu",
    "custom flag printing Nepal",
    "gold and silver foil printing Kathmandu",
    "paper printing Kathmandu",
    "banner printing Kathmandu",
    "jersey customization printing Kathmandu",
  ],
  openGraph: {
    title: "Flag Printing & Banner Services in Kathmandu | Flags Nepal",
    description: servicesDesc,
  },
  twitter: {
    title: "Services | Flags Nepal",
    description: servicesDesc,
  },
};

export default function ServicesPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteConfig.url}/services` },
    ],
  };

  const servicesFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: servicesFaqItems.map((item) => ({
      "@type": "Question",
      name: item.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.content,
      },
    })),
  };

  return (
    <div className="page-shell-light">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesFaqSchema) }} />
      <div className="page-container">
        {/* Header */}
        <Reveal initialY={16}>
          <p lang="ne" className={cn("mb-4 text-gold", neFace)}>
            {ne.services}
          </p>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h1 className="font-display font-bold leading-[1.14] tracking-[-0.03em] text-charcoal">
              <span className="block text-[clamp(2.4rem,7vw,4.2rem)]">CAPABILITY</span>
              <span className="block text-[clamp(2.4rem,7vw,4.2rem)]">
                <em className="font-normal not-italic hero-pride">Map</em>
              </span>
            </h1>
            <p className="max-w-sm text-[13px] leading-[1.9] text-charcoal/40 md:text-right md:text-[14px]">
              Custom flag, foil, paper, jersey, and banner services shown in a
              clear step-by-step buying flow.
            </p>
          </div>
        </Reveal>

        {/* Intro panel */}
        <Reveal className="mt-14 rounded-sm border border-charcoal/8 bg-white p-6 shadow-[0_8px_30px_rgba(15,15,15,0.04)] md:p-10" initialY={20}>
          <p className="max-w-2xl text-[14px] leading-[1.9] text-charcoal/50">
            Whether you need a single custom flag run or a multi-format print
            package, we guide you from requirement to delivery with a clear,
            practical production path.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Service Coverage", value: "6 Core Categories" },
              { label: "Decision Speed", value: "Clear Next Steps" },
              { label: "Output Standard", value: "Production-Ready Quality" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-sm border border-charcoal/8 bg-cream/60 px-4 py-3">
                <p className="text-[13px] uppercase tracking-[0.18em] text-gold">{stat.label}</p>
                <p className="mt-2 font-display text-xl text-charcoal">{stat.value}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* SILENT / Skill — same content as homepage, styled for this light page */}
        <Services variant="light" />

        {/* Journey */}
        <Reveal className="mt-16 md:mt-20" initialY={18}>
          <p lang="ne" className={cn("mb-4 text-gold", neFace)}>
            {ne.progressiveExperience}
          </p>
          <h2 className="font-display text-2xl font-bold text-charcoal md:text-3xl">
            Clear steps. Better decisions. Reliable output.
          </h2>
          <p className="mt-3 max-w-xl text-[13px] leading-[1.9] text-charcoal/40">
            Every phase ends with a specific outcome so buyers know exactly what
            to do next.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {journey.map((phase, i) => (
            <Reveal
              key={phase.step}
              className="group rounded-sm border border-charcoal/8 bg-white p-5 shadow-[0_8px_30px_rgba(15,15,15,0.04)] transition-all duration-300 hover:shadow-[0_12px_36px_rgba(15,15,15,0.07)] md:p-6"
              delay={i * 0.06}
              initialY={22}
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 bg-gold/5 text-[13px] font-medium tracking-[0.08em] text-gold">
                  {phase.step}
                </span>
                <p className="text-[13px] font-medium uppercase tracking-[0.15em] text-charcoal/40">
                  {phase.title}
                </p>
              </div>
              <h3 className="font-display text-[1.35rem] text-charcoal md:text-[1.5rem]">
                {phase.subtitle}
              </h3>
              <p className="mt-3 text-[13px] leading-[1.9] text-charcoal/45">{phase.copy}</p>
              <p className="mt-4 border-t border-charcoal/8 pt-3 text-[14px] font-medium tracking-[0.01em] text-gold">
                {phase.outcome}
              </p>
            </Reveal>
          ))}
        </div>

        {/* FAQ — service-intent long-tail */}
        <Reveal className="mt-16 md:mt-20" initialY={20}>
          <p lang="ne" className={cn("mb-4 text-gold", neFace)}>
            सेवासम्बन्धी प्रायः सोधिने प्रश्नहरू
          </p>
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display text-2xl font-bold text-charcoal md:text-3xl">
              Ordering, timelines &amp; bulk printing
            </h2>
            <p className="max-w-md text-[13px] leading-[1.85] text-charcoal/45 md:text-right">
              Clear answers before you brief us — expandable below.
            </p>
          </div>
          <ServicesFaq />
        </Reveal>

        {/* CTA — dark accent band */}
        <Reveal className="mt-16 md:mt-20" initialY={24}>
          <div className="rounded-sm bg-charcoal px-8 py-10 md:flex md:items-center md:justify-between">
            <div>
              <p lang="ne" className={cn("text-gold/70", neFace)}>
                {ne.nextStep}
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold text-cream">Ready to begin your brief?</h3>
              <p className="mt-2 max-w-xl text-[13px] leading-[1.9] text-cream/40">
                Share quantities, dimensions, and artwork references. We will return a polished scope
                with material recommendations and a clear production calendar.
              </p>
            </div>
            <Button href="/contact" variant="primary" className="mt-6 md:mt-0">
              Start your project
            </Button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
