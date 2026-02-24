import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSS Gradient Generator — Linear, Radial & Conic | Kulr",
  description:
    "Build beautiful CSS gradients with a visual editor. Linear, radial, and conic gradients with multi-stop support. Copy production-ready CSS code instantly. Free online gradient maker.",
  keywords: [
    "gradient generator",
    "CSS gradient generator",
    "linear gradient",
    "radial gradient",
    "conic gradient",
    "gradient maker",
    "CSS gradient",
    "color gradient tool",
    "gradient builder",
  ],
  openGraph: {
    title: "CSS Gradient Generator — Linear, Radial & Conic | Kulr",
    description:
      "Build beautiful CSS gradients visually. Linear, radial, conic with multi-stop support. Copy CSS instantly.",
    url: "https://kulr.app/gradient",
  },
  twitter: {
    title: "CSS Gradient Generator — Linear, Radial & Conic | Kulr",
    description:
      "Build beautiful CSS gradients visually. Linear, radial, conic with multi-stop support. Copy CSS instantly.",
  },
  alternates: {
    canonical: "https://kulr.app/gradient",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kulr CSS Gradient Generator",
  url: "https://kulr.app/gradient",
  applicationCategory: "DesignApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Build linear, radial, and conic CSS gradients with a visual multi-stop editor. Copy production-ready code.",
};

export default function GradientLayout({ children }: { children: React.ReactNode }) {
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
