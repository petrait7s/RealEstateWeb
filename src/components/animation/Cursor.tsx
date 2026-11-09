"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useUI, type CursorState } from "@/store/ui";

const LABELS: Record<CursorState, string> = {
  default: "",
  view: "View",
  drag: "Drag",
  explore: "Explore",
  hidden: "",
};

/**
 * Desktop-only custom cursor. Any element can set a state with
 * `data-cursor="view|drag|explore|hidden"`.
 */
export function Cursor() {
  const state = useUI((s) => s.cursor);
  const setCursor = useUI((s) => s.setCursor);
  const enabled = useRef(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    enabled.current = true;
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      if (el) setCursor((el.dataset.cursor as CursorState) ?? "default");
      else if ((e.target as HTMLElement | null)?.closest("a,button,[role=button]"))
        setCursor("view");
      else setCursor("default");
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [x, y, setCursor]);

  const label = LABELS[state];
  const big = state !== "default" && state !== "hidden";

  return (
    <motion.div
      aria-hidden
      className="bg-accent text-accent-foreground pointer-events-none fixed top-0 left-0 z-[90] hidden items-center justify-center rounded-full text-[11px] font-medium tracking-wider uppercase mix-blend-normal [@media(hover:hover)_and_(pointer:fine)]:flex"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: big ? 84 : 12,
        height: big ? 84 : 12,
        opacity: state === "hidden" ? 0 : big ? 0.95 : 0.8,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
    >
      {big && label}
    </motion.div>
  );
}
