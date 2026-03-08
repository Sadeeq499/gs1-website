import { InsightsHero } from "@/components/training/InsightsHero";
import { TRAINING_DATA } from "@/components/training/training-data";
import { TrainingAbout } from "@/components/training/TrainingAbout";
import { TrainingFeatures } from "@/components/training/TrainingFeatures";
import { TrainingGrid } from "@/components/training/TrainingGrid";


export const metadata = {
  title: TRAINING_DATA.metadata.title,
  description: TRAINING_DATA.metadata.description,
};

export default function TrainingPage() {
  return (
    <main className="min-h-screen bg-white">
      <InsightsHero data={TRAINING_DATA.hero} />
      
      <TrainingAbout data={TRAINING_DATA.about} />
      
      <TrainingGrid data={TRAINING_DATA.programs} />
      
      <TrainingFeatures data={TRAINING_DATA.features} />
    </main>
  );
}