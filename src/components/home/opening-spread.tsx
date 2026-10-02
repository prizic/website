import Link from "next/link";

import { LivingWordmark } from "@/components/brand/living-wordmark";
import { EditorialArrow } from "@/components/editorial/editorial-arrow";
import { EditorialArtwork } from "@/components/editorial/editorial-artwork";
import { FolioLabel } from "@/components/editorial/folio-label";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SITE_CONTENT } from "@/content/site";
import { cx, frame, label } from "@/lib/ui";

const actionPanel =
  "group flex min-w-0 items-center justify-between gap-6 rounded-panel px-8 py-6 no-underline max-lg:p-5 max-md:min-h-20";

export function OpeningSpread() {
  const { hero } = SITE_CONTENT.home;
  const [primary, secondary] = hero.actions;

  return (
    <ScrollReveal aria-labelledby="home-title" className={cx(frame, "pt-2")} data-spread="opening" reveal="slide">
      <div className="grid grid-cols-12 overflow-hidden rounded-spread bg-paper text-paper-bright">
        <div className="col-span-6 flex flex-col justify-between gap-10 rounded-s-spread bg-ink p-8 lg:p-12 max-md:col-span-full max-md:gap-6 max-md:rounded-t-spread max-md:rounded-b-none max-md:px-6 max-md:py-7">
          <p className={cx(label, "m-0 flex items-center gap-2.5 text-panel")} data-motion-item="">
            <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
            {hero.eyebrow}
          </p>
          <h1 className="m-0 max-w-[17ch] font-display text-display font-medium text-balance" data-motion-item="" id="home-title">
            {hero.headline}
          </h1>
          <p className="m-0 max-w-[46ch] text-[0.9375rem] leading-[1.55] text-panel max-md:text-sm" data-motion-item="">
            {hero.supportingText}
          </p>
        </div>

        <div className="col-span-6 grid min-w-0 grid-rows-[minmax(0,1fr)_auto] gap-6 rounded-e-spread bg-ink pt-5 pe-5 pb-6 ps-3 max-md:col-span-full max-md:gap-4 max-md:rounded-t-none max-md:rounded-b-spread max-md:px-4 max-md:pt-0">
          <div className="grid min-h-92 grid-cols-[1.25fr_0.85fr] gap-3 max-lg:min-h-76 max-md:min-h-44">
            <EditorialArtwork
              decorative
              frameClassName="rounded-t-arch rounded-b-panel bg-ink-soft text-paper"
              preload
              sizes="(max-width: 767px) 51vw, (max-width: 1023px) 28vw, 27vw"
              variant="fold"
            />
            <EditorialArtwork
              decorative
              frameClassName="mt-8 rounded-t-panel rounded-b-[6rem] bg-panel text-ink max-md:mt-4"
              sizes="(max-width: 767px) 35vw, (max-width: 1023px) 20vw, 19vw"
              variant="ribs"
            />
          </div>
          <LivingWordmark expandedSignal />
        </div>

        <div className="col-span-full grid grid-cols-[7fr_5fr] gap-3 bg-paper pt-3 text-ink max-md:grid-cols-1">
          <Link className={cx(actionPanel, "bg-accent text-[clamp(1.25rem,2vw,1.75rem)] leading-[1.15] font-medium tracking-[-0.025em] text-accent-ink hover:underline")} href={primary.href}>
            <span>{primary.label}</span>
            <EditorialArrow />
          </Link>
          <Link className={cx(actionPanel, "bg-ink-soft leading-[1.35] text-paper-bright hover:underline")} href={secondary.href}>
            <span>{secondary.label}</span>
            <EditorialArrow />
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between gap-8 py-4 max-md:gap-4">
        <FolioLabel className="flex-1" detail="For local businesses" detailClassName="max-md:hidden" index="01" section="Prizic" />
        <Link aria-label="Continue to the introduction" className="group inline-flex min-h-11 items-center gap-4 text-xs no-underline" href="#introduction">
          <span>Continue</span>
          <EditorialArrow direction="down" />
        </Link>
      </div>
    </ScrollReveal>
  );
}
