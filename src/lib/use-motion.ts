"use client";

import { useReducedMotion } from "framer-motion";

/** True when decorative motion is allowed (respects prefers-reduced-motion). */
export function useMotionOK() {
  const reduced = useReducedMotion();
  return !reduced;
}

/** Reads the --motion-intensity design token (0–1.5). */
export function getMotionIntensity(): number {
  if (typeof window === "undefined") return 1;
  const v = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--motion-intensity"),
  );
  return Number.isFinite(v) ? v : 1;
}
