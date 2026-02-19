import { AboutHero } from "@/components/about/who-we-are/AboutHero";
import { CompanyIdentity } from "@/components/about/who-we-are/CompanyIdentity";
import { GovernanceSection } from "@/components/about/who-we-are/GovernanceSection";
import { MissionVisionGrid } from "@/components/about/who-we-are/MissionVisionGrid";
import { StrategicPartners } from "@/components/about/who-we-are/StrategicPartners";
import { WHO_WE_ARE_DATA } from "@/components/about/who-we-are/who-we-are-data";


export default function WhoWeArePage() {
  const data = WHO_WE_ARE_DATA;

  return (
    <main className="min-h-screen bg-white">
      <AboutHero data={data.hero} />
      
      <CompanyIdentity data={data.about} />
      
      <MissionVisionGrid data={data.missionVision} />
      
      <GovernanceSection data={data.governance} />
      
      <StrategicPartners data={data.partners} />
    </main>
  );
}