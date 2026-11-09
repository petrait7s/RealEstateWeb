"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { testimonials } from "@/lib/mock/data";
import { pick } from "@/lib/format";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const t = useTranslations("home");
  const locale = useLocale();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((n) => (n + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, [paused]);

  const x = testimonials[i]!;
  return (
    <section
      className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-8 sm:py-36"
      aria-label={t("testimonials")}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Quote className="text-accent mx-auto size-10" aria-hidden />
      <div className="mt-8 min-h-[16rem] sm:min-h-[14rem]" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5 }}
          >
            <blockquote className="font-display text-[length:var(--text-h2)] leading-tight">
              “{pick(x.quote, locale)}”
            </blockquote>
            <figcaption className="mt-8 text-sm">
              <span className="block font-medium">{x.name}</span>
              <span className="text-muted">{pick(x.role, locale)}</span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
      <div className="mt-8 flex justify-center gap-2">
        {testimonials.map((_, n) => (
          <button
            key={n}
            aria-label={`${n + 1}`}
            aria-current={n === i}
            onClick={() => setI(n)}
            className={cn(
              "h-1.5 rounded-full transition-all",
              n === i ? "bg-accent w-10" : "bg-border w-4",
            )}
          />
        ))}
      </div>
    </section>
  );
}
