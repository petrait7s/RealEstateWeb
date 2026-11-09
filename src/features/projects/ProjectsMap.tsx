"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/format";
import type { Project } from "@/lib/mock/data";

/** Stylised SVG map with custom markers (swap for MapLibre when tiles/keys are configured). */
export function ProjectsMap({ items }: { items: Project[] }) {
  const t = useTranslations("projects");
  const locale = useLocale();
  return (
    <div
      role="group"
      aria-label={t("mapLabel")}
      className="border-border bg-surface-2 relative aspect-[4/3] overflow-hidden rounded-xl border sm:aspect-[16/8]"
    >
      <svg
        viewBox="0 0 100 60"
        preserveAspectRatio="none"
        className="text-border absolute inset-0 size-full"
        aria-hidden
      >
        <defs>
          <pattern id="g" width="5" height="5" patternUnits="userSpaceOnUse">
            <path d="M5 0H0V5" fill="none" stroke="currentColor" strokeWidth=".15" />
          </pattern>
        </defs>
        <rect width="100" height="60" fill="url(#g)" />
        <path
          d="M0 40 C 25 30, 40 52, 65 38 S 90 20, 100 26"
          fill="none"
          stroke="var(--info)"
          strokeOpacity=".35"
          strokeWidth="2.4"
        />
        <path
          d="M10 0 L40 60 M0 20 L100 34 M70 0 L55 60"
          stroke="currentColor"
          strokeWidth=".5"
          fill="none"
        />
      </svg>
      {items.map((p) => (
        <Link
          key={p.slug}
          href={`/projects/${p.slug}`}
          style={{ left: `${p.map[0]}%`, top: `${p.map[1]}%` }}
          className="group absolute -translate-x-1/2 -translate-y-full"
          data-cursor="view"
        >
          <span className="glass pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-md px-3 py-1.5 text-xs whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            {pick(p.name, locale)}
          </span>
          <span className="bg-gold shadow-lift relative flex size-8 -rotate-45 items-center justify-center rounded-full rounded-br-none transition-transform group-hover:scale-125">
            <span className="bg-accent-foreground size-2.5 rotate-45 rounded-full" />
          </span>
          <span className="sr-only">{pick(p.name, locale)}</span>
        </Link>
      ))}
    </div>
  );
}
