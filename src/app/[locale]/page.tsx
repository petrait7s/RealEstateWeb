import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/features/home/Hero";
import { Stats } from "@/features/home/Stats";
import { Partners } from "@/features/home/Partners";
import { CtaBand } from "@/features/home/CtaBand";
import { FeaturedCarousel } from "@/features/home/FeaturedCarousel";
import { PortfolioTabs } from "@/features/home/PortfolioTabs";
import { TourTeaser } from "@/features/home/TourTeaser";
import { Testimonials } from "@/features/home/Testimonials";
import { NewsPreview } from "@/features/home/NewsPreview";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <Partners />
      <FeaturedCarousel />
      <Stats />
      <PortfolioTabs />
      <TourTeaser />
      <Testimonials />
      <NewsPreview />
      <CtaBand />
    </>
  );
}
