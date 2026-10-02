import Link from "next/link";

import { EditorialArrow } from "@/components/editorial/editorial-arrow";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SITE_CONTENT } from "@/content/site";
import { cx, frame, sectionHeading, spreadPadding } from "@/lib/ui";

// Accent marks where the work starts; ink marks the build.
const tones = [
  "bg-accent text-accent-ink",
  "bg-panel text-ink",
  "bg-ink text-paper-bright",
  "bg-panel text-ink",
];

export function DeliverySpread() {
  const { delivery } = SITE_CONTENT.home;

  return (
    <ScrollReveal aria-labelledby="delivery-title" className={cx(frame, spreadPadding)} data-spread="delivery" reveal="panels">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
        <h2 className={cx(sectionHeading, "max-w-[15ch]")} id="delivery-title">{delivery.headline}</h2>
        <Link className="group inline-flex min-h-11 items-center gap-8 border-b border-line text-sm no-underline hover:border-current" href={delivery.link.href}>
          {delivery.link.label}
          <EditorialArrow />
        </Link>
      </div>
      <ol className="m-0 grid list-none grid-cols-4 gap-3 p-0 max-lg:grid-cols-2 max-md:grid-cols-1">
        {delivery.stages.map((stage, index) => (
          <li className={cx("flex min-h-88 flex-col rounded-spread p-8 max-lg:min-h-76 max-md:min-h-0 max-md:p-7", tones[index % tones.length])} data-motion-item="" key={stage.title}>
            <h3 className="m-0 text-2xl font-medium tracking-[-0.03em]">{stage.title}</h3>
            <p className="mt-3 mb-12 max-w-[30ch] text-sm leading-normal max-md:max-w-[40ch]">{stage.description}</p>
            <span aria-hidden="true" className="mt-auto text-[clamp(4rem,7vw,6rem)] leading-none tracking-[-0.07em]">
              {String(index + 1).padStart(2, "0")}
            </span>
          </li>
        ))}
      </ol>
    </ScrollReveal>
  );
}
