import React from "react";
import { notFound } from "next/navigation";
import { servicesDetails } from "@/components/services/data";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Factory,
  Barcode,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const serviceData = servicesDetails.find((s) => s.slug === slug);

  if (!serviceData) {
    notFound();
  }

  const t = await getTranslations("services.detail");
  const tItem = await getTranslations(`services.items.${slug}`);

  const service = {
    ...serviceData,
    title: tItem.has("detailTitle") ? tItem("detailTitle") : serviceData.title,
    acronym: tItem.has("acronym") ? tItem("acronym") : serviceData.acronym,
    description: tItem.has("detailDescription")
      ? tItem("detailDescription")
      : serviceData.description,
    modules: tItem.has("modules") ? tItem.raw("modules") : serviceData.modules,
    features: tItem.has("features")
      ? tItem.raw("features")
      : serviceData.features,
    idealFor: tItem.has("idealFor")
      ? tItem.raw("idealFor")
      : serviceData.idealFor,
  };

  // Fallback image handling

  const featureImg =
    service.image ||
    "https://images.unsplash.com/photo-1589828952479-79737b8d8102?auto=format&fit=crop&q=80&w=1200";

  return (
    <div className="bg-slate-50  text-slate-900 overflow-x-hidden selection:bg-orange-100 selection:text-orange-900">
      {/* 1. Hero Section */}
      <section className="relative w-full pt-20 pb-28 lg:pt-28 lg:pb-36 overflow-hidden bg-primary">
        {/* Background Gradient */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/95 to-[#002c5c]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-8 flex flex-col justify-center text-white">
          <div className="max-w-4xl space-y-6 animate-in slide-in-from-bottom-5 duration-700">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-tight">
              {service.title}
              {service.acronym && (
                <span className="text-secondary ml-4 font-bold bg-white/10 px-4 py-1.5 rounded-full text-2xl lg:text-4xl align-middle">
                  {service.acronym}
                </span>
              )}
            </h1>
          </div>
        </div>
      </section>

      {/* 2. Floating Intro Card (Negative Margin) */}
      <section className="relative z-10 -mt-20 md:-mt-24 px-4 md:px-8 pb-16">
        <div className="container mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-100 max-w-5xl mx-auto text-center space-y-6 animate-in fade-in zoom-in-95 duration-700 delay-200">
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
              <span className="font-bold text-slate-900">{service.title}</span>{" "}
              {service.description.replace(service.title, "")}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Feature Split Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left: Content List */}
            <div className="lg:w-1/2 space-y-10">
              <div className="space-y-2">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                  {t("key_capabilities")}
                </h2>
                <div className="h-1 w-20 bg-secondary rounded-full" />
              </div>

              <div className="space-y-8">
                {service.modules &&
                  service.modules.map((module, idx) => {
                    const icons = [
                      <Barcode className="w-6 h-6 text-secondary" />,
                      <ShieldCheck className="w-6 h-6 text-secondary" />,
                      <Factory className="w-6 h-6 text-secondary" />,
                    ];
                    const SelectedIcon = icons[idx % icons.length];

                    return (
                      <div key={idx} className="flex gap-6 group">
                        <div className="shrink-0">
                          <div className="w-14 h-14 rounded-2xl bg-orange-50 text-secondary flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                            {React.cloneElement(SelectedIcon, {
                              className:
                                "w-6 h-6 group-hover:text-white transition-colors",
                            })}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-slate-800 transition-colors">
                            {module.title}
                          </h3>
                          <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                            {module.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Right: Feature Image */}
            <div className="lg:w-1/2 w-full">
              <img
                src={featureImg}
                alt="Feature"
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Full Width Visual Break */}
      <section className="relative py-16 overflow-hidden bg-primary">
        {/* Background Gradient */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/95 to-[#002c5c]" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            {t("empower_title")}
          </h2>
          <p className="text-xl md:text-2xl text-slate-300 font-medium">
            {t("empower_subtitle", { acronym: service.acronym })}
          </p>
        </div>
      </section>

      {/* 5. Bottom Details Section */}
      <section className="py-20 md:py-28 px-4 md:px-8 relative z-20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: Brief List */}
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-slate-900">
                {t("why_choose", { acronym: service.acronym })}
              </h3>
              <ul className="space-y-5">
                {service.features &&
                  service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-4 group">
                      <div className="mt-1 shrink-0 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-secondary" />
                      </div>
                      <span className="text-slate-500 font-medium group-hover:text-slate-900 transition-colors leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Right: Ideal For Cards */}
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-slate-900">
                {t("ideal_for")}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.idealFor &&
                  service.idealFor.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center hover:shadow-md transition-shadow min-h-[100px]"
                    >
                      <span className="text-slate-800 font-medium text-sm md:text-base">
                        {item}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
