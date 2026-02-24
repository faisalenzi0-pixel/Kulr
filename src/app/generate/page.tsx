import type { Metadata } from "next";
import { GenerateClient } from "./generate-client";

interface Props {
  searchParams: Promise<{ colors?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const colors = params.colors;

  if (colors) {
    const hexes = colors.split("-").filter((c) => /^[0-9a-fA-F]{6}$/.test(c));
    if (hexes.length >= 2) {
      const display = hexes.map((c) => "#" + c.toUpperCase()).join(", ");
      return {
        title: `Palette: ${display} | Kulr`,
        description: `A ${hexes.length}-color palette (${display}). Edit, lock, export to CSS/Tailwind/SCSS/JSON. Free color palette generator.`,
        openGraph: {
          title: `Palette: ${display} | Kulr`,
          description: `A ${hexes.length}-color palette. Edit, lock, export anywhere. Free.`,
          url: `https://kulr.app/generate?colors=${colors}`,
          images: [
            {
              url: `/api/og?colors=${colors}`,
              width: 1200,
              height: 630,
              alt: `Color palette: ${display}`,
            },
          ],
        },
        twitter: {
          card: "summary_large_image",
          title: `Palette: ${display} | Kulr`,
          description: `A ${hexes.length}-color palette. Free color toolkit.`,
          images: [`/api/og?colors=${colors}`],
        },
      };
    }
  }

  return {};
}

export default function GeneratePage() {
  return <GenerateClient />;
}
