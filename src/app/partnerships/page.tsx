import Link from "next/link";
import type { Metadata } from "next";

import { EditorialArtwork } from "@/components/editorial/editorial-artwork";
import { PageIntro } from "@/components/layout/page-intro";
import { SITE_CONTENT } from "@/content/site";
import { createPageMetadata } from "@/lib/metadata";
import { resolveSiteConfig } from "@/lib/site-config";

export const metadata: Metadata = createPageMetadata({
  title: "Partnerships",
  description:
    "How industry knowledge and Prizic's product and engineering direction can meet.",
  path: "/partnerships",
  canonicalUrl: resolveSiteConfig(process.env, process.env.NODE_ENV).canonicalUrl,
});

export default function PartnershipsPage() {
  const page = SITE_CONTENT.pages.partnerships;

  return (
    <article className="editorial-page partnership-page" data-page="partnerships">
      <PageIntro
        index="03"
        introduction={page.introduction}
        title={page.title}
      />

      <section
        aria-labelledby="partnership-steps-title"
        className="editorial-section partnership-page__path-spread"
        data-spread="partnership-path"
      >
        <div className="site-frame">
          <div className="partnership-page__lead">
            <h2 id="partnership-steps-title">{page.stepsHeadline}</h2>
            <EditorialArtwork decorative variant="orbit" />
          </div>
          <ol className="partnership-path">
            {page.steps.map((step, index) => (
              <li key={step.title}>
                <span aria-hidden="true" className="partnership-path__node">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link className="home-action home-action--primary" href={page.action.href}>
            {page.action.label}
          </Link>
        </div>
      </section>
    </article>
  );
}
