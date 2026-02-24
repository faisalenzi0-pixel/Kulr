import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Extract Colors from Image — Color Palette from Photo | Kulr",
  description:
    "Extract color palettes from any image instantly. Drop a photo and get its dominant colors using K-means clustering. All processing in-browser — no uploads, 100% private. Free tool.",
  keywords: [
    "color palette from image",
    "extract colors from image",
    "image color picker",
    "photo color palette",
    "color extractor",
    "dominant colors",
    "image to palette",
    "color palette from photo",
  ],
  openGraph: {
    title: "Extract Colors from Image — Color Palette from Photo | Kulr",
    description:
      "Drop any image and extract its color palette instantly. K-means clustering, all in-browser, 100% private.",
    url: "https://kulr.app/extract",
  },
  twitter: {
    title: "Extract Colors from Image — Color Palette from Photo | Kulr",
    description:
      "Drop any image and extract its color palette instantly. K-means clustering, all in-browser, 100% private.",
  },
  alternates: {
    canonical: "https://kulr.app/extract",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kulr Image Color Extractor",
  url: "https://kulr.app/extract",
  applicationCategory: "DesignApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Extract color palettes from any image using K-means clustering. 100% in-browser, no uploads required.",
};

export default function ExtractLayout({ children }: { children: React.ReactNode }) {
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
