import Link from "next/link";

import { EditorialArrow } from "@/components/editorial/editorial-arrow";
import { EditorialArtwork } from "@/components/editorial/editorial-artwork";
import { SITE_CONTENT } from "@/content/site";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export function MethodSpread() {
  return (
    <ScrollReveal aria-labelledby="method-title" className="site-frame home-spread method-spread" data-spread="method" id="method" reveal="panels">
      <h2 id="method-title">A way of thinking.</h2>
      <ol className="method-spread__modules">
        {SITE_CONTENT.process.stages.map((stage, index) => (
          <li data-motion-item="" key={stage.title}>
            {index === 2 ? <EditorialArtwork decorative variant="orbit" /> : null}
            <Link href="/thinking">
              <h3>{stage.title}</h3>
              <p>{stage.description}</p>
              <span className="method-spread__index" aria-hidden="true">{String(index + 1).padStart(2, "0")}<EditorialArrow /></span>
            </Link>
          </li>
        ))}
      </ol>
    </ScrollReveal>
  );
}
