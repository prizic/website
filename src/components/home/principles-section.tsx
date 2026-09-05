import type { Principle } from "@/content/types";

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
      className="home-section principles-section light-field"
      id="principles"
    >
      <div className="site-frame principles-section__grid">
        <h2 id="principles-title">{headline}</h2>
        <ol className="principles-section__list">
          {items.map((item, index) => (
            <li key={item.title}>
              <span aria-hidden="true" className="principles-section__index">
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
