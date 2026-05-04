import { siteConfig } from "./site";

/**
 * Root @graph: Organization + WebSite + LocalBusiness (EEAT + sitelinks clarity).
 * Keeps a single script tag; IDs allow future sameAs / publisher references.
 */
export function buildRootJsonLd(siteUrl: string) {
  const base = siteUrl.replace(/\/+$/, "");
  const orgId = `${base}/#organization`;
  const siteId = `${base}/#website`;
  const localId = `${base}/#localbusiness`;

  const sameAs: string[] = [
    siteConfig.social.facebook,
    siteConfig.social.instagram,
    siteConfig.social.tiktok,
    siteConfig.social.youtube,
    siteConfig.social.linkedin,
  ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: "Flags Nepal",
        url: base,
        logo: `${base}/flags-nepal-logo-site.png`,
        image: [`${base}/flags-nepal-logo-site.png`],
        description: siteConfig.tagline,
        foundingDate: String(siteConfig.foundingYear),
        foundingLocation: {
          "@type": "Place",
          name: "Bagbazar, Kathmandu, Nepal",
        },
        sameAs,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address,
          addressLocality: "Kathmandu",
          addressRegion: "Bagmati Province",
          postalCode: "44600",
          addressCountry: "NP",
        },
      },
      {
        "@type": "WebSite",
        "@id": siteId,
        name: "Flags Nepal",
        url: base,
        inLanguage: "en-NP",
        publisher: { "@id": orgId },
        about: { "@id": orgId },
      },
      {
        "@type": "LocalBusiness",
        "@id": localId,
        name: "Flags Nepal",
        parentOrganization: { "@id": orgId },
        image: [`${base}/opengraph-image`],
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address,
          addressLocality: "Kathmandu",
          addressRegion: "Bagmati Province",
          postalCode: "44600",
          addressCountry: "NP",
        },
        telephone: [siteConfig.landlineTel, siteConfig.phoneTel],
        email: siteConfig.email,
        url: base,
        priceRange: "$$",
        foundingDate: String(siteConfig.foundingYear),
        foundingLocation: {
          "@type": "Place",
          name: "Bagbazar, Kathmandu, Nepal",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: siteConfig.businessMapCoords.lat,
          longitude: siteConfig.businessMapCoords.lng,
        },
        hasMap: siteConfig.googleMapsPlaceUrl,
        paymentAccepted: ["Cash", "Bank Transfer", "eSewa", "Khalti"],
        currenciesAccepted: "NPR",
        areaServed: [
          { "@type": "City", name: "Kathmandu" },
          { "@type": "AdministrativeArea", name: "Bagmati Province" },
          { "@type": "Country", name: "Nepal" },
        ],
        sameAs,
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: siteConfig.businessHours.days,
          opens: siteConfig.businessHours.opens,
          closes: siteConfig.businessHours.closes,
        },
        knowsAbout: [
          "Nepal national flag",
          "Custom flag printing Nepal",
          "Ceremonial flags and stands",
          "Table flag stands",
          "Beach and outdoor banner systems",
          "Sublimation and foil printing",
        ],
      },
    ],
  };
}
