import type { MetadataRoute } from "next";

import { resolveSiteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  const { canonicalUrl } = resolveSiteConfig(
    process.env,
    process.env.NODE_ENV,
  );

  return {
    rules: { userAgent: "*", allow: "/" },
    ...(canonicalUrl ? { sitemap: `${canonicalUrl}/sitemap.xml` } : {}),
  };
}
