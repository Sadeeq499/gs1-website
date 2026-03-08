import { InsightsHero } from "@/components/training/InsightsHero";
import { TRAINING_DATA } from "@/components/training/training-data";
import { TrainingAbout } from "@/components/training/TrainingAbout";
import { TrainingFeatures } from "@/components/training/TrainingFeatures";
import { TrainingGrid } from "@/components/training/TrainingGrid";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "training.metadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function TrainingPage() {
  const t = await getTranslations("training");

  const localizedData = {
    ...TRAINING_DATA,
    hero: {
      ...TRAINING_DATA.hero,
      badge: t("hero.badge"),
      title: t("hero.title"),
      titleHighlight: t("hero.titleHighlight"),
      titleSuffix: t("hero.titleSuffix"),
      description: t("hero.description"),
      stats: TRAINING_DATA.hero.stats.map((stat, i) => ({
        ...stat,
        value: t(`hero.stats.${i}.value`),
        label: t(`hero.stats.${i}.label`),
      })),
    },
    about: {
      ...TRAINING_DATA.about,
      badge: t("about.badge"),
      title: t("about.title"),
      subtitle: t("about.subtitle"),
      description: t("about.description"),
      buttonText: t("about.buttonText"),
    },
    features: {
      ...TRAINING_DATA.features,
      heading: t("features.heading"),
      items: TRAINING_DATA.features.items.map((item, i) => ({
        ...item,
        title: t(`features.items.${i}.title`),
        desc: t(`features.items.${i}.desc`),
      })),
    },
    programs: {
      ...TRAINING_DATA.programs,
      heading: t("programs.heading"),
      items: TRAINING_DATA.programs.items.map((item, i) => ({
        ...item,
        title: t(`programs.items.${i}.title`),
        desc: t(`programs.items.${i}.desc`),
        btnText: t(`programs.items.${i}.btnText`),
      })),
    },
  };

  return (
    <main className="min-h-screen bg-white">
      <InsightsHero data={localizedData.hero} />

      <TrainingAbout data={localizedData.about} />

      <TrainingGrid data={localizedData.programs} />

      <TrainingFeatures data={localizedData.features} />
    </main>
  );
}
