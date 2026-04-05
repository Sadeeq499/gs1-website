import { BASE_URL } from "@/lib/seo";
import React from "react";
import StandardHero from "@/components/standards/StandardHero";
import StandardsPillars from "@/components/standards/StandardsPillars";
import GS1StandardsDetails from "@/components/standards/GS1StandardsDetails";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "standards.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${BASE_URL}/${locale}/standards`,
      languages: {
        en: `${BASE_URL}/en/standards`,
        ar: `${BASE_URL}/ar/standards`,
        "x-default": `${BASE_URL}/en/standards`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${BASE_URL}/${locale}/standards`,
      locale: locale === "ar" ? "ar_SA" : "en_SA",
      alternateLocale: locale === "ar" ? ["en_SA"] : ["ar_SA"],
    },
  };
}

function StandardsPage() {
  return (
    <main>
      <StandardHero />
      <GS1StandardsDetails />
      <StandardsPillars />
    </main>
  );
}

export default StandardsPage;
