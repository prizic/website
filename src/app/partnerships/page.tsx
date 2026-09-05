import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import { SITE_CONTENT } from "@/content/site";

export default function PartnershipsPage() {
  const page = SITE_CONTENT.pages.partnerships;

  return (
    <article className="editorial-page partnership-page">
      <PageIntro introduction={page.introduction} title={page.title} />

      <section
        aria-labelledby="partnership-steps-title"
        className="editorial-section"
      >
        <div className="site-frame">
          <h2 id="partnership-steps-title">{page.stepsHeadline}</h2>
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
