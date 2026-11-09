"use client";

import { ArrowUpRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { formatBDT, pick } from "@/lib/format";
import type { Project } from "@/lib/mock/data";

export function ProjectCard({ p, priority }: { p: Project; priority?: boolean }) {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <Link
      href={`/projects/${p.slug}`}
      data-cursor="view"
      className="group block"
      aria-label={pick(p.name, locale)}
    >
      <article>
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
          <div
            className="size-full transition-transform duration-[1200ms] ease-[var(--ease-premium)] group-hover:scale-105"
            data-priority={priority}
          >
            <PlaceholderImage hue={p.hue} seed={p.slug.length} />
          </div>
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
            <Badge className="border-white/30 bg-black/30 text-white backdrop-blur">
              {t(`status.${p.status}`)}
            </Badge>
            <span className="inline-flex size-10 translate-y-1 items-center justify-center rounded-full bg-white/90 text-black opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <ArrowUpRight className="size-5" />
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 text-white">
            <p className="text-xs tracking-widest uppercase opacity-70">
              {t(`type.${p.type}`)} · {pick(p.location, locale)}
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl">{pick(p.name, locale)}</h3>
            <p className="text-muted mt-1 text-sm">{pick(p.tagline, locale)}</p>
          </div>
          <p className="shrink-0 text-right text-sm">
            <span className="text-muted block text-xs">{t("projects.from")}</span>
            <span className="text-gold font-medium">{formatBDT(p.priceFrom, locale)}</span>
          </p>
        </div>
      </article>
    </Link>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div aria-hidden>
      <div className="bg-surface-2 aspect-[4/5] animate-pulse rounded-xl" />
      <div className="bg-surface-2 mt-4 h-6 w-2/3 animate-pulse rounded" />
      <div className="bg-surface-2 mt-2 h-4 w-1/2 animate-pulse rounded" />
    </div>
  );
}
