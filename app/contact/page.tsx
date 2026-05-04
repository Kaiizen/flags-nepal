import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { ne, neFace } from "@/lib/nepali-labels";
import { siteConfig, whatsappHref } from "@/lib/site";
import type { Metadata } from "next";
import { Suspense } from "react";

const contactDesc =
  "Contact Flags Nepal for custom flag printing, Nepal flag orders, and banner production in Bagbazar, Kathmandu — by form, email, phone, or WhatsApp.";

export const metadata: Metadata = {
  title: "Contact Flag Shop in Kathmandu, Nepal",
  description: contactDesc,
  alternates: {
    canonical: "/contact",
  },
  keywords: [
    "flag shop Kathmandu",
    "flag printing near me",
    "flag printing Kathmandu",
    "banner printing Kathmandu",
    "Flags Nepal contact",
  ],
  openGraph: {
    title: "Contact Flags Nepal | Flag Printing Kathmandu",
    description: contactDesc,
  },
  twitter: {
    title: "Contact | Flags Nepal",
    description: contactDesc,
  },
};

export default function ContactPage() {
  const mapSrc = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL || siteConfig.googleMapsEmbedUrl;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Contact", item: `${siteConfig.url}/contact` },
    ],
  };

  return (
    <div className="page-shell-light">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="page-container">
        {/* Header */}
        <Reveal initialY={16}>
          <p lang="ne" className={cn("mb-4 text-gold", neFace)}>
            {ne.contact}
          </p>
          <h1 className="font-display font-bold leading-[1.14] tracking-[-0.03em] text-charcoal">
            <span className="block text-[clamp(2.4rem,7vw,4.2rem)]">CONTACT</span>
            <span className="block text-[clamp(2.4rem,7vw,4.2rem)]">
              <em className="font-normal not-italic hero-pride">Studio</em>
            </span>
          </h1>
        </Reveal>

        <Reveal className="mt-14 block" initialY={24}>
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="space-y-4 text-[14px] text-charcoal/50">
                <p>
                  <span className="font-medium text-charcoal">Address</span>
                  <br />
                  {siteConfig.address}
                </p>
                <p>
                  <span className="font-medium text-charcoal">Mobile</span>
                  <br />
                  <a className="transition-colors hover:text-gold" href={`tel:${siteConfig.phoneTel}`}>
                    {siteConfig.phone}
                  </a>
                </p>
                <p>
                  <span className="font-medium text-charcoal">Landline</span>
                  <br />
                  <a className="transition-colors hover:text-gold" href={`tel:${siteConfig.landlineTel}`}>
                    {siteConfig.landline}
                  </a>
                </p>
                <p>
                  <span className="font-medium text-charcoal">WhatsApp</span>
                  <br />
                  <a
                    className="transition-colors hover:text-gold"
                    href={whatsappHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {siteConfig.phone}
                  </a>
                </p>
                <p>
                  <span className="font-medium text-charcoal">Email</span>
                  <br />
                  <a className="transition-colors hover:text-gold" href={`mailto:${siteConfig.email}`}>
                    {siteConfig.email}
                  </a>
                </p>
              </div>

              <div className="space-y-2">
                <div className="overflow-hidden rounded-sm border border-charcoal/8 shadow-[0_8px_30px_rgba(15,15,15,0.04)]">
                  <iframe
                    title="Flags Nepal on Google Maps"
                    src={mapSrc}
                    width="600"
                    height="420"
                    className="h-[320px] w-full md:h-[420px]"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
                <p className="text-center text-[12px] text-charcoal/40">
                  <a
                    className="text-gold/90 underline-offset-2 transition-colors hover:text-gold hover:underline"
                    href={siteConfig.googleMapsPlaceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open in Google Maps
                  </a>
                </p>
              </div>
            </div>

            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
