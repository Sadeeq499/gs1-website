import { BASE_URL } from "@/lib/seo";
import { InsightsHero } from "@/components/about/strategy/InsightsHero";
import { STRATEGY_DATA } from "@/components/about/strategy/strategy-data";
import { StrategyPillars } from "@/components/about/strategy/StrategyPillars";
import { StrategyRoadmap } from "@/components/about/strategy/StrategyRoadmap";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "about.strategy.metadata",
  });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${BASE_URL}/${locale}/about/strategy`,
      languages: {
        en: `${BASE_URL}/en/about/strategy`,
        ar: `${BASE_URL}/ar/about/strategy`,
        "x-default": `${BASE_URL}/en/about/strategy`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${BASE_URL}/${locale}/about/strategy`,
      locale: locale === "ar" ? "ar_SA" : "en_SA",
      alternateLocale: locale === "ar" ? ["en_SA"] : ["ar_SA"],
    },
  };
}

export default async function StrategyPage() {
  const t = await getTranslations("about.strategy");

  const localizedData = {
    ...STRATEGY_DATA,
    hero: {
      ...STRATEGY_DATA.hero,
      badge: t("hero.badge"),
      title: t("hero.title"),
      titleHighlight: t("hero.titleHighlight"),
      titleSuffix: t("hero.titleSuffix"),
      description: t("hero.description"),
      stats: STRATEGY_DATA.hero.stats.map((stat, i) => ({
        ...stat,
        value: t(`hero.stats.${i}.value`),
        label: t(`hero.stats.${i}.label`),
      })),
    },
    pillars: {
      ...STRATEGY_DATA.pillars,
      title: t("pillars.title"),
      highlight: t("pillars.highlight"),
      items: STRATEGY_DATA.pillars.items.map((item, i) => ({
        ...item,
        title: t(`pillars.items.${i}.title`),
        desc: t(`pillars.items.${i}.desc`),
      })),
    },
    roadmap: {
      ...STRATEGY_DATA.roadmap,
      title: t("roadmap.title"),
      steps: STRATEGY_DATA.roadmap.steps.map((step, i) => ({
        ...step,
        year: t(`roadmap.steps.${i}.year`),
        task: t(`roadmap.steps.${i}.task`),
      })),
    },
  };

  return (
    <main className="min-h-screen bg-white">
      <InsightsHero data={localizedData.hero} />
      <StrategyPillars data={localizedData.pillars} />
      <StrategyRoadmap data={localizedData.roadmap} />
    </main>
  );
}
