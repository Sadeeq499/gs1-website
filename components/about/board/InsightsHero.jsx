"use client";
import React from "react";
import Image from "next/image";
import aboutHeroImage from '@/public/images/sliders/s6.jpg'; 
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck } from "lucide-react";

export const InsightsHero = ({ data }) => {
  return (
    <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden font-sans flex items-center">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={aboutHeroImage} 
          alt="GS1 Saudi Arabia Management" 
          fill 
          className="object-cover" 
          priority 
        />
      </div>

      {/* Overlay: Matching ServiceHero's gradient logic */}
      <div className="absolute inset-0 z-10 bg-linear-to-r from-primary via-primary/70 to-primary/20" />

      {/* Content Container */}
      <div className="container mx-auto px-4 md:px-12 relative z-20 text-white">
        <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out">
          
          {/* Governance Badge Row */}
          <div className="flex items-center gap-4">
            <Badge 
              variant="secondary" 
              className="font-black px-6 py-2 rounded-full border-none shadow-2xl bg-secondary text-white"
            >
              {data?.badge || "Government"}
            </Badge>
            <Separator orientation="horizontal" className="w-16 bg-white/30 h-[1px]" />
            <ShieldCheck className="w-5 h-5 text-secondary animate-pulse" />
          </div>
          
          {/* Leadership Typography - Following ServiceHero scale */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight text-white">
              {data.title} <br />
              <span className="text-secondary drop-shadow-md">{data.titleHighlight}</span> <br />
              <span className="text-white/80 text-3xl md:text-5xl">{data.titleSuffix}</span>
            </h1>
            
            <p className="text-xl md:text-2xl font-light leading-snug text-white/90 max-w-3xl">
              {data.description}
            </p>
          </div>
        </div>
      </div>

      {/* Optional: Subtle bottom gradient to blend with next section */}
      <div className="absolute bottom-0 w-full h-24 bg-linear-to-t from-black/20 to-transparent z-10" />
    </section>
  );
};