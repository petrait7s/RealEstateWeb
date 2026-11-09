import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal, Stagger, RevealItem } from "@/components/animation/Reveal";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { teamMembers } from "@/lib/mock/data";
import { pick } from "@/lib/format";

export async function generateMetadata() {
  const t = await getTranslations("about");
  return { title: t("title") };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  return (
    <>
      <PageHero title={t("title")} lead={t("lead")} />
      <section className="mx-auto grid max-w-[1600px] gap-12 px-4 pb-24 sm:px-8 lg:grid-cols-2">
        <div className="aspect-[4/3] overflow-hidden rounded-xl">
          <PlaceholderImage hue={38} seed={7} label="Our office" />
        </div>
        <Reveal>
          <p className="text-muted text-[length:var(--text-lead)]">{t("body")}</p>
        </Reveal>
      </section>
      <section className="mx-auto max-w-[1600px] px-4 pb-24 sm:px-8">
        <h2 className="mb-10 text-[length:var(--text-h2)]">{t("values")}</h2>
        <Stagger className="border-border bg-border grid gap-px overflow-hidden rounded-xl border md:grid-cols-3">
          {(["v1", "v2", "v3"] as const).map((k) => (
            <RevealItem key={k} className="bg-background p-8">
              <h3 className="text-gold font-display text-3xl">{t(k)}</h3>
              <p className="text-muted mt-3">{t(`${k}b`)}</p>
            </RevealItem>
          ))}
        </Stagger>
      </section>
      <section className="mx-auto max-w-[1600px] px-4 pb-32 sm:px-8">
        <h2 className="mb-10 text-[length:var(--text-h2)]">{t("team")}</h2>
        <ul className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {teamMembers.map((m, i) => (
            <li key={m.name}>
              <div className="aspect-[3/4] overflow-hidden rounded-xl">
                <PlaceholderImage hue={30 + i * 40} seed={i + 2} />
              </div>
              <p className="font-display mt-4 text-xl">{m.name}</p>
              <p className="text-muted text-sm">{pick(m.role, locale)}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
