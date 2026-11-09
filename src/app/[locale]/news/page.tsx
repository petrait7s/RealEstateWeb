import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/layout/PageHero";
import { PostCard } from "@/features/home/NewsPreview";
import { posts } from "@/lib/mock/data";

export async function generateMetadata() {
  const t = await getTranslations("newsPage");
  return { title: t("title") };
}

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("newsPage");
  return (
    <>
      <PageHero title={t("title")} lead={t("lead")} />
      <section className="mx-auto max-w-[1600px] px-4 pb-32 sm:px-8">
        <ul className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug}>
              <PostCard post={p} locale={locale} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
