import type { Metadata } from "next";

import { CapabilitiesSection } from "@/components/home/capabilities-section";
import { ClosingSection } from "@/components/home/closing-section";
import { FounderSection } from "@/components/home/founder-section";
import { PrinciplesSection } from "@/components/home/principles-section";
import { OpeningSpread } from "@/components/home/opening-spread";
import { MethodSpread } from "@/components/home/method-spread";
import { StorySpreads } from "@/components/home/story-spreads";
import { SITE_CONTENT } from "@/content/site";
import { createPageMetadata } from "@/lib/metadata";
import { resolveSiteConfig } from "@/lib/site-config";

export const metadata: Metadata = createPageMetadata({
  title: "From possibility to working systems",
  description:
    "Prizic is a founder-led technology company combining product thinking, engineering and long-term technical direction.",
  path: "/",
  canonicalUrl: resolveSiteConfig(process.env, process.env.NODE_ENV).canonicalUrl,
});

export default function HomePage() {
  return (
    <>
      <OpeningSpread />
      <MethodSpread />
      <StorySpreads chapter="introduction" />
      <PrinciplesSection {...SITE_CONTENT.principles} />
      <StorySpreads chapter="direction" />
      <CapabilitiesSection {...SITE_CONTENT.capabilities} />
      <FounderSection {...SITE_CONTENT.founder} />
      <ClosingSection {...SITE_CONTENT.closing} />
    </>
  );
}
