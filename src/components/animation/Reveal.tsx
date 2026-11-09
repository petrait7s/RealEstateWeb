"use client";

import { motion, type Variants } from "framer-motion";
import { useMotionOK } from "@/lib/use-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** "mask" = clip-path wipe, "fade" = fade+rise */
  variant?: "mask" | "fade";
  as?: "div" | "span" | "li" | "section";
  once?: boolean;
};

const EASE = [0.22, 1, 0.36, 1] as const;

const variants: Record<"mask" | "fade", Variants> = {
  mask: {
    hidden: { clipPath: "inset(0 0 100% 0)", y: 40, opacity: 0 },
    show: { clipPath: "inset(0 0 0% 0)", y: 0, opacity: 1 },
  },
  fade: {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0 },
  },
};

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "fade",
  as = "div",
  once = true,
}: Props) {
  const ok = useMotionOK();
  const Comp = motion[as];
  if (!ok) return <Comp className={className}>{children}</Comp>;
  return (
    <Comp
      className={className}
      variants={variants[variant]}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-10% 0px" }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}

/** Staggered container: wrap <RevealItem> children. */
export function Stagger({
  children,
  className,
  gap = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  gap?: number;
}) {
  const ok = useMotionOK();
  if (!ok) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ok = useMotionOK();
  if (!ok) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={cn(className)}
      variants={variants.fade}
      transition={{ duration: 0.9, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Headline that reveals word-by-word with a mask. */
export function SplitText({ text, className }: { text: string; className?: string }) {
  const ok = useMotionOK();
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom" aria-hidden>
          <motion.span
            className="inline-block"
            initial={ok ? { y: "110%" } : false}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.1 + i * 0.06 }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
