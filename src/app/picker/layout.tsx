import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Picker — HSB, HEX, RGB, HSL, CMYK & More | Kulr",
  description:
    "Professional color picker with Photoshop-style HSB canvas, EyeDropper API, 6 output formats (HEX, RGB, HSL, HSB, CMYK, HWB), color harmonies wheel, tints & shades, WCAG contrast checking, color blindness simulation, and nearest Tailwind class. Free, no sign-up.",
  keywords: [
    "color picker",
    "color picker online",
    "hex color picker",
    "RGB color picker",
    "HSL color picker",
    "HSB color picker",
    "CMYK color picker",
    "eyedropper color picker",
    "color harmony wheel",
    "color blindness simulator",
    "WCAG contrast checker",
    "tailwind color finder",
    "online color picker",
    "color selector",
    "pick color from screen",
  ],
  openGraph: {
    title: "Color Picker — HSB, HEX, RGB, HSL, CMYK & More | Kulr",
    description:
      "Professional Photoshop-style color picker with 6 formats, EyeDropper, harmony wheel, tints & shades, contrast checking, and color blindness simulation. Free, no sign-up.",
    url: "https://kulr.app/picker",
  },
  twitter: {
    title: "Color Picker — HSB, HEX, RGB, HSL, CMYK & More | Kulr",
    description:
      "Professional Photoshop-style color picker with 6 formats, harmony wheel, tints & shades, and accessibility tools.",
    images: ["/og-image.png"],
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
    "Professional color picker with HSB canvas, 6 output formats, color harmony wheel, tints & shades, WCAG contrast checking, color blindness simulation, and nearest Tailwind class detection.",
  featureList: [
    "HSB/HSV Photoshop-style color canvas",
    "EyeDropper API (pick from screen)",
    "6 output formats: HEX, RGB, HSL, HSB, CMYK, HWB",
    "Interactive color harmony wheel",
    "Tints & shades generator",
    "WCAG contrast ratio checking",
    "Color blindness simulation",
    "Nearest Tailwind CSS class finder",
  ],
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
        text: "A color picker lets you select any color visually and get its exact code in formats like HEX (#FF5733), RGB (255, 87, 51), HSL, HSB, CMYK, and HWB. Designers and developers use it to find precise colors for websites, apps, logos, and digital art.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between HSB and HSL?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "HSB (Hue, Saturation, Brightness) and HSL (Hue, Saturation, Lightness) are both ways to describe color, but HSB is more intuitive for designers. In HSB, 100% brightness with 100% saturation gives you the pure hue. HSB is the model used by Photoshop, Figma, and Sketch. Kulr supports both formats.",
      },
    },
    {
      "@type": "Question",
      name: "How do I pick a color from my screen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kulr integrates the EyeDropper API (available in Chrome and Edge) that lets you click anywhere on your screen to pick a color. Click the Eyedropper button, then click any pixel on your screen. The color code is captured instantly in all 6 formats.",
      },
    },
    {
      "@type": "Question",
      name: "What are color harmonies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Color harmonies are combinations of colors that look visually pleasing together, based on their positions on the color wheel. Kulr generates 5 harmony types: complementary, analogous, triadic, split-complementary, and tetradic — all visualized on an interactive color wheel.",
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
