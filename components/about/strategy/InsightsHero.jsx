"use client";
import Image from "next/image";
import aboutHeroImage from '@/public/images/strategy.jpg'; 
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Rocket } from "lucide-react";

export const InsightsHero = ({ data }) => (
  <section className="relative py-12 flex items-center text-white overflow-hidden rounded-b-[4rem] bg-primary">
    {/* Background Image with CSS Ken Burns effect */}
    <div className="absolute inset-0 z-0">
      <div className="relative w-full h-full animate-pulse [animation-duration:8s]">
        <Image 
          src={aboutHeroImage} 
          alt="GS1 Saudi Arabia Strategy" 
          fill 
          className="object-cover opacity-40 scale-105" 
          priority 
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-transparent to-transparent" />
    </div>

    <div className="container mx-auto px-4 relative z-10">
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-12 duration-1000">
        
        {/* Strategy Badge Row */}
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="font-black text-white px-6 py-2 rounded-full border-none shadow-lg">
            {data.badge}
          </Badge>
          <Separator orientation="horizontal" className="w-16 bg-white/50 h-[1px]" />
          <Rocket className="w-5 h-5 text-white animate-bounce" />
        </div>
        
        {/* Main Title Section */}
        <div className="space-y-6">
          <h1 className="text-3xl lg:text-5xl font-black text-white">
            {data.title} <br />
            <span className="text-secondary italic">{data.titleHighlight}</span> <br />
            <span className="opacity-90">{data.titleSuffix}</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-white/70 leading-relaxed font-light mt-8">
            {data.description}
          </p>
        </div>

        {/* Strategic Stats Row with Vertical Separators */}
        <div className="flex items-center gap-10 lg:gap-20 pt-12 border-t border-white/10 animate-in fade-in slide-in-from-left-10 duration-1000 delay-300">
          {data.stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-10 lg:gap-20">
              <div className="space-y-1 group cursor-default">
                <div className="text-4xl font-black text-secondary group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40">
                  {stat.label}
                </div>
              </div>
              
              {/* Only show separator if not the last item */}
              {i < data.stats.length - 1 && (
                <Separator orientation="vertical" className="h-14 bg-white/35" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Scroll Guide */}
    <div className="absolute bottom-12 right-12 hidden lg:block text-right">
      <div className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-4 font-bold">Scroll Roadmap</div>
      <div className="w-[1px] h-24 bg-gradient-to-b from-secondary to-transparent mx-auto" />
    </div>
  </section>
);