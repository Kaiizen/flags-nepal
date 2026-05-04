import { ProductGrid } from "@/components/shop/ProductGrid";
import { cn } from "@/lib/cn";
import { ne, neFace } from "@/lib/nepali-labels";
import { categoryLabel, products, type ProductCategory } from "@/lib/products";
import { siteConfig, whatsappHref } from "@/lib/site";
import { ArrowRight, MessageCircle, Phone, PackageCheck, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";

const shopDesc =
  "Browse Nepal flag table stands, poles, beach flags, vehicle mounts, and accessories. Request a custom quotation from Flags Nepal in Bagbazar, Kathmandu, Nepal.";

export const metadata: Metadata = {
  title: "Nepal Flag Table Stand and Accessories Catalogue",
  description: shopDesc,
  alternates: {
    canonical: "/shop",
  },
  keywords: [
    "Nepal flag table stand",
    "flag pole Kathmandu",
    "flag stand Nepal",
    "flag accessories Nepal",
    "event flags Nepal",
    "sports event flags Nepal",
  ],
  openGraph: {
    title: "Product Catalogue | Flags Nepal",
    description: shopDesc,
  },
  twitter: {
    title: "Shop | Flags Nepal",
    description: shopDesc,
  },
};

type ShopPageProps = {
  searchParams?: { category?: string };
};

export default function ShopPage({ searchParams }: ShopPageProps) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Catalogue", item: `${siteConfig.url}/shop` },
    ],
  };
  const itemCount = products.length;
  const categoryCount = new Set(products.map((p) => p.category)).size;
  const categories = Object.keys(categoryLabel) as ProductCategory[];
  const featuredCollections = categories
    .map((category) => {
      const sample = products.find((product) => product.category === category);
      if (!sample) return null;
      return { category, label: categoryLabel[category], sample };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const leadCollection = featuredCollections[0];
  const sideCollections = featuredCollections.slice(1);
  const collectionHref = (category: ProductCategory) => `/shop?category=${category}#catalogue-grid`;
  const requestedCategory = searchParams?.category;
  const initialCategoryFilter: ProductCategory | "all" =
    categories.includes(requestedCategory as ProductCategory)
      ? (requestedCategory as ProductCategory)
      : "all";

  return (
    <div className="bg-cream text-charcoal">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Charcoal intro band — deliberate handoff from the homepage dark shell */}
      <section className="relative overflow-hidden bg-charcoal pb-16 pt-28 text-cream md:pb-20 md:pt-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -bottom-px h-20 bg-gradient-to-b from-transparent to-cream/5"
        />
        <div className="page-container relative">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-[10.5px] font-medium uppercase tracking-[0.3em] text-cream/40"
          >
            <Link href="/" className="transition-colors hover:text-gold">
              Home
            </Link>
            <span aria-hidden className="text-cream/20">/</span>
            <span className="text-gold/80">Catalogue</span>
          </nav>
          <p lang="ne" className={cn("mb-4 text-gold/70", neFace)}>
            {ne.catalogue}
          </p>
          <h1 className="font-display font-bold leading-[1.14] tracking-[-0.03em] text-cream">
            <span className="block text-[clamp(2.4rem,7vw,4.2rem)]">PRODUCT</span>
            <span className="block text-[clamp(2.4rem,7vw,4.2rem)]">
              <em className="font-normal not-italic hero-pride">Catalogue</em>
            </span>
          </h1>
        </div>
      </section>

      <div className="page-container pb-24 pt-10 md:pb-32 md:pt-14">
        {/* Intro panel — plain div so client navigations aren’t trapped at opacity 0 (Reveal/when-in-view). */}
        <div className="rounded-sm border border-charcoal/8 bg-white p-6 shadow-[0_8px_30px_rgba(15,15,15,0.04)] md:p-9">
          <p className="max-w-2xl text-[14px] leading-[1.9] text-charcoal/55">
            Browse the full range of flags, stands, and accessories we make in
            Bagbazar. Message us for current prices and custom sizes — most
            quotes come back within minutes.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-[11px] font-medium uppercase tracking-[0.12em]">
            <a
              href={whatsappHref("Hi Flags Nepal, I'd like a quote.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-charcoal/15 px-3 py-1.5 text-charcoal/70 transition-colors hover:border-gold/60 hover:text-charcoal"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden />
              Message us on WhatsApp
            </a>
            <a
              href={`tel:${siteConfig.landlineTel}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-charcoal/15 px-3 py-1.5 text-charcoal/60 transition-colors hover:border-charcoal/30 hover:text-charcoal"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden />
              {siteConfig.landline}
            </a>
            <span className="rounded-full border border-gold/25 px-3 py-1.5 text-gold">
              {itemCount} products · {categoryCount} categories
            </span>
          </div>
        </div>

        {/* How to order — 3 steps + trust badges */}
        <div className="mt-6">
          <div className="rounded-sm border border-charcoal/8 bg-cream/40 p-6 shadow-[0_8px_30px_rgba(15,15,15,0.04)] md:p-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-gold">
              How to order
            </p>
            <div className="mt-5 grid gap-5 md:grid-cols-3">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-charcoal/15 text-charcoal/60">
                  <Search className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-charcoal/40">
                    Step 1
                  </p>
                  <p className="mt-1 font-display text-[1.05rem] text-charcoal">
                    Browse the catalogue
                  </p>
                  <p className="mt-1 text-[13px] leading-[1.8] text-charcoal/55">
                    Pick a product and note the code (e.g. FST-21).
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <MessageCircle className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-charcoal/40">
                    Step 2
                  </p>
                  <p className="mt-1 font-display text-[1.05rem] text-charcoal">
                    Message us on WhatsApp or call
                  </p>
                  <p className="mt-1 text-[13px] leading-[1.8] text-charcoal/55">
                    Share size, quantity, and artwork. We confirm the price and timeline.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <PackageCheck className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-charcoal/40">
                    Step 3
                  </p>
                  <p className="mt-1 font-display text-[1.05rem] text-charcoal">
                    We produce and deliver
                  </p>
                  <p className="mt-1 text-[13px] leading-[1.8] text-charcoal/55">
                    Pickup in Bagbazar or delivery across all seven provinces of Nepal.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-charcoal/50">
              <span className="rounded-full bg-white px-3 py-1.5 shadow-[0_2px_6px_rgba(15,15,15,0.04)]">
                50% advance · 50% on delivery
              </span>
              <span className="rounded-full bg-white px-3 py-1.5 shadow-[0_2px_6px_rgba(15,15,15,0.04)]">
                Delivery across Nepal
              </span>
              <span className="rounded-full bg-white px-3 py-1.5 shadow-[0_2px_6px_rgba(15,15,15,0.04)]">
                Walk-ins welcome at Bagbazar
              </span>
              <span className="rounded-full bg-white px-3 py-1.5 shadow-[0_2px_6px_rgba(15,15,15,0.04)]">
                Custom sizes &amp; artwork
              </span>
              <Link
                href="/contact?subject=bulk"
                className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/5 px-3 py-1.5 text-gold transition-colors hover:bg-gold/10"
              >
                Bulk orders? Contact us <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Featured Collections */}
        <div className="mt-12">
          <p lang="ne" className={cn("mb-4 text-gold", neFace)}>
            {ne.featuredCollections}
          </p>
          <h2 className="font-display text-2xl font-bold text-charcoal md:text-3xl">
            A showroom view of our signature products
          </h2>

          {leadCollection ? (
            <div className="mt-6 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
              <Link
                href={collectionHref(leadCollection.category)}
                className="group relative block min-h-[300px] overflow-hidden rounded-sm border border-charcoal/8 shadow-[0_8px_30px_rgba(15,15,15,0.06)]"
              >
                <Image
                  src={leadCollection.sample.images[0]}
                  alt={leadCollection.label}
                  fill
                  sizes="(min-width: 1024px) 62vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/35 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-cream">
                  <p lang="ne" className={cn("text-gold/70", neFace)}>
                    {ne.featured}
                  </p>
                  <h3 className="mt-2 font-display text-3xl text-cream">{leadCollection.label}</h3>
                  <p className="mt-2 max-w-md text-sm text-cream/70">
                    {leadCollection.sample.shortDescription}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-gold">
                    Explore collection <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {sideCollections.slice(0, 4).map((collection) => (
                  <article
                    key={collection.category}
                    className="group rounded-sm border border-charcoal/8 bg-white p-4 shadow-[0_8px_30px_rgba(15,15,15,0.04)] transition-all duration-300 hover:shadow-[0_12px_36px_rgba(15,15,15,0.07)]"
                  >
                    <p lang="ne" className={cn("text-gold", neFace)}>
                      {ne.collection}
                    </p>
                    <h4 className="mt-1 font-display text-xl text-charcoal">{collection.label}</h4>
                    <p className="mt-2 line-clamp-2 text-[13px] leading-[1.9] text-charcoal/40">
                      {collection.sample.shortDescription}
                    </p>
                    <Link
                      href={collectionHref(collection.category)}
                      className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.12em] text-gold transition-colors hover:text-gold/70"
                    >
                      View details <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {/* Product Grid */}
        <div className="mt-12">
          <Suspense
            fallback={
              <div
                id="catalogue-grid"
                className="flex min-h-[280px] items-center justify-center rounded-sm border border-charcoal/8 bg-white text-[13px] text-charcoal/45"
              >
                Loading catalogue…
              </div>
            }
          >
            <ProductGrid key={initialCategoryFilter} initialFilter={initialCategoryFilter} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
