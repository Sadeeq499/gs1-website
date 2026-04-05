import { BASE_URL } from "@/lib/seo";
import React from "react";
import ServiceHero from "@/components/services/ServiceHero";
import ServicesSection from "@/components/services/ServicesSection";
import ServicesCTA from "@/components/services/ServicesCTA";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${BASE_URL}/${locale}/services`,
      languages: {
        en: `${BASE_URL}/en/services`,
        ar: `${BASE_URL}/ar/services`,
        "x-default": `${BASE_URL}/en/services`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${BASE_URL}/${locale}/services`,
      locale: locale === "ar" ? "ar_SA" : "en_SA",
      alternateLocale: locale === "ar" ? ["en_SA"] : ["ar_SA"],
    },
  };
}

function ServicesPage() {
  return (
    <main>
      <ServiceHero />
      <ServicesSection />
      <ServicesCTA />
    </main>
  );
}

export default ServicesPage;
