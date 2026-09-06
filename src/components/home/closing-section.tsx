import Link from "next/link";

import { ContactAction } from "@/components/actions/contact-action";
import type { ContentAction } from "@/content/types";
import { EditorialArrow } from "@/components/editorial/editorial-arrow";
import { PrizicLogo } from "@/components/brand/prizic-logo";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

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
    <ScrollReveal
      aria-labelledby="closing-title"
      className="site-frame home-spread closing-spread"
      data-spread="closing"
    >
      <div className="editorial-spread closing-spread__grid">
        <h2 data-motion-item="" id="closing-title">{headline}</h2>
        <PrizicLogo className="closing-spread__mark" decorative variant="mark" />
        <div className="closing-spread__invitation">
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
                <EditorialArrow />
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
