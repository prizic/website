import Link from "next/link";

import type { Capability } from "@/content/types";
import { EditorialArrow } from "@/components/editorial/editorial-arrow";
import { EditorialArtwork } from "@/components/editorial/editorial-artwork";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

type CapabilitiesSectionProps = {
  headline: string;
  items: readonly Capability[];
};

export function CapabilitiesSection({
  headline,
  items,
}: CapabilitiesSectionProps) {
  return (
    <ScrollReveal
      reveal="panels"
      aria-labelledby="capabilities-title"
      className="site-frame home-spread capabilities-spread"
      data-spread="capabilities"
    >
      <div className="editorial-spread capabilities-spread__grid">
        <h2 id="capabilities-title">{headline}</h2>
        <EditorialArtwork className="capabilities-spread__artwork" decorative variant="stack" />
        <ul className="capabilities-spread__list">
          {items.map((item) => (
            <li data-motion-item="" key={item.title}>
              <Link href={item.href}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <EditorialArrow />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </ScrollReveal>
  );
}
