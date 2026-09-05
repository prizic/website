import type { MetadataRoute } from "next";

import { resolveSiteConfig } from "@/lib/site-config";

const PUBLIC_ROUTES = [
  "/",
  "/thinking",
  "/capabilities",
  "/partnerships",
  "/about",
  "/contact",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const { canonicalUrl } = resolveSiteConfig(
    process.env,
    process.env.NODE_ENV,
  );

  if (!canonicalUrl) return [];

  return PUBLIC_ROUTES.map((path) => ({
    url: new URL(path, `${canonicalUrl}/`).toString(),
  }));
}
