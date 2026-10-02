import type { MetadataRoute } from "next";

import { SITE_CONTENT } from "@/content/site";
import { resolveSiteConfig } from "@/lib/site-config";

const PUBLIC_ROUTES = [
  "/",
  "/services",
  ...Object.keys(SITE_CONTENT.pages.service).map((slug) => `/services/${slug}`),
  "/approach",
  "/about",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const { canonicalUrl } = resolveSiteConfig(
    process.env,
    process.env.NODE_ENV,
  );

  if (!canonicalUrl) return [];

  return PUBLIC_ROUTES.map((path) => ({
    url: new URL(path, canonicalUrl).toString(),
  }));
}
