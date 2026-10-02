import Link from "next/link";

import { EditorialArrow } from "@/components/editorial/editorial-arrow";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SITE_CONTENT } from "@/content/site";
import { cx, frame, sectionHeading, spreadPadding } from "@/lib/ui";

export function SituationsSpread() {
  const { situations } = SITE_CONTENT.home;

  return (
    <ScrollReveal aria-labelledby="situations-title" className={cx(frame, spreadPadding)} data-spread="situations" reveal="lines">
      <div className="grid grid-cols-12 gap-4 lg:gap-8 max-lg:grid-cols-1">
        <h2 className={cx(sectionHeading, "col-span-5 max-w-[13ch] self-start lg:sticky lg:top-8")} id="situations-title">
          {situations.headline}
        </h2>
        <ul className="col-span-7 m-0 list-none p-0">
          {situations.items.map((situation) => (
            <li className="border-t border-line last:border-b" data-motion-item="" key={situation.title}>
              <Link className="group grid grid-cols-[minmax(0,1fr)_auto] gap-x-8 gap-y-3 py-7 no-underline" href={situation.href}>
                <h3 className="m-0 font-display text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.05] font-medium tracking-[-0.035em] group-hover:underline group-hover:decoration-1">
                  <span aria-hidden="true">“</span>{situation.title}<span aria-hidden="true">”</span>
                </h3>
                <EditorialArrow className="row-span-2 self-start" />
                <p className="m-0 max-w-[48ch] text-[0.9375rem] leading-[1.55] text-muted">{situation.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </ScrollReveal>
  );
}
