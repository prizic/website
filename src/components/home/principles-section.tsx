import type { Principle } from "@/content/types";
import { EditorialArtwork } from "@/components/editorial/editorial-artwork";

type PrinciplesSectionProps = {
  headline: string;
  items: readonly Principle[];
};

export function PrinciplesSection({
  headline,
  items,
}: PrinciplesSectionProps) {
  return (
    <section
      aria-labelledby="principles-title"
      className="site-frame home-spread principles-spread"
      data-spread="principles"
      id="principles"
    >
      <div className="editorial-spread principles-spread__grid">
        <h2 id="principles-title">{headline}</h2>
        <EditorialArtwork className="principles-spread__artwork" decorative variant="ribs" />
        <ol className="principles-spread__list">
          {items.map((item, index) => (
            <li key={item.title}>
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
    </section>
  );
}
