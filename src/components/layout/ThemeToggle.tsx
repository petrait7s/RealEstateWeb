"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";

export function ThemeToggle() {
  const t = useTranslations("theme");

  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.classList.add("theme-transition");
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setTimeout(() => root.classList.remove("theme-transition"), 600);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="border-border hover:border-accent hover:text-accent inline-flex size-10 items-center justify-center rounded-full border transition-colors"
    >
      <Sun className="hidden size-4 dark:block" aria-hidden />
      <Moon className="size-4 dark:hidden" aria-hidden />
      <span className="sr-only dark:hidden">{t("toDark")}</span>
      <span className="sr-only hidden dark:inline">{t("toLight")}</span>
    </button>
  );
}
