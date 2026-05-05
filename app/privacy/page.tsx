import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { neFace } from "@/lib/nepali-labels";
import { siteConfig } from "@/lib/site";
import { privacyLastUpdated, privacySections } from "@/lib/legal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Flags Nepal Privacy Policy — how we collect, use, and protect the personal information you share with us.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Privacy Policy", item: `${siteConfig.url}/privacy` },
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
          <p className={cn("mb-4 text-gold", neFace)}>गोपनीयता</p>
          <h1 className="font-display font-bold leading-[1.14] tracking-[-0.03em] text-charcoal">
            <span className="block text-[clamp(2.2rem,6vw,3.8rem)]">PRIVACY</span>
            <span className="block text-[clamp(2.2rem,6vw,3.8rem)]">
              <em className="font-normal not-italic hero-pride">Policy</em>
            </span>
          </h1>
          <p className="mt-4 text-[14px] uppercase tracking-[0.18em] text-charcoal/40">
            Last updated: {privacyLastUpdated}
          </p>
        </Reveal>

        <Reveal className="mt-10 rounded-sm border border-charcoal/8 bg-white p-6 text-charcoal/60 shadow-[0_8px_30px_rgba(15,15,15,0.04)] md:p-9" initialY={18}>
          <p className="text-[14px] leading-[1.9] text-charcoal/55">
            Flags Nepal respects your privacy. This policy explains what information we collect
            when you reach out or place an order, how we use it, and the choices available to you.
          </p>
        </Reveal>

        <div className="mt-8 space-y-6">
          {privacySections.map((section, i) => (
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
            Questions about this policy or your information? Contact us at{" "}
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
