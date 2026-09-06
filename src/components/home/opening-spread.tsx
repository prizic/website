import Link from "next/link";

import { ContactAction } from "@/components/actions/contact-action";
import { LivingWordmark } from "@/components/brand/living-wordmark";
import { EditorialArrow } from "@/components/editorial/editorial-arrow";
import { EditorialArtwork } from "@/components/editorial/editorial-artwork";
import { FolioLabel } from "@/components/editorial/folio-label";
import { SITE_CONTENT } from "@/content/site";

export function OpeningSpread() {
  const [primary, secondary] = SITE_CONTENT.hero.actions;

  return (
    <section aria-labelledby="home-title" className="site-frame opening-spread" data-spread="opening">
      <div className="opening-spread__grid">
        <div className="opening-spread__statement">
          <h1 id="home-title">{SITE_CONTENT.hero.headline}</h1>
          <p>{SITE_CONTENT.hero.supportingText}</p>
        </div>
        <div className="opening-spread__feature">
          <div className="opening-spread__materials">
            <EditorialArtwork decorative variant="fold" />
            <EditorialArtwork decorative variant="ribs" />
          </div>
          <LivingWordmark expandedSignal />
        </div>
        <div className="opening-spread__action">
          <ContactAction className="opening-spread__contact" contact={{ kind: "ready", href: primary.href }} label={primary.label} />
          <p>{SITE_CONTENT.pages.about.purposeBody}</p>
          <Link className="opening-spread__thinking" href={secondary.href}>
            <span>{secondary.label}</span><EditorialArrow />
          </Link>
        </div>
      </div>
      <div className="opening-spread__folio">
        <FolioLabel detail="Technology company" index="01" section="Prizic" />
        <Link aria-label="Continue to A way of thinking." href="#method"><span>Continue</span><EditorialArrow direction="down" /></Link>
      </div>
    </section>
  );
}
