import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore 240+ Color Palettes — Curated Collection | Kulr",
  description:
    "Browse 240+ hand-picked color palettes. Filter by mood, style, season, and industry. Trending 2026, Material, Tailwind, and brand-inspired palettes. Copy, save, and export instantly.",
  keywords: [
    "color palette ideas",
    "color palette inspiration",
    "curated color palettes",
    "trending color palettes 2026",
    "color schemes",
    "color palette collection",
    "design color palettes",
    "material design colors",
    "tailwind color palettes",
  ],
  openGraph: {
    title: "Explore 240+ Color Palettes — Curated Collection | Kulr",
    description:
      "Browse 240+ hand-picked color palettes filtered by mood, style, season, and industry. Free to use.",
    url: "https://kulr.app/explore",
  },
  twitter: {
    title: "Explore 240+ Color Palettes — Curated Collection | Kulr",
    description:
      "Browse 240+ hand-picked color palettes filtered by mood, style, season, and industry. Free to use.",
  },
  alternates: {
    canonical: "https://kulr.app/explore",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Kulr Curated Color Palettes",
  url: "https://kulr.app/explore",
  description:
    "Browse 240+ hand-picked color palettes filtered by mood, style, season, and industry.",
  isPartOf: { "@type": "WebSite", name: "Kulr", url: "https://kulr.app" },
};

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
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
