import { EditorialArtwork } from "@/components/editorial/editorial-artwork";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SITE_CONTENT } from "@/content/site";
import { cx, frame, sectionHeading, spreadPadding } from "@/lib/ui";

export function ConnectedSpread() {
  const { connected } = SITE_CONTENT.home;

  return (
    <ScrollReveal aria-labelledby="connected-title" className={cx(frame, spreadPadding)} data-spread="connected" reveal="panels">
      <div className="grid grid-cols-12 items-stretch gap-3 max-lg:grid-cols-6 max-md:grid-cols-1">
        <div className="col-span-7 rounded-spread bg-ink p-8 text-paper-bright lg:p-12 max-lg:col-span-4 max-md:col-span-1 max-md:p-6" data-motion-item="">
          <h2 className={cx(sectionHeading, "max-w-[13ch]")} id="connected-title">{connected.headline}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {connected.paragraphs.map((paragraph) => (
              <p className="m-0 max-w-[42ch] text-[0.9375rem] leading-[1.55] text-panel" key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <EditorialArtwork className="col-span-5 max-lg:col-span-2 max-md:col-span-1" decorative frameClassName="grid min-h-56 place-items-center rounded-spread bg-panel text-ink" variant="orbit" />
      </div>
    </ScrollReveal>
  );
}
