/**
 * Nepal’s flag guide — narrative derived from the English Wikipedia article
 * “Flag of Nepal”, local mirrors of Wikimedia Commons files, and Flags Nepal’s
 * own reference PDF. Replace business copy here; keep attribution exports intact.
 */

export const wikipediaAttribution = {
  articleTitle: "Flag of Nepal",
  articleUrl: "https://en.wikipedia.org/wiki/Flag_of_Nepal",
  licenseNote:
    "Summaries on this page draw on the English Wikipedia article above (Creative Commons Attribution–ShareAlike 4.0 International). Contribute or verify there, then cross-check critical work against the Constitution of Nepal and official drawings.",
} as const;

/** Your supplied reference (PDF + raster preview) — lives in /public/guides/. */
export const flagsNepalReferenceAsset = {
  previewSrc: "/guides/nepal-flag-final-from-pdf.png",
  pdfHref: "/guides/nepal-flag-final.pdf",
  title: "Flags Nepal reference sheet",
  caption:
    "Construction notes and dimensions from our studio package — use together with Schedule 1 of Nepal’s constitution for institutional work.",
} as const;

/** Official vector from Wikimedia Commons (“Flag of Nepal”) — construction per 1990 Schedule 1 note in file. */
export const wikimediaOfficialFlag = {
  src: "/guides/flag-of-nepal-wikimedia.svg",
  commonsTitle: "Flag of Nepal.svg",
  commonsUrl: "https://commons.wikimedia.org/wiki/File:Flag_of_Nepal.svg",
} as const;

export type FlagGuideTimelineEntry = {
  period: string;
  title: string;
  body: string;
};

export const flagGuideTimeline: FlagGuideTimelineEntry[] = [
  {
    period: "Regional roots",
    title: "Triangles, dhvaja pennants, and the hills",
    body:
      "Triangular war banners were common across South Asia — compact in light wind and easy to read at distance. Hindu temple pennants (often called dhvaja) sit in the same family of forms. Nepal flew both quadrilateral and non-quadrilateral flags across its history.",
  },
  {
    period: "Unification",
    title: "Two pennons after Gorkha expansion",
    body:
      "The Gorkha kingdom began with a single scarlet war banner bearing deities and badges. After Prithvi Narayan Shah unified the principalities, writers describe the double pennon becoming the standard national pattern. Some historians credit later Rana rulers with giving the sun and moon human faces, weaving lunar and solar dynasty symbolism into the emblem.",
  },
  {
    period: "Early modern",
    title: "Album plates and green borders",
    body:
      "Nepal’s outward image changed with each printing: Perceval Landon’s 1928 volumes illustrate double-pennant specimens with a green outer border instead of today’s blue — a reminder that published colour is not always statute colour. Field photography from the 1920s still captures transitional details.",
  },
  {
    period: "1962",
    title: "Faces off, geometry on the record",
    body:
      "On 16 December 1962 Nepal adopted a new constitution and, with it, the modern flag civil engineer Shankar Nath Rimal standardised for King Mahendra. The refreshed artwork merged two rival dynastic pennons, removed the anthropomorphic sun and moon faces, and spelled out exact measurements so drafters could no longer improvise the silhouette.",
  },
  {
    period: "2015 constitution",
    title: "Schedule 1 keeps the maths",
    body:
      "Nepal’s 2015 constitution carries the construction forward in Schedule 1 (National Flag), replacing the kingdom-era schedule with the federal republic’s official method. For courts, embassies, and exporters, that schedule — not a random PNG export — remains the reference plane.",
  },
];

export type FlagGuideSymbolCard = {
  label: string;
  title: string;
  body: string;
  tint: "crimson" | "blue" | "gold" | "charcoal";
};

