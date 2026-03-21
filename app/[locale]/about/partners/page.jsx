import { MarketplaceSync } from "@/components/about/partners/MarketplaceSync";
import { PartnerCTA } from "@/components/about/partners/PartnerCTA";
import { PartnerHero } from "@/components/about/partners/PartnerHero";
import { PARTNERS_DATA } from "@/components/about/partners/partners-data";
import { ProviderShowcase } from "@/components/about/partners/ProviderShowcase";
import { RegulatoryGrid } from "@/components/about/partners/RegulatoryGrid";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "about.partners.metadata",
  });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function PartnersPage() {
  const t = await getTranslations("about.partners");

  // 1. Hero Data
  const heroData = {
    badge: t("hero.badge"),
    title: t("hero.title"),
    titleHighlight: t("hero.titleHighlight"),
    titleSuffix: t("hero.titleSuffix"),
    description: t("hero.description"),
    ctaText: t("hero.ctaText")
  };

  // 2. Regulatory Array
  const regulatoryData = t.raw("regulatory");

  // 3. Provider Slider Data
  const providersData = {
    badge: t("providers.badge"),
    title: t("providers.title"),
    titleHighlight: t("providers.titleHighlight"),
    description: t("providers.description"),
    // visualNote: t("providers.visualNote"),
    list: t.raw("providers.list") 
  };

  // 4. Marketplace Data
  const marketplaceData = {
    badge: t("marketplace.badge"),
      title: t("marketplace.title"),
      titleHighlight: t("marketplace.titleHighlight"),
      description: t("marketplace.description"),
      features: PARTNERS_DATA.marketplace.features.map((feature, i) =>
        t(`marketplace.features.${i}`),
      ),
      ctaPrimary: t("marketplace.ctaPrimary"),
      ctaSecondary: t("marketplace.ctaSecondary"),
      platforms: PARTNERS_DATA.marketplace.platforms.map((platform, i) => ({
        ...platform,
        name: t(`marketplace.platforms.${i}.name`),
        label: t(`marketplace.platforms.${i}.label`),
        description: t(`marketplace.platforms.${i}.description`),
      })),
  };
  

  // 5. Final CTA Data
  const ctaData = {
    title: t("cta.title"),
    description: t("cta.description"),
    primaryBtn: t("cta.primaryBtn"),
    secondaryBtn: t("cta.secondaryBtn")
  };

  return (
    <main className="flex flex-col w-full min-h-screen bg-background">
      {/* Hero Section */}
      <PartnerHero data={heroData} />

      {/* Authority Grid (SFDA, ZATCA, SASO) */}
      <RegulatoryGrid data={regulatoryData} />


      {/* Smart Focus Logo Slider */}
      <ProviderShowcase data={providersData} />
      
      {/* Digital Marketplaces Section */}
      <MarketplaceSync data={marketplaceData} />
      
      {/* Bottom Conversion Section */}
      {/* <PartnerCTA data={ctaData} /> */}

      <div className="h-20" />
    </main>
  );
}
