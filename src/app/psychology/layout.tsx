import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Psychology — What Colors Mean in Design & Branding | Kulr",
  description:
    "Learn what colors mean in design and branding. Explore the psychology behind red, blue, green, purple, and more. See which brands use each color and when to use them in your projects. Interactive guide.",
  keywords: [
    "color psychology",
    "color meaning",
    "color meaning in design",
    "color psychology in marketing",
    "what colors mean",
    "brand color meaning",
    "color emotions",
    "color theory for designers",
    "color associations",
    "psychology of color in branding",
  ],
  openGraph: {
    title: "Color Psychology — What Colors Mean in Design & Branding | Kulr",
    description:
      "Learn what colors mean in design. Explore emotions, brand examples, and usage tips for every major color. Interactive guide.",
    url: "https://kulr.app/psychology",
  },
  twitter: {
    title: "Color Psychology — What Colors Mean in Design & Branding | Kulr",
    description:
      "Learn what colors mean in design. Emotions, brands, and usage tips for every color.",
    images: ["/og-image.svg"],
  },
  alternates: {
    canonical: "https://kulr.app/psychology",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Color Psychology — What Colors Mean in Design & Branding",
  url: "https://kulr.app/psychology",
  author: { "@type": "Organization", name: "Kulr" },
  publisher: { "@type": "Organization", name: "Kulr", url: "https://kulr.app" },
  description:
    "Interactive guide to color psychology in design. Learn what each color means, which brands use it, and when to use it in your projects.",
  mainEntityOfPage: "https://kulr.app/psychology",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does the color blue mean in branding?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Blue conveys trust, reliability, and professionalism. It's the most popular color in corporate branding — used by Facebook, LinkedIn, IBM, Samsung, and most banks. Blue lowers heart rate and creates a sense of calm, making it ideal for finance, tech, healthcare, and corporate brands.",
      },
    },
    {
      "@type": "Question",
      name: "How do I choose the right color for my brand?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Start with the emotion you want to evoke: red for energy/urgency, blue for trust, green for health/nature, purple for luxury, orange for friendliness, black for sophistication. Consider your industry, target audience, and competitors. Test your colors with real users and ensure sufficient contrast for accessibility.",
      },
    },
    {
      "@type": "Question",
      name: "Why does color matter in design?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Color influences up to 90% of snap judgments about products. It affects emotions, readability, brand recognition, and conversion rates. Studies show that color increases brand recognition by up to 80% and that 85% of consumers cite color as the primary reason for buying a product.",
      },
    },
  ],
};

export default function PsychologyLayout({ children }: { children: React.ReactNode }) {
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
