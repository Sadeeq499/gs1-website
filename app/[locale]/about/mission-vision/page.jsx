import { InsightsHero } from "@/components/about/mission-vision/InsightsHero";
import { MISSION_VISION_DATA } from "@/components/about/mission-vision/mission-vision-data";
import { MissionSection } from "@/components/about/mission-vision/MissionSection";
import { ValuesGrid } from "@/components/about/mission-vision/ValuesGrid";
import { VisionSection } from "@/components/about/mission-vision/VisionSection";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "about.missionVision.metadata",
  });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function MissionVisionPage() {
  const t = await getTranslations("about.missionVision");

  const localizedData = {
    ...MISSION_VISION_DATA,
    hero: {
      ...MISSION_VISION_DATA.hero,
      badge: t("hero.badge"),
      title: t("hero.title"),
      titleHighlight: t("hero.titleHighlight"),
      titleSuffix: t("hero.titleSuffix"),
      description: t("hero.description"),
      stats: MISSION_VISION_DATA.hero.stats.map((stat, i) => ({
        ...stat,
        value: t(`hero.stats.${i}.value`),
        label: t(`hero.stats.${i}.label`),
      })),
    },
    dividerLabel: t("dividerLabel"),
    vision: {
      ...MISSION_VISION_DATA.vision,
      tag: t("vision.tag"),
      title: t("vision.title"),
      titleHighlight: t("vision.titleHighlight"),
      description: t("vision.description"),
    },
    mission: {
      ...MISSION_VISION_DATA.mission,
      tag: t("mission.tag"),
      title: t("mission.title"),
      titleHighlight: t("mission.titleHighlight"),
      description: t("mission.description"),
      points: MISSION_VISION_DATA.mission.points.map((point, i) => ({
        ...point,
        title: t(`mission.points.${i}.title`),
        desc: t(`mission.points.${i}.desc`),
      })),
    },
    values: {
      ...MISSION_VISION_DATA.values,
      heading: t("values.heading"),
      highlight: t("values.highlight"),
      items: MISSION_VISION_DATA.values.items.map((item, i) => ({
        ...item,
        title: t(`values.items.${i}.title`),
        desc: t(`values.items.${i}.desc`),
      })),
    },
  };

  return (
    <main className="min-h-screen bg-white">
      <InsightsHero data={localizedData.hero} />
      <VisionSection data={localizedData.vision} />
      <MissionSection data={localizedData.mission} />
      <ValuesGrid data={localizedData.values} />
    </main>
  );
}
