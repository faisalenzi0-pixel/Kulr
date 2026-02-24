import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Contrast Checker — WCAG AA & AAA Accessibility | Kulr",
  description:
    "Check color contrast ratios for WCAG 2.1 AA and AAA compliance. Real-time accessibility scoring, auto-suggest accessible alternatives, color blindness simulation. Free online tool.",
  keywords: [
    "contrast checker",
    "color contrast checker",
    "WCAG contrast",
    "accessibility checker",
    "color accessibility",
    "AA contrast ratio",
    "AAA contrast ratio",
    "color blindness simulator",
    "accessible colors",
  ],
  openGraph: {
    title: "Color Contrast Checker — WCAG AA & AAA Accessibility | Kulr",
    description:
      "Check color contrast for WCAG compliance. Real-time AA & AAA scoring with auto-suggest and color blindness simulation.",
    url: "https://kulr.app/contrast",
  },
  twitter: {
    title: "Color Contrast Checker — WCAG AA & AAA Accessibility | Kulr",
    description:
      "Check color contrast for WCAG compliance. Real-time AA & AAA scoring with auto-suggest and color blindness simulation.",
  },
  alternates: {
    canonical: "https://kulr.app/contrast",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kulr Contrast Checker",
  url: "https://kulr.app/contrast",
  applicationCategory: "DesignApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Check color contrast ratios for WCAG 2.1 AA and AAA compliance with color blindness simulation.",
};

export default function ContrastLayout({ children }: { children: React.ReactNode }) {
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
