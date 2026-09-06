import type { Metadata } from "next";

import { EditorialArtwork } from "@/components/editorial/editorial-artwork";
import { PageIntro } from "@/components/layout/page-intro";
import { SITE_CONTENT } from "@/content/site";
import { createPageMetadata } from "@/lib/metadata";
import { resolveSiteConfig } from "@/lib/site-config";

export const metadata: Metadata = createPageMetadata({
  title: "Thinking",
  description:
    "The principles, four-stage method and production commitments behind how Prizic works.",
  path: "/thinking",
  canonicalUrl: resolveSiteConfig(process.env, process.env.NODE_ENV).canonicalUrl,
});

export default function ThinkingPage() {
  const page = SITE_CONTENT.pages.thinking;

  return (
    <article className="editorial-page thinking-page" data-page="thinking">
      <PageIntro
        index="01"
        introduction={page.introduction}
        title={page.title}
      />

      <section
        aria-label={SITE_CONTENT.principles.headline}
        className="editorial-section thinking-principles"
        data-spread="principles"
      >
        <div className="site-frame thinking-principles__header">
          <h2>{SITE_CONTENT.principles.headline}</h2>
          <EditorialArtwork decorative variant="ribs" />
        </div>
        <ol className="site-frame editorial-sequence editorial-sequence--three thinking-principles__list">
          {page.principles.map((principle, index) => (
            <li key={principle.title}>
              <span aria-hidden="true" className="editorial-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h2>{principle.title}</h2>
                <p>{principle.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section
        aria-labelledby="thinking-system-title"
        className="editorial-section thinking-method"
        data-spread="method"
      >
        <div className="site-frame editorial-split">
          <h2 id="thinking-system-title">{SITE_CONTENT.process.headline}</h2>
          <ol className="editorial-rows thinking-method__stages">
            {page.processStages.map((stage, index) => (
              <li key={stage.title}>
                <span aria-hidden="true" className="editorial-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{stage.title}</h3>
                  <p>{stage.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        aria-labelledby="commitments-title"
        className="editorial-section thinking-commitments"
        data-spread="commitments"
      >
        <div className="site-frame editorial-split thinking-commitments__grid">
          <h2 id="commitments-title">{page.commitmentsHeadline}</h2>
          <ul className="editorial-rows editorial-rows--plain">
            {page.commitments.map((commitment) => (
              <li key={commitment.title}>
                <div>
                  <h3>{commitment.title}</h3>
                  <p>{commitment.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
