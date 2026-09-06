import { useId, type ReactNode } from "react";

type EditorialArtworkProps = {
  variant: "fold" | "ribs" | "orbit" | "stack";
  label?: string;
  decorative?: boolean;
  className?: string;
};

const RIBS = Array.from({ length: 8 }, (_, index) => index);
const STACKS = [0, 1, 2, 3] as const;

export function EditorialArtwork({
  className,
  decorative = false,
  label,
  variant,
}: EditorialArtworkProps) {
  const artworkId = useId().replaceAll(":", "");
  const frameId = `${artworkId}-frame`;
  const grainId = `${artworkId}-grain`;
  const accessibility = decorative
    ? { "aria-hidden": true as const }
    : { "aria-label": label ?? "Prizic system study", role: "img" as const };

  const artwork = {
    fold: (
      <g mask={`url(#${frameId})`}>
        <path d="M90 90h360l190 170-190 170H90l190-170Z" fill="#ececea" />
        <path d="m90 90 190 170h360L450 90Z" fill="#5b5c58" />
        <path d="M90 430h360l190-170H280Z" fill="#252622" />
        <path d="m280 260 170-170v340Z" fill="currentColor" opacity=".08" />
      </g>
    ),
    ribs: (
      <g mask={`url(#${frameId})`}>
        {RIBS.map((index) => (
          <rect
            fill={index % 2 === 0 ? "#dededb" : "#777873"}
            height="300"
            key={index}
            rx="70"
            transform={`translate(${120 + index * 62} 100) rotate(-18 ${155 + index * 62} 250)`}
            width="70"
          />
        ))}
      </g>
    ),
    orbit: (
      <g fill="none" mask={`url(#${frameId})`} stroke="currentColor" strokeWidth="24">
        <circle cx="400" cy="260" r="180" />
        <circle cx="400" cy="260" opacity=".6" r="112" />
        <circle cx="400" cy="260" fill="var(--accent)" r="42" stroke="none" />
      </g>
    ),
    stack: (
      <g mask={`url(#${frameId})`}>
        {STACKS.map((index) => (
          <rect
            fill={index === 1 ? "var(--accent)" : index % 2 ? "#777873" : "#dededb"}
            height="68"
            key={index}
            rx="34"
            transform={`translate(${150 + index * 54} ${110 + index * 78}) rotate(-12 250 250)`}
            width="470"
          />
        ))}
      </g>
    ),
  } satisfies Record<EditorialArtworkProps["variant"], ReactNode>;

  return (
    <figure
      className={["editorial-artwork", className].filter(Boolean).join(" ")}
      data-artwork={variant}
      {...accessibility}
    >
      <svg aria-hidden="true" focusable="false" viewBox="0 0 800 520">
        <defs>
          <filter id={grainId} x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence baseFrequency="0.8" numOctaves="3" seed="17" type="fractalNoise" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA tableValues="0 .09" type="table" />
            </feComponentTransfer>
          </filter>
          <mask id={frameId}>
            <rect fill="white" height="520" rx="36" width="800" />
          </mask>
        </defs>
        <rect fill="currentColor" height="520" opacity=".04" rx="36" width="800" />
        {artwork[variant]}
        <rect filter={`url(#${grainId})`} height="520" rx="36" width="800" />
      </svg>
    </figure>
  );
}
