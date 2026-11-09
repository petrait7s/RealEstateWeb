import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { posts } from "@/lib/mock/data";
import { pick } from "@/lib/format";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { Reveal } from "@/components/animation/Reveal";

export function PostCard({ post, locale }: { post: (typeof posts)[number]; locale: string }) {
  const date = new Intl.DateTimeFormat(locale === "bn" ? "bn-BD" : "en-GB", {
    dateStyle: "medium",
  }).format(new Date(post.date));
  return (
    <Link href={`/news#${post.slug}`} data-cursor="view" className="group block" id={post.slug}>
      <div className="aspect-[16/10] overflow-hidden rounded-xl">
        <div className="size-full transition-transform duration-[1200ms] ease-[var(--ease-premium)] group-hover:scale-105">
          <PlaceholderImage hue={post.hue} seed={post.slug.length} />
        </div>
      </div>
      <time
        dateTime={post.date}
        className="text-muted mt-4 block text-xs tracking-widest uppercase"
      >
        {date}
      </time>
      <h3 className="font-display group-hover:text-accent mt-2 text-2xl">
        {pick(post.title, locale)}
      </h3>
      <p className="text-muted mt-2">{pick(post.excerpt, locale)}</p>
    </Link>
  );
}

export function NewsPreview() {
  const t = useTranslations("home");
  const locale = useLocale();
  return (
    <section className="mx-auto max-w-[1600px] px-4 pb-24 sm:px-8 sm:pb-36">
      <div className="flex items-end justify-between">
        <Reveal variant="mask">
          <h2 className="text-[length:var(--text-h1)]">{t("news")}</h2>
        </Reveal>
        <Link href="/news" className="hover:text-accent text-sm underline-offset-4 hover:underline">
          {t("viewAll")}
        </Link>
      </div>
      <ul className="mt-12 grid gap-8 md:grid-cols-3">
        {posts.map((p) => (
          <li key={p.slug}>
            <Reveal>
              <PostCard post={p} locale={locale} />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
