import { PrizicLogo } from "@/components/brand/prizic-logo";

type FounderSectionProps = {
  headline: string;
  body: string;
};

export function FounderSection({ headline, body }: FounderSectionProps) {
  return (
    <section
      aria-labelledby="founder-title"
      className="home-section founder-section"
    >
      <div className="site-frame founder-section__grid">
        <div aria-hidden="true" className="founder-section__mark">
          <PrizicLogo decorative variant="mark" />
        </div>
        <div className="founder-section__statement">
          <h2 id="founder-title">{headline}</h2>
          <p>{body}</p>
        </div>
      </div>
    </section>
  );
}
