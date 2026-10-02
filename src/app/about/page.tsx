import type { Metadata } from "next";

import { ActionLink } from "@/components/actions/action-link";
import { EditorialArtwork } from "@/components/editorial/editorial-artwork";
import { FolioLabel } from "@/components/editorial/folio-label";
import { SITE_CONTENT } from "@/content/site";
import { createPageMetadata } from "@/lib/metadata";
import { resolveSiteConfig } from "@/lib/site-config";
import { cx, frame } from "@/lib/ui";

const page = SITE_CONTENT.pages.about;

export const metadata: Metadata = createPageMetadata({
  ...page.metadata,
  path: "/about",
  canonicalUrl: resolveSiteConfig(process.env, process.env.NODE_ENV).canonicalUrl,
});

export default function AboutPage() {
  const [lead, detail] = page.paragraphs;

  return (
    <article data-page="about">
      <header aria-labelledby="page-title" className={cx(frame, "py-16 lg:py-24")}>
        <FolioLabel index="03" section="About" />
        <div className="mt-8 grid grid-cols-12 gap-8 max-lg:grid-cols-1">
          <div className="col-span-7 flex flex-col gap-8">
            <h1 className="m-0 max-w-[15ch] font-display text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.96] font-medium tracking-[-0.045em] text-balance" id="page-title">
              {page.title}
            </h1>
            <p className="m-0 max-w-[48ch] text-lede">{lead}</p>
            <p className="m-0 max-w-[52ch] text-[0.9375rem] leading-[1.6] text-muted">{detail}</p>
          </div>
          <EditorialArtwork className="col-span-5" decorative frameClassName="min-h-80 rounded-t-arch rounded-b-spread bg-ink text-paper" variant="fold" />
        </div>
      </header>

      <section aria-label="How Prizic works" className={cx(frame, "pb-12")} data-spread="principles">
        <ol className="m-0 grid list-none grid-cols-3 gap-3 p-0 max-lg:grid-cols-1">
          {page.principles.map((principle, index) => (
            <li className={cx("flex min-h-64 flex-col rounded-spread p-8 max-md:min-h-0 max-md:p-6", index === 1 ? "bg-ink text-paper-bright" : "bg-panel text-ink")} key={principle.title}>
              <span aria-hidden="true" className="font-mono text-xs">{String(index + 1).padStart(2, "0")}</span>
              <h2 className="mt-10 mb-0 max-w-[14ch] text-title font-medium">{principle.title}</h2>
              <p className="mt-4 mb-0 max-w-[40ch] text-[0.9375rem] leading-[1.6] opacity-85">{principle.description}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <ActionLink href={page.action.href}>{page.action.label}</ActionLink>
        </div>
      </section>
    </article>
  );
}
