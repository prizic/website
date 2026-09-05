import Link from "next/link";
import type { Metadata } from "next";

import { ContactAction } from "@/components/actions/contact-action";
import { LivingWordmark } from "@/components/brand/living-wordmark";
import { PrizicBlueprint } from "@/components/brand/prizic-blueprint";
import { CapabilitiesSection } from "@/components/home/capabilities-section";
import { ClosingSection } from "@/components/home/closing-section";
import { FounderSection } from "@/components/home/founder-section";
import { PrinciplesSection } from "@/components/home/principles-section";
import { SITE_CONTENT } from "@/content/site";
import { createPageMetadata } from "@/lib/metadata";
import { resolveSiteConfig } from "@/lib/site-config";

export const metadata: Metadata = createPageMetadata({
  title: "From possibility to working systems",
  description:
    "Prizic is a founder-led technology company combining product thinking, engineering and long-term technical direction.",
  path: "/",
  canonicalUrl: resolveSiteConfig(process.env, process.env.NODE_ENV).canonicalUrl,
});

function BlueprintPair({ className }: { className: string }) {
  return (
    <div className={className}>
      <div className="home-blueprint home-blueprint--full">
        <PrizicBlueprint stages={SITE_CONTENT.process.stages} />
      </div>
      <div className="home-blueprint home-blueprint--compact">
        <PrizicBlueprint compact stages={SITE_CONTENT.process.stages} />
      </div>
    </div>
  );
}

export default function HomePage() {
  const [primaryAction, secondaryAction] = SITE_CONTENT.hero.actions;

  return (
    <>
      <section
        aria-labelledby="home-title"
        className="home-hero"
      >
        <div className="site-frame home-hero__grid">
          <div className="home-hero__copy">
            <h1 aria-label={SITE_CONTENT.hero.headline} id="home-title">
              {SITE_CONTENT.hero.headline.slice(0, -1)}
              <span className="home-hero__punctuation">.</span>
            </h1>
            <p>{SITE_CONTENT.hero.supportingText}</p>
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
            <div className="home-hero__wordmark">
              <LivingWordmark expandedSignal />
            </div>
            <Link
              aria-label={`Continue to ${SITE_CONTENT.principles.headline}`}
              className="home-hero__continuation"
              href="#principles"
            >
              <span>Continue</span>
              <svg aria-hidden="true" viewBox="0 0 16 16">
                <path d="M8 2v12m-5-5 5 5 5-5" />
              </svg>
            </Link>
          </div>

          <BlueprintPair className="home-hero__blueprint" />
        </div>
      </section>

      <PrinciplesSection {...SITE_CONTENT.principles} />

      <section
        aria-labelledby="system-title"
        className="home-section home-system"
      >
        <div className="site-frame">
          <h2 id="system-title">{SITE_CONTENT.process.headline}</h2>
          <BlueprintPair className="home-system__blueprint" />
        </div>
      </section>

      <CapabilitiesSection {...SITE_CONTENT.capabilities} />
      <FounderSection {...SITE_CONTENT.founder} />
      <ClosingSection {...SITE_CONTENT.closing} />
    </>
  );
}
