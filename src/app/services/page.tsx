import type { Metadata } from "next";

import { ClosingSection } from "@/components/home/closing-section";
import { ServicesSpread } from "@/components/home/services-spread";
import { SituationsSpread } from "@/components/home/situations-spread";
import { SITE_CONTENT } from "@/content/site";
import { createPageMetadata } from "@/lib/metadata";
import { resolveSiteConfig } from "@/lib/site-config";

const page = SITE_CONTENT.pages.services;

export const metadata: Metadata = createPageMetadata({
  ...page.metadata,
  path: "/services",
  canonicalUrl: resolveSiteConfig(process.env, process.env.NODE_ENV).canonicalUrl,
});

export default function ServicesPage() {
  const { contact } = resolveSiteConfig(process.env, process.env.NODE_ENV);

  return (
    <article data-page="services">
      <ServicesSpread headingLevel="h1" headline={page.introduction} items={SITE_CONTENT.home.services.items} />
      <SituationsSpread />
      <ClosingSection contact={contact} />
    </article>
  );
}
