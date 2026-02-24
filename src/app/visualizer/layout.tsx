import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Palette Visualizer — Preview on Real UI Templates | Kulr",
  description:
    "Preview your color palettes on real UI mockups. See how colors look on dashboards, landing pages, mobile apps, e-commerce sites, and more. Free online color visualization tool.",
  keywords: [
    "color palette visualizer",
    "color preview tool",
    "palette preview",
    "UI color tester",
    "color scheme preview",
    "design mockup colors",
    "color palette tester",
    "palette on real UI",
  ],
  openGraph: {
    title: "Color Palette Visualizer — Preview on Real UI Templates | Kulr",
    description:
      "Preview color palettes on dashboards, landing pages, mobile apps, and e-commerce UIs. Free visualization tool.",
    url: "https://kulr.app/visualizer",
  },
  twitter: {
    title: "Color Palette Visualizer — Preview on Real UI Templates | Kulr",
    description:
      "Preview color palettes on dashboards, landing pages, mobile apps, and e-commerce UIs. Free visualization tool.",
  },
  alternates: {
    canonical: "https://kulr.app/visualizer",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kulr Palette Visualizer",
  url: "https://kulr.app/visualizer",
  applicationCategory: "DesignApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Preview color palettes on real UI templates including dashboards, landing pages, mobile apps, and e-commerce sites.",
};

export default function VisualizerLayout({ children }: { children: React.ReactNode }) {
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
