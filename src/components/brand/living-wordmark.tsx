"use client";

import { motion } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";

import { IdentityI } from "@/components/brand/identity-letter";
import { PrizicLogo } from "@/components/brand/prizic-logo";
import { cx, label } from "@/lib/ui";

const WORD_STATES = [
  { word: "Precise", holdMs: 1_200 },
  { word: "Prism", holdMs: 1_200 },
  { word: "Prize", holdMs: 1_200 },
  { word: "Prizic", holdMs: 0 },
] as const;

const FINAL_STATE_INDEX = WORD_STATES.length - 1;
const SETTLE_DURATION_MS = 900;
const subscribeToHydration = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;
const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const getReducedMotion = () => window.matchMedia?.(reducedMotionQuery).matches ?? false;
function subscribeToReducedMotion(onChange: () => void) {
  if (typeof window.matchMedia !== "function") return () => {};
  const media = window.matchMedia(reducedMotionQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

type LivingWordmarkProps = {
  autoPlay?: boolean;
  expandedSignal?: boolean;
};

// Seven measured rules behind the word; the fourth carries the accent.
const CALIBRATION_LINES = [
  "top-0 start-0 w-[42%]",
  "top-1.75 start-[8%] w-[61%] origin-right [animation-direction:reverse]",
  "top-3.5 end-0 w-[34%]",
  "top-1/2 -start-1.5 w-[12%] bg-accent origin-right [animation-direction:reverse]",
  "bottom-3.5 start-[4%] w-[58%]",
  "bottom-1.75 end-[6%] w-[27%] origin-right [animation-direction:reverse]",
  "bottom-0 start-[28%] w-[54%]",
];

const eye = "in-data-[settling=true]:animate-eye-blink-fast";

function FinalFace() {
  return (
    <>Pr<IdentityI eyeClassName={eye} />z<IdentityI eyeClassName={eye} />c</>
  );
}

export function LivingWordmark({
  autoPlay = true,
  expandedSignal = false,
}: LivingWordmarkProps) {
  const shouldReduceMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotion,
    () => true,
  );
  // The server and hydration frame share a complete, still identity. Only
  // hydrated clients with motion enabled enter the exploratory sequence.
  const hydrated = useSyncExternalStore(subscribeToHydration, clientSnapshot, serverSnapshot);
  const [stateIndex, setStateIndex] = useState(
    autoPlay ? 0 : FINAL_STATE_INDEX,
  );
  const [replayCount, setReplayCount] = useState(0);
  const [isSettling, setIsSettling] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  // A motion opt-out finishes this playback, including after the preference
  // changes back. Only explicit Replay starts another sequence.
  if (hydrated && shouldReduceMotion && !isCancelled) {
    setIsCancelled(true);
  }
  const visibleStateIndex = !hydrated || shouldReduceMotion || isCancelled
    ? FINAL_STATE_INDEX
    : stateIndex;
  const state = WORD_STATES[visibleStateIndex];
  const shouldAnimateFrame =
    hydrated && !shouldReduceMotion && !isCancelled && (autoPlay || replayCount > 0);

  useEffect(() => {
    if (shouldReduceMotion || isCancelled || (!autoPlay && replayCount === 0)) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    let elapsedMs = 0;

    WORD_STATES.slice(0, -1).forEach((wordState, index) => {
      elapsedMs += wordState.holdMs;
      timers.push(
        setTimeout(() => {
          const nextIndex = index + 1;
          setStateIndex(nextIndex);

          if (nextIndex === FINAL_STATE_INDEX) {
            setIsSettling(true);
            timers.push(
              setTimeout(() => setIsSettling(false), SETTLE_DURATION_MS),
            );
          }
        }, elapsedMs),
      );
    });

    return () => timers.forEach(clearTimeout);
  }, [autoPlay, replayCount, shouldReduceMotion, isCancelled]);

  function replay() {
    if (shouldReduceMotion) return;

    setIsCancelled(false);
    setIsSettling(false);
    setStateIndex(0);
    setReplayCount((count) => count + 1);
  }

  const anchor = cx(
    label,
    "relative z-1 inline-grid min-h-7 min-w-7 place-items-center border border-line-dark text-[0.625rem] leading-none max-md:min-w-5",
  );

  return (
    <div className={cx("relative grid max-w-full justify-items-start gap-3 px-3", expandedSignal && "w-full")}>
      <figure
        aria-label="Prizic"
        className={cx("m-0 max-w-full", expandedSignal && "w-full")}
        data-settling={isSettling && !shouldReduceMotion && !isCancelled ? "true" : "false"}
        data-word={state.word}
        data-motion={shouldAnimateFrame ? "enabled" : "static"}
        role="img"
      >
        <div aria-hidden="true" className={cx("flex max-w-full items-center gap-3 lg:gap-6", expandedSignal && "w-full")}>
          <PrizicLogo
            className="h-auto w-12 shrink-0 max-lg:w-10 max-md:w-9"
            decorative
            variant="mark"
          />
          <span
            className={
              expandedSignal ? "relative isolate min-h-20 min-w-0 flex-auto py-4" : undefined
            }
            data-signal-field={expandedSignal ? "" : undefined}
          >
            {expandedSignal ? (
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-1">
                {CALIBRATION_LINES.map((position, index) => (
                  <span
                    className={cx(
                      "absolute h-px bg-line-dark",
                      position,
                      "origin-left in-data-[motion=enabled]:animate-route-pass-slow motion-reduce:animate-none",
                    )}
                    data-calibration-line=""
                    key={index}
                  />
                ))}
                <span
                  className="absolute -end-1 top-[calc(50%-0.25rem)] size-2 border border-line-dark bg-ink"
                  data-calibration-origin=""
                />
              </span>
            ) : null}

            <span className="grid min-w-0 grid-cols-[auto_minmax(0,max-content)_auto] items-center justify-start gap-2 whitespace-nowrap text-paper-bright lg:gap-4 max-md:gap-1.5">
              <span className={cx(anchor, "text-panel")}>Pr</span>
              <motion.span
                animate={{ opacity: 1, y: 0 }}
                className="relative inline-block w-[6.5ch] min-w-0 origin-left font-display text-[clamp(2.5rem,4vw,3.5rem)] leading-[0.9] font-medium tracking-[-0.04em] text-accent max-lg:text-4xl max-md:text-[clamp(1.5rem,7vw,2.5rem)]"
                data-display-word=""
                initial={
                  shouldAnimateFrame
                    ? { opacity: 0.55, y: "0.14em" }
                    : false
                }
                key={`${replayCount}-${state.word}-${shouldAnimateFrame ? "animated" : "static"}`}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {state.word === "Prizic" ? <FinalFace /> : state.word}
              </motion.span>
              <span className={cx(anchor, "text-accent")}>c</span>
            </span>
          </span>
        </div>
      </figure>

      <button
        aria-label="Replay Prizic word animation"
        className="absolute end-3 -bottom-3 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-action border-0 bg-ink px-2 py-2 font-mono text-xs tracking-[0.04em] text-panel transition-colors duration-160 ease-out hover:bg-ink-soft hover:text-paper-bright focus-visible:bg-ink-soft focus-visible:text-paper-bright active:text-accent motion-reduce:transition-none"
        hidden={!hydrated || shouldReduceMotion}
        onClick={replay}
        type="button"
      >
        <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} viewBox="0 0 20 20">
          <path d="M16.4 8.2A6.7 6.7 0 1 0 16 13M16.4 8.2V3.8M16.4 8.2H12" />
        </svg>
        Replay
      </button>
    </div>
  );
}
