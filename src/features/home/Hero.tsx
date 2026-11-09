"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SplitText } from "@/components/animation/Reveal";
import { Magnetic } from "@/components/animation/MagneticButton";
import { buttonVariants } from "@/components/ui/button";
import { useMotionOK } from "@/lib/use-motion";
import { cn } from "@/lib/utils";
import { SearchBar } from "./SearchBar";

export function Hero() {
  const t = useTranslations("hero");
  const ref = useRef<HTMLElement>(null);
  const ok = useMotionOK();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100dvh] flex-col justify-end overflow-hidden bg-[#0e0d0a] text-[#f3eee3]"
    >
      {/* Cinematic backdrop: swap for <video>/image from the page builder */}
      <motion.div aria-hidden className="absolute inset-0 -z-10" style={ok ? { y } : undefined}>
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_20%,#3a2f1a_0%,#16130c_55%,#0e0d0a_100%)]" />
        <div className="absolute -top-1/4 right-[-10%] size-[70vmax] rounded-full bg-[radial-gradient(circle,rgba(210,173,105,0.28),transparent_60%)] blur-3xl" />
        <svg
          className="absolute inset-x-0 bottom-0 h-3/5 w-full opacity-40"
          viewBox="0 0 1200 400"
          preserveAspectRatio="xMidYMax slice"
          fill="none"
        >
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect
              key={i}
              x={80 + i * 160}
              y={400 - (120 + ((i * 53) % 190))}
              width={110}
              height={120 + ((i * 53) % 190)}
              stroke="#d2ad69"
              strokeOpacity={0.5}
            />
          ))}
        </svg>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0d0a] via-transparent to-[#0e0d0a]/50" />
      </motion.div>

      <motion.div
        style={ok ? { opacity: fade } : undefined}
        className="mx-auto w-full max-w-[1600px] px-4 pt-40 pb-10 sm:px-8"
      >
        <p className="mb-6 text-xs tracking-[0.3em] text-[#d2ad69] uppercase">{t("eyebrow")}</p>
        <h1 className="max-w-6xl text-[length:var(--text-display)]">
          <SplitText text={t("title")} />
        </h1>
        <p className="mt-8 max-w-xl text-[length:var(--text-lead)] text-[#f3eee3]/75">
          {t("subtitle")}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Magnetic>
            <Link href="/projects" data-cursor="explore" className={buttonVariants({ size: "lg" })}>
              {t("cta")}
            </Link>
          </Magnetic>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "border-white/25 text-[#f3eee3]",
            )}
          >
            {t("ctaSecondary")}
          </Link>
        </div>

        <div className="mt-14 sm:mt-20">
          <SearchBar />
        </div>

        <div className="mt-10 hidden items-center gap-2 text-xs tracking-widest text-[#f3eee3]/50 uppercase sm:flex">
          <ArrowDownRight className="size-4" /> {t("scroll")}
        </div>
      </motion.div>
    </section>
  );
}
