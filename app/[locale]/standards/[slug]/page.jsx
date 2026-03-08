import React from "react";
import { notFound } from "next/navigation";
import { standardDetails } from "@/components/standards/standard-detail-data";
import StandardDetailContent from "@/components/standards/StandardDetailContent";
import { getTranslations } from "next-intl/server";

const validSlugs = ["identify", "capture", "share"];

export async function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }));
}

export default async function StandardDetailPage({ params }) {
  const { slug } = await params;
  const baseData = standardDetails[slug];

  if (!baseData) notFound();

  const t = await getTranslations(`standards.details.${slug}`);
  const tCommon = await getTranslations("standards.common");

  // Reconstruct the nested data structure with translations
  const localizedData = {
    ...baseData,
    hero: {
      ...baseData.hero,
      badge: t("hero.badge"),
      title: t("hero.title"),
      subtitle: t("hero.subtitle"),
      description: t("hero.description"),
    },
    stats: baseData.stats.map((s, i) => ({
      ...s,
      value: t(`stats.${i}.value`),
      label: t(`stats.${i}.label`),
    })),
    overview: {
      eyebrow: t("overview.eyebrow"),
      title: t("overview.title"),
      paragraphs: t.raw("overview.paragraphs"),
    },
    components: baseData.components.map((c, i) => ({
      ...c,
      name: t(`components.${i}.name`),
      description: t(`components.${i}.description`),
      useCases: t.raw(`components.${i}.useCases`),
    })),
    process: {
      eyebrow: t("process.eyebrow"),
      title: t("process.title"),
      steps: baseData.process.steps.map((st, i) => ({
        ...st,
        title: t(`process.steps.${i}.title`),
        description: t(`process.steps.${i}.description`),
      })),
    },
    benefits: {
      eyebrow: t("benefits.eyebrow"),
      title: t("benefits.title"),
      items: baseData.benefits.items.map((b, i) => ({
        ...b,
        title: t(`benefits.items.${i}.title`),
        description: t(`benefits.items.${i}.description`),
      })),
    },
    industries: {
      eyebrow: t("industries.eyebrow"),
      title: t("industries.title"),
      items: baseData.industries.items.map((ind, i) => ({
        ...ind,
        name: t(`industries.items.${i}.name`),
        detail: t(`industries.items.${i}.detail`),
      })),
    },
    faq: baseData.faq?.map((f, i) => ({
      ...f,
      question: t.has(`faq.${i}.question`)
        ? t(`faq.${i}.question`)
        : f.question,
      answer: t.has(`faq.${i}.answer`) ? t(`faq.${i}.answer`) : f.answer,
    })),
    cta: t.has("cta")
      ? {
          ...baseData.cta,
          title: t("cta.title"),
          description: t("cta.description"),
          primaryButton: {
            ...baseData.cta.primaryButton,
            label: t("cta.primaryButton.label"),
          },
          secondaryButton:
            baseData.cta.secondaryButton && t.has("cta.secondaryButton.label")
              ? {
                  ...baseData.cta.secondaryButton,
                  label: t("cta.secondaryButton.label"),
                }
              : baseData.cta.secondaryButton,
        }
      : baseData.cta,
    allStandardsText: tCommon.has("all_standards")
      ? tCommon("all_standards")
      : "All Standards",
  };

  return <StandardDetailContent data={localizedData} />;
}
