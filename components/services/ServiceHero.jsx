import React from "react";
import { useTranslations } from "next-intl";

const ServiceHero = () => {
  const t = useTranslations("services.hero");
  return (
    <div className="relative w-full py-16 lg:py-24 overflow-hidden bg-primary">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/95 to-[#002c5c]" />
      </div>

      {/* Content Container */}
      <div className="relative h-full container mx-auto px-4 md:px-12 flex flex-col justify-center text-white z-10">
        <div className="max-w-4xl space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight">
              {t("title")}
            </h1>
            <p className="text-lg md:text-2xl font-light leading-snug text-white/90 max-w-2xl">
              {t("subtitle")}
            </p>
          </div>
      
        </div>
      </div>
    </div>
  );
};

export default ServiceHero;
