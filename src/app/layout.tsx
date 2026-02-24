import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://kulr.app"),
  title: {
    default: "Kulr — Free Color Palette Generator & Design Tools",
    template: "%s",
  },
  description:
    "The complete free color toolkit for designers and developers. Generate palettes, extract colors from images, check contrast accessibility, build gradients, and visualize on real UIs. No sign-up required.",
  keywords: [
    "color palette generator",
    "color tools",
    "color palette",
    "color scheme",
    "contrast checker",
    "gradient generator",
    "color extractor",
    "design tools",
    "free color tools",
    "WCAG contrast",
  ],
  authors: [{ name: "Kulr" }],
  creator: "Kulr",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Kulr — Free Color Palette Generator & Design Tools",
    description:
      "Generate palettes, extract colors from images, check contrast, build gradients. The complete free color toolkit. No sign-up.",
    type: "website",
    siteName: "Kulr",
    locale: "en_US",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Kulr — Free Color Palette Generator & Design Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kulr — Free Color Palette Generator & Design Tools",
    description:
      "Generate palettes, extract colors from images, check contrast, build gradients. The complete free color toolkit.",
    images: ["/og-image.svg"],
  },
  alternates: {
    canonical: "https://kulr.app",
  },
  verification: {
    google: "HDPjXDKz-KclvYCnqyFbOiBcpqH1RxfNjQWxSrr5fQs",
    yandex: "a9a4e44fa532d1d8",
    other: {
      ...(process.env.NEXT_PUBLIC_BING_VERIFICATION && {
        "msvalidate.01": [process.env.NEXT_PUBLIC_BING_VERIFICATION],
      }),
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "Kulr",
      url: "https://kulr.app",
      description:
        "The complete free color toolkit for designers and developers.",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://kulr.app/explore?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "SoftwareApplication",
      name: "Kulr",
      url: "https://kulr.app",
      applicationCategory: "DesignApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "Free color palette generator, image color extractor, contrast checker, gradient builder, and palette visualizer for designers and developers.",
      featureList: [
        "Color Palette Generator",
        "Image Color Extractor",
        "WCAG Contrast Checker",
        "CSS Gradient Generator",
        "UI Palette Visualizer",
        "240+ Curated Palettes",
        "Export to CSS, Tailwind, SCSS, JSON",
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrains.variable} font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Toaster
            position="bottom-center"
            toastOptions={{
              duration: 2000,
              style: {
                background: "var(--color-surface)",
                color: "var(--color-text)",
                border: "1px solid var(--color-border)",
                borderRadius: "10px",
                fontSize: "14px",
              },
            }}
          />
        </ThemeProvider>
        <Analytics />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
