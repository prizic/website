type PageIntroProps = {
  title: string;
  introduction: string;
  className?: string;
};

export function PageIntro({
  title,
  introduction,
  className,
}: PageIntroProps) {
  const classes = ["page-intro", "site-frame", className]
    .filter(Boolean)
    .join(" ");

  return (
    <header aria-labelledby="page-title" className={classes}>
      <h1 id="page-title">{title}</h1>
      <p>{introduction}</p>
    </header>
  );
}
