"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { useMotionOK } from "@/lib/use-motion";

export function Counter({
  to,
  suffix = "",
  locale = "en",
}: {
  to: number;
  suffix?: string;
  locale?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const ok = useMotionOK();
  const [val, setVal] = useState(ok ? 0 : to);
  const fmt = new Intl.NumberFormat(locale === "bn" ? "bn-BD" : "en-US");

  useEffect(() => {
    if (!inView || !ok) return;
    const c = animate(0, to, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => c.stop();
  }, [inView, ok, to]);

  return (
    <span ref={ref}>
      {fmt.format(val)}
      {suffix}
    </span>
  );
}
