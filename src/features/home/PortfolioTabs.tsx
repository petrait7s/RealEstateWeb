"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { projects, type ProjectStatus } from "@/lib/mock/data";
import { ProjectCard } from "@/features/projects/ProjectCard";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tabs: ProjectStatus[] = ["ongoing", "upcoming", "completed"];

export function PortfolioTabs() {
  const t = useTranslations();
  const [tab, setTab] = useState<ProjectStatus>("ongoing");
  const items = projects.filter((p) => p.status === tab).slice(0, 3);
  return (
    <section className="mx-auto max-w-[1600px] px-4 pb-24 sm:px-8 sm:pb-36">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="text-[length:var(--text-h1)]">{t("home.tabs")}</h2>
        <div
          role="tablist"
          aria-label={t("home.tabs")}
          className="border-border flex rounded-full border p-1"
        >
          {tabs.map((s) => (
            <button
              key={s}
              role="tab"
              id={`tab-${s}`}
              aria-selected={tab === s}
              aria-controls="portfolio-panel"
              onClick={() => setTab(s)}
              className={cn(
                "relative rounded-full px-5 py-2 text-sm",
                tab === s ? "text-background" : "text-muted hover:text-foreground",
              )}
            >
              {tab === s && (
                <motion.span
                  layoutId="tab-pill"
                  className="bg-foreground absolute inset-0 -z-0 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{t(`status.${s}`)}</span>
            </button>
          ))}
        </div>
      </div>
      <div id="portfolio-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="mt-12">
        <AnimatePresence mode="wait">
          <motion.ul
            key={tab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
          >
            {items.map((p) => (
              <li key={p.slug}>
                <ProjectCard p={p} />
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
      <div className="mt-12 text-center">
        <Link
          href={`/projects?status=${tab}`}
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          {t("home.viewAll")}
        </Link>
      </div>
    </section>
  );
}
