import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { neFace } from "@/lib/nepali-labels";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nepal Flag Proportions and Constitution Guide",
  description:
    "Understand Nepal flag proportions, construction geometry, and practical size guidance for ceremonial, office, and event use — from a Kathmandu flag maker that follows official geometry for national and institutional work.",
  alternates: {
    canonical: "/nepal-flag-proportions",
  },
  keywords: [
    "Nepal flag proportions",
    "Nepal national flag history",
    "Nepal flag meaning",
    "how to choose a Nepal flag size",
    "Schedule 3 Nepal flag",
    "non rectangular national flag",
  ],
  openGraph: {
    title: "Nepal Flag Proportions & Construction Guide | Flags Nepal",
    description:
      "Official two-pennon geometry, practical sizing for desk, ceremonial, and outdoor use, and what to check before you print or hoist.",
  },
};

export default function NepalFlagProportionsPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Flag guide",
        item: `${siteConfig.url}/nepal-flag-proportions`,
      },
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
          <p className={cn("mb-4 text-gold", neFace)}>नेपालको झण्डा</p>
          <h1 className="font-display font-bold leading-[1.14] tracking-[-0.03em] text-charcoal">
            <span className="block text-[clamp(2.2rem,6vw,3.8rem)]">NEPAL FLAG</span>
            <span className="block text-[clamp(2.2rem,6vw,3.8rem)]">
              <em className="font-normal not-italic hero-pride">Proportions Guide</em>
            </span>
          </h1>
        </Reveal>

        <Reveal className="mt-10 rounded-sm border border-charcoal/8 bg-white p-6 text-charcoal/60 shadow-[0_8px_30px_rgba(15,15,15,0.04)] md:p-8">
          <div className="space-y-5 text-[14px] leading-[1.9]">
            <p>
              Nepal&apos;s national flag is the world&apos;s only non-rectangular national flag. Its
              two-pennon geometry is constitutionally defined, and proportions should be preserved
              carefully during drafting, printing, and stitching.
            </p>
            <p>
              For institutional and ceremonial use, we recommend working from approved vector
              artwork and then scaling proportionally to your required finish size. Avoid visual
              stretching in print software, because even small distortion affects emblem placement
              and overall shape accuracy.
            </p>
            <h2 className="!mt-8 font-display text-xl font-bold text-charcoal">Why geometry matters for printing</h2>
            <p>
              Search engines and design teams both care about <strong>intent</strong>: when someone
              looks for &ldquo;Nepal flag proportions&rdquo; or &ldquo;correct Nepal flag
              size,&rdquo; they need dimensions that still look like the national emblem when
              scaled. We produce proofs that lock aspect ratios before we cut fabric or run
              sublimation, so the finished piece matches the geometry you expect at the pole or on
              the stand.
            </p>
            <h2 className="!mt-8 font-display text-xl font-bold text-charcoal">Authoritative reference</h2>
            <p>
              The definitive legal description appears in the Constitution of Nepal; Schedule 3
              defines the national flag&rsquo;s shape and colours. For background reading, see the
              English overview on{" "}
              <a
                href="https://en.wikipedia.org/wiki/Flag_of_Nepal"
                className="text-gold/90 underline decoration-gold/30 underline-offset-2 transition-colors hover:text-charcoal"
                target="_blank"
                rel="noopener noreferrer"
              >
                Wikipedia: Flag of Nepal
              </a>{" "}
              — always cross-check critical institutional work with the latest official text from
              government sources.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-8 grid gap-4 md:grid-cols-3" initialY={18}>
          {[
            { title: "Desk display", detail: "5 to 9 inch formats with proportion-safe scaling." },
            { title: "Ceremonial use", detail: "2 to 5 feet systems with reinforced stitching." },
            { title: "Outdoor hoisting", detail: "Material and hem strength selected for wind load." },
          ].map((item) => (
            <article key={item.title} className="rounded-sm border border-charcoal/8 bg-cream/50 p-5">
              <h2 className="font-display text-xl text-charcoal">{item.title}</h2>
              <p className="mt-2 text-[13px] leading-[1.8] text-charcoal/50">{item.detail}</p>
            </article>
          ))}
        </Reveal>

        <Reveal className="mt-10 rounded-sm border border-charcoal/8 bg-white p-6 md:p-8" initialY={14}>
          <h2 className="font-display text-xl font-bold text-charcoal md:text-2xl">Ready for production-ready flags?</h2>
          <p className="mt-3 max-w-2xl text-[14px] leading-[1.9] text-charcoal/50">
            Browse our{" "}
            <Link href="/services" className="text-charcoal underline decoration-gold/40 underline-offset-2 hover:text-gold">
              flag printing &amp; banner services in Kathmandu
            </Link>
            , or{" "}
            <Link href="/contact" className="text-charcoal underline decoration-gold/40 underline-offset-2 hover:text-gold">
              request a custom quote with dimensions and quantities
            </Link>{" "}
            so proofs match constitutional geometry before we print or stitch.
          </p>
        </Reveal>
      </div>
    </div>
  );
}
