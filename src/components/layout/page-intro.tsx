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
    <header className={classes}>
      <h1>{title}</h1>
      <p>{introduction}</p>
    </header>
  );
}
