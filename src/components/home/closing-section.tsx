import Link from "next/link";

import { ContactAction } from "@/components/actions/contact-action";
import type { ContentAction } from "@/content/types";

type ClosingSectionProps = {
  headline: string;
  body: string;
  actions: readonly ContentAction[];
};

export function ClosingSection({
  headline,
  body,
  actions,
}: ClosingSectionProps) {
  const [primaryAction, secondaryAction] = actions;

  return (
    <section
      aria-labelledby="closing-title"
      className="home-section closing-section"
    >
      <div className="site-frame closing-section__grid">
        <h2 id="closing-title">{headline}</h2>
        <div className="closing-section__invitation">
          <p>{body}</p>
          <div className="home-actions">
            {primaryAction ? (
              <ContactAction
                className="home-action home-action--primary"
                contact={{ kind: "ready", href: primaryAction.href }}
                label={primaryAction.label}
              />
            ) : null}
            {secondaryAction ? (
              <Link
                className="home-action home-action--secondary"
                href={secondaryAction.href}
              >
                <span>{secondaryAction.label}</span>
                <svg aria-hidden="true" viewBox="0 0 16 16">
                  <path d="M3 13 13 3M6 3h7v7" />
                </svg>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
