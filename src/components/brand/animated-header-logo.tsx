"use client";

import { PrizicLogo } from "@/components/brand/prizic-logo";
import { useMotionPermission } from "@/components/motion/use-motion-permission";

export function AnimatedHeaderLogo() {
  const enabled = useMotionPermission();
  return (
    <span aria-hidden="true" className="animated-header-logo" data-header-identity="" data-motion={enabled ? "enabled" : "static"}>
      <PrizicLogo className="animated-header-logo__mark" decorative variant="mark" />
      <span className="animated-header-logo__word">
        <span>Pr</span><span className="identity-i"><span className="identity-i__stem">i</span><span data-identity-eye="" /></span><span>z</span><span className="identity-i"><span className="identity-i__stem">i</span><span data-identity-eye="" /></span><span>c</span>
      </span>
      <span className="animated-header-logo__line" />
    </span>
  );
}
