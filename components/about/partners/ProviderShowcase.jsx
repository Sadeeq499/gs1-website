"use client";
import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "next-intl";

export const ProviderShowcase = ({ data: providers }) => {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: "center", 
      direction: isRtl ? "rtl" : "ltr" 
    }, 
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  // Simple logic to detect which logo is in the center
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-24 bg-gs1-info/5 border-y border-border/40 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 text-start">
          <motion.div initial={{ opacity: 0, x: isRtl ? 30 : -30 }} whileInView={{ opacity: 1, x: 0 }}>
            <Badge className="mb-4 bg-primary/10 text-primary border-none px-4 py-1 font-bold">
              {providers.badge}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground leading-tight">
              {providers.title} <span className="text-primary">{providers.titleHighlight}</span>
            </h2>
            <p className="text-muted-foreground text-sm mt-4 max-w-xl">
              {providers.description}
            </p>
          </motion.div>
        </div>

        {/* Smart Focus Slider */}
        <div className="overflow-hidden cursor-grab active:cursor-grabbing py-10" ref={emblaRef} dir={isRtl ? "rtl" : "ltr"}>
          <div className="flex -ml-4 items-center">
            {providers.list.map((partner, index) => {
              const isActive = index === selectedIndex;

              return (
                <div
                  key={index}
                  className="flex-[0_0_65%] sm:flex-[0_0_40%] lg:flex-[0_0_25%] pl-4 transition-all duration-500"
                >
                  <div 
                    className={`h-44 p-8 flex flex-col items-center justify-center rounded-3xl transition-all duration-500 border
                      ${isActive 
                        ? "scale-110 grayscale-0 opacity-100 bg-white border-primary/20 shadow-2xl z-10" 
                        : "scale-90 grayscale opacity-30 bg-card border-border/60 z-0"
                      }`}
                  >
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    
                    {/* Name appears only for centered logo */}
                    <span className={`mt-4 text-[10px] font-bold uppercase tracking-widest text-primary transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"}`}>
                      {partner.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-center text-[11px] text-muted-foreground/60 mt-12 font-medium tracking-wide uppercase">
          {providers.visualNote}
        </p>
      </div>
    </section>
  );
};