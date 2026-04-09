import { BASE_URL } from "@/lib/seo";
import React from "react";
import { IndustryCard } from "@/components/industries/IndustryCard";
import { IndustryHero } from "@/components/industries/IndustryHero";
import { industries } from "@/components/industries/data";
import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "industries.page" });
  return {
    title: t("meta_title"),
    description: t("meta_description"),
    alternates: {
      canonical: `${BASE_URL}/${locale}/industries`,
      languages: {
        en: `${BASE_URL}/en/industries`,
        ar: `${BASE_URL}/ar/industries`,
        "x-default": `${BASE_URL}/en/industries`,
      },
    },
    openGraph: {
      title: t("meta_title"),
      description: t("meta_description"),
      url: `${BASE_URL}/${locale}/industries`,
      locale: locale === "ar" ? "ar_SA" : "en_SA",
      alternateLocale: locale === "ar" ? ["en_SA"] : ["ar_SA"],
    },
  };
}

export default function IndustriesPage() {
  const t = useTranslations("industries.page");

  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Hero Section */}
      <IndustryHero />

      {/* Main Content */}
      <main className="flex-1 bg-white dark:bg-slate-950">
        <div className="container py-8 md:py-16 space-y-12 mx-auto px-4 sm:px-6 lg:px-8">
          {/* Industries Grid */}
          <section>
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl text-balance">
                {t("transforming_title")}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                {t("transforming_subtitle")}
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {industries.map((industry) => (
                <IndustryCard key={industry.title} industry={industry} />
              ))}
            </div>
          </section>

          {/* Benefits Section */}
          <section className="relative overflow-hidden rounded-3xl bg-secondary/5 py-16 px-6 lg:px-12 border border-secondary/10">
            <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-2 lg:gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl mb-6">
                  {t("why_trust_title")}
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  {t("why_trust_subtitle")}
                </p>
                <ul className="space-y-4">
                  {[0, 1, 2, 3, 4].map((index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-secondary" />
                      <span className="font-medium text-foreground">
                        {t(`benefits_${index}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 lg:mt-0 relative">
                <div className="aspect-square rounded-2xl bg-linear-to-br from-primary/20 to-secondary/20 p-8 rotate-3 shadow-xl backdrop-blur-3xl">
                  <div className="h-full w-full rounded-xl bg-white/50 border border-white/20 p-6 flex flex-col justify-center items-center text-center">
                    <span className="text-6xl font-bold text-primary mb-2">
                      {t("stats.companies_value")}
                    </span>
                    <span className="text-xl font-medium text-muted-foreground">
                      {t("stats.companies")}
                    </span>

                    <div className="w-full h-px bg-border my-6" />

                    <span className="text-6xl font-bold text-secondary mb-2">
                      {t("stats.countries_value")}
                    </span>
                    <span className="text-xl font-medium text-muted-foreground">
                      {t("stats.countries")}
                    </span>

                    <div className="w-full h-px bg-border my-6" />

                    <span className="text-6xl font-bold text-primary mb-2">
                      {t("stats.scans_value")}
                    </span>
                    <span className="text-xl font-medium text-muted-foreground">
                      {t("stats.scans")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
