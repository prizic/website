"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { PrizicLogo } from "@/components/brand/prizic-logo";

const WORD_STATES = [
  { word: "Precise", suffix: "ecise", holdMs: 1_200 },
  { word: "Prism", suffix: "ism", holdMs: 1_200 },
  { word: "Prize", suffix: "ize", holdMs: 1_200 },
  { word: "Prizic", suffix: "izi", holdMs: 0 },
] as const;

const FINAL_STATE_INDEX = WORD_STATES.length - 1;
const SETTLE_DURATION_MS = 900;

type LivingWordmarkProps = {
  autoPlay?: boolean;
};

function FinalSuffix() {
  return (
    <>
      <span className="living-wordmark__letter-i">
        <span className="living-wordmark__eye" />
        <span className="living-wordmark__stem" />
      </span>
      <span className="living-wordmark__letter-z">
        z
        <svg aria-hidden="true" className="living-wordmark__smile" viewBox="0 0 48 18">
          <path d="M4 3c8 15 28 15 40 0" />
        </svg>
      </span>
      <span className="living-wordmark__letter-i">
        <span className="living-wordmark__eye" />
        <span className="living-wordmark__stem" />
      </span>
    </>
  );
}

export function LivingWordmark({ autoPlay = true }: LivingWordmarkProps) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [stateIndex, setStateIndex] = useState(
    autoPlay ? 0 : FINAL_STATE_INDEX,
  );
  const [replayCount, setReplayCount] = useState(0);
  const [isSettling, setIsSettling] = useState(false);
  const visibleStateIndex = shouldReduceMotion
    ? FINAL_STATE_INDEX
    : stateIndex;
  const state = WORD_STATES[visibleStateIndex];

  useEffect(() => {
    if (shouldReduceMotion || (!autoPlay && replayCount === 0)) return;

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
  }, [autoPlay, replayCount, shouldReduceMotion]);

  function replay() {
    if (shouldReduceMotion) return;

    setIsSettling(false);
    setStateIndex(0);
    setReplayCount((count) => count + 1);
  }

  return (
    <div className="living-wordmark">
      <figure
        aria-label="Prizic"
        className="living-wordmark__figure"
        data-settling={isSettling && !shouldReduceMotion ? "true" : "false"}
        data-word={state.word}
        role="img"
      >
        <div aria-hidden="true" className="living-wordmark__visual">
          <PrizicLogo
            className="living-wordmark__mark"
            decorative
            variant="mark"
          />
          <span className="living-wordmark__word">
            <span className="living-wordmark__anchor">Pr</span>
            <motion.span
              animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              className="living-wordmark__suffix"
              initial={
                shouldReduceMotion
                  ? false
                  : { filter: "blur(3px)", opacity: 0.55, y: "0.14em" }
              }
              key={`${replayCount}-${state.word}`}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {state.word === "Prizic" ? <FinalSuffix /> : state.suffix}
            </motion.span>
            <span className="living-wordmark__anchor">c</span>
          </span>
        </div>
      </figure>

      <button
        aria-label="Replay Prizic word animation"
        className="living-wordmark__replay"
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
