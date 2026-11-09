"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Minus, Plus, RotateCcw, Search } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { formatBDT, num } from "@/lib/format";
import { KATHA_SQFT, getPlots, type Plot, type Project } from "@/lib/mock/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Drawer, STATUS_COLOR, StatusLegend } from "./UnitsSection";
import { EnquiryForm } from "./EnquiryForm";

const W = 800;
const H = 520;
const CELL_W = 84;
const CELL_H = 74;
const GAP_X = 14;
const GAP_Y = 22;
const px = (c: number) => 40 + c * (CELL_W + GAP_X);
const py = (r: number) => 40 + r * (CELL_H + GAP_Y);

/** Interactive SVG master plan: zoom/pan, minimap, search, filters. */
export function PlotsSection({ project }: { project: Project }) {
  const t = useTranslations();
  const locale = useLocale();
  const plots = useMemo(() => getPlots(project), [project]);
  const [selected, setSelected] = useState<Plot | null>(null);
  const [q, setQ] = useState("");
  const [availOnly, setAvailOnly] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [view, setView] = useState({ k: 1, x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; vx: number; vy: number } | null>(null);

  const clamp = (v: { k: number; x: number; y: number }) => {
    const k = Math.min(4, Math.max(1, v.k));
    return {
      k,
      x: Math.min(0, Math.max(W - W * k, v.x)),
      y: Math.min(0, Math.max(H - H * k, v.y)),
    };
  };
  const zoom = (f: number) =>
    setView((v) => {
      const k = Math.min(4, Math.max(1, v.k * f));
      const cx = W / 2;
      const cy = H / 2;
      return clamp({ k, x: cx - ((cx - v.x) / v.k) * k, y: cy - ((cy - v.y) / v.k) * k });
    });

  const match = q.trim() ? plots.find((p) => String(p.no) === q.trim()) : undefined;
  const focus = (p: Plot) => {
    setSelected(p);
    const k = 2.4;
    setView(
      clamp({
        k,
        x: W / 2 - (px(p.col) + CELL_W / 2) * k,
        y: H / 2 - (py(p.row) + CELL_H / 2) * k,
      }),
    );
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <StatusLegend />
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={availOnly}
              onChange={(e) => setAvailOnly(e.target.checked)}
              className="accent-[var(--accent)]"
            />
            {t("detail.filterAvail")}
          </label>
          <form
            className="flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (match) focus(match);
            }}
          >
            <Input
              aria-label={t("detail.searchPlot")}
              placeholder={t("detail.searchPlot")}
              inputMode="numeric"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="h-10 w-44"
            />
            <Button type="submit" size="icon" variant="outline" aria-label={t("detail.searchPlot")}>
              <Search className="size-4" />
            </Button>
          </form>
        </div>
      </div>

      <div className="border-border bg-surface-2 relative mt-6 overflow-hidden rounded-xl border">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block w-full touch-none select-none"
          role="group"
          aria-label={t("detail.masterplan")}
          data-cursor="drag"
          onWheel={(e) => {
            if (!e.ctrlKey && !e.metaKey) return;
            e.preventDefault();
            zoom(e.deltaY < 0 ? 1.15 : 0.87);
          }}
          onPointerDown={(e) => {
            if (view.k === 1) return;
            (e.currentTarget as SVGSVGElement).setPointerCapture(e.pointerId);
            drag.current = { x: e.clientX, y: e.clientY, vx: view.x, vy: view.y };
            setDragging(true);
          }}
          onPointerMove={(e) => {
            if (!drag.current) return;
            const r = e.currentTarget.getBoundingClientRect();
            const s = W / r.width;
            setView((v) =>
              clamp({
                ...v,
                x: drag.current!.vx + (e.clientX - drag.current!.x) * s,
                y: drag.current!.vy + (e.clientY - drag.current!.y) * s,
              }),
            );
          }}
          onPointerUp={() => {
            drag.current = null;
            setDragging(false);
          }}
        >
          <g
            style={{
              transform: `translate(${view.x}px, ${view.y}px) scale(${view.k})`,
              transition: dragging ? "none" : "transform .5s var(--ease-premium)",
            }}
          >
            {/* roads + park */}
            <rect x={0} y={0} width={W} height={H} fill="var(--surface-2)" />
            {[0, 1, 2, 3, 4].map((r) => (
              <rect
                key={r}
                x={20}
                y={py(r) + CELL_H + 4}
                width={W - 40}
                height={14}
                rx={3}
                fill="var(--border)"
                opacity={0.6}
              />
            ))}
            <rect x={px(2) - 4} y={py(2) - 4} width={CELL_W * 2 + GAP_X + 8} height={0} />
            {plots.map((p) => {
              const dim = (availOnly && p.status !== "available") || (match && match.id !== p.id);
              return (
                <g
                  key={p.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`${t("detail.plot")} ${p.no}, ${t(`status.${p.status}`)}, ${p.katha} ${t("detail.katha")}`}
                  onClick={() => setSelected(p)}
                  onKeyDown={(e) =>
                    (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setSelected(p))
                  }
                  className="cursor-pointer transition-opacity outline-none focus-visible:[&>rect]:stroke-[var(--foreground)] focus-visible:[&>rect]:stroke-[3]"
                  style={{ opacity: dim ? 0.18 : 1 }}
                >
                  <rect
                    x={px(p.col)}
                    y={py(p.row)}
                    width={CELL_W}
                    height={CELL_H}
                    rx={6}
                    fill={STATUS_COLOR[p.status]}
                    stroke={selected?.id === p.id ? "var(--foreground)" : "transparent"}
                    strokeWidth={3}
                    className="hover:brightness-110"
                  />
                  <text
                    x={px(p.col) + CELL_W / 2}
                    y={py(p.row) + CELL_H / 2 - 2}
                    textAnchor="middle"
                    fill="#fff"
                    fontSize={18}
                    fontWeight={600}
                  >
                    {p.no}
                  </text>
                  <text
                    x={px(p.col) + CELL_W / 2}
                    y={py(p.row) + CELL_H / 2 + 16}
                    textAnchor="middle"
                    fill="#fff"
                    fontSize={11}
                    opacity={0.85}
                  >
                    {p.katha}K{p.corner ? " ◣" : ""}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            type="button"
            aria-label={t("detail.zoomIn")}
            onClick={() => zoom(1.4)}
            className="glass inline-flex size-9 items-center justify-center rounded-full"
          >
            <Plus className="size-4" />
          </button>
          <button
            type="button"
            aria-label={t("detail.zoomOut")}
            onClick={() => zoom(1 / 1.4)}
            className="glass inline-flex size-9 items-center justify-center rounded-full"
          >
            <Minus className="size-4" />
          </button>
          <button
            type="button"
            aria-label={t("detail.resetView")}
            onClick={() => setView({ k: 1, x: 0, y: 0 })}
            className="glass inline-flex size-9 items-center justify-center rounded-full"
          >
            <RotateCcw className="size-4" />
          </button>
        </div>

        {/* minimap */}
        <svg
          viewBox={`0 0 ${W} ${H}`}
          aria-hidden
          className="glass absolute bottom-3 left-3 hidden w-32 rounded-md sm:block"
        >
          {plots.map((p) => (
            <rect
              key={p.id}
              x={px(p.col)}
              y={py(p.row)}
              width={CELL_W}
              height={CELL_H}
              fill={STATUS_COLOR[p.status]}
              opacity={0.7}
            />
          ))}
          <rect
            x={-view.x / view.k}
            y={-view.y / view.k}
            width={W / view.k}
            height={H / view.k}
            fill="none"
            stroke="var(--foreground)"
            strokeWidth={6}
          />
        </svg>
      </div>
      <p className="text-muted mt-3 text-xs">{t("detail.liveNote")} · Ctrl/⌘ + scroll to zoom</p>

      <AnimatePresence>
        {selected && (
          <Drawer
            onClose={() => setSelected(null)}
            title={`${t("detail.plot")} ${num(selected.no, locale)}`}
          >
            <div className="flex flex-wrap gap-2">
              <Badge variant={selected.status}>{t(`status.${selected.status}`)}</Badge>
              {selected.corner && <Badge variant="accent">{t("detail.corner")}</Badge>}
              {selected.park && <Badge variant="accent">{t("detail.parkFacing")}</Badge>}
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
              {[
                [t("detail.katha"), num(selected.katha, locale)],
                [t("detail.sqft"), num(selected.katha * KATHA_SQFT, locale)],
                ["Decimal", ((selected.katha * KATHA_SQFT) / 435.6).toFixed(2)],
                [t("detail.facing"), selected.facing],
                [t("detail.road"), `${num(selected.road, locale)} ft`],
                [t("detail.price"), formatBDT(selected.price, locale)],
              ].map(([k, v]) => (
                <div key={k} className="bg-surface-2 rounded-md p-3">
                  <dt className="text-muted text-xs">{k}</dt>
                  <dd className="mt-1 font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <div
              className={cn(
                "border-border mt-8 border-t pt-6",
                selected.status !== "available" && "hidden",
              )}
            >
              <h3 className="font-display mb-4 text-2xl">{t("detail.bookUnit")}</h3>
              <EnquiryForm
                key={selected.id}
                compact
                context={`${t("detail.plot")} ${selected.no} · ${project.slug}`}
              />
            </div>
          </Drawer>
        )}
      </AnimatePresence>
    </div>
  );
}
