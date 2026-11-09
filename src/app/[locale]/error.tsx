"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("errors");
  return (
    <section className="flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center">
      <p className="text-gold font-display text-[clamp(6rem,20vw,16rem)] leading-none">500</p>
      <h1 className="font-display mt-4 text-4xl">{t("errorTitle")}</h1>
      <p className="text-muted mt-4 max-w-md">{t("errorBody")}</p>
      <Button size="lg" className="mt-10" onClick={reset}>
        {t("retry")}
      </Button>
    </section>
  );
}
