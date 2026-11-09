"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { projects } from "@/lib/mock/data";
import { ProjectCard } from "@/features/projects/ProjectCard";
import { Reveal } from "@/components/animation/Reveal";

/** Drag-with-inertia carousel (framer-motion drag + constraints). */
export function FeaturedCarousel() {
  const t = useTranslations("home");
  const items = projects.filter((p) => p.featured);
  const track = useRef<HTMLUListElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const [limit, setLimit] = useState(0);

  useEffect(() => {
    const calc = () => {
      if (track.current && wrap.current)
        setLimit(Math.min(0, wrap.current.clientWidth - track.current.scrollWidth));
    };
    calc();
    const ro = new ResizeObserver(calc);
    if (wrap.current) ro.observe(wrap.current);
    return () => ro.disconnect();
  }, []);

  return (
    <section className="overflow-hidden py-24 sm:py-36" aria-label={t("featured")}>
      <div className="mx-auto flex max-w-[1600px] items-end justify-between gap-4 px-4 sm:px-8">
        <Reveal variant="mask">
          <h2 className="text-[length:var(--text-h1)]">{t("featured")}</h2>
        </Reveal>
        <p className="text-muted hidden text-sm tracking-widest uppercase sm:block">
          {t("featuredSub")}
        </p>
      </div>
      <div ref={wrap} className="mx-auto mt-12 max-w-[1600px] px-4 sm:px-8">
        <motion.ul
          ref={track}
          className="flex w-max gap-6"
          drag="x"
          dragConstraints={{ left: limit, right: 0 }}
          dragTransition={{ power: 0.25, timeConstant: 240 }}
          data-cursor="drag"
          style={{ touchAction: "pan-y" }}
        >
          {items.map((p, i) => (
            <li key={p.slug} className="w-[78vw] shrink-0 sm:w-[420px]" draggable={false}>
              <ProjectCard p={p} priority={i === 0} />
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
