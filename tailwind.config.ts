import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        crimson: "#B91C1C",
        "deep-blue": "#1E3A5F",
        cream: "#FAF7F2",
        charcoal: "#0F0F0F",
        muted: "#6B7280",
        gold: "#D4A853",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        nepali: [
          "var(--font-nepali)",
          "Noto Sans Devanagari",
          "Mukta Mahee",
          "system-ui",
          "sans-serif",
        ],
      },
      fontSize: {
        display: ["80px", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-md": ["64px", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-sm": ["48px", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        heading: ["36px", { lineHeight: "1.2" }],
        "heading-sm": ["28px", { lineHeight: "1.25" }],
      },
      maxWidth: {
        content: "1200px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "whatsapp-breathe": {
          "0%": { transform: "scale(1)", opacity: "0.55" },
          "70%": { transform: "scale(1.35)", opacity: "0" },
          "100%": { transform: "scale(1.35)", opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
