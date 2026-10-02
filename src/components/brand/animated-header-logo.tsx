"use client";

import { IdentityI } from "@/components/brand/identity-letter";
import { PrizicLogo } from "@/components/brand/prizic-logo";
import { useMotionPermission } from "@/components/motion/use-motion-permission";

export function AnimatedHeaderLogo() {
  const enabled = useMotionPermission();
  const eye = "in-data-[motion=enabled]:animate-eye-blink";

  return (
    <span
      aria-hidden="true"
      className="relative inline-flex w-29.5 items-center gap-1.75 text-paper-bright max-nav:w-24 max-nav:gap-1.5 max-xs:w-18 max-xs:gap-1"
      data-header-identity=""
      data-motion={enabled ? "enabled" : "static"}
    >
      <PrizicLogo
        className="size-7 max-nav:size-6 max-xs:size-4.5"
        decorative
        variant="mark"
      />
      <span className="inline-flex font-display text-[1.6rem] leading-none font-medium tracking-[-0.04em] max-nav:text-xl max-xs:text-base">
        <span>Pr</span>
        <IdentityI eyeClassName={eye} eyeProps={{ "data-identity-eye": "" }} />
        <span>z</span>
        <IdentityI eyeClassName={eye} eyeProps={{ "data-identity-eye": "" }} />
        <span>c</span>
      </span>
      <span className="absolute end-1 -bottom-0.75 start-8.75 h-px origin-left bg-accent in-data-[motion=enabled]:animate-route-pass-fast max-nav:start-7.5 max-xs:start-5.5 motion-reduce:animate-none" />
    </span>
  );
}
