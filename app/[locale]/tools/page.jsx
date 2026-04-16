import { BASE_URL } from "@/lib/seo";
import React from "react";
import ToolHero from "@/components/toolss/ToolHero";
import ToolGrid from "@/components/toolss/ToolGrid";
import ToolCTA from "@/components/toolss/ToolCTA";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tools.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${BASE_URL}/${locale}/tools`,
      languages: {
        en: `${BASE_URL}/en/tools`,
        ar: `${BASE_URL}/ar/tools`,
        "x-default": `${BASE_URL}/en/tools`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${BASE_URL}/${locale}/tools`,
      locale: locale === "ar" ? "ar_SA" : "en_SA",
    },
  };
}

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <ToolHero />
      <ToolGrid />
      <ToolCTA />
    </main>
  );
}