import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Box, Building2, Calendar, Check, Layers, Ruler, BedDouble } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { getProject, projects } from "@/lib/mock/data";
import { formatBDT, num, pick } from "@/lib/format";
import { siteDefaults } from "@/lib/site";
import { Reveal } from "@/components/animation/Reveal";
import { Parallax } from "@/components/animation/Parallax";
import { Badge } from "@/components/ui/badge";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { ProjectCard } from "@/features/projects/ProjectCard";
import { SubNav } from "@/features/project-detail/SubNav";
import { UnitsSection } from "@/features/project-detail/UnitsSection";
import { PlotsSection } from "@/features/project-detail/PlotsSection";
import { Tools } from "@/features/project-detail/Tools";
import { EnquiryForm } from "@/features/project-detail/EnquiryForm";

type Params = { locale: string; slug: string };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return { title: pick(p.name, locale), description: pick(p.tagline, locale) };
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-32 py-12 sm:py-20">
      <Reveal variant="mask">
        <h2 className="mb-8 text-[length:var(--text-h2)]">{title}</h2>
      </Reveal>
      {children}
    </section>
  );
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const p = getProject(slug);
  if (!p) notFound();
  const t = await getTranslations();
  const hasUnits = p.type === "flat" || p.type === "commercial";
  const hasPlots = p.type === "plot";
  const related = projects.filter((x) => x.slug !== p.slug).slice(0, 3);

  const nav = [
    { id: "overview", label: t("detail.overview") },
    { id: "showcase", label: t("detail.modelSoon").split(",")[0]! },
    ...(hasUnits ? [{ id: "units", label: t("detail.units") }] : []),
    ...(hasPlots ? [{ id: "plots", label: t("detail.plots") }] : []),
    { id: "tools", label: t("detail.tools") },
    { id: "amenities", label: t("detail.amenities") },
    { id: "enquire", label: t("detail.enquire") },
  ];

  const facts = [
    { icon: Building2, k: t("detail.type"), v: t(`type.${p.type}`) },
    {
      icon: Ruler,
      k: t("detail.size"),
      v: `${num(p.sizeFrom, locale)}–${num(p.sizeTo, locale)} ${hasPlots ? t("detail.katha") : t("detail.sqft")}`,
    },
    ...(p.floors ? [{ icon: Layers, k: t("detail.floors"), v: num(p.floors, locale) }] : []),
    ...(p.beds !== "—" ? [{ icon: BedDouble, k: t("detail.beds"), v: p.beds }] : []),
    { icon: Calendar, k: t("detail.handover"), v: p.handover },
  ];

  const ld = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: pick(p.name, locale),
    description: pick(p.tagline, locale),
    url: `${siteDefaults.url}/projects/${p.slug}`,
    offers: { "@type": "Offer", priceCurrency: "BDT", price: p.priceFrom },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="relative isolate flex min-h-[85dvh] items-end overflow-hidden text-[#f3eee3]">
        <Parallax className="absolute inset-0 -z-10" offset={60}>
          <PlaceholderImage hue={p.hue} seed={p.slug.length} label={pick(p.name, locale)} />
        </Parallax>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/10 to-black/40" />
        <div className="mx-auto w-full max-w-[1600px] px-4 pt-40 pb-14 sm:px-8">
          <Badge className="border-white/30 text-white">{t(`status.${p.status}`)}</Badge>
          <h1 className="mt-5 text-[length:var(--text-display)]">{pick(p.name, locale)}</h1>
          <p className="mt-4 text-[length:var(--text-lead)] opacity-80">
            {pick(p.location, locale)} — {pick(p.tagline, locale)}
          </p>
          <p className="mt-6 text-sm opacity-70">{t("detail.priceFrom")}</p>
          <p className="text-gold font-display text-4xl">{formatBDT(p.priceFrom, locale)}</p>
        </div>
      </section>

      <SubNav items={nav} />

      <div className="mx-auto grid max-w-[1600px] gap-12 px-4 sm:px-8 lg:grid-cols-[1fr_380px]">
        <div className="min-w-0">
          <Section id="overview" title={t("detail.keyFacts")}>
            <ul className="border-border bg-border grid grid-cols-2 gap-px overflow-hidden rounded-xl border md:grid-cols-3">
              {facts.map((f) => (
                <li key={f.k} className="bg-background p-5 sm:p-6">
                  <f.icon className="text-accent size-5" aria-hidden />
                  <p className="text-muted mt-3 text-xs tracking-wider uppercase">{f.k}</p>
                  <p className="font-display mt-1 text-2xl">{f.v}</p>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="showcase" title={t("detail.modelSoon")}>
            <div className="border-border bg-surface-2 relative grid aspect-[16/9] place-items-center overflow-hidden rounded-xl border p-6 text-center">
              <Box className="text-accent mx-auto size-10" aria-hidden />
              <p className="text-muted mt-4 max-w-md">{t("detail.modelSoonBody")}</p>
              <Badge variant="accent" className="mt-4">
                {t("detail.comingSoon")}
              </Badge>
            </div>
          </Section>

          {hasUnits && (
            <Section id="units" title={t("detail.units")}>
              <UnitsSection project={p} />
            </Section>
          )}
          {hasPlots && (
            <Section id="plots" title={t("detail.masterplan")}>
              <PlotsSection project={p} />
            </Section>
          )}
          <Section id="tools" title={t("detail.tools")}>
            <Tools defaultPrice={p.priceFrom} />
          </Section>

          <Section id="amenities" title={t("detail.amenities")}>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {p.amenities.map((a) => (
                <li
                  key={a}
                  className="border-border bg-surface flex items-center gap-3 rounded-lg border px-4 py-3"
                >
                  <Check className="text-accent size-4" aria-hidden /> {t(`amenity.${a}`)}
                </li>
              ))}
            </ul>
          </Section>
        </div>

        <aside id="enquire" className="scroll-mt-32 py-12 lg:py-20">
          <div className="border-border bg-surface shadow-soft sticky top-36 rounded-xl border p-6">
            <h2 className="font-display text-3xl">{t("detail.enquire")}</h2>
            <p className="text-muted mt-1 mb-6 text-sm">{pick(p.name, locale)}</p>
            <EnquiryForm compact context={p.slug} />
          </div>
        </aside>
      </div>

      <section className="mx-auto max-w-[1600px] px-4 py-20 sm:px-8 sm:py-32">
        <h2 className="mb-10 text-[length:var(--text-h2)]">{t("detail.related")}</h2>
        <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {related.map((r) => (
            <li key={r.slug}>
              <ProjectCard p={r} />
            </li>
          ))}
        </ul>
        <Link href="/projects" className="sr-only">
          {t("nav.projects")}
        </Link>
      </section>
    </>
  );
}
