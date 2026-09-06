"use client";

import { motion } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";

import { PrizicLogo } from "@/components/brand/prizic-logo";

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

function FinalFace() {
  return (
    <span className="living-wordmark__face">
      <span className="living-wordmark__eye living-wordmark__eye--first" />
      <span className="living-wordmark__eye living-wordmark__eye--second" />
      <svg aria-hidden="true" className="living-wordmark__smile" viewBox="0 0 48 18">
        <path d="M4 3c8 15 28 15 40 0" />
      </svg>
    </span>
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

  return (
    <div
      className={`living-wordmark${expandedSignal ? " living-wordmark--signal" : ""}`}
    >
      <figure
        aria-label="Prizic"
        className="living-wordmark__figure"
        data-settling={isSettling && !shouldReduceMotion && !isCancelled ? "true" : "false"}
        data-word={state.word}
        role="img"
      >
        <div aria-hidden="true" className="living-wordmark__visual">
          <PrizicLogo
            className="living-wordmark__mark"
            decorative
            variant="mark"
          />
          <span
            className={
              expandedSignal ? "living-wordmark__signal-field" : undefined
            }
            data-signal-field={expandedSignal ? "" : undefined}
          >
            {expandedSignal ? (
              <span aria-hidden="true" className="living-wordmark__calibration">
                {Array.from({ length: 7 }, (_, index) => (
                  <span data-calibration-line="" key={index} />
                ))}
                <span
                  className="living-wordmark__calibration-origin"
                  data-calibration-origin=""
                />
              </span>
            ) : null}

            <span className="living-wordmark__word">
              <span className="living-wordmark__anchor living-wordmark__anchor--prefix">
                Pr
              </span>
              <motion.span
                animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                className="living-wordmark__display-word"
                initial={
                  shouldAnimateFrame
                    ? { filter: "blur(3px)", opacity: 0.55, y: "0.14em" }
                    : false
                }
                key={`${replayCount}-${state.word}-${shouldAnimateFrame ? "animated" : "static"}`}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {state.word}
                {state.word === "Prizic" ? <FinalFace /> : null}
              </motion.span>
              <span className="living-wordmark__anchor living-wordmark__anchor--ending">
                c
              </span>
            </span>
          </span>
        </div>
      </figure>

      <button
        aria-label="Replay Prizic word animation"
        className="living-wordmark__replay"
        hidden={!hydrated || shouldReduceMotion}
        onClick={replay}
        type="button"
      >
        <svg aria-hidden="true" viewBox="0 0 20 20">
          <path d="M16.4 8.2A6.7 6.7 0 1 0 16 13M16.4 8.2V3.8M16.4 8.2H12" />
        </svg>
        Replay
      </button>
    </div>
  );
}
