import { getGoogleReviewsPayload } from "@/lib/google-reviews.server";
import { manualGoogleReviews } from "@/lib/google-reviews";
import { faqItems } from "@/lib/faq";
import { siteConfig } from "@/lib/site";
import type { Metadata } from "next";
import { HomeDeferredSections } from "@/components/home/HomeDeferredSections";
import { Hero } from "@/components/sections/Hero";

const homeDesc =
  "Buy Nepal flag online and order custom flag printing in Kathmandu, Nepal. Flags Nepal delivers national, corporate, and ceremonial flag solutions, desk and golden stands, and custom banners from Bagbazar — with a Nepal flag proportions guide and full print services.";

export const metadata: Metadata = {
  title: "Buy Nepal Flag Online in Kathmandu, Nepal",
  description: homeDesc,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "buy Nepal flag",
    "Nepal flag online",
    "Nepal flag price",
    "flags Nepal",
    "national flag Nepal",
    "flag maker Nepal",
  ],
  openGraph: {
    title: "Buy Nepal Flag Online in Kathmandu, Nepal | Flags Nepal",
    description: homeDesc,
    type: "website",
    url: "/",
  },
  twitter: {
    title: "Buy Nepal Flag Online | Flags Nepal",
    description: homeDesc,
  },
};

export default async function Home() {
  const fetched = await getGoogleReviewsPayload().catch(() => null);
  const googleReviews = fetched
    ? { ...fetched, rating: siteConfig.publicGoogleAverageRating }
    : manualGoogleReviews.length
      ? {
          rating: siteConfig.publicGoogleAverageRating,
          user_ratings_total: manualGoogleReviews.length,
          reviews: manualGoogleReviews,
        }
      : null;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.content,
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Hero />
      <HomeDeferredSections googleReviews={googleReviews} />
    </>
  );
}
