import React from "react";
import { Fingerprint, ScanBarcode, Share2 } from "lucide-react";
import { useTranslations } from "next-intl";

const StandardHero = () => {
  const t = useTranslations("standards.hero");
  return (
    <section className="relative bg-[#002C6C] overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white blur-3xl" />
        <div className="absolute -bottom-40 -left-20 w-80 h-80 rounded-full bg-white blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="max-w-3xl space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/8 border border-white/8">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FE5000]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
              {t("badge")}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[0.95]">
            {t("title")}
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl font-light text-white/45 leading-relaxed max-w-2xl">
            {t("description")}
          </p>

          {/* Three mini pillars */}
          <div className="flex flex-wrap gap-4 pt-4">
            {[
              { icon: Fingerprint, label: t("identify") },
              { icon: ScanBarcode, label: t("capture") },
              { icon: Share2, label: t("share") },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/5 border border-white/6"
              >
                <Icon className="w-4 h-4 text-[#FE5000]" />
                <span className="text-sm font-semibold text-white/70">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StandardHero;
