import type { Metadata } from "next";

import { LivingWordmark } from "@/components/brand/living-wordmark";
import { EditorialArtwork } from "@/components/editorial/editorial-artwork";
import { PageIntro } from "@/components/layout/page-intro";
import { SITE_CONTENT } from "@/content/site";
import { createPageMetadata } from "@/lib/metadata";
import { resolveSiteConfig } from "@/lib/site-config";

export const metadata: Metadata = createPageMetadata({
  title: "About Prizic",
  description: "The founder, purpose and thinking behind Prizic.",
  path: "/about",
  canonicalUrl: resolveSiteConfig(process.env, process.env.NODE_ENV).canonicalUrl,
});

export default function AboutPage() {
  const page = SITE_CONTENT.pages.about;

  return (
    <article className="editorial-page about-page" data-page="about">
      <PageIntro
        index="04"
        introduction={page.introduction}
        title={page.title}
      />

      <section
        aria-labelledby="about-founder-title"
        className="editorial-section about-page__founder"
        data-spread="founder"
      >
        <div className="site-frame editorial-split">
          <h2 id="about-founder-title">{SITE_CONTENT.founder.headline}</h2>
          <div className="about-page__founder-copy">
            <p className="editorial-statement">{SITE_CONTENT.founder.body}</p>
            <EditorialArtwork decorative variant="fold" />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="about-purpose-title"
        className="editorial-section about-page__purpose"
        data-spread="purpose"
      >
        <div className="site-frame editorial-split">
          <h2 id="about-purpose-title">{page.purposeHeadline}</h2>
          <p className="editorial-statement">{page.purposeBody}</p>
        </div>
      </section>

      <section
        aria-labelledby="about-principles-title"
        className="editorial-section about-page__principles"
        data-spread="principles"
      >
        <div className="site-frame editorial-split">
          <h2 id="about-principles-title">
            {SITE_CONTENT.principles.headline}
          </h2>
          <ul className="editorial-rows editorial-rows--plain">
            {SITE_CONTENT.principles.items.map((principle) => (
              <li key={principle.title}>
                <div>
                  <h3>{principle.title}</h3>
                  <p>{principle.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="about-name-title"
        className="editorial-section about-name"
        data-spread="name-study"
      >
        <div className="site-frame about-name__grid">
          <div>
            <h2 id="about-name-title">{page.nameHeadline}</h2>
            <p className="about-name__pronunciation">
              {page.pronunciationLead}
            </p>
            <LivingWordmark autoPlay={false} />
          </div>
          <dl className="name-associations">
            {SITE_CONTENT.name.associations.map((association) => (
              <div key={association.title}>
                <dt>{association.title}</dt>
                <dd>{association.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </article>
  );
}
