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

  const localizedData = {
    ...PARTNERS_DATA,
    hero: {
      ...PARTNERS_DATA.hero,
      badge: t("hero.badge"),
      title: t("hero.title"),
      titleHighlight: t("hero.titleHighlight"),
      titleSuffix: t("hero.titleSuffix"),
      description: t("hero.description"),
      ctaText: t("hero.ctaText"),
    },
    regulatory: PARTNERS_DATA.regulatory.map((item, i) => ({
      ...item,
      title: t(`regulatory.${i}.title`),
      sub: t(`regulatory.${i}.sub`),
      desc: t(`regulatory.${i}.desc`),
    })),
    providers: {
      ...PARTNERS_DATA.providers,
      badge: t("providers.badge"),
      title: t("providers.title"),
      titleHighlight: t("providers.titleHighlight"),
      exploreText: t("providers.exploreText"),
      detailsText: t("providers.detailsText"),
      impactLabel: t("providers.impactLabel"),
      list: PARTNERS_DATA.providers.list.map((item, i) => ({
        ...item,
        name: t(`providers.list.${i}.name`),
        full: t(`providers.list.${i}.full`),
        type: t(`providers.list.${i}.type`),
        desc: t(`providers.list.${i}.desc`),
        impact: t(`providers.list.${i}.impact`),
      })),
    },
    marketplace: {
      ...PARTNERS_DATA.marketplace,
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
    },
    cta: {
      ...PARTNERS_DATA.cta,
      title: t("cta.title"),
      description: t("cta.description"),
      primaryBtn: t("cta.primaryBtn"),
      secondaryBtn: t("cta.secondaryBtn"),
    },
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-background overflow-x-hidden">
      <PartnerHero data={localizedData.hero} />
      <RegulatoryGrid data={localizedData.regulatory} />
      <ProviderShowcase data={localizedData.providers} />
      <MarketplaceSync data={localizedData.marketplace} />
      {/* <PartnerCTA data={localizedData.cta} /> */}
    </div>
  );
}
