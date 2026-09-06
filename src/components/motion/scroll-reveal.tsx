"use client";

import { animate, inView, stagger } from "motion";
import { useEffect, useRef, type HTMLAttributes } from "react";

import { useMotionPermission } from "@/components/motion/use-motion-permission";

const ease = [0.16, 1, 0.3, 1] as const;
type ScrollRevealProps = HTMLAttributes<HTMLElement> & {
  as?: "section" | "div" | "figure";
  reveal?: "lines" | "slide" | "panels";
  artwork?: boolean;
};

/** Server-visible chapters; only their authored details gain motion after hydration. */
export function ScrollReveal({ as: Tag = "section", reveal = "lines", artwork = false, children, ...props }: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const played = useRef(false);
  const enabled = useMotionPermission();

  useEffect(() => {
    const root = ref.current;
    if (!enabled || !root || typeof IntersectionObserver === "undefined") return;
    const animations: ReturnType<typeof animate>[] = [];
    const changed = new Set<HTMLElement>();
    let removeInteraction = () => {};

    const stopObservation = inView(root, () => {
      const crop = root.querySelector<HTMLElement>("[data-artwork-crop]");
      const depth = root.querySelector<HTMLElement>("[data-artwork-depth]");
      const parallax = root.querySelector<HTMLElement>("[data-artwork-parallax]");
      if (!played.current) {
        played.current = true;
        root.setAttribute("data-entered", "true");
        if (artwork && crop) {
          changed.add(crop);
          animations.push(animate(crop, { clipPath: ["inset(0 18% 0 0)", "inset(0px)"], scale: [1.12, 1], x: [-6, 0] }, { duration: 4.2, ease, clipPath: { duration: 1.1, ease } }));
        } else {
          const items = Array.from(root.querySelectorAll<HTMLElement>("[data-motion-item]"));
          items.forEach((item) => changed.add(item));
          if (items.length) animations.push(animate(items, reveal === "panels"
            ? { y: [28, 0], rotate: [-1.2, 0], opacity: [0.78, 1] }
            : reveal === "slide"
              ? { x: [-24, 0], clipPath: ["inset(0 8% 0 0)", "inset(0px)"] }
              : { clipPath: ["inset(0 0 18% 0)", "inset(0px)"], y: [14, 0] },
          { duration: 0.85, delay: stagger(0.075), ease }));
        }
      }

      if (!artwork || !depth || !parallax) return;
      changed.add(depth);
      changed.add(parallax);
      let frame = 0;
      const updateScroll = () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const bounds = root.getBoundingClientRect();
          // 5% overscan gives 2.5% bleed per edge; retain one pixel for rounding.
          const maxTravel = Math.min(8, Math.max(0, parallax.clientHeight * 0.025 - 1));
          const distance = Math.max(-maxTravel, Math.min(maxTravel, (innerHeight / 2 - bounds.top - bounds.height / 2) * 0.018));
          parallax.style.transform = `translateY(${distance}px) scale(1.05)`;
        });
      };
      const move = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        const bounds = root.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        depth.style.transform = `perspective(900px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) scale(1.035)`;
      };
      const leave = () => { depth.style.transform = "none"; };
      updateScroll();
      window.addEventListener("scroll", updateScroll, { passive: true });
      window.addEventListener("resize", updateScroll);
      root.addEventListener("pointermove", move);
      root.addEventListener("pointerleave", leave);
      removeInteraction = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("scroll", updateScroll);
        window.removeEventListener("resize", updateScroll);
        root.removeEventListener("pointermove", move);
        root.removeEventListener("pointerleave", leave);
      };
      return removeInteraction;
    }, { amount: 0.12 });

    return () => {
      stopObservation();
      removeInteraction();
      animations.forEach((animation) => animation.stop());
      changed.forEach((element) => {
        for (const property of ["transform", "opacity", "clip-path"]) element.style.removeProperty(property);
      });
    };
  }, [artwork, enabled, reveal]);

  return <Tag {...props} ref={(element) => { ref.current = element; }} data-reveal={reveal} data-motion={enabled ? "enabled" : "static"}>{children}</Tag>;
}
