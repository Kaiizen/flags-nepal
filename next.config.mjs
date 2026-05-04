/**
 * Standard defense-in-depth headers applied to every response.
 *
 * These are deliberately conservative — a strict CSP would likely break the
 * Google Maps embed on `/contact` and any inline script from `opengraph-image`
 * or structured data, so we rely on `frame-ancestors`, `X-Content-Type-Options`,
 * Referrer / Permissions policies, and HSTS for the core hardening.
 */
const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  /** Minimal server bundle under `.next/standalone` — run `npm run build:cpanel` then start from that folder on cPanel/VPS. */
  output: "standalone",
  experimental: {
    /** Smaller client bundles — import icons as `import { Star } from "lucide-react"`. */
    optimizePackageImports: ["lucide-react"],
  },
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  // macOS / large workspaces: native file watchers can hit EMFILE and break the dev route tree (404 on /).
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;
