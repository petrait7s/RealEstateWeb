"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { convertArea, emiBreakdown, pricePerSqft, type AreaUnit } from "@/lib/calculators";
import { formatBDT, num } from "@/lib/format";
import { Input } from "@/components/ui/input";

const numVal = (s: string) => (Number.isFinite(parseFloat(s)) ? Math.max(0, parseFloat(s)) : 0);

function Field({
  label,
  id,
  ...p
}: { label: string; id: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="text-muted mb-1.5 block text-xs tracking-wider uppercase">
        {label}
      </label>
      <Input id={id} inputMode="decimal" {...p} />
    </div>
  );
}

function EmiCalc({ defaultPrice }: { defaultPrice: number }) {
  const t = useTranslations("calc");
  const locale = useLocale();
  const [loan, setLoan] = useState(String(Math.round(defaultPrice * 0.7)));
  const [rate, setRate] = useState("10");
  const [years, setYears] = useState("20");
  const r = emiBreakdown(numVal(loan), numVal(rate), numVal(years));
  const pct = r.total > 0 ? (numVal(loan) / r.total) * 100 : 100;
  const C = 2 * Math.PI * 42;

  return (
    <div className="border-border bg-surface rounded-xl border p-6 sm:p-8">
      <h3 className="font-display text-2xl">{t("emi")}</h3>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="space-y-4">
          <Field
            id="loan"
            label={t("loan")}
            value={loan}
            onChange={(e) => setLoan(e.target.value)}
          />
          <Field
            id="rate"
            label={t("rate")}
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
          <Field
            id="years"
            label={t("years")}
            value={years}
            onChange={(e) => setYears(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <svg
            viewBox="0 0 100 100"
            className="size-44 -rotate-90"
            role="img"
            aria-label={`${t("principal")} ${pct.toFixed(0)}%`}
          >
            <circle cx="50" cy="50" r="42" fill="none" stroke="var(--surface-2)" strokeWidth="12" />
            <motion.circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={C}
              animate={{ strokeDashoffset: C * (1 - pct / 100) }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
          <div className="flex gap-4 text-xs">
            <span className="flex items-center gap-1.5">
              <i className="bg-accent size-2.5 rounded-full" /> {t("principal")}
            </span>
            <span className="flex items-center gap-1.5">
              <i className="bg-surface-2 ring-border size-2.5 rounded-full ring-1" />{" "}
              {t("interest")}
            </span>
          </div>
        </div>
      </div>
      <dl className="mt-6 grid gap-3 sm:grid-cols-3" aria-live="polite">
        {[
          [t("monthly"), r.monthly],
          [t("interest"), r.interest],
          [t("total"), r.total],
        ].map(([k, v]) => (
          <div key={String(k)} className="bg-surface-2 rounded-md p-4">
            <dt className="text-muted text-xs">{k}</dt>
            <dd className="text-gold font-display mt-1 text-2xl">
              {formatBDT(Math.round(Number(v)), locale)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Converter() {
  const t = useTranslations("calc");
  const locale = useLocale();
  const [v, setV] = useState("5");
  const [from, setFrom] = useState<AreaUnit>("katha");
  const [to, setTo] = useState<AreaUnit>("sqft");
  const out = convertArea(numVal(v), from, to);
  const sel = "h-12 w-full rounded-md border border-border bg-surface px-3 text-sm";
  const units: AreaUnit[] = ["sqft", "katha", "decimal"];
  return (
    <div className="border-border bg-surface rounded-xl border p-6 sm:p-8">
      <h3 className="font-display text-2xl">{t("convert")}</h3>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Field id="cv" label={t("value")} value={v} onChange={(e) => setV(e.target.value)} />
        {(
          [
            ["from", from, setFrom],
            ["to", to, setTo],
          ] as const
        ).map(([k, val, set]) => (
          <div key={k}>
            <label
              htmlFor={`u-${k}`}
              className="text-muted mb-1.5 block text-xs tracking-wider uppercase"
            >
              {t(k)}
            </label>
            <select
              id={`u-${k}`}
              className={sel}
              value={val}
              onChange={(e) => set(e.target.value as AreaUnit)}
            >
              {units.map((u) => (
                <option key={u} value={u}>
                  {u === "sqft" ? "sq ft" : u}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <p className="bg-surface-2 mt-6 rounded-md p-4" aria-live="polite">
        <span className="text-muted text-xs">{t("result")}</span>
        <span className="text-gold font-display block text-3xl">
          {num(+out.toFixed(2), locale)} {to === "sqft" ? "sq ft" : to}
        </span>
      </p>
    </div>
  );
}

function Ppsf() {
  const t = useTranslations("calc");
  const locale = useLocale();
  const [price, setPrice] = useState("24500000");
  const [area, setArea] = useState("1850");
  return (
    <div className="border-border bg-surface rounded-xl border p-6 sm:p-8">
      <h3 className="font-display text-2xl">{t("ppsf")}</h3>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field
          id="pp"
          label={t("totalPrice")}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Field id="pa" label={t("area")} value={area} onChange={(e) => setArea(e.target.value)} />
      </div>
      <p className="bg-surface-2 mt-6 rounded-md p-4" aria-live="polite">
        <span className="text-muted text-xs">{t("result")}</span>
        <span className="text-gold font-display block text-3xl">
          ৳{num(Math.round(pricePerSqft(numVal(price), numVal(area))), locale)} / sq ft
        </span>
      </p>
    </div>
  );
}

export function Tools({ defaultPrice }: { defaultPrice: number }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <EmiCalc defaultPrice={defaultPrice} />
      <div className="space-y-6">
        <Converter />
        <Ppsf />
      </div>
    </div>
  );
}
