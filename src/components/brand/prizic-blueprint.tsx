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

const REGISTRATION_MARKS = [
  [250, 58],
  [518, 58],
  [510, 246],
  [750, 246],
  [274, 444],
  [536, 444],
  [8, 261],
  [250, 261],
  [380, 166],
  [464, 250],
  [380, 334],
  [296, 250],
] as const;

const STAGE_CALLOUTS = [
  { label: "QUESTION / 01", x: 247, y: 132 },
  { label: "DIRECTION / 02", x: 618, y: 176 },
  { label: "SOFTWARE / 03", x: 540, y: 484 },
  { label: "LEARNING / 04", x: 12, y: 190 },
] as const;

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
            <g className="prizic-blueprint__construction">
              <rect
                data-construction-contour=""
                height="118"
                rx="59"
                width="270"
                x="250"
                y="0"
              />
              <rect
                data-construction-contour=""
                height="134"
                rx="67"
                width="286"
                x="242"
                y="-8"
              />
              <rect
                data-construction-contour=""
                height="118"
                rx="59"
                width="250"
                x="510"
                y="190"
              />
              <rect
                data-construction-contour=""
                height="134"
                rx="67"
                width="266"
                x="502"
                y="182"
              />
              <rect
                data-construction-contour=""
                height="112"
                rx="56"
                width="262"
                x="274"
                y="388"
              />
              <rect
                data-construction-contour=""
                height="128"
                rx="64"
                width="278"
                x="266"
                y="380"
              />
              <rect
                data-construction-contour=""
                height="118"
                rx="59"
                width="250"
                x="0"
                y="205"
              />
              <rect
                data-construction-contour=""
                height="134"
                rx="67"
                width="266"
                x="-8"
                y="197"
              />
              <circle
                cx="380"
                cy="250"
                data-construction-contour=""
                r="84"
              />
              <circle
                cx="380"
                cy="250"
                data-construction-contour=""
                r="72"
              />
            </g>

            <g className="prizic-blueprint__measurements">
              <path data-measurement-axis="" d="M380 18V482" />
              <path data-measurement-axis="" d="M20 250H740" />
              <path data-measurement-axis="" d="M250 142H520" />
              <path data-measurement-axis="" d="M554 308V380" />
            </g>

            <g className="prizic-blueprint__registrations">
              {REGISTRATION_MARKS.map(([x, y]) => (
                <g
                  data-registration-mark=""
                  key={`${x}-${y}`}
                  transform={`translate(${x} ${y})`}
                >
                  <rect height="8" width="8" x="-4" y="-4" />
                  <path d="M-9 0H9M0-9V9" />
                </g>
              ))}
            </g>

            <g className="prizic-blueprint__coordinates">
              <text data-coordinate-detail="" x="402" y="176">
                X 380
              </text>
              <text data-coordinate-detail="" x="402" y="188">
                Y 250
              </text>
              <text data-coordinate-detail="" x="402" y="320">
                P/Z ORIGIN
              </text>
            </g>

            <g className="prizic-blueprint__callouts">
              {STAGE_CALLOUTS.map((callout) => (
                <text
                  data-blueprint-callout=""
                  key={callout.label}
                  x={callout.x}
                  y={callout.y}
                >
                  {callout.label}
                </text>
              ))}
            </g>

            <circle className="prizic-blueprint__origin-ring" cx="380" cy="250" r="66" />
            <circle className="prizic-blueprint__origin-ring" cx="380" cy="250" r="54" />
            <image
              height="92"
              href="/brand/prizic-mark-on-dark.svg"
              width="92"
              x="334"
              y="204"
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
