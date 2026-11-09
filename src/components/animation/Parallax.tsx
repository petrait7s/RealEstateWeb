"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMotionOK } from "@/lib/use-motion";
import { cn } from "@/lib/utils";

export function Parallax({
  children,
  className,
  offset = 80,
}: {
  children: React.ReactNode;
  className?: string;
  /** px travelled over the scroll range */
  offset?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const ok = useMotionOK();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div style={ok ? { y, scale: 1.15 } : undefined} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
