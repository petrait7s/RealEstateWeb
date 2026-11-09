import { useLocale, useTranslations } from "next-intl";
import { Counter } from "@/components/animation/Counter";
import { Reveal, Stagger, RevealItem } from "@/components/animation/Reveal";

const stats = [
  { key: "projects", to: 42, suffix: "+" },
  { key: "families", to: 3800, suffix: "+" },
  { key: "sqft", to: 5200000, suffix: "" },
  { key: "years", to: 18, suffix: "" },
] as const;

export function Stats() {
  const t = useTranslations("stats");
  const locale = useLocale();
  return (
    <section className="mx-auto max-w-[1600px] px-4 py-24 sm:px-8 sm:py-36">
      <Reveal variant="mask">
        <h2 className="max-w-3xl text-[length:var(--text-h1)]">{t("title")}</h2>
      </Reveal>
      <Stagger className="border-border bg-border mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl border lg:grid-cols-4">
        {stats.map((s) => (
          <RevealItem key={s.key} className="bg-background p-6 sm:p-10">
            <p className="text-gold font-display text-[length:var(--text-h1)] leading-none">
              <Counter to={s.to} suffix={s.suffix} locale={locale} />
            </p>
            <p className="text-muted mt-4 text-sm tracking-wide">{t(s.key)}</p>
          </RevealItem>
        ))}
      </Stagger>
    </section>
  );
}
