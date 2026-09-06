import Image from "next/image";

import { ScrollReveal } from "@/components/motion/scroll-reveal";

type EditorialArtworkProps = {
  variant: "fold" | "ribs" | "orbit" | "stack";
  label?: string;
  decorative?: boolean;
  className?: string;
  preload?: boolean;
  sizes?: string;
};

const sources = {
  fold: "/images/editorial/prizic-monolith.webp",
  ribs: "/images/editorial/prizic-ribbon-system.webp",
  stack: "/images/editorial/prizic-iteration.webp",
} as const;

export function EditorialArtwork({ className, decorative = false, label, variant, preload = false, sizes = "(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 35vw" }: EditorialArtworkProps) {
  const accessibility = decorative
    ? { "aria-hidden": true as const }
    : { "aria-label": label ?? "Prizic system study", role: "img" as const };

  return (
    <ScrollReveal as="figure" artwork className={["editorial-artwork", className].filter(Boolean).join(" ")} data-artwork={variant} {...accessibility}>
      {variant === "orbit" ? (
        <svg aria-hidden="true" focusable="false" viewBox="0 0 800 520">
          <g className="editorial-artwork__orbits" fill="none" stroke="currentColor" strokeWidth="24">
            <circle cx="400" cy="260" r="180" />
            <circle cx="400" cy="260" opacity=".6" r="112" />
            <circle cx="400" cy="260" fill="var(--accent)" r="42" stroke="none" />
          </g>
        </svg>
      ) : (
        <div className="editorial-artwork__depth" data-artwork-depth="">
          <div className="editorial-artwork__parallax" data-artwork-parallax="">
            <div className="editorial-artwork__crop" data-artwork-crop="">
              <Image alt="" width={1200} height={1200} src={sources[variant]} sizes={sizes} preload={preload} />
            </div>
          </div>
        </div>
      )}
      <span aria-hidden="true" className="editorial-artwork__route" />
    </ScrollReveal>
  );
}
