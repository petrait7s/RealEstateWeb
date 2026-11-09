import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/layout/PageHero";
import { EnquiryForm } from "@/features/project-detail/EnquiryForm";
import { siteDefaults } from "@/lib/site";

export async function generateMetadata() {
  const t = await getTranslations("contact");
  return { title: t("title") };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const rows = [
    { I: MapPin, k: t("address"), v: siteDefaults.address },
    {
      I: Phone,
      k: "Phone",
      v: siteDefaults.phone,
      href: `tel:${siteDefaults.phone.replace(/[\s-]/g, "")}`,
    },
    { I: Mail, k: "Email", v: siteDefaults.email, href: `mailto:${siteDefaults.email}` },
    { I: Clock, k: t("hours"), v: t("hoursValue") },
  ];
  return (
    <>
      <PageHero title={t("title")} lead={t("lead")} />
      <section className="mx-auto grid max-w-[1600px] gap-12 px-4 pb-32 sm:px-8 lg:grid-cols-2">
        <div>
          <ul className="space-y-6">
            {rows.map(({ I, k, v, href }) => (
              <li key={k} className="flex gap-4">
                <I className="text-accent mt-1 size-5 shrink-0" aria-hidden />
                <div>
                  <p className="text-muted text-xs tracking-widest uppercase">{k}</p>
                  {href ? (
                    <a href={href} className="hover:text-accent">
                      {v}
                    </a>
                  ) : (
                    <p>{v}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <div
            className="border-border bg-surface-2 relative mt-10 aspect-[4/3] overflow-hidden rounded-xl border"
            role="img"
            aria-label="Map"
          >
            <svg
              viewBox="0 0 100 75"
              className="text-border size-full"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d="M0 50 C 25 40, 40 62, 65 48 S 90 30, 100 36"
                fill="none"
                stroke="var(--info)"
                strokeOpacity=".35"
                strokeWidth="3"
              />
              <path
                d="M20 0 L45 75 M0 25 L100 42 M75 0 L60 75"
                stroke="currentColor"
                strokeWidth=".6"
                fill="none"
              />
            </svg>
            <MapPin
              className="fill-accent text-accent-foreground absolute top-[42%] left-[55%] size-9 -translate-x-1/2 -translate-y-full"
              aria-hidden
            />
          </div>
        </div>
        <div className="border-border bg-surface rounded-xl border p-6 sm:p-10">
          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
