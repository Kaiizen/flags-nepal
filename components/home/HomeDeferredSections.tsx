import type { GoogleReviewsPayload } from "@/lib/google-reviews.server";
import { cn } from "@/lib/cn";
import dynamic from "next/dynamic";

/** Flat SSR placeholder — reserve vertical space cheaply until the chunk resolves. */
function SectionHold({ className }: { className: string }) {
  return <div className={cn("w-full", className)} aria-hidden role="presentation" />;
}

const TrustRow = dynamic(
  () => import("@/components/sections/TrustRow").then((m) => ({ default: m.TrustRow })),
  { loading: () => <SectionHold className="min-h-[88px]" /> },
);

const ClientLogos = dynamic(
  () => import("@/components/sections/ClientLogos").then((m) => ({ default: m.ClientLogos })),
  { loading: () => <SectionHold className="min-h-[180px]" /> },
);

const Works = dynamic(
  () => import("@/components/sections/Works").then((m) => ({ default: m.Works })),
  { loading: () => <SectionHold className="min-h-[420px]" /> },
);

const Process = dynamic(
  () => import("@/components/sections/Process").then((m) => ({ default: m.Process })),
  { loading: () => <SectionHold className="min-h-[640px]" /> },
);

const Services = dynamic(
  () => import("@/components/sections/Services").then((m) => ({ default: m.Services })),
  { loading: () => <SectionHold className="min-h-[520px]" /> },
);

const Testimonials = dynamic(
  () => import("@/components/sections/Testimonials").then((m) => ({ default: m.Testimonials })),
  { loading: () => <SectionHold className="min-h-[300px]" /> },
);

const ExploreResources = dynamic(
  () => import("@/components/sections/ExploreResources").then((m) => ({ default: m.ExploreResources })),
  { loading: () => <SectionHold className="min-h-[380px]" /> },
);

const FAQ = dynamic(
  () => import("@/components/sections/FAQ").then((m) => ({ default: m.FAQ })),
  { loading: () => <SectionHold className="min-h-[480px]" /> },
);

const ClosingCTA = dynamic(
  () => import("@/components/sections/ClosingCTA").then((m) => ({ default: m.ClosingCTA })),
  { loading: () => <SectionHold className="min-h-[160px]" /> },
);

type HomeDeferredSectionsProps = {
  googleReviews: GoogleReviewsPayload | null;
};

/**
 * Code-splits everything below the hero so the first interactive window ships less JS
 * (smaller parse/compile + better scheduling on mid-tier phones).
 */
export function HomeDeferredSections({ googleReviews }: HomeDeferredSectionsProps) {
  return (
    <>
      <TrustRow />
      <ClientLogos />
      <Works />
      <Process />
      <Services />
      <Testimonials google={googleReviews} />
      <ExploreResources />
      <FAQ />
      <ClosingCTA />
    </>
  );
}
