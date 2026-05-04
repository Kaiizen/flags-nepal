import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Flags Nepal",
    short_name: "Flags Nepal",
    description: "Premium flags, banners, and printed identity from Kathmandu, Nepal.",
    start_url: "/",
    display: "standalone",
    background_color: "#111111",
    theme_color: "#111111",
    icons: [
      {
        src: "/flags-nepal-logo-site.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/flags-nepal-logo-site.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
