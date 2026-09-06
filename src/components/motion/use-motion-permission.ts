"use client";

import { useState, useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";
const subscribeHydration = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;
const getPreference = () => window.matchMedia?.(query).matches ?? false;
function subscribePreference(listener: () => void) {
  const media = window.matchMedia?.(query);
  media?.addEventListener("change", listener);
  return () => media?.removeEventListener("change", listener);
}

/** A live opt-out finishes this mounted enhancement, including after opting back in. */
export function useMotionPermission() {
  const hydrated = useSyncExternalStore(subscribeHydration, clientSnapshot, serverSnapshot);
  const reduced = useSyncExternalStore(subscribePreference, getPreference, () => true);
  const [cancelled, setCancelled] = useState(false);
  if (hydrated && reduced && !cancelled) setCancelled(true);
  return hydrated && !reduced && !cancelled;
}
