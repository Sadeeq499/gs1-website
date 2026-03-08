import React from "react";
import { useTranslations } from "next-intl";

export function IndustryHero() {
  const t = useTranslations("industries.hero");
  return (
    <div className="relative w-full py-12 lg:py-16 overflow-hidden bg-primary">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/95 to-[#002c5c]" />
      </div>

      {/* Content Container */}
      <div className="relative h-full container mx-auto px-4 md:px-12 flex flex-col justify-center text-white z-10">
        <div className="max-w-4xl space-y-4">
          <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tight">
            {t("title")}
          </h1>
          <p className="text-lg md:text-xl font-light text-white/90 max-w-2xl">
            {t("subtitle")}
          </p>
        </div>
      </div>
    </div>
  );
}
