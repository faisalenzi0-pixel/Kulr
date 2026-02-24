import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Converter — HEX to RGB, HSL & CMYK | Kulr",
  description:
    "Convert colors between HEX, RGB, HSL, and CMYK formats instantly. Paste any color code and get all formats with one click copy. CSS declarations and Tailwind syntax included. Free online tool.",
  keywords: [
    "hex to rgb",
    "rgb to hex",
    "color converter",
    "hex to hsl",
    "hsl to hex",
    "rgb to hsl",
    "color format converter",
    "hex to cmyk",
    "color code converter",
    "css color converter",
  ],
  openGraph: {
    title: "Color Converter — HEX to RGB, HSL & CMYK | Kulr",
    description:
      "Convert colors between HEX, RGB, HSL, and CMYK instantly. Paste a code, get all formats. Free online tool.",
    url: "https://kulr.app/convert",
  },
  twitter: {
    title: "Color Converter — HEX to RGB, HSL & CMYK | Kulr",
    description:
      "Convert colors between HEX, RGB, HSL, and CMYK instantly. Paste a code, get all formats.",
    images: ["/og-image.svg"],
  },
  alternates: {
    canonical: "https://kulr.app/convert",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kulr Color Converter",
  url: "https://kulr.app/convert",
  applicationCategory: "DesignApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Convert colors between HEX, RGB, HSL, and CMYK formats with CSS declarations and Tailwind syntax.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I convert HEX to RGB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To convert HEX to RGB, split the 6-character hex code into 3 pairs and convert each from hexadecimal to decimal. For example, #FF5733 becomes R:255, G:87, B:51. With Kulr, just paste any hex code and get RGB, HSL, and CMYK values instantly.",
      },
    },
    {
      "@type": "Question",
      name: "What is CMYK and when should I use it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CMYK stands for Cyan, Magenta, Yellow, and Key (black). It's the color model used for print design — magazines, business cards, packaging. Use RGB/HEX for screens and CMYK for anything that gets physically printed. Kulr converts between both formats.",
      },
    },
    {
      "@type": "Question",
      name: "What color format should I use for web development?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For web development, HEX (#FF5733) is the most common format in CSS. RGB and HSL are also widely supported. HSL is often preferred by designers because it's intuitive — you adjust hue, saturation, and lightness independently. All three formats work in all modern browsers.",
      },
    },
  ],
};

export default function ConvertLayout({ children }: { children: React.ReactNode }) {
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
