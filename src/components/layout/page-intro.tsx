import { FolioLabel } from "@/components/editorial/folio-label";

type PageIntroProps = {
  title: string;
  introduction: string;
  className?: string;
  index?: string;
  eyebrow?: string;
};

export function PageIntro({
  title,
  introduction,
  className,
  index,
  eyebrow,
}: PageIntroProps) {
  const classes = ["page-intro", "site-frame", className]
    .filter(Boolean)
    .join(" ");

  return (
    <header aria-labelledby="page-title" className={classes}>
      <FolioLabel detail={eyebrow} index={index} section={title} />
      <div className="page-intro__grid">
        <h1 id="page-title">{title}</h1>
        <p>{introduction}</p>
      </div>
    </header>
  );
}
