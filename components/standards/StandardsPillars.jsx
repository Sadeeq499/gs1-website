import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Fingerprint, ScanBarcode, Share2 } from "lucide-react";
import { standardsPillars } from "./data";
import { useTranslations } from "next-intl";

const pillarIcons = {
  identify: Fingerprint,
  capture: ScanBarcode,
  share: Share2,
};

const PillarCard = ({ pillar, index }) => {
  const Icon = pillarIcons[pillar.slug] || Fingerprint;
  const t = useTranslations("standards");

  return (
    <Link href={`/standards/${pillar.slug}`} className="group block">
      <div className="relative bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-100 transition-all duration-500 hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-56 bg-slate-50 overflow-hidden">
          <Image
            src={pillar.heroImage}
            alt={pillar.title}
            fill
            className="object-contain p-8 transition-transform duration-700 group-hover:scale-105"
          />
          {/* Number overlay */}
          <div className="absolute top-4 left-4 w-9 h-9 rounded-lg bg-[#002C6C] text-white flex items-center justify-center text-xs font-black">
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>

        {/* Content */}
        <div className="p-7 space-y-4">
          {/* Acronym tag */}
          <div className="flex items-center gap-2.5">
            <Icon className="w-4 h-4 text-[#FE5000]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              {t(`items.${pillar.slug}.acronym`)}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-[#002C6C] tracking-tight">
            {t(`items.${pillar.slug}.title`)}
          </h3>

          {/* Description */}
          <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
            {t(`items.${pillar.slug}.shortDescription`)}
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-2.5 pt-2">
            {t
              .raw(`items.${pillar.slug}.features`)
              .slice(0, 4)
              .map((feature, i) => (
                <div
                  key={i}
                  className="px-3 py-2 bg-slate-50/80 rounded-lg border border-slate-100/80"
                >
                  <p className="text-[11px] font-bold text-[#002C6C]">
                    {feature.title}
                  </p>
                </div>
              ))}
          </div>

          {/* Link */}
          <div className="flex items-center gap-2 pt-2 text-sm font-bold text-[#002C6C] group-hover:text-[#FE5000] transition-colors">
            <span>{t("pillars.explore")}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
};

const StandardsPillars = () => {
  const t = useTranslations("standards.pillars");
  return (
    <section className="py-24 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-4">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FE5000]">
            {t("badge")}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#002C6C] tracking-tight leading-snug">
            {t("title")}
          </h2>
          <p className="text-base text-slate-400 leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {standardsPillars.map((pillar, i) => (
            <PillarCard key={pillar.slug} pillar={pillar} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StandardsPillars;
