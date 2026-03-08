import { InsightsHero } from "@/components/about/mission-vision/InsightsHero";
import { MISSION_VISION_DATA } from "@/components/about/mission-vision/mission-vision-data";
import { MissionSection } from "@/components/about/mission-vision/MissionSection";
import { ValuesGrid } from "@/components/about/mission-vision/ValuesGrid";
import { VisionSection } from "@/components/about/mission-vision/VisionSection";

export const metadata = {
  title: MISSION_VISION_DATA.metadata.title,
  description: MISSION_VISION_DATA.metadata.description,
};

export default function MissionVisionPage() {
  const data = MISSION_VISION_DATA;

  return (
    <main className="min-h-screen bg-white">
      {/* Reusing existing Hero for brand consistency */}
      <InsightsHero data={data.hero} />
      
      {/* Cinematic Vision Display */}
      <VisionSection data={data.vision} />
      
      {/* Dynamic Mission Breakdown */}
      <MissionSection data={data.mission} />
      
      {/* Core Values with High-End UI */}
      <ValuesGrid data={data.values} />
    </main>
  );
}