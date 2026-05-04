export type WorkCategory =
  | "National Flag"
  | "Corporate Branding"
  | "Custom Print"
  | "Desk & Table"
  | "Vehicle & Outdoor";

/** Local path under `public/` (e.g. `/works/everest/clip.mp4`) or absolute URL. */
export type WorkVideo = {
  src: string;
  /** Defaults to the work’s still `image` if omitted. */
  poster?: string;
};

export type WorkItem = {
  slug: string;
  title: string;
  category: WorkCategory;
  description: string;
  image: string;
  year: number;
  scope: string;
  specs: string[];
  imagePosition?: string;
  /** Plays in cards when set; image remains fallback and SEO-friendly still. */
  video?: WorkVideo;
};

export const works: WorkItem[] = [
  {
    slug: "himalaya",
    title: "HIMALAYA",
    category: "National Flag",
    description:
      "Full-height golden stand series supplied to government ministries and embassies — precision-matched Pantone colours to official specifications with reinforced pole fittings.",
    image: "/works/himalaya/himalaya-feature.png",
    year: 2024,
    scope: "Government & Diplomatic",
    specs: ["Brass pole & base", "Official Pantone match", "Indoor rated"],
  },
  {
    slug: "everest",
    title: "EVEREST",
    category: "Corporate Branding",
    description:
      "Branded feather banners for outdoor trade shows and storefronts — double-sided sublimation printing on polyester knit with weighted cross-base for wind stability.",
    image: "/products/desk-feather-stand-dfp-o/single.png",
    year: 2024,
    scope: "Trade Shows & Retail",
    specs: ["Double-sided print", "Polyester knit", "Cross-base included"],
    video: {
      src: "/works/everest/everest-forged.mov?v=1",
    },
  },
  {
    slug: "pashupatinath",
    title: "PASHUPATINATH",
    category: "Custom Print",
    description:
      "Gold-fringed ceremonial pennants for diplomatic exchange programs — custom artwork on satin with wooden hanger bar and tassels.",
    image: "/works/pashupatinath/ceremonial-flags.png",
    year: 2023,
    scope: "Diplomatic & Ceremonial",
    specs: ["Satin fabric", "Gold fringe finish", "Custom artwork"],
  },
  {
    slug: "lumbini",
    title: "LUMBINI",
    category: "Desk & Table",
    description:
      "Crystal-base dual desk flags for bilateral meeting rooms — laser-etched branding on the base with chrome poles and miniature national flags.",
    image: "/works/lumbini/y-table-stand.png",
    year: 2023,
    scope: "Offices & Boardrooms",
    specs: ["Crystal base", "Chrome poles", "Laser-etched branding"],
  },
  {
    slug: "annapurna",
    title: "ANNAPURNA",
    category: "Vehicle & Outdoor",
    description:
      "Car-mounted flag systems for diplomatic convoys and VIP vehicles — quick-attach magnetic base with flexible pole rated for highway speeds.",
    image: "/products/car-window-stick-cwf/car-mounted.png",
    year: 2024,
    scope: "VIP & Diplomatic Fleet",
    specs: ["Magnetic mount", "Highway rated", "Quick-attach system"],
  },
  {
    slug: "janakpur",
    title: "JANAKPUR",
    category: "Desk & Table",
    description:
      "V-base dual-flag table stands for international partnership displays — weighted metal base with interchangeable flag inserts.",
    image: "/works/janakpur/desk-feather-stand.png",
    year: 2023,
    scope: "International Relations",
    specs: ["Metal V-base", "Weighted stand", "Interchangeable flags"],
  },
  {
    slug: "sagarmatha",
    title: "SAGARMATHA",
    category: "Corporate Branding",
    description:
      "Custom branded Y-frame displays for product launches — full-colour sublimation on tension fabric with aluminium frame.",
    image: "/works/sagarmatha/golden-stand-flags.png",
    year: 2024,
    scope: "Product Launches",
    specs: ["Tension fabric", "Aluminium frame", "Full-colour print"],
  },
  {
    slug: "bhaktapur",
    title: "BHAKTAPUR",
    category: "Vehicle & Outdoor",
    description:
      "Front-mount bike flag stands for national day parades and rally convoys — stainless steel clamp with vibration dampening.",
    image: "/works/bhaktapur/black-base-stand-usage.png",
    year: 2023,
    scope: "Parades & National Events",
    specs: ["Stainless steel clamp", "Vibration dampened", "Universal fit"],
  },
];
