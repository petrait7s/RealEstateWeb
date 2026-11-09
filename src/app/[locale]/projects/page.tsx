import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/layout/PageHero";
import { ProjectsExplorer } from "@/features/projects/ProjectsExplorer";
import { ProjectCardSkeleton } from "@/features/projects/ProjectCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("projects");
  return (
    <>
      <PageHero title={t("title")} lead={t("subtitle")} />
      <section className="mx-auto max-w-[1600px] px-4 pb-24 sm:px-8 sm:pb-36">
        <Suspense
          fallback={
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <ProjectCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <ProjectsExplorer />
        </Suspense>
      </section>
    </>
  );
}
