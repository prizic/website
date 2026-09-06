import Link from "next/link";

import { EditorialArrow } from "@/components/editorial/editorial-arrow";
import { EditorialArtwork } from "@/components/editorial/editorial-artwork";
import { FolioLabel } from "@/components/editorial/folio-label";
import { SITE_CONTENT } from "@/content/site";

export function StorySpreads({ chapter }: { chapter: "introduction" | "direction" }) {
  if (chapter === "introduction") {
    return (
      <section aria-labelledby="introduction-title" className="site-frame home-spread introduction-spread" data-spread="introduction">
        <div className="editorial-spread introduction-spread__grid">
          <div className="introduction-spread__materials">
            <EditorialArtwork decorative variant="fold" />
            <EditorialArtwork decorative variant="fold" />
          </div>
          <h2 id="introduction-title">Introducing Prizic.</h2>
          <p className="introduction-spread__statement">{SITE_CONTENT.pages.about.purposeBody}</p>
          <div className="introduction-spread__detail">
            <p>{SITE_CONTENT.name.associations[0].description} {SITE_CONTENT.name.associations[1].description}</p>
            <Link className="spread-link" href="/about">About Prizic<EditorialArrow /></Link>
          </div>
        </div>
        <FolioLabel detail="Technology / 2026" section="Company" />
      </section>
    );
  }

  return (
    <section aria-labelledby="system-title" className="site-frame home-spread direction-spread" data-spread="direction">
      <div className="editorial-spread direction-spread__grid">
        <EditorialArtwork className="direction-spread__artwork" decorative variant="orbit" />
        <ol className="direction-spread__stages">
          {SITE_CONTENT.process.stages.map((stage, index) => (
            <li key={stage.title}>
              <span className="direction-spread__index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{stage.title}</h3><p>{stage.description}</p></div>
            </li>
          ))}
        </ol>
        <div className="direction-spread__statement">
          <h2 id="system-title">{SITE_CONTENT.process.headline}</h2>
          <p>{SITE_CONTENT.pages.thinking.processStages[1].description}</p>
          <Link className="spread-link" href="/thinking">Explore the thinking<EditorialArrow /></Link>
        </div>
      </div>
    </section>
  );
}
