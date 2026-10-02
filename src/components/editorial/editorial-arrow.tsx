import { cx } from "@/lib/ui";

type EditorialArrowProps = {
  direction?: "up-right" | "down";
  size?: "sm" | "md";
  className?: string;
};

const paths = {
  "up-right": "M4 20 20 4M7 4h13v13",
  down: "M12 3v18m-7-7 7 7 7-7",
} as const;

/** Responds to hover and focus on the nearest `group` ancestor. */
export function EditorialArrow({
  direction = "up-right",
  size = "md",
  className,
}: EditorialArrowProps) {
  return (
    <svg
      aria-hidden="true"
      className={cx(
        "shrink-0 transition-transform duration-240 ease-editorial motion-reduce:transition-none",
        size === "sm" ? "size-3.5" : "size-5.5",
        direction === "down"
          ? "group-hover:translate-y-1.25 group-focus-visible:translate-y-1.25"
          : "group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1",
        className,
      )}
      data-direction={direction}
      fill="none"
      focusable="false"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      viewBox="0 0 24 24"
    >
      <path d={paths[direction]} />
    </svg>
  );
}
