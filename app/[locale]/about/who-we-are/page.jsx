import { BASE_URL } from "@/lib/seo";
import { AboutHero } from "@/components/about/who-we-are/AboutHero";
import { CompanyIdentity } from "@/components/about/who-we-are/CompanyIdentity";
import { GovernanceSection } from "@/components/about/who-we-are/GovernanceSection";
import { MissionVisionGrid } from "@/components/about/who-we-are/MissionVisionGrid";
import { StrategicPartners } from "@/components/about/who-we-are/StrategicPartners";
import { WHO_WE_ARE_DATA } from "@/components/about/who-we-are/who-we-are-data";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "about.whoWeAre.metadata",
  });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${BASE_URL}/${locale}/about/who-we-are`,
      languages: {
        en: `${BASE_URL}/en/about/who-we-are`,
        ar: `${BASE_URL}/ar/about/who-we-are`,
        "x-default": `${BASE_URL}/en/about/who-we-are`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${BASE_URL}/${locale}/about/who-we-are`,
      locale: locale === "ar" ? "ar_SA" : "en_SA",
      alternateLocale: locale === "ar" ? ["en_SA"] : ["ar_SA"],
    },
  };
}

export default async function WhoWeArePage() {
  const t = await getTranslations("about.whoWeAre");

  const localizedData = {
    ...WHO_WE_ARE_DATA,
    hero: {
      ...WHO_WE_ARE_DATA.hero,
      badge: t("hero.badge"),
      title: t("hero.title"),
      titleHighlight: t("hero.titleHighlight"),
      titleSuffix: t("hero.titleSuffix"),
      description: t("hero.description"),
      stats: WHO_WE_ARE_DATA.hero.stats.map((stat, i) => ({
        ...stat,
        value: t(`hero.stats.${i}.value`),
        label: t(`hero.stats.${i}.label`),
      })),
    },
    about: {
      ...WHO_WE_ARE_DATA.about,
      badge: t("about.badge"),
      title: t("about.title"),
      titleHighlight: t("about.titleHighlight"),
      description: t("about.description"),
      buttonText: t("about.buttonText"),
    },
    missionVision: WHO_WE_ARE_DATA.missionVision.map((item, i) => ({
      ...item,
      title: t(`missionVision.${i}.title`),
      desc: t(`missionVision.${i}.desc`),
    })),
    governance: {
      ...WHO_WE_ARE_DATA.governance,
      title: t("governance.title"),
      titleHighlight: t("governance.titleHighlight"),
      desc: t("governance.desc"),
      members: WHO_WE_ARE_DATA.governance.members.map((member, i) => ({
        ...member,
        name: t(`governance.members.${i}.name`),
        role: t(`governance.members.${i}.role`),
        org: t(`governance.members.${i}.org`),
      })),
    },
    partners: {
      ...WHO_WE_ARE_DATA.partners,
      title: t("partners.title"),
      subtitle: t("partners.subtitle"),
      logos: WHO_WE_ARE_DATA.partners.logos.map((logo, i) => ({
        ...logo,
        name: t(`partners.logos.${i}.name`),
        link: t(`partners.logos.${i}.link`),
      })),
    },
  };

  return (
    <main className="min-h-screen bg-white">
      <AboutHero data={localizedData.hero} />
      <CompanyIdentity data={localizedData.about} />
      <MissionVisionGrid data={localizedData.missionVision} />
      <GovernanceSection data={localizedData.governance} />
      {/* <StrategicPartners data={localizedData.partners} /> */}
    </main>
  );
}
