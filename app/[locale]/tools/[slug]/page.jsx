import { BASE_URL } from "@/lib/seo";
import React from "react";
import { notFound } from "next/navigation";
import { toolsDetails } from "./tools-detail-data";
import ToolDetailContent from "@/components/toolss/ToolDetailContent";
import { getTranslations } from "next-intl/server";

// Define the slugs based on GS1 KSA priority tools
const validSlugs = [
  "check-digit-calculator",
  "gtin-management",
  "verified-by-gs1",
  "gepir"
];

export async function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  if (!validSlugs.includes(slug)) return {};

  const t = await getTranslations({
    locale,
    namespace: `tools.details.${slug}.metadata`,
  });

  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/tools/${slug}`,
      languages: {
        en: `${BASE_URL}/en/tools/${slug}`,
        ar: `${BASE_URL}/ar/tools/${slug}`,
        "x-default": `${BASE_URL}/en/tools/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}/tools/${slug}`,
      locale: locale === "ar" ? "ar_SA" : "en_SA",
      alternateLocale: locale === "ar" ? ["en_SA"] : ["ar_SA"],
    },
  };
}

export default async function ToolDetailPage({ params }) {
  const { slug, locale } = await params;
  const baseData = toolsDetails[slug];

  if (!baseData) notFound();

  const t = await getTranslations(`tools.details.${slug}`);
  const tCommon = await getTranslations("tools.common");

  // Reconstruct nested data structure with high-precision translations
  const localizedData = {
    ...baseData,
    hero: {
      ...baseData.hero,
      badge: t("hero.badge"),
      title: t("hero.title"),
      subtitle: t("hero.subtitle"),
    },
    mainSection: {
      title: t("mainSection.title"),
      description: t("mainSection.description"),
      // For tools that contain a form or calculator component
      componentLabel: t.has("mainSection.componentLabel") ? t("mainSection.componentLabel") : null,
    },
    features: baseData.features?.map((f, i) => ({
      ...f,
      title: t(`features.${i}.title`),
      description: t(`features.${i}.description`),
    })),
    howToUse: {
      title: t("howToUse.title"),
      steps: baseData.howToUse.steps.map((step, i) => ({
        ...step,
        title: t(`howToUse.steps.${i}.title`),
        description: t(`howToUse.steps.${i}.description`),
      })),
    },
    faq: baseData.faq?.map((f, i) => ({
      ...f,
      question: t(`faq.${i}.question`),
      answer: t(`faq.${i}.answer`),
    })),
    cta: {
      ...baseData.cta,
      title: t("cta.title"),
      description: t("cta.description"),
      buttonLabel: t("cta.buttonLabel"),
    },
    backButtonText: tCommon("back_to_tools"),
  };

  return <ToolDetailContent data={localizedData} locale={locale} slug={slug} />;
}