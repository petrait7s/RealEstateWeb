"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LocaleToggle() {
  const locale = useLocale();
  const t = useTranslations("locale");
  const pathname = usePathname();
  const router = useRouter();
  const next = locale === "en" ? "bn" : "en";
  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: next })}
      className="border-border hover:border-accent hover:text-accent inline-flex h-10 items-center rounded-full border px-4 text-sm transition-colors"
      lang={next}
    >
      {t("switch")}
    </button>
  );
}
