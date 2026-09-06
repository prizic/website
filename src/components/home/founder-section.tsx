import Link from "next/link";
import { EditorialArtwork } from "@/components/editorial/editorial-artwork";
import { EditorialArrow } from "@/components/editorial/editorial-arrow";

type FounderSectionProps = {
  headline: string;
  body: string;
};

export function FounderSection({ headline, body }: FounderSectionProps) {
  return (
    <section
      aria-labelledby="founder-title"
      className="site-frame home-spread founder-spread"
      data-spread="founder"
    >
      <div className="editorial-spread founder-spread__grid">
        <div className="founder-spread__statement">
          <h2 id="founder-title">{headline}</h2>
          <p>{body}</p>
          <Link className="spread-link" href="/about">More about Prizic<EditorialArrow /></Link>
        </div>
        <EditorialArtwork className="founder-spread__artwork" decorative variant="fold" />
      </div>
    </section>
  );
}
