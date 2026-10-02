import type { Metadata } from "next";

import { ActionLink } from "@/components/actions/action-link";
import { EditorialArtwork } from "@/components/editorial/editorial-artwork";
import { PageIntro } from "@/components/layout/page-intro";
import { SITE_CONTENT } from "@/content/site";
import { createPageMetadata } from "@/lib/metadata";
import { resolveSiteConfig } from "@/lib/site-config";
import { cx, frame } from "@/lib/ui";

const page = SITE_CONTENT.pages.approach;

export const metadata: Metadata = createPageMetadata({
  ...page.metadata,
  path: "/approach",
  canonicalUrl: resolveSiteConfig(process.env, process.env.NODE_ENV).canonicalUrl,
});

export default function ApproachPage() {
  return (
    <article data-page="approach">
      <PageIntro index="02" introduction={page.introduction} section="Approach" title={page.title} />

      <section aria-label="Project stages" className={cx(frame, "pb-12")} data-spread="stages">
        <div className="grid grid-cols-12 gap-8 max-lg:grid-cols-1">
          <div className="col-span-4 max-lg:hidden">
            <EditorialArtwork className="sticky top-8" decorative frameClassName="grid aspect-[4/5] place-items-center rounded-spread bg-ink text-paper" variant="orbit" />
          </div>
          <div className="col-span-8">
            <ol className="m-0 list-none p-0">
              {page.stages.map((stage, index) => (
                <li className="grid grid-cols-[4rem_minmax(0,1fr)] gap-6 border-t border-line py-8 last:border-b max-md:grid-cols-[2.5rem_minmax(0,1fr)] max-md:gap-3" key={stage.title}>
                  <span aria-hidden="true" className={cx("self-start rounded-full px-2 py-1 text-center font-mono text-xs", index === 0 ? "bg-accent text-accent-ink" : "bg-panel text-ink")}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="m-0 text-title font-medium">{stage.title}</h2>
                    <p className="mt-4 mb-0 max-w-[58ch] text-[0.9375rem] leading-[1.6] text-muted">{stage.description}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-10">
              <ActionLink href={page.action.href}>{page.action.label}</ActionLink>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
