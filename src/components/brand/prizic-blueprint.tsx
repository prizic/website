"use client";

import { motion, useReducedMotion } from "motion/react";

import type { ProcessStage } from "@/content/types";

type PrizicBlueprintProps = {
  stages: readonly ProcessStage[];
  compact?: boolean;
};

const FULL_ROUTE =
  "M380 250V170C380 110 410 72 470 72H535C595 72 628 105 628 165V214C628 242 606 264 578 264H548V346C548 396 518 426 468 426H306C256 426 226 396 226 346V318H162C108 318 78 288 78 234V204C78 150 108 120 162 120H276";
const COMPACT_ROUTE =
  "M72 42V124C72 154 92 174 122 174H132V252C132 282 112 302 82 302H72V380C72 410 92 430 122 430H132V508C132 538 112 558 82 558H72V678";

export function PrizicBlueprint({
  stages,
  compact = false,
}: PrizicBlueprintProps) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const route = compact ? COMPACT_ROUTE : FULL_ROUTE;

  return (
    <figure
      aria-label="The Prizic system"
      className={`prizic-blueprint${compact ? " prizic-blueprint--compact" : ""}`}
    >
      <svg
        aria-hidden="true"
        className="prizic-blueprint__drawing"
        data-layout={compact ? "compact" : "full"}
        focusable="false"
        viewBox={compact ? "0 0 144 720" : "0 0 760 500"}
      >
        <path
          className="prizic-blueprint__guide"
          d={route}
          data-route=""
          fill="none"
          pathLength="1"
          strokeDasharray="1"
        />
        <motion.path
          animate={{ pathLength: 1 }}
          className="prizic-blueprint__route"
          d={route}
          data-motion={shouldReduceMotion ? "static" : "animated"}
          data-route-progress=""
          fill="none"
          initial={shouldReduceMotion ? false : { pathLength: 0 }}
          pathLength="1"
          strokeDasharray="1"
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />

        {compact ? null : (
          <>
            <path className="prizic-blueprint__axis" d="M380 24V476" />
            <path className="prizic-blueprint__axis" d="M28 250H732" />
            <circle className="prizic-blueprint__origin-ring" cx="380" cy="250" r="72" />
            <circle className="prizic-blueprint__origin-ring" cx="380" cy="250" r="58" />
            <image
              height="88"
              href="/brand/prizic-mark-on-dark.svg"
              width="88"
              x="336"
              y="206"
            />
          </>
        )}
      </svg>

      <ol className="prizic-blueprint__stages">
        {stages.map((stage, index) => (
          <li className="prizic-blueprint__stage" key={stage.title}>
            <span aria-hidden="true" className="prizic-blueprint__index">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <strong>{stage.title}</strong>
              <p>{stage.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
