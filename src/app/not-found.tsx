import Link from "next/link";

import { PrizicLogo } from "@/components/brand/prizic-logo";
import { FolioLabel } from "@/components/editorial/folio-label";
import { SITE_CONTENT } from "@/content/site";

export default function NotFound() {
  const page = SITE_CONTENT.pages.notFound;

  return (
    <section aria-labelledby="not-found-title" className="not-found site-frame" data-page="not-found">
      <div className="not-found__panel" data-spread="missing-path">
        <FolioLabel index="404" section="Route not found" />
        <PrizicLogo decorative variant="mark" />
        <h1 id="not-found-title">{page.title}</h1>
        <p>{page.body}</p>
        <Link className="home-action home-action--secondary" href={page.action.href}>
          {page.action.label}
        </Link>
      </div>
    </section>
  );
}
