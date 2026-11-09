import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("errors");
  return (
    <section className="flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center">
      <p className="text-gold font-display text-[clamp(6rem,20vw,16rem)] leading-none">404</p>
      <h1 className="font-display mt-4 text-4xl">{t("notFoundTitle")}</h1>
      <p className="text-muted mt-4 max-w-md">{t("notFoundBody")}</p>
      <Link href="/" className={buttonVariants({ size: "lg", className: "mt-10" })}>
        {t("backHome")}
      </Link>
    </section>
  );
}
