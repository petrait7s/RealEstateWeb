"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GitCompareArrows, Heart, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { formatBDT, num } from "@/lib/format";
import { getUnits, type Project, type Unit, type UnitStatus } from "@/lib/mock/data";
import { useFavorites } from "@/store/favorites";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { EnquiryForm } from "./EnquiryForm";

export const STATUS_COLOR: Record<UnitStatus, string> = {
  available: "var(--status-available)",
  booked: "var(--status-booked)",
  sold: "var(--status-sold)",
  hold: "var(--status-hold)",
};

export function StatusLegend() {
  const t = useTranslations("status");
  return (
    <ul className="flex flex-wrap gap-4 text-sm" aria-label="Legend">
      {(Object.keys(STATUS_COLOR) as UnitStatus[]).map((s) => (
        <li key={s} className="flex items-center gap-2">
          <span className="size-3 rounded-sm" style={{ background: STATUS_COLOR[s] }} /> {t(s)}
        </li>
      ))}
    </ul>
  );
}

export function UnitsSection({ project }: { project: Project }) {
  const t = useTranslations();
  const locale = useLocale();
  const units = useMemo(() => getUnits(project), [project]);
  const [selected, setSelected] = useState<Unit | null>(null);
  const [compare, setCompare] = useState<string[]>([]);
  const [availOnly, setAvailOnly] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const favs = useFavorites();
  const floors = useMemo(
    () => Array.from({ length: project.floors }, (_, i) => project.floors - i),
    [project.floors],
  );

  const toggleCompare = (id: string) =>
    setCompare((c) =>
      c.includes(id) ? c.filter((x) => x !== id) : c.length >= 3 ? c : [...c, id],
    );
  const compared = compare.map((id) => units.find((u) => u.id === id)).filter(Boolean) as Unit[];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <StatusLegend />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={availOnly}
            onChange={(e) => setAvailOnly(e.target.checked)}
            className="accent-[var(--accent)]"
          />
          {t("detail.filterAvail")}
        </label>
      </div>

      <div
        className="border-border bg-surface mt-6 overflow-x-auto rounded-xl border p-4 sm:p-6"
        data-lenis-prevent
      >
        <div className="min-w-[520px] space-y-1.5">
          {floors.map((f) => (
            <div key={f} className="flex items-center gap-3">
              <span className="text-muted w-12 shrink-0 text-right text-xs">
                {t("detail.floorN", { n: num(f, locale) })}
              </span>
              <div
                className="grid flex-1 gap-1.5"
                style={{
                  gridTemplateColumns: `repeat(${project.unitsPerFloor || 4}, minmax(0, 1fr))`,
                }}
              >
                {units
                  .filter((u) => u.floor === f)
                  .map((u) => {
                    const dim = availOnly && u.status !== "available";
                    const inCmp = compare.includes(u.id);
                    return (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => setSelected(u)}
                        aria-label={`${t("detail.unit")} ${u.label}, ${t(`status.${u.status}`)}, ${num(u.size, locale)} ${t("detail.sqft")}`}
                        className={cn(
                          "hover:shadow-soft relative h-11 rounded-md text-xs font-medium text-white transition-all hover:scale-[1.04] focus-visible:z-10",
                          dim && "opacity-20",
                          inCmp && "ring-foreground ring-offset-surface ring-2 ring-offset-2",
                          selected?.id === u.id && "ring-accent scale-105 ring-2",
                        )}
                        style={{ background: STATUS_COLOR[u.status] }}
                      >
                        {u.label}
                      </button>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {compare.length > 0 && (
        <div className="glass shadow-lift fixed inset-x-4 bottom-4 z-40 mx-auto flex max-w-xl items-center justify-between gap-3 rounded-full px-5 py-3">
          <span className="text-sm">
            {t("detail.comparing")}: {compare.length}/3
          </span>
          <div className="flex gap-2">
            <Button size="sm" disabled={compare.length < 2} onClick={() => setShowCompare(true)}>
              {t("detail.compare")}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setCompare([])}>
              {t("detail.clear")}
            </Button>
          </div>
        </div>
      )}

      <AnimatePresence>
        {selected && (
          <Drawer onClose={() => setSelected(null)} title={`${t("detail.unit")} ${selected.label}`}>
            <Badge variant={selected.status}>{t(`status.${selected.status}`)}</Badge>
            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
              {[
                [t("detail.floor"), num(selected.floor, locale)],
                [t("detail.size"), `${num(selected.size, locale)} ${t("detail.sqft")}`],
                [t("detail.facing"), selected.facing],
                [t("detail.beds"), num(selected.beds, locale)],
                [t("detail.baths"), num(selected.baths, locale)],
                [t("detail.price"), formatBDT(selected.price, locale)],
              ].map(([k, v]) => (
                <div key={k} className="bg-surface-2 rounded-md p-3">
                  <dt className="text-muted text-xs">{k}</dt>
                  <dd className="mt-1 font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => favs.toggle(selected.id)}
                aria-pressed={favs.ids.includes(selected.id)}
              >
                <Heart
                  className={cn(
                    "size-4",
                    favs.ids.includes(selected.id) && "fill-accent text-accent",
                  )}
                />
                {favs.ids.includes(selected.id) ? t("detail.saved") : t("detail.save")}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleCompare(selected.id)}
                aria-pressed={compare.includes(selected.id)}
              >
                <GitCompareArrows className="size-4" /> {t("detail.compare")}
              </Button>
            </div>
            <div className="border-border mt-8 border-t pt-6">
              {selected.status === "available" ? (
                <>
                  <h3 className="font-display mb-4 text-2xl">{t("detail.bookUnit")}</h3>
                  <EnquiryForm
                    key={selected.id}
                    compact
                    context={`${t("detail.unit")} ${selected.label} · ${project.slug}`}
                  />
                </>
              ) : (
                <p className="text-muted">{t(`status.${selected.status}`)}</p>
              )}
            </div>
          </Drawer>
        )}
        {showCompare && (
          <Drawer wide onClose={() => setShowCompare(false)} title={t("detail.compare")}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[420px] text-sm">
                <thead>
                  <tr>
                    <th />
                    {compared.map((u) => (
                      <th key={u.id} className="font-display p-3 text-left text-xl">
                        {u.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(
                    [
                      ["detail.floor", (u: Unit) => num(u.floor, locale)],
                      ["detail.size", (u: Unit) => `${num(u.size, locale)} ${t("detail.sqft")}`],
                      ["detail.facing", (u: Unit) => u.facing],
                      ["detail.beds", (u: Unit) => num(u.beds, locale)],
                      ["detail.baths", (u: Unit) => num(u.baths, locale)],
                      ["detail.price", (u: Unit) => formatBDT(u.price, locale)],
                    ] as const
                  ).map(([k, fn]) => (
                    <tr key={k} className="border-border border-t">
                      <th scope="row" className="text-muted p-3 text-left font-normal">
                        {t(k)}
                      </th>
                      {compared.map((u) => (
                        <td key={u.id} className="p-3">
                          {fn(u)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Drawer>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Drawer({
  title,
  onClose,
  children,
  wide,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  wide?: boolean;
}) {
  const t = useTranslations("detail");
  return (
    <>
      <motion.div
        className="fixed inset-0 z-[70] bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden
      />
      <motion.aside
        role="dialog"
        aria-modal="true"
        aria-label={title}
        data-lenis-prevent
        className={cn(
          "bg-background shadow-lift fixed top-0 right-0 z-[71] h-dvh w-full overflow-y-auto p-6 sm:p-8",
          wide ? "max-w-2xl" : "max-w-md",
        )}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-3xl">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("close")}
            autoFocus
            className="border-border hover:border-accent inline-flex size-10 items-center justify-center rounded-full border"
          >
            <X className="size-5" />
          </button>
        </div>
        {children}
      </motion.aside>
    </>
  );
}
