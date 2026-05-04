export const siteConfig = {
  name: "Flags Nepal",
  tagline: "Premium flags, banners, and printed identity — forged in Kathmandu, flown worldwide.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://flagsnepal.com",
  email: "flagsnepal@gmail.com",
  /** Shown in UI */
  phone: "+977 982 336 4747",
  /** E.164 without spaces — use for tel: and schema.org */
  phoneTel: "+9779823364747",
  /** Digits only (country + number) for https://wa.me/… */
  whatsappE164: "9779823364747",
  /** Kathmandu PSTN */
  landline: "015321556",
  /** E.164 for tel: (+977 1 5321556) */
  landlineTel: "+97715321556",
  address: "Bagbazar, Kathmandu 44600, Nepal",
  /** Share link — opens the business pin in Google Maps */
  googleMapsPlaceUrl: "https://maps.app.goo.gl/h359rTsiH1B2n8cc9",
  /**
   * Google Business Profile — leave a review (short link).
   * @see https://g.page/r/CbZL8LKBT7vZEBM/review
   */
  googleBusinessReviewUrl: "https://g.page/r/CbZL8LKBT7vZEBM/review",
  /** Approximate storefront coordinates (from Maps embed) — used only to resolve Place ID when `GOOGLE_PLACE_ID` is not set. */
  businessMapCoords: { lat: 27.704016, lng: 85.319396 } as const,
  /**
   * Default iframe `src` for /contact (Embed map for Flags Nepal).
   * Override with NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL if Google gives you a new embed string.
   */
  googleMapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.87!2d85.319396!3d27.704016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19eea8d0b86b%3A0xd9bb4f81b2f04bb6!2sFlags%20Nepal!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp",
  /**
   * Average ⭐ (out of 5) used in the hero, trust row, and testimonials header.
   * Google Places live data is still used for review text, but the advertised score stays this value.
   */
  publicGoogleAverageRating: 4.8,
  /**
   * Homepage trust strip — first two numbers (kept in sync with marketing / about copy).
   */
  trustStrip: {
    yearsOfCrafting: { value: "8+", label: "Years of Crafting" },
    flagsToCustomers: { value: "500+", label: "Flags delivered to customers" },
  },
  foundingYear: 2018,
  businessHours: {
    /** Short human label for the ribbon / UI. */
    label: "Mon–Fri 9am–6pm",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const,
    opens: "09:00",
    closes: "18:00",
  },
  social: {
    facebook: "https://www.facebook.com/flagsNepaI/",
    instagram: "https://instagram.com/flagsnepal",
    tiktok: "https://www.tiktok.com/@flagsnepal",
    youtube: "https://www.youtube.com/@FlagsNepal",
    linkedin: "https://www.linkedin.com/company/flags-nepal",
  },
} as const;

export function whatsappHref(text?: string) {
  const base = `https://wa.me/${siteConfig.whatsappE164}`;
  if (!text?.trim()) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}
