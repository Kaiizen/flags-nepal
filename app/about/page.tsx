import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { ne, neFace } from "@/lib/nepali-labels";
import { siteConfig } from "@/lib/site";
import Image from "next/image";
import type { Metadata } from "next";

const aboutDesc =
  "Flags Nepal is a Kathmandu flag maker founded in 2018 in Bagbazar, serving schools, clubs, civic bodies, and brands with national, ceremonial, and custom flag printing.";

export const metadata: Metadata = {
  title: "About Flags Nepal and Nepal Flag Proportions",
  description: aboutDesc,
  alternates: {
    canonical: "/about",
  },
  keywords: [
    "flag maker Nepal",
    "flag maker Kathmandu",
    "flag shop Bagbazar",
    "national flag Nepal",
    "Nepal national flag history",
    "Nepal flag meaning",
    "Nepal flag proportions",
    "flag printing Nepal",
  ],
  openGraph: {
    title: "About Flags Nepal | Flag Maker in Kathmandu",
    description: aboutDesc,
  },
  twitter: {
    title: "About Flags Nepal",
    description: aboutDesc,
  },
};

export default function AboutPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "About", item: `${siteConfig.url}/about` },
    ],
  };

  return (
    <div className="page-shell-dark relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="page-container relative z-10">
        {/* Header */}
        <Reveal initialY={16}>
          <p lang="ne" className={cn("mb-4 text-gold/70", neFace)}>
            {ne.ourStory}
          </p>
          <h1 className="font-display font-bold leading-[1.14] tracking-[-0.03em] text-cream">
            <span className="block text-[clamp(2.4rem,7vw,4.2rem)]">STUDIO</span>
            <span className="block text-[clamp(2.4rem,7vw,4.2rem)]">
              <em className="font-normal not-italic hero-pride">Origin</em>
            </span>
          </h1>
        </Reveal>

        <Reveal className="mt-14 block" initialY={28}>
          <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6 text-[14px] leading-[1.9] text-cream/40">
              <p>
                Flags Nepal was founded in 2018 in Bagbazar, Kathmandu — a small workshop started
                by printers and stitchers who cared deeply about getting the national flag right.
                Our first orders were humble: replacement flags for neighbourhood schools, pennants
                for local clubs, and hand-stitched table sets for offices across the valley.
              </p>
              <p>
                Eight years on, we are still a Nepali workshop at heart. We print and stitch for
                schools and community campuses, municipal offices, sports clubs, cricket and football
                fan groups, trekking agencies, event organisers, temples, and family-run businesses
                from Kathmandu to Pokhara, Biratnagar, Butwal, Dharan, and beyond. When a team
                needs jerseys for a tournament, a school needs a flag for Constitution Day, or a
                brand needs banners for a product launch in the valley — we are usually the first
                call.
              </p>
              <p>
                The constitution sets exact geometry for our national flag, and that respect for
                detail sets the standard for every job that leaves the workshop. We cut patterns
                by hand when the shape demands it, match Pantone references under daylight-balanced
                lamps, and reinforce hems so a flag survives monsoon winds and dry Kathmandu sun.
                Rollers, needles, and heat presses make a lot of noise; the work itself is quiet
                discipline — measure twice, print once, hoist forever.
              </p>
              <p>
                From Bagbazar we coordinate deliveries across all seven provinces, with courier
                partners handling orders from Jhapa to Darchula. Walk-ins are welcome for anyone
                nearby — we will happily talk through fabric, size, and finishing over a cup of tea
                before quoting a price.
              </p>
              <p>
                For constitutional geometry and format guidance, visit our{" "}
                <a href="/nepal-flag-proportions" className="text-gold/80 underline-offset-2 hover:underline">
                  Nepal flag proportions guide
                </a>
                .
              </p>
            </div>

            <div className="relative overflow-hidden rounded-sm border border-cream/[0.06] bg-cream/[0.03] p-8">
              <Image
                src="/flags-nepal-logo-white.png"
                alt=""
                width={240}
                height={240}
                className="absolute left-1/2 top-1/2 h-auto w-[min(180px,42%)] -translate-x-1/2 -translate-y-1/2 opacity-[0.04]"
                aria-hidden
              />
              <div className="relative z-10 space-y-4">
                <p lang="ne" className={cn("text-gold/70", neFace)}>
                  {ne.atAGlance}
                </p>
                <ul className="space-y-3 text-[14px] text-cream/40">
                  <li>
                    <span className="font-medium text-cream">Founded:</span> 2018, Bagbazar, Kathmandu
                  </li>
                  <li>
                    <span className="font-medium text-cream">Focus:</span> Flags, banners, jerseys, foil, desk systems
                  </li>
                  <li>
                    <span className="font-medium text-cream">Serves:</span> Schools, clubs, municipalities, brands, and families across Nepal
                  </li>
                  <li>
                    <span className="font-medium text-cream">Principles:</span> Constitutional accuracy, reinforced hems, honest timelines
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