export const flagGuideSymbols: FlagGuideSymbolCard[] = [
  {
    label: "Field",
    title: "Crimson Nepali red",
    body:
      "Readers usually hear “bravery” first, but encyclopaedic accounts also tie the red to the national rhododendron and to everyday arts and crafts palettes across the country.",
    tint: "crimson",
  },
  {
    label: "Border",
    title: "Peaceful blue wrap",
    body:
      "The azure frame signals peace and harmony — the cool counterweight to the fiery interior that tourists recognise from prayer flags to storefront paint.",
    tint: "blue",
  },
  {
    label: "Moon & sun",
    title: "Night and day emblems",
    body:
      "Popular readings pair the moon with calm / purity and the sun with labour / resolve. Alternate modern glosses map the pair onto Hinduism and Buddhism, or onto the climate contrast between the snowy Himalaya and the warm Terai.",
    tint: "gold",
  },
  {
    label: "Perpetuity",
    title: "As long as sky bodies shine",
    body:
      "Including both luminaries telegraphs the hope that Nepal lasts as long as celestial lights — a poetic line often repeated in reference works alongside the drier legal description of twelve solar rays and sixteen lunar rays (eight visible).",
    tint: "charcoal",
  },
];

export const flagGuidePullQuote =
  "Every clause in Schedule 1 is a compass bearing: miss one ratio and the flag stops reading as Nepal at the United Nations wall, the Olympic tunnel, or your own office lobby.";

export type FlagGuideGalleryItem = {
  src: string;
  alt: string;
  caption: string;
  /** Short label on the card */
  label: string;
  commonsFileUrl: string;
  /** raster vs vector for layout hints */
  kind: "raster" | "svg";
};

/** Mirrored from Wikimedia Commons — keep filenames if you refresh assets. */
export const flagGuideGallery: FlagGuideGalleryItem[] = [
  {
    src: "/guides/wikimedia/flag-nepal-1856-c1930.svg",
    kind: "svg",
    label: "1856 – c. 1930",
    alt: "Historical Nepal flag with faces on sun and moon (1856–c.1930 reconstruction).",
    caption: "Specimen with facial sun and moon before the 1962 modernisation.",
    commonsFileUrl: "https://commons.wikimedia.org/wiki/File:Flag_of_Nepal_(1856-c.1930).svg",
  },
  {
    src: "/guides/wikimedia/nepal-flag-1927.jpg",
    kind: "raster",
    label: "1927 photograph",
    alt: "Black and white photograph of early 20th-century Nepal flag displayed vertically.",
    caption: "Field photograph published in early travel literature — note fabric drape, not statute lines.",
    commonsFileUrl: "https://commons.wikimedia.org/wiki/File:Nepal_flag_1927.jpg",
  },
  {
    src: "/guides/wikimedia/flag-nepal-1743-1962.svg",
    kind: "svg",
    label: "1743 – 1962",
    alt: "Nepal flag variant used before 1962 with anthropomorphic sun and moon.",
    caption: "Long-form variant retained facial emblems until the December 1962 standard.",
    commonsFileUrl: "https://commons.wikimedia.org/wiki/File:Flag_of_Nepal_(1743–1962).svg",
  },
  {
    src: "/guides/wikimedia/nepal-flag-construction.png",
    kind: "raster",
    label: "Construction diagram",
    alt: "Geometric breakdown diagram of Nepal national flag angles and proportions.",
    caption: "Educational schematic showing how wedges and borders compound — compare to Schedule 1 coordinates.",
    commonsFileUrl: "https://commons.wikimedia.org/wiki/File:Nepal_Flag_Construction.png",
  },
];

export const flagGuideGeometryFacts = [
  {
    title: "Irrational outer ratio",
    body:
      "When you follow Nepal’s geometric construction verbatim, height : maximum width settles at an irrational value ≈ 1 : 1.21901033… catalogued as OEIS sequence A230582 — unusual for flags, poetic for classrooms.",
  },
  {
    title: "Rational crimson panel",
    body:
      "The crimson double-pennon alone fits a neat 3 : 4 bounding box; the irrational step appears once the stipulated blue border envelopes the assembly.",
  },
  {
    title: "Olympic exception",
    body:
      "Global events routinely force rectangular conformity: Rio 2016 often printed Nepal on white backdrops so rigging clamps matched everyone else’s hardware, whereas Tokyo 2020 manuals explicitly singled Nepal out for height-aligned exceptions.",
  },
] as const;
