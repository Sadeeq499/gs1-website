"use client";
import Image from "next/image";
import aboutHeroImage from '@/public/images/board.jpg'; 
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck } from "lucide-react";

export const InsightsHero = ({ data }) => (
  <section className="relative py-12 flex items-center text-white overflow-hidden rounded-b-[5rem] bg-primary">
    {/* Background Image Container */}
    <div className="absolute inset-0 z-0">
      <div className="relative w-full h-full animate-pulse [animation-duration:12s]">
        <Image 
          src={aboutHeroImage} 
          alt="GS1 Saudi Arabia Management" 
          fill 
          className="object-cover opacity-30 grayscale hover:grayscale-0 transition-all duration-1000" 
          priority 
        />
      </div>
    </div>

    <div className="container mx-auto px-4 relative z-10">
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out">
        
        {/* Governance Badge Row */}
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="font-black px-6 py-2 rounded-full border-none shadow-2xl bg-secondary text-white">
            {data.badge}
          </Badge>
          <Separator orientation="horizontal" className="w-16 bg-white/30 h-[1px]" />
          <ShieldCheck className="w-5 h-5 text-secondary animate-in zoom-in duration-1000 delay-500" />
        </div>
        
        {/* Leadership Typography */}
        <div className="space-y-6">
          <h1 className="text-3xl lg:text-6xl font-black text-white">
            {data.title} <br />
            <span className="text-secondary italic drop-shadow-md">{data.titleHighlight}</span> <br />
            <span className="opacity-80">{data.titleSuffix}</span>
          </h1>
          
          <Separator className="bg-white/10 w-full" />
          
          <p className="text-lg lg:text-xl text-white/60 leading-relaxed font-light mt-8">
            {data.description}
          </p>
        </div>

        {/* Governance Stats Row */}
        <div className="flex flex-wrap items-center gap-8 lg:gap-16 pt-12 border-t border-white/5">
          {data.stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-8 lg:gap-16 group">
              <div className="space-y-1">
                <div className="text-3xl font-black text-secondary group-hover:scale-110 transition-transform duration-500">
                  {stat.value}
                </div>
                <div className="text-[9px] uppercase tracking-[0.4em] font-black text-white/30">
                  {stat.label}
                </div>
              </div>
              
              {/* Vertical Separator for Tiers */}
              {i < data.stats.length - 1 && (
                <Separator orientation="vertical" className="h-10 bg-white/10 hidden md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Elegant Bottom Marker */}
    <div className="absolute bottom-12 left-12 animate-in fade-in slide-in-from-left duration-1000 delay-1000">
      <div className="h-[2px] w-24 bg-secondary" />
      <div className="mt-4 text-[10px] font-bold uppercase tracking-widest text-white/20">Executive Tier</div>
    </div>
  </section>
);