"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useUI } from "@/store/ui";

/** Brand-reveal preloader. Shown once per session; skipped for reduced motion. */
export function Preloader({ name }: { name: string }) {
  const [show, setShow] = useState(true);
  const setLoaded = useUI((s) => s.setLoaded);

  useEffect(() => {
    let skip = false;
    try {
      skip = sessionStorage.getItem("preloaded") === "1";
    } catch {}
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) skip = true;
    const t = setTimeout(
      () => {
        setShow(false);
        setLoaded(true);
        try {
          sessionStorage.setItem("preloaded", "1");
        } catch {}
      },
      skip ? 0 : 1900,
    );
    return () => clearTimeout(t);
  }, [setLoaded]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0e0d0a] text-[#f3eee3]"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          role="status"
          aria-label="Loading"
        >
          <div className="overflow-hidden">
            <motion.p
              className="font-display text-3xl tracking-tight sm:text-5xl"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              {name}
            </motion.p>
          </div>
          <motion.div
            className="bg-gold mt-8 h-px w-40 origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1], delay: 0.3 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
