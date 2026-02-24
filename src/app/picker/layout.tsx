import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Picker — Free Online Hex, RGB & HSL Picker | Kulr",
  description:
    "Pick any color and get hex, RGB, and HSL codes instantly. Interactive visual picker with color harmonies, RGB sliders, and CSS named color detection. Free online tool, no sign-up.",
  keywords: [
    "color picker",
    "color picker online",
    "hex color picker",
    "RGB color picker",
    "HSL color picker",
    "online color picker",
    "color selector",
    "pick color from screen",
    "color chooser",
    "html color picker",
  ],
  openGraph: {
    title: "Color Picker — Free Online Hex, RGB & HSL Picker | Kulr",
    description:
      "Pick any color and get hex, RGB, HSL codes instantly. Visual picker with harmonies and RGB sliders. Free, no sign-up.",
    url: "https://kulr.app/picker",
  },
  twitter: {
    title: "Color Picker — Free Online Hex, RGB & HSL Picker | Kulr",
    description:
      "Pick any color and get hex, RGB, HSL codes instantly. Visual picker with harmonies and RGB sliders.",
    images: ["/og-image.svg"],
  },
  alternates: {
    canonical: "https://kulr.app/picker",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kulr Color Picker",
  url: "https://kulr.app/picker",
  applicationCategory: "DesignApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Interactive color picker with hex, RGB, HSL output, color harmonies, and CSS named color detection.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a color picker used for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A color picker lets you select any color visually and get its exact code in formats like HEX (#FF5733), RGB (255, 87, 51), and HSL (11°, 100%, 60%). Designers and developers use it to find precise colors for websites, apps, logos, and digital art.",
      },
    },
    {
      "@type": "Question",
      name: "What are color harmonies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Color harmonies are combinations of colors that look visually pleasing together, based on their positions on the color wheel. Common types include complementary (opposite colors), analogous (adjacent colors), triadic (three equally spaced colors), and split-complementary. Kulr generates 7 harmony types automatically from any picked color.",
      },
    },
    {
      "@type": "Question",
      name: "How do I pick a color from my screen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kulr's color picker provides a visual canvas where you drag to select any hue and saturation, plus sliders for fine-tuning RGB values. You can also type a hex code directly to jump to a specific color. For picking from other apps, browsers like Chrome support the EyeDropper API.",
      },
    },
  ],
};

export default function PickerLayout({ children }: { children: React.ReactNode }) {
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
