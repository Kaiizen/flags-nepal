import { WorksArchiveGrid } from "@/components/works/WorksArchiveGrid";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { ne, neFace } from "@/lib/nepali-labels";
import { siteConfig } from "@/lib/site";
import type { Metadata } from "next";

const worksDesc =
  "See selected Flags Nepal projects across national events, corporate branding, and festival installations — flags, stands, and banners made in Bagbazar, Kathmandu, Nepal.";

export const metadata: Metadata = {
  title: "Client Projects in Nepal | Flags, Banners & Stands",
  description: worksDesc,
  alternates: {
    canonical: "/works",
  },
  keywords: [
    "Flags Nepal projects",
    "corporate flag installation Nepal",
    "event flags Nepal",
    "Kathmandu flag maker portfolio",
  ],
  openGraph: {
    title: "Flags Nepal Works — National & Corporate Installations",
    description: worksDesc,
  },
  twitter: {
    title: "Flags Nepal | Works",
    description: worksDesc,
  },
};

export default function WorksPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Works", item: `${siteConfig.url}/works` },
    ],
  };

  return (
    <div className="page-shell-dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="page-container">
        <Reveal initialY={16}>
          <p lang="ne" className={cn("mb-4 text-gold/70", neFace)}>
            {ne.ourWork}
          </p>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h1 className="font-display font-bold leading-[1.14] tracking-[-0.03em] text-cream">
              <span className="block text-[clamp(2.4rem,7vw,4.2rem)]">SIGNATURE</span>
              <span className="block text-[clamp(2.4rem,7vw,4.2rem)]">
                <em className="font-normal not-italic hero-pride">Works</em>
              </span>
            </h1>
            <p className="max-w-sm text-[13px] leading-[1.9] text-cream/30 md:text-right md:text-[14px]">
              A premium visual archive of commissioned builds
            </p>
          </div>
        </Reveal>

        <div className="mt-12 md:mt-16">
          <WorksArchiveGrid />
        </div>
      </div>
    </div>
  );
}
