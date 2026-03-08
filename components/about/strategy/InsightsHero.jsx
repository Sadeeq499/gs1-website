"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Rocket } from "lucide-react";

export const InsightsHero = ({ data }) => (
  <section className="relative py-12 lg:py-16 flex items-center text-white overflow-hidden bg-primary">
    {/* Dynamic Background Gradient */}
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/95 to-[#002c5c]" />
    </div>

    <div className="container mx-auto px-4 relative z-10">
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-12 duration-1000">
        {/* Strategy Badge Row */}
        <div className="flex items-center gap-4">
          <Badge
            variant="secondary"
            className="font-black text-white px-6 py-2 rounded-full border-none shadow-lg"
          >
            {data.badge}
          </Badge>
          <Separator
            orientation="horizontal"
            className="w-16 bg-white/50 h-[1px]"
          />
          <Rocket className="w-5 h-5 text-white animate-bounce" />
        </div>

        {/* Main Title Section */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
            {data.title} <br />
            <span className="text-secondary">{data.titleHighlight}</span> <br />
            <span className="opacity-90">{data.titleSuffix}</span>
          </h1>

          <p className="text-lg text-white/70 font-light mt-4 max-w-4xl">
            {data.description}
          </p>
        </div>

        {/* Strategic Stats Row with Vertical Separators */}
        <div className="flex items-center gap-10 lg:gap-20 pt-8 border-t border-white/10 animate-in fade-in slide-in-from-left-10 duration-1000 delay-300">
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
                <Separator
                  orientation="vertical"
                  className="h-14 bg-white/35"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
