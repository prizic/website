import type { Metadata } from "next";

import { EditorialArtwork } from "@/components/editorial/editorial-artwork";
import { PageIntro } from "@/components/layout/page-intro";
import { SITE_CONTENT } from "@/content/site";
import { createPageMetadata } from "@/lib/metadata";
import { resolveSiteConfig } from "@/lib/site-config";

export const metadata: Metadata = createPageMetadata({
  title: "Capabilities",
  description:
    "The digital products, business systems and technical direction Prizic can shape.",
  path: "/capabilities",
  canonicalUrl: resolveSiteConfig(process.env, process.env.NODE_ENV).canonicalUrl,
});

export default function CapabilitiesPage() {
  const page = SITE_CONTENT.pages.capabilities;

  return (
    <article className="editorial-page capabilities-page" data-page="capabilities">
      <div className="capabilities-page__opening site-frame" data-spread="opening">
        <PageIntro
          className="capabilities-page__intro"
          index="02"
          introduction={page.introduction}
          title={page.title}
        />
        <EditorialArtwork decorative variant="stack" />
      </div>

      <section
        aria-label={SITE_CONTENT.capabilities.headline}
        className="editorial-section capabilities-territories"
        data-spread="territories"
      >
        <div className="site-frame capability-ledger">
          {SITE_CONTENT.capabilities.items.map((capability) => (
            <article key={capability.title}>
              <h2>{capability.title}</h2>
              <p>{capability.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="artifacts-title"
        className="editorial-section capabilities-artifacts"
        data-spread="artifacts"
      >
        <div className="site-frame editorial-split">
          <h2 id="artifacts-title">{page.artifactsHeadline}</h2>
          <ul aria-label="Artifact categories" className="artifact-list">
            {page.artifacts.map((artifact) => (
              <li key={artifact}>{artifact}</li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="boundaries-title"
        className="editorial-section capabilities-boundaries"
        data-spread="boundaries"
      >
        <div className="site-frame editorial-split">
          <h2 id="boundaries-title">{page.boundariesHeadline}</h2>
          <ul className="editorial-rows editorial-rows--plain">
            {page.boundaries.map((boundary) => (
              <li key={boundary.title}>
                <div>
                  <h3>{boundary.title}</h3>
                  <p>{boundary.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
