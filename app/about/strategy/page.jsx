import { InsightsHero } from "@/components/about/strategy/InsightsHero";
import { STRATEGY_DATA } from "@/components/about/strategy/strategy-data";
import { StrategyPillars } from "@/components/about/strategy/StrategyPillars";
import { StrategyRoadmap } from "@/components/about/strategy/StrategyRoadmap";

export default function StrategyPage() {
  const data = STRATEGY_DATA;

  return (
    <main className="min-h-screen bg-white">
      {/* Dynamic Hero with Strategy Content */}
      <InsightsHero data={data.hero} />
      
      {/* The 3 Pillars Section */}
      <StrategyPillars data={data.pillars} />
      
      {/* The Timeline Roadmap using Separators */}
      <StrategyRoadmap data={data.roadmap} />
    </main>
  );
}