"use client";
import React from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ChevronRight, Building2, Verified, ArrowUpRight } from "lucide-react";
import { PARTNERS_DATA } from "./partners-data";
export const ProviderShowcase = () => {
  const { providers } = PARTNERS_DATA;
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" }, [Autoplay({ delay: 4000 })]);

  return (
    <section className="py-24 bg-gs1-info">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}>
            <Badge className="mb-4 bg-secondary/10 text-secondary border-none px-4 py-1 font-bold">{providers.badge}</Badge>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground leading-tight">
              {providers.title} <span className="text-primary italic">{providers.titleHighlight}</span>
            </h2>
          </motion.div>
          <div className="hidden md:flex items-center gap-2 text-muted-foreground text-xs font-bold uppercase tracking-widest pb-2">
            {providers.exploreText} <ChevronRight className="w-4 h-4 text-secondary animate-pulse" />
          </div>
        </div>

        <div className="overflow-hidden rounded-xl" ref={emblaRef}>
          <div className="flex -ml-4 lg:-ml-6">
            {providers.list.map((partner, index) => (
              <div key={index} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4 lg:pl-6 py-4">
                <Card className="h-[420px] p-8 flex flex-col justify-between border-border/40 bg-card hover:border-secondary/50 shadow-sm hover:shadow-xl transition-all duration-500">
                  <div>
                    <div className="flex justify-between items-start mb-8">
                      <div className="relative w-24 h-24 rounded-2xl border-[1.5px] border-secondary/20 p-3 flex items-center justify-center bg-white shadow-sm">
                        {partner.logo ? <img src={partner.logo} alt={partner.name} className="w-full h-full object-contain" /> : <Building2 className="w-12 h-12 text-primary" />}
                      </div>
                      <Verified className="w-6 h-6 text-secondary/30" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-1">{partner.name}</h3>
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4">{partner.type}</p>
                    <p className="text-sm text-muted-foreground line-clamp-3">{partner.desc}</p>
                  </div>
                  <div className="pt-6 border-t border-border/50 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase text-foreground/40">{providers.impactLabel}</span>
                      <Badge variant="outline" className="text-[10px] border-secondary/30 text-secondary">{partner.impact}</Badge>
                    </div>
                    <div className="flex items-center text-xs font-bold text-primary cursor-pointer hover:underline group">
                      {providers.detailsText} <ArrowUpRight className="ml-1 w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};