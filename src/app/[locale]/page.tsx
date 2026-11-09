import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/features/home/Hero";
import { Stats } from "@/features/home/Stats";
import { Partners } from "@/features/home/Partners";
import { CtaBand } from "@/features/home/CtaBand";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <Partners />
      <Stats />
      <CtaBand />
    </>
  );
}
