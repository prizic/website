import Image from "next/image";

type PrizicLogoProps = {
  variant?: "lockup" | "mark";
  surface?: "dark" | "light";
  decorative?: boolean;
  className?: string;
  preload?: boolean;
};

export function PrizicLogo({
  variant = "lockup",
  surface = "dark",
  decorative = false,
  className,
  preload = false,
}: PrizicLogoProps) {
  const isMark = variant === "mark";
  const source = isMark
    ? `/brand/prizic-mark-on-${surface}.svg`
    : "/brand/prizic-lockup-on-dark.svg";

  return (
    <Image
      alt={decorative ? "" : "Prizic"}
      className={className}
      height={isMark ? 48 : 50}
      preload={preload}
      src={source}
      unoptimized
      width={isMark ? 48 : 170}
    />
  );
}
