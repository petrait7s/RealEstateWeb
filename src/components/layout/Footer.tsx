import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { SiteSettings } from "@/lib/site";

export function Footer({ site }: { site: SiteSettings }) {
  const t = useTranslations("footer");
  const n = useTranslations("nav");
  const b = useTranslations("brand");
  return (
    <footer className="border-border bg-surface-2/50 border-t">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-4 py-16 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-3xl">{site.name}</p>
          <p className="text-muted mt-4 max-w-sm">{b("tagline")}</p>
        </div>
        <div>
          <h2 className="text-muted text-xs font-medium tracking-widest uppercase">
            {t("explore")}
          </h2>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/projects" className="hover:text-accent">
                {n("projects")}
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-accent">
                {n("about")}
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-accent">
                {n("gallery")}
              </Link>
            </li>
            <li>
              <Link href="/news" className="hover:text-accent">
                {n("news")}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-muted text-xs font-medium tracking-widest uppercase">
            {t("contact")}
          </h2>
          <address className="mt-4 space-y-2 not-italic">
            <p>{site.address}</p>
            <p>
              <a href={`tel:${site.phone.replace(/\s|-/g, "")}`} className="hover:text-accent">
                {site.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${site.email}`} className="hover:text-accent">
                {site.email}
              </a>
            </p>
          </address>
        </div>
      </div>
      <div className="border-border border-t">
        <div className="text-muted mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-4 py-6 text-sm sm:px-8">
          <p>
            © {new Date().getFullYear()} {site.name}. {t("rights")}
          </p>
          <p className="flex gap-6">
            <Link href="/legal/privacy" className="hover:text-accent">
              {t("privacy")}
            </Link>
            <Link href="/legal/terms" className="hover:text-accent">
              {t("terms")}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
