import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

function Slider() {
  const t = useTranslations("slider");

  return (
    <div className="relative w-full h-screen min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] overflow-hidden flex items-center bg-gray-900">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/home-hero/intro.png"
          alt={t("hero_alt")}
          fill
          className="object-cover object-center transform scale-105"
          priority
        />
        {/* Sleek Gradient Overlay to mimic the reference perfectly */}
        <div className="absolute inset-0 bg-linear-to-r from-gray-950/90 via-gray-900/60 to-transparent"></div>
        <div className="absolute inset-0 bg-linear-to-t from-gray-950/40 via-transparent to-transparent"></div>
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-40 md:pt-32">
        <div className="max-w-3xl text-white">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold leading-tight mb-1 sm:mb-2 tracking-tight drop-shadow-md">
            {t("title")}
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium leading-tight mb-3 sm:mb-6 tracking-tight drop-shadow-md opacity-90">
            {t("subtitle")}
          </h2>
          
          {/* Bright Orange/Red Accent Line identical to reference */}
          <div className="w-[80px] sm:w-[140px] h-1 bg-[#D94F2B] mb-4 sm:mb-8"></div>

          <p className="text-sm sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-10 max-w-full sm:max-w-2xl leading-relaxed font-light drop-shadow-md">
            {t("description")}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button asChild size="lg" className="bg-[#D94F2B] hover:bg-[#C2411F] text-white font-medium text-sm sm:text-lg px-5 sm:px-8 py-4 sm:py-6 rounded-md shadow-lg transition-colors w-full sm:w-auto">
              <a href={process.env.NEXT_PUBLIC_MEMBER_REGISTER} target="_blank" rel="noopener noreferrer">
                {t("getStarted")}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slider;