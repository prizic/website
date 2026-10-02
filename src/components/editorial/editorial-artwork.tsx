import Image from "next/image";

import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { cx } from "@/lib/ui";

type EditorialArtworkProps = {
  variant: "fold" | "ribs" | "orbit" | "stack";
  label?: string;
  decorative?: boolean;
  /** Shape, proportion and field; replaces the default 800:520 panel. */
  frameClassName?: string;
  className?: string;
  preload?: boolean;
  sizes?: string;
};

const sources = {
  fold: "/images/editorial/prizic-monolith.webp",
  ribs: "/images/editorial/prizic-ribbon-system.webp",
  stack: "/images/editorial/prizic-iteration.webp",
} as const;

const crops = {
  fold: "object-[50%_48%]",
  ribs: "object-[42%_50%]",
  stack: "object-[64%_56%]",
} as const;

const DEFAULT_FRAME = "aspect-[800/520] rounded-spread bg-panel text-ink";

export function EditorialArtwork({ className, decorative = false, frameClassName = DEFAULT_FRAME, label, variant, preload = false, sizes = "(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 35vw" }: EditorialArtworkProps) {
  const accessibility = decorative
    ? { "aria-hidden": true as const }
    : { "aria-label": label ?? "Prizic system study", role: "img" as const };

  return (
    <ScrollReveal as="figure" artwork className={cx("relative m-0 w-full max-w-full min-w-0 overflow-hidden", frameClassName, className)} data-artwork={variant} {...accessibility}>
      {variant === "orbit" ? (
        <svg aria-hidden="true" className="h-auto w-full" focusable="false" viewBox="0 0 800 520">
          <g className="origin-center in-data-[entered=true]:animate-orbit-arrive motion-reduce:animate-none" fill="none" stroke="currentColor" strokeWidth="24">
            <circle cx="400" cy="260" r="180" />
            <circle cx="400" cy="260" opacity=".6" r="112" />
            <circle className="fill-accent" cx="400" cy="260" r="42" stroke="none" />
          </g>
        </svg>
      ) : (
        <div className="absolute inset-0 transition-transform duration-350 ease-editorial motion-reduce:transition-none" data-artwork-depth="">
          <div className="absolute inset-0" data-artwork-parallax="">
            <div className="absolute inset-0" data-artwork-crop="">
              <Image alt="" className={cx("size-full object-cover", crops[variant])} width={1200} height={1200} src={sources[variant]} sizes={sizes} preload={preload} />
            </div>
          </div>
        </div>
      )}
      <span aria-hidden="true" className="absolute start-[12%] end-[64%] bottom-5 h-0.5 origin-left bg-accent in-data-[entered=true]:animate-route-pass motion-reduce:animate-none" />
    </ScrollReveal>
  );
}
