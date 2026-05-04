import { ContactRibbon } from "@/components/layout/ContactRibbon";
import { Footer } from "@/components/layout/Footer";
import { MediaGuard } from "@/components/layout/MediaGuard";
import { Navbar } from "@/components/layout/Navbar";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { MotionProvider } from "@/components/MotionProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { buildRootJsonLd } from "@/lib/json-ld";
import { siteConfig } from "@/lib/site";
import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Devanagari, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  variable: "--font-playfair",
  display: "swap",
  adjustFontFallback: true,
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: true,
});

const notoNepali = Noto_Sans_Devanagari({
  subsets: ["devanagari", "latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-nepali",
  display: "swap",
  adjustFontFallback: true,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flagsnepal.com";

export const viewport: Viewport = {
  themeColor: "#0F0F0F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Flags Nepal",
  title: {
    default: "Flags Nepal — Crafted with Pride",
    template: "%s · Flags Nepal",
  },
  description: siteConfig.tagline,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Flags Nepal",
    "buy Nepal flag",
    "Nepal flag price",
    "flag manufacturer Nepal",
    "flag printing Nepal",
    "flag printing Kathmandu",
    "custom flag printing Nepal",
    "Nepal flag online",
    "flag shop Kathmandu",
    "custom flags Kathmandu",
    "table flag stand Nepal",
    "ceremonial flags Nepal",
    "banner printing Nepal",
    "sublimation printing Kathmandu",
    "jersey printing Kathmandu",
  ],
  category: "business",
  icons: {
    icon: [
      { url: "/flags-nepal-logo-site.png", type: "image/png", sizes: "512x512" },
      { url: "/flags-nepal-logo.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/flags-nepal-logo-site.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/flags-nepal-logo-site.png"],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Flags Nepal — Crafted with Pride",
    description: siteConfig.tagline,
    url: siteUrl,
    siteName: "Flags Nepal",
    locale: "en_NP",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Flags Nepal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flags Nepal",
    description: siteConfig.tagline,
    images: ["/opengraph-image"],
  },
  appleWebApp: {
    capable: true,
    title: "Flags Nepal",
    statusBarStyle: "default",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const rootJsonLd = buildRootJsonLd(siteUrl);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${notoNepali.variable} h-full`}>
      <body className="flex min-h-screen flex-col bg-charcoal font-sans text-cream antialiased">
        <a
          href="#main-content"
          className="skip-link"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootJsonLd) }}
        />
        <MotionProvider>
          <CustomCursor />
          <MediaGuard />
          <ContactRibbon />
          <Navbar />
          <main id="main-content" className="min-h-[50vh] flex-1" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <WhatsAppFab />
        </MotionProvider>
      </body>
    </html>
  );
}
