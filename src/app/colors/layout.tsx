import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Names — 200+ Named Colors with Hex, RGB & HSL Codes | Kulr",
  description:
    "Browse 200+ named colors including all CSS color names with hex codes, RGB values, and HSL values. Search by name, filter by hue. Click to copy any color code instantly. Free color reference tool.",
  keywords: [
    "color names",
    "CSS named colors",
    "hex color codes",
    "list of colors",
    "color name from hex",
    "named colors list",
    "CSS colors",
    "web colors",
    "color reference",
    "html color names",
  ],
  openGraph: {
    title: "Color Names — 200+ Named Colors with Hex, RGB & HSL Codes | Kulr",
    description:
      "Browse 200+ named colors with hex, RGB, and HSL codes. Search, filter by hue, click to copy. Free color reference.",
    url: "https://kulr.app/colors",
  },
  twitter: {
    title: "Color Names — 200+ Named Colors with Hex, RGB & HSL Codes | Kulr",
    description:
      "Browse 200+ named colors with hex, RGB, and HSL codes. Search, filter by hue, click to copy.",
    images: ["/og-image.svg"],
  },
  alternates: {
    canonical: "https://kulr.app/colors",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kulr Color Names",
  url: "https://kulr.app/colors",
  applicationCategory: "DesignApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Browse 200+ named colors including all CSS color names with hex codes, RGB values, and HSL values.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How many CSS named colors are there?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There are 148 official CSS named colors defined in the CSS Color Level 4 specification. These range from basic colors like 'red' and 'blue' to more specific shades like 'cornflowerblue' and 'mediumseagreen'. Kulr includes all 148 plus popular design colors for a total of 200+.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between hex and RGB color codes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hex codes use a 6-character hexadecimal format (#FF5733), while RGB uses decimal values for red, green, and blue channels (rgb(255, 87, 51)). They represent the same colors — hex is more compact for CSS, RGB is easier to read and manipulate programmatically.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use color names directly in CSS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, all 148 CSS named colors can be used directly as property values in CSS. For example, 'color: cornflowerblue' is valid and equivalent to 'color: #6495ED'. Named colors are supported in all modern browsers.",
      },
    },
  ],
};

export default function ColorsLayout({ children }: { children: React.ReactNode }) {
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
