/**
 * Canonical Nepali (Devanagari) UI strings — one place so wording stays consistent.
 * Always pair with `lang="ne"` and `font-nepali`; avoid `uppercase` / wide `letter-spacing`
 * on Devanagari (they break conjunct shaping).
 */
export const ne = {
  services: "सेवाहरू",
  contact: "सम्पर्क",
  catalogue: "उत्पादन सूची",
  ourStory: "हाम्रो कथा",
  ourWork: "हाम्रो काम",
  /** Product detail — description */
  details: "विवरण",
  related: "सम्बन्धित",
  nextStep: "अर्को चरण",
  /** “What we do” — candrabindu form reads more naturally in Nepali. */
  whatWeDo: "हामी के गर्छौँ",
  /** About sidebar heading */
  atAGlance: "एक नजरमा",
  establishment: "स्थापना २०१८ · काठमाडौं",
  craftedWithPride: "गर्वका साथ निर्मित",
  progressiveExperience: "क्रमिक अनुभव",
  featuredCollections: "विशेष संकलनहरू",
  featured: "विशेष",
  collection: "संकलन",
} as const;

/**
 * Devanagari-friendly type: dedicated stack, no faux-bold, no letter-spacing
 * (tracking breaks conjuncts). Slightly larger body for clearer clusters.
 */
export const neFace =
  "font-nepali text-[14px] font-medium leading-relaxed tracking-[0em] normal-case antialiased md:text-[16px] [text-rendering:optimizeLegibility]";
