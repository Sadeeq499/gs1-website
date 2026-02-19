import { MarketplaceSync } from "@/components/about/partners/MarketplaceSync";
import { PartnerCTA } from "@/components/about/partners/PartnerCTA";
import { PartnerHero } from "@/components/about/partners/PartnerHero";
import { PARTNERS_DATA } from "@/components/about/partners/partners-data";
import { ProviderShowcase } from "@/components/about/partners/ProviderShowcase";
import { RegulatoryGrid } from "@/components/about/partners/RegulatoryGrid";

export const metadata = {
  title: PARTNERS_DATA.metadata.title,
  description: PARTNERS_DATA.metadata.description,
};

export default function PartnersPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background overflow-x-hidden">
      <PartnerHero />
      <RegulatoryGrid />
      <ProviderShowcase />
      <MarketplaceSync />
      <PartnerCTA />
    </div>
  );
}