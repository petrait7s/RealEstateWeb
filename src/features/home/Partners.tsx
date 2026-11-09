import { useTranslations } from "next-intl";
import { Marquee } from "@/components/animation/Marquee";

const partners = [
  "BRAC Bank",
  "City Bank",
  "Eastern Bank",
  "Dutch-Bangla Bank",
  "Prime Bank",
  "Islami Bank",
  "LankaBangla",
  "EBL",
];

export function Partners() {
  const t = useTranslations("partners");
  return (
    <section aria-label={t("title")} className="border-border border-y py-10">
      <Marquee
        items={partners.map((p) => (
          <span
            key={p}
            className="font-display text-muted/80 text-2xl whitespace-nowrap sm:text-3xl"
          >
            {p}
          </span>
        ))}
      />
    </section>
  );
}
