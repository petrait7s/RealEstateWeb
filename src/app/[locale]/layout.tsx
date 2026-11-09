import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { siteDefaults } from "@/lib/site";
import { SmoothScroll } from "@/components/animation/SmoothScroll";
import { Cursor } from "@/components/animation/Cursor";
import { Preloader } from "@/components/animation/Preloader";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeScript } from "@/components/layout/ThemeScript";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  return {
    metadataBase: new URL(siteDefaults.url),
    title: { default: siteDefaults.name, template: `%s · ${siteDefaults.name}` },
    description: t("subtitle"),
    openGraph: {
      siteName: siteDefaults.name,
      type: "website",
      locale: locale === "bn" ? "bn_BD" : "en_US",
    },
    alternates: { languages: { en: "/", bn: "/bn" } },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f3ec" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0d0a" },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="grain">
        <NextIntlClientProvider>
          <SmoothScroll>
            <Preloader name={siteDefaults.name} />
            <Cursor />
            <Navbar brand={siteDefaults.name} />
            <main id="main">{children}</main>
            <Footer site={siteDefaults} />
            <WhatsAppButton number={siteDefaults.whatsapp} />
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
