import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { neFace } from "@/lib/nepali-labels";
import { siteConfig } from "@/lib/site";
import { termsLastUpdated, termsSections } from "@/lib/legal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Flags Nepal Terms and Conditions — pricing, custom orders, production, delivery, returns, and liability.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Terms and Conditions", item: `${siteConfig.url}/terms` },
    ],
  };

  return (
    <div className="page-shell-light">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="page-container">
        <Reveal initialY={16}>
          <p className={cn("mb-4 text-gold", neFace)}>नियम र सर्त</p>
          <h1 className="font-display font-bold leading-[1.14] tracking-[-0.03em] text-charcoal">
            <span className="block text-[clamp(2.2rem,6vw,3.8rem)]">TERMS AND</span>
            <span className="block text-[clamp(2.2rem,6vw,3.8rem)]">
              <em className="font-normal not-italic hero-pride">Conditions</em>
            </span>
          </h1>
          <p className="mt-4 text-[12px] uppercase tracking-[0.18em] text-charcoal/40">
            Last updated: {termsLastUpdated}
          </p>
        </Reveal>

        <Reveal className="mt-10 rounded-sm border border-charcoal/8 bg-white p-6 text-charcoal/60 shadow-[0_8px_30px_rgba(15,15,15,0.04)] md:p-9" initialY={18}>
          <p className="text-[14px] leading-[1.9] text-charcoal/55">
            These Terms and Conditions apply to all orders placed with Flags Nepal.
            Please review them carefully before confirming an order. By placing an order, you
            acknowledge and agree to these terms.
          </p>
        </Reveal>

        <div className="mt-8 space-y-6">
          {termsSections.map((section, i) => (
            <Reveal
              key={section.id}
              id={section.id}
              className="rounded-sm border border-charcoal/8 bg-white p-6 shadow-[0_8px_30px_rgba(15,15,15,0.04)] md:p-8"
              delay={i * 0.03}
              initialY={16}
            >
              <h2 className="font-display text-[1.4rem] font-bold leading-snug text-charcoal md:text-[1.7rem]">
                {section.title}
              </h2>
              <ul className="mt-4 space-y-3 text-[14px] leading-[1.9] text-charcoal/55">
                {section.items.map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span aria-hidden className="mt-2 inline-block h-[5px] w-[5px] shrink-0 rounded-full bg-gold/60" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 rounded-sm border border-charcoal/10 bg-cream/40 p-6 text-[13px] leading-[1.9] text-charcoal/55 md:p-7">
          <p>
            Questions about these terms? Contact us at{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-gold/80 underline-offset-2 transition-colors hover:text-gold hover:underline"
            >
              {siteConfig.email}
            </a>
            .
          </p>
        </Reveal>
      </div>
    </div>
  );
}
