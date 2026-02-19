"use client";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import aboutHeroImage from '@/public/images/about.jpg'; // Local Import

export const AboutHero = ({ data }) => (
  <section className="relative min-h-[85vh] flex items-center text-white overflow-hidden rounded-b-[4rem]">
    {/* Background Image Container */}
    <div className="absolute inset-0 z-0">
      <Image 
        src={aboutHeroImage} 
        alt="About GS1 Saudi Arabia" 
        fill 
        className="object-cover" 
        priority 
      />
      {/* Dynamic Overlay for Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/50 to-transparent" />
    </div>

    <div className="container mx-auto px-4 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="max-w-4xl space-y-8"
      >
        <Badge className="bg-secondary text-primary font-bold px-6 py-2 border-none">
          {data.badge}
        </Badge>
        
        <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9]">
          {data.title} <br />
          <span className="text-secondary italic">{data.titleHighlight}</span> <br />
          {data.titleSuffix}
        </h1>

        <p className="text-xl text-white/70 max-w-2xl leading-relaxed">
          {data.description}
        </p>

        <div className="flex flex-wrap gap-12 pt-12 border-t border-white/10">
          {data.stats.map((stat, i) => (
            <div key={i} className="space-y-1">
              <div className="text-4xl font-black text-secondary">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);