type EditorialArrowProps = {
  direction?: "up-right" | "down";
};

const paths = {
  "up-right": "M4 20 20 4M7 4h13v13",
  down: "M12 3v18m-7-7 7 7 7-7",
} as const;

export function EditorialArrow({ direction = "up-right" }: EditorialArrowProps) {
  return (
    <svg
      aria-hidden="true"
      className="editorial-arrow"
      focusable="false"
      viewBox="0 0 24 24"
    >
      <path d={paths[direction]} fill="none" />
    </svg>
  );
}
