import { BASE_URL } from "@/lib/seo";
import React from "react";
import VerifyHero from "@/components/verify/VerifyHero";
import VerifyTabs from "@/components/verify/VerifyTabs";

import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "verify" });
  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    alternates: {
      canonical: `${BASE_URL}/${locale}/verified-by-gs1`,
      languages: {
        en: `${BASE_URL}/en/verified-by-gs1`,
        ar: `${BASE_URL}/ar/verified-by-gs1`,
        "x-default": `${BASE_URL}/en/verified-by-gs1`,
      },
    },
    openGraph: {
      title: t("metadata.title"),
      description: t("metadata.description"),
      url: `${BASE_URL}/${locale}/verified-by-gs1`,
      locale: locale === "ar" ? "ar_SA" : "en_SA",
      alternateLocale: locale === "ar" ? ["en_SA"] : ["ar_SA"],
    },
  };
}

function page() {
  return (
    <div>
      <VerifyHero />
      <VerifyTabs />
    </div>
  );
}

export default page;
