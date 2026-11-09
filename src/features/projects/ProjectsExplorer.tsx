"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { LayoutGrid, Map as MapIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { projects } from "@/lib/mock/data";
import { Reveal } from "@/components/animation/Reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./ProjectCard";
import { ProjectsMap } from "./ProjectsMap";

const BUDGETS: Record<string, [number, number]> = {
  b1: [0, 15e6],
  b2: [15e6, 30e6],
  b3: [30e6, Infinity],
};
const chip = "rounded-full border px-4 py-2 text-sm transition-colors";

/** All filters live in the URL so results are shareable and back-button safe. */
export function ProjectsExplorer() {
  const t = useTranslations();
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const get = (k: string) => sp.get(k) ?? "";
  const set = (k: string, v: string) => {
    const n = new URLSearchParams(sp.toString());
    if (v) n.set(k, v);
    else n.delete(k);
    router.replace(`${pathname}${n.size ? `?${n}` : ""}`, { scroll: false });
  };

  const view = get("view") === "map" ? "map" : "grid";
  const sort = get("sort");

  const items = useMemo(() => {
    const status = sp.get("status");
    const type = sp.get("type");
    const loc = sp.get("location");
    const budget = sp.get("budget");
    const price = sp.get("price");
    let r = projects.filter(
      (p) =>
        (!status || p.status === status) &&
        (!type || p.type === type) &&
        (!loc || p.locationKey === loc),
    );
    if (budget && BUDGETS[budget]) {
      const [lo, hi] = BUDGETS[budget];
      r = r.filter((p) => p.priceFrom >= lo && p.priceFrom < hi);
    }
    if (price) {
      const [lo, hi] = price.split("-");
      r = r.filter((p) => p.priceFrom >= Number(lo || 0) && p.priceFrom < Number(hi || Infinity));
    }
    const s = sp.get("sort");
    return [...r].sort((a, b) =>
      s === "asc"
        ? a.priceFrom - b.priceFrom
        : s === "desc"
          ? b.priceFrom - a.priceFrom
          : Number(b.featured) - Number(a.featured),
    );
  }, [sp]);

  const group = (key: string, label: string, opts: [string, string][]) => (
    <fieldset className="min-w-0">
      <legend className="text-muted mb-2 text-xs tracking-widest uppercase">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {[["", t("projects.all")] as [string, string], ...opts].map(([v, l]) => (
          <button
            key={v}
            type="button"
            aria-pressed={get(key) === v}
            onClick={() => set(key, v)}
            className={cn(
              chip,
              get(key) === v
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border hover:border-accent",
            )}
          >
            {l}
          </button>
        ))}
      </div>
    </fieldset>
  );

  const hasFilters = ["status", "type", "location", "budget", "price"].some((k) => sp.has(k));

  return (
    <div>
      <div className="border-border bg-surface grid gap-6 rounded-xl border p-5 sm:p-6 lg:grid-cols-2 xl:grid-cols-4">
        {group(
          "status",
          t("projects.status"),
          (["ongoing", "upcoming", "completed"] as const).map((s) => [s, t(`status.${s}`)]),
        )}
        {group(
          "type",
          t("projects.type"),
          (["flat", "plot", "villa", "commercial"] as const).map((s) => [s, t(`type.${s}`)]),
        )}
        {group("location", t("projects.location"), [
          ["gulshan", "Gulshan"],
          ["bashundhara", "Bashundhara"],
          ["purbachal", "Purbachal"],
          ["uttara", "Uttara"],
        ])}
        {group(
          "budget",
          t("projects.budget"),
          (["b1", "b2", "b3"] as const).map((s) => [s, t(`projects.${s}`)]),
        )}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-muted" aria-live="polite">
          {t("projects.results", { count: items.length })}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.replace(pathname, { scroll: false })}
            >
              {t("projects.reset")}
            </Button>
          )}
          <label className="sr-only" htmlFor="sort">
            {t("projects.sort")}
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => set("sort", e.target.value)}
            className="border-border bg-surface h-10 rounded-full border px-4 text-sm"
          >
            <option value="">{t("projects.sortFeatured")}</option>
            <option value="asc">{t("projects.sortAsc")}</option>
            <option value="desc">{t("projects.sortDesc")}</option>
          </select>
          <div className="border-border flex rounded-full border p-1" role="group">
            {(
              [
                ["grid", LayoutGrid],
                ["map", MapIcon],
              ] as const
            ).map(([v, Icon]) => (
              <button
                key={v}
                type="button"
                aria-pressed={view === v}
                onClick={() => set("view", v === "grid" ? "" : v)}
                className={cn(
                  "inline-flex h-8 items-center gap-2 rounded-full px-4 text-sm",
                  view === v && "bg-foreground text-background",
                )}
              >
                <Icon className="size-4" /> {t(`projects.${v}`)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        {items.length === 0 ? (
          <div className="border-border rounded-xl border border-dashed py-24 text-center">
            <p className="font-display text-3xl">{t("projects.empty")}</p>
            <p className="text-muted mt-2">{t("projects.emptyBody")}</p>
          </div>
        ) : view === "map" ? (
          <ProjectsMap items={items} />
        ) : (
          <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((p, i) => (
              <li key={p.slug}>
                <Reveal delay={(i % 3) * 0.08}>
                  <ProjectCard p={p} priority={i < 3} />
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
