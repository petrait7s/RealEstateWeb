import { Box, Orbit, ScanEye } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/animation/Reveal";
import { Parallax } from "@/components/animation/Parallax";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { buttonVariants } from "@/components/ui/button";

export function TourTeaser() {
  const t = useTranslations("home");
  return (
    <section className="relative isolate overflow-hidden bg-[#0e0d0a] py-28 text-[#f3eee3] sm:py-44">
      <Parallax className="absolute inset-0 -z-10 opacity-40" offset={90}>
        <PlaceholderImage hue={215} seed={4} />
      </Parallax>
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8">
        <Reveal variant="mask">
          <h2 className="max-w-4xl text-[length:var(--text-h1)]">{t("tourTitle")}</h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-xl text-[length:var(--text-lead)] opacity-75">{t("tourBody")}</p>
        </Reveal>
        <ul className="mt-12 flex flex-wrap gap-4" aria-hidden>
          {[Box, ScanEye, Orbit].map((I, i) => (
            <li
              key={i}
              className="glass inline-flex size-16 items-center justify-center rounded-full text-[#f3eee3]"
            >
              <I className="size-6" />
            </li>
          ))}
        </ul>
        <Link
          href="/projects/the-meridian#showcase"
          data-cursor="explore"
          className={buttonVariants({ size: "lg", className: "mt-12" })}
        >
          {t("tourCta")}
        </Link>
      </div>
    </section>
  );
}
