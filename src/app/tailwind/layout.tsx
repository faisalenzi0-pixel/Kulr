import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tailwind CSS Colors — Full Palette Reference & Generator | Kulr",
  description:
    "Browse the complete Tailwind CSS v4 color palette with all 22 color families and 242 shades. Click to copy hex, RGB, HSL, or class names. Generate custom shade scales from any color. Free reference tool.",
  keywords: [
    "tailwind colors",
    "tailwind css colors",
    "tailwind color palette",
    "tailwind color generator",
    "tailwind shades",
    "tailwind css color reference",
    "tailwind custom colors",
    "tailwind color scale",
    "tailwind hex codes",
  ],
  openGraph: {
    title: "Tailwind CSS Colors — Full Palette Reference & Generator | Kulr",
    description:
      "Browse the complete Tailwind CSS v4 color palette. Click to copy hex, RGB, HSL, or class names. Generate custom shade scales.",
    url: "https://kulr.app/tailwind",
  },
  twitter: {
    title: "Tailwind CSS Colors — Full Palette Reference & Generator | Kulr",
    description:
      "Browse the full Tailwind CSS v4 color palette. Copy shades, generate custom scales. Free reference.",
    images: ["/og-image.svg"],
  },
  alternates: {
    canonical: "https://kulr.app/tailwind",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kulr Tailwind Colors",
  url: "https://kulr.app/tailwind",
  applicationCategory: "DesignApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Complete Tailwind CSS v4 color palette reference with custom shade scale generator.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What colors are included in Tailwind CSS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tailwind CSS v4 includes 22 color families: slate, gray, zinc, neutral, stone, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, and rose. Each family has 11 shades from 50 (lightest) to 950 (darkest), totaling 242 colors.",
      },
    },
    {
      "@type": "Question",
      name: "How do I add custom colors to Tailwind CSS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In Tailwind CSS v4, add custom colors using the @theme directive in your CSS file. Define CSS custom properties like --color-brand-500: #6366f1. In v3, extend the colors object in tailwind.config.js. Kulr's shade generator creates a full 50-950 scale from any hex color you provide.",
      },
    },
    {
      "@type": "Question",
      name: "What changed in Tailwind CSS v4 colors?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tailwind CSS v4 switched from a JavaScript config to CSS-native @theme configuration. Colors are now defined as CSS custom properties, making them easier to override and use with modern CSS features. The default palette colors remain the same, but shades 950 were added for deeper darks.",
      },
    },
  ],
};

export default function TailwindLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
