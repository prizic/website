import Link from "next/link";

import type { Capability } from "@/content/types";

type CapabilitiesSectionProps = {
  headline: string;
  items: readonly Capability[];
};

export function CapabilitiesSection({
  headline,
  items,
}: CapabilitiesSectionProps) {
  return (
    <section
      aria-labelledby="capabilities-title"
      className="home-section capabilities-section"
    >
      <div className="site-frame">
        <h2 id="capabilities-title">{headline}</h2>
        <ul className="capabilities-section__list">
          {items.map((item) => (
            <li key={item.title}>
              <Link href={item.href}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <svg
                  aria-hidden="true"
                  className="capabilities-section__arrow"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 20 20 4M8 4h12v12" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
