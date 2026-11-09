import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/layout/PageHero";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { Reveal } from "@/components/animation/Reveal";
import { projects } from "@/lib/mock/data";

export async function generateMetadata() {
  const t = await getTranslations("gallery");
  return { title: t("title") };
}

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("gallery");
  const tiles = Array.from({ length: 12 }, (_, i) => ({
    i,
    p: projects[i % projects.length]!,
    tall: [0, 3, 6, 9].includes(i),
  }));
  return (
    <>
      <PageHero title={t("title")} lead={t("lead")} />
      <section className="mx-auto max-w-[1600px] px-4 pb-32 sm:px-8">
        <ul className="grid auto-rows-[220px] grid-cols-2 gap-3 sm:auto-rows-[280px] md:grid-cols-3 lg:grid-cols-4">
          {tiles.map(({ i, p, tall }) => (
            <li key={i} className={tall ? "row-span-2" : ""}>
              <Reveal className="size-full">
                <div className="size-full overflow-hidden rounded-lg" data-cursor="view">
                  <div className="size-full transition-transform duration-[1200ms] hover:scale-105">
                    <PlaceholderImage hue={p.hue + i * 6} seed={i + 1} />
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
