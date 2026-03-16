import React from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

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
            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
              {t("title")}
            </h1>
            <p className="text-lg md:text-2xl font-light leading-snug text-white/90 max-w-2xl">
              {t("subtitle")}
            </p>
          </div>
          
          <Button
            asChild
            size="lg"
            className="relative overflow-hidden bg-secondary hover:bg-white hover:text-primary text-white font-black px-12 py-9 rounded-2xl shadow-[0_10px_35px_rgba(235,93,27,0.35)] hover:shadow-[0_15px_45px_rgba(255,255,255,0.25)] transition-all duration-500 h-auto text-2xl group cursor-pointer border-2 border-white/10 hover:border-white scale-100 hover:scale-105 active:scale-95"
          >
            <a 
              href="http://213.136.82.130:1323/register/account-setup" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <span className="relative z-10 flex items-center">
                {t("cta_button") || "Get Started with GS1"}
                <ExternalLink className="w-7 h-7 ml-4 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
              </span>
              {/* Subtle shine effect layer */}
              <div className="absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] group-hover:left-full transition-all duration-700 ease-in-out" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceHero;
