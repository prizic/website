import { EditorialArtwork } from "@/components/editorial/editorial-artwork";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SITE_CONTENT } from "@/content/site";
import { cx, frame, sectionHeading, spreadPadding } from "@/lib/ui";

export function IntroductionSpread() {
  const { introduction } = SITE_CONTENT.home;

  return (
    <ScrollReveal aria-labelledby="introduction-title" className={cx(frame, spreadPadding)} data-spread="introduction" id="introduction" reveal="slide">
      <div className="grid grid-cols-12 items-start gap-4 lg:gap-8 max-lg:grid-cols-6 max-md:grid-cols-1">
        <div className="col-span-4 row-span-2 grid gap-3 max-lg:col-span-2 max-md:col-span-1 max-md:row-span-1 max-md:grid-cols-2">
          <EditorialArtwork decorative frameClassName="aspect-[1.6] rounded-t-spread rounded-b-[50%] bg-ink text-paper" variant="fold" />
          <EditorialArtwork decorative frameClassName="aspect-[1.6] rounded-t-[50%] rounded-b-spread bg-ink text-paper" variant="stack" />
        </div>
        <h2 className={cx(sectionHeading, "col-span-8 max-w-[14ch] max-lg:col-span-4 max-md:col-span-1")} data-motion-item="" id="introduction-title">
          {introduction.headline}
        </h2>
        <div className="col-span-8 grid grid-cols-2 gap-8 self-end max-lg:col-span-4 max-md:col-span-1 max-md:grid-cols-1 max-md:gap-4">
          {introduction.paragraphs.map((paragraph, index) => (
            <p
              className={cx("m-0 max-w-[42ch] leading-[1.55]", index === 0 ? "text-lede tracking-[-0.02em]" : "self-end text-[0.9375rem] text-muted")}
              data-motion-item=""
              key={paragraph}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
