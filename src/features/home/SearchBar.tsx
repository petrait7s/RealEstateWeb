"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

const fieldCls =
  "h-12 w-full appearance-none rounded-md border border-white/15 bg-white/5 px-3 text-sm text-[#f3eee3] backdrop-blur focus:border-[#d2ad69] focus:outline-none [&>option]:text-black";

/** Smart search → /projects with URL-synced filters. */
export function SearchBar() {
  const t = useTranslations("search");
  const router = useRouter();
  const [q, setQ] = useState({ type: "", location: "", price: "", size: "", status: "" });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    Object.entries(q).forEach(([k, v]) => v && params.set(k, v));
    router.push(`/projects${params.size ? `?${params}` : ""}`);
  }

  const sel = (key: keyof typeof q, label: string, options: [string, string][]) => (
    <label className="block">
      <span className="mb-1.5 block text-[11px] tracking-widest text-[#f3eee3]/60 uppercase">
        {label}
      </span>
      <select
        className={fieldCls}
        value={q[key]}
        onChange={(e) => setQ({ ...q, [key]: e.target.value })}
      >
        <option value="">{t("any")}</option>
        {options.map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <form
      onSubmit={submit}
      role="search"
      className="grid gap-3 rounded-xl border border-white/15 bg-black/30 p-4 backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-6 lg:items-end"
    >
      {sel("type", t("type"), [
        ["flat", "Flat"],
        ["plot", "Plot"],
        ["villa", "Villa"],
        ["commercial", "Commercial"],
      ])}
      {sel("location", t("location"), [
        ["gulshan", "Gulshan"],
        ["bashundhara", "Bashundhara"],
        ["purbachal", "Purbachal"],
        ["uttara", "Uttara"],
      ])}
      {sel("price", t("price"), [
        ["0-5000000", "< ৳50L"],
        ["5000000-10000000", "৳50L – 1Cr"],
        ["10000000-20000000", "৳1Cr – 2Cr"],
        ["20000000-", "> ৳2Cr"],
      ])}
      {sel("size", t("size"), [
        ["0-1000", "< 1,000 sq ft"],
        ["1000-2000", "1,000 – 2,000"],
        ["2000-", "> 2,000"],
      ])}
      {sel("status", t("status"), [
        ["ongoing", "Ongoing"],
        ["upcoming", "Upcoming"],
        ["completed", "Completed"],
      ])}
      <Button type="submit" size="lg" className="w-full">
        <Search className="size-4" /> {t("submit")}
      </Button>
    </form>
  );
}
