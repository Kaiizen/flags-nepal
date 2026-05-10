export type ProductCategory =
  | "hand-flags"
  | "table-stands"
  | "indoor-outdoor-stands"
  | "vehicle-stands-sticks"
  | "hardware-fabrics";

export type Product = {
  slug: string;
  name: string;
  code?: string;
  shortDescription: string;
  description: string;
  specifications: string[];
  category: ProductCategory;
  images: string[];
};

export const products: Product[] = [
  {
    slug: "hand-flag-with-stick-hst-01",
    name: "Hand Flag with Stick",
    code: "HST-01",
    shortDescription: "Standard handheld flag for events and ceremonies.",
    description: "Normal fabric hand flag system suitable for rallies and public programs.",
    specifications: ["Fabric: Normal (55 gsm)", "Stick size: 40 cm", "Flag size: 6 x 9 inch"],
    category: "hand-flags",
    images: [
      "/products/hand-flag-with-stick-hst-01/single.png",
      "/products/hand-flag-with-stick-hst-01/group.png",
    ],
  },
  {
    slug: "hand-flag-stick-only-hst-11",
    name: "Hand Flag Stick Only",
    code: "HST-11",
    shortDescription: "Stick-only option for hand flags.",
    description: "Replacement hand flag stick for existing flag fabric sets.",
    specifications: ["Stick size: 40 cm"],
    category: "hand-flags",
    images: ["/products/hand-flag-stick-only-hst-11/stick.png"],
  },
  {
    slug: "single-table-stand-tfs-1",
    name: "Single Table Stand",
    code: "TFS-1",
    shortDescription: "Classic single desk stand for institutional display.",
    description: "Single table stand with optional normal or premium flag finish.",
    specifications: ["Stand size: 27 cm", "Flag size: 5.5 x 8.3 inch"],
    category: "table-stands",
    images: [
      "/products/single-table-stand-tfs-1/nepal-flag.png",
      "/products/single-table-stand-tfs-1/uk-flag.png",
    ],
  },
  {
    slug: "single-table-stand-tfs-2",
    name: "Single Table Stand",
    code: "TFS-2",
    shortDescription: "Compact single desk stand variant.",
    description: "Alternative single table stand model for offices and reception desks.",
    specifications: ["Stand size: 27 cm", "Flag size: 5.5 x 8.3 inch"],
    category: "table-stands",
    images: ["/products/single-table-stand-tfs-2/stand.png"],
  },
  {
    slug: "y-table-stand-tfs-y",
    name: "Y Table Stand",
    code: "TFS-Y",
    shortDescription: "Y-shaped desktop display stand.",
    description: "Dual-angle stand format designed for formal desk and podium setups.",
    specifications: ["Stand size: 27 cm", "Flag size: 5.8 x 8.6 inch"],
    category: "table-stands",
    images: [
      "/products/y-table-stand-tfs-y/canada-usa.png",
      "/products/y-table-stand-tfs-y/custom-branded.png",
    ],
  },
  {
    slug: "v-table-stand-pdb-v",
    name: "V Table Stand",
    code: "PDB-V",
    shortDescription: "V-shaped premium desk flag stand.",
    description: "A compact V-display system for premium tabletop flag presentation.",
    specifications: ["Flag size: 5 x 7.4 inch"],
    category: "table-stands",
    images: [
      "/products/v-table-stand-pdb-v/korea-japan.png",
      "/products/v-table-stand-pdb-v/korea-usa.png",
    ],
  },
  {
    slug: "pennant-stand-ppr-t",
    name: "Pennant Stand",
    code: "PPR-T",
    shortDescription: "Tall pennant stand for desk and podium use.",
    description: "Pennant-format stand system for custom and ceremonial pennants.",
    specifications: ["Stand size: 49.5 cm", "Flag size: 36 x 30 cm"],
    category: "table-stands",
    images: [
      "/products/pennant-stand-ppr-t/single.png",
      "/products/pennant-stand-ppr-t/trio.png",
    ],
  },
  {
    slug: "desk-feather-stand-dfp-o",
    name: "Desk Feather Stand",
    code: "DFP-O",
    shortDescription: "Half-oval desktop feather display.",
    description: "Desk feather stand with optional net fabric output in two sizes.",
    specifications: ["Flag size: 0.3 / 0.6 m half oval", "Size options: 0.4 m and 0.7 m"],
    category: "table-stands",
    images: [
      "/products/desk-feather-stand-dfp-o/single.png",
      "/products/desk-feather-stand-dfp-o/group.png",
    ],
  },
  {
    slug: "golden-stand-fst",
    name: "Golden Stand",
    code: "FST",
    shortDescription: "Ceremonial indoor pole stand available in multiple heights.",
    description: "Golden floor stand series for normal, net, and silk fabrics. Ideal for offices, institutions, and grand interior spaces.",
    specifications: [
      "FST-21 — Stand size: 2 m",
      "FST-22 — Stand size: 2.6 m",
      "FST-23 — Stand size: 3 m",
      "Flag size: 3 x 5 feet (all models)",
    ],
    category: "indoor-outdoor-stands",
    images: [
      "/products/golden-stand-1-fst-21/nepal-flag.png",
      "/products/golden-stand-1-fst-21/usa-flag.png",
      "/products/golden-stand-1-fst-21/group.png",
      "/products/golden-stand-1-fst-21/office-nepal.png",
      "/products/golden-stand-1-fst-21/office-usa.png",
    ],
  },
  {
    slug: "beach-stand-bst-25",
    name: "Beach Stand",
    code: "BST-25",
    shortDescription: "Outdoor beach flag stand with multiple heights.",
    description: "Outdoor stand system with single and double net fabric options.",
    specifications: ["Stand sizes: 2.5 m, 3.4 m, 4.5 m", "Supports single and double setup"],
    category: "indoor-outdoor-stands",
    images: ["/products/beach-stand-bst-25/beach-stand.png"],
  },
  {
    slug: "beach-stand-bag-bec-bag",
    name: "Beach Stand Bag",
    code: "BEC-BAG",
    shortDescription: "Carry bag for beach stand hardware.",
    description: "Dedicated transport bag with storage pockets for beach stand components.",
    specifications: ["For stand size: 4.5 m", "Bag size: 6.5 x 1.0 x 0.25 feet"],
    category: "indoor-outdoor-stands",
    images: [
      "/products/beach-stand-bag-bec-bag/bag.png",
      "/products/beach-stand-bag-bec-bag/bag-open.png",
    ],
  },
  {
    slug: "pop-up-a-frame-pop-100-200",
    name: "Pop-up A-Frame",
    code: "POP-100/200",
    shortDescription: "Oval pop-up A-frame for indoor and outdoor branding.",
    description:
      "Lightweight, collapsible A-frame with a wide oval print area — mainly used for branding at events, retail, fields, and exhibitions. Folds down for easy transport. Choose the size that matches your layout and sightlines.",
    specifications: [
      "SKU: POP-100/200",
      "POP-100 — 100 cm circle circumference (oval frame)",
      "POP-200 — 200 cm circle circumference (oval frame)",
      "Primary use: display branding, promotions, and sponsor visibility (indoor & outdoor)",
    ],
    category: "indoor-outdoor-stands",
    images: [
      "/products/pop-up-a-frame-pop-100-200/branded-display.png",
      "/products/pop-up-a-frame-pop-100-200/outdoor-event.png",
      "/products/pop-up-a-frame-pop-100-200/setup-variants.png",
    ],
  },
  {
    slug: "bike-pole-back-bfp-0b",
    name: "Bike Pole Back",
    code: "BFP-0B",
    shortDescription: "Rear-mounted bike flag system.",
    description: "Bike pole assembly for rear installation with standard flag size support.",
    specifications: ["Stand size: 1 m", "Flag size: 3 x 2 feet"],
    category: "vehicle-stands-sticks",
    images: [
      "/products/bike-pole-back-bfp-0b/bike-mounted.png",
      "/products/bike-pole-back-bfp-0b/pole-options.png",
    ],
  },
  {
    slug: "front-bike-stand-bfp-0f",
    name: "Front Bike Stand",
    code: "BFP-0F",
    shortDescription: "Front-mounted compact bike stand.",
    description: "Front bike stand for small ceremonial and campaign flag displays.",
    specifications: ["Stand size: 28 cm", "Flag size: 5.5 x 8.3 inch"],
    category: "vehicle-stands-sticks",
    images: [
      "/products/front-bike-stand-bfp-0f/bike-mounted.png",
      "/products/front-bike-stand-bfp-0f/stand.png",
    ],
  },
  {
    slug: "black-base-stand-bbc-01",
    name: "Black Base Stand",
    code: "BBC-01",
    shortDescription: "Premium base stand for car usage.",
    description: "Vehicle display base with optional normal and premium flag pairing.",
    specifications: ["Stand size: 29 cm", "Flag size: 5.5 x 8.3 inch"],
    category: "vehicle-stands-sticks",
    images: [
      "/products/black-base-stand-bbc-01/car-mounted.png",
      "/products/black-base-stand-bbc-01/stand.png",
    ],
  },
  {
    slug: "multi-use-white-base-wbc-01",
    name: "Multi Use White Base",
    code: "WBC-01",
    shortDescription: "Multi-use car and display stand.",
    description: "White base stand suited for vehicles and temporary display fixtures.",
    specifications: ["Stand size: 54.5 cm", "Flag size: 36 cm height"],
    category: "vehicle-stands-sticks",
    images: [
      "/products/multi-use-white-base-wbc-01/car-mount.png",
    ],
  },
  {
    slug: "x-crystal-stand-bcb-0x",
    name: "X Crystal Stand",
    code: "BCB-0X",
    shortDescription: "Mini crystal stand for custom badges and mini flags.",
    description: "Compact crystal stand for decorative desk and dashboard placements.",
    specifications: ["Stand size: 15.5 cm", "Flag size: 6.6 x 8.8 cm"],
    category: "vehicle-stands-sticks",
    images: [
      "/products/x-crystal-stand-bcb-0x/single.png",
      "/products/x-crystal-stand-bcb-0x/group.png",
    ],
  },
  {
    slug: "car-banner-stick-cbs",
    name: "Car Banner Stick",
    code: "CBS",
    shortDescription: "Custom car banner sticks available in multiple sizes.",
    description: "Car banner stick system for vehicle-mounted branding and display. Available in compact and extended formats.",
    specifications: [
      "CBS-01 — Banner height: 17 cm, Flag size: 17 x 36 cm",
      "CBS-02 — Banner height: 24 cm, Flag size: 24 x 51 cm",
    ],
    category: "vehicle-stands-sticks",
    images: [
      "/products/car-banner-stick-cbs/banner-display.png",
    ],
  },
  {
    slug: "car-window-stick-cwf",
    name: "Car Window Stick",
    code: "CWF",
    shortDescription: "Window-mounted car flag stick available in multiple sizes.",
    description: "Car window stick system for vehicle flag display. Available in three sizes for different flag dimensions.",
    specifications: [
      "CWF-01 — Stick size: 37 cm, Flag size: 20 x 30 cm",
      "CWF-02 — Stick size: 43 cm, Flag size: 30 x 45 cm",
      "CWF-03 — Stick size: 50 cm, Flag size: 35 x 55 cm",
    ],
    category: "vehicle-stands-sticks",
    images: [
      "/products/car-window-stick-cwf/car-mounted.png",
      "/products/car-window-stick-cwf/stick.png",
    ],
  },
  {
    slug: "climb-hook-clh",
    name: "Climb Hook",
    code: "CLH",
    shortDescription: "Hook set for various pole mount applications.",
    description: "Hardware hook range for wall and pole anchor points.",
    specifications: ["Variants: 4, 5, 6, 7, 8"],
    category: "hardware-fabrics",
    images: [
      "/products/climb-hook-clh/hooks.png",
    ],
  },
  {
    slug: "wallmount-flag-pole-wmp-1b",
    name: "Wallmount Flag Pole",
    code: "WMP-1B",
    shortDescription: "Wall-mounted pole kit.",
    description: "Wallmount pole system for residential and commercial facades.",
    specifications: ["Pole size: 1 m", "Flag size: 3 x 2 feet"],
    category: "hardware-fabrics",
    images: ["/products/wallmount-flag-pole-wmp-1b/wall-mount.png"],
  },
  {
    slug: "hand-guider-stick-hgp-16",
    name: "Hand Guider Stick",
    code: "HGP-16",
    shortDescription: "Guiding stick for processions and parade use.",
    description: "Long hand guider stick available with or without flag setup.",
    specifications: ["Stick size: 1.6 m", "Flag size: 3 x 2 feet"],
    category: "hardware-fabrics",
    images: ["/products/hand-guider-stick-hgp-16/guider-stick.png"],
  },
  {
    slug: "flag-pole-clip-fpc",
    name: "Flag Pole Clip",
    code: "FPC",
    shortDescription: "Pole clip hardware in brass variants.",
    description: "Clip accessories for fastening flags to pole systems.",
    specifications: ["Material options: Pure Brass Big, Pure Brass Small"],
    category: "hardware-fabrics",
    images: [
      "/products/flag-pole-clip-fpc/clip.png",
    ],
  },
  {
    slug: "buckle-buc-le",
    name: "Buckle",
    code: "BUC-LE",
    shortDescription: "General-purpose buckle accessory.",
    description: "Buckle component used across different fixing configurations.",
    specifications: ["Hardware accessory for mounting and fastening"],
    category: "hardware-fabrics",
    images: [
      "/products/buckle-buc-le/buckle.png",
    ],
  },
  {
    slug: "stainless-steel-hook-ssh-oo",
    name: "Stainless Steel Hook",
    code: "SSH-OO",
    shortDescription: "Steel hook for durable outdoor use.",
    description: "Corrosion-resistant hook component for flag and banner mounting.",
    specifications: ["Material: Stainless steel"],
    category: "hardware-fabrics",
    images: ["/products/stainless-steel-hook-ssh-oo/hook.png"],
  },
  {
    slug: "flag-fabric-range",
    name: "Flag Fabric Range",
    shortDescription: "Fabric options for custom flag production.",
    description: "Multiple fabric grades for indoor and outdoor flags.",
    specifications: [
      "Polyester 55 gsm",
      "Net fabric 110 gsm",
      "Mesh fabric 120 gsm",
      "Display fabric 210 gsm",
      "Premium silk 120 gsm",
      "Thin silk 80 gsm",
    ],
    category: "hardware-fabrics",
    images: [
      "/products/flag-fabric-range/fabric-rolls.jpg",
      "/products/flag-fabric-range/fabric-texture.jpg",
    ],
  },
];

export const categoryLabel: Record<ProductCategory, string> = {
  "hand-flags": "Hand Flags",
  "table-stands": "Table Stands",
  "indoor-outdoor-stands": "Indoor & Outdoor Stands",
  "vehicle-stands-sticks": "Vehicle Stands & Sticks",
  "hardware-fabrics": "Hardware & Fabrics",
};

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
