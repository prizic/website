import type { Principle } from "@/content/types";
import { EditorialArtwork } from "@/components/editorial/editorial-artwork";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

type PrinciplesSectionProps = {
  headline: string;
  items: readonly Principle[];
};

export function PrinciplesSection({
  headline,
  items,
}: PrinciplesSectionProps) {
  return (
    <ScrollReveal
      aria-labelledby="principles-title"
      className="site-frame home-spread principles-spread"
      data-spread="principles"
      id="principles"
    >
      <div className="editorial-spread principles-spread__grid">
        <h2 data-motion-item="" id="principles-title">{headline}</h2>
        <EditorialArtwork className="principles-spread__artwork" decorative variant="ribs" />
        <ol className="principles-spread__list">
          {items.map((item, index) => (
            <li data-motion-item="" key={item.title}>
              <span aria-hidden="true" className="spread-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </ScrollReveal>
  );
}
