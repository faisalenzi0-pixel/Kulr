import { notFound } from "next/navigation";
import { BRANDS, getBrandBySlug } from "@/lib/brand-colors";
import type { Metadata } from "next";
import { BrandDetail } from "./brand-detail";

// Generate static pages for all brands at build time
export function generateStaticParams() {
  return BRANDS.map((brand) => ({ slug: brand.slug }));
}

// Dynamic metadata per brand
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) return {};

  const colorList = brand.colors.map((c) => c.hex).join(", ");
  const title = `${brand.name} Brand Colors — Hex Codes & Color Palette | Kulr`;
  const description = `${brand.name} official brand colors: ${brand.colors.map((c) => `${c.name} (${c.hex})`).join(", ")}. Copy hex codes, learn the color story, and generate similar palettes. Free tool.`;

  return {
    title,
    description,
    keywords: [
      `${brand.name.toLowerCase()} colors`,
      `${brand.name.toLowerCase()} brand colors`,
      `${brand.name.toLowerCase()} hex code`,
      `${brand.name.toLowerCase()} color palette`,
      `${brand.name.toLowerCase()} hex`,
      "brand colors",
      "brand color palette",
    ],
    openGraph: {
      title,
      description: `${brand.name} brand colors: ${colorList}. Get hex codes and color story.`,
      url: `https://kulr.app/brands/${slug}`,
    },
    twitter: {
      title,
      description: `${brand.name} brand colors: ${colorList}. Free hex codes and palette.`,
    },
    alternates: {
      canonical: `https://kulr.app/brands/${slug}`,
    },
  };
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);

  if (!brand) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${brand.name} Brand Colors`,
    url: `https://kulr.app/brands/${slug}`,
    description: `Official brand colors for ${brand.name} with hex codes and color story.`,
    isPartOf: { "@type": "WebSite", name: "Kulr", url: "https://kulr.app" },
    about: {
      "@type": "Organization",
      name: brand.name,
      url: `https://${brand.website}`,
      foundingDate: brand.founded,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BrandDetail brand={brand} />
    </>
  );
}
