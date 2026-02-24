import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Palette Generator — Free Online Tool | Kulr",
  description:
    "Generate beautiful color palettes instantly. Press Space for random palettes, lock colors you love, choose harmony modes. Export to CSS, Tailwind, SCSS, JSON. Free, no sign-up.",
  keywords: [
    "color palette generator",
    "color scheme generator",
    "random color palette",
    "color harmony",
    "palette maker",
    "color combinations",
    "complementary colors",
    "analogous colors",
    "triadic colors",
  ],
  openGraph: {
    title: "Color Palette Generator — Free Online Tool | Kulr",
    description:
      "Generate beautiful color palettes instantly. Lock colors, pick harmony modes, export anywhere. Free forever.",
    url: "https://kulr.app/generate",
  },
  twitter: {
    title: "Color Palette Generator — Free Online Tool | Kulr",
    description:
      "Generate beautiful color palettes instantly. Lock colors, pick harmony modes, export anywhere. Free forever.",
  },
  alternates: {
    canonical: "https://kulr.app/generate",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kulr Color Palette Generator",
  url: "https://kulr.app/generate",
  applicationCategory: "DesignApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Generate beautiful color palettes with harmony modes, lock colors, and export to CSS, Tailwind, SCSS, and JSON.",
};

export default function GenerateLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
