import { PageIntro } from "@/components/layout/page-intro";
import { SITE_CONTENT } from "@/content/site";

export default function CapabilitiesPage() {
  const page = SITE_CONTENT.pages.capabilities;

  return (
    <article className="editorial-page">
      <PageIntro introduction={page.introduction} title={page.title} />

      <section
        aria-label={SITE_CONTENT.capabilities.headline}
        className="editorial-section editorial-section--surface"
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
        className="editorial-section"
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
        className="editorial-section editorial-section--light"
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
