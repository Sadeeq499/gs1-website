import { INSIGHTS_DATA } from "@/components/insights/insights-data";
import { InsightsHero } from "@/components/insights/InsightsHero";
import { NewsGrid } from "@/components/insights/NewsGrid";
import NewsInsights from "@/components/insights/NewsInsights";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "insights.metadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function Page() {
  const t = await getTranslations("insights");

  const localizedData = {
    ...INSIGHTS_DATA,
    hero: {
      badge: t("hero.badge"),
      title: t("hero.title"),
      titleHighlight: t("hero.titleHighlight"),
      titleSuffix: t("hero.titleSuffix"),
      description: t("hero.description"),
    },
    spotlight: {
      header: {
        badge: t("spotlight.badge"),
        title: t("spotlight.title"),
        highlight: t("spotlight.highlight"),
        description: t("spotlight.description"),
      },
      items: INSIGHTS_DATA.spotlightCards.items.map((item, i) => ({
        ...item,
        tag: t(`spotlight.items.${i}.tag`),
        title: t(`spotlight.items.${i}.title`),
        desc: t(`spotlight.items.${i}.desc`),
        readTime: t(`spotlight.items.${i}.readTime`),
      })),
    },
    newsGrid: {
      heading: t("newsGrid.heading"),
      items: INSIGHTS_DATA.news.map((item, i) => ({
        ...item,
        category: t(`newsGrid.items.${i}.category`),
        title: t(`newsGrid.items.${i}.title`),
        excerpt: t(`newsGrid.items.${i}.excerpt`),
      })),
    },
    whySection: {
      title: t("whySection.title"),
      description: t("whySection.description"),
    },
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Refactored Hero without slider */}
      <InsightsHero data={localizedData.hero} />

      <NewsInsights data={localizedData.spotlight} />

      <NewsGrid data={localizedData.newsGrid} />

      {/* Localized Why GS1 SA? Section */}
      <section className="container mx-auto px-4 py-32 border-t border-slate-100">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary">
            {localizedData.whySection.title}
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
            {localizedData.whySection.description}
          </p>
        </div>
      </section>
    </main>
  );
}
