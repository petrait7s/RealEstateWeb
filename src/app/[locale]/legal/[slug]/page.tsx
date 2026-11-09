import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/layout/PageHero";

const slugs = ["privacy", "terms"] as const;

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  if (!slugs.includes(slug as (typeof slugs)[number])) notFound();
  const t = await getTranslations("legal");
  return (
    <>
      <PageHero title={t(slug as (typeof slugs)[number])} />
      <section className="mx-auto max-w-3xl px-4 pb-32 sm:px-8">
        <p className="text-muted">{t("body")}</p>
      </section>
    </>
  );
}
