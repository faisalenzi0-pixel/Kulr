import type { MetadataRoute } from "next";
import { BRANDS } from "@/lib/brand-colors";
import { CSS_NAMED_COLORS } from "@/lib/css-colors";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kulr.app";

  const routes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/generate", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/explore", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/extract", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/contrast", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/gradient", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/visualizer", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/picker", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/colors", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/convert", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/tailwind", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/psychology", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/brands", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  // Add individual brand pages
  const brandRoutes = BRANDS.map((brand) => ({
    path: `/brands/${brand.slug}`,
    priority: 0.6 as const,
    changeFrequency: "monthly" as const,
  }));

  // Add individual color pages
  const colorRoutes = CSS_NAMED_COLORS.map((color) => ({
    path: `/colors/${color.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`,
    priority: 0.5 as const,
    changeFrequency: "monthly" as const,
  }));

  return [...routes, ...brandRoutes, ...colorRoutes].map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
