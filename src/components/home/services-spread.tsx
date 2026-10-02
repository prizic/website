import Link from "next/link";

import { EditorialArrow } from "@/components/editorial/editorial-arrow";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import type { ServiceSummary } from "@/content/types";
import { cx, frame, label, sectionHeading, spreadPadding } from "@/lib/ui";

type ServicesSpreadProps = {
  headline: string;
  items: readonly ServiceSummary[];
  /** On the Services page the page title already names the section. */
  headingLevel?: "h1" | "h2";
};

// Unequal modules: ink, quiet panel, then the one accent field, offset down.
const tones = [
  "bg-ink text-paper-bright",
  "bg-panel text-ink",
  "bg-accent text-accent-ink lg:mt-12",
];

export function ServicesSpread({ headline, items, headingLevel = "h2" }: ServicesSpreadProps) {
  const Heading = headingLevel;

  return (
    <ScrollReveal aria-labelledby="services-title" className={cx(frame, spreadPadding)} data-spread="services" id="services" reveal="panels">
      <Heading className={cx(sectionHeading, "mb-10 max-w-[12ch] max-md:mb-7")} id="services-title">
        {headline}
      </Heading>
      <ol className="m-0 grid list-none grid-cols-[5fr_4fr_4fr] items-start gap-3 p-0 max-lg:grid-cols-2 max-md:grid-cols-1">
        {items.map((service, index) => (
          <li className={cx("flex min-h-full flex-col rounded-spread p-8 max-lg:p-6 max-lg:last:col-span-full", tones[index % tones.length])} data-motion-item="" key={service.slug}>
            <p className={cx(label, "m-0 flex items-baseline justify-between gap-4 opacity-80")}>
              <span>{service.name}</span>
              <span>{service.index}</span>
            </p>
            <h3 className="mt-8 mb-0 max-w-[16ch] text-title font-medium">{service.headline}</h3>
            <p className="mt-5 mb-8 max-w-[44ch] text-sm leading-[1.6] opacity-85">{service.description}</p>
            <ul aria-label={`${service.name} deliverables`} className="m-0 mt-auto flex list-none flex-wrap gap-2 p-0">
              {service.deliverables.map((deliverable) => (
                <li className="rounded-full border border-current/25 px-3 py-1 text-xs" key={deliverable}>
                  {deliverable}
                </li>
              ))}
            </ul>
            <Link className="group mt-8 inline-flex min-h-11 items-center justify-between gap-6 border-b border-current/30 text-sm font-semibold no-underline hover:border-current" href={service.link.href}>
              {service.link.label}
              <EditorialArrow />
            </Link>
          </li>
        ))}
      </ol>
    </ScrollReveal>
  );
}
