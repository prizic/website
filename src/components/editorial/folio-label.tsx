import { cx, label } from "@/lib/ui";

type FolioLabelProps = {
  section: string;
  detail?: string;
  index?: string;
  surface?: "light" | "dark";
  className?: string;
  detailClassName?: string;
};

export function FolioLabel({
  detail,
  index,
  section,
  surface = "light",
  className,
  detailClassName,
}: FolioLabelProps) {
  return (
    <p
      className={cx(
        "m-0 flex items-baseline gap-2.5",
        label,
        surface === "dark" ? "text-paper-bright/72" : "text-ink-soft",
        className,
      )}
    >
      {index ? (
        <span className="rounded-full bg-accent px-1.5 py-1 text-accent-ink">
          {index}
        </span>
      ) : null}
      <span>{section}</span>
      {detail ? (
        <span
          className={cx(
            "ms-auto text-end",
            surface === "dark" ? "text-paper-bright/62" : "text-muted",
            detailClassName,
          )}
        >
          {detail}
        </span>
      ) : null}
    </p>
  );
}
