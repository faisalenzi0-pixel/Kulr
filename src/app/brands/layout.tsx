import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand Colors — 30+ Iconic Brand Color Palettes with Hex Codes | Kulr",
  description:
    "Browse color palettes from 30+ iconic brands including Apple, Google, Nike, Spotify, and more. Get exact hex codes, RGB values, and the story behind each brand's color choices. Free tool for designers.",
  keywords: [
    "brand colors",
    "brand color palette",
    "brand hex codes",
    "company colors",
    "logo colors",
    "apple colors",
    "google colors",
    "nike colors",
    "spotify colors",
    "brand color guide",
  ],
  openGraph: {
    title: "Brand Colors — 30+ Iconic Brand Color Palettes | Kulr",
    description:
      "Color palettes from Apple, Google, Nike, Spotify, and 30+ more brands. Exact hex codes and color stories. Free.",
    url: "https://kulr.app/brands",
  },
  twitter: {
    title: "Brand Colors — 30+ Iconic Brand Color Palettes | Kulr",
    description:
      "Browse color palettes from 30+ iconic brands. Exact hex codes, RGB, and color stories.",
    images: ["/og-image.svg"],
  },
  alternates: {
    canonical: "https://kulr.app/brands",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Brand Color Palettes",
  url: "https://kulr.app/brands",
  description:
    "Browse color palettes from 30+ iconic brands. Get exact hex codes, RGB values, and the story behind each brand's colors.",
  publisher: { "@type": "Organization", name: "Kulr", url: "https://kulr.app" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Where can I find a brand's official colors?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kulr provides exact color palettes for 30+ brands including Apple, Google, Nike, Spotify, Tesla, and more. Each brand page shows hex codes, RGB values, color usage guidelines, and the story behind the color choices. You can copy codes instantly and export as CSS, Tailwind, or SCSS.",
      },
    },
    {
      "@type": "Question",
      name: "Why do brands choose specific colors?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Brands choose colors based on psychology, industry norms, and differentiation. Coca-Cola uses red for energy and appetite stimulation. Facebook chose blue for trust and reliability. Spotify's green stands for growth and freshness. Brand colors become deeply tied to recognition — changing them can cost millions in lost brand equity.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use brand colors in my own designs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Brand colors themselves (hex values) are not copyrightable — anyone can use the same shade of blue as Facebook. However, using brand colors in a way that implies affiliation or endorsement may violate trademark law. For inspiration and reference, studying brand palettes is a standard design practice.",
      },
    },
  ],
};

export default function BrandsLayout({ children }: { children: React.ReactNode }) {
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
