import React from "react";
import { useTranslations } from "next-intl";

const ToolHero = () => {
  const t = useTranslations("tools.hero");
  return (
    <section className="relative w-full py-20 lg:py-32 overflow-hidden bg-primary">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#002c5c] via-primary to-primary/90" />
        {/* Subtle motion pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('/assets/patterns/grid.svg')] bg-center" />
      </div>

      <div className="relative h-full container mx-auto px-4 md:px-12 z-10">
        <div className="max-w-3xl">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider text-gold uppercase bg-white/10 rounded-full backdrop-blur-md">
            {t("badge")}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] text-white mb-6">
            {t("title")}
          </h1>
          <p className="text-xl md:text-2xl font-light text-white/80 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>
      </div>
    </section>
  );
};
export default ToolHero;