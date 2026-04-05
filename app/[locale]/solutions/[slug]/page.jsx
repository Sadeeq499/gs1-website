import { BASE_URL } from "@/lib/seo";
import React from "react";
import { notFound } from "next/navigation";
import { techSolutions } from "@/components/home/data";
import {
  CheckCircle2,
  Lightbulb,
  ShieldAlert,
  Info,
  Zap,
  Star,
  Globe,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

const TextContent = ({ text }) => {
  if (!text) return null;
  return (
    <div className="space-y-6">
      {text.split("\n\n").map((block, idx) => {
        if (block.includes("\n- ") || block.startsWith("- ")) {
          const lines = block.split("\n");
          const preText = [];
          const listItems = [];

          lines.forEach((line) => {
            if (line.startsWith("- ")) {
              listItems.push(line.substring(2));
            } else {
              preText.push(line);
            }
          });

          return (
            <div key={idx} className="space-y-4">
              {preText.length > 0 && (
                <p className="text-lg leading-relaxed text-slate-700 font-light">
                  {preText.join(" ")}
                </p>
              )}
              {listItems.length > 0 && (
                <ul className="space-y-3">
                  {listItems.map((item, i) => (
                    <li key={i} className="flex items-start text-lg">
                      <div className="h-6 w-6 rounded-full bg-secondary/10 flex items-center justify-center mr-3 shrink-0 mt-0.5">
                        <CheckCircle2 className="h-4 w-4 text-secondary" />
                      </div>
                      <span className="leading-relaxed text-slate-700 font-light">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        }
        return (
          <p
            key={idx}
            className="text-lg leading-relaxed text-slate-700 font-light whitespace-pre-line"
          >
            {block}
          </p>
        );
      })}
    </div>
  );
};
import { getTranslations } from "next-intl/server";

export async function generateStaticParams() {
  return techSolutions.map((solution) => ({
    slug: solution.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: "solutions" });

  const solution = techSolutions.find((s) => s.slug === slug);
  if (!solution) return {};

  const hasMetadata = (() => {
    try {
      t(`items.${slug}.metadata.title`);
      return true;
    } catch {
      return false;
    }
  })();

  const title = hasMetadata
    ? t(`items.${slug}.metadata.title`)
    : t(`items.${slug}.title`);
  const description = hasMetadata
    ? t(`items.${slug}.metadata.description`)
    : t(`items.${slug}.shortDescription`);

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/solutions/${slug}`,
      languages: {
        en: `${BASE_URL}/en/solutions/${slug}`,
        ar: `${BASE_URL}/ar/solutions/${slug}`,
        "x-default": `${BASE_URL}/en/solutions/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}/solutions/${slug}`,
      locale: locale === "ar" ? "ar_SA" : "en_SA",
      alternateLocale: locale === "ar" ? ["en_SA"] : ["ar_SA"],
    },
  };
}

export default async function SolutionPage({ params }) {
  const { slug, locale } = await params;
  const t = await getTranslations("solutions");

  const solutionBase = techSolutions.find((s) => s.slug === slug);

  if (!solutionBase) {
    notFound();
  }

  const solution = {
    ...solutionBase,
    title: t(`items.${slug}.title`),
    acronym: t(`items.${slug}.acronym`),
    shortDescription: t(`items.${slug}.shortDescription`),
    description: t(`items.${slug}.description`),
    modules: solutionBase.modules.map((m, i) => ({
      ...m,
      title: t(`items.${slug}.modules.${i}.title`),
      description: t(`items.${slug}.modules.${i}.description`),
    })),
    features: t.raw(`items.${slug}.features`),
  };

  // Array of icons to rotate through for the "Why Choose Us" section
  const featureIcons = [Zap, Star, Globe, ShieldCheck, CheckCircle2];

  return (
    <div className="bg-slate-50  text-slate-900 overflow-x-hidden selection:bg-orange-100 selection:text-orange-900">
      {/* 1. New Streamlined Hero Section */}
      <section className="relative py-12 lg:py-16 overflow-hidden bg-primary">
        {/* Dynamic Background Gradient */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/95 to-[#002c5c]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-black text-white leading-tight">
              {solution.title}
              {solution.acronym && (
                <span className="text-secondary ml-4 font-light opacity-80">
                  ({solution.acronym})
                </span>
              )}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl leading-relaxed">
              {solution.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Introduction & Overview */}
      <section className="py-16 md:py-24 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="max-w-7xl mx-auto animate-in fade-in-up duration-700">
            <div className="text-lg md:text-xl text-slate-700 leading-relaxed font-light">
              <span className="font-bold text-slate-900 block mb-6 text-2xl md:text-3xl">
                {solution.title}
              </span>
              <div className="flex items-center gap-4 text-slate-900 mb-6">
                <div className="bg-gs1-info p-2 rounded-lg">
                  <Info className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">
                  {t("common.understandingTitle")}
                </h2>
              </div>
              <TextContent text={solution.description} />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Dynamic Modules Section - Clean Layout */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
              {t("common.strategicPillars")}
            </h2>
            <p className="text-slate-600">
              {t("common.strategicPillarsDesc", {
                acronym: solution.acronym || "Solution",
              })}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {solution.modules?.map((module, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden"
              >
                {/* Decorative background element for pure clean look */}
                <div className="absolute -top-10 -right-4 p-8 opacity-5 select-none pointer-events-none">
                  <div className="text-[12rem] font-black leading-none">
                    {idx + 1}
                  </div>
                </div>

                <div className="relative z-10 flex flex-col gap-6">
                  <div className="space-y-4">
                    <span className="inline-block bg-secondary/10 text-secondary font-mono text-sm font-bold tracking-widest uppercase px-4 py-1.5 rounded-full">
                      {t("common.moduleLabel")} {idx + 1}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                      {module.title}
                    </h3>
                  </div>
                  <div className="w-full h-px bg-slate-100 border-0" />
                  <div className="text-lg text-slate-700 font-light">
                    <TextContent text={module.description} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Standards Section */}
      <section className="bg-primary py-24 px-4 overflow-hidden relative">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 opacity-10">
          <Globe className="h-96 w-96 text-white" />
        </div>
        <div className="container mx-auto text-center relative z-10 space-y-8">
          <Lightbulb className="h-16 w-16 mx-auto text-secondary animate-pulse" />
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-white">
            {t("common.innovationTitle")}
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-slate-300 leading-relaxed">
            {t("common.innovationDesc")}
          </p>
        </div>
      </section>

      {/* 5. Features Grid - Localized */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
                {t("common.whyImplementationMatters")}
              </h2>
              <p className="text-slate-600">
                {t("common.whyImplementationMattersDesc", {
                  title: solution.title,
                })}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solution.features?.map((feature, idx) => {
              const IconComponent = featureIcons[idx % featureIcons.length];
              return (
                <div
                  key={idx}
                  className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:border-secondary/20 transition-all hover:shadow-xl group"
                >
                  <div className="bg-gs1-info w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                    <IconComponent className="h-7 w-7 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900">
                    {feature}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {t("common.featureBenefit", {
                      acronym: solution.acronym || "Solution",
                    })}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
