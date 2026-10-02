import Link from "next/link";

import { EditorialArrow } from "@/components/editorial/editorial-arrow";
import { EditorialArtwork } from "@/components/editorial/editorial-artwork";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SITE_CONTENT } from "@/content/site";
import { cx, frame, label, spreadPadding } from "@/lib/ui";

const moduleHeading =
  "m-0 max-w-[13ch] font-display text-[clamp(2rem,3.6vw,3.25rem)] leading-none font-medium tracking-[-0.045em] text-balance";

const textLink =
  "group mt-auto inline-flex min-h-11 items-center justify-between gap-8 self-start border-b border-current/30 text-sm font-semibold no-underline hover:border-current";

/** Ongoing support beside the studio introduction: what continues, and who. */
export function StudioSpread() {
  const { ongoing, about } = SITE_CONTENT.home;

  return (
    <ScrollReveal aria-label="Ongoing support and the studio" className={cx(frame, spreadPadding)} data-spread="studio" reveal="panels">
      <div className="grid grid-cols-12 gap-3 max-lg:grid-cols-1">
        <section aria-labelledby="ongoing-title" className="col-span-5 flex flex-col gap-6 rounded-spread bg-panel p-8 lg:p-10 max-md:p-6" data-motion-item="">
          <h2 className={moduleHeading} id="ongoing-title">{ongoing.headline}</h2>
          <p className="m-0 max-w-[44ch] text-[0.9375rem] leading-[1.55]">{ongoing.body}</p>
          <ul aria-label="Ongoing support" className="m-0 grid list-none gap-0 p-0">
            {ongoing.items.map((item) => (
              <li className={cx(label, "border-t border-line py-3 tracking-wider")} key={item}>{item}</li>
            ))}
          </ul>
          <Link className={textLink} href={ongoing.link.href}>
            {ongoing.link.label}
            <EditorialArrow />
          </Link>
        </section>

        <section aria-labelledby="about-preview-title" className="col-span-7 grid grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] gap-6 rounded-spread bg-ink p-8 text-paper-bright lg:p-10 max-md:grid-cols-1 max-md:p-6" data-motion-item="">
          <div className="flex flex-col gap-6">
            <h2 className={moduleHeading} id="about-preview-title">{about.headline}</h2>
            {about.paragraphs.map((paragraph) => (
              <p className="m-0 max-w-[44ch] text-[0.9375rem] leading-[1.55] text-panel" key={paragraph}>{paragraph}</p>
            ))}
            <Link className={textLink} href={about.link.href}>
              {about.link.label}
              <EditorialArrow />
            </Link>
          </div>
          <EditorialArtwork decorative frameClassName="min-h-64 rounded-panel bg-ink-soft text-paper" variant="stack" />
        </section>
      </div>
    </ScrollReveal>
  );
}
