import React from "react";
import { notFound } from "next/navigation";
import { industryDetails } from "@/components/industries/data";
import IndustryDetailHero from "@/components/industries/industries-detail/IndustryDetailHero";

export default async function IndustryPage({ params }) {
  const { slug } = await params;
  const industry = industryDetails[slug];

  if (!industry) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans selection:bg-primary/10">
      <IndustryDetailHero industry={industry} />

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16 space-y-24">
        {/* Section 1: Overview & Image 1 */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-700 delay-200">
            <div className="inline-block">
              <span className="text-primary font-bold tracking-wider uppercase text-sm border-b-2 border-primary/20 pb-1">
                Overview
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
              Transforming {industry.title} with Standards
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {industry.description1 || industry.description}
            </p>
          </div>

          <div className="relative group animate-in zoom-in-95 duration-700 delay-300">
            <div className="absolute -inset-4 bg-linear-to-tr from-primary/10 to-secondary/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-slate-900/50">
              <img
                src={industry.image1 || "/images/placeholder.jpg"}
                alt={`${industry.title} overview`}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </section>

        {/* Section 2: Deep Dive (Full Width Text) */}
        {industry.description2 && (
          <section className="max-w-4xl mx-auto text-center space-y-12 animate-in mt-8 fade-in duration-1000 delay-500">
            <p className="text-xl md:text-2xl font-light text-slate-700 dark:text-slate-200 leading-relaxed italic border-l-4 border-secondary pl-6 md:pl-0 md:border-l-0 md:border-t-4 md:pt-8">
              "{industry.description2}"
            </p>

            {/* <div className="relative group w-full max-w-5xl mx-auto">
              <div className="absolute -inset-4 bg-linear-to-r from-secondary/10 to-primary/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-slate-900/50">
                <img
                  src={industry.image2 || "/images/placeholder.jpg"}
                  alt={`${industry.title} detail`}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div> */}
          </section>
        )}
      </div>
    </div>
  );
}
