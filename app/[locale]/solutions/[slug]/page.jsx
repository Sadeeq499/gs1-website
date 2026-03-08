import React from "react";
import { notFound } from "next/navigation";
import { techSolutions } from "@/components/home/data";
import {
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  ShieldAlert,
  Users,
  Info,
  Zap,
  Star,
  Globe,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
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

  return {
    title: t(`items.${slug}.title`),
    description: t(`items.${slug}.shortDescription`),
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
    <div className="bg-slate-50 font-sans text-slate-900 overflow-x-hidden selection:bg-orange-100 selection:text-orange-900">
      {/* 1. New Streamlined Hero Section */}
      <section className="relative py-12 lg:py-16 overflow-hidden bg-primary">
        {/* Dynamic Background Gradient */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/95 to-[#002c5c]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl space-y-6">
            {/* Breadcrumb */}
            <div className="text-sm text-white/60">
              <Link
                href={`/${locale}`}
                className="hover:text-white transition-colors"
              >
                {t("common.breadcrumbHome")}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-secondary/80 font-medium">
                {t("common.breadcrumbSolutions")}
              </span>
              <span className="mx-2">/</span>
              <span className="text-secondary font-bold">
                {solution.acronym || solution.title}
              </span>
            </div>

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
      <section className="relative z-10 -mt-10 px-4 pb-16">
        <div className="container mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-slate-100 max-w-7xl mx-auto space-y-8 animate-in fade-in-up duration-700">
            <div className="flex items-center gap-4 text-slate-900">
              <div className="bg-gs1-info p-2 rounded-lg">
                <Info className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">
                {t("common.understandingTitle")}
              </h2>
            </div>
            <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-light">
              <span className="font-bold text-slate-900">{solution.title}</span>{" "}
              {solution.description}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Dynamic Modules Section - Alternating Blog Layout */}
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

          <div className="space-y-32">
            {solution.modules?.map((module, idx) => (
              <div
                key={idx}
                className={`flex flex-col gap-12 lg:gap-24 items-center ${
                  idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Image Side */}
                <div className="lg:w-1/2 relative h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl group">
                  <img
                    src={module.image}
                    alt={module.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8">
                    <span className="text-secondary font-mono text-sm font-bold tracking-widest uppercase">
                      {t("common.moduleLabel")} {idx + 1}
                    </span>
                    <div className="text-white text-3xl font-bold mt-1">
                      {module.title}
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="lg:w-1/2 space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
                      {module.title}
                    </h3>
                    <div className="h-1 w-20 bg-secondary rounded-full" />
                  </div>
                  <p className="text-lg leading-relaxed text-slate-600 font-light">
                    {module.description}
                  </p>
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

      {/* 6. Call to Action */}
      <section className="bg-white py-24 px-4 border-t border-slate-100">
        <div className="container mx-auto">
          <div className="bg-primary rounded-[3rem] p-8 md:p-20 text-center relative overflow-hidden">
            <div className="relative z-10 space-y-8">
              <ShieldAlert className="h-16 w-16 mx-auto text-secondary" />
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-white">
                {t("common.ctaTitle")}
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed font-medium">
                {t("common.ctaDesc", { title: solution.title })}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white rounded-full px-12 py-8 text-xl font-bold shadow-2xl shadow-secondary/30">
                        Consult an Expert <ArrowRight className="ml-3" />
                    </Button> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
