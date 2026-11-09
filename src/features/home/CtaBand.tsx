import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/animation/Reveal";
import { Magnetic } from "@/components/animation/MagneticButton";
import { buttonVariants } from "@/components/ui/button";

export function CtaBand() {
  const t = useTranslations("cta");
  return (
    <section className="px-4 pb-24 sm:px-8 sm:pb-36">
      <div className="bg-gold text-accent-foreground relative mx-auto max-w-[1600px] overflow-hidden rounded-3xl px-6 py-20 sm:px-16 sm:py-28">
        <Reveal variant="mask">
          <h2 className="max-w-4xl text-[length:var(--text-h1)]">{t("title")}</h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-xl text-[length:var(--text-lead)] opacity-80">{t("body")}</p>
          <Magnetic className="mt-10">
            <Link href="/contact" className={buttonVariants({ variant: "dark", size: "lg" })}>
              {t("button")}
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
