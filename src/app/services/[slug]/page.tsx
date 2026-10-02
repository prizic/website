import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ActionLink } from "@/components/actions/action-link";
import { EditorialArtwork } from "@/components/editorial/editorial-artwork";
import { PageIntro } from "@/components/layout/page-intro";
import { SITE_CONTENT } from "@/content/site";
import type { ServiceSlug } from "@/content/types";
import { createPageMetadata } from "@/lib/metadata";
import { resolveSiteConfig } from "@/lib/site-config";
import { cx, frame, label } from "@/lib/ui";

const services = SITE_CONTENT.pages.service;
const summaries = SITE_CONTENT.home.services.items;

// Each service keeps its own authored material study.
const artwork = { websites: "fold", "business-software": "stack", automation: "ribs" } as const;

type ServicePageProps = { params: Promise<{ slug: string }> };

function isServiceSlug(slug: string): slug is ServiceSlug {
  return Object.hasOwn(services, slug);
}

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isServiceSlug(slug)) return {};

  return createPageMetadata({
    ...services[slug].metadata,
    path: `/services/${slug}`,
    canonicalUrl: resolveSiteConfig(process.env, process.env.NODE_ENV).canonicalUrl,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  if (!isServiceSlug(slug)) notFound();

  const page = services[slug];
  const summary = summaries.find((item) => item.slug === slug);

  return (
    <article data-page={`service-${slug}`}>
      <PageIntro index={summary?.index} introduction={page.introduction} section={summary?.name ?? "Services"} title={page.title} />

      <section aria-labelledby="service-lead-title" className={cx(frame, "pb-12")} data-spread="service-lead">
        <div className="grid grid-cols-12 gap-3 max-lg:grid-cols-1">
          <div className="col-span-7 rounded-spread bg-ink p-8 text-paper-bright lg:p-12 max-md:p-6">
            <h2 className="m-0 max-w-[16ch] font-display text-[clamp(2rem,4vw,3.5rem)] leading-none font-medium tracking-[-0.045em] text-balance" id="service-lead-title">
              {page.lead.title}
            </h2>
            <p className="mt-8 mb-0 max-w-[50ch] text-[0.9375rem] leading-[1.6] text-panel">{page.lead.description}</p>
          </div>
          <EditorialArtwork className="col-span-5" decorative frameClassName="min-h-64 rounded-spread bg-panel text-ink" variant={artwork[slug]} />
        </div>
      </section>

      <section aria-labelledby="service-capabilities-title" className={cx(frame, "py-12")} data-spread="service-capabilities">
        <div className="grid grid-cols-12 gap-8 max-lg:grid-cols-1">
          <h2 className={cx(label, "col-span-4 m-0 self-start text-ink-soft")} id="service-capabilities-title">
            {page.capabilitiesHeadline}
          </h2>
          <ul className="col-span-8 m-0 list-none p-0">
            {page.capabilities.map((capability, index) => (
              <li className="grid grid-cols-[3rem_minmax(0,1fr)] items-baseline border-t border-line py-4 font-display text-[clamp(1.25rem,2.2vw,1.75rem)] tracking-[-0.03em] last:border-b" key={capability}>
                <span aria-hidden="true" className="font-mono text-xs tracking-normal text-muted">{String(index + 1).padStart(2, "0")}</span>
                {capability}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label={`How ${summary?.name ?? "this service"} is delivered`} className={cx(frame, "py-12")} data-spread="service-delivery">
        <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
          {page.sections.map((section) => (
            <div className="rounded-spread bg-panel p-8 lg:p-10 max-md:p-6" key={section.title}>
              <h2 className="m-0 max-w-[18ch] text-title font-medium">{section.title}</h2>
              <p className="mt-6 mb-0 max-w-[50ch] text-[0.9375rem] leading-[1.6]">{section.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <ActionLink href={page.action.href}>{page.action.label}</ActionLink>
        </div>
      </section>
    </article>
  );
}
